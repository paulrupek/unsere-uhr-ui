<script>
import { Line } from 'vue-chartjs'
import { baseUri } from '@/util/api'

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

        let datasets = [
            {
                label: 'Mittelwert',
                borderColor: chartColors.red,
                fill: false,
                lineTension: 0,
                data: []
            }
        ]

        let labels = []

        fetch(baseUri + '/status/light')
        .then(x => x.json())
        .then(resp => {
            if (resp && resp.values) {
                /*for (let i = 0; i < resp.values.length; i += 10) {

                }*/
                let i = 0
                resp.values.forEach(element => {
                    datasets[0].data.push(element)
                    labels.push(i++)
                })

                _.$data._chart.update()
            }
        })

        this.renderChart({
            labels: labels,
            datasets: datasets
        }, {
            title: {
                display: false,
                text: '24-Stunden Verlauf'
            },
            responsive: true,
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        display:true,
                        suggestedMin: 0,
                        suggestedMax: 24 * 60 * 60 * 10,
                        stepSize: 24 * 60 * 60
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
