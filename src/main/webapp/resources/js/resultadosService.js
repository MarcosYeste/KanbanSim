function nuevoObjetoResultados(){
	var resultadosO = new Object();
	resultadosO.taskCycle = [];
	resultadosO.taskLead  = [];
	resultadosO.taskEsfuerzo  = [];
	resultadosO.taskUsuarios  = [];
	resultadosO.taskMediaCL = [];
	resultadosO.taskBacklog = [];
	resultadosO.taskPhasesSeconds = [];

	resultadosO.phaseStatesSeconds = [];
	resultadosO.phaseSumaStates = [];
	resultadosO.phaseMediaFase = [];	
	resultadosO.phaseMediaTask = [];
	resultadosO.phaseMediaTotal = 0;
	resultadosO.phaseSecondsTotal = [];

	resultadosO.userTaskWorked  = [];
	resultadosO.userActiveTime = [];
	resultadosO.userInactiveTime = [];
	resultadosO.userBestWorker  = [];
	resultadosO.userLessWorker = [];
	resultadosO.userSecondsPhase  = [];
	resultadosO.userNamesWorstBest = [];
	return resultadosO;
}

function rellenarResultados(){
	resultadosO = nuevoObjetoResultados();
		var mediaCycle = 0;
		var mediaLead = 0;
		var cantidadTask = 0;
		var mediaPorFases = new Array();
		var resultMediaPorFases = new Array();
		var mediaPorTarea = new Array();
		var numerotareas = 0;
		var sumatodo = 0;
		var sumaDoing = 0;
		var sumadone = 0;
		var sumaEstadosTotal = 0;
		var nombresArray = [];
		listTareas.forEach(function(task) {	
			
			resultadosO.taskCycle.push(task.cycleTime);
			resultadosO.taskLead.push(task.leadTime);
			resultadosO.taskEsfuerzo.push(task.esfuerzo);
			resultadosO.taskUsuarios.push(task.staticAssigneds);
			resultadosO.taskBacklog.push(task.startTime);
			resultadosO.taskPhasesSeconds.push(task.phasesTime);
			resultadosO.phaseStatesSeconds.push(task.timeByStats);			
			mediaPorFases.push(task.timeByStats);
			mediaCycle += task.cycleTime;
			mediaLead += task.leadTime;
			if(task.cycleTime != 0){cantidadTask++;}
					
			mediaPorTarea.push(calcularMediaPorTarea(mediaPorTarea,task.timeByStats));
			task.timeByStats.forEach(function(times) {	
				var time = JSON.stringify(times);
				time = JSON.parse(time);
				sumatodo += time[0];sumaDoing += time[1];sumadone += time[2];
			});
			
			
			
		});	
		resultMediaPorFases = mediaFasestotal(mediaPorFases);
		numerotareas = resultMediaPorFases[resultMediaPorFases.length-1];
		sumaEstadosTotal = Math.round(((sumatodo + sumaDoing+ sumadone)/numerotareas) * 10 ) / 10;
		if(isNaN(sumaEstadosTotal)){sumaEstadosTotal = 0;}
		
		mediaCycle = Math.round((mediaCycle/cantidadTask)* 10 ) / 10;
		mediaLead =  Math.round((mediaLead/cantidadTask)* 10 ) / 10;
		if(isNaN(mediaCycle)){ mediaCycle = 0;}
		if(isNaN(mediaLead)){ mediaLead = 0;}
	
		
		
		resultadosO.taskMediaCL.push(mediaCycle,mediaLead);
		resultadosO.phaseSumaStates.push(resultMediaPorFases[resultMediaPorFases.length-2]);
		resultMediaPorFases.splice(resultMediaPorFases.length-2, 2);
		
		resultadosO.phaseMediaFase.push(resultMediaPorFases);
		resultadosO.phaseMediaTask.push(mediaPorTarea);
		resultadosO.phaseMediaTotal = sumaEstadosTotal;
	
		listPhases.forEach(function(phase) {
			resultadosO.phaseSecondsTotal.push(phase.period);

		});


	resultMediaPorFases = mediaFasestotal(mediaPorFases);
	numerotareas = resultMediaPorFases[resultMediaPorFases.length-1];
	sumaEstadosTotal = Math.round(((sumatodo + sumaDoing+ sumadone)/numerotareas) * 10 ) / 10;
	if(isNaN(sumaEstadosTotal)){sumaEstadosTotal = 0;}

	mediaCycle = Math.round((mediaCycle/cantidadTask)* 10 ) / 10;
	mediaLead =  Math.round((mediaLead/cantidadTask)* 10 ) / 10;
	if(isNaN(mediaCycle)){ mediaCycle = 0;}
	if(isNaN(mediaLead)){ mediaLead = 0;}



	resultadosO.taskMediaCL.push(mediaCycle,mediaLead);
	resultadosO.phaseSumaStates.push(resultMediaPorFases[resultMediaPorFases.length-2]);
	resultMediaPorFases.splice(resultMediaPorFases.length-2, 2);

	resultadosO.phaseMediaFase.push(resultMediaPorFases);
	resultadosO.phaseMediaTask.push(mediaPorTarea);
	resultadosO.phaseMediaTotal = sumaEstadosTotal;

	listPhases.forEach(function(phase) {
		resultadosO.phaseSecondsTotal.push(phase.period);
	});

	listUsers.forEach(function(user) {

		resultadosO.userTaskWorked.push(user.tasksWorked);
		resultadosO.userActiveTime.push(user.secondsWork);		
		user.secondsNotWorked = leadTime - user.secondsWork - user.creationTime;
		resultadosO.userInactiveTime.push(user.secondsNotWorked);

		for (var i = 0; i < user.secondByPhase.length; i++) {
			if(user.secondByPhase[i] == undefined || user.secondByPhase[i] == null){
				user.secondByPhase[i]= 0;
			}

		}
		resultadosO.userSecondsPhase.push(user.secondByPhase);
	});
	
	for (var i = 0; i < listUsers.length; i++) {
		for (var j = 0; j < listPhases.length; j++) {
			if(resultadosO.userSecondsPhase[i][j] == undefined){
				resultadosO.userSecondsPhase[i][j]= 0;
				}
			}
		}
	
	resultadosO.userBestWorker.push(buscarMasTrabajador('max'));
	resultadosO.userLessWorker.push(buscarMasTrabajador('min'));

	nombresArray = maxAndMinUsers(resultadosO.userBestWorker[0][0],resultadosO.userLessWorker[0][0]);
	resultadosO.userNamesWorstBest = nombresArray;

	if(listResultados.length == 0){
		listResultados.push(resultadosO);
	}else {
		listResultados.splice(0,1,resultadosO);
	}

}



function buscarMasTrabajador(opcion){
	var arrayValores = [];
	var nombresArray = [];
	var array = [];
	arrayValores = findMaxAndMin();
	if(opcion == 'max'){
		array.push(arrayValores[0],arrayValores[2]);
		return array;
	}else{
		array.push(arrayValores[1],arrayValores[3]);
		return array;
	}	
}


//_______________________________________________________________

//_______________________ TAREAS  _______________________________

//_______________________________________________________________
//print table Task
function tableTask(){

	if(listResultados[0].taskCycle[0] != undefined){
		document.getElementById("saveResult").removeAttribute("disabled");
		document.getElementById("saveResult").setAttribute("aria-disabled", "false");
	}else{
		document.getElementById("saveResult").setAttribute("disabled", "");
		document.getElementById("saveResult").setAttribute("aria-disabled", "true");
	}

	var subDiv = document.getElementById("tareaResultado");
	subDiv.innerHTML = "";
	var tablaTarea = "<table class='table table-bordered table-fixed'>";
	tablaTarea += "<thead>";
	tablaTarea += "<tr>";
	tablaTarea += "<th rowspan = '2'  style='color:blue' onclick='behindTable()'>Ver más datos</th>";
	tablaTarea += "<th>Cycle Time</th><th>Lead Time</th><th>Esfuerzo </th><th>Usuarios</th>";
	tablaTarea += "</tr>";
	tablaTarea += "</thead>";
	tablaTarea += "</tbody>";
	var i = 0;
	listTareas.forEach(function(task) {
		tablaTarea += "<tr>";
		tablaTarea += "<td>"+task.name+"</td><td>"+listResultados[0].taskCycle[i]+"s</td><td>"+listResultados[0].taskLead[i]+"s</td><td>"+listResultados[0].taskEsfuerzo[i]+"</td>";		
		tablaTarea += "<td>"+listResultados[0].taskUsuarios[i]+"</td>";
		tablaTarea += "</tr>";

		i++;
	});
	tablaTarea += "<tr>";						// este 0  sera la posicion de la partida guardada
	tablaTarea += "<td>Media: </td><td>"+listResultados[0].taskMediaCL[0]+"s</td><td>"+listResultados[0].taskMediaCL[1]+"s</td><td colspan = '2'></td>";
	tablaTarea += "</tr>";
	tablaTarea += "</tbody>";

	subDiv.innerHTML += tablaTarea;

}

//print back the table
function behindTable(){	
	var subDiv = document.getElementById("tareaResultado");
	subDiv.innerHTML = "";
	var tablaTarea = "<table class='table table-bordered table-fixed'>";
	tablaTarea += "<thead>";
	tablaTarea += "<tr>";

	tablaTarea += "<th rowspan = '2'  style='color:blue' onclick='tableTask()'>Ver más datos</th>";
	tablaTarea += "<th>Backlog</th>";
	listPhases.forEach(function(phase) {

		tablaTarea += "<th>"+phase.name+"</th>";

	});
	tablaTarea += "</tr>";
	tablaTarea += "</thead>";
	tablaTarea += "<tbody>";
	var z = 0;
	listTareas.forEach(function(task) {	
		tablaTarea += "<tr>";
		tablaTarea += "<td>"+task.name+"''</td>";
		tablaTarea += "<td>"+listResultados[0].taskBacklog[z]+"''</td>";
		for (var i = 0; i < listResultados[0].taskPhasesSeconds[0].length; i++) {
			if(listResultados[0].taskPhasesSeconds[z][i] == undefined){
				listResultados[0].taskPhasesSeconds[z][i] = 0;
			}
			if(listResultados[0].taskPhasesSeconds[z][i] == 0){
				tablaTarea += "<td> - </td>";
			}else{
				tablaTarea += "<td>"+listResultados[0].taskPhasesSeconds[z][i]+"s</td>";
			}

		}
		tablaTarea += "</tr>";
		z++;
	});
	tablaTarea += "</tbody>";
	tablaTarea += "</table>";
	subDiv.innerHTML += tablaTarea;
}

function graficPhase(){
	var mediaPorFases2 = new Array();
	var resultMediaPorFases2 = new Array();
	calculoTiemposTotalesFase();
//	addDataPhase(myChartPhase,listResultados[0].phaseMediaFase[0][listResultados[0].phaseMediaFase[0].length-2]);
	addDataPhase(myChartPhase,listResultados[0].phaseSumaStates[0]);
}

function updateGraficPhase(){
	var mediaPorFases2 = new Array();
	var resultMediaPorFases2 = new Array();
	calculoTiemposTotalesFase();



	if(listResultados[0] != undefined){
		updateDataPhase(myChartPhase,listResultados[0].phaseSumaStates[0]);
	}
}
//_______________________________________________________________

//_______________________ FASES ________________________________

//_______________________________________________________________



function tablePhase(){
	// Resultado fases
	var div = document.getElementsByClassName("mostrarResultadosDiv")[0];
	var div4 =  document.createElement("div");
	var subdiv4 = document.createElement("div");
	div4.className = "faseResultadoDiv";
	subdiv4.className = "faseResultado";
	var tabla = "<table class='table table-bordered table-fixed'>";
	tabla += "<thead>";
	tabla += "<tr>";
	tabla += "<th rowspan = '2'></th>";
	var cv = 0;	
	listPhases.forEach(function(phase) {

		tabla +="<th><div class='th'>"+phase.name+" ( "+listResultados[0].phaseSecondsTotal[cv]+"s )</div></th>";
		cv++;

	});
	tabla += "<th><div class='th'>Media De las Tareas</div></th>";
	tabla += "</tr>";
	tabla += "<tr>";
	for (var i = 0; i <= cv; i++) {
		tabla += "<th><div class='stados'><p>todo</p><p>doing</p><p>done</p></div></th>";
	}
	tabla += "</tr>";
	tabla += "</thead>";	
	tabla += "<tbody>";
	var mediaPorTarea = new Array();
	var mediaPorFases = new Array();
	var resultMediaPorFases = new Array();
	var l = 0;	
	var auxCV2 =0;




	listTareas.forEach(function(task) {	
		tabla += "<tr>";
		tabla += "<td>"+task.name+"</td>";
		var i = 0;
		var auxCV = cv;
		auxCV2 = cv-1;
		listResultados[0].phaseStatesSeconds[l].forEach(function(times) {	

			var time = JSON.stringify(times);
			time = JSON.parse(time);
			tabla += "<td><div class='stados'><p>"+time[0]+"s</p><p>"+time[1]+"s</p><p>"+time[2]+"s</p></div></td>";
			i++;
			auxCV--;
			auxCV2--;
		});	
		while(auxCV>0){
			tabla += "<td><div class='stados'><p>0s</p><p>0s</p><p>0s</p></div></td>";
			auxCV--;
		}
		// este 0  sera la posicion de la partida guardada
		tabla += "<td><div class='stados'><p>"+listResultados[0].phaseMediaTask[0][l][0]+"s</p><p>"+listResultados[0].phaseMediaTask[0][l][1]+"s</p><p>"+listResultados[0].phaseMediaTask[0][l][2]+"s</p></div></td>";

		tabla += "</tr>";
		l++;


	});
	tabla += "<tr>";
	tabla += "<td><i>Media por fase: </i></td>";

	for (var i = 0; i < cv; i++) {
		if(listResultados[0].phaseMediaFase[0][i] != undefined ){

			if(!isNaN(listResultados[0].phaseMediaFase[0][i][0]) && !isNaN(listResultados[0].phaseMediaFase[0][i][1]) && !isNaN(listResultados[0].phaseMediaFase[0][i][2])){

				tabla += "<td><div class='stados'><p>"+listResultados[0].phaseMediaFase[0][i][0]+"s</p><p>"+listResultados[0].phaseMediaFase[0][i][1]+"s</p><p>"+listResultados[0].phaseMediaFase[0][i][2]+"s</p></div></td>";
			}else{
				tabla += "<td><div class='stados'><p>0s</p><p>0s</p><p>0s</p></div></td>";
			}
		}
	}
	tabla += "<td><div class='stados'></div></td>";
	tabla += "</tr>";
	tabla += "<tr><td><i>Media Total: </i></td><td colspan='"+cv+"'>"+listResultados[0].phaseMediaTotal+"s</td><td><div class='stados'></div></td></tr>";
	tabla += "</tbody>";
	subdiv4.innerHTML += tabla;
	div4.appendChild(subdiv4);

	div.appendChild(div4);
}
//_______________________________________________________________

//_______________________ USUARIOS ________________________________

//_______________________________________________________________







function tableUser(){
	//Resultado Usuario

	var div = document.getElementById("ResultadoUsuario");
	div.innerHTML = "";
	var arrayValores = [];
	var nombresArray = [];
	var idU=0;

	var tabla = "<table class='table table-bordered table-fixed'>";
	tabla += "<thead>";
	tabla += "<tr>";
	tabla += "<th rowspan = '2' style='color:blue' onclick='behindUser()'>Ver más datos</th>";
	tabla += "<th>Tareas Trabajadas</th><th>Tiempo Activo</th><th>Tiempo Inactivo</th>";
	tabla += "</tr>";
	tabla += "</thead>";
	tabla += "<tbody>";
	tabla += "<tr>";
	var i = 0;
	listUsers.forEach(function(user) {
		tabla += "<td><div><p>"+user.name+"</p></div></td>";
		tabla += "<td>"+listResultados[0].userTaskWorked[i]+"</td><td>"+listResultados[0].userActiveTime[i]+"</td><td>"+listResultados[0].userInactiveTime[i]+"</td>";
		tabla += "</tr>";
		i++;
	});
	tabla += "<tr>";

	tabla += "<td>Más Trabajador</td><td>";
	if(listResultados[0].userNamesWorstBest[0] == undefined){ listResultados[0].userNamesWorstBest[0] = [" "]}
	for(var v = 0; v < listResultados[0].userNamesWorstBest[0].length; v++ ){
		if(listResultados[0].userNamesWorstBest[0][v] != undefined ){
			tabla += listResultados[0].userNamesWorstBest[0][v]+" ";
		}
	}
	tabla += "con "+listResultados[0].userBestWorker[0][0]+"s en "+listResultados[0].userBestWorker[0][1]+" Tareas</td>";
	tabla += "</tr>";
	tabla += "<tr>";
	tabla += "<td>Menos Trabajador</td><td>";
	var encontrado = false;
	if(listResultados[0].userNamesWorstBest[1] == undefined){ listResultados[0].userNamesWorstBest[1] = [" "]}
	for (var i = 0; i < listResultados[0].userNamesWorstBest[1].length && !encontrado; i++) {
		if(listResultados[0].userNamesWorstBest[1][i] != ""){
			encontrado = true;


		}
	}
	if(!encontrado){tabla += "No hay trabajadores perezosos</td>";}

	for(var v = 0; v < listResultados[0].userNamesWorstBest[1].length; v++ ){
		if(listResultados[0].userNamesWorstBest[1][v] != undefined ){
			tabla += listResultados[0].userNamesWorstBest[1][v]+" ";
		}
	}
	if(encontrado){tabla += "con "+listResultados[0].userLessWorker[0][0]+"s en "+listResultados[0].userLessWorker[0][1]+" Tareas</td>";}


	tabla += "</tr>";

	tabla += "</tbody>";
	tabla += "</table>";
	div.innerHTML += tabla;
}

function behindUser(){
	var div = document.getElementById("ResultadoUsuario");
	div.innerHTML =  "";
	var tabla = "<table class='table table-bordered'>";
	tabla += "<thead>";
	tabla += "<tr>";
	tabla += "<th rowspan = '2' style='color:blue' onclick='tableUser()'>Ver más datos</th>";
	listPhases.forEach(function(phase) {
		tabla += "<th>"+phase.name+"</th>";
	});
	tabla += "</tr>";
	tabla += "</thead>";
	tabla += "<tbody>";
	tabla += "<tr>";
	var k = 0;

	listUsers.forEach(function(user) {
		tabla += "<td><div><p>"+user.name+"</p></div></td>";		

		for (var i = 0; i < listResultados[0].userSecondsPhase[k].length; i++) {
			if(listResultados[0].userSecondsPhase[k][i] == undefined || listResultados[0].userSecondsPhase[k][i] == null){
				listResultados[0].userSecondsPhase[k][i]= 0;


			}
			tabla += "<td>"+listResultados[0].userSecondsPhase[k][i]+"s</td>";


		}

		tabla += "</tr>";
		k++;
	});
	tabla += "</tbody>";
	tabla += "</table>";
	//para guardar;
	div.innerHTML += tabla;


}
//_______________________________________________________________

//__________________ Calculos Tiempo por fase ___________________

//_______________________________________________________________

function calculoTiemposTotalesFase(){
	var i = 0;
	listPhases.forEach(function(phase) {
		var valor = subCalculoTiempos(i);
		phase.period = valor;
		if(isNaN(phase.period)){
			phase.period = 0;
		}
		i++;
	});
}
function subCalculoTiempos(i){
	var total = 0 ;
	for( var k = 0 ; k < listTareas.length ; k++){
		if(listTareas[k].phasesTime[i] == undefined){

			listTareas[k].phasesTime[i] = 0;

		}
		total += listTareas[k].phasesTime[i];
	}

	return total;

}
//_______________________________________________________________

//___________ Calculos Tiempo por Estados de la fase ____________

//_______________________________________________________________

function saveTimeStates(task,leadTime,i){


	if(task.state == "ToDo"){
		if(task.statsTime[0] == undefined && task.statsTime[1] == undefined && task.statsTime[2] == undefined){
			task.statsTime[0] = 0;task.statsTime[1] = 0;task.statsTime[2] =0;
		}
		if(task.phase != 0){			
			task.statsTime[2]= leadTime - task.statsTime[1] - task.statsTime[0]- task.startTime - sumaFasesTiempo(task.phasesTime) - task.creationTime;			
			task.timeByStats.push(task.statsTime);
			task.phasesTime[i] = saveNewTimePhase(task.statsTime);
			task.statsTime = [0,0,0];
		}

	}else if (task.state == "Doing"){

		if(task.phase > 1){			
			task.statsTime[0]= leadTime - task.startTime - sumaFasesTiempo(task.phasesTime) - task.creationTime;			
		}else{			
			task.statsTime[0]= leadTime - task.startTime - task.creationTime;
		}

	}else if(task.state == "Done"){
		if(task.phase > 1){
			task.statsTime[1]= leadTime - task.statsTime[0]- task.startTime - sumaFasesTiempo(task.phasesTime) - task.creationTime;
		}else{
			task.statsTime[1]= leadTime - task.statsTime[0]- task.startTime - task.creationTime;
		}

	}else{

		if(task.phase >= -1){
			task.statsTime[2]= leadTime - task.statsTime[1] - task.statsTime[0]- task.startTime - sumaFasesTiempo(task.phasesTime) - task.creationTime;
		}else{
			task.statsTime[2]= leadTime - task.statsTime[1] - task.statsTime[0]- task.startTime - task.creationTime;

		}
		task.timeByStats.push(task.statsTime);
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
	return suma;
}

//_______________________________________________________________

//___________Calculos de las MEDIAS de tareas y fases ____________

//_______________________________________________________________



//calcula media por tareas
function calcularMediaPorTarea(mediaPorTarea,timeByStats){
	var sumaTodo = 0;
	var  sumaDoing = 0;
	var sumadone = 0;
	var num = 0 ;

	for (var i = 0; i < timeByStats.length; i++) {
		if(timeByStats[i] == undefined ){
			if(timeByStats[i][0] == undefined){timeByStats[i][0]=0;}
			if(timeByStats[i][1] == undefined){timeByStats[i][1]=0;}
			if(timeByStats[i][2] == undefined){timeByStats[i][2]=0;}
		}
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
	var numTareas = 0;
	var z = 0;
	var array = taskArray;	
	var arrayFases  = new Array();
	var arraySumaEstados = new Array();
	if(array[0] != undefined ){

		while (z < array[0].length){
			var sumaTodos =0;
			var sumaDoing = 0;
			var sumaDone = 0;
			for (var i = 0; i < array.length; i++) {
				if(array[i][z] != undefined){

					if(array[i][z][0] == undefined){array[i][z][0] = 0;}
					if(array[i][z][1] == undefined){array[i][z][1] = 0;}
					if(array[i][z][2] == undefined){array[i][z][2] = 0;}
					sumaTodos += array[i][z][0];
					sumaDoing += array[i][z][1];
					sumaDone  += array[i][z][2];


					if(z == 0){numTareas++;} // +1 en tareas con valores
				}


			}
			arraySumaEstados.push([sumaTodos,sumaDoing,sumaDone]);
			sumaTodos = Math.round((sumaTodos / numTareas) * 10 ) / 10;
			sumaDoing = Math.round((sumaDoing / numTareas) * 10 ) / 10;
			sumaDone  =  Math.round((sumaDone / numTareas) * 10 ) / 10;
			arrayFases.push([sumaTodos,sumaDoing,sumaDone]);
			z++;
		}

	}
	arrayFases.push(arraySumaEstados);
	arrayFases.push(numTareas);
	return arrayFases;

}

//_______________________________________________________________

//______________________ MAXIMOS Y MINIMOS ______________________

//_______________________________________________________________


//esta funcion me devuelve un array con el Max y el Min
function findMaxAndMin(){
	var max = 0;
	var min = 500;
	var taskmax = 0 ;
	var taskmin = 0;
	var array = [];

	listUsers.forEach(function(user) {
		
		if (user.secondsWork > max) {
			max = user.secondsWork;
			taskmax = user.tasksWorked;
			
		}
		
		// MAYBE
		if(user.secondsWork < min){
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
	if(userMax != 0){   
		listUsers.forEach(function(user) {

			if(user.secondsWork == userMax){	
				array[i] = user.name;
				array2[i] = "";


			}else if(user.secondsWork == userMin){
				array2[i] = user.name;
				array[i] = "";
			}else{
				array[i] = "";
				array2[i] = "";
			}
			i++;
		});

		arraymulti.push(array);
		arraymulti.push(array2);
	}
	return arraymulti;
}
//_______________________________________________________________

//______________________ GENERAR RANDOM COLOR  __________________

//_______________________________________________________________

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

//_______________________________________________________________

//______________________ RESULTADOS  ____________________________

//_______________________________________________________________

$( "#result" ).click(function() {
	$( "#saveResult" ).toggle();
});

function saveResults(){
	var object = JSON.stringify(listResultados[0]);
	$.ajax({
		type: "POST",
		url: "/saveResults",
		data: {

			resultados: object

		},success: function(data) {

			console.log("Success")
		}
	})
}

