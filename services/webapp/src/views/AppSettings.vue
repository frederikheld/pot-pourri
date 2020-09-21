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
              <v-row class="my-2" />
              <!-- option start -->
              <v-row
                align="baseline"
              >
                <v-col>
                  <p class="text-subtitle-2">
                    MQTT:
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-select
                    v-model="form.network.mqtt.protocol"
                    label="protocol"
                    :items="['https', 'http']"
                  />
                </v-col>
                <v-col cols="7">
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
              <v-row class="my-2" />
              <!-- option start -->
              <v-row
                align="baseline"
              >
                <v-col>
                  <p class="text-subtitle-2">
                    Metastore:
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-select
                    v-model="form.network.metastore.protocol"
                    label="protocol"
                    :items="['https', 'http']"
                  />
                </v-col>
                <v-col cols="7">
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
              <v-row class="my-2" />
              <!-- option start -->
              <v-row
                align="baseline"
              >
                <v-col>
                  <p class="text-subtitle-2">
                    InfluxDB:
                  </p>
                </v-col>
              </v-row>
              <v-row
                align="baseline"
              >
                <v-col cols="3">
                  <v-select
                    v-model="form.network.influxdb.protocol"
                    label="protocol"
                    :items="['https', 'http']"
                  />
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="form.network.influxdb.address"
                    label="hostname or ip"
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="form.network.influxdb.port"
                    label="port"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.network.influxdb.username"
                    label="username"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.network.influxdb.password"
                    label="password"
                    type="password"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.network.influxdb.database"
                    label="database"
                    type="telegraf"
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
              :disabled="!hasPendingEdits"
              @click="actionSaveSettings"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col>
            <p>form: {{ form }}</p>
            <p>store: {{ appSettings }}</p>
          </v-col>
        </v-row> -->
      </v-form>
    </v-container>
  </div>
</template>

<script>
/**
 * TODO: password isn't hashed/salted before being stored yet!
 */
import AppBar from '@/components/AppBar.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'AppSettings',
  components: { AppBar },
  data () {
    return {
      form: undefined
    }
  },
  computed: {
    ...mapGetters('appSettings', [
      'appSettings'
    ]),
    hasPendingEdits () {
      const inForm = JSON.stringify(this.form)
      const inStore = JSON.stringify(this.appSettings)

      return inForm !== inStore
    }
  },
  beforeMount () {
    this.form = JSON.parse(JSON.stringify(this.appSettings))
  },
  methods: {
    actionSaveSettings () {
      this.$store.commit('appSettings/SAVE_APP_SETTINGS', JSON.parse(JSON.stringify(this.form)))
    }
  }
}
</script>
