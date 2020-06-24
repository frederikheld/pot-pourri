<template>
  <div>
    <v-icon id="icon">
      mdi-loading
    </v-icon>
  </div>
</template>

<style type="scss">
#icon {
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
</style>

<script>
export default {
  name: 'LoadingIndicator'
}
</script>
