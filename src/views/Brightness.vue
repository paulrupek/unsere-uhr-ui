<template>
    <div id="brightness" class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Helligkeit</h1>
            </div>
            <div class="col-12">
                <p>
                    Hier kann konfiguriert werden wie die Uhr die aktuelle Helligkeit bestimmt.
                </p>
            </div>

            <div class="col-12 col-md-8 col-xl-7 col-xxl-5">
                <uu-alert type="error" ref="readError">
                    Die aktuellen Einstellungen der Uhr konnten nicht gelesen werden.
                    Das Speichern wurde sicherheitshalber deaktiviert.
                </uu-alert>
                <uu-alert type="success" ref="successAlert">
                    Die Einstellungen wurden erfolgreich angepasst.
                </uu-alert>
                <uu-alert type="error" ref="errorAlert">
                    Ein Fehler ist beim Speichern aufgetreten.
                </uu-alert>
                <form action="#">
                    <div class="form-group"><label for="strategy"></label>
                        <label for="strategy">Strategie</label>
                        <select id="strategy" class="form-control" v-model="data.strategy">
                            <option v-for="(v, k) in data.strategies" :key="k">{{ v }}</option>
                        </select>
                    </div>
                    <div v-if="data.strategy === 'FIXED_VALUE'" class="form-group">
                        <label for="fixedValueStrategy">Helligkeit</label>
                        <input id="fixedValueStrategy" class="form-control" v-model.number="data.fixedValue" type="number" min="0" max="100">
                        <small id="fixedValueStrategyHelp" class="form-text text-muted">Bitte einen Helligkeitswert zwischen 0 und 100 erfassen.</small>
                    </div>

                    <div v-if="data.strategy === 'SCHEDULE' || data.strategy === 'SCHEDULE_AMBIENT'" class="form-group">
                        <div class="alert alert-warning" role="alert">
                           Dieses Feature ist leider noch nicht implementiert.
                        </div>
                    </div>
                    <button type="submit" @click="submitData" :disabled="disabled" class="btn btn-primary">Speichern</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from '@/components/Alert.vue'
import { baseUri } from '@/util/api'

export default {
    components: {
        'uu-alert': Alert
    },
    data() {
        return {
            data: {},
            disabled: false
        }
    },
    methods: {
        submitData(e) {
            e.preventDefault()

            // hide alerts, if present
            this.$refs.successAlert.close()
            this.$refs.errorAlert.close()

            // PUT data
            fetch(baseUri + '/settings/brightness', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.$data.data)
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
    mounted() {
        let component = this

        fetch(baseUri + '/settings/brightness', {
            
        })
        .then(x => x.json())
        .then(resp => {
            component.$data.data = resp
        })
        .catch(() => { 
            component.$refs.readError.open()
            component.$data.disabled = true
        })
    }
}
</script>
