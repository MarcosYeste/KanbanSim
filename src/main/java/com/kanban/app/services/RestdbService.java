package com.kanban.app.services;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

@Service
public class RestdbService {
	
	public static final String  API_KEY = "4fd55f8dbb6159535486c82b500686095b3c5";
	public static final String  API_URL = "https://kanban-edd1.restdb.io/rest/kanbanblueprint";
	
			
	public  @ResponseBody JsonNode findAllBluePrints() throws UnirestException {
		
		
		
		@SuppressWarnings("rawtypes")
		HttpResponse ret = Unirest.get(API_URL)
				.header("x-apikey", API_KEY)
				.header("cache-control", "no-cache")
				.asJson();	
		return  (JsonNode) ret.getBody();
		
	}
	
	@SuppressWarnings("unused")
	public  @ResponseBody void updateBluePrint(Object listUsers, Object listPhases ,String id) throws UnirestException {
		
		@SuppressWarnings("rawtypes")
		HttpResponse response = Unirest.put(API_URL +"/"+ id)
				  .header("content-type", "application/json")
				  .header("x-apikey", API_KEY)
				  .header("cache-control", "no-cache")
				  .body("{\"listUsers\":"+ listUsers+",\"listPhases\":"+ listPhases+"}")
				  .asJson();
	}
	
	public @ResponseBody void saveBluePrint(Object blueprint, Object listUsers, Object listPhases) throws UnirestException {
		
		@SuppressWarnings({ "rawtypes", "unused" })
		HttpResponse post = Unirest.post(API_URL)
				.header("content-type", "application/json")
				.header("x-apikey", API_KEY)
				.header("cache-control", "no-cache")
				.body("{\"NameBlueprint\":\""+ blueprint +"\",\"listUsers\":"+ listUsers+",\"listPhases\":"+ listPhases+"}")
				.asString();
		
	}
}
