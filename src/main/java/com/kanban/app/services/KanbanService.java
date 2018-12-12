package com.kanban.app.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.kanban.app.Model.Phase;
import com.kanban.app.Model.Task;
import com.kanban.app.Model.User;

@Service
public class KanbanService {
	
	public List<Phase> saveFases(Phase fases,List<Phase> phasesArray ) {
		String uniqueID = UUID.randomUUID().toString();	
		fases.setId(uniqueID);
		phasesArray.add(fases);
		
		return phasesArray;
		
	}
	public List<User> saveUser(User user,List<User> userArray) {
		String uniqueID = UUID.randomUUID().toString();	
		user.setId(uniqueID);
		userArray.add(user);
		
		
		return userArray;
		
	}
	public List<Task> saveTask(Task task,List<Task> taskArray) {
		String uniqueID = UUID.randomUUID().toString();	
		task.setId(uniqueID);
		
		taskArray.add(task);
		
		
		return taskArray;
		
	}
	
//	public Results saveResultados(JSONObject jsonobject) {
//		
//		Results nuevosResultados = new Results((int[]) jsonobject.get("taskCycle"),(int[]) jsonobject.get("taskLead"), (int[]) jsonobject.get("taskEsfuerzo"), (String[]) jsonobject.get("taskUsuarios"), (double[]) jsonobject.get("taskMediaCL"),
//				(int[]) jsonobject.get("taskBacklog"),(int[][]) jsonobject.get("taskPhasesSeconds"), (int[][][]) jsonobject.get("phaseStatesSeconds"), (int[][][]) jsonobject.get("phaseSumaStates"),
//				(double[][][]) jsonobject.get("phaseMediaFase"),(double[][][]) jsonobject.get("phaseMediaTask"),(Double) jsonobject.get("phaseMediaTotal"),(int[]) jsonobject.get("phaseSecondsTotal"), (int[]) jsonobject.get("userTaskWorked"),
//				(int[]) jsonobject.get("userActiveTime"),(int[]) jsonobject.get("userInactiveTime"),(int[]) jsonobject.get("userBestWorker"), (int[]) jsonobject.get("userLessWorker"), (int[][]) jsonobject.get("userSecondsPhase"),
//				(String[][]) jsonobject.get("userNamesWorstBest"));
//		
//		// repository.save(resultados);
//		
//		return nuevosResultados;
//		
//	} 

	

}
