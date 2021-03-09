<template>
  <el-dialog title='查看并批改'
  :visible.sync='giveMarkVisible'
  width=45%
  top="5vh">
  <p>
    作文标题:
  </p>
  <div class="text item">
    <el-input v-model="essayTitle" readonly></el-input>
  </div>
  <p>
    作文正文:
  </p>
  <div class="text item">
    <el-input type="textarea" v-model="essayBody" :autosize="{ minRows: 5 }" readonly></el-input>
  </div>
  <span class="text item" style="padding-right: 18px;">
    得分:
    <el-input v-model="essayMark" style="width: 20%;"></el-input>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="giveMarkVisible = false" plain>关闭</el-button>
    <el-button type="primary" plain @click="postMark">打分</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      giveMarkVisible: false,
      essayTitle: '',
      essayBody: '',
      essayMark: 60,
      userId: '',
      taskId: ''
    }
  },
  methods: {
    postMark () {
      let _this = this
      this.$axios.post('/task/mark', {
        userId: this.userId,
        taskId: this.taskId,
        mark: this.essayMark
      }, {
        headers: {
          'x-api-token': this.$store.state.token
        }
      })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.$message({
              message: successResponse.data.result,
              type: 'success'
            })
            _this.giveMarkVisible = false
          } else {
            _this.$message({
              message: successResponse.data.reason,
              type: 'error'
            })
          }
        })
        .catch(e => {
          _this.$message.error('未知错误')
          _this.giveMarkVisible = false
        })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
</style>
