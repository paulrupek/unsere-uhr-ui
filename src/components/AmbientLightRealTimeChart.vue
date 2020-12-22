<script>
import { Line } from 'vue-chartjs'
import io from 'socket.io-client'

var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
}

export default {
    extends: Line,
    mounted() {
        const _ = this
        const socket = io(`ws://${window.location.host}`)

        let datasets = [
            {
                label: 'Mittelwert',
                borderColor: chartColors.red,
                fill: false,
                lineTension: 0,
                data: []
            }, {
                label: 'Minimum',
                borderColor: chartColors.blue,
                fill: false,
                borderDash: [8, 4],
                data: []
            }, {
                label: 'Maximum',
                borderColor: chartColors.blue,
                fill: false,
                borderDash: [8, 4],
                data: []
            }
        ]

        let labels = []

        const limit = 30

        /**/

        setTimeout(() => {
            socket.on('ambient-light', x => {
                datasets[0].data.push(x.reduce((p, c) => p + c, 0) / x.length)
                datasets[1].data.push(Math.min(...x))
                datasets[2].data.push(Math.max(...x))
                
                if (labels.length < limit) {
                    labels.push('')
                } else {
                    datasets[0].data.shift()
                    datasets[1].data.shift()
                    datasets[2].data.shift()
                }

                _.$data._chart.update()
            })
        }, 2000)

        this.renderChart({
            labels: labels,
            datasets: datasets
        }, {
            title: {
                display: false,
                text: ''
            },
            responsive: true,
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    ticks: {
                        display: true,
                        beginAtZero: true,
                        suggestedMin: 0,
                        suggestedMax: 1,
                        stepSize: 0.1,
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
