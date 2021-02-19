<template>
  <el-card class="box-card">
    <h1 class="title">你好，{{ this.$store.state.user.name }} !</h1>
    <p v-if="this.$store.state.user.role === 'stu'">黑发不知勤学早，白首方悔读书迟。</p>
    <p>点击"作文"查看任务信息</p>
  </el-card>
</template>

<script>
export default {

}
</script>

<style scoped>
.title {
  font-size: 26px;
}
.box-card {
  margin: 20px;
  width: 320px;
  text-align: left;
}
</style>
