<template>
  <div>
    <AppBar
      title="Settings"
    />
    <v-container>
      <v-form>
        <!-- section start -->
        <v-row>
          <v-col>
            <v-container
              class="pa-0 form-section"
            >
              <v-row>
                <v-col>
                  <span class="text-h6">
                    Network
                  </span>
                </v-col>
              </v-row>
              <!-- option start -->
              <v-row
                align="baseline"
              >
                <v-col
                  cols="2"
                >
                  <span class="text-subtitle-2">MQTT:</span>
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="form.network.mqtt.protocol"
                    label="protocol"
                    :items="['https', 'http']"
                  />
                </v-col>
                <v-col
                  cols="5"
                >
                  <v-text-field
                    v-model="form.network.mqtt.address"
                    label="hostname or ip"
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="form.network.mqtt.port"
                    label="port"
                  />
                </v-col>
              </v-row>
              <!-- option end -->
              <!-- option start -->
              <v-row
                align="baseline"
              >
                <v-col
                  cols="2"
                >
                  <span class="text-subtitle-2">Metastore:</span>
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="form.network.metastore.protocol"
                    label="protocol"
                    :items="['https', 'http']"
                  />
                </v-col>
                <v-col
                  cols="5"
                >
                  <v-text-field
                    v-model="form.network.metastore.address"
                    label="hostname or ip"
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="form.network.metastore.port"
                    label="port"
                  />
                </v-col>
              </v-row>
              <!-- option end -->
            </v-container>
          </v-col>
        </v-row>
        <!-- section end-->
        <v-row>
          <v-col class="text-right">
            <v-btn
              right
              color="primary"
              :loading="savingSettings"
              :disabled="!formIsValid"
              @click="actionSaveSettings()"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.form-section .col {
    padding-top: 0;
    padding-bottom: 0;
}
</style>

<script>
import AppBar from '@/components/AppBar.vue'
// import LoadingIndicator from '@/components/LoadingIndicator.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Device',
  components: { AppBar },
  //   components: { AppBar, LoadingIndicator },
  data () {
    return {
      form: {
        network: {
          mqtt: {
            protocol: 'https',
            address: '',
            port: 1883
          },
          metastore: {
            protocol: 'https',
            address: '',
            port: 3003
          }
        }
      },
      formIsValid: true,
      savingSettings: false
    }
  },
  computed: {
    ...mapGetters([
      'appSettings'
    ])
  },
  mounted () {
    this.loadSettingsFromStore()
  },
  methods: {
    loadSettingsFromStore () {
      this.form = this.appSettings
    },
    actionSaveSettings () {
      this.savingSettings = true
      this.$store.commit('SAVE_APP_SETTINGS', this.form)
      this.loadSettingsFromStore()
      this.savingSettings = false
    }
  }
}
</script>
