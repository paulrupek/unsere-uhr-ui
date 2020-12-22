<template>
    <div id="text" class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Umgebungslicht</h1>
                <p>
                    Hier kann der Umgebungslichtsensor und dessen Einfluss auf
                    die Helligkeit der LED-Anzeige eingestellt werden. Dabei 
                    werden die Helligkeitswerte einer einstellbaren Zeitspanne
                    aufgezeichnet. Aus diesen Werten wird ein gewichteter Durchschnitt
                    berechnet und anschließend auf einen Wert zwischen 0 und 1 skaliert.
                    Folgende Werte sind bei der Berechnung von Bedeutung:
                </p>
            </div>
            <div class="col-12 col-md-10 col-lg-12 col-xl-9 col-xxl-6">
                <h3>Einstellungen</h3>
                <uu-alert type="error" ref="errorReadAlert">
                    Die aktuellen Einstellungen der Uhr konnten nicht gelesen werden. Das Speichern
                    der Einstellungen wurde deswegen deaktiviert. 
                </uu-alert>
                <form action="#">
                    <div class="form-group">
                        <label for="timeSpan">Zeitspanne</label>
                        <input id="timeSpan" class="form-control" v-model.number="data.timeSpan" type="number" min="1" max="60">
                        <small id="timeSpanHelp" class="form-text text-muted">Erfassung in Minuten. Der Standardwert beträgt 5 Minuten.</small>
                    </div>
                    <div class="form-group">
                        <label for="readInterval">Leseintervall</label>
                        <input id="readInterval" class="form-control" v-model.number="data.readInterval" type="number" min="50" step="10" disabled>
                        <small id="readIntervalHelp" class="form-text text-muted">Erfassung in Millisekunden. Der Standardwert beträgt 100ms.</small>
                    </div>
                    <div class="form-group">
                        <label for="minimum">Minimum</label>
                        <input id="minimum" class="form-control" v-model.number="data.minimum" type="number" min="0" max="1" step="0.05">
                        <small id="minimumHelp" class="form-text text-muted">Der Standardwert beträgt 0.0.</small>
                    </div>
                    <div class="form-group">
                        <label for="maximum">Maximum</label>
                        <input id="maximum" class="form-control" v-model.number="data.maximum" type="number" min="0" max="1" step="0.05">
                        <small id="maximumHelp" class="form-text text-muted">Der Standardwert beträgt 0.5.</small>
                    </div>
                    <uu-alert type="success" ref="successAlert">
                        Die Einstellungen wurden erfolgreich angepasst.
                    </uu-alert>
                    <uu-alert type="error" ref="errorAlert">
                        Ein Fehler ist beim Speichern aufgetreten.
                    </uu-alert>
                    <button type="submit" @click="submitData" :disabled="disabled" class="btn btn-primary">Speichern</button>
                    <br><br>
                </form>
            </div>
            <div class="col-12 col-xl-9 col-xxl-6">
                <h3>Erläuterungen</h3>
                <p>
                    <ul>
                        <li>
                            <strong>Zeitspanne</strong><br />
                            Dieser Wert legt fest welches Zeitfenster für die Berechnung
                            berücksichtigt wird. Größere Werte bewirken eine höhere Verzögerung
                            bei der Anpassung an das Umgebungslicht. Kleinere Werte hingegen
                            können hingegen ein Flackern der Helligkeit bewirken. Werte zwischen
                            zwei und fünf Minuten sollten in den meisten Fällen ausreichen. Dieser
                            Wert wird in Minuten erfasst.
                        </li>
                        <li>
                            <strong>Leseintervall</strong><br />
                            Reguliert die Häufigkeit mit welcher der Helligkeitssensor gelesen wird.
                            Der Wert wird in Millisekunden erfasst. Bei zu geringen Werten kann es sein,
                            dass die Hardware nicht hinterher kommt. Zu beachten ist auch, dass
                            dies die Menge an Messpunkten die vorliegen steuert.
                        </li>
                        <li>
                            <strong>Minimum</strong><br />
                            Der Sensor liefert theoretisch Werte zwischen 0 und 1, was jedoch durch verschiedene 
                            Faktoren beeinflusst werden kann. Deswegen wird der tatsächliche Wert zwischen einer
                            oberen und einer unteren Schranke skaliert. Beispielsweise kann es sein, dass es zwar 
                            Restlicht im Zimmer gibt, ihr aber dennoch auf die geringste Helligkeitsstufe skalieren 
                            möchtet.In diesem Fall bietet es sich an diesen Wert anzuheben.
                        </li>
                        <li>
                            <strong>Maximum</strong><br />
                            Analog zum Minimum ist dies die obere Grenze für die Skalierung. Bei einigen Uhren haben
                            wir hohe Widerstände vor den Sensor gelötet, weswegen nur Werte &lt; 0.6 gelesen werden.
                            Bei anderen steht die Uhr ggfs. etwas schattiger oder der Sensor wird leicht verdeckt. 
                        </li>
                    </ul>
                </p>


                <p>
                    Um ein Gefühl für diese Werte zu erhalten, können die tatsächlich ausgelesenen Daten analysiert werden.
                    Hierfür gibt es <router-link to="/light/sensor">gesonderte Seite</router-link>.
                </p>
                <p>
                    Zu beachten ist auch, dass der Helligkeitssensor nicht berücksichtigt wird, falls in den
                    <router-link to="/brightness">Helligkeitseinstellungen</router-link> ein fester Wert eingestellt wurde.
                </p>
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
    mounted() {
        let component = this

        fetch(baseUri + '/settings/light')
        .then(x => x.json())
        .then(resp => {
            component.$data.data = resp
        })
        .catch(() => { 
            component.$refs.errorReadAlert.open()
            component.$data.disabled = true
        })
    },
    methods: {
        submitData(e) {
            // hide alerts, if present
            this.$refs.successAlert.close()
            this.$refs.errorAlert.close()

            // PUT data
            fetch(baseUri + '/settings/light', {
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

            e.preventDefault()
        }
    }
}
</script>

<style>
li {
    margin-bottom: 0.4rem;
}
</style>
