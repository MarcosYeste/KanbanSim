

function saveTimeStates(task,leadTime,i){


	if(task.state == "ToDo"){
		if(task.statsTime[0] == undefined && task.statsTime[1] == undefined && task.statsTime[2] == undefined){
			task.statsTime[0] = 0;task.statsTime[1] = 0;task.statsTime[2] =0;
		}
		if(task.phase != 0){			
			task.statsTime[2]= leadTime - task.statsTime[1] - task.statsTime[0]- task.startTime-sumaFasesTiempo(task.phasesTime);			
			task.timeByStats.push(task.statsTime);
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
	var div3 = document.createElement("div");
	var div4 =  document.createElement("div");
	var subdiv4 = document.createElement("div");
	var div5 = document.createElement("div");
	var subdiv5 = document.createElement("div");
	var subsubdiv5 = document.createElement("div");
	div3.className = "tareaResultadoDiv";

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
	sumaEstadosTotal = Math.round((sumatodo + sumaDoing+ sumadone)/numerotareas);
	tabla += "<tr>";
	tabla += "<td>Media por fase: </td>";
	
	for (var i = 0; i < cv; i++) {
		if(resultMediaPorFases[i] != undefined){
		tabla += "<td><div class='stados'><p>"+resultMediaPorFases[i][0]+"s</p><p>"+resultMediaPorFases[i][1]+"s</p><p>"+resultMediaPorFases[i][2]+"s</p></div></td>";
		}
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
	var subDiv = document.createElement("div");
	var bigdiv = document.createElement("div");
	subDiv.className = "tareaResultado";
	subDiv.id = "tareaResultado";
	div3.appendChild(subDiv);
	bigdiv.appendChild(div3);
	div.appendChild(bigdiv);
	table(); // pinta la tabla de tareas
	div.appendChild(div4);
	div.appendChild(div5);
}
// print table Task
function table(){
	var subDiv = document.getElementById("tareaResultado");
	subDiv.innerHTML = "";
	
	var tablaTarea = "<table class='table table-bordered'>";
	tablaTarea += "<thead>";
	tablaTarea += "<tr>";

	tablaTarea += "<th rowspan = '2'  style='color:blue' onclick='behindTable()'>Ver más datos</th>";
	tablaTarea += "<th>Cycle Time</th><th>Lead Time</th><th>Esfuerzo </th><th>Usuarios</th>";
	tablaTarea += "</tr>";
	tablaTarea += "</thead>";
	tablaTarea += "</tbody>";
	
	listTareas.forEach(function(task) {		
		
		tablaTarea += "<tr>";
		tablaTarea += "<td>"+task.name+"</td><td>"+task.cycleTime+"</td><td>"+task.leadTime+"</td><td>"+task.esfuerzo+"</td>";		
		tablaTarea += "<td>"+task.staticAssigneds+"</td>";
		tablaTarea += "</tr>";
		});

	tablaTarea += "</tbody>";
	subDiv.innerHTML += tablaTarea;

	
}
// print back the table
function behindTable(){	
	var subDiv = document.getElementById("tareaResultado");
	subDiv.innerHTML = "";
	var tablaTarea = "<table class='table table-bordered'>";
	tablaTarea += "<thead>";
	tablaTarea += "<tr>";

	tablaTarea += "<th rowspan = '2'  style='color:blue' onclick='table()'>Ver más datos</th>";
	tablaTarea += "<th>Backlog</th>";
	listPhases.forEach(function(phase) {
		
	tablaTarea += "<th>"+phase.name+"</th>";
	
	});
	tablaTarea += "</tr>";
	tablaTarea += "</thead>";
	tablaTarea += "<tbody>";
	var i = 0;
	
	listTareas.forEach(function(task) {		
		
	});
	listTareas.forEach(function(task) {	
		tablaTarea += "<tr>";
		tablaTarea += "<td>"+task.name+"''</td>";
		tablaTarea += "<td>"+task.startTime+"''</td>";
		for (var i = 0; i < task.phasesTime.length; i++) {
			if(task.phasesTime[i] == undefined){
				task.phasesTime[i] = 0;
			}
			tablaTarea += "<td>"+task.phasesTime[i]+"''</td>";
		}
		tablaTarea += "</tr>";
	});
	tablaTarea += "</tbody>";
	subDiv.innerHTML += tablaTarea;
}
//calcula media por tareas
function calcularMediaPorTarea(mediaPorTarea,timeByStats){
	var sumaTodo = 0;
	var  sumaDoing = 0;
	var sumadone = 0;
	var num = 0 ;
//	timeByStats = timeByStats;

	for (var i = 0; i < timeByStats.length; i++) {
		if(timeByStats[i][0] == undefined ){
			timeByStats[i][0] = 0;
			timeByStats[i][1] = 0;
			timeByStats[i][2] = 0;
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
	console.table(taskArray[0]);
	console.table(taskArray[1]);
	console.table(taskArray[2]);
	var z = 0;
	var array = taskArray;	
	var arrayFases  = new Array();
	var numero =0;
	if(array[0] != undefined ){

	while (z < array[0].length){
		var sumaTodos =0;
		var sumaDoing = 0;
		var sumaDone = 0;
		console.log("Tabla");
		console.table(array);
		for (var i = 0; i < array.length; i++) {
			if(array[i][z][0] != undefined){
console.log(sumaTodos+" + "+array[1][z][0]);
console.log(sumaDoing+" + "+array[1][z][1]);
console.log(sumaDone+" + "+array[1][z][2]);
			sumaTodos += array[i][z][0];
			sumaDoing += array[i][z][1];
			sumaDone  += array[i][z][2];								
			}
		}
		console.log("TAMAÑO ARRAY array[0][0].length "+ array[0][0].length);
		sumaTodos = Math.round((sumaTodos / array[0].length) * 10 ) / 10;
		sumaDoing = Math.round((sumaDoing / array[0].length) * 10 ) / 10;
		sumaDone  =  Math.round((sumaDone / array[0].length) * 10 ) / 10;
		arrayFases.push([sumaTodos,sumaDoing,sumaDone]);
		console.log("AAAAAAAASA");
		console.table(arrayFases);
		z++;
	}

  }
 return arrayFases;

}
function calculoTiemposTotalesFase(){
	var i = 0;
	listPhases.forEach(function(phase) {

//		if(phase.period == undefined){			
//			phase.period = 0;
//		}

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
			total += 0;
		}else{
			total += listTareas[k].phasesTime[i];
		}
		
	}

	return total;

}

function mostrarDorsoUsuarios(id,secondByPhase){
	var U = document.getElementById(id);
	var i = 0;
	U.innerHTML = "";

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

function mostrarDorsoTarea(id,phasesTime,esfuerzo){
	var T = document.getElementById(id);
	var i = 0;
	T.innerHTML = "";
//	phasesTime = phasesTime;
	listPhases.forEach(function(phase) {	
		if(phasesTime[i] == undefined){
			phasesTime[i] = 0;
		}
		T.innerHTML += "<p>Time on "+phase.name+": "+phasesTime[i]+"''</p>";
		i++;
	});
	T.innerHTML += "<p>Esfuerzo "+esfuerzo+"''</p>";

	T.innerHTML += "<small style='color:blue'>Ver más</small>";
	T.setAttribute("onClick","mostrarResultados()");
}
//esta funcion me devuelve un array con el Max y el Min
function findMaxAndMin(){
	var max = 0;
	var min = 500;
//	var userMax = "";
//	var userMin = "";
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
	document.getElementById("result").setAttribute("onClick", "generarResultados()");
}