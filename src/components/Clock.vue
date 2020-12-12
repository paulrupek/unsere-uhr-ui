<template>
    <div class="container clock">
        <div class="row no-gutters firstRow">
            <div class="col-1 undEins">&#9679;</div>
            <div class="col-10"></div>
            <div class="col-1 undZwei">&#9679;</div>
        </div>
        <div class="row no-gutters">
            <div class="col-1"></div>
            <div class="col-10">
                <div class="container clockContainer">
                    <div class="row no-gutters">
                        <div class="col esIst" id="referenceNode">E</div>
                        <div class="col esIst">S</div>
                        <div class="col">K</div>
                        <div class="col esIst">I</div>
                        <div class="col esIst">S</div>
                        <div class="col esIst">T</div>
                        <div class="col">A</div>
                        <div class="col mFuenf">F</div>
                        <div class="col mFuenf">Ü</div>
                        <div class="col mFuenf">N</div>
                        <div class="col mFuenf">F</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col mZehn">Z</div>
                        <div class="col mZehn">E</div>
                        <div class="col mZehn">H</div>
                        <div class="col mZehn">N</div>
                        <div class="col mZwanzig">Z</div>
                        <div class="col mZwanzig">W</div>
                        <div class="col mZwanzig">A</div>
                        <div class="col mZwanzig">N</div>
                        <div class="col mZwanzig">Z</div>
                        <div class="col mZwanzig">I</div>
                        <div class="col mZwanzig">G</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col dreiviertel">D</div>
                        <div class="col dreiviertel">R</div>
                        <div class="col dreiviertel">E</div>
                        <div class="col dreiviertel">I</div>
                        <div class="col viertel dreiviertel">V</div>
                        <div class="col viertel dreiviertel">I</div>
                        <div class="col viertel dreiviertel">E</div>
                        <div class="col viertel dreiviertel">R</div>
                        <div class="col viertel dreiviertel">T</div>
                        <div class="col viertel dreiviertel">E</div>
                        <div class="col viertel dreiviertel">L</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col vor">V</div>
                        <div class="col vor">O</div>
                        <div class="col vor">R</div>
                        <div class="col">F</div>
                        <div class="col">U</div>
                        <div class="col">N</div>
                        <div class="col">K</div>
                        <div class="col nach">N</div>
                        <div class="col nach">A</div>
                        <div class="col nach">C</div>
                        <div class="col nach">H</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col halb">H</div>
                        <div class="col halb">A</div>
                        <div class="col halb">L</div>
                        <div class="col halb">B</div>
                        <div class="col">A</div>
                        <div class="col elf">E</div>
                        <div class="col elf">L</div>
                        <div class="col fuenf elf">F</div>
                        <div class="col fuenf">Ü</div>
                        <div class="col fuenf">N</div>
                        <div class="col fuenf">F</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col ein eins">E</div>
                        <div class="col ein eins">I</div>
                        <div class="col ein eins">N</div>
                        <div class="col eins">S</div>
                        <div class="col">X</div>
                        <div class="col">Ä</div>
                        <div class="col">M</div>
                        <div class="col zwei">Z</div>
                        <div class="col zwei">W</div>
                        <div class="col zwei">E</div>
                        <div class="col zwei">I</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col drei">D</div>
                        <div class="col drei">R</div>
                        <div class="col drei">E</div>
                        <div class="col drei">I</div>
                        <div class="col">A</div>
                        <div class="col">U</div>
                        <div class="col">J</div>
                        <div class="col vier">V</div>
                        <div class="col vier">I</div>
                        <div class="col vier">E</div>
                        <div class="col vier">R</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col sechs">S</div>
                        <div class="col sechs">E</div>
                        <div class="col sechs">C</div>
                        <div class="col sechs">H</div>
                        <div class="col sechs">S</div>
                        <div class="col">N</div>
                        <div class="col">L</div>
                        <div class="col acht">A</div>
                        <div class="col acht">C</div>
                        <div class="col acht">H</div>
                        <div class="col acht">T</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col sieben">S</div>
                        <div class="col sieben">I</div>
                        <div class="col sieben">E</div>
                        <div class="col sieben">B</div>
                        <div class="col sieben">E</div>
                        <div class="col sieben">N</div>
                        <div class="col zwoelf">Z</div>
                        <div class="col zwoelf">W</div>
                        <div class="col zwoelf">Ö</div>
                        <div class="col zwoelf">L</div>
                        <div class="col zwoelf">F</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col zehn">Z</div>
                        <div class="col zehn">E</div>
                        <div class="col zehn">H</div>
                        <div class="col neun zehn">N</div>
                        <div class="col neun">E</div>
                        <div class="col neun">U</div>
                        <div class="col neun">N</div>
                        <div class="col">K</div>
                        <div class="col uhr">U</div>
                        <div class="col uhr">H</div>
                        <div class="col uhr">R</div>
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
        <div class="row no-gutters lastRow">
            <div class="col-1 undVier">&#9679;</div>
            <div class="col-10"></div>
            <div class="col-1 undDrei">&#9679;</div>
        </div>
    </div>
</template>

<style scoped>
.col, .col-1 {
    text-align: center;
    vertical-align: middle;
    height: 100%;
}

div.clock > div.row {
    background: black;
}
</style>

<script>
const initialColor = '#2c3e50'

function resizeBehaviour() {
    const nodes = document.querySelectorAll('.clock .clockContainer .row, .clock .firstRow, .clock .lastRow')
    const reference = document.getElementById('referenceNode')
    
    nodes.forEach(x => {
        x.style.height = reference.offsetWidth + 'px'
        x.style.lineHeight = reference.offsetWidth + 'px'
    })
}

function toQueryString(classes) {
    return classes && classes.map ? classes.map(x => `.${x}`).join(', ') : null
}

export default {
    props: {
        leds: [Object, Array],
        configuration: Object,
        color: Number
    },
    computed: {
        activeClasses: function () {
            if (!this.leds || !this.configuration) {
                return ""
            }

            const result = []

            for (const key in this.configuration) {
                if (Object.prototype.hasOwnProperty.call(this.configuration, key)) {
                    const element = this.configuration[key];
                
                    if (element.every(idx => this.leds[idx] > 0)) {
                        result.push(key)
                    }

                }
            }

            return result
        }
    },
    mounted() {
        window.addEventListener('resize', resizeBehaviour)
        resizeBehaviour()
        
        this.$watch('activeClasses', (newValue, oldValue) => {
            document.querySelectorAll(toQueryString(oldValue)).forEach(x => x.style.color = initialColor)
            document.querySelectorAll(toQueryString(newValue)).forEach(x => x.style.color = 'white')
        })

        this.$watch('color', (newValue) => {
            document.querySelectorAll('.clock .col, .clock .col-1').forEach(x => x.style.color = `#${newValue.toString(16)}`)
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', resizeBehaviour)
    }
}
</script>
