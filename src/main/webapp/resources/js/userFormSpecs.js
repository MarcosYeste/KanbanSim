var checkbox = document.getElementsByClassName("userPhaseCheck");
for(var j = 0; j < checkbox.length; j++){
	console.log("checks");
	checkbox[j].addEventListener("change", function(){compilePhases(event);}, false);
}
console.log("df");
function compilePhases(event){
	console.log("df");
	if(event.target.checked){
		console.log(event.target.value);
		document.getElementById("phaseCompiler").value += event.target.value + ",";
	} else {
		document.getElementById("phaseCompiler").value = 
			document.getElementById("phaseCompiler").value.replace(event.target.value + ',', '');		
	}
}
