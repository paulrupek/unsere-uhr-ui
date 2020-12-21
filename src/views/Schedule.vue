<template>
    <div id="text" class="container-fluid">
        <div class="row">
            <div class="col-12 col-xl-6">
                <h1>Zeitplan</h1>
            </div>
        </div>
        <div class="row">
            <div class="col col-xl-6">
                <template v-for="item in items">
                    <active-time-item :value="item" :key="item.id"></active-time-item>
                </template>
            </div>
            <div class="col col-xl-6">
                <p>
                    Hier können die Zeiten konfiguriert werden in denen die Uhr aktiv ist. In Zeiträumen, die hier nicht
                    aufgeführt sind, bleibt die Uhr dunkel. Diese Einstellungen greifen nur dann, wenn im unter 
                    <router-link to="/brightness">Helligkeit</router-link> <em>Schedule</em> als Strategie ausgewählt wurde.
                </p>
                <p>
                    Soll die Uhr beispielsweise täglich von 5 Uhr bis 22 Uhr leuchten, dann müssen 7 Elemente (eines pro Tag)
                    angelegt werden und die entsprechenden Uhrzeiten hinterlegt werden.
                </p>
                <p>
                    Standardmäßig wird die Uhr die Helligkeit abhängig vom Umgebungslicht geregelt. Hiervon kann jedoch 
                    abgewichen werden indem <em>Feste Helligkeit?</em> angehakt wird. In Kürze wird auch die Farbe der LEDs
                    pro Eintrag in dieser Konfiguration steuerbar sein.
                </p>
                <button @click.prevent="addElement" class="btn btn-outline-primary">Element hinzufügen</button>
                <button type="submit" @click.prevent="submitData" class="btn btn-primary">Speichern</button>
                <br>
                <uu-alert type="error" ref="readError">
                    Die aktuellen Einstellungen der Uhr konnten nicht gelesen werden.
                </uu-alert>
                <uu-alert type="success" ref="successAlert">
                    Die Einstellungen wurden erfolgreich angepasst.
                </uu-alert>
                <uu-alert type="error" ref="errorAlert">
                    Ein Fehler ist beim Speichern aufgetreten.
                </uu-alert>
            </div>
        </div>
    </div>
</template>

<script>
import { baseUri } from '@/util/api'
import { v4 as uuidv4 } from 'uuid'
import ActiveTimeItem from '@/components/ActiveTimeItem'
import Alert from '@/components/Alert.vue'

export default {
    name: 'schedule',
    components: {
        ActiveTimeItem,
        'uu-alert': Alert
    },
    data() {
        return {
            items: []
        }
    },
    mounted() {
        const _ = this

        fetch(baseUri + '/settings/schedule', {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(x => x.json())
        .then(x => _.$data.items = x.map(e => e.id ? e : {
            id: uuidv4(),
            ...e
        }))
        .catch(() => {
            this.$refs.readError.open()
        })
    },
    methods: {
        addElement() {
            console.log(this.$data.items[0].id)

            this.$data.items.push({
                id: uuidv4(),
                startDay: -1,
                endDay: -1,
                startTime: { h: 0, m: 0, s:0 },
                endTime: { h: 24, m: 0, s:0 },
                brightness: 60,
                color: null,
                isFixedBrightness: false
            })
        },
        submitData() {
            fetch(baseUri + '/settings/schedule', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.$data.items)
            })
            .then(() => this.$refs.successAlert.open())
            .catch(() => this.$refs.errorAlert.open())
        }
    }
}
</script>
