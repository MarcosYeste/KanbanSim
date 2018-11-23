//____________________________________________________________________

//________________________ VARIABLES  ________________________________

//____________________________________________________________________

var click = 0;
var click2 = 0;
var skillCompiler;
var allcheckBox;
var skillsList;
var chronoTime = 0;
var chronoTimeTypeSelection = "sec";
var userO = new Object();
var taskNameCounter = 0;
var atributo;

//_________________________________________________________________

//_______________________ EVENTOS  ________________________________

//_________________________________________________________________

//Llamamos a las funciones

if(document.getElementById("modPhase")){
	document.getElementById("modPhase").addEventListener("click", saveModPhase, false);
}
if(document.getElementById("modUsuario")){
	document.getElementById("modUsuario").addEventListener("click", saveModUsers, false);
}
if(document.getElementById("rmvUsuario")){
	document.getElementById("rmvUsuario").addEventListener("click", rmvModUsers, false);
}
if(document.getElementById("addUser")){
	document.getElementById("addUser").addEventListener("click", addUsers, false);
}
if(document.getElementById("modChrono")){
	document.getElementById("modChrono").addEventListener("click", chrono, false);	
}
if(document.getElementById("addUsuario")){
	document.getElementById("addUsuario").addEventListener("click", saveAddUser, false);
}
if(document.getElementById("addTask")){
	document.getElementById("addTask").addEventListener("click", function(){ addTareas("", leadTime); }, false);
}
document.getElementById("addPhase").addEventListener("click", function(){
	
	if(document.getElementById("addName").value != "" 	&& 
	   document.getElementById("addWip").value > 0 		&& 
	   document.getElementById("addMinTime").value > 0  && 
	   document.getElementById("addMaxTime").value > 0){
		
		document.getElementById("addFasesWarning").setAttribute("class","");
		document.getElementById("addFasesWarning").innerHTML= "";
			
		saveAddPhase();
		
		addPhases();
		
	}else{
		document.getElementById("addFasesWarning").setAttribute("class","alert alert-warning");
		document.getElementById("addFasesWarning").innerHTML = "Todos los campos deben ser rellenados";
		
	}
	
}, false);


//____________________________________________________________________

//_______________________ MOD PHASES  ________________________________

//____________________________________________________________________

function modPhases(){
	click = event.target.getAttribute("data-identification");

	// Mostramos los datos correspondientes a la fase
	document.getElementById("modName").value = listPhases.find(x => x.id === click).name;
	document.getElementById("modWip").value = parseInt(listPhases.find(x => x.id === click).maxTasks);
	document.getElementById("modMinTime").value = parseInt(listPhases.find(x => x.id === click).minTime);
	document.getElementById("modMaxTime").value = parseInt(listPhases.find(x => x.id === click).maxTime);
	document.getElementById("color-input2").value = listPhases.find(x => x.id === click).color;

}

/*----------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------CAMBIAR-------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/
function saveModPhase() {
	// Modificamos los datos de la fase
	refreshUsers();
	listPhases.find(x => x.id === click).name = document.getElementById("modName").value;
	listPhases.find(x => x.id === click).maxTasks = parseInt(document.getElementById("modWip").value);
	listPhases.find(x => x.id === click).minTime = parseInt(document.getElementById("modMinTime").value);
	listPhases.find(x => x.id === click).maxTime = parseInt(document.getElementById("modMaxTime").value);
	listPhases.find(x => x.id === click).color = document.getElementById("color-input2").value;

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
/*----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/

//___________________________________________________________________

//_______________________ MOD USERS  ________________________________

//___________________________________________________________________

function modUsers(){
	refreshUsers();
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
	printUserSession();
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

//Guardamos los datos de usuario
function saveModUsers() {
	refreshUsers();
	rawPhases = "";
	listUsers[click2].name = document.getElementById("modNameUser").value;
	listUsers[click2].skills = skillsList;


	for(var i = 0; i < listUsers[click2].phases.length; i++){
		rawPhases += listUsers[click2].phases[i].trim() + ",";
	}

	sessionStorage.setItem("users", JSON.stringify(listUsers));
	printUserSession();
	$.ajax({
		type: "POST",
		url: "/modUser",
		data: {

			oldName: oldName,
			newName: listUsers[click2].name,
			phases: rawPhases,
			skills: skillCompiler

		},success: function(data) {

			modLabel(myChart, oldName, listUsers[click2].name);

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
	refreshUsers();
	$.ajax({
		type: "POST",
		url: "/rmvUser",
		data: {

			name: listUsers[click2].name

		},success: function(data) {

			removeLabel(myChart,listUsers[click2].name);

			listUsers.splice(click2, 1);
			sessionStorage.setItem("users", JSON.stringify(listUsers));
			refreshUsers();
			printUserSession();
		}
	})
}

//___________________________________________________________________

//_______________________ ADD USERS  ________________________________

//___________________________________________________________________

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
			// Asignamos un valor random al abrir el slider de skills
			value: parseInt(Math.round(Math.random() * 90 + 10)),
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
		object.skills[index2] = parseInt($( "#add" + allcheckBox[index1].value.replace(" ", "") + " > span").html().substr(0, $( "#add" + allcheckBox[index1].value.replace(" ", "") + " > span").html().indexOf("%")));
	});

	skillsList.push(object.skills[sliders.length - 1]);
}

function saveAddUser(){
	refreshUsers();
	var fases = "";

	for( var i = 0; i < userO.phases.length; i++){
		fases += userO.phases[i] + ",";
	}
	userO.name = document.getElementById("addNameUser").value;
	userO.fases = fases;

	listUsers.push(userO); 	
	sessionStorage.setItem("users", JSON.stringify(listUsers));
	printUserSession();

	$.ajax({
		type: "POST",
		url: "/addUser",
		data: {

			name : userO.name,
			fases: fases

		},success: function(data) {



			document.getElementById("addNameUser").value = "";

//			document.getElementsByClassName("usersContainer")[0].innerHTML += "<div class='userName' name='"+ userO.name + 
//			"'data-toggle='modal' data-target='#myModal2'> " +
//			"<p> " +
//			"<strong>" + userO.name + "</strong> " +
//			"</p> " +
//			"<i class='fa fa-user-tie fa-2x' aria-hidden='true'></i>";



			// Añadimos al nuevo usuario
			addData(myChart, userO.name, userO.tasksWorked, "rgba(0,255,233,0.5)");
			myChart.update();

			userO = new Object();
		}
	})
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


//______________________________________________________________________

//_______________________ TEMPORIZADOR  ________________________________

//______________________________________________________________________

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
					document.getElementById("chronoViewer").innerHTML = "00:"+parseInt(chronoTime);
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


//_____________________________________________________________________

//_______________________ TAREAS INFO  ________________________________

//_____________________________________________________________________

function showTaskInfo(){
	atributo = event.target.getAttribute("data-identification");
	var object = listTareas.find(x => x.name === atributo);

	if(distributionType == "weight"){
		document.getElementById("modalTaskNameValue").innerHTML = "<b>" + object.name + "</b>  ( <var>" + object.weight +"</var> )";
	}else{
		document.getElementById("modalTaskNameValue").innerHTML = "<b>" + object.name + "</b>";
	}
	document.getElementById("modalTaskTimeWorkedValue").innerHTML = "<b>" + object.firstDuration + "</b>";	
	console.log("TII " + TII + " T " + T + " VII " +  VII + " Vt "+ Vt);
	if(!(isNaN(((0.5/(TII - T)) * Math.pow((T / TII), 2) * VII + Vt))) && (TII != 0 && T != 0 && VII != 0  && TII - T > 0)){
		console.log("if");
//		document.getElementById("modalTaskLTCTValue").innerHTML = "<b>" + eCT.toFixed(2) * 10 + ", " + ((eCT * 10) + ((0.5/(TII - T)) * Math.pow((T / TII), 2) * VII + Vt)).toFixed(2) + "</b>";		
	} else {
		console.log("else");
		document.getElementById("modalTaskLTCTValue").innerHTML = "<b> 0, A0 </b>";
	}
	document.getElementById("modalTaskWorkingValue").innerHTML = "<b>" + object.assignedUsers + "</b>";
	document.getElementById("modalTaskWorkedValue").innerHTML = "<b>" + object.staticAssigneds + "</b>";

}


//___________________________________________________________________

//_______________________ ADD TAREAS ________________________________

//___________________________________________________________________

/* Mejora, si un caso, que se guarde en el controller */
function addTareas(weight,creationTime){
	if(isNaN(creationTime)){creationTime = 0;}
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
	tarea.creationTime = creationTime;
	tarea.phasesTime = new Array();
	tarea.timeByStats = new Array();
	tarea.statsTime = new Array();
	tarea.firstDuration = new Array(); // Primer tiempo que se le asigna por fase
	tarea.weight = weight; 
	tarea.totalTime = 0;
	listTareas.push(tarea);
	printTasks(tarea);
}
function addPhases(){
	document.getElementById("addName").value = "";
	document.getElementById("addWip").value = 1;
	document.getElementById("addMinTime").value = 1;
	document.getElementById("addMaxTime").value = 1;
	document.getElementById("color-input").value = "#4ce600";
	
	document.getElementById("addFasesWarning").setAttribute("class","");
	document.getElementById("addFasesWarning").innerHTML= "";
}
function saveAddPhase(){
	refreshPhases();

	var phaseO = new Object();
	phaseO.id = getRandomId(); // Sujeto Pruebas
	phaseO.name = document.getElementById("addName").value;
	phaseO.maxTasks = parseInt(document.getElementById("addWip").value);
	phaseO.maxTime = parseInt(document.getElementById("addMinTime").value);
	phaseO.minTime = parseInt(document.getElementById("addMaxTime").value);
	phaseO.color = document.getElementById("color-input").value;
	phaseO.period = 0;
	listPhases.push(phaseO);
	
	savePhaseSession();
	printPhaseSession();
}

function getRandomId(){
	return Math.random().toString(36).substr(2, 9) + "-"  + Math.random().toString(36).substr(2, 5) + "-" + Math.random().toString(36).substr(2, 9);
}