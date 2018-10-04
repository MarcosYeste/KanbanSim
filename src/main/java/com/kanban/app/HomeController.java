package com.kanban.app;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	List<Phase> phasesArray = new ArrayList <Phase>();
	List<Task> taskArray = new ArrayList <Task>();
	List<User> userArray = new ArrayList <User>();
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance( DateFormat.LONG, DateFormat.LONG, locale);

		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate );


		return "home";
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

		

		return "kanbanVersion2";

	}



	@RequestMapping(value = "/addTask", method = RequestMethod.GET)
	public String newTask(Model model) {
		
		
		
		model.addAttribute("task",new Task());
		

		return "taskForm";
	}
	@RequestMapping(value = "/addTask", method = RequestMethod.POST)
	public String createTask(Model model, @ModelAttribute("task") Task task) {
		
		
		
		model.addAttribute("phases", kanbanService.saveTask(task, taskArray));
		


		return "kanbanVersion2";
	}


	

	@RequestMapping(value = "/addUser", method = RequestMethod.GET)
	public String newUser(Model model) {
		
		
		
		model.addAttribute("user",new User());


		return "userForm";
	}

	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public String createUser(Model model, @ModelAttribute("user") User user) {
		
		
		
		model.addAttribute("phases", kanbanService.saveUser(user, userArray));
		


		return "kanbanVersion2";
	}


}
