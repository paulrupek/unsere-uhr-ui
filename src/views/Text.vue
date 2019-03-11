<template>
  <div class="container-fluid text-settings">
    <div class="row">
      <div class="col-12">
        <h1>Anzeigeeinstellungen</h1>
      </div>
    </div>
    <div v-for="v in data.Strategies" class="row option-row" :key="v.id">
      <h3 class="col-12">{{ v.title }}</h3>
      <span class="col-12">{{ v.description }}</span>
      <uu-options :options="v.options" 
                  :selected.sync="data[v.id]"
                  @update:selected="selectionUpdated"
                  />
    </div>
    <div class="row lastrow">
      <div class="col-12 col-lg-10 col-xl-9 col-xxl-6">
        <uu-alert type="success" ref="successAlert">
          Die Einstellungen wurden erfolgreich angepasst.
        </uu-alert>
        <uu-alert type="error" ref="errorAlert">
          Ein Fehler ist beim Speichern aufgetreten.
        </uu-alert>
        <button @click="save" type="button" class="btn btn-primary" :disabled="disabled">Save</button>
      </div>
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

<style lang="scss" scoped>
.option-row {
  background-color: #2c3e5010;
  margin-bottom: 2rem;
  padding-bottom: 2px;
}

.lastrow {
  margin-bottom: 2rem;
}

.text-settings span {
  margin-bottom: 0.6rem;
}
</style>
