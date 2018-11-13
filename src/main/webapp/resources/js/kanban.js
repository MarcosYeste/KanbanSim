var firstLoop = true;
var myInterval;
var leadTime = 0;
var oldName;
var playPause = document.getElementsByClassName("playpause")[0];
var RawPhases;
var kanbanTss = 0;
var gaussianCounter = 0;
var gaussian = 0; // Colocado en 1 segundo para facilitar las pruebas, 
var taskNameCounter = 0;
var poisson = 0; // Colocado en 1 segundo para facilitar las pruebas, 
var poissonCounter = 0;

var backLogType; 
var distributionType;
var inputBase = 1; //Base value for normal distribution 
var inputVariance = 1; // Variance value for normal distribution
var inputLambda = 1; // Lambda value for poisson distribution 
getDistribution(); //Type of backlog tasks input 'constant', 'manual'
if(backLogType == null){
	backLogType = "manual";
}

//Guardar al modificar Phase
sortPhases();
//Permitimos el tooltip de bootstrap en toda la pagina
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

//Añadimos un attributo auto incremental que nos servira para identificar la posición de los elementos
for(var i = 0 ; i < document.getElementsByClassName("titulo").length; i++){
	document.getElementsByClassName("titulo")[i].setAttribute("data-identification", listPhases[i].id);
	document.getElementsByClassName("titulo")[i].children[0].setAttribute("data-identification", listPhases[i].id);

	// Abrimos el formulario			
	document.getElementsByClassName("titulo")[i].addEventListener("click", modPhases , false);

	document.getElementsByClassName("titulo")[i].children[0].addEventListener("click", function(){
		event.preventDefault();
	});
}


for(var i = 0 ; i < document.getElementsByClassName("tareas").length; i++){
	document.getElementsByClassName("tareas")[i].setAttribute("data-identification", listTareas[i].name);
	for(var j = 0; j < document.getElementsByClassName("tareas")[i].children.length; j++){
		document.getElementsByClassName("tareas")[i].children[j].setAttribute("data-identification", listTareas[i].name);
		document.getElementsByClassName("tareas")[i].addEventListener("click", showTaskInfo , false);
	}
}


//Añadimos un attributo auto incremental que nos servira para identificar la posición de cada uno de los elementos
for(var i = 0 ; i < document.getElementsByClassName("userName").length; i++){

	document.getElementsByClassName("userName")[i].setAttribute("data-identification", i);
	document.getElementsByClassName("userName")[i].children[0].children[0].setAttribute("data-identification", i);
	document.getElementsByClassName("userName")[i].children[1].setAttribute("data-identification", i);

	// Abrimos el formulario			
	document.getElementsByClassName("userName")[i].addEventListener("click", modUsers , false);
	document.getElementsByClassName("userName")[i].children[0].children[0].addEventListener("click", function(){
		event.preventDefault();
	});
	document.getElementsByClassName("userName")[i].children[1].addEventListener("click", function(){
		event.preventDefault();
	});

}
//-------------------------------------------------------------------------

//Play Button
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

//Boton Reset
document.getElementById("reset").addEventListener("click", function() {
	location.reload();
});

//Botón elimianr Tareas	

document.getElementById("divDeleteTasks").addEventListener("click", function() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			location.reload();
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

			location.reload();
		}
	};
	xhttp.open("POST", "/rmvAll", true);
	xhttp.send();
});

//Corregir problema, cuando no hay tareas, al inicar el kanban el mismo se detiene 

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

		for (var i = 0; i < fases.length; i++) {

			var doing = fases[i].lastElementChild.firstElementChild;
			var done = fases[i].lastElementChild.lastElementChild;

//			-------------------------------------------------------------------------------------------//

			if (firstLoop) { 


				for (var j = 0; j < divsTareas.length; j++) {
					if (((fases[0].lastElementChild.firstElementChild.childNodes.length - 3) +
							(fases[0].lastElementChild.lastElementChild.childNodes.length - 3))
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

//			--------------------------------------------------------------------------------------------------------//
			listTareas.forEach(function(task) {

				// Assigna un tiempo a cada tarea de entre el intervalo de la fase
				if (task.phase == (i + 1) && task.tss == 0 && task.state != "Done" && task.state != "Ended" && task.duration == 0) {

					// Assigna un tiempo a cada tarea de entre el intervalo de la fase
					task.duration = Math.round(Math.random() * (listPhases[i].maxTime - listPhases[i].minTime) +  listPhases[i].minTime);
					task.esfuerzo += task.duration;
					task.durarionAsignada = false;


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
												if(listTareas[t].assignedUsers[0] != null && user.phases[up].trim() == actualPhaseName){
													isTotallyFree = true;
												} else {
													isTotallyFree = false;
												}
											}

										} else if(user.phases[up].trim() == actualPhaseName.trim()){
											phaseSkill = up;
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
							// Este if es para aumentar los segundos trabajados

							if(user.assigned){
								task.assignedUsers.forEach(function(assignedUser) {
									//guarda en Usuarios los segundos se cada fase
									if(assignedUser.includes((user.name))){
										user.secondsWork += 1;
										if(user.secondByPhase[i] ==  undefined){

											user.secondByPhase[i] = 1;
										}else{
											user.secondByPhase[i] += 1;
										}
									}
								});							
							}

						});


					} else if (task.state == "Done" && task.name == elementName && task.tss >= taskDuration &&
							task.phase == (i + 1) && !task.sameIteration) {
						//IF 3
						if (fases[i + 1] == null) {							
							task.state = "Ended";
							task.leadTime = leadTime;
							saveTimeStates(task,leadTime,i);
							divsTareas[k] = mostrarFinalTarea(divsTareas[k],task);
							document.getElementsByClassName("contenedorFinal")[0].appendChild(divsTareas[k]);




						} else {
							if (((fases[i + 1].lastElementChild.firstElementChild.childNodes.length - 3) +
									(fases[i + 1].lastElementChild.lastElementChild.childNodes.length - 3))
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

						if (((fases[0].lastElementChild.firstElementChild.childNodes.length - 3) +
								(fases[0].lastElementChild.lastElementChild.childNodes.length - 3))
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

								task.duration = Math.round(Math.random() * (listPhases[i].maxTime - listPhases[i].minTime) +  listPhases[i].minTime);	
								task.esfuerzo += task.duration;
								task.startTime = leadTime;
							}								
						} //if end
					} else if (task.state == "ToDo" && task.name == elementName && task.tss == 0 &&
							task.phase == (i + 1) && !task.sameIteration){

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
													if(listTareas[t].assignedUsers[0] != null && user.phases[up].trim() == actualPhaseName.trim()){
														isTotallyFree = true;
													} else {
														isTotallyFree = false;
													}
												}

											} else {
												phaseSkill = up;
												for(var t = 0; t < listTareas.length; t++){

													if(listTareas[t].phase == (i+1) && listTareas[t].assignedUsers[0] != null){

														isTotallyFree = true;
													} else if (listTareas[t].phase == (i+1) && listTareas[t].assignedUsers[0] == null){

														isTotallyFree = false;
													}
												}
											}
										}

										// Asignar tarea Empezada, tarea Multiusuario
										if(isTotallyFree){ 
											task.assignedUsers.push(user.name);
											if(!task.staticAssigneds.includes((user.name)+" ")){
												user.tasksWorked += 1;
												task.staticAssigneds += (user.name)+" ";

											}
											user.assigned = true;

//											// Usuarios Que han trabajado en esa tarea
//											if(document.getElementById("modalTaskNameValue").innerHTML == task.name){
//											document.getElementById("modalTaskWorkedValue").innerHTML = task.staticAssigneds
//											do {

//											document.getElementById("modalTaskWorkedValue").innerHTML = document.getElementById("modalTaskWorkedValue").innerHTML.replace(" ", ",");

//											}while(document.getElementById("modalTaskWorkedValue").innerHTML.indexOf(" ") != -1);
//											}
//											console.log("Adios");

											if(Math.round((task.duration - task.tss) / task.assignedUsers.length) <= 0){
												task.duration = 1;
											} else {
												task.duration = Math.round((task.duration - task.tss) / task.assignedUsers.length) * (100 / user.skills[phaseSkill]);
											}

										}
									}
								}

								if(user.assigned){

									document.getElementsByName(user.name)[0].children[1].style.opacity = "0.3";
									document.getElementsByName(user.name)[0].children[1].style.color = fases[i].style.backgroundColor;
									document.getElementsByName(user.name)[0].style.borderColor = fases[i].style.backgroundColor;

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

		// Unicamente se ejecutara cuando el usuario haya elegido el modo de distribucion Normal
		if(backLogType == "constant"){	
			if((gaussian == gaussianCounter || gaussian == 0) && distributionType == "normal"){
				console.log("normal");
				getGaussian();
				gaussianCounter = 0;
				taskNameCounter ++;
				// Creamos un objeto nuevo
				createTaskElement();
				// Y lo printamos
			} else if ((poisson == poissonCounter || poisson == 0) && distributionType == "poisson"){
				getPoisson();
				console.log("poisson")
				poissonCounter = 0;
				taskNameCounter ++;
				createTaskElement();
			}
			
		}
		
		if(backLogType == "manual"){
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
		} else if (backLogType == "constant"){
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

	}, 1000);

}


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
function sortPhases(){
	$( function() {
		$( "#faseDiv" ).sortable({
			disabled:false,
			containment: '#faseDiv', 
			axis:"x", 
			tolerance:"pointer",
			zIndex: 9999,
			items: "> div.faseName",
			update: function (event, ui) {


				var info = $(this).sortable("toArray");
				var fasesString = "";
				for (var i = 0; i < info.length; i++) {
					fasesString += info[i] + ",";
				}

				$.ajax({
					data: {Stringfases : fasesString},
					dataType: "String",
					type: 'POST',
					url: '/sortPhase',
					success: function(){
					}
				});
			}
		});
		$( "#faseDiv" ).disableSelection();
		$( "#faseDiv").css("cursor", "move");
	});
}
function getGaussian(){
	$.ajax({
		type: "GET",
		url: "/nextGaussian",
		data: {
			
		},success: function(data) {

			gaussian = parseInt(data)

		}
	});
}

function getPoisson(){
	$.ajax({
		type: "GET",
		url: "/nextPoisson",
		data: {

		},success: function(data) {

			poisson = parseInt(data)

		}
	});
}

function printTasks(tarea){
	document.getElementsByClassName("contenedorTareas")[0].innerHTML +=
		"<div class='tareas' data-toggle='modal' data-target='#modalTaskInfo' " +
		"data-identification='" + tarea.name + "' id='"+tarea.name+"'> " +
		"<p data-identification='" + tarea.name + "'>" + tarea.name + "</p>" +
		"<p class='estado' data-identification='" + tarea.name + "'>" +
		"<small class='divState'></small></p>" +
		"<p class='duration' data-identification='" + tarea.name + "'>0</p></div>";
}

function getDistribution(){
	$.ajax({
		type: "GET",
		url: "/getDistr",
		data: {
		},success: function(data) {
			var formedData = data.split(',');
			backLogType = formedData[0];
			distributionType = formedData[1];
			
			$("input[value='"+ backLogType +"']").prop("checked", true);
			
			if($("input[value='"+ distributionType +"']").is(':disabled')){
				$("input[value='"+ distributionType +"']").prop("checked", true);

				
				if(distributionType == "normal"){
					document.getElementById("paramTitle").style.visibility = "visible";
					document.getElementById("paramTitle").style.height = "initial";
					document.getElementById("dataNormalDistribution").style.visibility = "visible";
					document.getElementById("dataNormalDistribution").style.height = "initial";
					document.getElementById("normalBaseValue").value = formedData[2];
					document.getElementById("normalVarianceValue").value = formedData[3];
				} else if (distributionType == "poisson") {
					document.getElementById("paramTitle").style.visibility = "visible";
					document.getElementById("paramTitle").style.height = "initial";
					document.getElementById("dataPoissonDistribution").style.visibility = "visible";
					document.getElementById("dataPoissonDistribution").style.height = "initial";
					document.getElementById("poissonLambda").value = formedData[4];
				}
			}
			
			if(backLogType == "constant"){
				$("[name='distributionType']").removeAttr("disabled");
			}else{
				$("[name='distributionType']").attr("disabled", "");
			}
		}
	});
}

function createTaskElement(){
	var tarea = new Object();
	tarea.name = "Task" + taskNameCounter;
	tarea.duration = 0;
	tarea.tss = 0;
	tarea.state;
	tarea.phase = 0;
	tarea.assignedUsers = new Array();
	tarea.staticAssigneds = new Array();
	tarea.sameIteration = false;
	tarea.cycleTime = 0;
	tarea.leadTime = 0;
	tarea.startTime = 0;
	tarea.esfuerzo = 0;
	tarea.phasesTime = new Array();
	tarea.timeByStats = new Array();
	tarea.statsTime = new Array();
	listTareas.push(tarea);
	printTasks(tarea);
}