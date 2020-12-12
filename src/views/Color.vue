<template>
    <div id="colorSettings" class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Farbeinstellungen</h1>
            </div>
            <div class="col-lg-6 col-12">
                <p>
                    Hier können die Farbwerte der Uhr eingestellt werden.
                </p>
                <uu-alert type="error" ref="readError">
                    <p>Die aktuellen Einstellungen der Uhr konnten nicht gelesen werden. Das Speichern
                    der Einstellungen wurde deswegen deaktiviert.</p>
                    <p>{{ readError }}</p>
                </uu-alert>
            </div>
        </div>

        <div class="row spacer-bottom">
            <div class="col-lg-6 col-12">
                <h3>Gesamte Uhr</h3>
                <div class="container">
                    <div class="row">
                        <div class="col-9">
                            <uu-clock :color="color"></uu-clock>
                        </div>
                        <div class="col-3">
                            <div id="colorPickerClock"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row spacer-bottom">
            <div class="col-lg-6 col-12">
                <h3>Individuelle LEDs</h3>
                <form>
                <div class="form group">
                    <label for="ledSelector">LED Nummer</label>
                    <select id="ledSelector" class="form-control" v-model="selectedLed">
                        <option disabled value="-1">Bitte LED auswählen</option>
                        <option v-for="(v, k) in data" :key="k">
                            {{ k }}
                        </option>
                    </select><br>
                    <p v-if="selectedLed >= 0">Die LED mit der Nummer {{ selectedLed }} hat die Farbe {{ '#' + data[selectedLed].toString(16) }}</p>
                    <button type="submit" :disabled="disabled" class="btn btn-primary mb-2">Speichern</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
import Clock from '@/components/Clock.vue'
import Alert from '@/components/Alert.vue'
import { baseUri } from '@/util/api'
const AColorPicker = require('a-color-picker')

export default {
    components: {
        'uu-clock': Clock,
        'uu-alert': Alert
    },
    data() {
        return {
            data: {},
            selectedLed: -1,
            color: '#ffffff',
            disabled: false,
            readError: ''
        }
    },
    methods: {
        globalColorChanged(picker) {
            let newColor = parseInt(picker.color.substring(1), 16)

            for (const key in this.$data.data) {
                if (Object.prototype.hasOwnProperty.call(this.$data.data, key)) {
                    this.$data.data[key] = newColor
                }
            }

            this.$data.color = newColor
        },
        getMajorityColor(colors) {
            let counter = {}
            let max = null

            for (const key in colors) {
                if (Object.prototype.hasOwnProperty.call(colors, key)) {
                    let color = colors[key];
                    
                    if (!counter[color]) {
                        counter[color] = 0
                    }

                    counter[color] += 1

                    if (max == null || counter[color] > counter[max]) {
                        max = color
                    }
                }
            }

            return max
        }
    },
    mounted() {
        let component = this

        fetch(baseUri + '/settings/color')
        .then(x => x.json())
        .then(resp => {
            component.data = resp
            this.$data.color = '#' + component.getMajorityColor(resp).toString(16)

            component._colorPicker = AColorPicker.createPicker('#colorPickerClock', {
                showHSL: false,
                showRGB: true,
                showHEX: true,
                showAlpha: false,
                color: this.$data.color,
                palette: 'PALETTE_MATERIAL_CHROME',
                paletteEditable: false,
                useAlphaInPalette: false
            })

            component._colorPicker.on('change', component.globalColorChanged)
        })
        .catch((e) => { 
            component.$refs.readError.open()
            component.$data.disabled = true
            component.$data.readError = e
        })
    },
    beforeDestroy() {
        this._colorPicker.off('change', this.globalColorChanged)
    }
}
</script>

<style scoped>
.spacer-bottom {
    margin-bottom: 1rem;
}
</style>
