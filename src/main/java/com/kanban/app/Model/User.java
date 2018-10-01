package com.kanban.app.Model;

public class User {
	

	private String name;
	private float timeStoped;
	private String[] specializations;
	
	public User(String name, String[] specializations) {
		this.name = name;
		this.specializations = specializations;
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

	public String[] getSpecializations() {
		return specializations;
	}

	public void setSpecializations(String[] specializations) {
		this.specializations = specializations;
	}
	
	
}
