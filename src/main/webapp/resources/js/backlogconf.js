$(document).ready(function(){

	var taskInputModeInputs = $("[name='taskInputMode']");
	var distributionTypeInputs = $("[name='distributionType']").change(function(){
		$.ajax({
			type: "POST",
			url: "/changeDistr",
			data: {
				distribution: "constant",
				distributionType: this.value,
			},success: function(data) {
			}
		});
	});

	for(var i = 0; i < taskInputModeInputs.length; i++){
		taskInputModeInputs[i].addEventListener("change", function(){
			if(event.target.getAttribute("value") == "constant"){
				$(distributionTypeInputs).removeAttr("disabled");
				$.ajax({
					type: "POST",
					url: "/changeDistr",
					data: {
						distribution: "constant",
						distributionType: "normal",
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
						distributionType: "",
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