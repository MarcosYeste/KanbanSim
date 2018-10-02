document.getElementById("addSpec").addEventListener("click", addNewNode, false);
document.getElementById("rmvSpec").addEventListener("click", deleteLastNode, false);
var i = 2;
var dialog2,
form2,
user = $('#name'),
spec = $('#spec1'),
allFields2 = $([]).add(user);

function addNewNode() {
	var elem = document.createElement("input");
	var br = document.createElement("br");
	var att = document.createAttribute("type");
	att.value = "text";
	var att2 = document.createAttribute("name");
	att2.value = "especialidad" + i;
	i+=1;
	elem.setAttributeNode(att);
	elem.setAttributeNode(att2);
	document.querySelector("#specContainer").appendChild(elem);
	document.querySelector("#specContainer").appendChild(br);
}

function deleteLastNode() {
	var container = document.querySelector("#specContainer");
	if (container.lastElementChild){
		container.removeChild(container.lastElementChild);
		container.removeChild(container.lastElementChild);
	}
}



function addUser() {
	$("#tareas").append("<div>" + user.val() + " , "  + spec.val() + "</div>");
	$("form input[type=text]").each(function() {
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