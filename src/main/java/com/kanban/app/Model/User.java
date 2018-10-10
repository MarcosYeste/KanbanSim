package com.kanban.app.Model;

import java.util.ArrayList;

public class User {
	

	private String name;
	private String rawSpecs;
	private float timeStoped;
	private ArrayList<String> specializations = new ArrayList<String>();
	private boolean assigned = false;
	
	public User(String name, String specs) {
		this.name = name;
		this.rawSpecs = specs;
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
	
	public boolean isSpecialized(String spec) {
		
		for(String specialization: specializations) {
			if(specialization.equals(spec)) {
				return true;
			}
		}
		
		return false;
	}

	public String getRawSpecs() {
		return rawSpecs;
	}

	public void setRawSpecs(String rawSpecs) {
		this.rawSpecs = rawSpecs;
		String[] filteredSpecs = rawSpecs.split(",");
		for(String spec : filteredSpecs) {
			addSpecializations(spec.trim());
		}
	}

	public ArrayList<String> getSpecializations() {
		return specializations;
	}

	public void addSpecializations(String spec) {
		this.specializations.add(spec);
	}

	public boolean isAssigned() {
		return assigned;
	}

	public void setAssigned(boolean assigned) {
		this.assigned = assigned;
	}
	
	
}
