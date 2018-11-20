
var ctc = document.getElementById("myChartPhase").getContext('2d');

var myChartPhase = new Chart(ctc, {
	type: 'bar',
	data: {
		labels: [],
		datasets: []
	},
	options: {
		scales: {
			xAxes: [{ display: false,
			      stacked: true,
			      id: "bar-x-axis2",
			      barThickness: 70,
			      // these are needed because the bar controller defaults set only the first x axis properties
			      type: 'category',
			      categoryPercentage: 0.8,
			      barPercentage: 0.9,
			      gridLines: {
			        offsetGridLines: true
			      }
			      }],
			yAxes: [{
				 stacked: false,
				ticks: {
					beginAtZero:true
				}
			}]
		}
	}
});


function addDataPhase(chart,phaseTime,color) {
	var newDataset  = addDataSetPhase(chart,phaseTime,color);
	listPhases.forEach(function(phase) {
		chart.data.labels.push(phase.name);
	});
	
	chart.data.datasets.push(newDataset);		
	chart.update();
}
function addDataSetPhase(chart,phaseTime,color){    

	var newDataset = {
			label: [],
			borderColor: color,
			backgroundColor: [color],
			data: [],
			borderWidth: 5,
			xAxisID: "bar-x-axis2",
	};
	 newDataset.label.push(name);
	 
	 for (var index = 0; index < chart.data.labels.length; ++index) {		 
		 for (var i = 0; i < phaseTime.length; i++) {			 
			 newDataset.data.push(phaseTime[i]);
		 	}
	}
	
	return newDataset;
}
//function updateDataPhase(chart, cycle, lead, esfuerzo, index){
//	
//		chart.data.datasets[index].data[0] = esfuerzo;
//		chart.data.datasets[index].data[1] = cycle;
//		chart.data.datasets[index].data[2] = lead;
//	
//	
//	chart.update();
//}