<template>
  <div class="container">

    <div v-for="v in data.Strategies" class="row">
      <h3 class="col-12">{{ v.title }}</h3>
      <span class="col-12">{{ v.description }}</span>
      <uu-options v-bind:options="v.options" 
                  v-bind:selected.sync="v.id"
                   />
    </div>
  </div>
</template>

<script>
import Text from '@/components/Text.vue'
import OptionSelect from '@/components/OptionSelect.vue'

export default {
  name: 'text',
  components: {
    'uu-text': Text,
    'uu-options': OptionSelect
  },
  data: function() {
    return {
      data: {}
    }
  },
  mounted() {
    let component = this

    fetch('http://127.0.0.1:8081/settings/text', {
        
    })
    .then(x => x.json())
    .then(resp => {
        component.$data.data = resp
    })
    .catch(e => { console.log("error", e)})
  }
}
</script>