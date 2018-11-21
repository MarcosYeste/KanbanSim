function printUserSession(){
	
var sessionUsuarios = JSON.parse(sessionStorage.getItem("users")); console.table(sessionUsuarios);
	
	var divU = document.getElementById("usersContainer");
	divU.innerHTML = "";
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
function refreshUsers(){
	if(sessionStorage.getItem("users")){
		console.log("dentro");
		var sessionUsuarios = JSON.parse(sessionStorage.getItem("users"));
		listUsers = sessionUsuarios;
	}
}