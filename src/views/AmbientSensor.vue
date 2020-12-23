<template>
    <div id="text" class="container-fluid">
        <div class="row">
            <div class="col-xl-6 order-12">
                <h3>Gesamtsicht</h3>
                <p>
                    In Summe zeichnet die Uhr die Lichtwerte der vergangenen 24 Stunden auf, hier aggregierten Werte:
                </p>
                <div class="container">
                    <dl class="row">
                        <dt class="col-sm-4">Durchschnitt</dt>
                        <dd class="col-sm-8">0.4</dd>

                        <dt class="col-sm-4">Maximum</dt>
                        <dd class="col-sm-8">{{ Math.max(...history.values) }}</dd>

                        <dt class="col-sm-4">Minimum</dt>
                        <dd class="col-sm-8">{{ Math.min(...history.values) }}</dd>

                        <hr>

                        <dt class="col-sm-4">Aufgezeichnete Werte</dt>
                        <dd class="col-sm-8">{{ history.values.length }}</dd>

                        <dt class="col-sm-4">Zeitraum</dt>
                        <dd class="col-sm-8">{{ (new Date(Date.now() - history.values.length * 100)).toLocaleTimeString() }} bis {{ (new Date(Date.now())).toLocaleTimeString() }}</dd>
                    </dl>
                </div>

                <!--h3>24h Chart</h3>
                <uu-chart class="chart24" :lightdata="history"></uu-chart-->
            </div>
            <div class="col-xl-6 order-1">
                <h3>Live-Daten</h3>
                <p>
                    Hier werden die Daten der vergangenen 30s angezeigt. Jeder Punkt entspricht einer Sekunde, wobei pro Sekunde 10 Werte aufgezeichnet werden und jeweils
                    das Minimum, das Maximum und der Mittelwert dargestellt werden.
                </p>
                <uu-rtc></uu-rtc>
            </div>
        </div>
    </div>
</template>

<script>
import AmbientLightRealTimeChart from '@/components/AmbientLightRealTimeChart.vue'
//import AmbientLightChart from '@/components/AmbientLightChart.vue'
import { baseUri } from '@/util/api'

export default {
    components: {
        /*'uu-chart': AmbientLightChart, */
        'uu-rtc': AmbientLightRealTimeChart
    },
    data() {
        return {
            average: '',
            min: '',
            max: '',
            samples: '',
            timespan: ''
        }
    },
    mounted() {
        let component = this

        fetch(baseUri + '/status/light')
        .then(x => x.json())
        .then(resp => {
            component.$data.average = resp.average
            component.$data.min = resp.min
            component.$data.max = resp.max
            component.$data.samples = resp.samples
            component.$data.timespan = resp.timespan
        })
    }
}
</script>

<style>
li {
    margin-bottom: 0.4rem;
}

.chart24 {
    height: 16rem;
    position: relative;
}

.chart24 canvas {
    height: 16rem;
}
</style>
