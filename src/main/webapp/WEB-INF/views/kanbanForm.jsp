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


	</div>
	<script>
	document.getElementById("nameContainer").hidden = true;
	
	function numNames(){
		document.getElementById("select").hidden = true;
		var num = document.getElementById("selectPhase").value;
		var form = document.getElementById("nameContainer");
		for(var i = 0 ; i < num; i++){
			
			form.hidden = false;
			
			form.innerHTML += '<form:form action="/add" modelAttribute="phases" method="post"> ' +
			'<form:label path="name">Nombre de la Fase</form:label><form:input path="name" /><br>'+
			'<form:label path="maxTasks">Maximo de tareas</form:label>	<form:input path="maxTasks" /><br><br><input type="submit" value="enviar"></form:form>';
			
		}
		
		
	}

	</script>
</body>
</html>