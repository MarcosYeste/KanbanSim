var dialog,
form,
tarea = $('#tarea'),
allFields = $([]).add(tarea);



function addTask() {
	$("#tareas").append("<div class='task rounded'>" + tarea.val() + "</div>");
	$("form input[type=text]").each(function() {
		this.value = ''
	});
}

dialog = $("#dialog-form").dialog({
	autoOpen : false,
	height : 400,
	width : 350,
	modal : true,
	buttons : {
		"Crear Tarea" : addTask,
		"Salir" : function() {
			dialog.dialog("close");
		}
	},
	close : function() {
		form[0].reset();
		allFields.removeClass("ui-state-error");
	}
});

form = dialog.find("form").on("submit", function(event) {
	event.preventDefault();
});
$("#create-Task").button().on("click", function() {
	dialog.dialog("open");
});
