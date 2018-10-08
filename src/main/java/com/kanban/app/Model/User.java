package com.kanban.app.Model;

import java.util.ArrayList;

public class User {
	

	private String name;
	private float timeStoped;
	private ArrayList<String> specializations;
	
	public User(String name, String...specs) {
		this.name = name;
		this.specializations = new ArrayList<String>();
		for (int i = 0; i < specs.length; i++) {
			this.specializations.add(specs[i]);
		}
	}

	public User() {
		this.specializations = new ArrayList<String>();
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
	public void setSpecializations(String specs) {
//		for(int i = 0; i < specs.length; i++) {
//			this.specializations.add(specs[i]);
//			System.out.println("Iterations" + i);
		
//		}

		this.specializations.add(specs);
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
