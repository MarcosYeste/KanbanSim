var dialog3,
form3,
nameFase = $('#nameFase'),
maxTareas = $('#maxTareas'),
allFields3 = $([]).add(nameFase).add(maxTareas);

function addFase(){
	$("#fases").append("<div class='col-sm-1'>" + nameFase.val() + "<div><div class='doing'></div>" +
			"<div class='done'></div></div></div>");
	$("form input[type=text]").each(function() {
		this.value = ''
	});
}

dialog3 = $("#PhaseForm").dialog({
	autoOpen : false,
	height : 400,
	width : 350,
	modal : true,
	buttons : {
		"Crear Fase" : addFase,
		"Salir" : function() {
			dialog3.dialog("close");
		}
	},
	close : function() {
		form3[0].reset();
		allFields3.removeClass("ui-state-error");
	}
});

form3 = dialog3.find("form").on("submit", function(event) {
	event.preventDefault();
});
$("#create-Phase").button().on("click", function() {
	dialog3.dialog("open");
});
