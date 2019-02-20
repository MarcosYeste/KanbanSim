//____________________________________________________________________

//_____________________ SESSION USER  ________________________________

//____________________________________________________________________
function printUserSession(){

	var sessionUsuarios = JSON.parse(sessionStorage.getItem("users"));
	if(document.getElementById("usersContainer")){
		var divU = document.getElementById("usersContainer");
		divU.innerHTML = "";

		if(sessionUsuarios != null){
			for (var i = 0; i < sessionUsuarios.length; i++) {
				var usuarioDiv = '<div class="userName" name="'+sessionUsuarios[i].name+'" data-toggle="modal" data-target="#myModal2" data-backdrop="static" data-identification="'+i+'" title="'+sessionUsuarios[i].name+'">';
				usuarioDiv += '<p data-identification="'+i+'"><strong data-identification="'+i+'">'+sessionUsuarios[i].name+'</strong></p>';
				usuarioDiv += '<i class="fa fa-user-tie fa-2x" aria-hidden="true" data-identification="'+i+'"></i></div>';
				divU.innerHTML+= usuarioDiv;
			}
			
			for(var i = 0 ; i < document.getElementsByClassName("userName").length; i++){

				// Abrimos el formulario			
				document.getElementsByClassName("userName")[i].addEventListener("click", initializeModUsers , false);
				document.getElementsByClassName("userName")[i].children[0].addEventListener("click", function(){
					event.preventDefault();
				});
				document.getElementsByClassName("userName")[i].children[0].children[0].addEventListener("click", function(event){
					event.preventDefault();
				});
				document.getElementsByClassName("userName")[i].children[1].addEventListener("click", function(event){
					event.preventDefault();
				});
			}
		}
	}
}

function printLastUser(){
	var sessionUsuarios = JSON.parse(sessionStorage.getItem("users"));
	var divU = document.getElementById("usersContainer");

	if(sessionUsuarios != null){

		for (var i = 0; i < sessionUsuarios.length; i++) {
			if(i ==  sessionUsuarios.length - 1){
				var usuarioDiv = '<div class="userName" name="'+sessionUsuarios[i].name+'" data-toggle="modal" data-target="#myModal2" data-identification="'+i+'">';
				usuarioDiv += '<p data-identification="'+i+'"><strong data-identification="'+i+'">'+sessionUsuarios[i].name+'</strong></p>';
				usuarioDiv += '<i class="fa fa-user-tie fa-2x" aria-hidden="true" data-identification="'+i+'"></i></div>';
				divU.innerHTML+= usuarioDiv;
			}

		}


		for(var i = 0 ; i < document.getElementsByClassName("userName").length; i++){

			// Abrimos el formulario			
			document.getElementsByClassName("userName")[i].addEventListener("click", initializeModUsers , false);
			document.getElementsByClassName("userName")[i].children[0].addEventListener("click", function(event){
				event.preventDefault();
			});
			document.getElementsByClassName("userName")[i].children[0].children[0].addEventListener("click", function(event){
				event.preventDefault();
			});
			document.getElementsByClassName("userName")[i].children[1].addEventListener("click", function(event){
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

function modUserSession(id){
	$( ".userName[data-identification='"+ id +"'] > p:first" )
	.html("<strong data-identification='"+ id +"'>" + listUsers[click2].name + "</strong>");

	$(".userName[data-identification='"+ id +"'] ").attr("name", listUsers[click2].name);
}

function saveUsersSession(){
	sessionStorage.setItem("users", JSON.stringify(listUsers));
}

function emptyUserData(){
	var sessionUsuarios = JSON.parse(sessionStorage.getItem("users"));
	if(sessionUsuarios != null){
		for (var i = 0; i < sessionUsuarios.length; i++) {
			sessionUsuarios[i].assigned = false;
			sessionUsuarios[i].tasksWorked = 0;
			sessionUsuarios[i].secondByPhase = new Array();
			sessionUsuarios[i].secondsWork = 0;
			sessionUsuarios[i].secondsNotWorked = 0;
			sessionUsuarios[i].timeStopped = 0;
			sessionUsuarios[i].creationTime = 0;
		}

		sessionStorage.setItem("users", JSON.stringify(sessionUsuarios));
	}
}

//____________________________________________________________________

//_____________________ SESSION PHASE  _______________________________

//____________________________________________________________________


function printPhaseSession(){
	var sessionPhase = JSON.parse(sessionStorage.getItem("phases"));
	if(sessionPhase != null){
		if(document.getElementById("faseDiv")){
			var fasesD = document.getElementById("faseDiv");
			fasesD.innerHTML = "";
			for (var i = 0; i < sessionPhase.length; i++) {

				var divFases = '<div class="faseName" style="background-color:'+sessionPhase[i].color+'" id ="'+sessionPhase[i].id+'"">';
				divFases += '<div class="titulo" data-toggle="modal" data-target="#myModal" name= "'+sessionPhase[i].name+'">'+sessionPhase[i].name+'<small> (WIP: '+sessionPhase[i].maxTasks+')</small></div>';
				divFases += '<div class="subfase" style="background-color:'+sessionPhase[i].color+'"><div id="doing" class="doing"><p class="subSubfase">Doing</p></div>'+
				'<div id="done" class="done"><p class="subSubfase">Done</p></div></div>';
				fasesD.innerHTML += divFases;

			}
		}
		
		//Añadimos un attributo auto incremental que nos servira para identificar la posición de los elementos
		for(var i = 0 ; i < document.getElementsByClassName("titulo").length; i++){
			document.getElementsByClassName("titulo")[i].setAttribute("data-identification", listPhases[i].id);
			document.getElementsByClassName("titulo")[i].children[0].setAttribute("data-identification", listPhases[i].id);

			// Abrimos el formulario			
			document.getElementsByClassName("titulo")[i].addEventListener("click", initializeModPhases , false);

			document.getElementsByClassName("titulo")[i].children[0].addEventListener("click", function(event){
				event.preventDefault();
			});
		}

	}
}

function printLastPhase(){
	var sessionPhase = JSON.parse(sessionStorage.getItem("phases"));

	if(sessionPhase != null){
		if(document.getElementById("faseDiv")){

			var fasesD = document.getElementById("faseDiv");

			for (var i = 0; i < sessionPhase.length; i++) {
				if(i == sessionPhase.length - 1){
					var divFases = '<div class="faseName" style="background-color:'+sessionPhase[i].color+'" id ="'+sessionPhase[i].id+'"">';
					divFases += '<div class="titulo" data-toggle="modal" data-target="#myModal" name= "'+sessionPhase[i].name+'">'+sessionPhase[i].name+'<small> (WIP: '+sessionPhase[i].maxTasks+')</small></div>';
					divFases += '<div class="subfase" style="background-color:'+sessionPhase[i].color+'"><div id="doing" class="doing"><p class="subSubfase">Doing</p></div>'+
					'<div id="done" class="done"><p class="subSubfase">Done</p></div></div>';
					fasesD.innerHTML += divFases;
				}
			}
		}


		//Añadimos un attributo auto incremental que nos servira para identificar la posición de los elementos
		for(var i = 0 ; i < document.getElementsByClassName("titulo").length; i++){
			document.getElementsByClassName("titulo")[i].setAttribute("data-identification", listPhases[i].id);
			document.getElementsByClassName("titulo")[i].children[0].setAttribute("data-identification", listPhases[i].id);

			// Abrimos el formulario			
			document.getElementsByClassName("titulo")[i].addEventListener("click", initializeModPhases , false);

			document.getElementsByClassName("titulo")[i].children[0].addEventListener("click", function(event){
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

function modPhaseSession(id){
	// Cambiamos el El html del WIP
	$( ".faseName[id='"+ id +"'] > div > small" )
	.html(" (WIP:" + listPhases.find(x => x.id === click).maxTasks + ")");

	// Modificamos también el color
	$(".faseName[id='"+ id +"']").css("background-color", listPhases.find(x => x.id === click).color);
	$(".faseName[id='"+ id +"'] > .subfase").css("background-color", listPhases.find(x => x.id === click).color);

	// Y por último el color del usuario, junto con su opacidad, para que se modifique y quede como el color de la faseb 
	for (var i = 0; i < listPhases.find(x => x.id === click).assignedUsers.length; i++) {
		$(".userName[name='" + listPhases.find(x => x.id === click).assignedUsers[i] + "']").css("border-color", listPhases.find(x => x.id === click).color); 
		$(".userName[name='" + listPhases.find(x => x.id === click).assignedUsers[i] + "']").children("I").css(
				{
					'color' : listPhases.find(x => x.id === click).color,
					'opacity': '0.3',
				}); 

	}
}

function emptyPhaseData(){
	var sessionPhases = JSON.parse(sessionStorage.getItem("phases"));
	if(sessionPhases != null){
		for (var i = 0; i < sessionPhases.length; i++) {
			sessionPhases[i].assignedUsers = [];
		}

		sessionStorage.setItem("phases", JSON.stringify(sessionPhases));
	}
}


//____________________________________________________________________

//_____________________ SESSION DISTRIBUTION  ________________________

//____________________________________________________________________

function refreshDistributionSession(){

	if(sessionStorage.getItem("distribution")){
		var sessionDist = JSON.parse(sessionStorage.getItem("distribution"));
		distribution = sessionDist;
	}
}
function saveDistributionSession(){
	sessionStorage.setItem("distribution", JSON.stringify(distribution));
}



//____________________________________________________________________

//_____________________ SESSION Speed Calculation  ___________________

//____________________________________________________________________
function refreshSpeedTimeSession(){

	if(sessionStorage.getItem("speed")){
		var sessionSpeed = JSON.parse(sessionStorage.getItem("speed"));
		speedTime = parseInt(sessionSpeed.speedTime);
		numOfTaskEstimation = parseInt(sessionSpeed.numOfTaskEstimation);
	}
}
function saveSpeedTimeSession(){
	sessionStorage.setItem("speed", JSON.stringify({"speedTime" : speedTime, "numOfTaskEstimation" : numOfTaskEstimation}));
}

//____________________________________________________________________

//_____________________ REMOVE SESSION STORAGE  ______________________

//____________________________________________________________________

function removePhaseSession(){
	sessionStorage.removeItem("phases");
}
function removeUserSession(){
	sessionStorage.removeItem("users");
}

function removeAllSession(){

	if(confirm('¿Quieres reiniciar el tablero?')){
		if(!playing){
			removePhaseSession();
			removeUserSession();
			sessionStorage.clear();
			location.reload();
		}
	}
}