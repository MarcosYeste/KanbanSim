
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

	<h1 class="texto">KANBAN SIM</h1>

	<div class="contenedor">

		<div class="principio">

			<div class="titulo">Etapa de inicio</div>
			<div class="titulo barra"></div>
			<div class="contenedorTareas">

				<script>
					var listTareas = new Array();
					var listPhases = new Array();
				</script>

				<c:forEach items="${task}" var="task">

					<div id="tareas" class="tareas">

						<p>
							<c:out value="${task.name}"></c:out>
						</p>

						<p id="duration" class="duration">
							<c:out value="${task.duration}"></c:out>
						</p>

					</div>

					<c:set value="${task.name}" var="taskName" />
					<c:set value="${task.duration}" var="taskDuration" />
					<c:set value="${task.tss}" var="timeSinceStart" />
					<c:set value="${task.state}" var="state" />

					<script>
					
						var tareas = new Object();
						tareas.name = "<c:out value="${taskName}"></c:out>";
						tareas.duration = <c:out value="${taskDuration}"></c:out>;
						tareas.tss = <c:out value="${timeSinceStart}"></c:out>;
						tareas.state = " ";
						tareas.phase = 0;
						sameIteration = false;
						listTareas.push(tareas);
						
					</script>

				</c:forEach>

			</div>

		</div>

		<div id="faseDiv" class="fase">

			<c:forEach items="${phases}" var="fase">

				<div class="faseName">
					<div class="titulo">

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
					listPhases.push(phase);
				</script>

			</c:forEach>
		</div>

		<div class="fin">

			<div class="titulo">Etapa final</div>
			<div class="titulo barra"></div>
			<div class="contenedorFinal"></div>

		</div>
	</div>

	<!--  Button Play/Pause -->
	<div class="playpause">
		<input type="checkbox" value="None" id="playpause" name="check" /> <label
			for="playpause" tabindex=1></label>
	</div>

	<script>
	
		var userPhases = [];
		var userNames = [];
		
	</script>
	
	<c:forEach items="${user}" var="user">

		<p>
			<strong><c:out value="${user.name}"></c:out></strong>
			<c:set value="${user.name}" var="useName" />
			<c:set value="${user.rawPhases}" var="rawPhases" />
		</p>

		<script>
		
			userNames.push('<c:out value="${useName}"></c:out>');
			userPhases.push('<c:out value="${rawPhases}"></c:out>');
			
		</script>

	</c:forEach>

	<script>
	
		var firstLoop = true;
		var myInterval;

		document.getElementById("playpause").addEventListener("change",
				function() {
					if (this.checked) {
						play();
					} else {
						clearInterval(myInterval);
					}
				});

		function play() {

			var divsTareas = document.getElementsByClassName("tareas");
			var duration = document.getElementsByClassName("duration");
			var subfases = document.getElementsByClassName("subfase");
			var fases = document.getElementsByClassName("faseName");
			var y = 0;

			myInterval = setInterval(

					function() {

						console.log("Iteration Star");

						for (var i = 0; i < fases.length; i++) {

							var doing = fases[i].lastElementChild.firstElementChild;
							var done = fases[i].lastElementChild.lastElementChild;

							if (firstLoop) {

								for (var j = 0; j < listTareas.length; j++) {

									listTareas[j].state = "Doing";
									listTareas[j].phase = 1;
									// Por cada tarea a�adimos su tiempo random
									listTareas[j].duration = 
										Math.floor(Math.random() * listPhases[i].maxTime + listPhases[i].minTime);

								}

								firstLoop = false;

								for (var j = 0; j < divsTareas.length; j++) {

									doing.appendChild(divsTareas[0]);

								}
							}

							listTareas
									.forEach(function(task) {

										for (var k = 0; k < divsTareas.length; k++) {

											var taskDuration = parseInt(listTareas[k].duration);
											var elementName = divsTareas[k].firstElementChild.innerHTML;
											elementName = elementName.trim();

											if (task.state == "Doing"
													&& task.name == elementName
													&& task.tss == taskDuration
													&& task.phase == (i + 1)) {

												done.appendChild(divsTareas[k]);
												task.state = "Done";
												task.sameIteration = true;

											} else if (task.state == "Doing"
													&& task.name == elementName
													&& task.tss != taskDuration
													&& task.phase == (i + 1)) {

												task.tss++;

											} else if (task.state == "Done"
													&& task.name == elementName
													&& task.tss == taskDuration
													&& task.phase == (i + 1)
													&& !task.sameIteration) {

												if (fases[i + 1] == null) {

													document
															.getElementsByClassName("contenedorFinal")[0]
															.appendChild(divsTareas[k]);

												} else {

													if (((fases[i + 1].lastElementChild.firstElementChild.childNodes.length - 3) + (fases[i + 1].lastElementChild.lastElementChild.childNodes.length - 3)) < listPhases[i + 1].maxTasks) {

														fases[i + 1].lastElementChild.firstElementChild
																.appendChild(divsTareas[k]);
														task.state = "Doing";
														task.phase++;
														task.tss = 0;

													}
												}
											}
										}
									});
						}

						listTareas.forEach(function(task) {

							task.sameIteration = false;
						});

						if (document.getElementsByClassName("contenedorFinal")[0].childNodes.length == divsTareas.length) {
							clearInterval(myInterval);
						}
						
					}, 1000);
		}
	</script>

	<script>
		var phases = $(".faseName");
		console.log(userNames);
		console.log(userPhases);
	</script>

	<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>
