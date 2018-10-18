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
		System.out.println("Pre addarray");
		addPhase(phasesArray.get(phasesArray.size() - 1).getName());
		return "success";


	}

	@RequestMapping(value = "/addTask", method = RequestMethod.GET)
	public String newTask(Model model) {
		
		model.addAttribute("task",new Task());

		return "taskForm";
	}
	
	@RequestMapping(value = "/addTask", method = RequestMethod.POST)
	public String createTask(Model model, @ModelAttribute("task") Task task) {
		
		model.addAttribute("task", kanbanService.saveTask(task, taskArray));
		model.addAttribute("phases", phasesArray);
		model.addAttribute("user", userArray);
		
		
		task.setDuration((int)(Math.random() * 4 + 1));


		return "success";

	}

	@RequestMapping(value = "/addUser", method = RequestMethod.GET)
	public String newUser(Model model) {
				
		model.addAttribute("user",new User());
		model.addAttribute("allPhases", this.allPhases);

		return "userForm";
	}

	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public String createUser(Model model, @ModelAttribute("user") User user) {	
		
		model.addAttribute("user", kanbanService.saveUser(user, userArray));
		model.addAttribute("phases",  phasesArray);
		model.addAttribute("task", taskArray);
		
		return "success";

	}
	
	public void addPhase(String inPhase) {
		boolean specExist = false;
		
//		for(String phase: inPhase) {
			if(allPhases.size() > 0) {
				//System.out.println("Existing Specs: ");
				for(String aPhase: allPhases) {
					//System.out.println(aPhase.trim());
					if(inPhase.trim().toUpperCase().equals(aPhase.toUpperCase().trim())) {
						specExist = true;
					} 
				}
				if(!specExist) {
					//System.out.println(inPhase + " No exist");
					allPhases.add(inPhase.trim());
					//System.out.println("Added: " + inPhase.trim());
				} else {
					//System.out.println(inPhase + " Exist");
					//System.out.println(inPhase + " no added");
				}
			} else {
				allPhases.add(inPhase.trim());
				//System.out.println("First add");
			}
			specExist = false;
//		}
	}
}
