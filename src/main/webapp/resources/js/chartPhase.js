
var ctcs = document.getElementById("myChartPhase").getContext('2d');

var options = {
		
		scales: {
			xAxes: [{
				stacked: false,
				id: "bar-x-axis1",
				barThickness: 80,
				categoryPercentage: 1,
				barPercentage: 0.5,
				gridLines: {
					offsetGridLines: true
				}
			}],
			yAxes: [{
				stacked: false,
				ticks: {
					beginAtZero: true
				},
			}]

		}
};


var myChartPhase = new Chart(ctcs, {
	type: 'bar',
	data: {
		labels: [],
		datasets: [{
			label: 'Total',
			data:[],
			backgroundColor:[]
		},{
			label: 'ToDO',
			data:[],
			backgroundColor:[]
		},{
			label: 'Doing',
			data:[],
			backgroundColor:[]
		},{
			label: 'Done',
			data:[],
			backgroundColor:[]
		},
		]
	},
	options: options
});

function addDataPhase(chart,media,faseTime) {
	 var color1 = getRandomColor();
	 var color2 = getRandomColor();
	 var color3 = getRandomColor();
	for (var k = 0; k < listPhases.length; k++) {
		
		chart.data.labels.push(listPhases[k].name);		
				 
			 chart.data.datasets[0].data.push(faseTime[k]);
			 chart.data.datasets[0].backgroundColor.push(listPhases[k].color);			
			 chart.data.datasets[1].data.push(media[k][0]);			 
			 chart.data.datasets[1].backgroundColor.push(color1);			
			 chart.data.datasets[2].data.push(media[k][1]);
			 chart.data.datasets[2].backgroundColor.push(color2);			 
			 chart.data.datasets[3].data.push(media[k][2]);
			 chart.data.datasets[3].backgroundColor.push(color3);
			 
	}	
	chart.update();
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