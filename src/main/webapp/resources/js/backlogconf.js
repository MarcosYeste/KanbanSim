$(document).ready(function(){

	var taskInputModeInputs = $("[name='taskInputMode']");
	var distributionTypeInputs = $("[name='distributionType']");
	
	for(var i = 0; i < taskInputModeInputs.length; i++){
		taskInputModeInputs[i].addEventListener("change", function(){
			if(event.target.getAttribute("value") == "constant"){
				$(distributionTypeInputs).removeAttr("disabled");
				$.ajax({
					type: "POST",
					url: "/changeDistr",
					data: {
						distribution: "constant",
					},success: function(data) {
					}
				});
			} else {
				$(distributionTypeInputs).attr("disabled", "");
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
	
	$("#modBacklogBtn").click(function(){
		location.href = "/";
	})
})
