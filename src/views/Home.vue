<template>
  <div class="home container">
    <div class="row">
      <div class="col-md-6">
        <uu-clock></uu-clock>
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
      clockStatus: []
    }
  },
  components: {
    'uu-clock': Clock
  },
  mounted() {
    let component = this

    fetch('http://127.0.0.1:8081/status/clock')
    .then(x => x.json())
    .then(resp => {
        component.$data.clockStatus = resp
        console.log("wtf", component.$data.clockStatus.ledValues)
    })
    .catch(e => { 
      console.log(e)
    })
  }
}
</script>
