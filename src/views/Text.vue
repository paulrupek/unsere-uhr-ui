<template>
  <div class="container">
    <div v-for="v in data.Strategies" class="row" :key="v.id">
      <h3 class="col-12">{{ v.title }}</h3>
      <span class="col-12">{{ v.description }}</span>
      <uu-options :options="v.options" 
                  :selected.sync="data[v.id]"
                  @update:selected="selectionUpdated"
                  />
    </div>
    <div class="row">
      <uu-alert class="col-12" type="success" ref="successAlert">
        Die Einstellungen wurden erfolgreich angepasst.
      </uu-alert>
      <uu-alert class="col-12" type="error" ref="errorAlert">
        Ein Fehler ist beim Speichern aufgetreten.
      </uu-alert>
      <button @click="save" type="button" class="btn btn-primary" :disabled="disabled">Save</button>
    </div>
  </div>
</template>

<script>
import OptionSelect from '@/components/OptionSelect.vue'
import Alert from '@/components/Alert.vue'

export default {
  name: 'TextSettings',
  components: {
    'uu-options': OptionSelect,
    'uu-alert': Alert
  },
  methods: {
    selectionUpdated() {
      this.$data.disabled = false
    },
    save() {
      // hide alerts, if present
      this.$refs.successAlert.close()
      this.$refs.errorAlert.close()
      
      // get results
      let results = {}

      this.$data.data.Strategies.forEach(element => {
        results[element.id] = this.$data.data[element.id]
      });

      // PUT settings
      fetch('http://127.0.0.1:8081/settings/text', {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(results)
      })
      .then(r => r.json())
      .then(r => {
        if (r && r.success) {
          this.$refs.successAlert.open()
        } else {
          this.$refs.errorAlert.open()
        }
      })
      .catch(() => {
        this.$refs.errorAlert.open()
      })
    }
  },
  data: function() {
    return {
      data: {},
      disabled: true
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
    .catch(() => { 

    })
  }
}
</script>