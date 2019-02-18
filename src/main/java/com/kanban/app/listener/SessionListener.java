package com.kanban.app.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * Application Lifecycle Listener implementation class SessionListener
 *
 */
public class SessionListener implements HttpSessionListener {

    /**
     * Default constructor. 
     */
	 private static int totalActiveSessions = 0;
    public SessionListener() {
    }

	/**
     * @see HttpSessionListener#sessionCreated(HttpSessionEvent)
     */
    public void sessionCreated(HttpSessionEvent session)  { 
    	totalActiveSessions += 1;
    	session.getSession().setAttribute("visitas", totalActiveSessions);
    }

	/**
     * @see HttpSessionListener#sessionDestroyed(HttpSessionEvent)
     */
    public void sessionDestroyed(HttpSessionEvent session)  {
    	totalActiveSessions -= 1;
    	session.getSession().setAttribute("visitas", totalActiveSessions);
    }
	
}
