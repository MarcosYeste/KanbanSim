var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: [],
		datasets: [{
			
			label: ['Max Time'],
			data: [],
			backgroundColor: [

				],
				hoverBackgroundColor: [

					],
					borderColor: [

						],
						borderWidth: 1
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
	chart.data.datasets.forEach((dataset) => {
		dataset.data.push(data);
		dataset.backgroundColor.push(color);
		color = color.substr(0,color.length - 2);
		dataset.hoverBackgroundColor.push(color);
		dataset.borderColor.push(color);
	});
	chart.update();
}

function removeData(chart) {
	chart.data.labels.pop();
	chart.data.datasets.forEach((dataset) => {
		dataset.data.pop();
	});
	chart.update();
}