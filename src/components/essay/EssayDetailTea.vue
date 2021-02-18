<template>
  <el-card class="box-card">
    <!-- 表头按钮 -->
    <div slot="header" class="clearfix">
      <span>题目详情</span>
      <el-button style="float: right; padding: 3px 3px"
                 type="text"
                 @click="createTaskDialogVisible = true">
        创建新题目
      </el-button>
      <el-button style="float: right; padding: 3px 3px;"
                 type="text"
                 @click="changeTaskDialogVisible = true">
        修改本题目
      </el-button>
      <el-button style="float: right; padding: 3px 3px;"
                 type="text"
                 @click="deleteTask">
        <span style="color: red;">删除本题目</span>
      </el-button>
    </div>
    <!-- 创建新题目的Dialog -->
    <el-dialog title='创建新题目'
    :visible.sync='createTaskDialogVisible'
    width=30%>
      <el-input id="createTaskNameInput"
                class="item"
                placeholder="请输入作文题目"
                v-model="createTaskData.taskName"
                name="classCodeInput">
      </el-input>
      <el-input id="createTaskDescInput"
                class="item"
                placeholder="请输入作文描述"
                type="textarea"
                v-model="createTaskData.taskDesc"
                name="classCodeInput"
                :autosize="{ minRows: 3 }">
      </el-input>
      <el-select class="item"
                 v-model="createTaskData.classId"
                 placeholder="请选择班级">
        <el-option
          v-for="item in classList"
          :key="item.classId"
          :label="item.className"
          :value="item.classId">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createTaskDialogVisible = false" plain>取消</el-button>
        <el-button type="primary" plain @click="createTask">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改本题目的Dialog -->
    <el-dialog title='修改本题目'
    :visible.sync='changeTaskDialogVisible'
    width=30%>
      <el-form>
        <el-form-item label="修改作文题目">
          <el-input id="changeTaskNameInput"
                class="item"
                placeholder="请输入作文题目"
                v-model="changeTaskData.taskName"
                name="classCodeInput">
          </el-input>
        </el-form-item>
        <el-form-item label="修改作文描述">
          <el-input id="changeTaskDescInput"
                class="item"
                placeholder="请输入作文题目"
                v-model="changeTaskData.taskDesc"
                name="classCodeInput">
          </el-input>
        </el-form-item>
        <el-form-item label="修改作文所属班级">
          <el-select class="item"
                 v-model="changeTaskData.classId"
                 placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :key="item.classId"
              :label="item.className"
              :value="item.classId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeTaskDialogVisible = false" plain>取消</el-button>
        <el-button type="primary" plain @click="changeTask">确定</el-button>
      </span>
    </el-dialog>
    <!-- 卡片项 -->
    <div key="1" class="text item" v-if="taskTitle !== ''">
      作文题目: {{ taskTitle }}
    </div>
    <div key="2" class="text item" v-if="taskDetail !== ''">
      作文要求: {{ taskDetail }}
    </div>
    <div key="3" class="text item" v-if="taskDetail !== ''">
      所属班级: {{ className }}
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      taskId: 0,
      taskTitle: '',
      taskDetail: '',
      classId: 0,
      taskEssays: [],
      createTaskDialogVisible: false,
      createTaskData: {
        taskName: '',
        taskDesc: '',
        classId: ''
      },
      changeTaskDialogVisible: false,
      changeTaskData: {
        taskName: '',
        taskDesc: '',
        classId: ''
      },
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
    createTask () {
      let _this = this
      this.$axios.post('/task/list', {
        classId: this.createTaskData.classId,
        taskTitle: this.createTaskData.taskName,
        taskDesc: this.createTaskData.taskDesc
      }, {
        headers: {
          'x-api-token': this.$store.state.token
        }
      })
        .then(successResponse => {
          _this.createTaskDialogVisible = false
          if (successResponse.data.code === 200) {
            _this.$message({
              message: '创建成功',
              type: 'success'
            })
            _this.createTaskDialogVisible = false
          } else {
            _this.$message({
              message: successResponse.data.reason,
              type: 'error'
            })
          }
        })
        .catch(e => {
          _this.createTaskDialogVisible = false
          _this.$message.error('未知错误')
        })
    },
    deleteTask () {
      let _this = this
      this.$confirm('确认删除?')
        .then(_ => {
          _this.$axios.delete('/task/list', {
            params: {
              'taskId': this.taskId
            },
            headers: {
              'x-api-token': _this.$store.state.token
            }
          })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                _this.$message({
                  message: '删除成功',
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
        })
    },
    changeTask () {
      let _this = this
      this.$axios.put('/task/list', {
        taskId: this.taskId,
        classId: this.changeTaskData.classId,
        taskTitle: this.changeTaskData.taskName,
        taskDesc: this.changeTaskData.taskDesc
      }, {
        headers: {
          'x-api-token': this.$store.state.token
        }
      })
        .then(successResponse => {
          _this.createTaskDialogVisible = false
          if (successResponse.data.code === 200) {
            _this.$message({
              message: '修改成功',
              type: 'success'
            })
            _this.changeTaskDialogVisible = false
          } else {
            _this.$message({
              message: successResponse.data.reason,
              type: 'error'
            })
          }
        })
        .catch(e => {
          _this.$message.error('未知错误')
          _this.changeTaskDialogVisible = false
        })
    }
  },
  computed: {
    className: function () {
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
