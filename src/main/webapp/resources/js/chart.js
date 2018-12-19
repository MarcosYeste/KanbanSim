if(document.getElementById("myChart")){
var ctx = document.getElementById("myChart").getContext('2d');

var myChart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: [],
		datasets: [{

			label: ['Tareas Trabajadas'],
			data: [],
			backgroundColor: [

				],
				hoverBackgroundColor: [

					],
					borderColor: [

						],
						borderWidth: 0
		}, {
			label: 'Tiempo Trabajado',
			data: [],
			type: "line",
			backgroundColor: [
				'rgba(0,0,0,0)'
				],
				hoverBackgroundColor: [

					],
					borderColor: [
						'rgba(212,133,45,1)'
						],
						borderWidth: 5
		}]
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
}
function addData(chart, label, data, color) {
	if(chart != undefined){
		chart.data.labels.push(label);
		chart.data.datasets[0].data.push(data);
		chart.data.datasets[0].backgroundColor.push(color);
		chart.update();
	}
}


function updateData(chart, data, index, dataset){
	if(chart != undefined){
		chart.data.datasets[dataset].data[index] = data;
		chart.update();
	}
}

function removeData(chart) {
//	chart.data.labels.pop();
	chart.data.labels = [];
	chart.data.datasets[0].data = [];

	chart.update();
}

function removeLabel(chart, label) {
	chart.data.labels.splice(chart.data.labels.indexOf(label), 1);

	chart.update();
}

function modLabel(chart, oldLabel, newLabel){

	for(var i = 0; i < chart.data.labels.length; i++){

		if(oldLabel == chart.data.labels[i]){
			chart.data.labels[i] = newLabel;
		}
	}

	chart.update();
}