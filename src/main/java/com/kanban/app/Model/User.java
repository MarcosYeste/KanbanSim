package com.kanban.app.Model;

import java.util.ArrayList;

public class User {
	
	private String name;
	private String rawPhases;
	private ArrayList<String> phases = new ArrayList<String>();
	private boolean assigned = false;
	private int timeStopped;
	private int tasksWorked;
	
	

	public User(String name, String specs) {
		this.name = name;
		this.rawPhases = specs;
	}

	public User() {
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
		
	}


	public int getTimeStopped() {
		return timeStopped;
	}

	public void setTimeStopped(int timeStoped) {
		this.timeStopped = timeStoped;

	}
	
	public String getRawPhases() {
		return rawPhases;
	}


	public void setPhases(ArrayList<String> phases) {
		this.phases = phases;
	}

	public void setRawPhases(String rawPhase) {
		this.phases = new ArrayList<String>();
		this.rawPhases = rawPhase;
		String[] filteredPhases = rawPhase.split(",");
		for(String phase : filteredPhases) {
			addPhases(phase.trim());
		}

		for(String phase : this.phases) {
		}
	}

	public ArrayList<String> getPhases() {
		return phases;
	}
	public void addPhases(String phase) {
		this.phases.add(phase);
	}

	public boolean isAssigned() {
		return assigned;
	}

	public void setAssigned(boolean assigned) {
		this.assigned = assigned;
	}

	@Override
	public String toString() {
		return "User [name=" + name + ", rawPhases=" + rawPhases + ", timeStopped=" + timeStopped + ", phases="
				+ phases + ", assigned=" + assigned + "]";
	}
	
	public int getTasksWorked() {
		return tasksWorked;
	}

	public void setTasksWorked(int tasksWorked) {
		this.tasksWorked = tasksWorked;
	}
}
