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
              ref="id"
              v-model="id"
              label="Unique ID of the plant"
              :error-messages="form.errorMessages.id"
              autofocus
              :rules="[value => !!value || 'ID is required']"
              @focus="form.errorMessages.id=[]"
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="name"
              label="The name you use to refer to this plant"
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
      id: undefined,
      name: undefined,
      form: {
        errorMessages: {
          id: []
        }
      }
    }
  },
  computed: {
    ...mapGetters([
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
          id: this.id,
          name: this.name
        })
      }

      try {
        const res = await fetch(url, options)
        if (res.status === 409) {
          this.form.errorMessages.id.push('Plant with same ID exist already!')
        } else {
          this.$router.replace('/plants/' + this.id)
        }
        this.savingPlant = false
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
