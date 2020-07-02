<template>
  <div>
    <AppBar
      title="Edit Plant"
      :back="'/plants/' + $route.params.id"
    />

    <v-container>
      <div v-if="!fetchingPlant">
        <v-form
          @submit.prevent
        >
          <v-col>
            <v-row>
              <v-text-field
                v-model="form.id"
                label="Unique ID of the plant"
                autofocus
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="form.name"
                label="The name you use to refer to this plant"
              />
            </v-row>
            <v-row>
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :loading="savingPlant"
                @click="onSubmit"
              >
                Save
              </v-btn>
            </v-row>
          </v-col>
        </v-form>
      </div>
      <LoadingIndicator
        v-if="fetchingPlant"
        type="page"
      />
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'EditPlant',
  components: { AppBar, LoadingIndicator },
  data () {
    return {
      fetchingPlant: false,
      savingPlant: false,
      plant: {},
      form: {
        id: undefined,
        name: undefined
      }
    }
  },
  computed: {
    ...mapGetters([
      'metastoreServerAddress'
    ])
  },
  async beforeMount () {
    this.fetchingPlant = true
    await this.fetchPlant()

    this.initializeForm()
  },
  methods: {
    initializeForm () {
      this.form.id = this.plant.id
      this.form.name = this.plant.name
    },
    async fetchPlant () {
      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const plant = await res.json()
        this.fetchingPlant = false
        this.plant = plant
      } catch (err) {
        console.log(err)
      }
    },
    onSubmit () {
      this.savingPlant = true
      this.updatePlant(this.plant)
    },
    onCancel () {
      this.$router.replace('/plants/' + this.$route.params.id)
    },
    async updatePlant (plant) {
      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.form.id,
          name: this.form.name
        })
      }

      try {
        await fetch(url, options)
        this.savingPlant = false
        this.$router.replace('/plants/' + this.form.id) // forwards to new id, in case id was changed
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
