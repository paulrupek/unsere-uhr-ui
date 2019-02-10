<template>
  <div class="container">
    <uu-options v-bind:options="options" v-bind:selected.sync="selected" />
    <div class="row">
      {{ selected }}
    </div>
    <div class="row">
      <uu-text />
    </div>
  </div>
</template>

<script>
import Text from '@/components/Text.vue'
import OptionSelect from '@/components/OptionSelect.vue'

export default {
  name: 'text',
  components: {
    'uu-text': Text,
    'uu-options': OptionSelect
  },
  data: function() {
    return {
      options: [{
        id: "ID_A", title: "Id A", thumbnail: "/img/icons/apple-touch-icon-180x180.png", description: "description", selected: false
      },
      {
        id: "ID_B", title: "Id B", thumbnail: "/img/icons/apple-touch-icon-180x180.png", description: "description", selected: false
      },
      {
        id: "ID_C", title: "Id C", thumbnail: "/img/icons/apple-touch-icon-180x180.png", description: "description", selected: false
      }],
      selected: 'ID_B'
    }
  }
}
</script>