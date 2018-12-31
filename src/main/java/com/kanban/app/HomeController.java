package com.kanban.app;

import java.net.MalformedURLException;
import java.util.Locale;

//import org.json.JSONObject; // comentado para recuperar resultado
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kanban.app.services.DistributionService;
import com.kanban.app.services.KanbanService;
import com.kanban.app.services.RestdbService;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.exceptions.UnirestException;


/**
 * Handles requests for the application home page.
 */
@Controller

public class HomeController {

	@Autowired
	KanbanService kanbanService;
	@Autowired
	RestdbService restdbService;
	@Autowired
	DistributionService distributionService;


	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {



		return "success";

	}

	@RequestMapping(value = "/success", method = RequestMethod.GET)
	public String succes(Model model) throws MalformedURLException {

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
	public @ResponseBody String weight(int sValue, int mValue, int lValue, int xlValue) {

		return distributionService.getNextWeight(sValue, mValue, lValue, xlValue);

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