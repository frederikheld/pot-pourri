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
                >
                  <template v-slot:label>
                    <div>
                      <p class="text--primary my-0">
                        Show activity feed in menu
                      </p>
                      <p class="text--secondary my-0">
                        The view will still be accessible via its router link
                      </p>
                    </div>
                  </template>
                </v-switch>
                <v-switch
                  v-model="appFeatureToggles.activityFeed.addFakeMessages"
                >
                  <template v-slot:label>
                    <div>
                      <p class="text--primary my-0">
                        Add fake messages
                      </p>
                      <p class="text--secondary my-0">
                        This will mock the community experience
                      </p>
                    </div>
                  </template>
                </v-switch>
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

export default {
  name: 'Settings',
  components: { AppBar },
  data () {
    return { }
  },
  computed: {
    appFeatureToggles: {
      get () {
        return this.$store.state.appFeatureToggles
      },
      set (value) {
        this.$store.commit('SAVE_APP_FEATURETOGGLES', this.appFeatureToggles)
      }
    }
  }
}
</script>
