//____________________________________________________________________

//_______________________ VARIABLES  ________________________________

//____________________________________________________________________


//Necesarias para distribucion
distribution.backLogType = "manual"; 
distribution.typeConstant = "";
distribution.mean;			// Base value for normal distribution 
distribution.variation;		// Variation value for normal distribution
distribution.lambda;			// Lambda value for poisson distribution 
distribution.distributionWeightValues = [0, 0, 0, 0];

refreshDistributionSession();
saveDistributionSession();

document.getElementById("distributionChange").addEventListener("click", getDistribution(), false);

if(distribution.backLogType == "manual"){

	document.getElementById("addTask").removeAttribute("disabled");
	document.getElementById("addTask").removeAttribute("aria-disabled");
}else{

	document.getElementById("addTask").setAttribute("disabled", "");
	document.getElementById("addTask").setAttribute("aria-disabled", "true");

}



var firstLoop = true;
var myInterval;
var leadTime = 0;
var oldName;
var playPause = document.getElementsByClassName("playpause")[0];
var RawPhases;
var kanbanTss = 0;
var gaussian = 0;
var gaussianCounter = 0;
var taskNameCounter = 0;
var poisson = 0;  			// Tiempo en el que entrara la proxima tarea en distribución poisson
var poissonCounter = 0;
var weight = "M"; 
var weightTime = 0; // Tiempo en el que entrara la proxima tarea en uniforme con peso

if(distribution.typeConstant == "weight"){
	getWeight();
}

var weightCounter = 0;
var numOfBacklogCalled = 0; // Veces que se ha generado un tiempo en backlog constante
var backLogCollector = []; 	// Acumulador de tiempos de entrada
var TII = 0; 				// Tiempo medio entre la creación de tareas
var VII = 0; 				// Varianza entre la creación de tareas
var T = 0; 					// CT medio (el real, no el estimado)
var Vt = 0; 				// Varianza del CT
var numOfTasksEnded = 0; 	// Numero de tareas que han entrado al tablero y no han finalizado
var showLTandCLtensecs = 0;
var finLength = 0;
var sumWip = 0;
var velocidad = 0;
var eCT = 0;
var eLT = 0;
var indiceTareas = 0;

refreshUsers();
refreshPhases();

//Guardar al modificar Phase
sortPhases();


//Inicializamos la gráfica
listUsers.forEach(function(user){
	addData(myChart, user.name, user.tasksWorked, "rgba(0,255,233,0.5)");
})

// Botón para reinicializar la simulación
document.getElementById("deleteAll").addEventListener("click", removeAllSession, false);

//Permitimos el tooltip de bootstrap en toda la pagina
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

//____________________________________________________________________

//_______________________ BUTTONS  ___________________________________

//____________________________________________________________________

//Play Button
if(document.getElementById("playpause")){
	document.getElementById("playpause").addEventListener("change", function() {

		// Si esta en play
		if (this.checked) {

			deshabilitarMenus(true);

			play();

		} else {

			clearInterval(myInterval);

			deshabilitarMenus(false);
		}
	});
}

//Boton Reset
if(document.getElementById("reset")){
	document.getElementById("reset").addEventListener("click", function() {
		location.reload();
	});
}

//Botón nuevo Tablero	
if(document.getElementById("divDelete")){
	document.getElementById("divDelete").addEventListener("click", function() {
		sessionStorage.clear();
		location.reload();
	});
}

//____________________________________________________________________

//_______________________ PLAY  ______________________________________

//____________________________________________________________________

function play() {

	var divsTareas = document.getElementsByClassName("tareas");
	var fases = document.getElementsByClassName("faseName");
	var lowestTime = [];
	var lazyPeople = [];
	var tiempoInicio = 0;
	var anteriorTiempo =0;

	myInterval = setInterval(function() {

		if(chronoTime != 0){
			kanbanTss++;
		}

		velocidad ++;

		for (var i = 0; i < fases.length; i++) {

			var doing = fases[i].lastElementChild.firstElementChild;
			var done = fases[i].lastElementChild.lastElementChild;

			if (firstLoop) {

				for (var j = 0; j < divsTareas.length; j++) {
					if (((parseInt(fases[0].lastElementChild.firstElementChild.childNodes.length) - 1) +
							(parseInt(fases[0].lastElementChild.lastElementChild.childNodes.length) - 1))
							< listPhases[0].maxTasks) {

						doing.appendChild(divsTareas[0]);
						listTareas[j].cycleTime = 0;
						listTareas[j].state = "ToDo";
						listTareas[j].phase = 1;
						listTareas[j].sameIteration = true;
						for(var t = 0; t < divsTareas.length; t++){
							if(divsTareas[t].firstElementChild.innerHTML.trim() == listTareas[j].name){
								divsTareas[t].querySelector(".divState").innerHTML = "ToDo";
							}
						}

					} //if end
				} //for end

				firstLoop = false;
			} //if firstloop end

			listTareas.forEach(function(task) {

				// Asigna un tiempo a cada tarea de entre el intervalo de la fase
				if (task.phase == (i + 1) && task.tss == 0 && task.state != "Done" && task.state != "Ended" && task.duration == 0) {


					if(distribution.typeConstant == "weight"){

						if(task.weight == "S"){
							task.duration = Math.round(Math.random() * (calcTime(listPhases[i].maxTime, listPhases[i].minTime, 25) - listPhases[i].minTime) +  listPhases[i].minTime);
						} else if (task.weight == "M"){
							task.duration = Math.round(Math.random() * (calcTime(listPhases[i].maxTime, listPhases[i].minTime, 50) - calcTime(listPhases[i].maxTime, listPhases[i].minTime, 26)) +  calcTime(listPhases[i].maxTime, listPhases[i].minTime, 26));
						} else if (task.weight == "L"){
							task.duration = Math.round(Math.random() * (calcTime(listPhases[i].maxTime, listPhases[i].minTime, 75) - calcTime(listPhases[i].maxTime, listPhases[i].minTime, 51)) +  calcTime(listPhases[i].maxTime, listPhases[i].minTime, 51));
						} else if (task.weight == "XL"){
							task.duration = Math.round(Math.random() * (calcTime(listPhases[i].maxTime, listPhases[i].minTime, 100) - calcTime(listPhases[i].maxTime, listPhases[i].minTime, 76)) +  calcTime(listPhases[i].maxTime, listPhases[i].minTime, 76));
						}
					} else {
						task.duration = Math.round(Math.random() * (listPhases[i].maxTime - listPhases[i].minTime) +  listPhases[i].minTime);
					}

					if(task.duration < listPhases[i].minTime){
						task.duration = listPhases[i].minTime;
					}
					// Asigna un tiempo a cada tarea de entre el intervalo de la fase
					task.esfuerzo += task.duration;
					task.durarionAsignada = false;					
					task.firstDuration.push(task.duration);


				}

				for (var k = 0; k < divsTareas.length; k++) {

					var taskDuration = parseInt(task.duration);
					var elementName = divsTareas[k].firstElementChild.innerHTML;
					elementName = elementName.trim();

					if(task.name == elementName && task.state != "Ended"){
						divsTareas[k].lastElementChild.innerHTML = taskDuration;
					}


					if (task.state == "Doing" && task.name == elementName && task.tss >= taskDuration &&
							task.phase == (i + 1)) {
						//IF 1
						done.appendChild(divsTareas[k]);
						task.state = "Done";
						saveTimeStates(task,leadTime,i);
						task.sameIteration = true;

						for(var w = 0; w < listUsers.length; w++){
							for(var au = 0; au < task.assignedUsers.length; au++){
								if(listUsers[w].name == task.assignedUsers[au]){
									listUsers[w].assigned = false;
									document.getElementsByName(listUsers[w].name)[0].children[1].style.opacity = "1";
									document.getElementsByName(listUsers[w].name)[0].children[1].style.color = "black";
									document.getElementsByName(listUsers[w].name)[0].style.borderColor = "blue";

									if(document.getElementById("modalTaskNameValue").innerHTML == task.name){
										document.getElementById("modalTaskWorkedValue").innerHTML += listUsers[w].name + ",";
									}
								}
							}
						}
						task.assignedUsers = [];
						task.assignedUsers[0] = null;
						for(var t = 0; t < divsTareas.length; t++){
							if(divsTareas[t].firstElementChild.innerHTML.trim() == task.name){
								divsTareas[t].querySelector(".divState").innerHTML = "Done";
							}
						}

					} else if (task.state == "Doing" && task.name == elementName && task.tss != taskDuration &&
							task.phase == (i + 1)) {
						//IF 2
						if (task.phase > 0) {
							task.tss++;

						}


						var actualPhaseName = fases[i].children[0].childNodes[0].textContent.trim();
						var phaseSkill;
						listUsers.forEach(function(user) {
							if(!user.assigned && task.assignedUsers[0] != null){
								var isTotallyFree = false;

								for(var up = 0; up<user.phases.length; up++){
									for(var p = 0; p < fases.length; p++){
										var phasesName = fases[p].children[0].childNodes[0].textContent.trim();

										if(user.phases[up].trim() != actualPhaseName.trim()){
											for(var t = 0; t < listTareas.length; t++){	
												console.log(user.name + " User phase " + user.phases[up].trim());
												if(listTareas[t].phase - 1 >= 0 && user.phases[up].trim() == phasesName.trim()){
													if(listPhases[listTareas[t].phase - 1].name.trim() == phasesName.trim() && listTareas[t].assignedUsers[0] != null ){
														isTotallyFree = true;
														console.log("1")
													} else if (listPhases[listTareas[t].phase - 1].name.trim() == phasesName.trim()){
														isTotallyFree = false;
														console.log("2" + " " + (i+1))
													} 
												} else {
													console.log("voids");
													
//													isTotallyFree = true;
												}
												
												/**/
												
												//Antigüo sistema
//												if(listTareas[t].assignedUsers[0] != null && user.phases[up].trim() == actualPhaseName){
//												if(listTareas[t].assignedUsers[0] != null && user.phases[up].trim() == phasesName.trim() && (listTareas[t].phase - 1 >= 0)){
//												console.log(listTareas[t].name );
//												console.log(user.name + " otra fase if 1")
//												if(listPhases[listTareas[t].phase].name.trim() == phasesName.trim()){
//												console.log(user.name + " otra fase if 1.1")
//												isTotallyFree = true;
//												console.log( " phase " + listPhases[listTareas[t].phase-1].name);
//												}
//												} else if(){
//												console.log(user.name + " otra fase if 2")
//												isTotallyFree = false;
//												}
											}

										} else if(user.phases[up].trim() == actualPhaseName.trim()){
											phaseSkill = up;
											for(var t = 0; t < listTareas.length; t++){	
												if(listTareas[t].phase - 1 >= 0 && user.phases[up].trim() == actualPhaseName.trim()){
													console.log("if 2 a");
													if(listPhases[listTareas[t].phase - 1].name.trim() == actualPhaseName.trim() && listTareas[t].assignedUsers[0] != null){
														isTotallyFree = true;
														console.log("if 2 b");
													} else if(listPhases[listTareas[t].phase - 1].name.trim() == actualPhaseName.trim()){
														//if(listPhases[listTareas[t].phase - 1].name.trim() == actualPhaseName.trim())
														isTotallyFree = false;
														console.log("if 2 c");
														console.log(task.name + " " + actualPhaseName.trim())
													}
												} 
												//Antigüo sistema
//												if(listTareas[t].phase == (i+1) && listTareas[t].assignedUsers[0] != null){
//												console.log(user.name + "misma fase if 1")
//												isTotallyFree = true;
//												} else if (listTareas[t].phase == (i+1) && listTareas[t].assignedUsers[0] == null){
//												console.log(user.name + " misma fase if 2")
//												isTotallyFree = false;
//												}
											}
										}
									}//

								}
								console.log(user.name + " veredict " + isTotallyFree + " fase " + listPhases[i].name + " task " + task.name);
								
								if(isTotallyFree){
									
									for(var ind = 0; ind < fases.length; ind++){
										for(var userP = 0; userP < user.phases.length; userP++){
//											console.log("listPhases[ind].name.trim() " + listPhases[ind].name.trim());
//											console.log("user.phases[userP].trim() " + user.phases[userP].trim());
//											console.log("listPhases[task.phase - 1].name.trim() " + listPhases[task.phase - 1].name.trim());
											if(listPhases[ind].name.trim() == user.phases[userP].trim() && listPhases[task.phase - 1].name.trim() == user.phases[userP].trim()){
												console.log(user.name);
												document.getElementsByName(user.name)[0].children[1].style.opacity = "0.3";
												document.getElementsByName(user.name)[0].children[1].style.color = fases[i].style.backgroundColor;
												document.getElementsByName(user.name)[0].style.borderColor = fases[i].style.backgroundColor;
												task.assignedUsers.push(user.name);
												if(!task.staticAssigneds.includes((user.name)+" ")){											
													user.tasksWorked += 1;
													task.staticAssigneds += (user.name)+" ";
												}
												user.assigned = true;

												if(Math.round((task.duration - task.tss) / task.assignedUsers.length) <= 0){

													task.duration = 1;
												} else {
													task.duration = Math.round((task.duration - task.tss) / task.assignedUsers.length) * (100 / user.skills[phaseSkill]);
												}
											}
										}
									}
									
								}
							}
							// Este if es para aumentar los segundos trabajados

							if(user.assigned){
								task.assignedUsers.forEach(function(assignedUser) {
									//guarda en Usuarios los segundos se cada fase
									if(assignedUser.includes((user.name))){
//										console.log("Antes");
										user.secondsWork += 1;
										if(user.secondByPhase[i] ==  undefined){
//											console.log("undef");
											user.secondByPhase[i] = 1;
										}else{
//											console.log("Despues");
											user.secondByPhase[i] += 1;
										}
									}
//									console.log(user.name);
								});							
							}

						});


					} else if (task.state == "Done" && task.name == elementName && task.tss >= taskDuration &&
							task.phase == (i + 1) && !task.sameIteration) {
						//IF 3
						console.log("if3")
						if (fases[i + 1] == null) {							
							task.state = "Ended";
							task.totalTime = 0;
							task.leadTime = leadTime;
							saveTimeStates(task,leadTime,i);
							divsTareas[k] = mostrarFinalTarea(divsTareas[k],task);
							document.getElementsByClassName("contenedorFinal")[0].appendChild(divsTareas[k]);
							updateDataTask(myChartTask, task.cycleTime, task.leadTime, task.esfuerzo, indiceTareas);
							indiceTareas++;

						} else {
							if (((parseInt(fases[i+1].lastElementChild.firstElementChild.childNodes.length) - 1) +
									(parseInt(fases[i+1].lastElementChild.lastElementChild.childNodes.length)  - 1))
									< listPhases[i + 1].maxTasks) {


								fases[i + 1].lastElementChild.firstElementChild.appendChild(divsTareas[k]);
								task.state = "ToDo";
								saveTimeStates(task,leadTime,i);
								task.phase++;
								task.tss = 0;
								task.sameIteration = true;
								task.duration = 0;
								for(var t = 0; t < divsTareas.length; t++){
									if(divsTareas[t].firstElementChild.innerHTML.trim() == task.name){
										divsTareas[t].querySelector(".divState").innerHTML = "ToDo";
									}
								}

							}
						}

					} else if (task.state == null && task.name == elementName && task.phase == 0) {

						//IF 4
						if (((parseInt(fases[0].lastElementChild.firstElementChild.childNodes.length) - 1) +
								(parseInt(fases[0].lastElementChild.lastElementChild.childNodes.length)  - 1))
								< listPhases[0].maxTasks) {							

							doing.appendChild(divsTareas[0]);
							task.cycleTime = 0;
							task.state = "ToDo";
							saveTimeStates(task,leadTime,i);
							task.phase = 1;
							task.sameIteration = true;
							for(var t = 0; t < divsTareas.length; t++){
								if(divsTareas[t].firstElementChild.innerHTML.trim() == task.name){
									divsTareas[t].querySelector(".divState").innerHTML = "ToDo";
								}
							}

							if (task.phase == (i + 1) && task.tss >= 0 && task.state != "Done" && task.state != "Ended") {
								// ________ESTO VA EN EL IF 4

								if(distribution.typeConstant == "weight"){

									if(task.weight == "S"){
										task.duration = Math.round(Math.random() * (calcTime(listPhases[i].maxTime, listPhases[i].minTime, 25) - listPhases[i].minTime) +  listPhases[i].minTime);
									} else if (task.weight == "M"){
										task.duration = Math.round(Math.random() * (calcTime(listPhases[i].maxTime, listPhases[i].minTime, 50) - calcTime(listPhases[i].maxTime, listPhases[i].minTime, 26)) +  calcTime(listPhases[i].maxTime, listPhases[i].minTime, 26));
									} else if (task.weight == "L"){
										task.duration = Math.round(Math.random() * (calcTime(listPhases[i].maxTime, listPhases[i].minTime, 75) - calcTime(listPhases[i].maxTime, listPhases[i].minTime, 51)) +  calcTime(listPhases[i].maxTime, listPhases[i].minTime, 51));
									} else if (task.weight == "XL"){
										task.duration = Math.round(Math.random() * (calcTime(listPhases[i].maxTime, listPhases[i].minTime, 100) ) +  calcTime(listPhases[i].maxTime, listPhases[i].minTime, 76));
									}
									
								} else {
									task.duration = Math.round(Math.random() * (listPhases[i].maxTime - listPhases[i].minTime) +  listPhases[i].minTime);
								}
//								task.duration = Math.round(Math.random() * (listPhases[i].maxTime - listPhases[i].minTime) +  listPhases[i].minTime);	
								task.esfuerzo += task.duration;
								task.startTime = leadTime - task.creationTime;
								task.firstDuration.push(task.duration);
							}								
						} //if end
					} else if (task.state == "ToDo" && task.name == elementName && task.tss == 0 &&
							task.phase == (i + 1) && !task.sameIteration){0
						//IF 5
						var actualPhaseName = fases[i].children[0].childNodes[0].textContent.trim();

							var phaseSkill;

							listUsers.forEach(function(user) {
								if(!user.assigned){
									if(task.assignedUsers[0] == null){
										for(var up = 0; up <user.phases.length; up++){

											if(user.phases[up].trim() == actualPhaseName.trim()){
												task.state = "Doing";
												saveTimeStates(task,leadTime,i);
												task.duration = task.duration * (100 / user.skills[up]);
												task.assignedUsers[0] = (user.name);
												user.assigned = true;
												if(!task.staticAssigneds.includes((user.name)+" ")){

													task.staticAssigneds += (user.name)+" ";
													user.tasksWorked += 1;
												}


												for(var t = 0; t < divsTareas.length; t++){
													if(divsTareas[t].firstElementChild.innerHTML.trim() == task.name){
														divsTareas[t].querySelector(".divState").innerHTML = "Doing";
													}
												}
											}	
										}
									} else {
										var isTotallyFree = false;

										for(var up = 0; up<user.phases.length; up++){
											for(var p = 0; p < fases.length; p++){

												var phasesName = fases[p].childNodes[0].textContent.trim();

												if(user.phases[up].trim() != actualPhaseName.trim()){
													for(var t = 0; t < listTareas.length; t++){	
														console.log(user.name + " User phase " + user.phases[up].trim());
														if(listTareas[t].phase - 1 >= 0 && user.phases[up].trim() == phasesName.trim()){
															if(listPhases[listTareas[t].phase - 1].name.trim() == phasesName.trim() && listTareas[t].assignedUsers[0] != null ){
																isTotallyFree = true;
																console.log("1")
															} else if (listPhases[listTareas[t].phase - 1].name.trim() == phasesName.trim()){
																isTotallyFree = false;
																console.log("2" + " " + (i+1))
															} 
														} else {
															console.log("voids");
															
														}
													}

												} else {
													phaseSkill = up;
													for(var t = 0; t < listTareas.length; t++){	
														if(listTareas[t].phase - 1 >= 0 && user.phases[up].trim() == actualPhaseName.trim()){
															console.log("if 2 a");
															if(listPhases[listTareas[t].phase - 1].name.trim() == actualPhaseName.trim() && listTareas[t].assignedUsers[0] != null){
																isTotallyFree = true;
																console.log("if 2 b");
															} else if(listPhases[listTareas[t].phase - 1].name.trim() == actualPhaseName.trim()){
																//if(listPhases[listTareas[t].phase - 1].name.trim() == actualPhaseName.trim())
																isTotallyFree = false;
																console.log("if 2 c");
																console.log(task.name + " " + actualPhaseName.trim())
															}
														} 
													}
												}
											}

											// Asignar tarea Empezada, tarea Multiusuario

										}
									}
									if(isTotallyFree){ 
										task.assignedUsers.push(user.name);
										if(!task.staticAssigneds.includes((user.name)+" ")){
											user.tasksWorked += 1;
											task.staticAssigneds += (user.name)+" ";

										}
										user.assigned = true;

										if(Math.round((task.duration - task.tss) / task.assignedUsers.length) <= 0){
											task.duration = 1;
										} else {
											task.duration = Math.round((task.duration - task.tss) / task.assignedUsers.length) * (100 / user.skills[phaseSkill]);
										}

									}

									if(user.assigned){

										document.getElementsByName(user.name)[0].children[1].style.opacity = "0.3";
										document.getElementsByName(user.name)[0].children[1].style.color = fases[i].style.backgroundColor;
										document.getElementsByName(user.name)[0].style.borderColor = fases[i].style.backgroundColor;

									}
								} 
							}); 	//foreach	
					} 			//if 5 end
				} 				//divs tareas for end
			}); 				//foreach end

			sumWip = 0;
			listPhases.forEach(function(fase) {

				sumWip += fase.maxTasks;

			});


			// Veloz
			if(velocidad == 10){

				finLength = document.getElementsByClassName("contenedorFinal")[0].children.length - finLength;

				eCT =  sumWip / finLength;

				if (eCT == "Infinity"){
					eCT = 0;
				}

				velocidad = 0;

			}

		} //end phases for

		var totalTimeSum = 0;
		listTareas.forEach(function(task){
			if(task.phase >= 1 && task.state == "Ended"){

				numOfTasksEnded++;
				totalTimeSum += task.cycleTime;
			}
		});

		T = totalTimeSum / numOfTasksEnded;

		var totalSum = 0;
		listTareas.forEach(function(task){
			if(task.phase >= 1 && task.state == "Ended"){
				totalSum += Math.pow(Math.abs(task.cycleTime - T), 2);
			}
		});

		Vt = totalSum / numOfTasksEnded;
		numOfTasksEnded = 0;


		listTareas.forEach(function(task) {
			task.sameIteration = false;

		});

		//Constants
		// Unicamente se ejecutara cuando el usuario haya elegido el modo de distribucion Normal
		if(distribution.backLogType == "constant"){	
			if((gaussian == gaussianCounter || gaussian <= 0) && distribution.typeConstant == "normal"){
				console.log("normal");
				getGaussian();		
				calcLDValues(gaussian);
				gaussianCounter = 0;
				// Creamos un objeto nuevo
				addTareas("",leadTime);
				// Y lo printamos
			} else if ((poisson == poissonCounter || poisson <= 0) && distribution.typeConstant == "poisson"){
				getPoisson();
				console.log("poisson")
				calcLDValues(poisson);
				poissonCounter = 0;
				addTareas("",leadTime);
			} else if ((weightTime == weightCounter || weightTime <= 0) && distribution.typeConstant == "weight"){
				getWeight();
				console.log("weught")
				console.log(weight)
				calcLDValues(weightTime);
				weightCounter = 0;
				addTareas(weight,leadTime);
			}

		}

		//Funcion para calcular el tiempo medio de la entrada de tareas y la varianza
		function calcLDValues(distributionValue){
			if(distributionValue != 0){
				backLogCollector.push(distributionValue);
				numOfBacklogCalled++;

				var totalSumBackLog = 0;
				for(var j = 0; j < backLogCollector.length; j++){
					totalSumBackLog+= backLogCollector[j];
				}
				TII = totalSumBackLog / numOfBacklogCalled;
				var totalSum = 0;
				for(var i = 0; i < numOfBacklogCalled; i++){
//					totalSum += Math.pow(backLogCollector[i] - TII, 2);
					totalSum += Math.abs(backLogCollector[i] - TII);
				}

				VII = totalSum / numOfBacklogCalled;
			}
		}

		// Si la introduccion de tareas es manual que se termine cuando todas las tareas equivalgan 
		// a la cantidad de tareas introdcidas

		if(distribution.backLogType == "manual"){
			if (document.getElementsByClassName("contenedorFinal")[0].childNodes.length == divsTareas.length || (kanbanTss == chronoTime && (chronoTime != 0))) {
				// Finalizado completamente
				clearInterval(myInterval);
				kanbanTss = 0;
				chronoTime = 0;
				document.getElementById("chronoViewer").innerHTML = "00:00";
				// Cambiamos el boton a pausa
				document.getElementById("playpause").checked = false;

				deshabilitarMenus(false);

				if(document.getElementsByClassName("contenedorFinal")[0].childNodes.length == divsTareas.length){
					sortPhases();
				}

				lowestTime = findMaxAndMin();
				lazyPeople = maxAndMinUsers(lowestTime[0], lowestTime[1]);

				for(var i = 0; i < lazyPeople[1].length; i++){
					document.getElementsByName(lazyPeople[1][i])[0].children[1].style.color = "red";
				}

			}
		} else if (distribution.backLogType == "constant"){
			if (kanbanTss == chronoTime && (chronoTime != 0)) {
				// Finalizado completamente
				clearInterval(myInterval);
				kanbanTss = 0;
				chronoTime = 0;
				document.getElementById("chronoViewer").innerHTML = "00:00";
				// Cambiamos el boton a pausa
				document.getElementById("playpause").checked = false;

				deshabilitarMenus(false);

				if(document.getElementsByClassName("contenedorFinal")[0].childNodes.length == divsTareas.length){
					sortPhases();
				}

				lowestTime = findMaxAndMin();
				lazyPeople = maxAndMinUsers(lowestTime[0], lowestTime[1]);

				for(var i = 0; i < lazyPeople[1].length; i++){
					document.getElementsByName(lazyPeople[1][i])[0].children[1].style.color = "red";
				}

			}
		}


		leadTime += 1;

		// Calculamos el tiempo para parar el play con el timer
		console.log("::: LEAD TIME ::::: "+leadTime);
		if(chronoTime != ""){

			if(chronoTime > 59){
				var sec_num = parseInt(chronoTime - kanbanTss, 10);
				var minutes = Math.floor((sec_num) / 60);
				var seconds = sec_num - (minutes * 60);
				if (minutes < 10) {minutes = "0"+minutes;}
				if (seconds < 10) {seconds = "0"+seconds;}
				document.getElementById("chronoViewer").innerHTML = minutes+":"+seconds;
			} else {
				if(chronoTime - kanbanTss < 10 ){
					document.getElementById("chronoViewer").innerHTML = "00:0"+(chronoTime - kanbanTss);
				} else {
					document.getElementById("chronoViewer").innerHTML = "00:"+(chronoTime - kanbanTss);
				}
			}
		}

		gaussianCounter++;
		poissonCounter++;
		weightCounter++;

		//Contados para mostrar lead time estimado y cycle time escimado
		if(showLTandCLtensecs == 10){
			showLTandCLtensecs = 0;
		} else {
			showLTandCLtensecs++;
		}

		// Recargamos los datos de la targeta de informacion de cada tarea
		listTareas.forEach(function(tarea){
			if(atributo == tarea.name){
				// Show Info
				document.getElementById("modalTaskTimeWorkedValue").innerHTML = "<b>" + tarea.firstDuration + "</b>";	

				document.getElementById("modalTaskRealTimeValue").innerHTML = "<b>" + tarea.phasesTime + "</b>";
			if(showLTandCLtensecs == 10){
				if(TII < T ){
					console.log("SATURACION");
					document.getElementById("saturacion").innerHTML = "SOBRESATURACIÓN";
					document.getElementById("saturacion").setAttribute("class","alert alert-danger");				
					document.getElementById("modalTaskLTCTValue").innerHTML = "<b>0,"+  eCT.toFixed(2) * 10  + "</b>";		
				}else{
					console.log("FLUIDO");
					document.getElementById("saturacion").innerHTML = "";
					document.getElementById("saturacion").setAttribute("class","");
					var auxLT= ((eCT * 10) + ((0.5/(TII - T)) * Math.pow((T / TII), 2) * VII + Vt)).toFixed(2);
					if(!isNaN(auxLT) || isFinite(auxLT)){
						document.getElementById("modalTaskLTCTValue").innerHTML = "<b>" + auxLT + "  ,  " +  eCT.toFixed(2) * 10  + "</b>";			
					}else{
						console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"+auxLT);
						document.getElementById("modalTaskLTCTValue").innerHTML = "<b>0,"+  eCT.toFixed(2) * 10  + "</b>";
					}
				}					
					
			}
				document.getElementById("modalTaskWorkingValue").innerHTML = "<b>" + tarea.assignedUsers + "</b>";
				document.getElementById("modalTaskWorkedValue").innerHTML = "<b>" + tarea.staticAssigneds + "</b>";
			}
		})

		// Función para Volver a calcular el tiempo para las tareas con peso
		function calcTime(maxTime, minTime, percentage){
			var range = maxTime - minTime;	
			return (percentage * range) / 100;
		}

		var i = 0;
		listUsers.forEach(function(user){

			updateData(myChart, user.tasksWorked, i, 0);
			updateData(myChart, user.secondsWork, i, 1);
			i++;
		});

	}, 1000);

}

//____________________________________________________________________

//_______________________ MENÚS  _____________________________________

//____________________________________________________________________

function deshabilitarMenus(disable){

	if (disable){
		// Deshabilitamos los botones del header
		for (var i = 0; i < document.getElementById("header-btn").children.length; i++){

			document.getElementById("header-btn").children[i].setAttribute("class", "btn btn-success disabled");
			document.getElementById("header-btn").children[i].setAttribute("aria-disabled", "true");

		}

		// Deshabilitamos los botones del header
		for (var i2 = 0; i2 < document.getElementById("doubleButton").children.length; i2++){

			document.getElementById("doubleButton").children[i2].setAttribute("disabled", "");
			document.getElementById("doubleButton").children[i2].setAttribute("aria-disabled", "true");
		}

		// Y quitamos el acceso a el formulario de modificación
		for (var i3 = 0; i3 < document.getElementsByClassName("titulo").length; i3++){

			document.getElementsByClassName("titulo")[i3].removeAttribute("data-target", "#myModal");
			document.getElementsByClassName("titulo")[i3].removeAttribute("data-toggle", "modal");

		}

		// Y quitamos el acceso a el formulario de modificación
		for (var i5 = 0; i5 < document.getElementsByClassName("userName").length; i5++){

			document.getElementsByClassName("userName")[i5].removeAttribute("data-target", "#myModal2");
			document.getElementsByClassName("userName")[i5].removeAttribute("data-toggle", "modal");

		}

		document.getElementById("result").setAttribute("disabled", "");
		document.getElementById("result").setAttribute("aria-disabled", "true");

		// quitamos el modal en addUsers
		document.getElementById("chronoViewer").setAttribute("disabled", "");
		document.getElementById("chronoViewer").setAttribute("aria-disabled", "true");
		document.getElementById("chronoViewer").removeAttribute("data-target");
		document.getElementById("chronoViewer").removeAttribute("data-toggle");

		// quitamos el modal en addUsers
		document.getElementById("addUser").setAttribute("disabled", "");
		document.getElementById("addUser").setAttribute("aria-disabled", "true");
		document.getElementById("addUser").children[0].removeAttribute("data-target");
		document.getElementById("addUser").children[0].removeAttribute("data-toggle");


		$( function() {
			$( "#faseDiv" ).sortable({ disabled : true})
			$( "#faseDiv").css("cursor", "default");
		});

	}else{

		document.getElementById("result").removeAttribute("disabled");
		document.getElementById("result").removeAttribute("aria-disabled");

		// Volvemos a habilitar el header
		for (var j = 0; j < document.getElementById("header-btn").children.length; j++){

			document.getElementById("header-btn").children[j].classList.remove("disabled");
			document.getElementById("header-btn").children[j].removeAttribute("aria-disabled");

		}

		// Deshabilitamos los botones del header
		for (var ia = 0; ia < document.getElementById("doubleButton").children.length; ia++){

			document.getElementById("doubleButton").children[ia].removeAttribute("disabled");
			document.getElementById("doubleButton").children[ia].removeAttribute("aria-disabled");
		}

		// Permitimos de nuevo abrir el modal de modificación
		for (var ib = 0; ib < document.getElementsByClassName("titulo").length; ib++){

			document.getElementsByClassName("titulo")[ib].setAttribute("data-target", "#myModal");
			document.getElementsByClassName("titulo")[ib].setAttribute("data-toggle", "modal");
		}

		// Permitimos de nuevo abrir el modal de modificación y eliminación
		for (var id = 0; id < document.getElementsByClassName("userName").length; id++){

			document.getElementsByClassName("userName")[id].setAttribute("data-target", "#myModal2");
			document.getElementsByClassName("userName")[id].setAttribute("data-toggle", "modal");

		}

		// Colocamos de nuevo el modal en chrono
		document.getElementById("chronoViewer").removeAttribute("disabled");
		document.getElementById("chronoViewer").removeAttribute("aria-disabled");
		document.getElementById("chronoViewer").setAttribute("data-target", "#modalChrono");
		document.getElementById("chronoViewer").setAttribute("data-toggle", "modal");

		// Colocamos de nuevo el modal en addUsers
		document.getElementById("addUser").removeAttribute("disabled");
		document.getElementById("addUser").removeAttribute("aria-disabled");
		document.getElementById("addUser").children[0].setAttribute("data-target", "#addUsers");
		document.getElementById("addUser").children[0].setAttribute("data-toggle", "modal");
	}
}


//____________________________________________________________________

//_______________________ ORDENAR FASES  _____________________________

//____________________________________________________________________

function sortPhases(){
	refreshPhases();
	$( function() {
		$( "#faseDiv" ).sortable({
			disabled:false,
			containment: '#faseDiv', 
			axis:"x", 
			tolerance:"pointer",
			zIndex: 9999,
			items: "> div.faseName",
			update: function (event, ui) {

				var sortArray = new Array();
				var info = $(this).sortable("toArray");
				var sortArray = new Array();
				for (var i = 0; i < info.length; i++) {
					for (var j = 0; j < listPhases.length; j++) {

						if (listPhases[j].id == info[i]) {
							sortArray.push(listPhases[j]);
						}
					}
				}
				for (var i = 0; i < sortArray.length; i++) {
					listPhases[i] = sortArray[i];

				}

				savePhaseSession();
				printPhaseSession();
			}
		})
		$( "#faseDiv" ).disableSelection();
		$( "#faseDiv").css("cursor", "move");
	});
}


//____________________________________________________________________

//_______________________ CONSTANTES  ________________________________

//____________________________________________________________________

function getGaussian(){
	$.ajax({
		type: "GET",
		url: "/nextGaussian",
		data: {
			mean: distribution.mean,
			variation: distribution.variation
		},success: function(data) {
			console.log("N");
			gaussian = parseInt(data)
		}
	});
}

function getPoisson(){
	$.ajax({
		type: "GET",
		url: "/nextPoisson",
		data: {
			lambda: distribution.lambda
		},success: function(data) {
			console.log("P");
			console.log(distribution.lambda);
			poisson = parseInt(data)
		}
	});
}

function getWeight(){

	$.ajax({
		type: "GET",
		url: "/nextWeight",
		data: {
			sValue: distribution.distributionWeightValues[0],
			mValue: distribution.distributionWeightValues[1], 
			lValue: distribution.distributionWeightValues[2], 
			xlValue: distribution.distributionWeightValues[3]
		},success: function(data) {
			console.log("W");
			var formatedData = data.split(",")
			console.log(data);
			weight = formatedData[0];
			weightTime = parseInt(formatedData[1]);
			
		}
	});
}

function getDistribution(){

	distribution.backLogType = distribution.backLogType;
	distribution.typeConstant = distribution.typeConstant;
	distributionWeightValues = distribution.distributionWeightValues;

	$("input[value='"+ distribution.backLogType +"']").prop("checked", true);

	if($("input[value='"+ distribution.typeConstant +"']").is(':disabled')){
		$("input[value='"+ distribution.typeConstant +"']").prop("checked", true);


		if(distribution.typeConstant == "normal"){
			document.getElementById("paramTitle").style.visibility = "visible";
			document.getElementById("paramTitle").style.height = "initial";
			document.getElementById("dataNormalDistribution").style.visibility = "visible";
			document.getElementById("dataNormalDistribution").style.height = "initial";
			document.getElementById("normalBaseValue").value = distribution.mean;
			document.getElementById("normalVarianceValue").value = distribution.variation;
		} else if (distribution.typeConstant == "poisson") {
			document.getElementById("paramTitle").style.visibility = "visible";
			document.getElementById("paramTitle").style.height = "initial";
			document.getElementById("dataPoissonDistribution").style.visibility = "visible";
			document.getElementById("dataPoissonDistribution").style.height = "initial";
			document.getElementById("poissonLambda").value = distribution.lambda;
		} else if (distribution.typeConstant == "weight"){
			document.getElementById("dataNormalDistribution").style.visibility = "hidden";
			document.getElementById("dataNormalDistribution").style.height = "0px";

			document.getElementById("dataWeightDistribution").style.visibility = "visible";
			document.getElementById("dataWeightDistribution").style.height = "initial";

			document.getElementById("dataPoissonDistribution").style.visibility = "hidden";
			document.getElementById("dataPoissonDistribution").style.height = "0px";

			var weightDivValues = $(".sizeValue");
			var weightDivSliders = $("div.ui-slider-handle");

			for(var wv = 0; wv < weightDivValues.length; wv++){
				weightDivValues[wv].innerHTML = distributionWeightValues[wv];
			}
		}
		document.getElementById("modBacklogBtn").removeAttribute("disabled");
	}
	
	if(distribution.backLogType == "constant"){
		$("[name='distributionType']").removeAttr("disabled");
		
	}else{
		$("[name='distributionType']").attr("disabled", "");
		if(document.getElementById("modBacklogBtn")){
			document.getElementById("modBacklogBtn").removeAttribute("disabled");
		}
		
	}
	
	
}



//____________________________________________________________________

//_______________________ MOSTRAR TAREAS  ____________________________

//____________________________________________________________________

function printTasks(tarea){
	document.getElementsByClassName("contenedorTareas")[0].innerHTML +=
		"<div class='tareas' data-toggle='modal' data-target='#modalTaskInfo' " +
		"data-identification='" + tarea.name + "' id='"+tarea.name+"'> " +
		"<p data-identification='" + tarea.name + "'>" + tarea.name + "</p>" +
		"<p class='estado' data-identification='" + tarea.name + "'>" +
		"<small class='divState' data-identification='" + tarea.name + "'></small></p>" +
		"<p class='duration' data-identification='" + tarea.name + "'>0</p></div>";

	for (var i = 0; i < document.getElementsByClassName("tareas").length; i++) {
		document.getElementsByClassName("tareas")[i].addEventListener("click", showTaskInfo, false);

	}
}
