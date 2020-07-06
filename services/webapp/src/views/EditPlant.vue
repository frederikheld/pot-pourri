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
              <v-img
                :src="plantPicture"
                aspect-ratio="2"
                max-height="12rem"
              >
                <!-- <v-btn
                  icon
                  class="center-box"
                >
                  <v-icon
                    color="white"
                    x-large
                  >
                    mdi-camera
                  </v-icon>
                </v-btn> -->
                <v-file-input
                  v-model="form.picture"
                  prepend-icon="mdi-camera"
                  accept="image/png, image/jpeg, image/jpg"
                  hide-input
                  light
                  class="center-box"
                  style="color: #fff;"
                  @change="previewPicture"
                />
              </v-img>
            </v-row>
          </v-col>
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

<style lang="scss" scoped>
.center-box {
  display: block;
  position: relative;
  width: 24px;
  height: 24px;
  left: calc(50% - 12px);
  top: calc(50% - 12px);
  transition: transform .2s;
}

.center-box:hover {
  transform: scale(1.1);
}
</style>

<script>
import AppBar from '@/components/AppBar.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import * as blueimpLoadImage from 'blueimp-load-image'

import { mapGetters } from 'vuex'

export default {
  name: 'EditPlant',
  components: { AppBar, LoadingIndicator },
  data () {
    return {
      fetchingPlant: false,
      savingPlant: false,
      plant: {},
      plantPicture: 'https://images.pexels.com/photos/4505146/pexels-photo-4505146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      plantPictureRaw: null,
      form: {
        picture: undefined,
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
    await this.fetchPlantProfile()

    this.initializeForm()
  },
  methods: {
    initializeForm () {
      this.form.id = this.plant.id
      this.form.name = this.plant.name
    },
    async fetchPlantProfile () {
      // fetch plant meta:
      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id

      const options = {
        method: 'GET',
        accept: 'application/json'
      }

      try {
        const res = await fetch(url, options)
        const plant = await res.json()
        this.plant = plant
      } catch (err) {
        console.error(err)
      }

      // fetch profile picture:
      const url2 = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id + '/profile-picture'

      const options2 = {
        method: 'GET',
        headers: {
          Accept: 'image/png, image/jpg, image/jpeg'
        }
      }

      try {
        const res2 = await fetch(url2, options2)
        const plantPictureRaw = await res2.blob()
        this.plantPictureRaw = plantPictureRaw
        this.plantPicture = URL.createObjectURL(plantPictureRaw)
      } catch (err) {
        console.error(err)
      }

      this.fetchingPlant = false
    },
    previewPicture (data) {
      blueimpLoadImage(
        data,
        (image) => {
          this.plantPicture = image.toDataURL()
        },
        {
          meta: true,
          orientation: true,
          canvas: true
        })
    },
    async onSubmit () {
      this.savingPlant = true
      await this.updatePlant(this.plant)
      // await this.updateProfilePicture(this.plant, this.plantPictureRaw)
      await this.updateProfilePicture(this.plant, this.form.picture)
      this.savingPlant = false
      this.$router.replace('/plants/' + this.form.id) // forwards to new id, in case id was changed
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
        return fetch(url, options)
      } catch (err) {
        console.error(err)
      }
    },
    async updateProfilePicture (plant, profilePictureRaw) {
      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id + '/profile-picture'

      const formData = new FormData()

      formData.append('profilePicture', new Blob([profilePictureRaw], { type: 'image/jpg' }), 'somefile.jpg')

      const options = {
        method: 'PUT',
        body: formData
      }

      try {
        return fetch(url, options)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
