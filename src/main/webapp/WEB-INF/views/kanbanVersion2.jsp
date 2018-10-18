
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

	<div class="botonesContainer">
		<button id="play" onclick="mostrarResultados()" class="resultbutt">Mostrar
			Resultados</button>
		<!--  Button Play/Pause -->
		<div class="playpause">
			<input type="checkbox" value="None" id="playpause" name="check" /> <label
				for="playpause" tabindex=1></label>
		</div>
		<div id="divReset">
			<i id="reset" class="fas fa-redo fa-5x"></i>
		</div>
	</div>


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

					<script>
						var tareas = new Object();
						tareas.name = "<c:out value="${taskName}"></c:out>";
						tareas.duration = 0;
						tareas.tss = 0;
						tareas.state;
						tareas.phase = 0;
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
	<div class="mostrarResultadosDiv"></div>
	<script>
		var firstLoop = true;
		var myInterval;
		var cycleTime = 0;
		var leadTime = 0;
	
		document.getElementById("playpause").addEventListener("change", function() {
	
			if (this.checked) {
				play();
			} else {
	
				clearInterval(myInterval);
			}
		});
		// Botón reset			
		document.getElementById("reset").addEventListener("click", function() {
			location.reload();
		});
	
		function play() {
			var divsTareas = document.getElementsByClassName("tareas");
			var duration = document.getElementsByClassName("duration");
			var subfases = document.getElementsByClassName("subfase");
			var fases = document.getElementsByClassName("faseName");
			var y = 0;
	
	
			console.log("Length " + subfases.length);
	
			myInterval = setInterval(function() {
				//
	
	
				leadTime += 1;
				console.log("Iteration Star"); //p
				for (var i = 0; i < fases.length; i++) {
					console.log("abf");
					var doing = fases[i].lastElementChild.firstElementChild;
					var done = fases[i].lastElementChild.lastElementChild;
					if (firstLoop) {
						console.log("Fisrt Loop");
						/* 	for(var j = 0; j < listTareas.length; j++){
								listTareas[j].state = "Doing";
							
									listTareas[j].phase = 1;
							
								
								
							} */
						firstLoop = false;
	
						for (var j = 0; j < divsTareas.length; j++) {
	
							if (((fases[0].lastElementChild.firstElementChild.childNodes.length - 3) +
								(fases[0].lastElementChild.lastElementChild.childNodes.length - 3))
								< listPhases[0].maxTasks) {
	
								doing.appendChild(divsTareas[0]);
								listTareas[j].cycleTime = 0;
								listTareas[j].state = "Doing";
								listTareas[j].phase = 1;
							}
	
	
						}
					}
	
					listTareas.forEach(function(task) {
						// Assigna un tiempo a cada tarea de entre el intervalo de la fase
						if (task.phase == (i + 1) && task.tss == 0 && task.state != "Done") {
							task.duration = Math.floor(Math.random() * listPhases[i].maxTime + listPhases[i].minTime);
						
							console.log(task.name + "duration " + task.duration);
	
						}
	
						for (var k = 0; k < divsTareas.length; k++) {
							var taskDuration = parseInt(task.duration);

							var elementName = divsTareas[k].firstElementChild.innerHTML;
							elementName = elementName.trim();
						 
							if(task.name == elementName){
								console.log("enter");
								divsTareas[k].lastElementChild.innerHTML = taskDuration;
							}
							
							
							console.log("-----------");
							/* console.log(task.state + " == Doing, " +  task.name + " == " + elementName + ", " +
									task.tss + " == " + taskDuration + 
									", " + task.phase + " == " + (i+1));*/
	
							if (task.state == "Doing" && task.name == elementName && task.tss == taskDuration &&
								task.phase == (i + 1)) {
								/* console.log("IF 1"); */
								done.appendChild(divsTareas[k]);
								task.state = "Done";
								console.log("%c" + task.name + " is done", "font-size: 20px");
								task.sameIteration = true;
							} else if (task.state == "Doing" && task.name == elementName && task.tss != taskDuration &&
								task.phase == (i + 1)) {
								console.log("IF 2");
								if (task.phase > 0) {
									task.tss++;
								}
							} else if (task.state == "Done" && task.name == elementName && task.tss == taskDuration &&
								task.phase == (i + 1) && !task.sameIteration) {
								if (fases[i + 1] == null) {
									//fases[i].lastElementChild.firstElementChild.appendChild(divsTareas[k]); 
									document.getElementsByClassName("contenedorFinal")[0].appendChild(divsTareas[k]);
								} else {
									if (((fases[i + 1].lastElementChild.firstElementChild.childNodes.length - 3) +
										(fases[i + 1].lastElementChild.lastElementChild.childNodes.length - 3))
										< listPhases[i + 1].maxTasks) {
										console.log("%cPassed " + task.name + " TO " + task.phase, "font-size: 20px; color:green");
										fases[i + 1].lastElementChild.firstElementChild.appendChild(divsTareas[k]);
										task.state = "Doing";
										task.phase++;
										task.tss = 0;
										task.cycleTime = cycleTime;
										task.leadTime = leadTime;
									}
								}
	
							} else if (task.state == null && task.name == elementName && task.phase == 0) {
								console.log("IF 4" + task.name);
	
								if (((fases[0].lastElementChild.firstElementChild.childNodes.length - 3) +
									(fases[0].lastElementChild.lastElementChild.childNodes.length - 3))
									< listPhases[0].maxTasks) {
									doing.appendChild(divsTareas[0]);
									task.cycleTime = 0;
									task.state = "Doing";
									console.log("State " + task.state);
									task.phase = 1;
									if (task.phase == (i + 1) && task.tss == 0 && task.state != "Done") {
										task.duration = Math.floor(Math.random() * listPhases[i].maxTime + listPhases[i].minTime);
									
										console.log(task.name + "duration " + task.duration);
				
									}
								}
							}
						}
						console.log(task.state + " _ " + task.name + " _ " + elementName + " _ " +
							task.tss + " _ " + taskDuration + " _ " + task.phase + " _ " + task.cycleTime + "<= cycle");
					});
	
				}
				listTareas.forEach(function(task) {
					task.sameIteration = false;
				});
				if (document.getElementsByClassName("contenedorFinal")[0].childNodes.length == divsTareas.length) {
					clearInterval(myInterval);
				}
				cycleTime += 1;
				console.log("%cCICLO DE BIDA!" + cycleTime, "font-size: 20px; color:green");
				console.log("%cLEAD!" + leadTime, "font-size: 20px; color:green");
			}, 1000);
	
		}
	
	
		function mostrarResultados() {
			var text = "";
			listTareas.forEach(function(task) {
				var div = document.getElementsByClassName("mostrarResultadosDiv")[0];
				var p = document.createElement("P");
				var br = document.createElement("BR");
				text = document.createTextNode(task.name + " Cycletime: " + (task.cycleTime - 2));
				p.appendChild(text);
				div.appendChild(p);
				div.appendChild(br);
				var p2 = document.createElement("P");
				text = document.createTextNode(task.name + " Leadime: " + task.leadTime);
				p2.appendChild(text);
				div.appendChild(p2);
				div.appendChild(br);
			});
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
