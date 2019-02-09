<template>
    <div id="text">
        <h1 class="h1">Light settings</h1>
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
            data: {}
        }
    },
    mounted() {
        let component = this

        fetch('http://127.0.0.1:1337/settings/light', {
            
        })
        .then(x => x.json())
        .then(resp => {
            component.data = resp
        })
        .catch(e => { console.log("error", e)})
    }
}
</script>
