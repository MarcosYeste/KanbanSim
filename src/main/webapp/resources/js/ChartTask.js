
var ctc = document.getElementById("myChartTask").getContext('2d');

var myChartTask = new Chart(ctc, {
	type: 'line',
	data: {
		labels: ["CycleTime","LeadTime","Esfuerzo"],
		datasets: []
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero:true
				}
			}]
		}
	}
});


function addDataTask(chart, cycle, lead, esfuerzo, color, taskname) {
	var newDataset  = addDataSet(chart, cycle, lead, esfuerzo, color, taskname);
	chart.data.datasets.push(newDataset);		
	chart.update();
}
function addDataSet(chart, cycle, lead, esfuerzo, color, taskname){      // FALTA EVITAR QUE SE VEAN MAS LINEAS DE LAS QUE DEBERIA

	var newDataset = {
			label: [],
			borderColor: color,
			backgroundColor: ['rgba(0,0,0,0)'],
			data: [],
			borderWidth: 5
	};
	 newDataset.label.push(taskname);
	 for (var index = 0; index < chart.data.labels.length; ++index) {
	        newDataset.data.push(cycle);
	        newDataset.data.push(lead);
	        newDataset.data.push(esfuerzo);
	      }
	 console.log("newDataSet = "+newDataset);
	
	return newDataset;
}