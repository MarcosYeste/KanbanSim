var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: [],
		datasets: [{

			label: ['Task Worked'],
			data: [],
			backgroundColor: [

				],
				hoverBackgroundColor: [

					],
					borderColor: [

						],
						borderWidth: 0
		}, {
			label: 'Time Worked',
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

function addData(chart, label, data, color) {
	chart.data.labels.push(label);
	chart.data.datasets[0].data.push(data);
	chart.data.datasets[0].backgroundColor.push(color);
//	color = color.substr(0,color.length - 2);
//	dataset.hoverBackgroundColor.push(color);
//	dataset.borderColor.push(color);
	chart.update();
}


function updateData(chart, data, index, dataset){

	chart.data.datasets[dataset].data[index] = data;
	chart.update();
}

function removeData(chart) {
//	chart.data.labels.pop();
	chart.data.labels = [];
	chart.data.datasets[0].data = [];

	chart.update();
}