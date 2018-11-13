$(document).ready(function(){

	var selectedBacklog;
	var distributionIsSelected = false;
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
		
		distributionIsSelected = true;
		document.getElementById("modBacklogBtn").removeAttribute("disabled");
		
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
				selectedBacklog = "constant";
				document.getElementById("modBacklogBtn").setAttribute("disabled", "");
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
				selectedBacklog = "normal";
				distributionIsSelected = false;
				
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
		if((selectedBacklog == "constant" && distributionIsSelected)|| selectedBacklog == "normal"){
			inputBase = document.getElementById("normalBaseValue");
			inputVariance = document.getElementById("normalVarianceValue");
			inputLambda = document.getElementById("poissonLambda");
			
			$(distributionTypeInputs).removeAttr("disabled");
			$.ajax({
				type: "POST",
				url: "/saveDistributionData",
				data: {
					base:document.getElementById("normalBaseValue").value,
					variance:document.getElementById("normalVarianceValue").value,
					lambda:document.getElementById("poissonLambda").value
				},success: function(data) {
				}
			});
			location.href = "/";
		}
	})
})