var showGraf = false;
// Muestra el contenido de la tarea al terminar
function mostrarFinalTarea(tarea,task){
	
	task.leadTime = task.leadTime - task.creationTime;
	
	task.cycleTime = task.leadTime - task.startTime;
	
	tarea.innerHTML = "<p>"+task.name+"</p><p>CycleTime: "+task.cycleTime+"</p><p>LeadTime: "+task.leadTime+"</p>";
	return tarea;
	// EL LEAD FUNCIONA BIEN, EL CYCLO A MEDIAS , PERO EL CREATION TIME NO LO DA BIEN, CADA TAREA ES  +1 EN LUGAR DE GUARDAR EL LEADTIME
}
function mostrarResultados() {
	calculoTiemposTotalesFase();
	var div = document.getElementsByClassName("mostrarResultadosDiv")[0];

	div.style.background = "#63bafa";
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
	document.getElementsByClassName("mostrarGraficosDiv")[0].style.display = "none";
	var buttonResult = document.getElementById("result");
	document.getElementsByClassName("contenedor")[0].style.visibility = "hidden";
	document.getElementsByClassName("teamField")[0].style.display = "none";
	playPause.children[0].setAttribute("disabled", "");
	playPause.children[0].setAttribute("aria-disabled", "true");
	playPause.children[1].style.opacity=0.3;
	// Deshabilitamos el añadir tareas,
	document.getElementById("addTask").setAttribute("disabled", "");
	document.getElementById("addTask").setAttribute("aria-disabled", "true");
	document.getElementsByClassName("mostrarResultadosDiv")[0].style.display = "block";
	mostrarResultados();
	buttonResult.value = "Mostrar Kanban";
	buttonResult.setAttribute("onClick", "mostrarKanban()");
	document.getElementById("graficos").setAttribute("onClick", "mostrarGraficas()");
}
// Click a mostrar kanban
function mostrarKanban(){
	document.getElementsByClassName("mostrarGraficosDiv")[0].style.display = "none";
//	document.getElementsByClassName("contenedor")[0].style.display = "block";
	document.getElementsByClassName("contenedor")[0].style.visibility = "visible";	
	document.getElementsByClassName("teamField")[0].style.display = "inherit";
	playPause.children[0].removeAttribute("disabled");
	playPause.children[0].removeAttribute("aria-disabled");
	playPause.children[1].style.opacity=1;
	document.getElementsByClassName("mostrarResultadosDiv")[0].innerHTML = "";	
	document.getElementById("result").setAttribute("onClick", "generarResultados()");
	document.getElementById("graficos").setAttribute("onClick", "mostrarGraficas()");
	
	// Mostramos el boton de nuevo
	if(backLogType != "constant"){
	document.getElementById("addTask").removeAttribute("disabled");
	document.getElementById("addTask").removeAttribute("aria-disabled");
	}
}
//click mostrar Graficos
function mostrarGraficas (){
	
	document.getElementsByClassName("mostrarGraficosDiv")[0].style.background = "white";
	document.getElementsByClassName("mostrarGraficosDiv")[0].style.display = "block";
	document.getElementsByClassName("mostrarResultadosDiv")[0].style.display = "none";
	document.getElementsByClassName("contenedor")[0].style.visibility = "hidden";
	document.getElementsByClassName("teamField")[0].style.display = "none";
	playPause.children[0].setAttribute("disabled", "");
	playPause.children[0].setAttribute("aria-disabled", "true");
	playPause.children[1].style.opacity=0.3;
	document.getElementById("addTask").setAttribute("disabled", "");
	document.getElementById("addTask").setAttribute("aria-disabled", "true");
	generarGraficos();
	showGraf = true;
	document.getElementById("graficos").setAttribute("onClick", "mostrarKanban()");
}
//GeneraGrafico
function generarGraficos(){
	var div = document.getElementsByClassName("mostrarResultadosDiv")[0];
	div.style.background = "white";
	document.getElementById("taskChart").style.display = "block";
	if(!showGraf){// esto evita que se duplique
		graficTask();
		graficPhase();
	}
	
	
	
}