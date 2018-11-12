var click = 0;
var click2 = 0;
var skillCompiler;
var allcheckBox;
var skillsList;
var chronoTime = 0;
var chronoTimeTypeSelection = "sec";
var userO = new Object();
var taskNameCounter = 0;

//Llamamos a las funciones
document.getElementById("modPhase").addEventListener("click", saveModPhase, false);
document.getElementById("modUsuario").addEventListener("click", saveModUsers, false);
document.getElementById("rmvUsuario").addEventListener("click", rmvModUsers, false);
document.getElementById("addUser").addEventListener("click", addUsers, false);
document.getElementById("addUsuario").addEventListener("click", saveAddUser, false);
document.getElementById("modChrono").addEventListener("click", chrono, false);
document.getElementById("addTask").addEventListener("click", addTareas, false);
$(".tareas").click(showTaskInfo);


//Mod Phases
function modPhases(){
	click = event.target.getAttribute("data-identification");

	// Mostramos los datos correspondientes a la fase
	document.getElementById("modName").value = listPhases.find(x => x.id === click).name;
	document.getElementById("modWip").value = parseInt(listPhases.find(x => x.id === click).maxTasks);
	document.getElementById("modMinTime").value = parseInt(listPhases.find(x => x.id === click).minTime);
	document.getElementById("modMaxTime").value = parseInt(listPhases.find(x => x.id === click).maxTime);
	document.getElementById("color-input").value = listPhases.find(x => x.id === click).color;

}

function saveModPhase() {
	// Modificamos los datos de la fase

	listPhases.find(x => x.id === click).name = document.getElementById("modName").value;
	listPhases.find(x => x.id === click).maxTasks = parseInt(document.getElementById("modWip").value);
	listPhases.find(x => x.id === click).minTime = parseInt(document.getElementById("modMinTime").value);
	listPhases.find(x => x.id === click).maxTime = parseInt(document.getElementById("modMaxTime").value);
	listPhases.find(x => x.id === click).color = document.getElementById("color-input").value;

	// Control de errores, si el valor introducido en cualquiera de los campos es 0 o menor a este,
	// pon automaticamente un 1
	if(listPhases.find(x => x.id === click).maxTasks <= 0){
		listPhases.find(x => x.id === click).maxTasks = 1;
	}
	if(listPhases.find(x => x.id === click).minTime <= 0){
		listPhases.find(x => x.id === click).minTime = 1;
	}
	if(listPhases.find(x => x.id === click).maxTime <= 0){
		listPhases.find(x => x.id === click).maxTime = 1;
	}

	$.ajax({
		type: "POST",
		url: "/modPhase",
		data: {

			name: listPhases.find(x => x.id === click).name,
			wip : listPhases.find(x => x.id === click).maxTasks,
			min : listPhases.find(x => x.id === click).minTime,
			max : listPhases.find(x => x.id === click).maxTime,
			color: listPhases.find(x => x.id === click).color

		},success: function(data) {
			var tituloInd = $(".faseName").index($("#" + click));
			document.getElementsByClassName("titulo")[tituloInd].children[0].innerHTML = "(WIP: " + listPhases.find(x => x.id === click).maxTasks + ")";
			document.getElementsByClassName("subfase")[tituloInd].style.backgroundColor = listPhases.find(x => x.id === click).color;
			document.getElementsByClassName("faseName")[tituloInd].style.backgroundColor = listPhases.find(x => x.id === click).color;


		}
	});

}

//Mostrar Datos Users
function modUsers(){

	formUserValido(saveModUsers, "mod");
	skillsList = [];
	click2 = parseInt(event.target.getAttribute("data-identification"));
	var modFases = document.getElementById("modFasesUser");
	var inputsDivLength = document.getElementById("modSkillsUser").childNodes.length;
	for(var k = 0; k < inputsDivLength; k++){
		document.getElementById("modSkillsUser").removeChild(document.getElementById("modSkillsUser").childNodes[0]);
	}

	// Mostramos los datos correspondientes a la fase
	document.getElementById("modNameUser").value = listUsers[click2].name;
	var phasesName = $(".titulo");

	$("#modFasesUser").text("");
	for(var i = 0; i < phasesName.length; i++){	

		var phaseCheck = document.createElement("input");
		var type = document.createAttribute("type");  
		var attr = document.createAttribute("class");
		var val = document.createAttribute("value");
		var texto = phasesName[i].childNodes[0].textContent.trim();
		type.value = "checkbox";  
		attr.value = "modUserPhaseCheck"; 
		val.value = texto;
		phaseCheck.setAttributeNode(type);
		phaseCheck.setAttributeNode(attr);
		phaseCheck.setAttributeNode(val);
		$("#modFasesUser").append(phaseCheck);
		$("#modFasesUser").append(texto);
	}

	allcheckBox = $(".modUserPhaseCheck");

	for(var i = 0; i < listUsers[click2].phases.length; i++){
		for(var j = 0; j < allcheckBox.length; j++){
			if(allcheckBox[j].value == listUsers[click2].phases[i].trim()){
				allcheckBox[j].checked = true;	
				insertInput(j, i);
			} 
		}
	}

	for(var j = 0; j < allcheckBox.length; j++){
		allcheckBox[j].addEventListener("change", function(){phasesController(event);}, false);
	}

	document.getElementById("modNameUser").addEventListener("change", function(){
		formUserValido(saveModUsers, "mod") }, false);

	function phasesController(event){

		var index1;

		for(var ch = 0; ch < allcheckBox.length; ch++){

			if(allcheckBox[ch].value == event.target.value){

				index1 = ch;

			}
		}

		if(event.target.checked){
			listUsers[click2].phases.push(event.target.value);
			insertInput(index1, listUsers[click2].phases.indexOf(event.target.value));

		} else {

			for(var i = 0; i < listUsers[click2].phases.length; i++){

				if(event.target.value == listUsers[click2].phases[i].trim()){

					listUsers[click2].phases.splice(i, 1);

					if(listUsers[click2].phases.length == 0){

						listUsers[click2].phases = [];

					}
				}
			}

			var inputs = document.getElementsByClassName("modSkillInput");

			for(var i = 0 ; i < inputs.length; i++){

				if(inputs[i].getAttribute("id") == "skillLevel"+event.target.value){

					skillsList.splice(i, 1);

				}
			}	

			skillCompiler = "";

			for(var i = 0; i < skillsList.length; i++){

				skillCompiler +=  skillsList[i] + ",";

			}


			document.getElementById("modSkillsUser").removeChild(document.getElementById("modPerformancesDivSkill" + event.target.value));
			document.getElementById("modSkillsUser").removeChild(document.getElementById("mod" + event.target.value));
			formUserValido(saveModUsers, "mod");
		}
	}

	oldName = listUsers[click2].name;

}

function insertInput(index1, index2){

	var performancesSkillsDivMod = document.createElement("div");
	var performancesId = document.createAttribute("id");
	var performancesClass = document.createAttribute("class");
	performancesId.value = "modPerformancesDivSkill" + allcheckBox[index1].value.replace(" ", "");
	performancesClass.value = "sliderMod";

	performancesSkillsDivMod.setAttributeNode(performancesId);
	performancesSkillsDivMod.setAttributeNode(performancesClass);

	var nombreFase = document.createElement("P");
	var spanPorcentaje = document.createElement("SPAN");
	var t = document.createTextNode(allcheckBox[index1].value + " : ");
	var tId = document.createAttribute("id");

	tId.value =  "mod" + allcheckBox[index1].value.replace(" ", "");
	nombreFase.setAttributeNode(tId);
	nombreFase.appendChild(t);
	nombreFase.appendChild(spanPorcentaje);

	document.getElementById("modSkillsUser").appendChild(nombreFase);
	document.getElementById("modSkillsUser").appendChild(performancesSkillsDivMod);

	formUserValido(saveModUsers, "mod");

	var sliders = document.getElementsByClassName("sliderMod");

	$( function() {
		$( "#modPerformancesDivSkill" + allcheckBox[index1].value.replace(" ", "") ).slider({
			value: listUsers[click2].skills[index2],
			min: 10,
			max: 100,
			step: 10,
			slide: function( event, ui ) {

				$( "#mod" + allcheckBox[index1].value.replace(" ", "") + " > span").html( ui.value + "%" );

				for(var i = 0; i < sliders.length; i++){

					listUsers[click2].skills[index2] = ui.value;

					skillsList[i] = listUsers[click2].skills[i];

				}

				skillCompiler = "";

				for(var i = 0; i < skillsList.length; i++){

					skillCompiler +=  skillsList[i] + ",";

				}

			}
		});
		$( "#mod" + allcheckBox[index1].value.replace(" ", "") + " > span").html($("#modPerformancesDivSkill" + allcheckBox[index1].value.replace(" ", "")).slider( "value" ) + "%");
	});

	skillsList.push(listUsers[click2].skills[sliders.length - 1]);

}

//Guardamos los dato de usuario
function saveModUsers() {
	rawPhases = "";
	listUsers[click2].name = document.getElementById("modNameUser").value;
	listUsers[click2].skills = skillsList;

	for(var i = 0; i < listUsers[click2].phases.length; i++){
		rawPhases += listUsers[click2].phases[i].trim() + ",";
	}

	$.ajax({
		type: "POST",
		url: "/modUser",
		data: {

			oldName: oldName,
			newName: listUsers[click2].name,
			phases: rawPhases,
			skills: skillCompiler

		},success: function(data) {

			$( ".userName[data-identification='"+ click2 +"'] > p:first" )
			.html("<strong>" + listUsers[click2].name + "</strong>");

			$(".userName[data-identification='"+ click2 +"'] ").attr("name", listUsers[click2].name);

			listTareas.forEach(function(tareas){

				for(var i = 0; i < tareas.assignedUsers.length; i++){
					if(tareas.assignedUsers[i] == oldName){
						tareas.assignedUsers[i] = listUsers[click2].name;
					}
				}

			})
		}
	});
}

function rmvModUsers() {

	$.ajax({
		type: "POST",
		url: "/rmvUser",
		data: {

			name: listUsers[click2].name

		},success: function(data) {

			listUsers.splice(click2, 1);


			$( ".userName[data-identification='"+ click2 +"']").remove();
			var clases = $(".userName");
			for (var i = 0; i < clases.length; i++) {
				if(i >= click2){
					$( ".userName").attr("data-identification", i);
				}
			}
		}
	})
}

//Mostrar Datos Usuarios
function addUsers(){
	userO.name = "";
	userO.tasksWorked = 0;
	userO.secondByPhase = new Array();
	userO.secondsWork = 0;
	userO.secondsNotWorked = 0;
	userO.timeStopped = 0;
	rawPhases = "";
	userO.phases = [];
	rawSkills = "";
	userO.skills = rawSkills.replace('[', '').replace(']', '').split(',');
	userO.assigned = false;
	
	document.getElementById("addNameUser").value = "";
	
	// Comprueba que haya algo seleccionado
	formUserValido(saveAddUser, "add");

	skillsList = [];
	var inputsDivLength = document.getElementById("addSkillsUser").childNodes.length;
	for(var k = 0; k < inputsDivLength; k++){
		document.getElementById("addSkillsUser").removeChild(document.getElementById("addSkillsUser").childNodes[0]);
	}

	// Mostramos los datos correspondientes a la fase
	var phasesName = $(".titulo");

	$("#addFasesUser").text("");
	for(var i = 0; i < phasesName.length; i++){	

		var phaseCheck = document.createElement("input");
		var type = document.createAttribute("type");  
		var attr = document.createAttribute("class");
		var val = document.createAttribute("value");
		var texto = phasesName[i].childNodes[0].textContent.trim();
		type.value = "checkbox";  
		attr.value = "addUserPhaseCheck"; 
		val.value = texto;
		phaseCheck.setAttributeNode(type);
		phaseCheck.setAttributeNode(attr);
		phaseCheck.setAttributeNode(val);
		$("#addFasesUser").append(phaseCheck);
		$("#addFasesUser").append(texto);
	}

	allcheckBox = $(".addUserPhaseCheck");



	for(var i = 0; i < phasesName.length; i++){
		for(var j = 0; j < $(phasesName).length; j++){
			if(allcheckBox[j].value == $(phasesName).text().trim()){
				allcheckBox[j].value.replace(" ", "");
				allcheckBox[j].checked = true;	
				addInput(j, i, userO);
			} 
		}
	}

	for(var j = 0; j < allcheckBox.length; j++){
		allcheckBox[j].addEventListener("change", function(){phasesController(event);}, false);
	}
	document.getElementById("addNameUser").addEventListener("change", function(){
		formUserValido(saveAddUser, "add") }, false);

	function phasesController(event){

		var index1;

		for(var ch = 0; ch < allcheckBox.length; ch++){

			if(allcheckBox[ch].value == event.target.value){

				index1 = ch;

			}
		}


		if(event.target.checked){

			userO.phases.push(event.target.value);
			addInput(index1, userO.phases.indexOf(event.target.value), userO);

		} else {

			for(var i = 0; i < userO.phases.length; i++){

				if(event.target.value == userO.phases[i].trim()){

					userO.phases.splice(i, 1);

					if(userO.phases.length == 0){

						userO.phases = [];

					}
				}
			}


			var inputs = document.getElementsByClassName("sliderAdd");

			for(var i = 0 ; i < inputs.length; i++){
				if(inputs[i].getAttribute("id") == "addPerformancesDivSkill"+event.target.value){

					skillsList.splice(i, 1);
				}
			}	

			skillCompiler = "";

			for(var i = 0; i < skillsList.length; i++){

				skillCompiler +=  skillsList[i] + ",";

			}

			document.getElementById("addSkillsUser").removeChild(document.getElementById("addPerformancesDivSkill" + event.target.value));
			document.getElementById("addSkillsUser").removeChild(document.getElementById("add" + event.target.value));
			formUserValido(saveAddUser, "add");
		}
	}
}
function addInput(index1, index2, object){

	var performancesSkillsDivMod = document.createElement("div");
	var performancesId = document.createAttribute("id");
	var performancesClass = document.createAttribute("class");
	performancesId.value = "addPerformancesDivSkill" + allcheckBox[index1].value.replace(" ", "");
	performancesClass.value = "sliderAdd";

	performancesSkillsDivMod.setAttributeNode(performancesId);
	performancesSkillsDivMod.setAttributeNode(performancesClass);

	var nombreFase = document.createElement("P");
	var spanPorcentaje = document.createElement("SPAN");
	var t = document.createTextNode(allcheckBox[index1].value + " : ");
	var tId = document.createAttribute("id");

	tId.value =  "add" + allcheckBox[index1].value.replace(" ", "");
	nombreFase.setAttributeNode(tId);
	nombreFase.appendChild(t);
	nombreFase.appendChild(spanPorcentaje);

	document.getElementById("addSkillsUser").appendChild(nombreFase);
	document.getElementById("addSkillsUser").appendChild(performancesSkillsDivMod);
	formUserValido(saveAddUser, "add");
	var sliders = document.getElementsByClassName("sliderAdd");

	$( function() {
		$( "#addPerformancesDivSkill" + allcheckBox[index1].value.replace(" ", "")).slider({
			value: 10,
			min: 10,
			max: 100,
			step: 10,
			slide: function( event, ui ) {

				$( "#add" + allcheckBox[index1].value.replace(" ", "") + " > span").html( ui.value + "%" );

				for(var i = 0; i < sliders.length; i++){

					object.skills[index2] = ui.value;

					skillsList[i] = object.skills[i];
					if(skillsList[i] == null || skillsList[i] == ""){
						skillsList[i] = 10;
					}

				}

				skillCompiler = "";

				for(var is = 0; is < skillsList.length; is++){

					skillCompiler +=  skillsList[is] + ",";

				}

			}
		});
		$( "#add" + allcheckBox[index1].value.replace(" ", "") + " > span").html($("#addPerformancesDivSkill" + allcheckBox[index1].value.replace(" ", "")).slider( "value" ) + "%");
	});

	skillsList.push(object.skills[sliders.length - 1]);
}

function saveAddUser(){

	var fases = "";

	for( var i = 0; i < userO.phases.length; i++){
		fases += userO.phases[i] + ",";
	}

	userO.name = document.getElementById("addNameUser").value;

	$.ajax({
		type: "POST",
		url: "/addUser",
		data: {

			name : userO.name,
			fases: fases,
			skills: skillCompiler

		},success: function(data) {
			listUsers.push(userO);

			document.getElementById("addNameUser").value = "";

			document.getElementsByClassName("usersContainer")[0].innerHTML +=
				"<div class='userName' name='"+ userO.name + 
				"'data-toggle='modal' data-target='#myModal2'> " +
				"<p> " +
				"<strong>" + userO.name + "</strong> " +
				"</p> " +
				"<i class='fa fa-user-tie fa-2x' aria-hidden='true'></i>";

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
			userO = new Object();
		}
	})
}


if (chronoTimeTypeSelection == "sec") {
	document.getElementById("modChronoTime").value = chronoTime;
	document.getElementsByName("chronoTimeType")[0].setAttribute("checked", "");
} else {
	document.getElementById("modChronoTime").value = chronoTime / 60;
	document.getElementsByName("chronoTimeType")[1].setAttribute("checked", "");
}

function chrono(){

	var radios = $("[name=chronoTimeType]");

	for(var i = 0; i < radios.length; i++){
		if(radios[i].checked){
			if(radios[i].value == "sec"){
				chronoTime = document.getElementById("modChronoTime").value;
				var sec_num = parseInt(chronoTime, 10);
				if(chronoTime > 59){
					var minutes = Math.floor((sec_num) / 60);
					var seconds = sec_num - (minutes * 60);
					if (minutes < 10) {minutes = "0"+minutes;}
					if (seconds < 10) {seconds = "0"+seconds;}
					document.getElementById("chronoViewer").innerHTML = minutes+":"+seconds;
				} else {

					if (chronoTime < 10) {chronoTime = "0"+parseInt(chronoTime);}
					document.getElementById("chronoViewer").innerHTML = "00:"+chronoTime;
				}
			} else {
				chronoTime = (document.getElementById("modChronoTime").value * 60);
				if (parseInt(document.getElementById("modChronoTime").value, 10) < 10) {
					document.getElementById("chronoViewer").innerHTML = "0" + document.getElementById("modChronoTime").value + ":00";
				} else {
					document.getElementById("chronoViewer").innerHTML = document.getElementById("modChronoTime").value + ":00";
				}
			}
			chronoTimeTypeSelection = radios[i].value;
		}
	}
	if(chronoTime == "" || chronoTime == 0){
		chronoTime = 0;
		document.getElementById("chronoViewer").innerHTML = "00:00";
	}

}

function formUserValido(funcion,accion){

	// Comprovamos que el usuario introduzca algo en los campos
	if(document.getElementById(accion + "SkillsUser").children.length == 0 || document.getElementById(accion + "NameUser").value == ""){
		
		document.getElementById(accion + "Usuario").style.opacity = 0.3;
		document.getElementById(accion + "Usuario").removeEventListener("click", funcion, false);
		document.getElementById(accion + "Usuario").removeAttribute("data-dismiss");
	}else{
		document.getElementById(accion + "Usuario").style.opacity = 1;
		document.getElementById(accion + "Usuario").addEventListener("click", funcion, false);
		document.getElementById(accion + "Usuario").setAttribute("data-dismiss", "modal");
	}
}

function showTaskInfo(){
		
	for(var i = 0; i < listTareas.length; i++){
		if(event.target.getAttribute("data-identification") == listTareas[i].name){
			document.getElementById("modalTaskNameValue").innerHTML = event.target.getAttribute("data-identification");
		}
	}
}

// Mejora, si un caso, que se guarde en el controller
function addTareas(){
	// Incrementamos el numero
	taskNameCounter ++;
	// Creamos un objeto nuevo
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
	console.table(listTareas);
	printTasks(tarea);
}