$(document).ready(function(){

	var selectedBacklog = "";
	var distributionIsSelected = false;
	var taskInputModeInputs = $("[name='taskInputMode']");
	var totalPercentage = 0;
	var total = 0;
	 var subTotal = 0; //Para controlar que siempre sea un total de 100% y si no bloquear el boton
	var divsValues = document.getElementsByClassName("sizeValue");
	var slidersTofill = document.getElementsByClassName("ui-slider-handle");
	var spanSelector = 1;
	
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

	var sliders = $("#dataWeightDistribution .ui-slider-handle");
//	console.log(sliders);
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
	        },
	        stop: function( event, ui ) {	        	
	        	total = 0;
	        	//Calcular la suma total para poder calcular el limite actual
	            sliders.not(this).each(function() {	            	
	            	if(total >= 100){
	            		total = 100;
	            		$(this).slider("option", 'value', 0);
	            		
	            	} else {
	            		total += $(this).slider("option", "value");
	            	}
	            	
	            });
	            subTotal = 0;
	            sliders.each(function() {
	            	if(subTotal >= 100){
	            		subTotal = 100;
	            	} else {
	            		subTotal += $(this).slider("option", "value");
	            	}
	            	 if(subTotal < 100){
	 	        		document.getElementById("modBacklogBtn").setAttribute("disabled", "");	
	 	            } else if (subTotal == 100){
	 	            	document.getElementById("modBacklogBtn").removeAttribute("disabled");
	 	            }
	            });
	            
	           
	            
	            //Calcular el limite actual
	            var max = 0;
            	if(!(total >= 100)){
	            	max = availableTotal - total;
	            } 
            	//Controlar el limite del slider
	            if(ui.value >= max){
	            	this.firstChild.style.cssText = "left: "+max+"%";
	            	$(this).siblings().text(max);
	            	ui.value = max;
	            	$(this).slider('value', max);
	            }  
	        }
	    });
	});
	
	//Rellenar los div
	for(var i = 0; i < divsValues.length; i++){
		slidersTofill[spanSelector].style.left = divsValues[i].innerHTML+ "%";	
		spanSelector+=2; 
		
		if(subTotal >= 100){
    		subTotal = 100;
    	} else {
    		subTotal += divsValues[i].innerHTML;
    	}
		
		if(subTotal == 0){
			document.getElementById("modBacklogBtn").setAttribute("disabled", "");	
	    } else {
	    	document.getElementById("modBacklogBtn").removeAttribute("disabled");
	    }
	}
	//Darle el valor a los sliders
	for(var i = 0; i < divsValues.length; i++){
		$("#custom-handle"+i).slider("option", 'value', parseInt(divsValues[i].innerHTML));
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
		var sizeValuesArray = $(".sizeValue");
		var sizeValuesString = "";
		for(var i = 0; i < sizeValuesArray.length; i++){
			console.log(sizeValuesArray[i].innerHTML);
			sizeValuesString += sizeValuesArray[i].innerHTML + ",";
		}
		console.log(sizeValuesString);
		
		
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
					lambda:document.getElementById("poissonLambda").value,
					sizeValues: sizeValuesString
					
				},success: function(data) {
				}
			});
			location.href = "/";
		}
	}) //end button listener
})
