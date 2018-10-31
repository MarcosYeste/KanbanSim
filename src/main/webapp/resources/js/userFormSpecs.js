var checkbox = document.getElementsByClassName("userPhaseCheck");
var skillsList = [];


for(var j = 0; j < checkbox.length; j++){
	checkbox[j].addEventListener("change", function(){compilePhases(event);}, false);
}
function compilePhases(event){
	if(event.target.checked){
		document.getElementById("phaseCompiler").value += event.target.value + ",";
//		document.getElementById("skillCompiler").value += event.target.value + ",";
		//8
		var phseSkillDiv = document.createElement("div");
		var ide = document.createAttribute("id");
		var divClass = document.createAttribute("class");
		ide.value = "divSkill" + event.target.value.trim();
		divClass.value = "divSkill";
		phseSkillDiv.setAttributeNode(ide);
		phseSkillDiv.setAttributeNode(divClass);
		document.getElementById("skillsDiv").appendChild(phseSkillDiv);
		
		var phseSkillLabel = document.createElement("form:label");
		var ide = document.createAttribute("id");
		var labelClass = document.createAttribute("class");
		ide.value = "skillLabel"+event.target.value;
		labelClass.value = "col-sm-3"
		phseSkillLabel.setAttributeNode(ide);
//		phseSkillLabel.setAttributeNode(labelClass);
		document.getElementById("divSkill"+event.target.value.trim()).appendChild(phseSkillLabel);
		document.getElementById("skillLabel"+event.target.value).innerHTML = event.target.value;

		var breakLine = document.createElement("br");
		document.getElementById("divSkill"+event.target.value.trim()).appendChild(breakLine);
		
		var phseSkillInput = document.createElement("input");
		var ide = document.createAttribute("id");
		var type = document.createAttribute("type");
		var step = document.createAttribute("step");
		var min = document.createAttribute("min");
		var max = document.createAttribute("max");
		var inputClass = document.createAttribute("class");
		ide.value = "skillLevel"+event.target.value;
		type.value = "number";
		step.value = "10";
		min.value = "10";
		max.value = "100";
		inputClass.value = "skillInput";
		phseSkillInput.setAttributeNode(ide);
		phseSkillInput.setAttributeNode(type);
		phseSkillInput.setAttributeNode(step);
		phseSkillInput.setAttributeNode(min);
		phseSkillInput.setAttributeNode(max);
		phseSkillInput.setAttributeNode(inputClass);
		document.getElementById("divSkill"+event.target.value).appendChild(phseSkillInput);
		
		var breakLine2 = document.createElement("br");
		

		var inputs = document.getElementsByClassName("skillInput");
		
		document.getElementById("divSkill"+event.target.value.trim()).appendChild(breakLine2);
		
		document.getElementById("skillLevel"+event.target.value).addEventListener('input', function (evt) {
			if(evt.target.value < 10){
			   document.getElementById("skillLevel"+event.target.value).value = 10;
		   } else if (evt.target.value > 100){
			   document.getElementById("skillLevel"+event.target.value).value = 100;
		   }
			
			for(var i = 0; i < inputs.length; i++){
				skillsList[i] = inputs[i].value;
			}
			document.getElementById("skillCompiler").value = "";
			for(var i = 0; i < skillsList.length; i++){
				document.getElementById("skillCompiler").value +=  skillsList[i] + ",";
			}
		});
		
		skillsList.push(inputs[inputs.length - 1].value);
		
		
	} else {
		var inputs = document.getElementsByClassName("skillInput");
		document.getElementById("phaseCompiler").value = 
			document.getElementById("phaseCompiler").value.replace(event.target.value + ',', '');	
		
		for(var i = 0 ; i < inputs.length; i++){
			if(inputs[i].getAttribute("id") == "skillLevel"+event.target.value){
				skillsList.splice(i, 1);
			}
		}	
		document.getElementById("skillCompiler").value = "";
		for(var i = 0; i < skillsList.length; i++){
			document.getElementById("skillCompiler").value +=  skillsList[i] + ",";
		}
		document.getElementById("skillsDiv").removeChild(document.getElementById("divSkill" + event.target.value));

	}
}
