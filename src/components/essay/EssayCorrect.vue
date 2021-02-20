<template>
  <el-dialog title='智能批改'
  :visible.sync='essayCorrectVisible'
  >
    <!-- 总评 -->
    <div>
      <h3 style="text-align: center; font-size: 20px;">摘要</h3>
      <p style="padding: 1em 0;">{{ essayCorrectData.Comment }}</p>
    </div>
    <!-- 各项分数, 仅教师显示 -->
    <div v-if="this.$store.state.user.role === 'tea'">
      <h3 style="text-align: center; font-size: 20px;">得分情况</h3>
      <el-table
      :data="essayCorrectData.ScoreCat">
      <el-table-column
        prop='Name'
        label='项目'>
      </el-table-column>
      <el-table-column label='得分'>
        <template slot-scope="scope">
          <el-progress text-inside :stroke-width="26" :percentage="scope.row.Score"
            :format="formatMarkProgress" :color="markColors">
          </el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop='Percentage'
        label='占比'>
      </el-table-column>
      </el-table>
    </div>
    <!-- 修改建议 -->
    <div v-if="this.$store.state.user.role === 'stu'">
      <h3 style="text-align: center; font-size: 20px;">修改建议</h3>
      <el-table
        :data="essayCorrectData.SentenceComments">
        <el-table-column label='句子' prop="Sentence.Sentence"></el-table-column>
        <el-table-column label='建议'>
          <template slot-scope="scope">
            <li v-for="(item, index) in scope.row.Suggestions" :key="index">
              {{item.ErrorType + ': ' + item.Message}}
            </li>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      essayCorrectData: {},
      essayCorrectVisible: false,
      markColors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#909399', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#67c23a', percentage: 100}
      ]
    }
  },
  methods: {
    formatMarkProgress (progress) {
      return `${progress}分`
    }
  }
}
</script>

<style scoped>
.marks {
  margin: 10px 1%;
}
</style>
