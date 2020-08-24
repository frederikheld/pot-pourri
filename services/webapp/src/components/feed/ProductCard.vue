<template>
  <v-card
    color="grey lighten-2"
  >
    <v-list-item two-line>
      <!-- <v-list-item-icon>
        <v-icon v-if="$props.type === 'alert'">
          mdi-alert
        </v-icon>
      </v-list-item-icon> -->

      <!-- <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">San Francisco</v-list-item-title>
          <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->

      <v-list-item-content>
        <v-list-item-subtitle>
          {{ $props.time }}
        </v-list-item-subtitle>

        <div><slot /></div>
      </v-list-item-content>

      <v-list-item-avatar>
        <v-icon>mdi-cart</v-icon>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        text
        color="primary"
      >
        Buy fertilizer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    type: {
      type: String,
      required: false,
      default: null
    },
    time: {
      type: String,
      required: true,
      default: null
    }
  }
}
</script>
