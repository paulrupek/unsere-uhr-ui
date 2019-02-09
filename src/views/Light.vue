<template>
  <div class="light">
    <uu-light />
  </div>
</template>

<script>
// @ is an alias to /src
import Light from '@/components/Light.vue'

export default {
  name: 'light',
  components: {
    'uu-light': Light
  }
}
</script>