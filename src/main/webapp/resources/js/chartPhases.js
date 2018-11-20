var ctp = document.getElementById("myChartPhases").getContext("2d");

var data = {
		labels: ["Chocolate", "Vanilla", "Strawberry"],
		datasets: [{
			label: "Blue",
			backgroundColor: "blue",
			data: [3, 7, 4]
		}, {
			label: "Red",
			backgroundColor: "red",
			data: [4, 3, 5]
		}, {
			label: "Green",
			backgroundColor: "green",
			data: [7, 2, 6]
		}]
};

Chart.plugins.register({
	afterDatasetsUpdate: function(chart) {
		Chart.helpers.each(chart.getDatasetMeta(0).data, function(rectangle, index) {
			rectangle._view.width = rectangle._model.width = 30;
		});
	},
})

var data = {
	labels: ["Chocolate", "Vanilla", "Strawberry"],
	datasets: [{
		label: "First",
		backgroundColor: 'rgba(255, 99, 132, 0.2)',
		borderWidth: 1,
		data: [10, 20, 30],
		xAxisID: "bar-x-axis1",
	}, {
		label: "Blue",
		backgroundColor: "blue",
		data: [3, 7, 4],
		xAxisID: "bar-x-axis1"
	}, {
		label: "Red",
		backgroundColor: "red",
		data: [4, 3, 5],
		xAxisID: "bar-x-axis1"
	}, {
		label: "Green",
		backgroundColor: "green",
		data: [7, 2, 6],
		xAxisID: "bar-x-axis1"
	}]
};

var options = {
		scales: {
			xAxes: [{
				stacked: true,
				id: "bar-x-axis1",
				barThickness: 70,
			}],
			yAxes: [{
				stacked: false,
				ticks: {
					beginAtZero: true
				},
			}]

		}
};

var ctx = document.getElementById("myChart").getContext("2d");
var myBarChart = new Chart(ctx, {
	type: 'bar',
	data: data,
	options: options
});