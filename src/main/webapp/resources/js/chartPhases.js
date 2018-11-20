var ctp = document.getElementById("myChartPhases").getContext("2d");

var data = {
		labels: ["Fase1", "Fase2", "Fase3"],
		datasets: [{
			label: "Total",
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			data: [10, 20, 30],
			xAxisID: "bar-x-axis1",
		}, {
			label: "Cycle Time",
			backgroundColor: "rgba(0, 0, 255, 0.2)",
			data: [3, 7, 4],
			xAxisID: "bar-x-axis2"
		}, {
			label: "Lead Time",
			backgroundColor: "rgba(255, 0, 0, 0.2)",
			data: [4, 3, 5],
			xAxisID: "bar-x-axis2"
		}, {
			label: "Esfuerzo",
			backgroundColor: "rgba(0, 255, 0, 0.2)",
			data: [7, 2, 6],
			xAxisID: "bar-x-axis2"
		}]
};

var options = {
		
		scales: {
			xAxes: [{
				stacked: true,
				id: "bar-x-axis1",
				barThickness: 80,
			
			}, {
				display: false,
				stacked: false,
				id: "bar-x-axis2",
				barThickness: 30,
				// these are needed because the bar controller defaults set only the first x axis properties
				type: 'category',
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

var myBarChart = new Chart(ctp, {
	type: 'bar',
	data: data,
	options: options
});