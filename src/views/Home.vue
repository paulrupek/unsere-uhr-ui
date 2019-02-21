<template>
  <div class="home container">
    <div class="row">
      <div class="col-md-6">
        <uu-clock :leds="clockStatus.ledValues" :configuration="ledLayout"></uu-clock>
      </div>
    </div>
    
  </div>
</template>

<script>
import Clock from '@/components/Clock.vue'

export default {
  name: 'home',
  data: function () {
    return {
      clockStatus: [],
      ledLayout: null,
      intervalId: null
    }
  },
  components: {
    'uu-clock': Clock
  },
  mounted() {
    let component = this

    fetch('http://127.0.0.1:8081/settings/led-layout')
    .then(x => x.json())
    .then(resp => {
      component.$data.ledLayout = resp
    })
    .catch(e => console.log(e))

    this.$data.intervalId = setInterval(() => {
      fetch('http://127.0.0.1:8081/status/clock')
      .then(x => x.json())
      .then(resp => {
          component.$data.clockStatus = resp
      })
      .catch(e => { 
        console.log(e)
      })
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.$data.intervalId)
  }
}
</script>
