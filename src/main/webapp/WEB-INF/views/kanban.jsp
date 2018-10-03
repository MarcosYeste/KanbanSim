<%@page import="com.kanban.app.services.KanbanService"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html>
<head>

<title>Kanban</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<link rel="stylesheet"
	href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<style>
/* div{
	border: 1px solid black;
	padding-left:50px;
	padding-right:50px;
	display: flex;
	flex-direction: row;
	
} */
label, input {
	display: block;
}

input.text {
	margin-bottom: 12px;
	width: 95%;
	padding: .4em;
}

fieldset {
	padding: 0;
	border: 0;
	margin-top: 25px;
}

h1 {
	font-size: 1.2em;
	margin: .6em 0;
}

.ui-dialog .ui-state-error {
	padding: .3em;
}
</style>

</head>

<body>

	<!-- Kanban Body -->
	<div class="container">
		<div class="col-sm-4 border-right">
			Inicio
			<div id="tareas"></div>
		</div>
		<div id="fases"></div>
		<div class="col-sm-4">
			Fin
			<div></div>
		</div>
	</div>
	<div id="userList"></div>

	<!-- Modal Form That Creates new Tasks -->
	<div id="dialog-form" title="Añadir Nueva Tarea">

		<form>
			<fieldset>
				<label for="tarea">Nombre Tarea</label> <input type="text"
					name="tarea" id="tarea"
					class="text ui-widget-content ui-corner-all">

				<!-- Allow form submission with keyboard without duplicating the dialog button -->
				<input type="submit" tabindex="-1"
					style="position: absolute; top: -1000px">
			</fieldset>
		</form>
	</div>


	<button id="create-Task">Nueva Tarea</button>

	<!-- Adds a New Phase -->
	<div id="PhaseForm" title="Añadir Nueva Fase">
		<form>
			<fieldset>

				<label for="nameFase">Nombre de la Fase</label> <input type="text"
					name="nameFase" class="text ui-widget-content ui-corner-all"
					id="nameFase"> <label for="maxTareas">Máximo de
					tareas</label> <input id="maxTareas" type="text" name="maxTareas"
					class="text ui-widget-content ui-corner-all"> <input
					type="submit" tabindex="-1"
					style="position: absolute; top: -1000px">

			</fieldset>
		</form>
	</div>

	<button id="create-Phase">Nueva Fase</button>

	<!-- Modal Form to add users  -->
	<div id="useerAddDiv" title="Añadir Usuario">
		<form id="form">
			<fieldset>
				<label>Nombre:</label><br> <input id="name" type="text"
					name="firstname"> <br> <label>Especialidades:</label><input
					id="addSpec" type="button" value="+"><input id="rmvSpec"
					type="button" value="-"><br>
				<div id="specContainer">
					<input id="spec1" type="text" name="especialidad1"><br>
				</div>
				<br> <br> <input type="submit" value="Guardar"
					tabindex="-1" style="position: absolute; top: -1000px">
			</fieldset>
		</form>
	</div>
	<button id="addUserB">Nuevo Usuario</button>


	<script src="/resources/js/userFormSpecs.js"></script>
	<script src="/resources/js/form3.js"></script>
	<script src="/resources/js/form.js"></script>
</body>
</html>