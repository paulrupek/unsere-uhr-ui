<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col">
        <h1>Aktelle Uhrzeit</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 col-xl-8 col-xxl-6">
        <uu-alert type="error" ref="layoutReadError">
          <h5>Die Layoutinformationen der Uhr konnten nicht gelesen werden.</h5>
          <p>{{ layoutReadError }}</p>
        </uu-alert>
        <uu-alert type="error" ref="readError">
          <h5>Der aktuelle LED-Status der Uhr konnte nicht gelesen werden.</h5>
          <p>{{ readError }}</p>
        </uu-alert>
        <uu-clock :leds="clockStatus.ledValues" :configuration="ledLayout"></uu-clock>
      </div>
    </div>
  </div>
</template>

<script>
import Clock from '@/components/Clock.vue'
import Alert from '@/components/Alert.vue'

export default {
  name: 'home',
  data: function () {
    return {
      clockStatus: [],
      ledLayout: null,
      intervalId: null,
      layoutReadError: '',
      readError: ''
    }
  },
  components: {
    'uu-clock': Clock,
    'uu-alert': Alert
  },
  mounted() {
    let component = this

    fetch('http://127.0.0.1:8081/settings/led-layout')
    .then(x => x.json())
    .then(resp => {
      component.$data.ledLayout = resp
    })
    .catch(e => {
      component.$data.layoutReadError = e
      component.$refs.layoutReadError.open()
    })

    this.$data.intervalId = setInterval(() => {
      fetch('http://127.0.0.1:8081/status/clock')
      .then(x => x.json())
      .then(resp => {
          component.$data.clockStatus = resp
      })
      .catch(e => { 
        component.$data.readError = e
        component.$refs.readError.open()
      })
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.$data.intervalId)
  }
}
</script>
