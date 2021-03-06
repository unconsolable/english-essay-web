<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>班级详情</span>
      <!-- 学生侧2个按钮 -->
      <el-button style="float: right; padding: 3px 3px"
                 type="text"
                 v-if="this.$store.state.user.role === 'stu'"
                 @click="addClassDialogVisible = true">
        加入新班级
      </el-button>
      <el-button style="float: right; padding: 3px 3px;"
                 type="text"
                 v-if="this.$store.state.user.role === 'stu' && teacherName !== ''"
                 @click="leaveClass">
        <span style="color: red;">退出本班级</span>
      </el-button>
      <!-- 教师侧3个按钮 -->
      <el-button style="float: right; padding: 3px 3px"
                 type="text"
                 v-if="this.$store.state.user.role === 'tea'"
                 @click="createClassDialogVisible = true">
        创建新班级
      </el-button>
      <el-button style="float: right; padding: 3px 3px;"
                 type="text"
                 v-if="this.$store.state.user.role === 'tea' && teacherName !== ''"
                 @click="changeClassDialogVisible = true">
        修改本班级
      </el-button>
      <el-button style="float: right; padding: 3px 3px;"
                 type="text"
                 v-if="this.$store.state.user.role === 'tea' && teacherName !== ''"
                 @click="deleteClass">
        <span style="color: red;">删除本班级</span>
      </el-button>
    </div>
    <!-- 加入班级的Dialog -->
    <el-dialog title='加入新班级'
    :visible.sync='addClassDialogVisible'
    width=30%>
      <el-input id="classCodeInput"
            placeholder="请输入新班级班级码"
            v-model="addClassCode"
            name="classCodeInput">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClassDialogVisible = false" plain>取消</el-button>
        <el-button type="primary" plain @click="addClass">确定</el-button>
      </span>
    </el-dialog>
    <!-- 创建班级的Dialog -->
    <el-dialog title='创建新班级'
    :visible.sync='createClassDialogVisible'
    width=30%>
      <el-input id="newClassNameInput"
            placeholder="请输入新班级班级名称"
            v-model="createClassData.className"
            name="newClassNameInput"
            style="margin:10px 0;">
      </el-input>
      <el-input id="newClassCodeInput"
            placeholder="请输入新班级班级码"
            v-model="createClassData.classCode"
            name="newClassCodeInput">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createClassDialogVisible = false" plain>取消</el-button>
        <el-button type="primary" plain @click="createClass">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改班级的Dialog -->
    <el-dialog title='修改本班级'
    :visible.sync='changeClassDialogVisible'
    width=30%>
      <el-form>
        <el-form-item label="修改名称">
          <el-input id="changeClassNameInput"
                placeholder="修改名称"
                v-model="changeClassData.className"
                name="changeClassNameInput"
                style="margin:10px 0;">
          </el-input>
        </el-form-item>
        <el-form-item label="修改班级码">
          <el-input id="changeClassCodeInput"
                placeholder="修改班级码"
                v-model="changeClassData.classCode"
                name="newClassCodeInput">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeClassDialogVisible = false" plain>取消</el-button>
        <el-button type="primary" plain @click="changeClass">确定</el-button>
      </span>
    </el-dialog>
    <!-- 班级详情信息 -->
    <div key="1" class="text item" v-if="teacherName !== ''">
      班级ID: {{classId}}
    </div>
    <div key="2" class="text item" v-if="teacherName !== ''">
      班级名称: {{className}}
    </div>
    <div key="3" class="text item" v-if="teacherName !== ''">
      班级码: {{classCode}}
    </div>
    <div key="4" class="text item" v-if="teacherName !== ''">
      教师姓名: {{teacherName}}
    </div>
    <!-- 班级学生名单弹窗 -->
    <el-button type="text" top="9vh"
               @click="studentListVisible = true"
               v-if="this.$store.state.user.role === 'tea' && teacherName !== ''">
      学生名单
    </el-button>
    <el-dialog title='学生名单' :visible.sync='studentListVisible' @open="initStudentList">
      <el-table
        :data="studentList">
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="xuehao"
          label="学名">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="studentListVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'classDetail',
  data () {
    return {
      // 班级数据
      className: '',
      classId: '',
      classCode: '',
      teacherName: '',
      // 加入班级需要的数据
      addClassDialogVisible: false,
      addClassCode: '',
      // 创建班级需要的数据
      createClassDialogVisible: false,
      createClassData: {
        className: '',
        classCode: ''
      },
      // 修改班级时需要的数据
      changeClassDialogVisible: false,
      changeClassData: {
        className: '',
        classCode: ''
      },
      // 班级学生名单
      studentListVisible: false,
      studentList: []
    }
  },
  methods: {
    addClass () {
      let _this = this
      this.$axios.post('/class/join', {
        classCode: this.addClassCode
      }, {
        headers: {
          'x-api-token': this.$store.state.token
        }
      })
        .then(successResponse => {
          _this.addClassDialogVisible = false
          if (successResponse.data.code === 200) {
            _this.$message({
              message: '加入成功',
              type: 'success'
            })
            _this.$emit('classReload')
          } else {
            _this.$message({
              message: successResponse.data.reason,
              type: 'error'
            })
          }
          _this.createClassData.className = ''
          _this.createClassData.classCode = ''
        })
        .catch(e => {
          _this.addClassDialogVisible = false
          _this.$message.error('未知错误')
          _this.createClassData.className = ''
          _this.createClassData.classCode = ''
        })
    },
    leaveClass () {
      let _this = this
      this.$confirm('确认删除?')
        .then(_ => {
          _this.$axios.delete('/class/leave', {
            params: {
              'classId': _this.classId
            },
            headers: {
              'x-api-token': _this.$store.state.token
            }
          })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                _this.$message({
                  message: '退出成功',
                  type: 'success'
                })
                _this.$emit('classReload')
                _this.className = ''
                _this.classId = ''
                _this.classCode = ''
                _this.teacherName = ''
              } else {
                _this.$message({
                  message: successResponse.data.reason,
                  type: 'error'
                })
              }
            })
            .catch(e => {
              _this.addClassDialogVisible = false
              _this.$message.error('未知错误')
            })
        })
        .catch(_ => {})
    },
    createClass () {
      let _this = this
      this.$axios.post('/class/list', {
        className: this.createClassData.className,
        classCode: this.createClassData.classCode,
        classTeacherId: this.$store.state.user.userid
      }, {
        headers: {
          'x-api-token': this.$store.state.token
        }
      })
        .then(successResponse => {
          _this.createClassDialogVisible = false
          if (successResponse.data.code === 200) {
            _this.$message({
              message: '创建成功',
              type: 'success'
            })
            _this.$emit('classReload')
          } else {
            _this.$message({
              message: successResponse.data.reason,
              type: 'error'
            })
          }
        })
        .catch(e => {
          _this.createClassDialogVisible = false
          _this.$message.error('未知错误')
        })
    },
    changeClass () {
      let _this = this
      this.$axios.put('/class/list', {
        classId: this.classId,
        className: this.changeClassData.className,
        classCode: this.changeClassData.classCode
      }, {
        headers: {
          'x-api-token': this.$store.state.token
        }
      })
        .then(successResponse => {
          _this.changeClassDialogVisible = false
          if (successResponse.data.code === 200) {
            _this.$message({
              message: '修改成功',
              type: 'success'
            })
            _this.$emit('classReload')
            _this.className = this.changeClassData.className
            _this.classCode = this.changeClassData.classCode
          } else {
            _this.$message({
              message: successResponse.data.reason,
              type: 'error'
            })
          }
        })
        .catch(e => {
          _this.changeClassDialogVisible = false
          _this.$message.error('未知错误')
        })
    },
    deleteClass () {
      let _this = this
      this.$confirm('确认删除?')
        .then(_ => {
          _this.$axios.delete('/class/list', {
            params: {
              'classId': _this.classId
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
                _this.$emit('classReload')
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
        .catch(_ => {})
    },
    initStudentList () {
      let _this = this
      this.$axios.get('/class/students', {
        params: {
          classId: this.classId
        },
        headers: {
          'x-api-token': this.$store.state.token
        }
      })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.studentList = successResponse.data.result
          } else {
            _this.$message({
              messgae: successResponse.data.reason,
              type: 'error'
            })
            _this.studentListVisible = false
          }
        })
        .catch(e => {
          _this.$message.error('未知错误')
          _this.studentListVisible = false
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
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 480px;
  text-align: left;
}
</style>
