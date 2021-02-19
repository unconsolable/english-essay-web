<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    style="min-width: 1300px">
    <span style="float: left; font-size: 20px; padding-top: 15px; padding-right: 10px;font-weight: bold">
      至善作文通
    </span>
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
