<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    style="min-width: 1300px">
  <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
    {{ item.navItem }}
  </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/essay', navItem: '作文'},
        {name: '/class', navItem: '班级'}
      ]
    }
  }
}
</script>
