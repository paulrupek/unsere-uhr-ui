<template>
    <div class="optionSelect row">
        <div class="option col-md-3"
             v-for="option in options"
             v-bind:key="option.id"
             v-on:click="selectOption($event, option)">
            <div class="card" :class="{ selected: option.selected }">
                <img class="card-img-top" :src="option.thumbnail" :alt="option.title">
                <div class="card-body">
                    <h5 class="card-title">{{ option.title }}</h5>
                    <p class="card-text">{{ option.description }}</p>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    props: ['options', 'selected'],
    methods: {
        selectOption: function(e, o) {
            // todo: anti-pattern, do not mutate the parent state
            this.$props.options.forEach(element => {
                if (element.id !== o.id && element.selected) {
                    element.selected = false
                }
            });

            o.selected = true
            this.$emit('update:selected', o.id)
        }
    },
    created() {
        this.$props.options.forEach(element => {
            if (element.id === this.$props.selected) {
                element.selected = true
            }
        })
    }
}
</script>

<style scoped>
.selected {
    border: 2px blue solid;
}
</style>
