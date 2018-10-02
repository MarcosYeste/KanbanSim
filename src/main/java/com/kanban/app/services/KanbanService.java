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
		
		System.out.println(phasesArray.get(0).getName());
		
		return phasesArray;
		
	}
	public ArrayList<User> saveUser(User user) {
		
		ArrayList<User> phasesArray = new ArrayList <User>();
		
		phasesArray.add(user);
		
		
		return phasesArray;
		
	}
	public ArrayList<Task> saveTask(Task task) {
		
		ArrayList<Task> phasesArray = new ArrayList <Task>();
		
		phasesArray.add(task);
		
		
		return phasesArray;
		
	}

}
