var click = 0;
var click2 = 0;
var skillCompiler;
var allcheckBox;
var skillsList;

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
	skillsList = [];
	click2 = parseInt(event.target.getAttribute("data-identification"));
	var modFases = document.getElementById("modFasesUser");//8
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
//		console.log(texto);
		type.value = "checkbox";  
		attr.value = "userPhaseCheck"; 
		val.value = texto;
		phaseCheck.setAttributeNode(type);
		phaseCheck.setAttributeNode(attr);
		phaseCheck.setAttributeNode(val);
		$("#modFasesUser").append(phaseCheck);
		$("#modFasesUser").append(texto);//8
	}

	allcheckBox = $(".userPhaseCheck");
	console.log("chechboix " + allcheckBox.attr("value"));
	for(var i = 0; i < listUsers[click2].phases.length; i++){
		for(var j = 0; j < allcheckBox.length; j++){
			if(allcheckBox[j].value == listUsers[click2].phases[i].trim()){
				allcheckBox[j].checked = true;	
				insertInput(j, i);
			} 
		}
	}

	for(var j = 0; j < checkbox.length; j++){
		checkbox[j].addEventListener("change", function(){phasesController(event);}, false);
	}

	function phasesController(event){
		var index1;
		for(var ch = 0; ch < allcheckBox.length; ch++){
			if(allcheckBox[ch].value== event.target.value){
				index1 = ch;
			}
		}
		if(event.target.checked){
			listUsers[click2].phases.push(event.target.value);
			insertInput(index1, -1);
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
			document.getElementById("modSkillsUser").removeChild(document.getElementById("divSkill" + event.target.value));
		}//8
	}
	oldName = listUsers[click2].name;

}

function insertInput(index1, index2){
	
	var phseSkillDiv = document.createElement("div");
	var ide = document.createAttribute("id");
	ide.value = "divSkill" + allcheckBox[index1].value;
	phseSkillDiv.setAttributeNode(ide);
	document.getElementById("modSkillsUser").appendChild(phseSkillDiv);
	
	var phseSkillLabel = document.createElement("form:label");
	var ide = document.createAttribute("id");
	var labelClass = document.createAttribute("class");
	ide.value = "skillLabel"+ allcheckBox[index1].value;
	labelClass.value = "col-sm-3"
	phseSkillLabel.setAttributeNode(ide);
//	phseSkillLabel.setAttributeNode(labelClass);
	document.getElementById("divSkill"+allcheckBox[index1].value).appendChild(phseSkillLabel);
	document.getElementById("skillLabel"+allcheckBox[index1].value).innerHTML = allcheckBox[index1].value;

	var breakLine = document.createElement("br");
	document.getElementById("divSkill"+allcheckBox[index1].value).appendChild(breakLine);
	
	var phseSkillInput = document.createElement("input");
	var ide = document.createAttribute("id");
	var type = document.createAttribute("type");
	var step = document.createAttribute("step");
	var min = document.createAttribute("min");
	var max = document.createAttribute("max");
	var inputClass = document.createAttribute("class");
	ide.value = "skillLevel"+allcheckBox[index1].value;
	type.value = "number";
	step.value = "10";
	min.value = "10";
	max.value = "100";
	inputClass.value = "modSkillInput";
	phseSkillInput.setAttributeNode(ide);
	phseSkillInput.setAttributeNode(type);
	phseSkillInput.setAttributeNode(step);
	phseSkillInput.setAttributeNode(min);
	phseSkillInput.setAttributeNode(max);
	phseSkillInput.setAttributeNode(inputClass);
	document.getElementById("divSkill"+allcheckBox[index1].value).appendChild(phseSkillInput);
	
	var breakLine2 = document.createElement("br");//8
	document.getElementById("divSkill"+allcheckBox[index1].value).appendChild(breakLine2);
	if(index2 != -1){
		document.getElementById("skillLevel"+allcheckBox[index1].value).value = listUsers[click2].skills[index2].trim();//8
	}
	
	var inputs = document.getElementsByClassName("modSkillInput");
	
	document.getElementById("divSkill"+allcheckBox[index1].value).appendChild(breakLine2);
	
	document.getElementById("skillLevel"+allcheckBox[index1].value).addEventListener('input', function (evt) {
		if(evt.target.value < 10){
		   document.getElementById("skillLevel"+allcheckBox[index1].value).value = 10;
	   } else if (evt.target.value > 100){
		   document.getElementById("skillLevel"+allcheckBox[index1].value).value = 100;
	   }
		
		for(var i = 0; i < inputs.length; i++){
			skillsList[i] = inputs[i].value;
		}
		skillCompiler = "";
		for(var i = 0; i < skillsList.length; i++){
			skillCompiler +=  skillsList[i] + ",";
		}
		console.log(skillCompiler);
	});
	
	skillsList.push(inputs[inputs.length - 1].value);
	
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

			delete listUsers[click2];

			$( ".userName[data-identification='"+ click2 +"']").remove();

		}
	})
}