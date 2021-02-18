<template>
  <el-container>
    <el-aside style="width: 240px;margin-top: 20px">
      <switch></switch>
      <side-menu :essayList="essayList" @indexSelect="onIndexSelect"></side-menu>
    </el-aside>
    <el-main>
      <essay-detail-stu ref="essayDetailStu" v-if="this.$store.state.user.role === 'stu'"></essay-detail-stu>
      <essay-detail-tea ref="essayDetailTea" v-if="this.$store.state.user.role === 'tea'"></essay-detail-tea>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from './essay/SideMenu.vue'
import EssayDetailStu from './essay/EssayDetailStu.vue'
import EssayDetailTea from './essay/EssayDetailTea.vue'
export default {
  components: { SideMenu, EssayDetailStu, EssayDetailTea },
  name: 'Essay',
  data () {
    return {
      essayList: []
    }
  },
  created: function () {
    this.$axios
      .get('task/list', {
        headers: {
          'x-api-token': this.$store.state.token
        }
      })
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.essayList = successResponse.data.result
        } else {
          alert(successResponse.data.reason)
        }
      })
      .catch(error => {
        alert('请求作文信息失败', error)
      })
  },
  methods: {
    onIndexSelect (key) {
      if (this.$store.state.user.role === 'stu') {
        this.$refs.essayDetailStu.taskId = this.essayList[parseInt(key)].taskId
        this.$refs.essayDetailStu.classId = this.essayList[parseInt(key)].classId
        this.$refs.essayDetailStu.taskTitle = this.essayList[parseInt(key)].taskTitle
        this.$refs.essayDetailStu.taskDetail = this.essayList[parseInt(key)].taskDesc
        if (this.essayList[parseInt(key)].isSubmit) {
          this.$refs.essayDetailStu.isSubmited = true
          // 已提交, 填充之前内容
          this.$axios.get('/task/detail', {
            params: {
              'taskId': this.essayList[parseInt(key)].taskId
            },
            headers: {
              'x-api-token': this.$store.state.token
            }
          })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                this.$refs.essayDetailStu.taskId = successResponse.data.result.taskId
                this.$refs.essayDetailStu.essayTitle = successResponse.data.result.title
                this.$refs.essayDetailStu.essayBody = successResponse.data.result.body
                this.$message({
                  message: '加载作文成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: successResponse.data.reason,
                  type: 'error'
                })
              }
            })
            .catch(function (e) {
              this.$message.error('未知错误')
            })
        } else {
          this.$refs.essayDetailStu.isSubmited = false
          this.$refs.essayDetailStu.essayTitle = ''
          this.$refs.essayDetailStu.essayBody = ''
        }
      } else if (this.$store.state.user.role === 'tea') {
        this.$refs.essayDetailTea.taskId = this.essayList[parseInt(key)].taskId
        this.$refs.essayDetailTea.classId = this.essayList[parseInt(key)].classId
        this.$refs.essayDetailTea.taskTitle = this.essayList[parseInt(key)].taskTitle
        this.$refs.essayDetailTea.taskDetail = this.essayList[parseInt(key)].taskDesc
        this.$refs.essayDetailTea.changeTaskData.taskName = this.essayList[parseInt(key)].taskTitle
        this.$refs.essayDetailTea.changeTaskData.taskDesc = this.essayList[parseInt(key)].taskDesc
      }
    }
  }
}
</script>

<style scoped>

</style>
