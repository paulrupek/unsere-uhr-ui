<template>
  <div class="color">
    <uu-color />
  </div>
</template>

<script>
// @ is an alias to /src
import Color from '@/components/Color.vue'

export default {
  name: 'color',
  components: {
    'uu-color': Color
  }
}
</script>