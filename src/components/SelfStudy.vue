<template>
  <el-container style="position: relative; float: left; left: 50%;">
    <el-main style="position: relative; float: left; left: -50%;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>自主练习</span>
            <el-button style="float: right; padding: 3px 3px"
                    type="text" @click="onCorrectDialogOpen">
              智能批改
            </el-button>
        </div>
        <div key="1" class="text item">
          作文标题:
        </div>
        <div key="2" class="text item">
          <el-input v-model="essayTitle"></el-input>
        </div>
        <div key="3" class="text item">
          作文正文:
        </div>
        <div key="4" class="text item">
          <el-input type="textarea" v-model="essayBody" :autosize="{ minRows: 5 }" ></el-input>
        </div>
        <essay-correct ref="essayCorrect"></essay-correct>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import EssayCorrect from './essay/EssayCorrect.vue'
export default {
  data () {
    return {
      essayTitle: '',
      essayBody: ''
    }
  },
  components: {
    EssayCorrect
  },
  methods: {
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
  }
}
</script>

<style>
.item {
  margin-bottom: 18px;
}
.box-card {
  width: 720px;
  text-align: left;
}
</style>
