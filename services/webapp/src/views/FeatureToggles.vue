<template>
  <div>
    <AppBar
      title="Feature Toggles"
    />
    <v-container>
      <v-row>
        <v-col>
          <v-container
            class="px-0 py-0"
          >
            <v-row>
              <v-col>
                <span class="text-h6">
                  Activity Feed
                </span>
                <v-switch
                  v-model="appFeatureToggles.activityFeed.enabled"
                  label="Enable activity feed"
                  @change="actionSaveFeatureToggles"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Settings',
  components: { AppBar },
  data () {
    return { }
  },
  computed: {
    ...mapGetters([
      'appFeatureToggles'
    ])
  },
  methods: {
    actionSaveFeatureToggles () {
      // console.log('Saving feature toggles in view:', this.appFeatureToggles)
      this.$store.commit('SAVE_APP_FEATURETOGGLES', JSON.parse(JSON.stringify(this.appFeatureToggles)))
    }
  }
}
</script>
