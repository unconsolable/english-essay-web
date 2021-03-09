<template>
  <el-container style="position: relative; float: left; left: 50%;">
    <el-aside style="width: 280px; margin-top: 20px; position: relative; float: left; left: -50%;">
      <switch></switch>
      <side-menu :essayList="essayList" @indexSelect="onIndexSelect"></side-menu>
    </el-aside>
    <el-main style="position: relative; float: left; left: -50%;">
      <essay-detail-stu ref="essayDetailStu" v-if="this.$store.state.user.role === 'stu'"></essay-detail-stu>
      <essay-detail-tea ref="essayDetailTea" v-if="this.$store.state.user.role === 'tea'" @essayTaskReload="onEssayTaskReload"></essay-detail-tea>
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
    // 获取作文任务列表
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
      let _this = this
      if (this.$store.state.user.role === 'stu') {
        // 设置任务id, 班级id, 任务题目, 任务描述
        this.$refs.essayDetailStu.taskId = this.essayList[parseInt(key)].taskId
        this.$refs.essayDetailStu.classId = this.essayList[parseInt(key)].classId
        this.$refs.essayDetailStu.taskTitle = this.essayList[parseInt(key)].taskTitle
        this.$refs.essayDetailStu.taskDetail = this.essayList[parseInt(key)].taskDesc
        if (this.essayList[parseInt(key)].isSubmit) {
          this.$refs.essayDetailStu.isSubmited = true
          // 已提交, 填充之前作文标题和内容
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
                _this.$refs.essayDetailStu.taskId = successResponse.data.result.taskId
                _this.$refs.essayDetailStu.essayTitle = successResponse.data.result.title
                _this.$refs.essayDetailStu.essayBody = successResponse.data.result.body
                _this.$refs.essayDetailStu.essayMark = successResponse.data.result.mark
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
          // 未提交, 填充新作文标题和内容
          this.$refs.essayDetailStu.isSubmited = false
          this.$refs.essayDetailStu.essayTitle = ''
          this.$refs.essayDetailStu.essayBody = ''
          _this.$refs.essayDetailStu.essayMark = ''
        }
      } else if (this.$store.state.user.role === 'tea') {
        // 填充任务id, 班级id, 任务题目, 任务描述信息, 留待修改时备用
        this.$refs.essayDetailTea.taskId = this.essayList[parseInt(key)].taskId
        this.$refs.essayDetailTea.classId = this.essayList[parseInt(key)].classId
        this.$refs.essayDetailTea.taskTitle = this.essayList[parseInt(key)].taskTitle
        this.$refs.essayDetailTea.taskDetail = this.essayList[parseInt(key)].taskDesc
        this.$refs.essayDetailTea.changeTaskData.taskName = this.essayList[parseInt(key)].taskTitle
        this.$refs.essayDetailTea.changeTaskData.taskDesc = this.essayList[parseInt(key)].taskDesc
        // 填充任务完成情况
        this.$axios.get('/task/classStatus', {
          params: {
            taskId: this.essayList[parseInt(key)].taskId,
            classId: this.essayList[parseInt(key)].classId
          },
          headers: {
            'x-api-token': this.$store.state.token
          }
        })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              _this.$refs.essayDetailTea.taskEssays = successResponse.data.result
            } else {
              this.$message({
                message: successResponse.data.reason,
                type: 'error'
              })
            }
          })
          .catch(e => {
            this.$message.error('未知错误')
          })
      }
    },
    onEssayTaskReload () {
      // 获取作文任务列表
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
    }
  }
}
</script>

<style scoped>

</style>
