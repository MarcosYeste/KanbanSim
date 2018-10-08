var checkbox = document.getElementsByClassName("speckCheck");
for(var j = 0; j < checkbox.length; j++){
	console.log("checks");
	checkbox[j].addEventListener("change", function(){compileSpecs(event);}, false);
}

var dialog2,
form2,
user = $('#name'),
spec = $('#spec1'),
allFields2 = $([]).add(user).add(spec);


function compileSpecs(event){
	if(event.target.checked){
		console.log(event.target.value);
		document.getElementById("specCompiler").value += event.target.value + ",";
	} else {
		document.getElementById("specCompiler").value = 
			document.getElementById("specCompiler").value.replace(event.target.value + ',', '');		
	}
}


function addUser() {

	$("#userList").append("<div class='user'>" + user.val() + "</div>");
	$("form input[type=text]").each(function() {
		this.value = ''
	});
}

dialog2 = $("#useerAddDiv").dialog({
	autoOpen : false,
	height : 400,
	width : 350,
	modal : true,
	buttons : {
		"Guardar" : addUser,
		"Salir" : function() {
			dialog2.dialog("close");
		}
	},
	close : function() {
		$("form input[type=text]").each(function() {
			this.value = ''
		});
		allFields2.removeClass("ui-state-error");
	}
});

form2 = dialog2.find("form").on("submit", function(event) {
	event.preventDefault();
});
$("#addUserB").button().on("click", function() {
	dialog2.dialog("open");
});