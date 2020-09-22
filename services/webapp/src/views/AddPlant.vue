<template>
  <div>
    <AppBar
      title="Add Plant"
      back="/plants"
    />

    <v-container>
      <v-form
        @submit.prevent
      >
        <v-col>
          <v-row>
            <v-text-field
              ref="name"
              v-model="name"
              label="Plant's name"
              :rules="[name => !!name] || 'Plant\'s name is required!'"
              :error-messages="form.errorMessages.name"
              autofocus
              @focus="form.errorMessages.name = []"
            />
          </v-row>
          <v-row>
            <v-text-field
              ref="deviceCode"
              v-model="deviceCode"
              label="Device Code"
            />
          </v-row>
          <v-row>
            <v-spacer />
            <v-btn
              color="secondary"
              class="mr-3"
              text
              @click="onCancel"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              type="submit"
              :loading="savingPlant"
              @click="onSubmit"
            >
              Create
            </v-btn>
          </v-row>
        </v-col>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'AddPlant',
  components: { AppBar },
  data () {
    return {
      savingPlant: false,
      deviceCode: undefined,
      name: undefined,
      form: {
        errorMessages: {
          name: []
        }
      }
    }
  },
  computed: {
    ...mapGetters('appSettings', [
      'metastoreServerAddress'
    ])
  },
  methods: {
    onSubmit () {
      this.savingPlant = true
      this.addPlant(this.plant)
    },
    onCancel () {
      this.$router.replace('/plants')
    },
    async addPlant (plant) {
      const url = this.metastoreServerAddress + '/api/plants'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          deviceCode: this.deviceCode
        })
      }

      try {
        const res = await fetch(url, options)

        if (res.status === 409) {
          this.form.errorMessages.name.push('Plant with same name exists already. Please choose a different one!')
        } else if (res.status === 201) {
          const plant = await res.json()
          this.$router.replace('/plants/' + plant.id)
        } else {
          console.error('Something unexpected went wrong.')
        }
        this.savingPlant = false
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
