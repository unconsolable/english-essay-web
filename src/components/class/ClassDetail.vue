<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>班级详情</span>
      <el-button style="float: right; padding: 3px 0" type="text" v-if="this.$store.state.user.role === 'stu'">加入新班级</el-button>
    </div>
    <div key="1" class="text item">
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
  </el-card>
</template>

<script>
export default {
  name: 'classDetail',
  data () {
    return {
      className: '',
      classId: '',
      classCode: '',
      teacherName: '',
      addClassDialogVisible: false,
      createClassDialogVisible: false
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
  width: 320px;
  text-align: left;
}
</style>
