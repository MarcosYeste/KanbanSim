$(document).ready(function(){

	var selectedBacklog = "";
	var distributionIsSelected = false;
	var taskInputModeInputs = $("[name='taskInputMode']");
	var totalPercentage = 0;
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
		selectedBacklog = "constant";
		document.getElementById("modBacklogBtn").removeAttribute("disabled");

		if(this.value == "normal" || this.value == "poisson" || this.value == "weight"){
			document.getElementById("paramTitle").style.visibility = "visible";
			document.getElementById("paramTitle").style.height = "initial";

			if(this.value == "normal"){
				document.getElementById("dataPoissonDistribution").style.visibility = "hidden";
				document.getElementById("dataPoissonDistribution").style.height = "0px";

				document.getElementById("dataWeightDistribution").style.visibility = "hidden";
				document.getElementById("dataWeightDistribution").style.height = "0px";

				document.getElementById("dataNormalDistribution").style.visibility = "visible";
				document.getElementById("dataNormalDistribution").style.height = "initial";

			} else if(this.value == "poisson"){

				document.getElementById("dataNormalDistribution").style.visibility = "hidden";
				document.getElementById("dataNormalDistribution").style.height = "0px";

				document.getElementById("dataWeightDistribution").style.visibility = "hidden";
				document.getElementById("dataWeightDistribution").style.height = "0px";

				document.getElementById("dataPoissonDistribution").style.visibility = "visible";
				document.getElementById("dataPoissonDistribution").style.height = "initial";

			}else{

				document.getElementById("dataNormalDistribution").style.visibility = "hidden";
				document.getElementById("dataNormalDistribution").style.height = "0px";

				document.getElementById("dataWeightDistribution").style.visibility = "visible";
				document.getElementById("dataWeightDistribution").style.height = "initial";

				document.getElementById("dataPoissonDistribution").style.visibility = "hidden";
				document.getElementById("dataPoissonDistribution").style.height = "0px";


			}

		} else {
			document.getElementById("paramTitle").style.visibility = "hidden";
			document.getElementById("paramTitle").style.height = "0px";
			document.getElementById("dataNormalDistribution").style.visibility = "hidden";
			document.getElementById("dataNormalDistribution").style.height = "0px";
			document.getElementById("dataWeightDistribution").style.visibility = "hidden";
			document.getElementById("dataWeightDistribution").style.height = "0px";
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
				document.getElementById("dataWeightDistribution").style.visibility = "hidden";
				document.getElementById("dataWeightDistribution").style.height = "0px";
				document.getElementById("dataPoissonDistribution").style.visibility = "hidden";
				document.getElementById("dataPoissonDistribution").style.height = "0px";
			}
		});
	}	

	$("#modBacklogBtn").click(function(){
		var radios = $("[name='distributionType']")
		for(var i = 0; i < radios.length; i++){
			if(radios[i].checked){
				distributionIsSelected = true;
				selectedBacklog = "constant";
			}
		}

		var backLogradios = $("[name='taskInputMode']");
		for(var i = 0; i < backLogradios.length; i++){
			if(backLogradios[i].checked && backLogradios[i].value == "manual"){
				selectedBacklog = "manual";
			} 
		}

		if((selectedBacklog == "constant" && distributionIsSelected) || selectedBacklog == "manual"){

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
	
	
	var sliders = $("#dataWeightDistribution .ui-slider-handle");
	sliders.each(function() {
	    var value = parseInt($(this).text(), 10),
	        availableTotal = 100;
	 $(this).empty().slider({
	        value: 0,
	        min: 0,
	        max: 100,
	        range: "max",
	        step: 1,
	        animate: 100,
	        slide: function(event, ui) {
	            // Update display to current value
	            $(this).siblings().text(ui.value);

	            // Get current total
	            var total = 0;

	            sliders.not(this).each(function() {
	                total += $(this).slider("option", "value");
	            });


	            total += ui.value;

	            var max = availableTotal - total;

	            // Update each slider
	            sliders.not(this).each(function() {
	                var t = $(this),
	                    value = t.slider("option", "value");

	                t.slider("option", "max", max + value);
	                t.slider('value', value);
	            });
	        }
	    });
	});
})
