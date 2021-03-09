<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    style="min-width: 1300px">
    <p class="el-icon-edit" style="color: rgb(85,85,85); float: left; font-size: 24px; margin: 18px 10px; font-weight: bold">
      至善作文通
    </p>
    <!-- <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item> -->
    <el-menu-item class="el-icon-house" key="0" :index="navList[0].name" style="font-size: 16px;">
      {{ navList[0].navItem }}
    </el-menu-item>
    <el-menu-item class="el-icon-edit-outline"  key="1" :index="navList[1].name" style="font-size: 16px;">
      {{ navList[1].navItem }}
    </el-menu-item>
    <el-menu-item class="el-icon-tickets" key="2" :index="navList[2].name" style="font-size: 16px;">
      {{ navList[2].navItem }}
    </el-menu-item>
    <el-menu-item class="el-icon-reading" key="3" :index="navList[3].name" style="font-size: 16px;" v-if="this.$store.state.user.role === 'stu'">
      {{ navList[3].navItem }}
    </el-menu-item>
    <el-menu-item class="el-icon-medal" key="4" :index="navList[4].name" style="font-size: 16px;" v-if="this.$store.state.user.role === 'stu'">
      {{ navList[4].navItem }}
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
        {name: '/class', navItem: '班级'},
        {name: '/selfstudy', navItem: '自测'},
        {name: '/selflearn', navItem: '自学'}
      ]
    }
  }
}
</script>
