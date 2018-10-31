var click = 0;
var click2 = 0;

// Llamamos a las funciones
document.getElementById("ModPhase").addEventListener("click", saveModPhase, false);
document.getElementById("ModUsuario").addEventListener("click", saveModUsers, false);
document.getElementById("RmvUsuario").addEventListener("click", rmvModUsers, false);

//Mod Phases
function modPhases(){
	click = event.target.getAttribute("data-identification");
	console.log(click);

	// Mostramos los datos correspondientes a la fase
	document.getElementById("modName").value = listPhases[click].name;
	document.getElementById("modWip").value = parseInt(listPhases[click].maxTasks);
	document.getElementById("modMinTime").value = parseInt(listPhases[click].minTime);
	document.getElementById("modMaxTime").value = parseInt(listPhases[click].maxTime);
	document.getElementById("color-input").value = listPhases[click].color;

}

function saveModPhase() {
	// Modificamos los datos de la fase

	listPhases[click].name = document.getElementById("modName").value;
	listPhases[click].maxTasks = parseInt(document.getElementById("modWip").value);
	listPhases[click].minTime = parseInt(document.getElementById("modMinTime").value);
	listPhases[click].maxTime = parseInt(document.getElementById("modMaxTime").value);
	listPhases[click].color = document.getElementById("color-input").value;

	// Control de errores, si el valor introducido en cualquiera de los campos es 0 o menor a este,
	// pon automaticamente un 1
	if(listPhases[click].maxTasks <= 0){
		listPhases[click].maxTasks = 1;
	}
	if(listPhases[click].minTime <= 0){
		listPhases[click].minTime = 1;
	}
	if(listPhases[click].maxTime <= 0){
		listPhases[click].maxTime = 1;
	}

	$.ajax({
		type: "POST",
		url: "/modPhase",
		data: {

			name: listPhases[click].name,
			wip : listPhases[click].maxTasks,
			min : listPhases[click].minTime,
			max : listPhases[click].maxTime,
			color: listPhases[click].color

		},success: function(data) {
			
			document.getElementsByClassName("titulo")[click].children[0].innerHTML = "(WIP: " + listPhases[click].maxTasks + ")";
			document.getElementsByClassName("subfase")[click].style.backgroundColor = listPhases[click].color;
			document.getElementsByClassName("faseName")[click].style.backgroundColor = listPhases[click].color;
			

		}
	});

}

//Mostrar Datos Users
function modUsers(){

	click2 = parseInt(event.target.getAttribute("data-identification"));
	
	var modFases = document.getElementById("modFasesUser");

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
		console.log(texto);

		type.value = "checkbox";  
		attr.value = "userPhaseCheck"; 
		val.value = texto;
		phaseCheck.setAttributeNode(type);
		phaseCheck.setAttributeNode(attr);
		phaseCheck.setAttributeNode(val);
		$("#modFasesUser").append(phaseCheck);
		$("#modFasesUser").append(texto);
	}

	var allcheckBox = $(".userPhaseCheck");
	for(var i = 0; i < listUsers[click2].phases.length; i++){
		for(var j = 0; j < allcheckBox.length; j++){
			if(allcheckBox[j].value == listUsers[click2].phases[i].trim()){
				allcheckBox[j].checked = true;
			} 
		}
	}

	for(var j = 0; j < checkbox.length; j++){
		checkbox[j].addEventListener("change", function(){phasesController(event);}, false);
	}

	function phasesController(event){
		if(event.target.checked){
			listUsers[click2].phases.push(event.target.value);
		} else {
			for(var i = 0; i < listUsers[click2].phases.length; i++){
				if(event.target.value == listUsers[click2].phases[i].trim()){
					listUsers[click2].phases.splice(i, 1);

					if(listUsers[click2].phases.length == 0){
						listUsers[click2].phases = [];
					}
				}
			}
		}
	}
	oldName = listUsers[click2].name;

}

//Guardamos los dato de usuario
function saveModUsers() {
	rawPhases = "";
	listUsers[click2].name = document.getElementById("modNameUser").value;

	for(var i = 0; i < listUsers[click2].phases.length; i++){
		rawPhases += listUsers[click2].phases[i].trim() + ",";
	}

	$.ajax({
		type: "POST",
		url: "/modUser",
		data: {

			oldName: oldName,
			newName: listUsers[click2].name,
			phases: rawPhases

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

			delete listUsers[click2];

			$( ".userName[data-identification='"+ click2 +"']" ).remove();

		}
	})
}