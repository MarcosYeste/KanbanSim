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
			</c:forEach>
		</div>

		<div class="fin">
			<div class="titulo">Etapa final</div>
			<div class="titulo barra"></div>
			<div class="contenedorFinal"></div>
		</div>
	</div>

	<button id="play" onclick="play()">Play</button>


	<!--  Button Play/Pause -->
	<div class="playpause">
		<input type="checkbox" value="None" id="playpause" name="check" /> <label
			for="playpause" tabindex=1></label>
	</div>
	
	<script>
		var userSpecs = [];
		var userNames = [];
	</script>
	<c:forEach items="${user}" var="user">

		<p>
			<strong><c:out value="${user.name}"></c:out></strong>
			<c:set value="${user.name}" var="useName" />
			<c:set value="${user.rawSpecs}" var="rawSpecs" />
		</p>

		<script>
		userNames.push('<c:out value="${useName}"></c:out>');
		userSpecs.push('<c:out value="${rawSpecs}"></c:out>');
		</script>
	</c:forEach>
	<script>
	var firstLoop = true;
	var myInterval;
	
	document.getElementById("playpause").addEventListener("click", function(){
		clearInterval(myInterval);
		console.log("%cStopped", "font-size: 20px; color:red; font-weight: bold")
	});
	function play() {
		
		var divsTareas = document.getElementsByClassName("tareas");
		var duration = document.getElementsByClassName("duration");
		var subfases = document.getElementsByClassName("subfase");
		var fases = document.getElementsByClassName("faseName");
		var y = 0;
		
		
		console.log("Length " + subfases.length);
		
		myInterval = setInterval(function (){
			//
			console.log("Iteration Star");//p
			for(var i = 0; i < fases.length; i++){
				console.log("abf");
				var doing =  fases[i].lastElementChild.firstElementChild;
				var done = fases[i].lastElementChild.lastElementChild;
				if(firstLoop){
					console.log("Fisrt Loop");
					for(var j = 0; j < listTareas.length; j++){
						listTareas[j].state = "Doing";
						listTareas[j].phase = 1;
						console.log("g");
					}
					firstLoop = false;
					
					for(var j = 0; j < divsTareas.length; j++){						
						doing.appendChild(divsTareas[0]);
					}
				}
				
				listTareas.forEach(function(task) {
					/*console.log("[Name " + task.name);
					console.log("Tss " + task.tss);
					console.log("State " + task.state);*/
					
					for (var k = 0; k < divsTareas.length; k++) { 
						var taskDuration = parseInt(divsTareas[k].lastElementChild.innerHTML);
						var elementName = divsTareas[k].firstElementChild.innerHTML;
						elementName = elementName.trim();
						console.log("-----------");
						/* console.log(task.state + " == Doing, " +  task.name + " == " + elementName + ", " +
								task.tss + " == " + taskDuration + 
								", " + task.phase + " == " + (i+1));*/
						 
						if(task.state == "Doing" && task.name == elementName && task.tss == taskDuration &&
								task.phase == (i+1)){
							/* console.log("IF 1"); */
							done.appendChild(divsTareas[k]);
							task.state = "Done";
							console.log("%c" + task.name + " is done", "font-size: 20px");
							task.sameIteration = true;
						} else if(task.state == "Doing" && task.name == elementName && task.tss != taskDuration &&
							task.phase == (i+1)){
							console.log("IF 2"); 
							task.tss++;
						} else if(task.state == "Done" && task.name == elementName && task.tss == taskDuration &&
									task.phase == (i+1) && !task.sameIteration){
							console.log("%cPassed " + task.name + " TO " + task.phase, "font-size: 20px; color:green");
							if(fases[i+1] == null){
								//fases[i].lastElementChild.firstElementChild.appendChild(divsTareas[k]); 
								document.getElementsByClassName("contenedorFinal")[0].appendChild(divsTareas[k]); 
							} else {
								fases[i+1].lastElementChild.firstElementChild.appendChild(divsTareas[k]); 
							}
							task.state = "Doing";
							task.phase++;
							task.tss = 0;
						}
					}					
				});
			}
			listTareas.forEach(function(task) {
				task.sameIteration = false;
			});
			if(document.getElementsByClassName("contenedorFinal")[0].childNodes.length == divsTareas.length){
				clearInterval(myInterval);
			}
		}, 1000);		

	}	
	
	</script>

	


	<script>
		var phases = $(".faseName");
		console.log(userNames);
		console.log(userSpecs);	
	</script>
<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>