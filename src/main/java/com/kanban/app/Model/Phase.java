package com.kanban.app.Model;

public class Phase{
	
	private int id;
	private String name;
	private int maxTasks;
	private Task[] subphase1;
	private Task[] subpthase2;
	private int maxTime;
	private int minTime;
	private String color;

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
	public int getMaxTime() {
		return maxTime;
	}
	public void setMaxTime(int maxTime) {
		this.maxTime = maxTime;
	}
	public int getMinTime() {
		return minTime;
	}
	public void setMinTime(int minTime) {
		this.minTime = minTime;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id += id;
	}
	
}
