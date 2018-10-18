package com.kanban.app.Model;

import java.util.ArrayList;

public class User {
	

	private String name;
	private String rawPhases;
	private int timeStoped;
	private ArrayList<String> phases = new ArrayList<String>();
	private boolean assigned = false;
	
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

	public int getTimeStoped() {
		return timeStoped;
	}

	public void setTimeStoped(int timeStoped) {
		this.timeStoped = timeStoped;
	}
	
	public String getRawPhases() {
		return rawPhases;
	}

	public void setRawPhases(String rawPhase) {
		this.rawPhases = rawPhase;
		String[] filteredPhases = rawPhase.split(",");
		for(String phase : filteredPhases) {
			addPhases(phase.trim());
			System.out.println("Phases : " + phase.trim() + " added.");
		}
		System.out.println("Total Specs: " );
		for(String spec : this.phases) {
			System.out.println(spec);
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
		return "User [name=" + name + ", rawSpecs=" + rawPhases + ", timeStoped=" + timeStoped + ", specializations="
				+ phases + ", assigned=" + assigned + "]";
	}
	
	
}
