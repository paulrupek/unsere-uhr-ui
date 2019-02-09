<template>
  <div class="about">
    <uu-brightness />
  </div>
</template>

<script>
// @ is an alias to /src
import Brightness from '@/components/Brightness.vue'

export default {
  name: 'brightness',
  components: {
    'uu-brightness': Brightness
  }
}
</script>