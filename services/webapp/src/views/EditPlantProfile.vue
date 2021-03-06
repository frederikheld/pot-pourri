<template>
  <div>
    <AppBar
      title="Edit Plant"
      :back="'/plants/' + $route.params.id"
    />

    <v-container>
      <div v-if="!fetchingData">
        <v-form
          @submit.prevent
        >
          <v-col>
            <v-row>
              <ProfilePicture
                :src="plantPicture"
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
                  accept="image/png, image/jpeg, image/jpg"
                  prepend-icon="mdi-camera"
                  hide-input
                  light
                  class="edit-plant-profile-picture-upload-button"
                  @change="previewPicture"
                />
              </ProfilePicture>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-text-field
                ref="name"
                v-model="form.name"
                label="Plant's name"
                :rules="[name => !!name] || 'Plant\'s name is required!'"
                :error-messages="errorMessages.name"
                autofocus
                @focus="errorMessages.name = []"
              />
            </v-row>
            <v-row>
              <v-text-field
                ref="deviceCode"
                v-model="form.deviceCode"
                label="Device Code"
              />
            </v-row>
            <v-row>
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :disabled="!hasPendingEdits"
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
        v-if="fetchingData"
        type="page"
      />
    </v-container>
  </div>
</template>

<style lang="scss">
/** NOTE: I'm not using `scoped` here as this will make
 *  styling the html elements inside Vuetify components
 *  impossible (has something to do with the way Vuetify
 *  augments the class names for scoping).
 *  If you continue here, make sure, that the class names
 *  you're addressing with styles are globally unique!
 */
.edit-plant-profile-picture-upload-button {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  left: calc(50% - 1rem);
  top: calc(50% - 1rem);
  transition: transform .2s;
}

.edit-plant-profile-picture-upload-button button {
  // background-color: rgba(150, 150, 150, 0.8);
  background-color: rgba(255, 255, 255, 0.8);
  background-position: center center;
  padding: 0.4rem;
  border-radius: 50%;
}

.edit-plant-profile-picture-upload-button button:hover {
  transform: scale(1.4);
}
</style>

<script>
import AppBar from '@/components/AppBar.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ProfilePicture from '@/components/ProfilePicture.vue'

import * as blueimpLoadImage from 'blueimp-load-image'

import { mapGetters } from 'vuex'

import MetastoreConnector from '../methods/metastoreConnector'

export default {
  name: 'EditPlantProfile',
  components: { AppBar, LoadingIndicator, ProfilePicture },
  data () {
    return {
      fetchingData: false,
      savingPlant: false,
      plant: undefined,
      plantPicture: undefined,
      form: {
        name: undefined,
        plantId: undefined
      },
      errorMessages: {
        name: []
      },
      metastoreConnector: undefined
    }
  },
  computed: {
    ...mapGetters('appSettings', [
      'metastoreServerAddress'
    ]),
    hasPendingEdits () {
      const inForm = JSON.stringify(this.form)
      const inStore = JSON.stringify(this.plant)

      return inForm !== inStore
    }
  },
  beforeMount () {
    this.metastoreConnector = new MetastoreConnector(this.metastoreServerAddress)

    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.fetchingData = true

      this.plant = await this.metastoreConnector.fetchPlant(this.$route.params.id)

      this.plantPicture = await this.metastoreConnector.fetchPlantProfilePicture(this.$route.params.id)

      this.initializeForm()

      this.fetchingData = false
    },
    initializeForm () {
      this.form = JSON.parse(JSON.stringify(this.plant)) // this is needed to copy the actual content, not just the pointer!
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

      await this.metastoreConnector.patchPlant(this.$route.params.id, {
        name: this.form.name,
        deviceCode: this.form.deviceCode
      })

      // only update picture if this.form.picture is set,
      // otherwise the existing profile picture would be
      // deleted!
      if (this.form.picture) {
        await this.metastoreConnector.updateProfilePicture(this.$route.params.id, this.form.picture)
      }

      this.savingPlant = false
      this.$router.replace('/plants/' + this.$route.params.id)
    },
    onCancel () {
      this.$router.replace('/plants/' + this.$route.params.id)
    }
  }
}
</script>
