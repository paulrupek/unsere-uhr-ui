<template>
    <div v-if="active" class="alert alert-dismissible fade show" :class="classObject" role="alert">
    <slot></slot>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
export default {
    props: ['type'],
    data: function() {
        return {
            active: false
        }
    },
    computed: {
        classObject: function () {
            return {
                'alert-success': this.$props.type === 'success',
                'alert-warning': this.$props.type === 'warning',
                'alert-error': this.$props.type === 'error'
            }
        }
    },
    methods: {
        close() {
            this.$data.active = false
        },
        open() {
            this.$data.active = true
        }
    }
}
</script>
