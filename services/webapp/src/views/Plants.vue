<template>
  <div>
    <AppBar
      title="Plants"
    >
      <v-btn
        icon
        to="/plants/add"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </AppBar>

    <v-container>
      <PlantsList
        v-if="!fetchingPlants"
        :plants="plants"
      />

      <LoadingIndicator
        v-if="fetchingPlants"
        type="page"
      />

      <!-- <v-expansion-panels>
        <v-expansion-panel
          v-for="(plant, plant_id) in plants"
          :key="plant_id"
        >
          <v-expansion-panel-header>
            <span>{{ plant.plantId }}</span>
            <span><PlantStatusCompact :plant="plant" /></span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <PlantCard
              class="plant_card"
              :plant="plant"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels> -->
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
// .v-expansion-panel-header__icon {
//   display: none !important;
// }

// #btn-add-plant {
//   margin-bottom: 55px;
// }
</style>
<script>
import AppBar from '@/components/AppBar.vue'
import PlantsList from '@/components/PlantsList.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
// import PlantCard from '@/components/PlantCard.vue'
// import PlantStatusCompact from '@/components/PlantStatusCompact.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Plants',
  // components: { AppBar, PlantCard, PlantStatusCompact },
  components: { AppBar, PlantsList, LoadingIndicator },
  data () {
    return {
      plants: [],
      fetchingPlants: false
    }
  },
  computed: {
    ...mapGetters([
      'metastoreServerAddress'
    ])
  },
  // computed: {
  //   mqttLastMessage: function () {
  //     return this.$store.state.mqtt.lastMessage
  //   }
  // },
  // watch: {
  //   mqttLastMessage: function (newMessage, oldMessage) {
  //     if (newMessage !== undefined) {
  //       this.updatePlants(newMessage)
  //       return newMessage
  //     } else if (oldMessage !== undefined) {
  //       return oldMessage
  //     }

  //     return undefined
  //   }
  // },
  // methods: {
  //   updatePlants (message) {
  //     // extract plant id:
  //     const plantId = message.topic.match(/plants\/(.*)\/sensors\/.*/)[1]

  //     // compile data object:
  //     const newPlants = this.plants
  //     newPlants[plantId] = {
  //       plantId: plantId,
  //       humidity: {
  //         value: ((1024 - parseInt(message.payloadString)) / 1024) * 100,
  //         upperHealthyLimit: 70,
  //         lowerHealthyLimit: 30
  //       }
  //     }

  //     this.plants = Object.assign({}, newPlants)
  //   }
  // }
  beforeMount () {
    this.fetchingPlants = true
    this.fetchPlants()
  },
  methods: {
    async fetchPlants  () {
      const url = this.metastoreServerAddress + '/api/plants'

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const plants = await res.json()
        this.fetchingPlants = false
        this.plants = plants
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
