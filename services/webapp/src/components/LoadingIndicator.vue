<template>
  <div
    :class="this.$props.type"
  >
    <v-icon
      class="loading-animation"
    >
      mdi-loading
    </v-icon>
  </div>
</template>

<style type="scss">
.loading-animation {
  animation-name: spin;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}

.inline {
  display: inline;
}

.box {
  display: block;
  position: relative;
  width: 24px;
  height: 24px;
  left: calc(50% - 12px);
  top: calc(50% - 12px);
}

.page {
  display: block;
  position: absolute;

  margin-left: auto;
  margin-right: auto;
  width: 24px;
  height: 24px;
  left: 50%;
  margin-left: -12px;
  top: 50%;
  margin-top: -12px;
}

.viewport {
  display: block;
  position: fixed;

  margin-left: auto;
  margin-right: auto;
  width: 24px;
  height: 24px;
  left: 50%;
  margin-left: -12px;
  top: 50%;
  margin-top: -12px;
}
</style>

<script>
/**
 * inline:    with elements/text in line
 * box:       centers within parent element
 * page:      centered overlay relative to page content
 * viewport:  centered overlay relative to viewport
 */
export default {
  name: 'LoadingIndicator',
  props: {
    type: {
      type: String,
      default: 'inline'
    }
  }
}
</script>
