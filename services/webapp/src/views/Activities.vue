<template>
  <div>
    <AppBar
      title="Activities"
    />
    <v-container
      id="container"
    >
      <v-row dense>
        <v-col>
          <AlertCard
            type="alert"
            call-to-action="water"
            link="plants/5f42ad7d0d25a20011293b5f"
          >
            Franzi needs water
          </AlertCard>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col>
          <AlertCard
            type="alert"
            call-to-action="sun"
            link="plants/5f42adab0d25a20011293b60"
          >
            Svenja is getting too much sun
          </AlertCard>
        </v-col>
      </v-row>

      <div v-if="featureToggles.activityFeed.addFakeMessages">
        <v-row dense>
          <v-col>
            <v-divider
              class="my-2"
            />
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <NewsCard
              type="info"
              time="26 minutes ago"
            >
              Simone watered her plant <em>Svenja</em>
            </NewsCard>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <NewsCard
              type="info"
              time="2 hours ago"
            >
              Johanna watered her plant <em>Gerhard</em>
            </NewsCard>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <NewsCard
              type="info"
              time="2 hours ago"
            >
              Max is now friends with Johanna
            </NewsCard>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <ProductCard
              type="info"
              time="3 hours ago"
            >
              Max bought fertilizer for his orchids
            </ProductCard>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <NewsCard
              type="info"
              time="3 hours ago"
            >
              Max watered his plant <em>Garfield</em>
            </NewsCard>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <NewsCard
              type="info"
              time="4 hours ago"
            >
              Someone did something
            </NewsCard>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
import AlertCard from '@/components/feed/AlertCard.vue'
import NewsCard from '@/components/feed/NewsCard.vue'
import ProductCard from '@/components/feed/ProductCard.vue'

import PullToRefresh from 'pulltorefreshjs'

import { mapGetters } from 'vuex'

export default {
  name: 'Activities',
  components: { AlertCard, AppBar, NewsCard, ProductCard },
  computed: {
    ...mapGetters('featureToggles', [
      'featureToggles'
    ])
  },
  mounted () {
    PullToRefresh.init({
      mainElement: '#container',
      onRefresh () {
        // update feed
      }
    })
  },
  destroyed () {
    PullToRefresh.destroyAll()
  }
}
</script>
