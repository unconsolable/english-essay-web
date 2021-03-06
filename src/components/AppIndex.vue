<template>
  <div id="root">
    <el-card class="box-card">
      <h1 class="title">你好，{{ this.$store.state.user.name }} !</h1>
      <p v-if="this.$store.state.user.role === 'stu'" class="text">黑发不知勤学早，白首方悔读书迟。</p>
      <p class="text">点击"作文"查看任务信息</p>
      <p class="text">点击"班级"查看班级信息</p>
    </el-card>
    <el-card class="moto-card">
      <div slot="header" class="clearfix text">
        每日一句
      </div>
      <img :src="picture" style="width: 440px; height: 263px">
      <p class="text">{{ content }}</p>
      <p class="text">{{ note }}</p>
    </el-card>
  </div>
</template>

<script>
import defaultImage from '../../static/default_daily.jpg'

export default {
  data () {
    return {
      content: 'There is no pressure when you are making a dream come true.',
      note: '当你是在为梦想成真努力时，就不会有压力。',
      picture: defaultImage
    }
  },
  created () {
    this.$axios.get('/dailyWord', {
      headers: {
        'x-api-token': this.$store.state.token
      }
    })
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.content = successResponse.data.result.content
          this.note = successResponse.data.result.note
        }
      })
      .catch(e => {
      })
  }
}
</script>

<style scoped>
.title {
  font-size: 26px;
  color: rgb(85,85,85);
}
.box-card {
  margin: 20px;
  width: 320px;
  text-align: left;
  float: left;
}
.moto-card {
  margin: 20px;
  width: 480px;
  text-align: left;
  float: left;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.text {
  font-size: 16px;
}
</style>
