<template>
    <div id="colorSettings">
        <h1 class="h1">Color settings</h1>
        <pre>{{ JSON.stringify(data) }}</pre>
        <h1>Strats</h1>
        <div v-for="(v, k) in data">
            {{ v }} : {{ k }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {},

        }
    },
    mounted() {
        let component = this

        fetch('http://127.0.0.1:8081/settings/color', {
            
        })
        .then(x => x.json())
        .then(resp => {
            component.data = resp
        })
        .catch(e => { console.log("error", e)})
    }
}
</script>
