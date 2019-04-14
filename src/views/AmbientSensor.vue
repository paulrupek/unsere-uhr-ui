<template>
    <div id="text" class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Umgebungslicht</h1>
                <p>
                    -.-
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <uu-chart></uu-chart>
            </div>
            <div class="col">
                <uu-rtc></uu-rtc>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from '@/components/Alert.vue'
import AmbientLightRealTimeChart from '@/components/AmbientLightRealTimeChart.vue'
import AmbientLightChart from '@/components/AmbientLightChart.vue'

export default {
    components: {
        'uu-alert': Alert, 
        'uu-chart': AmbientLightChart, 
        'uu-rtc': AmbientLightRealTimeChart
    },
    data() {
        return {
            data: {},
            history: {},
            disabled: false
        }
    },
    mounted() {
        let component = this

        fetch('http://127.0.0.1:8081/settings/light')
        .then(x => x.json())
        .then(resp => {
            component.$data.data = resp
        })
        .catch(() => { 
            component.$refs.errorReadAlert.open()
            component.$data.disabled = true
        })

        fetch('http://127.0.0.1:8081/light')
        .then(x => x.json())
        .then(resp => {
            component.$data.history = resp
        })
        .catch(() => { 
            component.$refs.errorReadAlert.open()
            component.$data.disabled = true
        })
    }
}
</script>

<style>
li {
    margin-bottom: 0.4rem;
}
</style>
