<%@page import="com.kanban.app.services.KanbanService"%>
<jsp:include page="header.jsp"></jsp:include>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<body>


	<!-- Lista donde se mostararn todos los usuarios  -->
	<div id="userList"></div>

	<!-- Kanban Body -->
	<div class="container pt-5 mw-100">
		<div class="row">
			<div class="col-sm-2 div-head">
				Inicio

				<div id="tareas" class="tarea"></div>

			</div>

			<div id="fases" class="row fases"></div>

			<div class="col-sm-2 div-head">
				Fin
				<div></div>
			</div>
		</div>
	</div>


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

	<!-- Adds a New Phase -->
	<div id="PhaseForm" title="Añadir Nueva Fase">
		<form:form action="/addPhase" modelAttribute="phases" method="post">
			<fieldset>
				<form:label path="name">Nombre de la Fase</form:label>
				<form:input type="text" path="name" id="nameFase" name="nameFase"
					class="text ui-widget-content ui-corner-all" />
				<br>
				<form:label path="maxTasks">Maximo de tareas</form:label>
				<form:input type="text" name="maxTareas" id="maxTareas"
					path="maxTasks" class="text ui-widget-content ui-corner-all" />
				<br> <br> <input type="submit" value="enviar"
					tabindex="-1" style="position: absolute; top: -1000px" />
			</fieldset>
		</form:form>
	</div>

	<!-- Adds a New Phase -->
	<!-- 
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
-->




	<!-- Modal Form to add users  -->
	<div id="useerAddDiv" title="Añadir Usuario">
		<form id="form" method="post" action="/addUser">
			<fieldset>

				<label>Nombre:</label><br> <input id="name" type="text"
					name="firstname"> <br> <label>Especialidades:</label>
				<div>
					<input id="addSpec" type="button" value="+"> <input
						id="rmvSpec" type="button" value="-">
				</div>
				<br>

				<div id="specContainer">
					<input id="spec1" type="text" name="especialidad1"><br>
				</div>
				<br> <br> <input type="submit" value="Guardar"
					tabindex="-1" style="position: absolute; top: -1000px">

			</fieldset>
		</form>
	</div>

	<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>