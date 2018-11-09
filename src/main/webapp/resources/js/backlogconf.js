
var taskInputModeInputs = $("[name='taskInputMode']");
var distributionTypeInputs = $("[name='distributionType']");

for(var i = 0; i < taskInputModeInputs.length; i++){
	taskInputModeInputs[i].addEventListener("change", function(){
		if(event.target.getAttribute("value") == "constant"){
			$("[name='distributionType']").removeAttr("disabled");
			$.ajax({
				type: "POST",
				url: "/changeDistr",
				data: {
					distribution: "constant",
				},success: function(data) {
				}
			});
		} else {
			$("[name='distributionType']").attr("disabled", "");
			$.ajax({
				type: "POST",
				url: "/changeDistr",
				data: {
					distribution: "manual",
				},success: function(data) {
				}
			});
		}
	});
}


