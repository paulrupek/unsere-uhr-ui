<template>
    <div class="container clock">
        <div class="row no-gutters firstRow">
            <div class="col-1">&#9679;</div>
            <div class="col-10"></div>
            <div class="col-1">&#9679;</div>
        </div>
        <div class="row no-gutters">
            <div class="col-1"></div>
            <div class="col-10">
                <div class="container clockContainer">
                    <div class="row no-gutters">
                        <div class="col" id="referenceNode">E</div>
                        <div class="col">S</div>
                        <div class="col">K</div>
                        <div class="col">I</div>
                        <div class="col">S</div>
                        <div class="col">T</div>
                        <div class="col">A</div>
                        <div class="col">F</div>
                        <div class="col">Ü</div>
                        <div class="col">N</div>
                        <div class="col">F</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col">Z</div>
                        <div class="col">E</div>
                        <div class="col">H</div>
                        <div class="col">N</div>
                        <div class="col">Z</div>
                        <div class="col">W</div>
                        <div class="col">A</div>
                        <div class="col">N</div>
                        <div class="col">Z</div>
                        <div class="col">I</div>
                        <div class="col">G</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col">D</div>
                        <div class="col">R</div>
                        <div class="col">E</div>
                        <div class="col">I</div>
                        <div class="col">V</div>
                        <div class="col">I</div>
                        <div class="col">E</div>
                        <div class="col">R</div>
                        <div class="col">T</div>
                        <div class="col">E</div>
                        <div class="col">L</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col">V</div>
                        <div class="col">O</div>
                        <div class="col">R</div>
                        <div class="col">F</div>
                        <div class="col">U</div>
                        <div class="col">N</div>
                        <div class="col">K</div>
                        <div class="col">N</div>
                        <div class="col">A</div>
                        <div class="col">C</div>
                        <div class="col">H</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col">H</div>
                        <div class="col">A</div>
                        <div class="col">L</div>
                        <div class="col">B</div>
                        <div class="col">A</div>
                        <div class="col">E</div>
                        <div class="col">L</div>
                        <div class="col">F</div>
                        <div class="col">Ü</div>
                        <div class="col">N</div>
                        <div class="col">F</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col">E</div>
                        <div class="col">I</div>
                        <div class="col">N</div>
                        <div class="col">S</div>
                        <div class="col">X</div>
                        <div class="col">A</div>
                        <div class="col">M</div>
                        <div class="col">Z</div>
                        <div class="col">W</div>
                        <div class="col">E</div>
                        <div class="col">I</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col">D</div>
                        <div class="col">R</div>
                        <div class="col">E</div>
                        <div class="col">I</div>
                        <div class="col">P</div>
                        <div class="col">M</div>
                        <div class="col">J</div>
                        <div class="col">V</div>
                        <div class="col">I</div>
                        <div class="col">E</div>
                        <div class="col">R</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col">S</div>
                        <div class="col">E</div>
                        <div class="col">C</div>
                        <div class="col">H</div>
                        <div class="col">S</div>
                        <div class="col">N</div>
                        <div class="col">L</div>
                        <div class="col">A</div>
                        <div class="col">C</div>
                        <div class="col">H</div>
                        <div class="col">T</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col">S</div>
                        <div class="col">I</div>
                        <div class="col">E</div>
                        <div class="col">B</div>
                        <div class="col">E</div>
                        <div class="col">N</div>
                        <div class="col">Z</div>
                        <div class="col">W</div>
                        <div class="col">Ö</div>
                        <div class="col">L</div>
                        <div class="col">F</div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col">Z</div>
                        <div class="col">E</div>
                        <div class="col">H</div>
                        <div class="col">N</div>
                        <div class="col">E</div>
                        <div class="col">U</div>
                        <div class="col">N</div>
                        <div class="col">K</div>
                        <div class="col">U</div>
                        <div class="col">H</div>
                        <div class="col">R</div>
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
        <div class="row no-gutters lastRow">
            <div class="col-1">&#9679;</div>
            <div class="col-10"></div>
            <div class="col-1">&#9679;</div>
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
let nodes = null
let reference = null

function resizeBehaviour() {
    if (!nodes || !reference) {
        nodes = document.querySelectorAll('.clock .clockContainer .row, .clock .firstRow, .clock .lastRow')
        reference = document.getElementById('referenceNode')
    }
    
    nodes.forEach(x => {
        x.style.height = reference.offsetWidth + 'px'
        x.style.lineHeight = reference.offsetWidth + 'px'
    })
}

export default {
    props: {
        leds: Array,
        configuration: Object
    },
    mounted() {
        window.addEventListener('resize', resizeBehaviour)
        resizeBehaviour()
    },
    beforeDestroy() {
        window.removeEventListener('resize', resizeBehaviour)
    }
}
</script>
