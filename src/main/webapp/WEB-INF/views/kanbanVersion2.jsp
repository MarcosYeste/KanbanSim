<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="header.jsp"></jsp:include>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<title>Kanban</title>
<link rel="stylesheet" href="/resources/css/kanban.css">


</head>
<body>
	<div class="botonesContainer1" id="botonesContainer1">

		<!-- Nuevo Tablero -->
		<div class="doubleButton" id="doubleButton">
			<button id="divDelete">
				<i id="deleteAll" class="fas fa-file fa-3x" data-toggle="tooltip"
					data-placement="top" title="Nuevo Tablero"></i>
			</button>

			<!-- Borrar Tareas -->
			<button id="divDeleteTasks">
				<i id="deleteTasks" class="fas fa-trash-alt fa-3x"
					data-toggle="tooltip" data-placement="top" title="Borrar Tareas"></i>
			</button>

		</div>

		<button id="result" onclick="generarResultados()" class="resultbutt">
			<i class="fas fa-clipboard-list fa-4x" data-toggle="tooltip"
				data-placement="top" title="Mostrar Resultados"></i>
		</button>
	</div>

	<h1 class="texto">KANBAN SIM</h1>
	<p data-toggle="modal" data-target="#modalChrono" id="chronoViewer">00:00</p>
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
	<div class="contenedor" id="contenedor">

		<div class="principio">

			<div class="tituloInit">Backlog</div>
			<div class="tituloInit barra"></div>
			<div class="contenedorTareas">

				<script>
					var listTareas = new Array();
					var listPhases = new Array();
					var listUsers = new Array();
				</script>

				<c:forEach items="${task}" var="task">

					<div class="tareas"  data-toggle="modal" data-target="#modalTaskInfo">

						<p>
							<c:out value="${task.name}"></c:out>
						</p>

						<p class="estado">
							<small class="divState"><c:out value="${task.state}"></c:out></small>
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
						tareas.staticAssigneds = new Array();
						tareas.sameIteration = false;
						tareas.cycleTime = 0;
						tareas.leadTime = 0;
						tareas.startTime = 0;
						tareas.phasesTime = new Array();
						listTareas.push(tareas);
					</script>

				</c:forEach>

			</div>

		</div>

		<div id="faseDiv" class="fase">

			<c:forEach items="${phases}" var="fase">

				<div class="faseName"
					style='background-color:<c:out value="${fase.color}"></c:out>'
					id=<c:out value="${fase.id}"></c:out>>
					<div class="titulo" data-toggle="modal" data-target="#myModal"
						name="<c:out value='${fase.name}'></c:out>">
						<c:out value="${fase.name}"></c:out>
						<small>(WIP: <c:out value="${fase.maxTasks}"></c:out>)
						</small>
					</div>

					<div class="subfase"
						style='background-color:<c:out value="${fase.color}"></c:out>'>

						<div id="doing" class="doing">

							<p class="subSubfase">Doing</p>

						</div>

						<div id="done" class="done">

							<p class="subSubfase">Done</p>

						</div>
					</div>
				</div>


				<c:set value="${fase.id}" var="id" />
				<!-- Sujeto Pruebas -->
				<c:set value="${fase.name}" var="name" />
				<c:set value="${fase.maxTasks}" var="maxTasks" />
				<c:set value="${fase.maxTime}" var="maxTime" />
				<c:set value="${fase.minTime}" var="minTime" />
				<c:set value="${fase.color}" var="color" />

				<script>
					var phase = new Object();
					phase.id = "<c:out value="${id}"></c:out>"; // Sujeto Pruebas
					phase.name = "<c:out value="${name}"></c:out>";
					phase.maxTasks = <c:out value="${maxTasks}"></c:out>;
					phase.maxTime = <c:out value="${maxTime}"></c:out>;
					phase.minTime = <c:out value="${minTime}"></c:out>;
					phase.color = '<c:out value="${color}"></c:out>';
					phase.period = 0;
					listPhases.push(phase);
					console.log(phase.id);// Sujeto Pruebas
				</script>

			</c:forEach>
		</div>

		<div class="fin">

			<div class="tituloEnd">Fin</div>
			<div class="tituloEnd barra"></div>
			<div class="contenedorFinal"></div>

		</div>
	</div>
	<fieldset class="teamField">
		<legend class="teamField">Miembros del Equipo:</legend>
		<span style="float: right;" class="legUser"><i
			class="fas fa-user-plus fa-2x" id="addUser" data-toggle="modal"
			data-target="#addUsers"></i></span>
		<div class="usersContainer">

			<c:forEach items="${user}" var="user">
				<div class="userName" name="<c:out value='${user.name}'></c:out>"
					data-toggle="modal" data-target="#myModal2">
					<p>
						<strong><c:out value="${user.name}"></c:out></strong>
					</p>
					<i class="fa fa-user-tie fa-2x" aria-hidden="true"></i>

					<c:set value="${user.name}" var="name" />
					<c:set value="${user.phases}" var="userphases" />
					<c:set value="${user.skills}" var="userSkills" />

					<script>
						var userO = new Object();
						userO.name = "<c:out value="${name}"></c:out>";
						userO.tasksWorked = 0;
						userO.secondByPhase = new Array();
						userO.secondsWork = 0;
						userO.secondsNotWorked = 0;
						userO.timeStopped = 0;
						rawPhases = "<c:out value="${userphases}"></c:out>";
						userO.phases = rawPhases.replace('[', '').replace(']',
								'').split(',');
						rawSkills = "<c:out value="${userSkills}"></c:out>";
						userO.skills = rawSkills.replace('[', '').replace(']',
								'').split(',');
						userO.assigned = false;
						listUsers.push(userO);
						console.table(listUsers);
					</script>
				</div>
			</c:forEach>
		</div>
	</fieldset>

	<!-- Modal Modificar Fases-->
	<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Modificar Fase</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body">
					Nombre Fase: <input type="text" id="modName" disabled> WIP:
					<input type="text" id="modWip"> Tiempo Mínimo: <input
						type="text" id="modMinTime"> Tiempo Máximo: <input
						type="text" id="modMaxTime"> Color:
					<div class="col-10">
						<input class="form-control" type="color" id="color-input"
							list="presetColors">

						<datalist id="presetColors">
							<option>#4ce600</option>
							<option>#66cc00</option>
							<option>#00ffbf</option>
							<option>#009999</option>
							<option>#005ce6</option>
							<option>#563d7c</option>
							<option>#da70d6</option>
							<option>#cc00cc</option>
							<option>#b30047</option>
							<option>#e60000</option>
							<option>#cc8800</option>
							<option>#cccc00</option>
							<option>#E5FB22</option>
							<option>#BEFF00</option>
							<option>#ace600</option>
						</datalist>
					</div>
					<br>
					<button id="ModPhase" class="btn btn-secondary"
						data-dismiss="modal">Modificar</button>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>

		</div>
	</div>



	<!-- Modal Modificar Usuarios-->
	<div class="modal fade" id="myModal2" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Modificar Miembro</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">

					Nombre Usuario: <input type="text" id="modNameUser">
					<div>Fases:</div>
					<div id="modFasesUser"></div>
					<br> Rendimiento por fase:
					<div id="modSkillsUser"></div>
					<br>
					<button id="ModUsuario" class="btn btn-secondary"
						data-dismiss="modal">Modificar</button>

				</div>
				<div class="modal-footer">
					<button id="RmvUsuario" class="btn btn-danger" data-dismiss="modal">Eliminar
						Miembro</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>


	<!-- Modal Añadir Usuarios-->
	<div class="modal fade" id="addUsers" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Añadir Miembro</h4>

					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">
					Nombre Usuario: <input type="text" id="addNameUser">
					<div>Fases:</div>
					<div id="addFasesUser"></div>
					<br> Rendimiento por fase:
					<div id="addSkillsUser"></div>
					<br>
					<button id="addUsuario" class="btn btn-secondary"
						data-dismiss="modal">Añadir</button>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Modificar Temporizqdor-->
	<div class="modal fade" id="modalChrono" role="dialog">

		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Temporizador</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">
					Tiempo: <input type="number" id="modChronoTime" value="0">

					<div>
						<input type="radio" name="chronoTimeType" value="sec" checked>Segundos
						<input type="radio" name="chronoTimeType" value="min">Minutos
					</div>
					<button id="modChrono" class="btn btn-secondary"
						data-dismiss="modal">Modificar</button>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Modal Task Info-->
	<div class="modal fade" id="modalTaskInfo" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Información de tarea</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">
					<p id="modalTaskName">Nombre: </p>
					<p id="modalTaskAssignedTimes">Tiempo asignado por fase: </p>
					<p id="modalTaskTSS">Tiempo real por fases: </p>
					<p id="modalTaskLTCT">LT y CT estimado: </p>
					

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