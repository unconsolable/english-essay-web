<template>
  <iframe :src=videoUrl allowfullscreen="allowfullscreen" width="100%" height="500" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>
</template>

<script>
export default {
  props: {
    videoUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
