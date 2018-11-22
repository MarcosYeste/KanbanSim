//____________________________________________________________________

//_____________________ SESSION USER  ________________________________

//____________________________________________________________________
function printUserSession(){

	var sessionUsuarios = JSON.parse(sessionStorage.getItem("users"));

	var divU = document.getElementById("usersContainer");
	divU.innerHTML = "";
	if(sessionUsuarios != null){
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
	if(sessionPhase != null){
		var fasesD = document.getElementById("faseDiv");
		fasesD.innerHTML = "";
		for (var i = 0; i < sessionPhase.length; i++) {

			var divFases = '<div class="faseName" style="background-color:'+sessionPhase[i].color+'" id ="'+sessionPhase[i].id+'"">';
			divFases += '<div class="titulo" data-toggle="modal" data-target="#myModal" name= "'+sessionPhase[i].name+'">'+sessionPhase[i].name+'<small> (WIP: '+sessionPhase[i].maxTasks+')</small></div>';
			divFases += '<div class="subfase" style="background-color:'+sessionPhase[i].color+'"><div id="doing" class="doing"><p class="subSubfase">Doing</p></div>'+
			'<div id="done" class="done"><p class="subSubfase">Done</p></div></div>';
			fasesD.innerHTML += divFases;

		}

		//Añadimos un attributo auto incremental que nos servira para identificar la posición de los elementos
		for(var i = 0 ; i < document.getElementsByClassName("titulo").length; i++){
			document.getElementsByClassName("titulo")[i].setAttribute("data-identification", listPhases[i].id);
			document.getElementsByClassName("titulo")[i].children[0].setAttribute("data-identification", listPhases[i].id);

			// Abrimos el formulario			
			document.getElementsByClassName("titulo")[i].addEventListener("click", modPhases , false);

			document.getElementsByClassName("titulo")[i].children[0].addEventListener("click", function(){
				event.preventDefault();
			});
		}

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