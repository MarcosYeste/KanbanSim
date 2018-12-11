package com.kanban.app;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.kanban.app.Model.Phase;
import com.kanban.app.Model.ResultTask;
import com.kanban.app.Model.Task;
import com.kanban.app.Model.User;
import com.kanban.app.services.KanbanService;

/**
 * Handles requests for the application home page.
 */
@Controller

public class HomeController {

	@Autowired
	KanbanService kanbanService;

	List<Phase> phasesArray = new ArrayList<Phase>();
	List<Task> taskArray = new ArrayList<Task>();
	List<User> userArray = new ArrayList<User>();
	ArrayList<String> allPhases = new ArrayList<String>();




	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {

		model.addAttribute("task", taskArray);
		model.addAttribute("user", userArray);
		model.addAttribute("phases", phasesArray);

		return "kanban";

	}

	@RequestMapping(value = "/success", method = RequestMethod.GET)
	public String succes(Model model) {

		model.addAttribute("task", taskArray);
		model.addAttribute("user", userArray);
		model.addAttribute("phases", phasesArray);

		return "kanban";
	}
	
	// Save Results Server
		@RequestMapping(value = "/saveResults", method = RequestMethod.POST)
		public String guardarResultados(String resultados) {
			System.out.println(resultados);
			
//			GsonBuilder builder = new GsonBuilder();
//			builder.setPrettyPrinting(); 
//			Gson gson = builder.create();
//			
//			/// SOLUCIONAR PROBLEMA STATIC TO NON-STATIC GSON
//			ResultTask prueba = gson.fromJson(resultados, ResultTask.class);
//		
//			System.out.println(prueba);

			return "success";
		}
	
	// Add new Phase
	@RequestMapping(value = "/addFase", method = RequestMethod.GET)
	public String newFase(Model model) {

		model.addAttribute("fase", new Phase());

		return "phaseForm";
	}

	// este metodo recoge el formulario y va al simulador
	@RequestMapping(value = "/addFase", method = RequestMethod.POST)
	public String createFase(Model model, @ModelAttribute("fase") Phase fases) {

		model.addAttribute("phases", kanbanService.saveFases(fases, phasesArray));
		model.addAttribute("task", taskArray);
		model.addAttribute("user", userArray);

		addPhases(phasesArray.get(phasesArray.size() - 1).getName());
		return "success";

	}

	// Add new Task
	@RequestMapping(value = "/distributionForm", method = RequestMethod.GET)
	public String newTask() {

		return "distributionForm";
	}

	// Add new Task
	@RequestMapping(value = "/addTask", method = RequestMethod.POST)
	public String createTask(Model model, @ModelAttribute("task") Task task) {

		model.addAttribute("task", kanbanService.saveTask(task, taskArray));
		model.addAttribute("phases", phasesArray);
		model.addAttribute("user", userArray);

		return "success";

	}

	// Add new Users
	@RequestMapping(value = "/addUser", method = RequestMethod.GET)
	public String newUser(Model model) {

		model.addAttribute("user", new User());
		model.addAttribute("allPhases", this.allPhases);

		return "success";
	}

	// Add new Users
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public String createUser(Model model, String name, String fases) {

		User user = new User();
		user.setName(name);
		user.setRawPhases(fases);
		model.addAttribute("user", kanbanService.saveUser(user, userArray));
		model.addAttribute("phases", phasesArray);
		model.addAttribute("task", taskArray);

		return "success";

	}


	// Add new Users
	@RequestMapping(value = "/addPhase", method = RequestMethod.POST)
	public String addPhase() {


		return "success";

	}

	// Remove all Tasks
	@RequestMapping(value = "/rmvTask", method = RequestMethod.POST)
	public String removeTask() {

		taskArray.clear();

		return "success";

	}

	// Remove all the items in all the arrays
	@RequestMapping(value = "/rmvAll", method = RequestMethod.POST)
	public String removeAll() {

		taskArray.clear();
		phasesArray.clear();
		userArray.clear();
		allPhases.clear();

		return "success";

	}

	// Remove Users By Name
	@RequestMapping(value = "/rmvUser", method = RequestMethod.POST)
	public String removeUser(String name) {

		// Correcci�n Hacer con un id

		for (int i = 0; i < userArray.size(); i++) {
			if (userArray.get(i).getName().indexOf(name) != -1) {
				userArray.remove(i);
			}
		}

		System.out.println("Deleted " + name + " " + userArray.size());

		return "success";

	}

	// Modify Users By Name
	@RequestMapping(value = "/modUser", method = RequestMethod.POST)
	public String modifyUser(String oldName, String newName, String phases, String skills) {

		for (int i = 0; i < userArray.size(); i++) {
			if (userArray.get(i).getName().indexOf(oldName) != -1) {
				userArray.get(i).setName(newName);
				userArray.get(i).setRawPhases(phases);
				userArray.get(i).setRawSkills(skills);
				;

			}
		}

		return "success";

	}

	// Modify Phases By Name
	@RequestMapping(value = "/modPhase", method = RequestMethod.POST)
	public String modifyPhase(String name, int wip, int min, int max, String color) {

		for (int i = 0; i < phasesArray.size(); i++) {
			if (phasesArray.get(i).getName().indexOf(name) != -1) {
				phasesArray.get(i).setMaxTasks(wip);
				phasesArray.get(i).setMinTime(min);
				phasesArray.get(i).setMaxTime(max);
				phasesArray.get(i).setColor(color);
			}
		}

		return "success";

	}

	// Modificar Tareas
	@RequestMapping(value = "/sortPhase", method = RequestMethod.POST)
	public String sortPhase(String Stringfases) {

		String[] arrayfases = Stringfases.split(",");
		List<Phase> sortedPhases = new ArrayList<Phase>();

		for (int i = 0; i < arrayfases.length; i++) {
			for (int j = 0; j < phasesArray.size(); j++) {
				if (phasesArray.get(j).getId().equals(arrayfases[i])) {
					sortedPhases.add(phasesArray.get(j));
				}
			}
		}

		phasesArray = sortedPhases;

		return "success";
	}

	// Get Gaussian
	@RequestMapping(value = "/nextGaussian", method = RequestMethod.GET)
	public @ResponseBody String gaussian(int mean ,int variation) {

		Random r = new Random();
		double val = r.nextGaussian() * variation + mean;
		if(val <= 0) {
			val = 1;
		}
		return String.valueOf(val);
	}

	// Get Poisson value
	@RequestMapping(value = "/nextPoisson", method = RequestMethod.GET)
	public @ResponseBody String poisson(int lambda) {	

		double L = Math.exp(-lambda);
		double p = 1.0;
		int k = 0;
		do {
			k++;
			p *= Math.random();
		} while (p > L);
		return String.valueOf(k - 1);
	}

	// Get with weight
	@RequestMapping(value = "/nextWeight", method = RequestMethod.GET)
	public @ResponseBody String weight(int sValue, int mValue, int lValue, int xlValue) {

		Random r = new Random();
		int num = r.nextInt(100) + 1;
		String val = "";
		System.out.println(sValue + ", " + mValue + ", " + lValue + ", " + xlValue);
		if(num <= sValue) {
			val = "S";
		} else if(num > sValue && num <= sValue + mValue) {
			val = "M";
		} else if (num > sValue + mValue && num <= sValue + mValue + lValue) {
			val = "L";
		} else if (num > sValue + mValue + lValue && num <= sValue + mValue + lValue + xlValue) {
			val = "XL";
		}

		Random ran = new Random();
		int number = r.nextInt(5) + 1;

		return val + "," + String.valueOf(number);
	}


	// Add New Phase
	public void addPhases(String phase) {
		boolean phaseExist = false;

		if (!allPhases.isEmpty()) {

			for (String aphase : allPhases) {

				if (phase.trim().toUpperCase().equals(aphase.toUpperCase().trim())) {
					phaseExist = true;
				}
			}
			if (!phaseExist) {

				allPhases.add(phase.trim());

			} else {

			}
		} else {
			allPhases.add(phase.trim());

		}
		phaseExist = false;
	}
}