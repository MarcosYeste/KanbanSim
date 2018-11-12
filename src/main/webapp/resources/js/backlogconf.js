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
		if(this.value == "normal" || this.value == "poisson"){
			document.getElementById("paramTitle").style.visibility = "visible";
			document.getElementById("paramTitle").style.height = "initial";
			
			if(this.value == "normal"){
				document.getElementById("dataPoissonDistribution").style.visibility = "hidden";
				document.getElementById("dataPoissonDistribution").style.height = "0px";
				document.getElementById("dataNormalDistribution").style.visibility = "visible";
				document.getElementById("dataNormalDistribution").style.height = "initial";
			} else {
				document.getElementById("dataNormalDistribution").style.visibility = "hidden";
				document.getElementById("dataNormalDistribution").style.height = "0px";
				document.getElementById("dataPoissonDistribution").style.visibility = "visible";
				document.getElementById("dataPoissonDistribution").style.height = "initial";
			}
		} else {
			document.getElementById("paramTitle").style.visibility = "hidden";
			document.getElementById("paramTitle").style.height = "0px";
			document.getElementById("dataNormalDistribution").style.visibility = "hidden";
			document.getElementById("dataNormalDistribution").style.height = "0px";
			document.getElementById("dataPoissonDistribution").style.visibility = "hidden";
			document.getElementById("dataPoissonDistribution").style.height = "0px";
		}

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
				$(distributionTypeInputs).prop('checked', false);
				$.ajax({
					type: "POST",
					url: "/changeDistr",
					data: {
						distribution: "manual",
						distributionType: "",
					},success: function(data) {
					}
				});
				
				document.getElementById("paramTitle").style.visibility = "hidden";
				document.getElementById("paramTitle").style.height = "0px";
				document.getElementById("dataNormalDistribution").style.visibility = "hidden";
				document.getElementById("dataNormalDistribution").style.height = "0px";
				document.getElementById("dataPoissonDistribution").style.visibility = "hidden";
				document.getElementById("dataPoissonDistribution").style.height = "0px";
			}
		});
	}	

	$("#modBacklogBtn").click(function(){
		location.href = "/";
	})
})