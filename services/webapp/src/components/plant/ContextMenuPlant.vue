<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        color="normal"
        dark
        v-bind="attrs"
        :class="buttonClass"
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-if="$props.actionEditProfile"
        @click="onClickEditProfile"
      >
        Edit Profile
      </v-list-item>
      <v-list-item
        v-if="$props.actionEditSensorSettings"
        @click="onClickEditSensorSettings"
      >
        Sensor Settings
      </v-list-item>
      <v-divider />
      <v-list-item
        v-if="$props.actionRemove"
        @click="onClickRemove"
      >
        Remove Plant
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ContextMenuPlant',
  props: {
    actionEditProfile: {
      type: Function,
      required: false,
      default: null
    },
    actionEditSensorSettings: {
      type: Function,
      required: false,
      default: null
    },
    actionRemove: {
      type: Function,
      required: false,
      default: null
    },
    justify: {
      type: String,
      require: false,
      default: 'left'
    }
  },
  computed: {
    buttonClass: function () {
      return 'float-' + this.$props.justify
    }
  },
  methods: {
    onClickEditProfile () {
      this.$props.actionEditProfile()
    },
    onClickEditSensorSettings () {
      this.$props.actionEditSensorSettings()
    },
    onClickRemove () {
      this.$props.actionRemove()
    }
  }
}
</script>
