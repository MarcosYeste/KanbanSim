var totalFases = 0;
var mediaMaxFaseTime = 0;
var mediaMinFaseTime = 0;
var firstLoop = true;
var myInterval;
var cycleTime = 0;
var leadTime = 0;
var click;
var click2 = 0;
var playPause = document.getElementsByClassName("playpause")[0];


//Permitimos el tooltip de bootstrap en toda la pagina
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

//Añadimos un attributo auto incremental que nos servira para identificar la posición de los elementos

for(var i = 0 ; i < document.getElementsByClassName("titulo").length; i++){
	document.getElementsByClassName("titulo")[i].setAttribute("data-identification", i);

	// Abrimos el formulario			
	document.getElementsByClassName("titulo")[i].addEventListener("click", modPhases , false);
}

//Añadimos un attributo auto incremental que nos servira para identificar la posición de cada uno de los elementos
for(var i = 0 ; i < document.getElementsByClassName("userName").length; i++){
	document.getElementsByClassName("userName")[i].setAttribute("data-identification", i);

	// Abrimos el formulario			
	document.getElementsByClassName("userName")[i].addEventListener("click", modUsers , false);
}

document.getElementById("ModPhase").addEventListener("click", saveModPhase, false);


//Mod Phases
function modPhases(){
	click = event.target.getAttribute("data-identification");
	console.log(click);

	// Mostramos los datos correspondientes a la fase
	document.getElementById("modName").value = listPhases[click].name;
	document.getElementById("modWip").value = parseInt(listPhases[click].maxTasks);
	document.getElementById("modMinTime").value = parseInt(listPhases[click].minTime);
	document.getElementById("modMaxTime").value = parseInt(listPhases[click].maxTime);

}

function saveModPhase() {
	// Modificamos los datos de la fase

	listPhases[click].name = document.getElementById("modName").value;
	listPhases[click].maxTasks = parseInt(document.getElementById("modWip").value);
	listPhases[click].minTime = parseInt(document.getElementById("modMinTime").value);
	listPhases[click].maxTime = parseInt(document.getElementById("modMaxTime").value);

	console.table(listPhases[click]);


	// Control de errores, si el valor introducido en cualquiera de los campos es 0 o menor a este,
	// pon automaticamente un 1
	if(listPhases[click].maxTasks <= 0){
		listPhases[click].maxTasks = 1;
	}
	if(listPhases[click].minTime <= 0){
		listPhases[click].minTime = 1;
	}
	if(listPhases[click].maxTime <= 0){
		listPhases[click].maxTime = 1;
	}

	console.log("Clicked");

}

//--------------MODIFICANDO--------------------------------------------------------

//Mod Users
function modUsers(){
	click2 = parseInt(event.target.getAttribute("data-identification"));
	console.log(click2);

	var modFases = document.getElementById("modFasesUser");
	// Mostramos los datos correspondientes a la fase
	document.getElementById("modNameUser").value = listUsers[click2].name;

}

function saveModUsers() {
	// Modificamos los datos de la fase

}
//-------------------------------------------------------------------------

//Play Button
document.getElementById("playpause").addEventListener("change", function() {

	// Si esta en play
	if (this.checked) {

		// Deshabilitamos los botones del header
		for (var i = 0; i < document.getElementById("header-btn").children.length; i++){

			document.getElementById("header-btn").children[i].setAttribute("class", "btn btn-success disabled");
			document.getElementById("header-btn").children[i].setAttribute("aria-disabled", "true");

		}

		// Deshabilitamos los botones del header
		for (var i = 0; i < document.getElementById("doubleButton").children.length; i++){

			document.getElementById("doubleButton").children[i].setAttribute("disabled", "");;
			document.getElementById("doubleButton").children[i].setAttribute("aria-disabled", "true");
		}

		// Y quitamos el acceso a el formulario de modificación
		for (var i = 0; i < document.getElementsByClassName("titulo").length; i++){

			document.getElementsByClassName("titulo")[i].removeAttribute("data-target", "#myModal");
			document.getElementsByClassName("titulo")[i].removeAttribute("data-toggle", "modal");

		}

		document.getElementById("result").setAttribute("disabled", "");
		document.getElementById("result").setAttribute("aria-disabled", "true");


		play();

	} else {

		clearInterval(myInterval);

		document.getElementById("result").removeAttribute("disabled");
		document.getElementById("result").removeAttribute("aria-disabled");

		// Volvemos a habilitar el header
		for (var j = 0; j < document.getElementById("header-btn").children.length; j++){

			document.getElementById("header-btn").children[j].classList.remove("disabled");
			document.getElementById("header-btn").children[j].removeAttribute("aria-disabled");

		}

		// Deshabilitamos los botones del header
		for (var i = 0; i < document.getElementById("doubleButton").children.length; i++){

			document.getElementById("doubleButton").children[i].removeAttribute("disabled");
			document.getElementById("doubleButton").children[i].removeAttribute("aria-disabled");
		}

		// Permitimos de nuevo abrir el modal de modificación
		for (var i = 0; i < document.getElementsByClassName("titulo").length; i++){

			console.log("Cantidad Doing " + document.getElementsByClassName("doing")[i].children.length >= 1);
			document.getElementsByClassName("titulo")[i].setAttribute("data-target", "#myModal");
			document.getElementsByClassName("titulo")[i].setAttribute("data-toggle", "modal");

		}
	}
});

//Boton Reset
document.getElementById("reset").addEventListener("click", function() {
	location.reload();
});

//Botón elimianr Tareas	

document.getElementById("divDeleteTasks").addEventListener("click", function() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("Deleted");
			location.reload();
		}else{
			console.log("Status = "+this.status);
		}
	};
	xhttp.open("POST", "/rmvTask", true);
	xhttp.send();
});

//Botón nuevo Tablero			
document.getElementById("divDelete").addEventListener("click", function() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("New Table");
			location.reload();
		}else{
			console.log("Status = "+this.status);
		}
	};
	xhttp.open("POST", "/rmvAll", true);
	xhttp.send();
});

function play() {

	var divsTareas = document.getElementsByClassName("tareas");
	var duration = document.getElementsByClassName("duration");
	var subfases = document.getElementsByClassName("subfase");
	var fases = document.getElementsByClassName("faseName");
	var y = 0;
	var lowestTime = 0;
	var lazyPerson = [];
	var counter = 0;
	
	myInterval = setInterval(function() {

		console.log("Iteration Start");  
		for (var i = 0; i < fases.length; i++) {

			var firstPhaseName = fases[0].firstElementChild.innerHTML;
			var doing = fases[i].lastElementChild.firstElementChild;
			var done = fases[i].lastElementChild.lastElementChild;

			if (firstLoop) {
				console.log("Fisrt Loop");

				for (var j = 0; j < divsTareas.length; j++) {
					if (((fases[0].lastElementChild.firstElementChild.childNodes.length - 3) +
							(fases[0].lastElementChild.lastElementChild.childNodes.length - 3))
							< listPhases[0].maxTasks) {

						console.log("f");
						console.log(listTareas[j].name);
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

				// Assigna un tiempo a cada tarea de entre el intervalo de la fase
				if (task.phase == (i + 1) && task.tss == 0 && task.state != "Done" && task.duration == 0) {

					// Assigna un tiempo a cada tarea de entre el intervalo de la fase

					task.duration = Math.round(Math.random() * (listPhases[i].maxTime - listPhases[i].minTime) +  listPhases[i].minTime);

					cycleTime = parseInt(task.duration);

					if(i != 0){ //esto es para que la ultima tarea no se acumule
						task.cycleTime += cycleTime;				
					}else{
						task.cycleTime = cycleTime;
					}
					totalFases += cycleTime;
					listPhases[i].period += cycleTime;
					task.durarionAsignada = false;
				}

				for (var k = 0; k < divsTareas.length; k++) {

					var taskDuration = parseInt(task.duration);
					var elementName = divsTareas[k].firstElementChild.innerHTML;
					elementName = elementName.trim();

					if(task.name == elementName){
						divsTareas[k].lastElementChild.innerHTML = taskDuration;
					}

					console.log("-----------");

					if (task.state == "Doing" && task.name == elementName && task.tss >= taskDuration &&
							task.phase == (i + 1)) {
						console.log("IF 1 " + task.name);
						done.appendChild(divsTareas[k]);
						task.state = "Done";
						console.log("%c" + task.name + " is done", "font-size: 20px");
						task.sameIteration = true;

						for(var w = 0; w < listUsers.length; w++){
							for(var au = 0; au < task.assignedUsers.length; au++){
								if(listUsers[w].name == task.assignedUsers[au]){
									listUsers[w].assigned = false;
									document.getElementsByName(listUsers[w].name)[0].children[1].style.opacity = "1";
									
								}
							}
						}
						task.assignedUsers = [];// necesario para borrar asignaciones
						task.assignedUsers[0] = null;
						for(var t = 0; t < divsTareas.length; t++){
							if(divsTareas[t].firstElementChild.innerHTML.trim() == task.name){
								divsTareas[t].querySelector(".divState").innerHTML = "Done";
							}
						}

					} else if (task.state == "Doing" && task.name == elementName && task.tss != taskDuration &&
							task.phase == (i + 1)) {
						console.log("IF 2 " + task.name);
						if (task.phase > 0) {
							task.tss++;
							console.log(task.duration);
							console.log(task.tss);
						}


						var actualPhaseName = fases[i].firstElementChild.innerHTML;

						listUsers.forEach(function(user) {
							if(!user.assigned && task.assignedUsers[0] != null){
								var isTotallyFree = false;

								for(var up = 0; up<user.phases.length; up++){
									for(var p = 0; p < fases.length; p++){
										var phasesName = fases[p].firstElementChild.innerHTML.trim();
										var doingPhase = fases[p].lastElementChild.firstElementChild.childNodes;

										if(user.phases[up].trim() != actualPhaseName.trim()){
											for(var t = 0; t < listTareas.length; t++){
												//if((doingPhase.length - 3) == 0 && user.phases[up].trim().trim() == phasesName){
												if(listTareas[t].assignedUsers[0] != null && user.phases[up].trim() == phasesName){
													isTotallyFree = true;
												} else {
													isTotallyFree = false;
												}
											}
																				
										} else {
											for(var t = 0; t < listTareas.length; t++){
												if(listTareas[t].phase == (i+1) && listTareas[t].assignedUsers[0] != null){
													isTotallyFree = true;
												} else if (listTareas[t].phase == (i+1) && listTareas[t].assignedUsers[0] == null){
													isTotallyFree = false;
												}
											}
										}
									}

									if(isTotallyFree){
										console.log("assigned 2 " + task.name);
										task.assignedUsers.push(user.name);
										user.assigned = true;

										if(Math.round((task.duration - task.tss) / task.assignedUsers.length) == 0){
											task.duration = 1;
										} else {
											task.duration = Math.round((task.duration - task.tss) / task.assignedUsers.length);
										}
									}

								}

								if(user.assigned){
									document.getElementsByName(user.name)[0].children[1].style.opacity = "0.3";
									user.timeStopped += 1;
								}
							}
							// Este if es para aumentar los segundos trabajados
							console.log("ARRAY: "+task.assignedUsers);
							if(user.assigned){
								task.assignedUsers.forEach(function(assignedUser) {
									if(task.phase == 3){
										console.log("Call " + user.name);
										console.log("User asigned " + user.assigned);
										console.log("Assigned user " + assignedUser);
										
									}
									if(assignedUser == user.name){
										if(task.phase == 3){
											console.log("au");
										}
										user.secondsWork += 1;
									}
								});							
							}
							
							
						});



					} else if (task.state == "Done" && task.name == elementName && task.tss >= taskDuration &&
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

								fases[i + 1].lastElementChild.firstElementChild.appendChild(divsTareas[k]);
								task.state = "ToDo";
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

						console.log("IF 4 " + task.name);

						if (((fases[0].lastElementChild.firstElementChild.childNodes.length - 3) +
								(fases[0].lastElementChild.lastElementChild.childNodes.length - 3))
								< listPhases[0].maxTasks) {							
							console.log("llo");
							doing.appendChild(divsTareas[0]);
							task.cycleTime = 0;
							task.state = "ToDo";
							task.phase = 1;
							task.sameIteration = true;
							for(var t = 0; t < divsTareas.length; t++){
								if(divsTareas[t].firstElementChild.innerHTML.trim() == task.name){
									divsTareas[t].querySelector(".divState").innerHTML = "ToDo";
								}
							}

							if (task.phase == (i + 1) && task.tss == 0 && task.state != "Done") {
								// ________ESTO VA EN EL IF 4

								task.duration = Math.round(Math.random() * (listPhases[i].maxTime - listPhases[i].minTime) +  listPhases[i].minTime);								
								task.leadTime = leadTime;									
								cycleTime = parseInt(task.duration);												
								totalFases += cycleTime;
								listPhases[i].period += cycleTime;
								task.cycleTime += cycleTime;	
							}								
						} //if end
					} else if (task.state == "ToDo" && task.name == elementName && task.tss == 0 &&
							task.phase == (i + 1) && !task.sameIteration){

						console.log("IF 5 " + task.name);
						var actualPhaseName = fases[i].firstElementChild.innerHTML;

						listUsers.forEach(function(user) {
							if(!user.assigned){
								if(task.assignedUsers[0] == null){
									for(var up = 0; up <user.phases.length; up++){
										console.log(user.phases[up].trim().trim() + " " + actualPhaseName.trim());
										if(user.phases[up].trim().trim().trim() == actualPhaseName.trim()){
											console.log("assigned " + task.name);
											task.state = "Doing";
											task.assignedUsers[0] = (user.name);
											user.assigned = true;

											for(var t = 0; t < divsTareas.length; t++){
												if(divsTareas[t].firstElementChild.innerHTML.trim() == task.name){
													divsTareas[t].querySelector(".divState").innerHTML = "Doing";
												}
											}
										}	
									}
								} else {
									var isTotallyFree = false;
									console.log("asdfzxcv");
									for(var up = 0; up<user.phases.length; up++){
										for(var p = 0; p < fases.length; p++){
											//console.log("Free state " + isTotallyFree);
											var phasesName = fases[p].firstElementChild.innerHTML.trim();
											var doingPhase = fases[p].lastElementChild.firstElementChild.childNodes;

											if(user.phases[up].trim().trim() != actualPhaseName.trim()){
												for(var t = 0; t < listTareas.length; t++){
													//if((doingPhase.length - 3) == 0 && user.phases[up].trim() == phasesName){
													if(listTareas[t].assignedUsers[0] != null && user.phases[up].trim() == phasesName){
														isTotallyFree = true;
													} else {
														isTotallyFree = false;
													}
												}
																					
											} else {
												console.log("a");
												for(var t = 0; t < listTareas.length; t++){
													console.log(listTareas[t].phase);
													if(listTareas[t].phase == (i+1) && listTareas[t].assignedUsers[0] != null){
														console.log("c");
														isTotallyFree = true;
													} else if (listTareas[t].phase == (i+1) && listTareas[t].assignedUsers[0] == null){
														console.log("c2");
														isTotallyFree = false;
													}
												}
											}
										}

										if(isTotallyFree){
											console.log("assigned 2 " + task.name);
											task.assignedUsers.push(user.name);
											user.assigned = true;
											if(Math.round((task.duration - task.tss) / task.assignedUsers.length) == 0){
												task.duration = 1;
											} else {
												task.duration = Math.round((task.duration - task.tss) / task.assignedUsers.length);
											}
											console.log("new duration " + task.duration);
										}
									}
								}

								if(user.assigned){
									document.getElementsByName(user.name)[0].children[1].style.opacity = "0.3";
									user.timeStopped += 1;
									
									// (M) Estos los uso para calcular las tareas trabajadas y los segundos de cada usuario trabajados
								}
							} 
						}); //foreach 				
					} //iff 5 end
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
			// Finalizado completamente
			clearInterval(myInterval);

			// Cambiamos el boton a pausa
			document.getElementById("playpause").checked = false;

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

			// Deshabilitamos los botones del header
			for (var i = 0; i < document.getElementById("doubleButton").children.length; i++){

				document.getElementById("doubleButton").children[i].removeAttribute("disabled");
				document.getElementById("doubleButton").children[i].removeAttribute("aria-disabled");
			}

			// Volvemos a habilitar los resultados
			document.getElementById("result").removeAttribute("disabled");
			document.getElementById("result").removeAttribute("aria-disabled");

			// Volvemos todos los usuarios Y identificamos el usuario más ocioso
			for(var a = 0; a < document.getElementsByClassName("userName").length; a++){
				document.getElementsByClassName("userName")[a].children[1].style.opacity = "1";
			}

			lowestTime = listUsers[0].timeStopped;
			console.log("Lowest " + listUsers[0].timeStopped);

			// Buscamos el usuario más  ocioso, menos trabajador
			listUsers.forEach(function(user) {

				if(lowestTime == 0){

					lowestTime = 99;
					
				// Cantidad Menos Tareas
				}else if(lowestTime > user.timeStopped){ // Cantidad Tareas 

					lowestTime = user.timeStopped;
					lazyPerson[counter] = user.name;
					counter++;

				}

				console.log(user.timeStopped);

			});
			
			for(var i = 0; i < lazyPerson.length; i++){
				document.getElementsByName(lazyPerson[i])[0].children[1].style.color = "red";
			}
			
		}
		console.log("%cLEAD!" + leadTime, "font-size: 20px; color:green");
		leadTime += 1;

	}, 1000);

}

function mostrarResultados() {

	var text = "";
	var div = document.getElementsByClassName("mostrarResultadosDiv")[0];
	div.innerHTML = "";

	var h3 = document.createElement("h3");
	var div2 = document.createElement("div");			
	var div3 = document.createElement("div");
	var div4 =  document.createElement("div");
	var subdiv4 = document.createElement("div");
	var div5 = document.createElement("div");
	var subdiv5 = document.createElement("div");
	var subsubdiv5 = document.createElement("div");
	div3.className = "tareaResultadoDiv";
	h3.innerHTML = "<strong>Tabla de Resultados</strong>";
	div2.appendChild(h3);
	div.appendChild(div2);
	// Resultado fases
	div4.className = "faseResultadoDiv";
	subdiv4.className = "faseResultado";
	subdiv4.innerHTML = "<h4><center> Resultados de  fases</center></h4>";
	subdiv4.innerHTML += "<p> Tiempo total de las fases: "+totalFases+" s</p>";
	listPhases.forEach(function(phase) {
		mediaMaxFaseTime += phase.maxTime;
		mediaMinFaseTime += phase.minTime;
		subdiv4.innerHTML += "<p> "+phase.name+" : "+phase.period+" s</p>";

	});
	subdiv4.innerHTML += "<p>Calculo maximo estimado de las fases es de: "+mediaMaxFaseTime+" s</p>";
	subdiv4.innerHTML += "<p>Calculo minimo estimado de las fases es de: "+mediaMinFaseTime+" s</p>";
	mediaMaxFaseTime = 0;
	mediaMinFaseTime = 0 ;
	div4.appendChild(subdiv4);
	//Resultado Usuario
	div5.className = "userResultadoDiv";
	subdiv5.className = "userResultado";
	subsubdiv5.className = "ResultadoUsuario";
	subdiv5.innerHTML = "<h4><center> Resultados de usuarios</center> </h4>";
	var arrayValores = [];
	var nombresArray = [];
	listUsers.forEach(function(user) {

		subsubdiv5.innerHTML += '<div class="userCaja"><div class="userResultName">'+user.name+'<i class="fa fa-user-tie fa-2x" aria-hidden="true"><br></i></div>'+
						'<p> Tareas trabajadas: '+user.timeStopped+'</p><p>Tiempo activo: '+user.secondsWork+' Segundos</p></div>';
			
	});
		arrayValores = findMaxAndMin();
		console.log(arrayValores);
	

		subsubdiv5.innerHTML += '</div>';
	
	nombresArray = maxAndMinUsers(arrayValores[0],arrayValores[1]);
	
	console.log("multi "+nombresArray[0]);
	console.log("multi "+nombresArray[1]);
	var Pmensaje= "<p>El miembro que ha trabajado más es: ";
	for(var v = 0; v <nombresArray[0].length; v++ ){
		
		Pmensaje += "<strong>"+nombresArray[0][v]+"</strong>, ";
	}
	
	Pmensaje += "con "+arrayValores[0]+" segundos en "+arrayValores[2]+" tareas</p>";
	subdiv5.innerHTML += Pmensaje;
	var pmensaje2= "<p>El miembro que ha trabajado menos es: ";
	for(var v = 0; v <nombresArray[1].length; v++ ){
		
		pmensaje2 += "<strong>"+nombresArray[1][v]+"</strong>, ";
	}
	pmensaje2 += "con "+arrayValores[1]+" segundos "+arrayValores[3]+" tareas </p>";
	subdiv5.innerHTML += pmensaje2;
	subdiv5.appendChild(subsubdiv5);
	div5.appendChild(subdiv5);

	// Pinta las tareas
	listTareas.forEach(function(task) {			

		var p = document.createElement("P");
		var br = document.createElement("BR");
		var subDiv = document.createElement("div");
		subDiv.className = "tareaResultado";
		text = document.createTextNode( task.name );
		p.appendChild(text);
		subDiv.appendChild(p);
		var p1 = document.createElement("P");
		text = document.createTextNode(" Cycletime: " + (task.cycleTime ));
		p1.appendChild(text);
		subDiv.appendChild(p1);
		var p2 = document.createElement("P");
		text = document.createTextNode(" Leadime: " + task.leadTime);
		p2.appendChild(text);
		subDiv.appendChild(p2);			
		div3.appendChild(subDiv);
	});

	div.appendChild(div3);
	div.appendChild(div4);
	div.appendChild(div5);
}
// esta funcion me devuelve un array con el Max y el Min
function findMaxAndMin(){
	var max = 0;
	var min = 50;
	var userMax = "";
	var userMin = "";
	var taskmax = 0 ;
	var taskmin = 0;
	var array = [];
listUsers.forEach(function(user) {
	if (user.secondsWork > max) {
		max = user.secondsWork;
		taskmax = user.timeStopped;
		
	}else if(user.secondsWork < min){			
		min = user.secondsWork;
		taskmin = user.timeStopped;
		
	}
});
	array[0] = max;
	array[1] = min;
	array[2] = taskmax;
	array[3] = taskmin;
	
	return array;
}
// esta funcion me devuelve los nombres de los maximos y minimos
function maxAndMinUsers(userMax,userMin){
	var arraymulti = [];
	var array = [];
	var array2 = [];
	var i = 0;
	var j = 0;
	listUsers.forEach(function(user) {
		
		if(user.secondsWork == userMax){
			array[i] = user.name;
			i++
		}else if(user.secondsWork == userMin){
			
			array2[j] = user.name;
			j++
		}
		
	});
	 arraymulti.push(array);
	 arraymulti.push(array2);
	return arraymulti;
}
function generarResultados(){
	var buttonResult = document.getElementById("result");
	document.getElementsByClassName("contenedor")[0].style.visibility = "hidden";
	document.getElementsByClassName("usersContainer")[0].style.visibility = "hidden";
	playPause.children[0].setAttribute("disabled", "");
	playPause.children[0].setAttribute("aria-disabled", "true");
	playPause.children[1].style.opacity=0.3;
	mostrarResultados();
	buttonResult.value = "Mostrar Kanban";
	buttonResult.setAttribute("onClick", "mostrarKanban()");
}
function mostrarKanban(){
	document.getElementsByClassName("contenedor")[0].style.visibility = "visible";
	document.getElementsByClassName("usersContainer")[0].style.visibility = "visible";
	playPause.children[0].removeAttribute("disabled");
	playPause.children[0].removeAttribute("aria-disabled");
	playPause.children[1].style.opacity=1;
	document.getElementsByClassName("mostrarResultadosDiv")[0].innerHTML = "";
	document.getElementById("result").setAttribute("onClick", "generarResultados()");;
}

