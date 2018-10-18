var checkbox = document.getElementsByClassName("userPhaseCheck");
for(var j = 0; j < checkbox.length; j++){

	checkbox[j].addEventListener("change", function(){compilePhases(event);}, false);
}

function compilePhases(event){

	if(event.target.checked){

		document.getElementById("phaseCompiler").value += event.target.value + ",";
	} else {
		document.getElementById("phaseCompiler").value = 
			document.getElementById("phaseCompiler").value.replace(event.target.value + ',', '');		
	}
}
