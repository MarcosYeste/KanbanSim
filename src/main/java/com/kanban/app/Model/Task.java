package com.kanban.app.Model;

public class Task {
	
	private String name;
	private float duration;
	private float tss; //Time Since Started
	private float leadTime;
	private float loopTime;
	private String state;
	
	
	public Task(String name, float duration) {
		this.name = name;
		this.duration = duration;
	}
	public Task() {
		this.tss = 0;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getDuration() {
		return duration;
	}
	public void setDuration(float duration) {
		this.duration = duration;
	}
	public float getLeadTime() {
		return leadTime;
	}
	public void setLeadTime(float leadTime) {
		this.leadTime = leadTime;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public float getLoopTime() {
		return loopTime;
	}
	public void setLoopTime(float loopTime) {
		this.loopTime = loopTime;
	}
	public float getTss() {
		return tss;
	}
	public void setTss(float tss) {
		this.tss = tss;
	}
	public void updateTss(float tt) { //Time Transcurred
		this.tss =+ tt;
	}
	
}
