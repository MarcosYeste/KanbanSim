<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page session="false"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Kanban</title>
</head>
<body>
	<h1>${kanbanMSG}</h1>

<form>
<div id="select">
<label>Numero de fases</label>
	<select id="selectPhase"  onchange="numNames()">
	<option value="0">--</option>
	<option value="1">1</option>
	<option value="2">2</option>
	<option value="3">3</option>
	<option value="4">4</option>
	<option value="5">5</option>
	
	</select>
</div>
</form><br><br>
<div id="nameContainer">

<form:form action="/prueba" modelAttribute="fase" method="post"> 
		<form:label path="name">Nombre de la Fase</form:label><form:input path="name" /><br>
			'<form:label path="maxTasks">Maximo de tareas</form:label>	
			<form:input path="maxTasks" /><br><br>
			<input type="submit" value="enviar">
			</form:form>


	</div>
	
	
	<!--  <div id="fases" class="row fases">${phases.name}
			
			 <c:forEach items="${phases}" var="fases">
			 <p><c:out value="${fases.name}"></c:out></p>
			  </c:forEach>
			</div>-->
	
	
	
	
</body>
</html>