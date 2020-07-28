<template>
  <v-img
    id="plant-picture"
    :src="$props.src"
    aspect-ratio="2"
    max-height="12rem"
  >
    <slot />
  </v-img>
</template>

<style lang="scss" scoped>
#plant-picture {
  background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.6) 30%,
      rgba(255, 255, 255, 0.8) 100%
  ), repeating-linear-gradient(
    45deg,
    #ddd,
    #ddd 10px,
    #eee 10px,
    #eee 20px
  );
}
</style>

<script>
/**
 * This component provides a replacement for v-img
 * to be used for profile pictures that provides
 * additional features like:
 *   - standardized max-height and aspect-ratio
 *   - striped background to indicate if no picture is available
 */
export default {
  name: 'ProfilePicture',
  props: {
    src: {
      type: String,
      required: false,
      default: null
    }
  }

}
</script>
