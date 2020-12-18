<template>
    <div id="text" class="container-fluid">
        <div class="row">
            <div class="col-12 col-xl-6">
                <h1>Zeitplan</h1>
                <p>
                    In welchem Zeitraum soll die Uhr laufen?
                </p>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Von</span>
                    </div>
                    <input type="number" min="0" max="23" v-model="startHour" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    <input type="number" min="0" max="59" v-model="startMinute" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    <div class="input-group-append">
                        <span class="input-group-text" id="inputGroup-sizing-default">Uhr</span>
                    </div>
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Bis</span>
                    </div>
                    <input type="number" min="0" max="24" v-model="endHour" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    <input type="number" min="0" max="59" v-model="endMinute" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    <div class="input-group-append">
                        <span class="input-group-text" id="inputGroup-sizing-default">Uhr</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button type="submit" @click="submitData" class="btn btn-primary">Speichern</button>
            </div>
        </div>
    </div>
</template>

<script>
import { baseUri } from '@/util/api'

export default {
    data() {
        return {
            startHour: 0,
            endHour: 24,
            startMinute: 0,
            endMinute: 0
        }
    },
    methods: {
        submitData() {
            const result = []
            for (let i = 0; i < 7; i += 1) {
                result.push({
                    startDay: i,
                    startTime: { h: parseInt(this.$data.startHour), m: parseInt(this.$data.startMinute), s: 0 },
                    endDay: i,
                    endTime: { h: parseInt(this.$data.endHour), m: parseInt(this.$data.endMinute), s: 0 },
                    color: null,
                    brightness: false
                })
            }

            fetch(baseUri + '/settings/schedule', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result)
            })
        }
    }
}
</script>
