<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>作文详情</span>
        <el-button style="float: right; padding: 3px 3px"
                v-if="taskDetail !== ''" type="text" @click="submitEssay">
          提交
        </el-button>
        <el-button style="float: right; padding: 3px 3px"
                 v-if="taskDetail !== ''" type="text" @click="onCorrectDialogOpen">
          智能批改
        </el-button>
    </div>
    <div key="1" class="text item" v-if="taskTitle !== ''">
      作文题目: {{ taskTitle }}
    </div>
    <div key="2" class="text item" v-if="taskDetail !== ''">
      作文要求: {{ taskDetail }}
    </div>
    <div key="3" class="text item" v-if="className !== ''">
      所属班级: {{ className }}
    </div>
    <div key="4" class="text item" v-if="essayMark !== ''">
      得分: {{ essayMark }}
    </div>
    <div key="5" class="text item" v-if="taskDetail !== ''">
      作文标题:
    </div>
    <div key="6" class="text item" v-if="taskDetail !== ''">
      <el-input v-model="essayTitle"></el-input>
    </div>
    <div key="7" class="text item" v-if="taskDetail !== ''">
      作文正文:
    </div>
    <div key="8" class="text item" v-if="taskDetail !== ''">
      <el-input type="textarea" v-model="essayBody" :autosize="{ minRows: 5 }" ></el-input>
    </div>
    <essay-correct ref="essayCorrect"></essay-correct>
  </el-card>
</template>

<script>
import EssayCorrect from './EssayCorrect.vue'
export default {
  data () {
    return {
      taskId: 0,
      taskTitle: '',
      taskDetail: '',
      essayTitle: '',
      essayBody: '',
      classId: 0,
      essayMark: '',
      isSubmited: false,
      classList: []
    }
  },
  components: {
    EssayCorrect
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
    submitEssay () {
      let _this = this
      let method = 'post'
      if (this.isSubmited) {
        method = 'put'
      }
      this.$axios('/task/detail', {
        method: method,
        headers: {
          'x-api-token': this.$store.state.token
        },
        data: {
          taskId: this.taskId,
          title: this.essayTitle,
          body: this.essayBody
        }
      })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.$message({
              message: '提交成功',
              type: 'success'
            })
          } else {
            _this.$message({
              message: successResponse.data.reason,
              type: 'error'
            })
          }
        })
        .catch(e => {
          _this.$message.error('未知错误')
        })
    },
    onCorrectDialogOpen () {
      let _this = this
      this.$axios.post('/task/ecc', {
        title: this.essayTitle,
        body: this.essayBody
      }, {
        headers: {
          'x-api-token': this.$store.state.token
        }
      })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.$refs.essayCorrect.essayCorrectData = successResponse.data.result.Data
            _this.$refs.essayCorrect.essayCorrectVisible = true
          } else {
            _this.$message({
              message: successResponse.data.reason,
              type: 'error'
            })
          }
        })
        .catch(e => {
          _this.$message.error('未知错误')
        })
    }
  },
  computed: {
    className: function () {
      // 未选择数据
      if (this.taskTitle === '') {
        return ''
      }
      for (let curClass of this.classList) {
        if (curClass.classId === this.classId) {
          return curClass.className
        }
      }
      return '未知'
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
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 720px;
  text-align: left;
}
</style>
