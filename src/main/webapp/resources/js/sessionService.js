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
	var sessionPhase = JSON.parse(sessionStorage.getItem("phases"));
	var fasesD = document.getElementById("faseDiv");
	for (var i = 0; i < lista.length; i++) {
		var divFases = '<div class="faseName" style="background-color:'+lista[i].color+'" id ="'+lista[i].id+'"">';
		divFases += '<div class="titulo" data-toggle="modal" data-target="#myModal" name= "'+lista[i].name+'">'+lista[i].name+'<small> (WIP: '+lista[i].maxTasks+')</small></div>';
		divFases += '<div class="subfase" style="background-color:'+lista[i].color+'"><div id="doing" class="doing"><p class="subSubfase">Doing</p></div>'+
		'<div id="done" class="done"><p class="subSubfase">Done</p></div></div>';
		fasesD.innerHTML += divFases;

	}
}

function refreshPhases(){
	if(sessionStorage.getItem("phases")){
		var sessionPhase = JSON.parse(sessionStorage.getItem("phases"));
		listPhases = sessionPhase;
	}
}
function savePhaseSession(){
	sessionStorage.setItem("phases", JSON.stringify(listPhases));
}