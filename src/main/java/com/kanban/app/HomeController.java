package com.kanban.app;

import java.text.DateFormat;
import java.util.Date;
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
	// Este metodo lleva al formulario
	@RequestMapping(value = "/kanban", method = RequestMethod.GET)
	public String addKanban(Model model) {		
		
		String kanbanMSG = "This is a Kanban form Phases";
		model.addAttribute("phases", new Phase());
		model.addAttribute("task", new Task());
		model.addAttribute("user", new User());
		model.addAttribute("kanbanMSG", kanbanMSG );
		
		return "kanban";
	}
	// este metodo recoge el formulario y va al simulador
	@RequestMapping(value = "/addPhase", method = RequestMethod.POST)
	public String Kanban(Model model, @ModelAttribute("phases") Phase fases) {		
		
		model.addAttribute("phases", kanbanService.saveFases(fases));
		
		
		return "kanban";
	}
	@RequestMapping(value = "/addTask", method = RequestMethod.POST)
	public String addTareas(Model model, @ModelAttribute("Task") Task task) {		
		
		model.addAttribute("task", kanbanService.saveTask(task));
		
		
		
		return "kanban";
	}
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public String addTareas(Model model, @ModelAttribute("User") User user) {		
		
		model.addAttribute("user", kanbanService.saveUser(user));

		return "kanban";
	}
	
}
