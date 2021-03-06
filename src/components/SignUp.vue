<template>
  <el-form id='signUpCard' label-position="left" label-width="0px">
    <h1 style="color: rgb(85,85,85);">注册</h1>
      <el-form-item>
        <el-input id="userNameInput"
          placeholder="用户名"
          v-model="username"
          name="name">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input id="pwInput"
          placeholder="密码"
          v-model="password"
          name="pw"
          show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="role" placeholder="身份选择" size="medium">
          <el-option
           v-for="role in roleOption"
           :key="role.value"
           :label="role.label"
           :value="role.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input id="nameInput"
          placeholder="真实姓名"
          v-model="name"
          name="name"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-if="role == 'stu'"
          id="xhInput"
          placeholder="学号"
          v-model="xuehao"
          name="xuehao"
        >
        </el-input>
        <el-input v-else
          id="xhInput"
          placeholder="一卡通号"
          v-model="xuehao"
          name="xuehao"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSignUpClicked" plain>确认注册</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      role: '',
      name: '',
      xuehao: '',
      roleOption: [{
        value: 'stu',
        label: '学生'
      }, {
        value: 'tea',
        label: '教师'
      }]
    }
  },
  methods: {
    async onSignUpClicked () {
      if (this.username === '' || this.password === '' || this.role === '' || this.name === '' || this.xuehao === '') {
        alert('信息未填完')
        return
      }
      var _this = this
      this.$axios
        .post('/signup', {
          username: this.username,
          password: this.password,
          role: this.role,
          name: this.name,
          xuehao: this.xuehao
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.$router.replace({path: '/'})
            alert('注册成功')
          } else {
            alert('注册失败')
          }
        })
        .catch(failResponse => {
          alert('未知错误')
        })
    }
  }
}
</script>

<style scoped>
#signUpCard {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 10% auto;
  width: 350px;
  padding: 15px 15px;
  text-align: center;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

</style>
