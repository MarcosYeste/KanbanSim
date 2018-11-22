//____________________________________________________________________

//_____________________ SESSION USER  ________________________________

//____________________________________________________________________
function printUserSession(){

	var sessionUsuarios = JSON.parse(sessionStorage.getItem("users")); console.table(sessionUsuarios);

	var divU = document.getElementById("usersContainer");
	divU.innerHTML = "";
	if(sessionUsuarios > 0){
		for (var i = 0; i < sessionUsuarios.length; i++) {
			var usuarioDiv = '<div class="userName" name="'+sessionUsuarios[i].name+'" data-toggle="modal" data-target="#myModal2" data-identification="'+i+'">';
			usuarioDiv += '<p data-identification="'+i+'"><strong data-identification="'+i+'">'+sessionUsuarios[i].name+'</strong></p>';
			usuarioDiv += '<i class="fa fa-user-tie fa-2x" aria-hidden="true" data-identification="'+i+'"></i></div>';
			divU.innerHTML+= usuarioDiv;
		}

		for(var i = 0 ; i < document.getElementsByClassName("userName").length; i++){

			// Abrimos el formulario			
			document.getElementsByClassName("userName")[i].addEventListener("click", modUsers , false);
			document.getElementsByClassName("userName")[i].children[0].addEventListener("click", function(){
				event.preventDefault();
			});
			document.getElementsByClassName("userName")[i].children[0].children[0].addEventListener("click", function(){
				event.preventDefault();
			});
			document.getElementsByClassName("userName")[i].children[1].addEventListener("click", function(){
				event.preventDefault();
			});

		}
	}
}
function refreshUsers(){
	if(sessionStorage.getItem("users")){
		var sessionUsuarios = JSON.parse(sessionStorage.getItem("users"));
		listUsers = sessionUsuarios;
	}
}
//____________________________________________________________________

//_____________________ SESSION PHASE  _______________________________

//____________________________________________________________________

function printPhaseSession(){	
	console.log("pintar");
	var sessionPhase = JSON.parse(sessionStorage.getItem("phases")); console.table(sessionPhase);
	var fasesD = document.getElementById("faseDiv");
	for (var i = 0; i < sessionPhase.length; i++) {
		console.log(sessionPhase.length);
		var divFases = '<div class="faseName" style="background-color:'+sessionPhase[i].color+'" id ="'+sessionPhase[i].id+'"">';
		divFases += '<div class="titulo" data-toggle="modal" data-target="#myModal" name= "'+sessionPhase[i].name+'">'+sessionPhase[i].name+'<small> (WIP: '+sessionPhase[i].maxTasks+')</small></div>';
		divFases += '<div class="subfase" style="background-color:'+sessionPhase[i].color+'"><div id="doing" class="doing"><p class="subSubfase">Doing</p></div>'+
		'<div id="done" class="done"><p class="subSubfase">Done</p></div></div>';
		fasesD.innerHTML += divFases;
		console.log(divFases);

	}
}

function refreshPhases(){	
	console.log("refrescar");
	if(sessionStorage.getItem("phases")){
		var sessionPhase = JSON.parse(sessionStorage.getItem("phases"));
		listPhases = sessionPhase;
	}
}
function savePhaseSession(){
	console.log("guardado");
	sessionStorage.setItem("phases", JSON.stringify(listPhases));
}