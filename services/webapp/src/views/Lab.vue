<template>
  <div>
    <h1>Chart Test</h1>
    <ChartTest :chart-data="chartTestData" />
  </div>
</template>

<script>
import ChartTest from '@/components/ChartTest.vue'

export default {
  name: 'Lab',
  components: { ChartTest },
  data () {
    return {
      chartTestData: this.generateRandomDataPoints(5)
    }
  },
  mounted () {
    setInterval(() => {
      this.chartTestData = this.generateRandomDataPoints(5)
    }, 1000)
  },
  methods: {
    generateRandomDataPoints (count) {
      const data = []
      for (let i = 0; i < count; i++) {
        data.push(Math.random())
      }
      return data
    }
  }
}
</script>
