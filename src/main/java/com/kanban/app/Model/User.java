package com.kanban.app.Model;

import java.util.ArrayList;

public class User {
	

	private String name;
	private float timeStoped;
	private ArrayList<String> specializations;
	
	public User(String name, String[] specializations) {
		this.name = name;
		for(int i = 0; i < specializations.length; i++) {
			this.specializations.add(specializations[i]);
		}
	}
	public User() {
		
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getTimeStoped() {
		return timeStoped;
	}

	public void setTimeStoped(float timeStoped) {
		this.timeStoped = timeStoped;
	}
	
	public ArrayList<String> getSpecializations() {
		return specializations;
	}
	public void setSpecializations(ArrayList<String> specializations) {
		this.specializations = specializations;
	}
	
	public void addSpec(String newSpec) {
		this.specializations.add(newSpec);
	}
	
	public boolean isSpecialized(String spec) {
		
		for(String specialization: specializations) {
			if(specialization.equals(spec)) {
				return true;
			}
		}
		
		return false;
	}
}
