<template>
    <div id="colorSettings container">
        <div class="row">
            <div class="col-12">
                <h1>Farbeinstellungen</h1>
            </div>
            <div class="col-lg-6 col-12">
                <p>
                    Hier können die Farbwerte der Uhr eingestellt werden.
                </p>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 col-12">
                <h3>Gesamte Uhr</h3>
                <div id="colorPickerClock"></div>
            </div>
        </div>

        <div class="row">
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
                    <p v-if="selectedLed >= 0">Die LED mit der Nummer {{ selectedLed }} hat die Farbe {{ data[selectedLed] }}</p>
                    <button type="submit" class="btn btn-primary mb-2">Speichern</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
const AColorPicker = require('a-color-picker')

export default {
    data() {
        return {
            data: {},
            selectedLed: -1
        }
    },
    methods: {
        globalColorChanged(picker, color) {
            let newColor = parseInt(picker.color.substring(1), 16)

            for (const key in this.$data.data) {
                if (this.$data.data.hasOwnProperty(key)) {
                    this.$data.data[key] = newColor
                }
            }
        },
        getMajorityColor(colors) {
            let counter = {}
            let max = null

            for (const key in colors) {
                if (colors.hasOwnProperty(key)) {
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

        fetch('http://127.0.0.1:8081/settings/color', {
            
        })
        .then(x => x.json())
        .then(resp => {
            component.data = resp

            component._colorPicker = AColorPicker.createPicker('#colorPickerClock', {
                showHSL: false,
                showRGB: true,
                showHEX: true,
                showAlpha: false,
                color: '#' + component.getMajorityColor(resp).toString(16),
                palette: 'PALETTE_MATERIAL_CHROME',
                paletteEditable: false,
                useAlphaInPalette: false
            })

            component._colorPicker.on('change', component.globalColorChanged)
        })
        .catch((e) => { 
            console.log(e)
        })
    },
    beforeDestroy() {
        this._colorPicker.off('change', this.globalColorChanged)
    }
}
</script>
