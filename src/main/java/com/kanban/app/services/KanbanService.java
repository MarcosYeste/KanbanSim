package com.kanban.app.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.kanban.app.Model.Phase;
import com.kanban.app.Model.Results;
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
	public Results saveResultados(Results resultados) {
		
		Results nuevosResultados = new Results(resultados.getTaskCycle(), resultados.getTaskLead(), resultados.getTaskEsfuerzo(), resultados.getTaskUsuarios(), resultados.getTaskMediaCL(),
				resultados.getTaskBacklog(),resultados.getTaskPhasesSeconds(), resultados.getPhaseStatesSeconds(),
				resultados.getPhaseMediaFase(),resultados.getPhaseMediaTask(),resultados.getPhaseMediaTotal(),resultados.getPhaseSecondsTotal(), resultados.getUserTaskWorked(),
				resultados.getUserActiveTime(),resultados.getUserInactiveTime(), resultados.getUserBestWorker(), resultados.getUserLessWorker(), resultados.getUserSecondsPhase(),
				resultados.getUserNamesWorstBest());
		
		// repository.save(resultados);
		
		return nuevosResultados;
		
		
	} 

	

}
