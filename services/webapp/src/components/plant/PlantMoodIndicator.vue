<template>
  <div>
    <v-icon
      v-if="plantIsHappy"
      color="primary"
    >
      mdi-emoticon-excited-outline
    </v-icon>
    <v-icon
      v-else
      color="error"
    >
      mdi-emoticon-sad-outline
    </v-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PlantMoodIndicator',
  props: {
    plantIsHappy: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters('theme', [
      'iconMap'
    ])
  }
}
</script>
