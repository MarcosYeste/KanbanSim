package com.kanban.app.Model;

import java.util.ArrayList;

public class User {
	

	private String name;
	private String rawPhases;
	private String rawSkills;
	private ArrayList<String> skills = new ArrayList<String>();
	private ArrayList<String> phases = new ArrayList<String>();
	private boolean assigned = false;
	private int timeStopped;
	
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


	public void setRawPhases(String rawPhase) {
		this.phases = new ArrayList<String>();
		this.rawPhases = rawPhase;
		String[] filteredPhases = rawPhase.split(",");
		for(String phase : filteredPhases) {
			addPhases(phase.trim());
			System.out.println("Phase : " + phase.trim() + " added.");
		}

		for(String phase : this.phases) {
			System.out.println(phase);
		}
	}
	
	public void setRawSkills(String rawSkills) {
		this.skills = new ArrayList<String>();
		this.rawSkills = rawSkills;
		String[] filteredPhases = rawSkills.split(",");
		for(String skill : filteredPhases) {
			this.skills.add(skill.trim());
			System.out.println("Skill : " + skill.trim() + " added.");
		}

		for(String skill : this.skills) {
			System.out.println(skill);
		}
	}

	public ArrayList<String> getPhases() {
		return phases;
	}

	public void setPhases(ArrayList<String> phases) {
		this.phases = phases;
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

	public ArrayList<String> getSkills() {
		return skills;
	}

	public void setSkills(ArrayList<String> skills) {
		this.skills = skills;
	}
	
	public String getRawSkills() {
		return rawSkills;
	}
	
	@Override
	public String toString() {
		return "User [name=" + name + ", rawPhases=" + rawPhases + ", timeStopped=" + timeStopped + ", phases="
				+ phases + ", assigned=" + assigned + "]";
	}
	
	
}
