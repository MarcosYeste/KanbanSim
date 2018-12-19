
if(document.getElementById("myChartTask")){
	var ctc = document.getElementById("myChartTask").getContext('2d');

	var myChartTask = new Chart(ctc, {
		type: 'line',
		data: {
			labels: ["Esfuerzo","CycleTime","LeadTime"],
			datasets: []
		},
		options: {
			legend: {
				display: false,
				labels : {
					usePointStyle : true,
				},
			},
			legendCallback: function(chart) {
				var text = [];
				text.push('<div class="leyenda">');
				for (var i = 0; i < chart.data.datasets.length; i++) {

					text.push('<div class="columnas"><span style="background-color:' + chart.data.datasets[i].borderColor + '"></span>');
					text.push(chart.data.datasets[i].label + '</div>');

				}
				text.push('</div>');
				return text.join("");
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
function addDataTask(chart, cycle, lead, esfuerzo, color, taskname) {

	var newDataset  = addDataSet(chart, cycle, lead, esfuerzo, color, taskname);
	if(newDataset != -1){
		chart.data.datasets.push(newDataset);	

		document.getElementById('js-legend').innerHTML = chart.generateLegend();

		chart.update();
	}
}

function addDataSet(chart, cycle, lead, esfuerzo, color, taskname){      

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

function updateDataTask(chart, cycle, lead, esfuerzo, index){
	console.log("DENTRO FUNCION CYLE "+cycle+" LEAD "+ lead+" ESFUERZO "+esfuerzo);
	console.log(" IF UNDEFINED ?? "+chart.data.datasets[index]+" CON INDICE "+index);
	if(chart.data.datasets[index] != undefined){
		console.log("DENTRO IF "+cycle+" LEAD "+ lead+" ESFUERZO "+esfuerzo);
		chart.data.datasets[index].data[0] = esfuerzo;
		chart.data.datasets[index].data[1] = cycle;
		chart.data.datasets[index].data[2] = lead;
		console.log("GUARDADO :: "+chart.data.datasets[index].data[0]+" "+chart.data.datasets[index].data[1]+" "+chart.data.datasets[index].data[2]);
	}
try{
	chart.update();
}catch (e) {
	console.log("NO HACE UPDATE");
}
	
}