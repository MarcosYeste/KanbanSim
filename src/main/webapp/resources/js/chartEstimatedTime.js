
if(document.getElementById("chartEstimated")){
	var ctc = document.getElementById("chartEstimated").getContext('2d');

	var chartEstimated = new Chart(ctc, {
		type: 'line',
		data: {
			labels: ["Esfuerzo Real","CycleTime Estimado","LeadTime Estimado"],
			datasets: []
		},
		options: {
			legend: {
				display: false,
				labels : {
					usePointStyle : true,
				},
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	});

}
function addDataEstimated(chart, ecycle, elead, esfuerzo, color, taskname) {

	var newDataset  = addDataSetEstimated(chart, ecycle, elead, esfuerzo, color, taskname);
	if(newDataset != -1){
		chart.data.datasets.push(newDataset);	

		chart.update();
	}
}

function addDataSetEstimated(chart, ecycle, elead, esfuerzo, color, taskname){      

	var newDataset = {
			label: [],
			borderColor: color,
			backgroundColor: ['rgba(0,0,0,0)'],
			data: [],
			borderWidth: 5
	};
	newDataset.label.push(taskname);

	// Si la tarea ya existe en la array
	if(chart.data.datasets.length > 0){
		for (var i = 0; i < chart.data.datasets.length; i++) {
			// No me la añadas de nuevo
			if(chart.data.datasets[i].label[0] == taskname){
				return -1;
			}
		}
	}
	// Pero si no existe añadela
	for (var index = 0; index < chart.data.labels.length; ++index) {
		if(newDataset.data != undefined){
			newDataset.data.push(esfuerzo);
			newDataset.data.push(cycle);
			newDataset.data.push(lead);
		}
	}

	return newDataset;
}

function updateDataTaskEstimated(chart, cycle, lead, esfuerzo, index){
	if(chart.data.datasets[index] != undefined){
		chart.data.datasets[index].data[0] = esfuerzo;
		chart.data.datasets[index].data[1] = cycle;
		chart.data.datasets[index].data[2] = lead;
	}

	chart.update();

}

function getIndexEstimated(taskName){
	return parseInt(taskName.substring(4, taskName.length));
}