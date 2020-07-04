<template>
  <div>
    <v-btn
      @click="decrementCounter"
    >
      -
    </v-btn>
    <span class="pa-6">{{ countDirect }}</span>
    <v-btn
      @click="incrementCounter"
    >
      +
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CounterDirect',
  computed: {
    countDirect: function () {
      return this.$store.state.lab.countDirect
    }
  },
  methods: {
    incrementCounter () {
      this.$store.state.lab.countDirect++
    },
    decrementCounter () {
      this.$store.state.lab.countDirect--
    }
  }
}
</script>
