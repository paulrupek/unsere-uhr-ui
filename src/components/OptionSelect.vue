<template>
    <div class="container-fluid">
    <div class="optionSelect row">
        <div class="option d-sm-none col-6"
             v-for="option in opts"
             v-bind:key="'xs' + option.id"
             v-on:click="selectOption($event, option)">
             
            <div class="card" :class="{ selected: option.selected }">
                <img class="card-img-top" :src="option.thumbnail" :alt="option.title">
                <div class="card-body">
                    <h5 class="card-title">{{ option.title }}</h5>
                    <p class="card-text">{{ option.description }}</p>
                </div>
            </div>
        </div>

        <div class="option d-none d-sm-block col-sm-6 col-xxl-4"
             v-for="option in opts"
             v-bind:key="option.id"
             v-on:click="selectOption($event, option)">

            <div class="media" :class="{ selected: option.selected }">
                <img width="35%" height="35%" class="mr-3" :src="option.thumbnail" :alt="option.title">
                <div class="media-body">
                    <h6 class="mt-0">{{ option.title }}</h6>
                    <small>{{ option.description }}</small>
                </div>
            </div>
        </div>
    </div>    
    </div>

</template>

<script>
export default {
    props: ['options', 'selected'],
    data() {
        let x = []

        this.$props.options.forEach(e => {
            x.push({
                id: e.id,
                description: e.description,
                thumbnail: e.thumbnail,
                title: e.title,
                selected: false
            })
        })

        return {
            opts: x
        }
    },
    methods: {
        selectOption: function(e, o) {
            this.$data.opts.forEach(element => {
                if (element.id !== o.id && element.selected) {
                    element.selected = false
                }
            });

            o.selected = true
            this.$emit('update:selected', o.id)
        }
    },
    created() {
        this.$data.opts.forEach(element => {
            if (element.id === this.$props.selected) {
                element.selected = true
            }
        })
    }
}
</script>

<style scoped>
.selected {
    background-color: rgba(23, 212, 64, 0.308);
}

.option {
    cursor: pointer;
}

.option>div:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
