package com.kanban.app.Model;

public class Phase {
	
	private String name;
	private int maxTasks;
	private Task[] subphase1;
	private Task[] subpthase2;
	
	public Phase(String name, int maxTasks) {
		this.name = name;
		this.maxTasks = maxTasks;
	}
	public Phase() {
		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getMaxTasks() {
		return maxTasks;
	}

	public void setMaxTasks(int maxTasks) {
		this.maxTasks = maxTasks;
	}

	public Task[] getSubphase1() {
		return subphase1;
	}

	public void setSubphase1(Task[] subphase1) {
		this.subphase1 = subphase1;
	}

	public Task[] getSubpthase2() {
		return subpthase2;
	}

	public void setSubpthase2(Task[] subpthase2) {
		this.subpthase2 = subpthase2;
	}

	
}
