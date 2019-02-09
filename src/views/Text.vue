<template>
  <div class="text">
    <uu-text />
  </div>
</template>

<script>
// @ is an alias to /src
import Text from '@/components/Text.vue'

export default {
  name: 'text',
  components: {
    'uu-text': Text
  }
}
</script>