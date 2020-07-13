<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col>
          <v-text-field
            v-model="form.foo.bar"
            label="Foobar"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="form.baz"
            label="Baz"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            class="primary float-right"
            :disabled="!hasPendingEdits"
            @click="saveSettings"
          >
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <div>form: {{ form }}</div>
    <div>store: {{ labSettings }}</div>
    <div>has pending edits: {{ hasPendingEdits }}</div>
  </v-container>
</template>

<script>
/**
 * This view demonstrates how a settings from can be implemented
 * with the following features:
 *  - form input will only be stored if button "Save" is clicked
 *  - settings are loaded from and stored in vuex store
 *  - save button is only active if there are pending edits
 */
import { mapGetters } from 'vuex'

export default {
  name: 'LabSettings',
  data () {
    return {
      form: {
        foo: { }
      }
    }
  },
  computed: {
    ...mapGetters([
      'labSettings'
    ]),
    hasPendingEdits () {
      const inForm = JSON.stringify(this.form)
      const inStore = JSON.stringify(this.labSettings)

      return inForm !== inStore
    }
  },
  mounted () {
    this.form = JSON.parse(JSON.stringify(this.labSettings))
  },
  methods: {
    saveSettings () {
      this.$store.commit('SAVE_LAB_SETTINGS', JSON.parse(JSON.stringify(this.form)))
    }
  }
}
</script>
