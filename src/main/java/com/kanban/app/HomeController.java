package com.kanban.app;


//import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kanban.app.listener.*;
import com.kanban.app.services.DistributionService;
import com.kanban.app.services.RestdbService;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.exceptions.UnirestException;



/**
 * Handles requests for the application home page.
 */
@Controller

public class HomeController {

	@Autowired
	RestdbService restdbService;
	@Autowired
	DistributionService distributionService;
	@Autowired
	SessionCounter session;


	/**
	 * Simply selects the home view to render by returning its name.
	 * @throws UnknownHostException 
	 */

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Model model ,  HttpSession Hsession) {	
		if(Hsession.getAttribute("session-counter") != null) {
			@SuppressWarnings("unchecked")
			List<String> sessionActive = (List<String>) Hsession.getAttribute("session-counter");
			model.addAttribute("visitas", sessionActive.size() -1);
		}
		return "kanban";

	}

	// Get Gaussian
	@RequestMapping(value = "/nextGaussian", method = RequestMethod.GET)
	public @ResponseBody String gaussian(int mean ,int variation) {


		return distributionService.getNextGaussian(mean, variation);
	}

	// Get Poisson value
	@RequestMapping(value = "/nextPoisson", method = RequestMethod.GET)
	public @ResponseBody String poisson(int lambda) {	

		return distributionService.getNextPoisson(lambda);
	}

	// Get with weight
	@RequestMapping(value = "/nextWeight", method = RequestMethod.GET)
	public @ResponseBody String weight(int sValue, int mValue, int lValue, int xlValue, int wTime) {

		return distributionService.getNextWeight(sValue, mValue, lValue, xlValue, wTime);

	}



	@RequestMapping(value = "/saveBluePrint", method = RequestMethod.POST)
	public @ResponseBody void saveBluePrint(String data) {
		JSONParser parser = new JSONParser();

		Object obj = null;
		try {
			obj = parser.parse(data);
		} catch (ParseException e) {

			e.printStackTrace();
		}
		JSONObject jsonobject = (JSONObject) obj;

		Object blueprint = jsonobject.get("nameBlueprint");
		Object listUsers = jsonobject.get("listU");
		Object listPhases = jsonobject.get("listP");


		try {

			restdbService.saveBluePrint(blueprint, listUsers, listPhases);


		} catch (UnirestException e) {

			e.printStackTrace();
		}

	}

	@RequestMapping(value = "/getBluePrint", method = RequestMethod.GET)
	public @ResponseBody String getSavedBluePrint() {

		JsonNode noderet = null;
		try {

			noderet = restdbService.findAllBluePrints();

		} catch (Exception e) {
			System.out.println(e);
		}

		// Paso el objeto como una String que recojo por el JS como JSON
		return noderet.toString();


	}

	@RequestMapping(value = "/updateBluePrint", method = RequestMethod.GET)
	public @ResponseBody void updateBluePrint(String id, String data) {



		JSONParser parser = new JSONParser();

		Object obj = null;
		try {
			obj = parser.parse(data);
		} catch (ParseException e) {

			e.printStackTrace();
		}
		JSONObject jsonobject = (JSONObject) obj;		
		Object listUsers = jsonobject.get("listU");
		Object listPhases = jsonobject.get("listP");

		try {

			restdbService.updateBluePrint(listUsers,listPhases,id);


		} catch (Exception e) {
			System.out.println(e);
		}
	}
}