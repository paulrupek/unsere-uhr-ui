<script>
import { Line } from 'vue-chartjs'
import 'chartjs-plugin-streaming'

var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
}

function randomScalingFactor() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

function onRefresh(chart) {
    chart.config.data.datasets.forEach(function(dataset) {
		dataset.data.push({
			x: Date.now(),
			y: randomScalingFactor()
		});
	});
}

export default {
    extends: Line,
    mounted() {
        this.renderChart({
            datasets: [
                {
                    label: 'Dataset 1 (linear interpolation)',/*
                    backgroundColor: this.$data._chart.helpers.color(chartColors.red).alpha(0.5).rgbString(),*/
                    borderColor: chartColors.red,
                    fill: false,
                    lineTension: 0,
                    borderDash: [8, 4],
                    data: []
                }, {
                    label: 'Dataset 2 (cubic interpolation)',/*
                    backgroundColor: this.$data._chart.helpers.color(chartColors.blue).alpha(0.5).rgbString(),*/
                    borderColor: chartColors.blue,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    data: []
                }
            ]
        }, {
            title: {
                display: true,
                text: 'Line chart (hotizontal scroll) sample'
            },
            scales: {
                xAxes: [{
                    type: 'realtime',
                    realtime: {
                        duration: 20000,
                        refresh: 1000,
                        delay: 2000,
                        onRefresh: onRefresh
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'value'
                    }
                }]
            },
            tooltips: {
                mode: 'nearest',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: false
            }
        })
    }
}
</script>
