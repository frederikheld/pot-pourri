<template>
  <div>
    <AppBar
      title="Feed"
    />
    <v-container>
      <v-row>
        <v-col>
          <v-card to="plants/5f42ad7d0d25a20011293b5f">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-alert</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Franzi needs water
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar>
                <v-icon>mdi-watering-can</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'

export default {
  name: 'Feed',
  components: { AppBar }
}
</script>
