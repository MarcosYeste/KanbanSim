
var taskInputMode = "manual"; //Type of backlog tasks input 'constant', 'manual'

var taskInputModeInputs = $("[name='taskInputMode']");
var distributionTypeInputs = $("[name='distributionType']");

for(var i = 0; i < taskInputModeInputs.length; i++){
	taskInputModeInputs[i].addEventListener("change", function(){
		if(event.target.getAttribute("value") == "constant"){
			$("[name='distributionType']").removeAttr("disabled");
			taskInputMode = "constant";
			console.log(taskInputMode);
		} else {
			$("[name='distributionType']").attr("disabled", "");
			taskInputMode = "manual";
			console.log(taskInputMode);
		}
	});
}

function modDistribution(){
	
	return taskInputMode;

}