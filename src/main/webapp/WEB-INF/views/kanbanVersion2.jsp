<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<jsp:include page="header.jsp"></jsp:include>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Kanban</title>
<link rel="stylesheet" href="/resources/css/kanban.css">


</head>
<body>
	<div class="botonesContainer1">
	
		<!-- Nuevo Tablero -->
		<div id="deleteButtons">
		
			<div id="divDelete">
				<i id="deleteAll" class="fas fa-file fa-3x"></i>
			</div>

			<!-- Borrar Tareas -->
			<div id="divDeleteTasks" data-toggle="tooltip" data-placement="top"
				title="Borrar Tareas">
				<i id="deleteTasks" class="fas fa-trash-alt fa-3x"></i>
			</div>

		</div>
		
		<button id="result" onclick="generarResultados()" class="resultbutt"><i class="fas fa-clipboard-list fa-3x"></i></button>
		
	</div>
	<h1 class="texto">KANBAN SIM</h1>

	<div class="botonesContainer">
		
		<!--  Button Play/Pause -->
		
		<div id="divReset">
			<i id="reset" class="fas fa-redo fa-3x"></i>
		</div>
		<div class="playpause">
			<input type="checkbox" value="None" id="playpause" name="check" /> <label
				for="playpause" tabindex=1></label>
		</div>
	</div>

	<div id="mostrarResultadosDiv" class="mostrarResultadosDiv"></div>
	<div class="contenedor">

		<div class="principio">

			<div class="tituloInit">Etapa de inicio</div>
			<div class="tituloInit barra"></div>
			<div class="contenedorTareas">

				<script>
					var listTareas = new Array();
					var listPhases = new Array();
					var listUsers = new Array();
				</script>

				<c:forEach items="${task}" var="task">

					<div id="tareas" class="tareas">

						<p>
							<c:out value="${task.name}"></c:out>
						</p>

						<p class="estado">
							<small><c:out value="${task.state}"></c:out></small>
						</p>


						<p class="duration">
							<c:out value="${task.duration}"></c:out>
						</p>

					</div>

					<c:set value="${task.name}" var="taskName" />


					<script>
						var tareas = new Object();
						tareas.name = "<c:out value="${taskName}"></c:out>";
						tareas.duration = 0;
						tareas.tss = 0;
						tareas.state;
						tareas.phase = 0;
						tareas.assignedUsers = new Array();
						tareas.sameIteration = false;
						tareas.cycleTime = 0;
						tareas.leadTime = 0;
						listTareas.push(tareas);
					</script>

				</c:forEach>

			</div>

		</div>

		<div id="faseDiv" class="fase">

			<c:forEach items="${phases}" var="fase">

				<div class="faseName">
					<div class="titulo" data-toggle="modal" data-target="#myModal">

						<c:out value="${fase.name}"></c:out>

					</div>
					<div class="subfase">

						<div id="doing" class="doing">

							<p class="subSubfase">Doing</p>

						</div>

						<div id="done" class="done">

							<p class="subSubfase">Done</p>

						</div>
					</div>
				</div>

				<c:set value="${fase.name}" var="name" />
				<c:set value="${fase.maxTasks}" var="maxTasks" />
				<c:set value="${fase.maxTime}" var="maxTime" />
				<c:set value="${fase.minTime}" var="minTime" />

				<script>
					var phase = new Object();
					phase.name = "<c:out value="${name}"></c:out>";
					phase.maxTasks = <c:out value="${maxTasks}"></c:out>;
					phase.maxTime = <c:out value="${maxTime}"></c:out>;
					phase.minTime = <c:out value="${minTime}"></c:out>;
					phase.period = 0;
					listPhases.push(phase);
				</script>

			</c:forEach>
		</div>

		<div class="fin">

			<div class="tituloEnd">Etapa final</div>
			<div class="tituloEnd barra"></div>
			<div class="contenedorFinal"></div>

		</div>
	</div>	
	<div class="usersContainer">
		<c:forEach items="${user}" var="user">
			<div class="userName" name="<c:out value='${user.name}'></c:out>">
				<p>
					<strong><c:out value="${user.name}"></c:out></strong>
				</p>
				<i class="fa fa-user-tie fa-2x" aria-hidden="true"></i>

				<c:set value="${user.name}" var="name" />
				<c:set value="${user.phases}" var="userphases" />

				<script>
					var userO = new Object();
					userO.name = "<c:out value="${name}"></c:out>";
					userO.timeStopped = 0;
					rawPhases = "<c:out value="${userphases}"></c:out>";
					userO.phases = rawPhases.replace('[', '').replace(']', '')
							.split(',');
					userO.assigned = false;
					listUsers.push(userO);
				</script>
			</div>
		</c:forEach>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Modificar Fase</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body">

					Nombre Fase: <input type="text" id="modName"> Máximo
					Tareas: <input type="text" id="modWip"> Tiempo Mínimo: <input
						type="text" id="modMinTime"> Tiempo Máximo: <input
						type="text" id="modMaxTime"> <br>
					<button id="ModPhase" class="btn btn-secondary"
						data-dismiss="modal">Modificar</button>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>

		</div>
	</div>

	<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>