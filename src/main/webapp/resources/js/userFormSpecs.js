var checkbox = document.getElementsByClassName("userSpecCheck");
for(var j = 0; j < checkbox.length; j++){
	console.log("checks");
	checkbox[j].addEventListener("change", function(){compileSpecs(event);}, false);
}
console.log("df");
function compileSpecs(event){
	console.log("df");
	if(event.target.checked){
		console.log(event.target.value);
		document.getElementById("specCompiler").value += event.target.value + ",";
	} else {
		document.getElementById("specCompiler").value = 
			document.getElementById("specCompiler").value.replace(event.target.value + ',', '');		
	}
}
