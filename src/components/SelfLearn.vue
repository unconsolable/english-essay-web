<template>
  <el-container style="position: relative; float: left; left: 50%;">
    <el-aside style="width: 240px; margin-top: 20px; position: relative; float: left; left: -50%;">
      <switch></switch>
      <side-menu :videoList="videoList" @indexSelect="onIndexSelect"></side-menu>
    </el-aside>
    <el-main style="position: relative; float: left; left: -50%;">
      <video-detail ref="videoDetail"></video-detail>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from './selfLearn/SideMenu.vue'
import VideoDetail from './selfLearn/VideoDetail.vue'
export default {
  data () {
    return {
      videoList: []
    }
  },
  components: {
    SideMenu,
    VideoDetail
  },
  created: function () {
    let _this = this
    this.$axios
      .get('/learnRes', {
        headers: {
          'x-api-token': this.$store.state.token
        }
      })
      .then(successResponse => {
        if (successResponse.data.code === 200) {
          this.videoList = successResponse.data.result
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
  methods: {
    onIndexSelect (key) {
      this.$refs.videoDetail.videos = this.videoList[parseInt(key)].res
    }
  }
}
</script>

<style scoped>

</style>
