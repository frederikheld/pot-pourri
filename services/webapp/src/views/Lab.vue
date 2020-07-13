<template>
  <div>
    <AppBar
      title="Lab"
    />

    <v-container>
      <v-btn to="lab/lab-settings">
        Settings Lab
      </v-btn>
      <h1>Chart Test</h1>
      <ChartTest
        id="chart"
        :chart-data="chartTestData"
      />

      <h1>Vuex Test</h1>
      <Counter class="my-4" />
      <CounterDirect class="my-4" />

      <h1>MQTT Tests</h1>
      <LastMQTTMessage />

      <h1>Loading Indicators</h1>

      <div>
        <h2>type="inline"</h2>

        <p>
          In enim justo <LoadingIndicator type="inline" />, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
          dictum felis eu pede mollis <LoadingIndicator type="inline" /> pretium. Integer tincidunt. Cras dapibus.
          Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
        </p>
      </div>

      <div style="display: block; width: 100%; float: left;">
        <h2>type="box"</h2>
        <div style="height: 6rem; width: 50%; background: #ccf; float: left;">
          <LoadingIndicator type="box" />
        </div>
        <div style="height: 4rem; width: 20%; background: #fcc; float: left;">
          <LoadingIndicator type="box" />
        </div>
      </div>

      <div>
        <h2>type="page"</h2>
        <v-btn @click="showPageLoadingIndicator()">
          Show for 5 seconds
        </v-btn>
        <LoadingIndicator
          v-if="pageLoadingIndicatorActive"
          type="page"
          style="background: red;"
        />
      </div>

      <div>
        <h2>type="viewport"</h2>
        <v-btn
          @click="showViewportLoadingIndicator()"
        >
          Show for 5 seconds
        </v-btn>
        <LoadingIndicator
          v-if="viewportLoadingIndicatorActive"
          type="viewport"
          style="background: blue;"
        />
      </div>
      <h1>Scroll Test</h1>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.
        </p>

        <p>
          Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget, arcu.
        </p>

        <p>
          In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
          dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
          Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
        </p>

        <p>
          Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
          Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
        </p>

        <p>
          Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
          ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
          eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
          sem neque sed ipsum.
        </p>

        <p>
          Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
          Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero
          venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros
          faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec
          sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue
          velit cursus nunc,
        </p>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.
        </p>

        <p>
          Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget, arcu.
        </p>

        <p>
          Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
          Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
        </p>

        <p>
          Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
          ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
          eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
          sem neque sed ipsum.
        </p>

        <p>
          Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
          Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero
          venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros
          faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec
          sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue
          velit cursus nunc,
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.
        </p>

        <p>
          Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget, arcu.
        </p>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
#chart {
  margin: 1rem 0;
}
</style>

<script>
import AppBar from '@/components/AppBar.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ChartTest from '@/components/lab/ChartTest.vue'
import Counter from '@/components/lab/Counter.vue'
import CounterDirect from '@/components/lab/CounterDirect.vue'
import LastMQTTMessage from '@/components/lab/LastMQTTMessage.vue'

export default {
  name: 'Lab',
  components: { AppBar, ChartTest, Counter, CounterDirect, LastMQTTMessage, LoadingIndicator },

  data () {
    return {
      chartTestData: this.generateRandomDataPoints(5),
      pageLoadingIndicatorActive: false,
      viewportLoadingIndicatorActive: false
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
    },
    showPageLoadingIndicator () {
      this.pageLoadingIndicatorActive = true
      setTimeout(() => {
        this.pageLoadingIndicatorActive = false
      }, 5000)
    },
    showViewportLoadingIndicator () {
      this.viewportLoadingIndicatorActive = true
      setTimeout(() => {
        this.viewportLoadingIndicatorActive = false
      }, 5000)
    }
  }
}
</script>
