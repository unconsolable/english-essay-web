<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <side-menu :classList="classList" @indexSelect="onIndexSelect"></side-menu>
    </el-aside>
    <el-main>
      <class-detail ref="classDetail"></class-detail>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from './class/SideMenu.vue'
import ClassDetail from './class/ClassDetail.vue'
export default {
  name: 'Class',
  components: {
    SideMenu,
    ClassDetail
  },
  data () {
    return {
      classList: []
    }
  },
  created: function () {
    this.$axios
      .get('class/list', {
        headers: {
          'x-api-token': this.$store.state.token
        }
      })
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.classList = successResponse.data.result
        } else {
          alert(successResponse.data.reason)
        }
      })
      .catch(error => {
        alert('请求班级信息失败', error)
      })
  },
  methods: {
    onIndexSelect (key) {
      this.$refs.classDetail.classId = this.classList[parseInt(key)].classId
      this.$refs.classDetail.className = this.classList[parseInt(key)].className
      this.$refs.classDetail.classCode = this.classList[parseInt(key)].classCode
      this.$refs.classDetail.changeClassData.className = this.classList[parseInt(key)].className
      this.$refs.classDetail.changeClassData.classCode = this.classList[parseInt(key)].classCode
      this.$refs.classDetail.teacherName = this.classList[parseInt(key)].classTeacherName
    }
  }
}
</script>

<style scoped>

</style>
