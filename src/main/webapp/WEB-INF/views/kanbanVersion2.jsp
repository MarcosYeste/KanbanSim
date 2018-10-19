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
			<i id="reset" class="fas fa-redo fa-3x"></i>
		</div>
	</div>


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

			<div class="tituloEnd">Etapa final</div>
			<div class="tituloEnd barra"></div>
			<div class="contenedorFinal"></div>

		</div>
	</div>

	<c:forEach items="${user}" var="user">

		<p>
			<strong><c:out value="${user.name}"></c:out></strong>
		</p>

		<c:set value="${user.name}" var="name" />
		<c:set value="${user.phases}" var="userphases"/>
		
		<script>
			var userO = new Object();
			userO.name = "<c:out value="${name}"></c:out>";
			userO.timeStoped = 0;
			rawPhases = "<c:out value="${userphases}"></c:out>";
			userO.phases = rawPhases.replace('[', '').replace(']', '').split(',');
			userO.assigned = false;
			listUsers.push(userO);

		</script>

	</c:forEach>
	
	<div class="mostrarResultadosDiv"></div>
	
	<!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
        	<h4 class="modal-title"> Modificar Fase</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
        
          Nombre Fase: 	 <input type="text" id="modName">
          Máximo Tareas: <input type="text" id="modWip">
          Tiempo Mínimo: <input type="text" id="modMinTime">
          Tiempo Máximo: <input type="text" id="modMaxTime">
          <br>
          <button id="ModPhase" class="btn btn-secondary" data-dismiss="modal">Modificar</button>
	          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
	
	<script>
		var firstLoop = true;
		var myInterval;
		var cycleTime = 0;
		var leadTime = 0;
		var i = 0;
		
		// Mod Phases
		listPhases.forEach(function(phase) {
			
			// Abrimos el formulario			
			document.getElementsByClassName("titulo")[i].addEventListener("click", function(){
				
				// Mostramos los datos correspondientes a la fase
				document.getElementById("modName").value = phase.name;
				document.getElementById("modWip").value = phase.maxTasks;
				document.getElementById("modMinTime").value = phase.minTime;
				document.getElementById("modMaxTime").value = phase.maxTime;
				var posicion = i;
	
			});
			console.log(i);
			
			if(document.getElementsByClassName("titulo")[i].innerHTML.trim() == phase.name){
				// Modificar los datos
				document.getElementById("ModPhase").addEventListener("click", function(){
					phase.name = document.getElementById("modName").value;
					phase.maxTasks = document.getElementById("modWip").value;
					phase.minTime = document.getElementById("modMinTime").value;
					phase.maxTime = document.getElementById("modMaxTime").value;
					
					console.log(document.getElementsByClassName("titulo")[0].innerHTML.trim());
					
				});
				i++;
			}
		});
			
		
    	// Play Button
		document.getElementById("playpause").addEventListener("change", function() {
			
			// Si esta en play
			if (this.checked) {
				
				// Deshabilitamos los botones del header
				for (var i = 0; i < document.getElementById("header-btn").children.length; i++){
					
					document.getElementById("header-btn").children[i].setAttribute("class", "btn btn-success disabled");
					document.getElementById("header-btn").children[i].setAttribute("aria-disabled", "true");
					
				}
				// Y quitamos el acceso a el formulario de modificación
				for (var i = 0; i < document.getElementsByClassName("titulo").length; i++){
						
					document.getElementsByClassName("titulo")[i].removeAttribute("data-target", "#myModal");
					document.getElementsByClassName("titulo")[i].removeAttribute("data-toggle", "modal");
					
				}

				play();
				
			} else {
				
				clearInterval(myInterval);
	
				// Volvemos a habilitar el header
				for (var j = 0; j < document.getElementById("header-btn").children.length; j++){
					
					document.getElementById("header-btn").children[j].classList.remove("disabled");
					document.getElementById("header-btn").children[j].removeAttribute("aria-disabled");
					
				}
				
				// Permitimos de nuevo abrir el modal de modificación
				for (var i = 0; i < document.getElementsByClassName("titulo").length; i++){
				
					document.getElementsByClassName("titulo")[i].setAttribute("data-target", "#myModal");
					document.getElementsByClassName("titulo")[i].setAttribute("data-toggle", "modal");
					
				}
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

	
			myInterval = setInterval(function() {
	
				console.log("Iteration Star"); //p
				for (var i = 0; i < fases.length; i++) {
					var firstPhaseName = fases[0].firstElementChild.innerHTML;
					var doing = fases[i].lastElementChild.firstElementChild;
					var done = fases[i].lastElementChild.lastElementChild;
					
					if (firstLoop) {
						console.log("Fisrt Loop");
						/* 	for(var j = 0; j < listTareas.length; j++){
								listTareas[j].state = "Doing";
							
									listTareas[j].phase = 1;	
								
							} */

						for (var j = 0; j < divsTareas.length; j++) {
							if (((fases[0].lastElementChild.firstElementChild.childNodes.length - 3) +
								(fases[0].lastElementChild.lastElementChild.childNodes.length - 3))
								< listPhases[0].maxTasks) {
								
								listUsers.forEach(function(user) {
									if(!user.assigned && listTareas[j].assignedUsers[0] == null){
										
										for(var w = 0; w<user.phases.length; w++){
											if(user.phases[w] == firstPhaseName.trim()){
												doing.appendChild(divsTareas[0]);
												listTareas[j].cycleTime = 0;
												listTareas[j].state = "Doing";
												listTareas[j].phase = 1;
												listTareas[j].assignedUsers[0] = (user.name);
												user.assigned = true;
											}
										}
									} else {
										//console.log("no coinside " + listTareas[j].name);
									}
								}); //foreach 								
							} //if end
						} //for end

						firstLoop = false;
					} //if firstloop end
	

					listTareas.forEach(function(task) {
						
					
						// Assigna un tiempo a cada tarea de entre el intervalo de la fase
						if (task.phase == (i + 1) && task.tss == 0 && task.state != "Done") {

							task.duration = Math.floor(Math.random() * listPhases[i].maxTime + listPhases[i].minTime);

							cycleTime = parseInt(task.duration);
							task.cycleTime += cycleTime;	

						}

						for (var k = 0; k < divsTareas.length; k++) {
							var taskDuration = parseInt(task.duration);

							var elementName = divsTareas[k].firstElementChild.innerHTML;
							
							elementName = elementName.trim();
						 
							if(task.name == elementName){
								divsTareas[k].lastElementChild.innerHTML = taskDuration;
							}
												
							console.log("-----------");

							if (task.state == "Doing" && task.name == elementName && task.tss == taskDuration &&
								task.phase == (i + 1)) {
								done.appendChild(divsTareas[k]);
								task.state = "Done";
								console.log("%c" + task.name + " is done", "font-size: 20px");
								task.sameIteration = true;
								
								for(var w = 0; w < listUsers.length; w++){
									if(listUsers[w].name == task.assignedUsers[0]){
										listUsers[w].assigned = false;
										task.assignedUsers[0] = null;
// 										console.log("desa");
// 										console.log(listUsers[w]);
// 										console.log(task);
									}
								}
								
							} else if (task.state == "Doing" && task.name == elementName && task.tss != taskDuration &&
								task.phase == (i + 1)) {
								console.log("IF 2");
								if (task.phase > 0) {
									task.tss++;
								}
							} else if (task.state == "Done" && task.name == elementName && task.tss == taskDuration &&
								task.phase == (i + 1) && !task.sameIteration) {
								console.log("IF 3 " + task.name);
								if (fases[i + 1] == null) {
									//fases[i].lastElementChild.firstElementChild.appendChild(divsTareas[k]); 
									document.getElementsByClassName("contenedorFinal")[0].appendChild(divsTareas[k]);
									task.state = "Ended";

								} else {
									if (((fases[i + 1].lastElementChild.firstElementChild.childNodes.length - 3) +
										(fases[i + 1].lastElementChild.lastElementChild.childNodes.length - 3))
										< listPhases[i + 1].maxTasks) {

										listUsers.forEach(function(user) {
											//74
											if(!user.assigned && task.assignedUsers[0] == null){
												
												var actualPhaseName = fases[i+1].firstElementChild.innerHTML;
												for(var w = 0; w<user.phases.length; w++){
													if(user.phases[w] == actualPhaseName.trim()){
														fases[i + 1].lastElementChild.firstElementChild.appendChild(divsTareas[k]);
														task.state = "Doing";
														task.phase++;
														task.tss = 0;
														task.assignedUsers[0] = (user.name);
														user.assigned = true;
// 														console.log(user);
// 														console.log(task);
													}
												}//4
											}
										});
										
										
// 										console.log("%cPassed " + task.name + " TO " + task.phase, "font-size: 20px; color:green");
// 										fases[i + 1].lastElementChild.firstElementChild.appendChild(divsTareas[k]);
// 										task.state = "Doing";
// 										task.phase++;
// 										task.tss = 0;
// 										task.cycleTime = cycleTime;
// 										task.leadTime = leadTime;
									}
								}
	
							} else if (task.state == null && task.name == elementName && task.phase == 0) {
						
								console.log("IF 4 " + task.name);
								
								if (((fases[0].lastElementChild.firstElementChild.childNodes.length - 3) +
										(fases[0].lastElementChild.lastElementChild.childNodes.length - 3))
										< listPhases[0].maxTasks) {
									
									listUsers.forEach(function(user) {
										if(!user.assigned && task.assignedUsers[0] == null){
											
											for(var w = 0; w<user.phases.length; w++){
												
												if(user.phases[w] == firstPhaseName.trim()){
													doing.appendChild(divsTareas[0]);
													task.cycleTime = 0;
													task.state = "Doing";
													task.phase = 1;
													task.assignedUsers[0] = (user.name);
													user.assigned = true;
													
													if (task.phase == (i + 1) && task.tss == 0 && task.state != "Done") {
														task.duration = Math.floor(Math.random() * listPhases[i].maxTime + listPhases[i].minTime);
														task.leadTime = leadTime;
														//console.log(task.name + " durasao 2 " + task.duration);
								
													}
												}
											}
										} else {
											//console.log("no coinside " + listTareas[k].name);
										}
									}); //foreach 								
								} //if end
							} //if 4 end
						} //divs tareas for end
					}); //foreach end
				} //end phases for
				

				listTareas.forEach(function(task) {
					task.sameIteration = false;
					
				});
				
				if (document.getElementsByClassName("contenedorFinal")[0].childNodes.length == divsTareas.length) {
					
					
					
					listTareas.forEach(function(task) {
							if(task.leadTime == 0){
														
								task.leadTime = task.cycleTime;
							}else{
								task.leadTime +=  task.cycleTime;
							}
					
						
						});
					clearInterval(myInterval);
				}
				console.log("%cLEAD!" + leadTime, "font-size: 20px; color:green");
				leadTime += 1;
			}, 1000);
			
		
			
	
		}
	
				
		function mostrarResultados() {
			var text = "";
			var div = document.getElementsByClassName("mostrarResultadosDiv")[0];
			div.innerHTML = "";
			listTareas.forEach(function(task) {			
				
				var p = document.createElement("P");
				var br = document.createElement("BR");
				text = document.createTextNode(task.name + " Cycletime: " + (task.cycleTime ));
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
	
	
	var phases = $(".faseName");

	</script>

	<jsp:include page="footer.jsp"></jsp:include>
</body>