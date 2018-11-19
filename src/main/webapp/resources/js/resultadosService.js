//_______________________________________________________________

//_______________________ TAREAS  _______________________________

//_______________________________________________________________
//print table Task
function tableTask(){
	var medioCycle = 0;
	var medioLead = 0;
	var cantidadTask = 0;
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

	listTareas.forEach(function(task) {		
		medioCycle += task.cycleTime;
		medioLead += task.leadTime;
		tablaTarea += "<tr>";
		tablaTarea += "<td>"+task.name+"</td><td>"+task.cycleTime+"s</td><td>"+task.leadTime+"s</td><td>"+task.esfuerzo+"</td>";		
		tablaTarea += "<td>"+task.staticAssigneds+"</td>";
		tablaTarea += "</tr>";
		cantidadTask++;
	});
	medioCycle = Math.round((medioCycle/cantidadTask)* 10 ) / 10;
	medioLead =  Math.round((medioLead/cantidadTask)* 10 ) / 10;
	if(isNaN(medioCycle)){ medioCycle = 0;}
	if(isNaN(medioLead)){ medioLead = 0;}
	tablaTarea += "<tr>";
	tablaTarea += "<td>Media: </td><td>"+medioCycle+"s</td><td>"+medioLead+"s</td><td colspan = '2'></td>";
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

	listTareas.forEach(function(task) {	
		tablaTarea += "<tr>";
		tablaTarea += "<td>"+task.name+"''</td>";
		tablaTarea += "<td>"+task.startTime+"''</td>";
		for (var i = 0; i < task.phasesTime.length; i++) {
			if(task.phasesTime[i] == undefined){
				task.phasesTime[i] = 0;
			}
			tablaTarea += "<td>"+task.phasesTime[i]+"s</td>";
		}
		tablaTarea += "</tr>";
	});
	tablaTarea += "</tbody>";
	tablaTarea += "</table>";
	subDiv.innerHTML += tablaTarea;
}
function graficTask(){
	document.getElementById("taskChart").style.visibility  = "visible";
	listTareas.forEach(function(task) {	
		var color = getRandomColor();
		addDataTask(myChartTask, task.cycleTime, task.leadTime, task.esfuerzo, color,task.name);
	});
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
	tabla += "</thead>";	
	tabla += "<tbody>";
	var numerotareas =0;
	var sumatodo= 0;
	var sumaDoing = 0;
	var sumadone=0;
	var sumaEstadosTotal = 0;
	var mediaPorTarea = new Array();
	var mediaPorFases = new Array();
	var resultMediaPorFases = new Array();
	var l = 0;	
	var auxCV2 =0;
	listTareas.forEach(function(task) {	
		tabla += "<tr>";
		tabla += "<td>"+task.name+"</td>";
		var i = 0;
		mediaPorFases.push(task.timeByStats);//guardo 3 multi array

		var auxCV = cv;
		auxCV2 = cv-1;

		task.timeByStats.forEach(function(times) {	

			var time = JSON.stringify(times);
			time = JSON.parse(time);
			tabla += "<td><div class='stados'><p>"+time[0]+"s</p><p>"+time[1]+"s</p><p>"+time[2]+"s</p></div></td>";

			sumatodo += time[0];sumaDoing += time[1];sumadone += time[2];
			i++;
			auxCV--;
			auxCV2--;
		});	
		while(auxCV>0){
			tabla += "<td><div class='stados'><p>0s</p><p>0s</p><p>0s</p></div></td>";
			auxCV--;
		}

		mediaPorTarea.push(calcularMediaPorTarea(mediaPorTarea,task.timeByStats));

		tabla += "<td><div class='stados'><p>"+mediaPorTarea[l][0]+"s</p><p>"+mediaPorTarea[l][1]+"s</p><p>"+mediaPorTarea[l][2]+"s</p></div></td>";

		tabla += "</tr>";
		l++;
		
	});
	resultMediaPorFases = mediaFasestotal(mediaPorFases);	
	
	numerotareas = resultMediaPorFases[resultMediaPorFases.length-1];
	sumaEstadosTotal = Math.round(((sumatodo + sumaDoing+ sumadone)/numerotareas) * 10 ) / 10;
	if(isNaN(sumaEstadosTotal)){sumaEstadosTotal = 0;}
	tabla += "<tr>";
	tabla += "<td><i>Media por fase: </i></td>";

	for (var i = 0; i < cv; i++) {
		if(resultMediaPorFases[i] != undefined ){
			if(!isNaN(resultMediaPorFases[i][0]) && !isNaN(resultMediaPorFases[i][0]) && !isNaN(resultMediaPorFases[i][0])){
				tabla += "<td><div class='stados'><p>"+resultMediaPorFases[i][0]+"s</p><p>"+resultMediaPorFases[i][1]+"s</p><p>"+resultMediaPorFases[i][2]+"s</p></div></td>";
			}else{
				tabla += "<td><div class='stados'><p>0s</p><p>0s</p><p>0s</p></div></td>";
			}
		}
	}
	while(auxCV2>0){
		tabla += "<td><div class='stados'><p>0s</p><p>0s</p><p>0s</p></div></td>";
		auxCV2--;
	}
	tabla += "</tr>";
	tabla += "<tr><td><i>Media Total: </i></td><td colspan='"+cv+"'>"+sumaEstadosTotal+"s</td><td><div class='stados'></div></td></tr>";
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
	listUsers.forEach(function(user) {
		user.secondsNotWorked = leadTime - user.secondsWork;
		tabla += "<td><div><p>"+user.name+"</p></div></td>";
		tabla += "<td>"+user.tasksWorked+"</td><td>"+user.secondsWork+"</td><td>"+user.secondsNotWorked+"</td>";
		tabla += "</tr>";
	});
	arrayValores = findMaxAndMin();
	tabla += "<tr>";
	nombresArray = maxAndMinUsers(arrayValores[0],arrayValores[1]);
	tabla += "<td>Más Trabajador</td><td>";


	for(var v = 0; v < nombresArray[0].length; v++ ){

		tabla += nombresArray[0][v]+" ";
	}

	tabla += "con "+arrayValores[0]+"s en "+arrayValores[2]+" Tareas</td>";
	tabla += "</tr>";
	tabla += "<tr>";
	tabla += "<td>Menos Trabajador</td><td>";
	if(nombresArray[1].length == 0){

		tabla += "No hay trabajadores perezosos</td>";				
	}else{
		for(var v = 0; v < nombresArray[1].length; v++ ){
			tabla += nombresArray[1][v]+" ";
		}
		tabla += "con "+arrayValores[1]+"s en "+arrayValores[3]+" Tareas</td>";
	}
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
	listUsers.forEach(function(user) {
		tabla += "<td><div><p>"+user.name+"</p></div></td>";
		for (var i = 0; i < user.secondByPhase.length; i++) {
			if(user.secondByPhase[i] == undefined || user.secondByPhase[i] == null){
				user.secondByPhase[i]= 0;
			}
			tabla += "<td>"+user.secondByPhase[i]+"s</td>";


		}	

		tabla += "</tr>";
	});
	tabla += "</tbody>";
	tabla += "</table>";
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

		if(task.phase > 1){
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
			sumaTodos = Math.round((sumaTodos / numTareas) * 10 ) / 10;
			sumaDoing = Math.round((sumaDoing / numTareas) * 10 ) / 10;
			sumaDone  =  Math.round((sumaDone / numTareas) * 10 ) / 10;
			arrayFases.push([sumaTodos,sumaDoing,sumaDone]);
			z++;
		}

	}
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
//_______________________________________________________________

//______________________ GENERAR RANDOM COLOR  ______________________

//_______________________________________________________________

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}