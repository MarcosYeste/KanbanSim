package com.kanban.app.Model;

public class ResultTask {
	
	private int cycleTime;
	private int leadTime;
	private int esfuerzo;
	private String[] usuarios;
	private int backlog;
	private double mediaCycle;
	private double mediaLead;
	
	public ResultTask(int cycleTime, int leadTime, int esfuerzo, String[] usuarios, int backlog, double mediaCycle,
			double mediaLead) {
		super();
		this.cycleTime = cycleTime;
		this.leadTime = leadTime;
		this.esfuerzo = esfuerzo;
		this.usuarios = usuarios;
		this.backlog = backlog;
		this.mediaCycle = mediaCycle;
		this.mediaLead = mediaLead;
	}

	public int getCycleTime() {
		return cycleTime;
	}

	public int getLeadTime() {
		return leadTime;
	}

	public int getEsfuerzo() {
		return esfuerzo;
	}

	public String[] getUsuarios() {
		return usuarios;
	}

	public int getBacklog() {
		return backlog;
	}

	public double getMediaCycle() {
		return mediaCycle;
	}

	public double getMediaLead() {
		return mediaLead;
	}
	
	

}
