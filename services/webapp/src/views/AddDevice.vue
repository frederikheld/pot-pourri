<template>
  <v-container>
    <h1>Add Device</h1><v-form
      @submit.prevent
    >
      <v-col>
        <v-row>
          <v-text-field
            v-model="id"
            label="Unique ID of the device"
            autofocus
          />
        </v-row>
        <v-row>
          <v-text-field
            v-model="name"
            label="Name of the plant it guards"
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
            :loading="savingDevice"
            @click="onSubmit"
          >
            Create
          </v-btn>
        </v-row>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddDevice',
  data () {
    return {
      savingDevice: false,
      id: undefined,
      name: undefined
    }
  },
  computed: {
    ...mapGetters([
      'metastoreServerAddress'
    ])
  },
  methods: {
    onSubmit () {
      this.savingDevice = true
      this.addDevice(this.device)
    },
    onCancel () {
      this.$router.replace('/devices')
    },
    async addDevice (device) {
      const url = this.metastoreServerAddress + '/api/devices'

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
        await fetch(url, options)
        this.savingDevice = false
        this.$router.replace('/devices/' + this.id)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
