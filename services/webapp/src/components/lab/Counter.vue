<template>
  <div>
    <v-btn
      @click="DECREMENT_COUNTER"
    >
      -
    </v-btn>
    <span class="pa-6">{{ lab.count }}</span>
    <v-btn
      @click="INCREMENT_COUNTER"
    >
      +
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Counter',
  computed: {
    ...mapGetters('lab', [
      'count'
    ]),
    ...mapState('lab', [
      'lab'
    ])
  },
  methods: {
    ...mapMutations('lab', [
      'INCREMENT_COUNTER',
      'DECREMENT_COUNTER'
    ])
  }
}
</script>
