document.getElementById("addSpec").addEventListener("click", addNewNode, false);
document.getElementById("rmvSpec").addEventListener("click", deleteLastNode, false);
var i = 2;
var dialog2,
form2,
user = $('#name'),
spec = $('#spec1'),
allFields2 = $([]).add(user).add(spec);

function addNewNode() {
	var elem = document.createElement("input");
	var br = document.createElement("br");
	var attType = document.createAttribute("type");
	var attID = document.createAttribute("id");
	attType.value = "text";
	attID.value = "spec" + i;
	var att2 = document.createAttribute("name");
	att2.value = "especialidad" + i;
	i+=1;
	elem.setAttributeNode(attType);
	elem.setAttributeNode(attID);
	elem.setAttributeNode(att2);
	document.querySelector("#specContainer").appendChild(elem);
	document.querySelector("#specContainer").appendChild(br);

	console.log(i);
}

function deleteLastNode() {
	var container = document.querySelector("#specContainer");
	var nodes = container.childNodes;
	var noc = 0;
	for(var j = 0; j < nodes.length; j++){
		noc++;
		
	}
	if (container.lastElementChild && noc > 4){
		container.removeChild(container.lastElementChild);
		container.removeChild(container.lastElementChild);
		if(i > 2){
			i-=1;
		}
	} 

}

function getSpecs(){
	var allSpecs = {};
	var numOfSpecs = i-1;
	for(var j = 0; j < numOfSpecs; j++){
		allSpecs[j] = document.querySelector("#spec" + (j+1)).value;
	}
	return allSpecs;
}

function addUser() {
	getSpecs();
	$("#userList").append("<div>" + user.val() + " , "  + spec.val() + "</div>");
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