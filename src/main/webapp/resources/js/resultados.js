// Muestra el contenido de la tarea al terminar
function mostrarFinalTarea(tarea,task){

	task.cycleTime = task.leadTime - task.startTime;
	tarea.innerHTML = "<p>"+task.name+"</p><p>CycleTime: "+task.cycleTime+"</p><p>LeadTime: "+task.leadTime+"</p>";
	return tarea;
}
function mostrarResultados() {
	calculoTiemposTotalesFase();
	
//	document.getElementById("taskChart").innerHTML += '<canvas id="myChartTask"></canvas>';
//	mostrarGraficaTareas();

	var div = document.getElementsByClassName("mostrarResultadosDiv")[0];
	div.innerHTML = "";	
	
	//RESULTADOS TAREA 
	var div3 = document.createElement("div");
	div3.className = "tareaResultadoDiv";
	var subDiv = document.createElement("div");
	subDiv.className = "tareaResultado";
	subDiv.id = "tareaResultado";
	div3.appendChild(subDiv);
	div.appendChild(div3);	
	tableTask(); 
	
	//RESULTADOS FASES
	tablePhase();
	
	//RESULTADOS USER
	var div5 = document.createElement("div");
	var subdiv5 = document.createElement("div");
	var subsubdiv5 = document.createElement("div");
	div5.className = "userResultadoDiv";
	subdiv5.className = "userResultado";
	subsubdiv5.className = "ResultadoUsuario";
	subsubdiv5.id = "ResultadoUsuario";
	subdiv5.appendChild(subsubdiv5);
	div5.appendChild(subdiv5);
	div.appendChild(div5);
	tableUser();
}

// Click a mostrar resultados
function generarResultados(){
	var buttonResult = document.getElementById("result");
	document.getElementsByClassName("contenedor")[0].style.visibility = "hidden";
	document.getElementsByClassName("teamField")[0].style.display = "none";
	playPause.children[0].setAttribute("disabled", "");
	playPause.children[0].setAttribute("aria-disabled", "true");
	playPause.children[1].style.opacity=0.3;
	// Deshabilitamos el añadir tareas,
	document.getElementById("addTask").setAttribute("disabled", "");
	document.getElementById("addTask").setAttribute("aria-disabled", "true");
	
	mostrarResultados();
	buttonResult.value = "Mostrar Kanban";
	buttonResult.setAttribute("onClick", "mostrarKanban()");
}
// Click a mostrar kanban
function mostrarKanban(){
	document.getElementsByClassName("contenedor")[0].style.visibility = "visible";
	document.getElementsByClassName("teamField")[0].style.display = "inherit";
	playPause.children[0].removeAttribute("disabled");
	playPause.children[0].removeAttribute("aria-disabled");
	playPause.children[1].style.opacity=1;
	document.getElementsByClassName("mostrarResultadosDiv")[0].innerHTML = "";
	document.getElementById("result").setAttribute("onClick", "generarResultados()");
	
	// Mostramos el boton de nuevo
	if(backLogType != "constant"){
	document.getElementById("addTask").removeAttribute("disabled");
	document.getElementById("addTask").removeAttribute("aria-disabled");
	}
}