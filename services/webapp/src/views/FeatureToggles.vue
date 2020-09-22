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
                  v-model="featureToggles.activityFeed.enabled"
                  @change="saveFeatureToggles"
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
                  v-model="featureToggles.activityFeed.addFakeMessages"
                  @change="saveFeatureToggles"
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

import { mapGetters } from 'vuex'

export default {
  name: 'Settings',
  components: { AppBar },
  data () {
    return {
      inForm: undefined
    }
  },
  computed: {
    ...mapGetters('featureToggles', {
      featureTogglesInStore: 'featureToggles'
    }),
    featureToggles () {
      return JSON.parse(JSON.stringify(this.featureTogglesInStore))
    }
  },
  created () {
    this.inForm = JSON.parse(JSON.stringify(this.featureToggles))
  },
  methods: {
    saveFeatureToggles () {
      this.$store.commit('featureToggles/SAVE_FEATURETOGGLES', this.featureToggles, { root: true })
    }
  }
}
</script>
