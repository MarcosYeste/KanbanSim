var showGraf = false;
//Muestra el contenido de la tarea al terminar
function mostrarFinalTarea(tarea,task){
	console.log(task.name+"----"+task.leadTime+" - "+task.creationTime);
	task.leadTime = task.leadTime - task.creationTime;
console.log("lead"+task.leadTime);
	task.cycleTime = task.leadTime - task.startTime;
console.log("cycle"+task.cycleTime);
console.log(":::::::::::::::::::::::");
	tarea.innerHTML = '<p data-identification="'+ task.name +'">'+task.name+'</p><p data-identification="'+ task.name + '">CycleTime: '+task.cycleTime+'</p><p data-identification="'+ task.name + '">LeadTime: '+task.leadTime+'</p>';
	rellenarResultados();
	return tarea;
}
function mostrarResultados() {
	calculoTiemposTotalesFase();

	var div = document.getElementsByClassName("mostrarResultadosDiv")[0];

	div.style.background = "#63bafa";
	div.innerHTML = "";	
	rellenarResultados();

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


//Click a mostrar resultados
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
//Click a mostrar kanban
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
	if(distribution.backLogType != "constant"){
		document.getElementById("addTask").removeAttribute("disabled");
		document.getElementById("addTask").removeAttribute("aria-disabled");
	}
}
//click mostrar Graficos
function mostrarGraficas (){
	rellenarResultados();
	document.getElementsByClassName("mostrarGraficosDiv")[0].style.background = "white";
	document.getElementsByClassName("mostrarGraficosDiv")[0].style.display = "block";
	document.getElementsByClassName("mostrarResultadosDiv")[0].style.display = "none";
	document.getElementsByClassName("contenedor")[0].style.visibility = "hidden";
	document.getElementsByClassName("teamField")[0].style.display = "none";
	playPause.children[0].removeAttribute("disabled");
	playPause.children[0].removeAttribute("aria-disabled");
	document.getElementById("addTask").setAttribute("disabled", "");
	document.getElementById("addTask").setAttribute("aria-disabled", "true");
	generarGraficos();
	document.getElementById("graficos").setAttribute("onClick", "mostrarKanban()");

}
//GeneraGrafico
function generarGraficos(){
	var div = document.getElementsByClassName("mostrarResultadosDiv")[0];
	div.style.background = "white";
	document.getElementById("taskChart").style.display = "block";
	refreshPhases();
	graficPhase();


	console.log(document.getElementsByClassName("columnas").length);
	// Sirve para ocultar los elementos de la leyenda en el grafico de tareas
	for (var j = 0; j < document.getElementsByClassName("columnas").length; j++) {
		
		
		document.getElementsByClassName("columnas")[j].addEventListener("click", function(e){
			//console.log(this);
			var index = $(this).index();
			// console.log($(this));
			$(this).toggleClass("strike")
			var ci = e.view.myChartTask;
//			console.log(ci.data.datasets[index]._meta[1]);
			// console.log(index)
			for (var i = 0; i < 1; i++) {
				var curr = ci.data.datasets[index]._meta[1];

				curr.hidden = !curr.hidden
			}

			// We hid a dataset ... rerender the chart
			ci.update();
		})
	}
}