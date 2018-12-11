package com.kanban.app.Model;

public class Results {

	private int [] taskCycle; 
	private int[] taskLead;
	private int[] taskEsfuerzo;
	private String[] taskUsuarios;
	private double[] taskMediaCL;// opcional
	private int[] taskBacklog;
	private int [][] taskPhasesSeconds; // --
	private int[][][] phaseStatesSeconds; // --
	private double[][][] phaseMediaFase; // --
	private double[][][] phaseMediaTask; // --
	private double phaseMediaTotal;
	private int[] phaseSecondsTotal;
	private int[] userTaskWorked;
	private int[] userActiveTime;
	private int[] userInactiveTime;
	private int[] userBestWorker; // --
	private int[] userLessWorker; // --
	private int[][] userSecondsPhase; // --
	private String[][] userNamesWorstBest; // --
	

	public Results(int[] taskCycle, int[] taskLead, int[] taskEsfuerzo, String[] taskUsuarios, double[] taskMediaCL,
			int[] taskBacklog, int[][] taskPhasesSeconds,
			int[][][] phaseStatesSeconds, double[][][] phaseMediaFase, double[][][] phaseMediaTask, double phaseMediaTotal,
			int[] phaseSecondsTotal, int[] userTaskWorked, int[] userActiveTime, int[] userInactiveTime,
			int[] userBestWorker, int[] userLessWorker, int[][] userSecondsPhase, String[][] userNamesWorstBest) {
		
		super();
		this.taskCycle = taskCycle;
		this.taskLead = taskLead;
		this.taskEsfuerzo = taskEsfuerzo;
		this.taskUsuarios = taskUsuarios;
		this.taskMediaCL = taskMediaCL;
		this.taskBacklog = taskBacklog;
		this.taskPhasesSeconds = taskPhasesSeconds;
		this.phaseStatesSeconds = phaseStatesSeconds;
		this.phaseMediaFase = phaseMediaFase;
		this.phaseMediaTask = phaseMediaTask;
		this.phaseMediaTotal = phaseMediaTotal;
		this.phaseSecondsTotal = phaseSecondsTotal;
		this.userTaskWorked = userTaskWorked;
		this.userActiveTime = userActiveTime;
		this.userInactiveTime = userInactiveTime;
		this.userBestWorker = userBestWorker;
		this.userLessWorker = userLessWorker;
		this.userSecondsPhase = userSecondsPhase;
		this.userNamesWorstBest = userNamesWorstBest;
	}

	public int[] getTaskCycle() {
		return taskCycle;
	}

	public void setTaskCycle(int[] taskCycle) {
		this.taskCycle = taskCycle;
	}

	public int[] getTaskLead() {
		return taskLead;
	}

	public void setTaskLead(int[] taskLead) {
		this.taskLead = taskLead;
	}

	public int[] getTaskEsfuerzo() {
		return taskEsfuerzo;
	}

	public void setTaskEsfuerzo(int[] taskEsfuerzo) {
		this.taskEsfuerzo = taskEsfuerzo;
	}

	public String[] getTaskUsuarios() {
		return taskUsuarios;
	}

	public void setTaskUsuarios(String[] taskUsuarios) {
		this.taskUsuarios = taskUsuarios;
	}

	public double[] getTaskMediaCL() {
		return taskMediaCL;
	}

	public void setTaskMediaCL(double[] taskMediaCL) {
		this.taskMediaCL = taskMediaCL;
	}

	public int[] getTaskBacklog() {
		return taskBacklog;
	}

	public void setTaskBacklog(int[] taskBacklog) {
		this.taskBacklog = taskBacklog;
	}

	public int[][] getTaskPhasesSeconds() {
		return taskPhasesSeconds;
	}

	public void setTaskPhasesSeconds(int[][] taskPhasesSeconds) {
		this.taskPhasesSeconds = taskPhasesSeconds;
	}

	public int[][][] getPhaseStatesSeconds() {
		return phaseStatesSeconds;
	}

	public void setPhaseStatesSeconds(int[][][] phaseStatesSeconds) {
		this.phaseStatesSeconds = phaseStatesSeconds;
	}

	public double[][][] getPhaseMediaFase() {
		return phaseMediaFase;
	}

	public void setPhaseMediaFase(double[][][] phaseMediaFase) {
		this.phaseMediaFase = phaseMediaFase;
	}

	public double[][][] getPhaseMediaTask() {
		return phaseMediaTask;
	}

	public void setPhaseMediaTask(double[][][] phaseMediaTask) {
		this.phaseMediaTask = phaseMediaTask;
	}

	public double getPhaseMediaTotal() {
		return phaseMediaTotal;
	}

	public void setPhaseMediaTotal(double phaseMediaTotal) {
		this.phaseMediaTotal = phaseMediaTotal;
	}

	public int[] getPhaseSecondsTotal() {
		return phaseSecondsTotal;
	}

	public void setPhaseSecondsTotal(int[] phaseSecondsTotal) {
		this.phaseSecondsTotal = phaseSecondsTotal;
	}

	public int[] getUserTaskWorked() {
		return userTaskWorked;
	}

	public void setUserTaskWorked(int[] userTaskWorked) {
		this.userTaskWorked = userTaskWorked;
	}

	public int[] getUserActiveTime() {
		return userActiveTime;
	}

	public void setUserActiveTime(int[] userActiveTime) {
		this.userActiveTime = userActiveTime;
	}

	public int[] getUserInactiveTime() {
		return userInactiveTime;
	}

	public void setUserInactiveTime(int[] userInactiveTime) {
		this.userInactiveTime = userInactiveTime;
	}

	public int[] getUserBestWorker() {
		return userBestWorker;
	}

	public void setUserBestWorker(int[] userBestWorker) {
		this.userBestWorker = userBestWorker;
	}

	public int[] getUserLessWorker() {
		return userLessWorker;
	}

	public void setUserLessWorker(int[] userLessWorker) {
		this.userLessWorker = userLessWorker;
	}

	public int[][] getUserSecondsPhase() {
		return userSecondsPhase;
	}

	public void setUserSecondsPhase(int[][] userSecondsPhase) {
		this.userSecondsPhase = userSecondsPhase;
	}

	public String[][] getUserNamesWorstBest() {
		return userNamesWorstBest;
	}

	public void setUserNamesWorstBest(String[][] userNamesWorstBest) {
		this.userNamesWorstBest = userNamesWorstBest;
	}

	
}
