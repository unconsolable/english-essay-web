<template>
  <el-menu
    class="categories"
    default-active="0"
    @select="handleSelect">
    <el-menu-item v-for="(item, index) in videoList" :index="index.toString()" :key="index">
      {{ item.name }}
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    videoList: {
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
  border-radius: 4px;
  border: 0.6px solid #ffffff;
  box-shadow: 0 1px 10px rgb(18 18 18 / 10%);
}
</style>
