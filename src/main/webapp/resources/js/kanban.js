//var totalFases = 0;
//var mediaMaxFaseTime = 0;
//var mediaMinFaseTime = 0;
var firstLoop = true;
var myInterval;
var leadTime = 0;
var oldName;
var playPause = document.getElementsByClassName("playpause")[0];
var RawPhases;
var kanbanTss = 0;
// Guardar al modificar Phase
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

function play() {

	var divsTareas = document.getElementsByClassName("tareas");
	var fases = document.getElementsByClassName("faseName");
	var lowestTime = [];
	var lazyPeople = [];
	var tiempoInicio = 0;
	var anteriorTiempo =0;

	myInterval = setInterval(function() {

		kanbanTss++;
		
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
												if(listTareas[t].assignedUsers[0] != null && user.phases[up].trim() == actualPhaseName){//8
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
											user.tasksWorked += 1;//8
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
									}//8
								}

								if(user.assigned){
									document.getElementsByName(user.name)[0].children[1].style.opacity = "0.3";
									document.getElementsByName(user.name)[0].children[1].style.color = fases[i].style.backgroundColor;
									document.getElementsByName(user.name)[0].style.borderColor = fases[i].style.backgroundColor;


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

		if (document.getElementsByClassName("contenedorFinal")[0].childNodes.length == divsTareas.length || (kanbanTss == chronoTime && chronoTime != 0)) {
			listTareas.forEach(function(task) {

			});
			// Finalizado completamente
			clearInterval(myInterval);

			// Cambiamos el boton a pausa
			document.getElementById("playpause").checked = false;

			deshabilitarMenus(false);
			sortPhases();

			lowestTime = findMaxAndMin();
			lazyPeople = maxAndMinUsers(lowestTime[0], lowestTime[1]);

			for(var i = 0; i < lazyPeople[1].length; i++){
				document.getElementsByName(lazyPeople[1][i])[0].children[1].style.color = "red";
			}

		}

		leadTime += 1;
		console.log("::: LEAD TIEM ::::: "+leadTime);
		if(chronoTime != null){
			if(chronoTime > 59){
				var sec_num = parseInt(chronoTime - kanbanTss, 10);//8
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
		
	}, 1000);

}


function saveTimeStates(task,leadTime,i){
	
	
	if(task.state == "ToDo"){
		if(task.statsTime[0] == undefined && task.statsTime[1] == undefined && task.statsTime[2] == undefined){
			task.statsTime[0] = 0;task.statsTime[1] = 0;task.statsTime[2] =0;
		}
		if(task.phase != 0){			
			task.statsTime[2]= leadTime - task.statsTime[1] - task.statsTime[0]- task.startTime-sumaFasesTiempo(task.phasesTime);			
			task.timeByStats.push(task.statsTime);
			console.log(">>>>>>>>>>>>>>>>>>>  comienza LA I VALE "+i);
			console.log(task.statsTime);
			task.phasesTime[i] = saveNewTimePhase(task.statsTime);
			task.statsTime = [0,0,0];
		}
		
	}else if (task.state == "Doing"){
		
		if(task.phase > 1){			
				task.statsTime[0]= leadTime - task.startTime - sumaFasesTiempo(task.phasesTime);			
		}else{			
				task.statsTime[0]= leadTime - task.startTime;
		}
		
	}else if(task.state == "Done"){
		if(task.phase > 1){
			task.statsTime[1]= leadTime - task.statsTime[0]- task.startTime - sumaFasesTiempo(task.phasesTime);
		}else{
			task.statsTime[1]= leadTime - task.statsTime[0]- task.startTime;
		}
		
	}else{
		
		console.log("Ended");
		if(task.phase > 1){
			task.statsTime[2]= leadTime - task.statsTime[1] - task.statsTime[0]- task.startTime - sumaFasesTiempo(task.phasesTime);
		}else{
			task.statsTime[2]= leadTime - task.statsTime[1] - task.statsTime[0]- task.startTime;
			
		}
		task.timeByStats.push(task.statsTime);
		console.log(">>>>>>>>>>>>>>>>>>>  termina LA I VALE "+i);
		task.phasesTime[i] = saveNewTimePhase(task.statsTime);
		task.statsTime = [0,0,0];
	}
	
	
}
function sumaFasesTiempo(phasesTime){
	var suma = 0;
	for (var i = 0; i < phasesTime.length; i++) {
		suma += phasesTime[i];
		
	}
	return suma;
}
function saveNewTimePhase(statsTime){
	var suma = 0;
	for(var i = 0; i < statsTime.length; i++){
		suma += statsTime[i];
		
	}
	console.log("Total de esta fase: "+suma);
	return suma;

}

function mostrarFinalTarea(tarea,task){

	task.cycleTime = task.leadTime - task.startTime;
	tarea.innerHTML = "<p>"+task.name+"</p><p>CycleTime: "+task.cycleTime+"</p><p>LeadTime: "+task.leadTime+"</p>";
	return tarea;

}
function mostrarResultados() {

	calculoTiemposTotalesFase();
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
	var tabla = "<table class='table table-bordered'>";
	tabla += "<head>";
	tabla += "<tr>";
	tabla += "<th rowspan = '2'></th>";
	var cv = 0;	
	listPhases.forEach(function(phase) {

		
		tabla +="<th><div class='th'>"+phase.name+" ( "+phase.period+"s )</div></th>";
		cv++;

	});
	tabla += "<th><div class='th'>Media De las Tareas</div></th>";
	tabla += "</tr>";
	tabla += "<tr>";
	for (var i = 0; i <= cv; i++) {
		tabla += "<th><div class='stados'><p>todo</p><p>doing</p><p>done</p></div></th>";
	}
	tabla += "</tr>";
	tabla += "</head>";	
	tabla += "<tbody>";
	var numerotareas =0;
	var sumatodo= 0;
	var sumaDoing = 0;
	var sumadone=0;
	var sumaEstadosTotal = 0;
	var sumaFaseTotal =0;
	var mediaPorTarea = new Array();
	var mediaPorFases = new Array();
	var resultMediaPorFases = new Array();
	var l = 0;
	listTareas.forEach(function(task) {	
		tabla += "<tr>";
		tabla += "<td>"+task.name+"</td>";
		var i = 0;
		mediaPorFases.push(task.timeByStats);//guardo 3 multi array
		task.timeByStats.forEach(function(times) {	
			var time = JSON.stringify(times);
			time = JSON.parse(time);
			tabla += "<td><div class='stados'><p>"+time[0]+"s</p><p>"+time[1]+"s</p><p>"+time[2]+"s</p></div></td>";
			sumatodo += time[0];sumaDoing += time[1];sumadone += time[2];
			
			i++;
		});	
		
		mediaPorTarea.push(calcularMediaPorTarea(mediaPorTarea,task.timeByStats));
		
		tabla += "<td><div class='stados'><p>"+mediaPorTarea[l][0]+"s</p><p>"+mediaPorTarea[l][1]+"s</p><p>"+mediaPorTarea[l][2]+"s</p></div></td>";
		tabla += "</tr>";
		l++;
		numerotareas = l;
	});
	resultMediaPorFases = mediaFasestotal(mediaPorFases);
	console.table(resultMediaPorFases);
	sumaEstadosTotal = Math.round((sumatodo + sumaDoing+ sumadone)/numerotareas);
	tabla += "<tr>";
	tabla += "<td>Media por fase: </td>";
	for (var i = 0; i < cv; i++) {
		tabla += "<td><div class='stados'><p>"+resultMediaPorFases[i][0]+"s</p><p>"+resultMediaPorFases[i][1]+"s</p><p>"+resultMediaPorFases[i][2]+"s</p></div></td>";
	}
	tabla += "</tr>";
	tabla += "<tr><td>Media Total: </td><td colspan='"+cv+"'>"+sumaEstadosTotal+"s</td></tr>";
	tabla += "</tbody>";
	subdiv4.innerHTML += tabla;
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
	var idU=0;
	listUsers.forEach(function(user) {
		
		user.secondsNotWorked = leadTime - user.secondsWork;
		subsubdiv5.innerHTML += '<div id='+idU+' onclick="mostrarDorsoUsuarios(this.id,'+JSON.stringify(user.secondByPhase)+')" class="userCaja"><div class="userResultName">'+user.name+'<i class="fa fa-user-tie fa-2x" aria-hidden="true"><br></i></div>'+
		'<p> Tareas trabajadas: '+user.tasksWorked+'</p><p>Tiempo activo: '+user.secondsWork+' Segundos</p><p>Tiempo inactivo: '+user.secondsNotWorked+' Segundos</p><small style="color:blue">Ver más</small></div>';
		idU++;
	});
	arrayValores = findMaxAndMin();


	subsubdiv5.innerHTML += '</div>';

	nombresArray = maxAndMinUsers(arrayValores[0],arrayValores[1]);

	var Pmensaje = "<p>El miembro que ha trabajado más es: ";

	for(var v = 0; v < nombresArray[0].length; v++ ){

		Pmensaje += "<strong>"+nombresArray[0][v]+"</strong>, ";
	}

	Pmensaje += "con "+arrayValores[0]+" segundos en "+arrayValores[2]+" tareas</p>";
	subdiv5.innerHTML += Pmensaje;
	if(nombresArray[1].length == 0){
		var pmensaje2= "<p>No hay trabajadores perezosos</P>";
	}else{

		var pmensaje2= "<p>El miembro que ha trabajado menos es: ";

		for(var v = 0; v < nombresArray[1].length; v++ ){

			pmensaje2 += "<strong>"+nombresArray[1][v]+"</strong>, ";
		}

		pmensaje2 += "con "+arrayValores[1]+" segundos "+arrayValores[3]+" tareas </p>";
	}
	subdiv5.innerHTML += pmensaje2;
	subdiv5.appendChild(subsubdiv5);
	div5.appendChild(subdiv5);

	// Pinta las tareas
	var bigdiv = document.createElement("div");
	var divAssigned = document.createElement("div");
	divAssigned.className = "divAssigned";
	var idT= 0;
	listTareas.forEach(function(task) {			

		var p = document.createElement("P");
		var br = document.createElement("BR");
		var subDiv = document.createElement("div");

		subDiv.className = "tareaResultado";
		subDiv.id = "T"+idT;
		idT++;
		subDiv.setAttribute("onClick", "mostrarDorsoTarea(this.id,"+JSON.stringify(task.phasesTime)+")");
		text = document.createTextNode( task.name );
		p.appendChild(text);
		subDiv.appendChild(p);
		var p1 = document.createElement("P");
		text = document.createTextNode(" Cycle Time: " + (task.cycleTime )+"''");
		p1.appendChild(text);
		subDiv.appendChild(p1);
		var p2 = document.createElement("P");
		text = document.createTextNode(" Lead Time: " + task.leadTime+"''");
		p2.appendChild(text);	
		subDiv.appendChild(p2);		
		subDiv.innerHTML += "<p>Waiting to Start "+task.startTime+"''</p><small style='color:blue'>Ver más</small>";
		div3.appendChild(subDiv);		
		bigdiv.appendChild(div3);
		divAssigned.innerHTML += "<div class='asignados'><p><strong>Asignados:</strong></p><P> "+task.staticAssigneds+" </p><div>";	
//		div3.appendChild(divAssigned);
	});
	bigdiv.appendChild(divAssigned);
	div.appendChild(bigdiv);
	div.appendChild(div4);
	div.appendChild(div5);
}

// calcula media por tareas
function calcularMediaPorTarea(mediaPorTarea,timeByStats){
	var sumaTodo = 0;
	var  sumaDoing = 0;
	var sumadone = 0;
	var num = 0 ;
	timeByStats = timeByStats;
	
	for (var i = 0; i < timeByStats.length; i++) {
		sumaTodo += timeByStats[i][0];
		sumaDoing += timeByStats[i][1];
		sumadone += timeByStats[i][2];
		num = i ;
	}
	num += 1;
	sumaTodo = Math.round( (sumaTodo / num) * 10 ) / 10;
	sumaDoing = Math.round( (sumaDoing / num) * 10 ) / 10;
	sumadone = Math.round( (sumadone / num ) * 10 ) / 10;
	
	mediaPorTarea = [sumaTodo,sumaDoing,sumadone];
	return mediaPorTarea;
	
}

//media de las fases por separado
function mediaFasestotal(taskArray){
	console.table(taskArray[0]);
	console.table(taskArray[1]);
	console.table(taskArray[2]);
	var z = 0;
	var array = taskArray;	
	var arrayFases  = new Array();
	var numero =0;
	while (z < array[0].length){
		var sumaTodos =0;
		var sumaDoing = 0;
		var sumaDone = 0;
		for (var i = 0; i < array.length; i++) {
				
			sumaTodos += array[i][z][0];
			sumaDoing += array[i][z][1];
			sumaDone  += array[i][z][2];								
				
		}
		sumaTodos = Math.round((sumaTodos / array[0][0].length)* 10 ) / 10;
		sumaDoing = Math.round((sumaDoing / array[0][0].length) * 10 ) / 10;
		sumaDone  =  Math.round((sumaDone / array[0][0].length) * 10 ) / 10;
	arrayFases.push([sumaTodos,sumaDoing,sumaDone]);
	z++;
	}
 return arrayFases;
}
function calculoTiemposTotalesFase(){
	var i = 0;
	listPhases.forEach(function(phase) {
		
			if(phase.period=undefined){
				phase.period = 0;
			}
			
			var valor = subCalculoTiempos(i);
			phase.period = valor;
			i++;
	});
}
function subCalculoTiempos(i){
	var total = 0 ;
	
	for( var k = 0 ; k < listTareas[i].phasesTime.length ; k++){
		total += listTareas[k].phasesTime[i];
	}
		
		return total;
	
}

function mostrarDorsoUsuarios(id,secondByPhase){
	var U = document.getElementById(id);
	var i = 0;
	U.innerHTML = "";
	secondByPhase = secondByPhase;
	listPhases.forEach(function(phase) {
		if(secondByPhase[i] == undefined || secondByPhase[i] == null){
			secondByPhase[i]= 0;
		}
		U.innerHTML += "<p>"+phase.name+": "+secondByPhase[i]+"''</p>";
		i++;
	});
	U.innerHTML += "<small style='color:blue'>Ver más</small>";
	U.setAttribute("onClick","mostrarResultados()");
}

function mostrarDorsoTarea(id,phasesTime){
	var T = document.getElementById(id);
	var i = 0;
	T.innerHTML = "";
	phasesTime = phasesTime;
	listPhases.forEach(function(phase) {	
		T.innerHTML += "<p>Time on "+phase.name+": "+phasesTime[i]+"''</p>";
		i++;
	});
	T.innerHTML += "<small style='color:blue'>Ver más</small>";
	T.setAttribute("onClick","mostrarResultados()");
}
//esta funcion me devuelve un array con el Max y el Min
function findMaxAndMin(){
	var max = 0;
	var min = 500;
	var userMax = "";
	var userMin = "";
	var taskmax = 0 ;
	var taskmin = 0;
	var array = [];

	listUsers.forEach(function(user) {
		if (user.secondsWork > max) {
			max = user.secondsWork;
			taskmax = user.tasksWorked;

		}else if(user.secondsWork < min){

			min = user.secondsWork;
			taskmin = user.tasksWorked;

		}
	});
	if(min == 500){
		min = 0;
	}

	array[0] = max;
	array[1] = min;
	array[2] = taskmax;
	array[3] = taskmin;

	return array;
}
//esta funcion me devuelve los nombres de los maximos y minimos
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

function deshabilitarMenus(disable){

	if (disable){
		// Deshabilitamos los botones del header
		for (var i = 0; i < document.getElementById("header-btn").children.length; i++){

			document.getElementById("header-btn").children[i].setAttribute("class", "btn btn-success disabled");
			document.getElementById("header-btn").children[i].setAttribute("aria-disabled", "true");

		}

		// Deshabilitamos los botones del header
		for (var i2 = 0; i2 < document.getElementById("doubleButton").children.length; i2++){

			document.getElementById("doubleButton").children[i2].setAttribute("disabled", "");;
			document.getElementById("doubleButton").children[i2].setAttribute("aria-disabled", "true");
		}

		// Y quitamos el acceso a el formulario de modificación
		for (var i3 = 0; i3 < document.getElementsByClassName("titulo").length; i3++){

			document.getElementsByClassName("titulo")[i3].removeAttribute("data-target", "#myModal");
			document.getElementsByClassName("titulo")[i3].removeAttribute("data-toggle", "modal");

		}

		// Y quitamos el acceso a el formulario de modificación
		for (var i4 = 0; i4 < document.getElementsByClassName("userName").length; i4++){

			document.getElementsByClassName("userName")[i4].removeAttribute("data-target", "#myModal2");
			document.getElementsByClassName("userName")[i4].removeAttribute("data-toggle", "modal");

		}

		document.getElementById("result").setAttribute("disabled", "");
		document.getElementById("result").setAttribute("aria-disabled", "true");

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
		for (var ic = 0; ic < document.getElementsByClassName("userName").length; ic++){

			document.getElementsByClassName("userName")[ic].setAttribute("data-target", "#myModal2");
			document.getElementsByClassName("userName")[ic].setAttribute("data-toggle", "modal");

		}
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

				/* PRUEBA AJAX  */
				var info = $(this).sortable("toArray");
				var fasesString = "";
				for (var i = 0; i < info.length; i++) {
					fasesString += info[i] + ",";
				};

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