<template>
<div class="row">
    <div class="col ati">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Von</span>
            </div>
            <select v-model.number="content.startDay">
                <option disabled value="-1">Wochentag auswählen</option>
                <option value="0">Montag</option>
                <option value="1">Dienstag</option>
                <option value="2">Mittwoch</option>
                <option value="3">Donnerstag</option>
                <option value="4">Freitag</option>
                <option value="5">Samstag</option>
                <option value="6">Sonntag</option>
            </select>
            <input type="number" min="0" max="23" v-model.number="content.startTime.h" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            <input type="number" min="0" max="59" v-model.number="content.startTime.m" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            <div class="input-group-append">
                <span class="input-group-text" id="inputGroup-sizing-default">Uhr</span>
            </div>
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Bis</span>
            </div>
            <select v-model.number="content.endDay">
                <option disabled value="-1">Wochentag auswählen</option>
                <option value="0">Montag</option>
                <option value="1">Dienstag</option>
                <option value="2">Mittwoch</option>
                <option value="3">Donnerstag</option>
                <option value="4">Freitag</option>
                <option value="5">Samstag</option>
                <option value="6">Sonntag</option>
            </select>
            <input type="number" min="0" max="24" v-model.number="content.endTime.h" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            <input type="number" min="0" max="59" v-model.number="content.endTime.m" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            <div class="input-group-append">
                <span class="input-group-text" id="inputGroup-sizing-default">Uhr</span>
            </div>
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input v-model="content.isFixedBrightness" class="helligkeitcheckbox" type="checkbox" aria-label="Checkbox for following text input"> 
                    Feste Helligkeit?
                </div>
            </div>
            <input v-model="content.brightness" :disabled="!content.isFixedBrightness" type="text" class="form-control" aria-label="Text input with checkbox">
            <button @click.prevent="deleteItem" class="btn btn-danger">Eintrag entfernen</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'active-time-item',
    props: {
        value: Object
    },
    computed: {
        content: {
            get() {
                return this.$props.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {
        deleteItem() {
            this.$emit('delete', this.$props.value)
        }
    }
}
</script>

<style lang="scss">
.ati {
    border: rgb(50, 50, 50) dotted 1px;
    padding: 1rem;
    margin-bottom: 1rem;
    margin-left: 1rem !important;
}

.helligkeitcheckbox {
    margin-right: 1rem;
}
</style>
