<template>
  <div v-if="videos !== []">
    <el-row :gutter="20" class="el-row" style="width: 720px;">
      <el-col :span="8" v-for="(item, index) in videos" :key=index>
        <el-card class="video" :key="index"
                bodyStyle="padding:10px">
          <img :src="cover1" style="width: 200px; height: 120px">
          <p>视频主题: </p>
          <p> {{item.title}}</p>
          <el-button style="float: left; padding: 3px 0"
                 type="text"
                 @click="initVideo(item.url)">
            播放视频
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="videoDialogVisible" destroy-on-close title="视频播放">
      <video-iframe :videoUrl.sync="url"></video-iframe>
    </el-dialog>
  </div>
</template>

<script>
import VideoIframe from './VideoIframe.vue'

export default {
  data () {
    return {
      videos: [],
      cover1: '',
      videoDialogVisible: false,
      url: ''
    }
  },
  components: {
    VideoIframe
  },
  methods: {
    initVideo (url) {
      this.url = url
      this.videoDialogVisible = true
    }
  }
}
</script>

<style scoped>
.video {
  margin-bottom: 20px;
  float: left;
  margin-right: 15px;
}
</style>
