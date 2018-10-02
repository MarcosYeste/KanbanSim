package com.kanban.app.services;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.kanban.app.Model.Phase;
import com.kanban.app.Model.Task;
import com.kanban.app.Model.User;

@Service
public class KanbanService {
	
	public ArrayList<Phase> saveFases(Phase fases) {
		
		ArrayList<Phase> phasesArray = new ArrayList <Phase>();
		
		phasesArray.add(fases);
		
		
		return phasesArray;
		
	}
	public ArrayList<User> saveUser(User user) {
		
		ArrayList<User> userArray = new ArrayList <User>();
		
		userArray.add(user);
		
		
		return userArray;
		
	}
	public ArrayList<Task> saveTask(Task task) {
		
		ArrayList<Task> taskArray = new ArrayList <Task>();
		
		taskArray.add(task);
		
		
		return taskArray;
		
	}

}
