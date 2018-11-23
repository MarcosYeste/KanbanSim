
var ctcs = document.getElementById("myChartPhase").getContext('2d');
var rectangleSet = false;
var options = {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: true,

		},
		scales: {
			xAxes: [{
				stacked: false,
				barThickness: 50,
				barPercentage: 0.5,
				gridLines: {
					offsetGridLines: true
				},
			}],
			yAxes: [{
				stacked: false,
				ticks: {
					beginAtZero: true
				},
			}]

		}, 
		animation: {
			onComplete: function(){
				if (!rectangleSet) {
					var scale = window.devicePixelRatio;

					var sourceCanvas = myChartPhase.chart.canvas;
					var copyWidth = myChartPhase.scales['y-axis-0'].width - 10;
					var copyHeight = myChartPhase.scales['y-axis-0'].height + myChartPhase.scales['y-axis-0'].top + 10;

					var targetCtx = document.getElementById("myChartAxis").getContext("2d");

					targetCtx.scale(scale, scale);
					targetCtx.canvas.width = copyWidth * scale;
					targetCtx.canvas.height = copyHeight * scale;

					targetCtx.canvas.style.width = `${copyWidth}px`;
					targetCtx.canvas.style.height = `${copyHeight}px`;
					targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth * scale, copyHeight * scale, 0, 0, copyWidth * scale, copyHeight * scale);
					var sourceCtx = sourceCanvas.getContext('2d');

					// Normalize coordinate system to use css pixels.

					sourceCtx.clearRect(0, 0, copyWidth * scale, copyHeight * scale);
					rectangleSet = true;
				}
			},
			onProgress: function(){
				if (rectangleSet === true) {
					var copyWidth = myChartPhase.scales['y-axis-0'].width;
					var copyHeight = myChartPhase.scales['y-axis-0'].height + myChartPhase.scales['y-axis-0'].top + 10;

					var sourceCtx = myChartPhase.chart.canvas.getContext('2d');
					sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
				}
			}
		}

};


var myChartPhase = new Chart(ctcs, {
	type: 'bar',
	data: {
		labels: [],
		datasets: [{
			label: 'Total segundos',
			data:[],
			backgroundColor:[],
			hoverBackgroundColor:[],
		},{
			label: 'Media ToDO',
			data:[],
			backgroundColor:[],
		},{
			label: 'Media Doing',
			data:[],
			backgroundColor:[],
		},{
			label: 'Media Done',
			data:[],
			backgroundColor:[],
		},
		]
	},
	options: options
});

function addDataPhase(chart,media) {
	var color1 = "#008000";
	var color2 = "#B22222";
	var color3 = "#FF8C00";
	for (var k = 0; k < listPhases.length; k++) {

		chart.data.labels.push(listPhases[k].name);		

		chart.data.datasets[0].data.push(listPhases[k].period);
		chart.data.datasets[0].backgroundColor.push(listPhases[k].color + "99");		
		chart.data.datasets[0].hoverBackgroundColor.push(listPhases[k].color);	
		chart.data.datasets[1].data.push(media[k][0]);			 
		chart.data.datasets[1].backgroundColor.push(color1);			
		chart.data.datasets[2].data.push(media[k][1]);
		chart.data.datasets[2].backgroundColor.push(color2);			 
		chart.data.datasets[3].data.push(media[k][2]);
		chart.data.datasets[3].backgroundColor.push(color3);

		var newwidth = $('.chartAreaWrapper2').width() +60;
		$('.chartAreaWrapper2').width(newwidth);


	}	
	chart.update();
}

//function updateDataPhase(chart, cycle, lead, esfuerzo, index){

//chart.data.datasets[index].data[0] = esfuerzo;
//chart.data.datasets[index].data[1] = cycle;
//chart.data.datasets[index].data[2] = lead;


//chart.update();
//}