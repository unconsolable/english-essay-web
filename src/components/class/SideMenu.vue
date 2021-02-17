<template>
  <el-menu
    class="categories"
    default-active="0"
    @select="handleSelect">
    <el-menu-item v-for="(item, index) in classList" :index="index.toString()" :key="index">
      {{ item.className }}
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    classList: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleSelect (key) {
      this.$emit('indexSelect', key)
    }
  }
}
</script>

<style scoped>
.categories {
  text-align: center;
}
</style>
