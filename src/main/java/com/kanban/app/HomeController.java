package com.kanban.app;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kanban.app.Model.Phase;
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

	List<Phase> phasesArray = new ArrayList <Phase>();
	List<Task> taskArray = new ArrayList <Task>();
	List<User> userArray = new ArrayList <User>();
	ArrayList<String> allPhases = new ArrayList<String>();

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {


		model.addAttribute("task",taskArray);
		model.addAttribute("user", userArray);
		model.addAttribute("phases", phasesArray);

		return "kanbanVersion2";

	}

	@RequestMapping(value = "/success", method = RequestMethod.GET)
	public String succes( Model model) {

		model.addAttribute("task", taskArray);
		model.addAttribute("user", userArray);
		model.addAttribute("phases", phasesArray);


		return "kanbanVersion2";
	}
	
	// Add new Phase
	@RequestMapping(value = "/addFase", method = RequestMethod.GET)
	public String newFase(Model model) {

		model.addAttribute("fase",new Phase());

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
	@RequestMapping(value = "/addTask", method = RequestMethod.GET)
	public String newTask(Model model) {

		model.addAttribute("task",new Task());

		return "taskForm";
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

		model.addAttribute("user",new User());
		model.addAttribute("allPhases", this.allPhases);

		return "userForm";
	}

	 // Add new Users
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public String createUser(Model model, @ModelAttribute("user") User user) {	

		model.addAttribute("user", kanbanService.saveUser(user, userArray));
		model.addAttribute("phases",  phasesArray);
		model.addAttribute("task", taskArray);

		return "success";

	}
	
	 // Remove all Tasks
	@RequestMapping(value = "/rmvTask", method = RequestMethod.POST)
	public String removeTask() {	

		taskArray.clear();
		System.out.println(taskArray.size());

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
		
		// Corrección Hacer con un id
		
		for(int i = 0; i < userArray.size(); i++) {
			if (userArray.get(i).getName().indexOf(name) != -1) {
				userArray.remove(i);
			}
		}

		System.out.println("Deleted " + name + " " + userArray.size());

		return "success";

	}

	 // Modify Users By Name
	@RequestMapping(value = "/modUser", method = RequestMethod.POST)
	public String modifyUser(String oldName, String newName, String phases) {	
		
		for(int i = 0; i < userArray.size(); i++) {
			if (userArray.get(i).getName().indexOf(oldName) != -1) {
				userArray.get(i).setName(newName);
				userArray.get(i).setRawPhases(phases);

			}
		}
		
		return "success";

	}
	

	 // Modify Phases By Name
	@RequestMapping(value = "/modPhase", method = RequestMethod.POST)
	public String modifyPhase(String name, int wip, int min, int max) {	
		
		for(int i = 0; i < phasesArray.size(); i++) {
			if (phasesArray.get(i).getName().indexOf(name) != -1) {
				phasesArray.get(i).setMaxTasks(wip);
				phasesArray.get(i).setMinTime(min);
				phasesArray.get(i).setMaxTime(max);
				
			}
		}
		
		return "success";

	}
	
	public void addPhases(String phase) {
		boolean phaseExist = false;


		if(!allPhases.isEmpty()) {

			for(String aphase: allPhases) {

				if(phase.trim().toUpperCase().equals(aphase.toUpperCase().trim())) {
					phaseExist = true;
				} 
			}
			if(!phaseExist) {


				allPhases.add(phase.trim());

			} else {

			}
		} else {
			allPhases.add(phase.trim());

		}
		phaseExist = false;
	}
}