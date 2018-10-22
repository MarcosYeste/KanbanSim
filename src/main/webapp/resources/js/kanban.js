var totalFases = 0;
var mediaMaxFaseTime = 0;
var mediaMinFaseTime = 0;
var firstLoop = true;
var myInterval;
var cycleTime = 0;
var leadTime = 0;
var c;
var prevPhase;
var pos;

//Mod Phases
for(c in listPhases){
	// Abrimos el formulario			
	document.getElementsByClassName("titulo")[c].addEventListener("click", function(){

		// Mostramos los datos correspondientes a la fase
		document.getElementById("modName").value = listPhases[c].name;
		document.getElementById("modWip").value = listPhases[c].maxTasks;
		document.getElementById("modMinTime").value = listPhases[c].minTime;
		document.getElementById("modMaxTime").value = listPhases[c].maxTime;

		prevPhase = listPhases[c].name;

	});
	console.log(c);

	// Modificamos los datos de la fase
	document.getElementById("ModPhase").addEventListener("click", function(){
		listPhases[c].name = document.getElementById("modName").value;
		listPhases[c].maxTasks = document.getElementById("modWip").value;
		listPhases[c].minTime = document.getElementById("modMinTime").value;
		listPhases[c].maxTime = document.getElementById("modMaxTime").value;

		document.getElementsByClassName("titulo")[c].innerHTML = listPhases[c].name;

	})
}

//Play Button
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


		// Permitimos de nuevo abrir el modal de modificación
		for (var i = 0; i < document.getElementsByClassName("titulo").length; i++){

			document.getElementsByClassName("titulo")[i].setAttribute("data-target", "#myModal");
			document.getElementsByClassName("titulo")[i].setAttribute("data-toggle", "modal");

		}
	}
});

//Botón reset			
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
					totalFases += cycleTime;
					listPhases[i].period += cycleTime;

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
//								console.log("desa");
//								console.log(listUsers[w]);
//								console.log(task);
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
												console.log(task.assignedUsers[0]);
//												console.log(user);
//												console.log(task);
											}
										}//4
									}
								});


//								console.log("%cPassed " + task.name + " TO " + task.phase, "font-size: 20px; color:green");
//								fases[i + 1].lastElementChild.firstElementChild.appendChild(divsTareas[k]);
//								task.state = "Doing";
//								task.phase++;
//								task.tss = 0;
//								task.cycleTime = cycleTime;
//								task.leadTime = leadTime;
							}
						}

					} else if (task.state == null && task.name == elementName && task.phase == 0) {

						console.log("IF 4 " + task.name);

						if (((fases[0].lastElementChild.firstElementChild.childNodes.length - 3) +
								(fases[0].lastElementChild.lastElementChild.childNodes.length - 3))
								< listPhases[0].maxTasks) {

							cycleTime = parseInt(task.duration);
							totalFases += cycleTime;
							listPhases[i].period += cycleTime;
							task.cycleTime += cycleTime;	

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
			// Volvemos a habilitar los resultados
			document.getElementById("result").removeAttribute("disabled");
			document.getElementById("result").removeAttribute("aria-disabled");

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
			div3.className = "tareaResultadoDiv";
			h3.innerHTML = "<strong>Tabla de Resultados</strong>";
			div2.appendChild(h3);
			div.appendChild(div2);
			
//			listPhases.forEach(function(phase) {
				div4.className = "faseResultadoDiv";
				subdiv4.className = "faseResultado";
				subdiv4.innerHTML = "<h4> Resultados Fases</h4>";
				subdiv4.innerHTML += "<p> Tiempo total de las fases: "+totalFases+" s</p>";
				var z = 0;
				listPhases.forEach(function(phase) {
					mediaMaxFaseTime += phase.maxTime;
					mediaMinFaseTime += phase.minTime;
					subdiv4.innerHTML += "<p> "+phase.name+" : "+phase.period+" s</p>";
					z += 1;
				});
//				mediaMaxFaseTime = Math.floor(mediaMaxFaseTime/z);
//				mediaMinFaseTime = Math.floor(mediaMinFaseTime/z);
				subdiv4.innerHTML += "<p>Calculo maximo estimado de las fases es de: "+mediaMaxFaseTime+" s</p>";
				subdiv4.innerHTML += "<p>Calculo minimo estimado de las fases es de: "+mediaMinFaseTime+" s</p>";
				mediaMaxFaseTime = 0;
				mediaMinFaseTime = 0 ;
				div4.appendChild(subdiv4);
//			}
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
//				div.appendChild(br);
				var p2 = document.createElement("P");
				text = document.createTextNode(" Leadime: " + task.leadTime);
				p2.appendChild(text);
				subDiv.appendChild(p2);
//				div.appendChild(br);				
				div3.appendChild(subDiv);
			});
			
			div.appendChild(div3);
			div.appendChild(div4);
		}

function generarResultados(){
	var buttonResult = document.getElementById("result");
	document.getElementsByClassName("contenedor")[0].style.visibility = "hidden";
	mostrarResultados();
	buttonResult.value = "Mostrar Kanban";
	buttonResult.setAttribute("onClick", "mostrarKanban()");
}
function mostrarKanban(){
	document.getElementsByClassName("contenedor")[0].style.visibility = "visible";
	document.getElementsByClassName("mostrarResultadosDiv")[0].innerHTML = "";
	document.getElementById("result").setAttribute("onClick", "generarResultados()");;
}
