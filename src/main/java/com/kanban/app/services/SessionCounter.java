package com.kanban.app.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.stereotype.Service;

@Service
public class SessionCounter implements HttpSessionListener {

	private List<String> sessions = new ArrayList<String>();
	public static final String COUNTER = "session-counter";

	public void sessionCreated(HttpSessionEvent event) {
		Calendar now = Calendar.getInstance();
		HttpSession session = event.getSession();
		sessions.add(session.getId());
		
		System.out.println("SessionCounter.sessionCreated " + session.getId() + " - " + now.get(Calendar.HOUR_OF_DAY) + ":" 
				+ now.get(Calendar.MINUTE) + ":" +  now.get(Calendar.SECOND));
		
		
		session.setAttribute(SessionCounter.COUNTER, sessions);
	}

	public void sessionDestroyed(HttpSessionEvent event) {
		System.out.println("SessionCounter.sessionDestroyed " + event.getSession().getId());
	}

	public int getActiveSessionNumber() {

		return sessions.size();
	}
}