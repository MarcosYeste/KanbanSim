
if(document.getElementById("myChartSpeed")){
	var ctb = document.getElementById("myChartSpeed").getContext('2d');

	var myChartSpeed = new Chart(ctb, {
		type: 'line',
		data: {
			labels: [],
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
function addDataSpeed(chart, speed , numTask) {

	chart.data.labels.push(speed);
	var newDatasetSpeed  = addDataSetSpeed(chart, numTask);
	
		chart.data.datasets.push(newDatasetSpeed);	

		chart.update();
	
}

function addDataSetSpeed(chart,numTask){      

	var newDataset = {
			label: [],
			borderColor: "blue",
			backgroundColor: ['rgba(0,0,0,0)'],
			data: [],
			borderWidth: 5
	};
	newDataset.label.push("Numero de  Tareas");
	newDataset.data.push(numTask);
	
	return newDataset;
}

function updateDataSpeed(chart, speed, numTask){
	chart.data.labels.push(speed);
	console.log(chart.data.datasets.data);
	chart.data.datasets[0].data.push(numTask);
	

	chart.update();

}
