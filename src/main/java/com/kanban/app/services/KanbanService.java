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
	
		userArray.add(user);
		
		
		return userArray;
		
	}
	public List<Task> saveTask(Task task,List<Task> taskArray) {
		
		
		taskArray.add(task);
		
		
		return taskArray;
		
	} 

	

}
