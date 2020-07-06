<template>
  <div>
    <AppBar
      title="Plant"
      back="/plants"
    >
      <ContextMenuPlant
        :action-remove="actionRemovePlant"
        :action-edit="actionEditPlant"
        justify="right"
      />
      <!--
        add to ContextMenuPlant as soon as implemented:
        :action-edit="actionEditPlant"
      //-->
    </AppBar>
    <v-container>
      <div v-if="!fetchingPlant">
        <v-dialog
          v-model="removeDialogIsOpen"
          width="24rem"
          max-width="60%"
        >
          <v-card>
            <v-card-title class="headline">
              Remove Plant {{ plant.name }}?
            </v-card-title>

            <v-card-text>
              This will also remove all configured sensors and actors as well as connected plants.
            </v-card-text>

            <v-card-actions>
              <v-spacer />

              <v-btn
                color="secondary"
                text
                @click="removeDialogIsOpen = false"
              >
                No
              </v-btn>

              <v-btn
                color="error"
                text
                :loading="removingPlant"
                @click="removePlantConfirmed()"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row>
          <v-col>
            <v-img
              src="https://images.pexels.com/photos/4505146/pexels-photo-4505146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              aspect-ratio="2"
              max-height="12rem"
            >
              <!-- <v-dialog
                v-model="editPictureDialogIsOpen"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="white--text px-0"
                    style="position: absolute; top: 0.5rem; right: 0.5rem;"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">
                    Upload a new picture?
                  </v-card-title>
                  <v-card-text>
                    La di dah
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="green darken-1"
                      text
                      @click="editPictureDialogIsOpen = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      :loading="uploadingPicture"
                      @click="uploadPictureConfirmed()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->

              <v-row
                align="end"
                class="pl-3 pr-3 white--text fill-height"
              >
                <v-col style="background-color: rgba(0,0,0,0.5);">
                  <div class="subtitle-1">
                    {{ plant.name }}
                  </div>
                </v-col>
              </v-row>
            </v-img>
          </v-col>
        </v-row>
      </div>
      <LoadingIndicator
        v-if="fetchingPlant"
        type="page"
      />
    </v-container>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import AppBar from '@/components/AppBar.vue'
import ContextMenuPlant from '@/components/ContextMenuPlant.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Plant',
  components: { AppBar, ContextMenuPlant, LoadingIndicator },
  data () {
    return {
      fetchingPlant: false,
      removingPlant: false,
      removeDialogIsOpen: false,
      editPictureDialogIsOpen: false,
      uploadingPicture: false,
      plant: {}
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

    // this.initializeForm()
  },
  methods: {
    actionEditPlant () {
      this.$router.push('/plants/' + this.$route.params.id + '/edit')
    },
    actionRemovePlant () {
      this.removeDialogIsOpen = true
    },
    async removePlantConfirmed () {
      this.removingPlant = true

      const url = this.metastoreServerAddress + '/api/plants/' + this.$route.params.id

      const options = {
        method: 'DELETE',
        accept: 'application/json'
      }

      try {
        await fetch(url, options)

        this.removeDialogIsOpen = false

        this.$router.replace('/plants')
      } catch (err) {
        console.error(err)
      }

      this.removingPlant = false
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
        console.error(err)
      }
    }
  }
}
</script>
