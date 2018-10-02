<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page session="false"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Kanban</title>
</head>
<body>
	<h1>${kanbanMSG}</h1>


	<form:form action="/add" modelAttribute="phases" method="post">
	
	<form:label path="name">Nombre de la Fase</form:label>
	<form:input path="name"/><br><br>
	<form:label path="maxTasks">¿Cuantas Tareas?</form:label>
	<form:input path="maxTasks"/> <br><br>

		<input type="submit" value="enviar">
	</form:form>
</body>
</html>