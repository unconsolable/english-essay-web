<template>
  <el-form id='loginCard' label-position="left" label-width="0px">
    <h1>英语作文</h1>
      <el-form-item>
        <el-input id="nameInput"
          placeholder="请输入用户名"
          v-model="username"
          name="name">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input id="pwInput"
          placeholder="请输入密码"
          v-model="password"
          name="pw"
          show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLoginClicked" plain>登录</el-button>
        <el-button type="primary" @click="onSignUpClicked" plain>注册</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onLoginClicked () {
      var _this = this
      this.$axios
        .post('/auth', {
          username: this.username,
          password: this.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.$store.commit('token', successResponse.data.result)
            _this.$router.replace({path: '/index'})
          } else {
            alert('账号或密码错误')
          }
        })
        .catch(failResponse => {
          alert('未知错误')
        })
    },
    async onSignUpClicked () {
      this.$router.replace({path: '/signup'})
    }
  }
}
</script>

<style scoped>
#loginCard {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 10% auto;
  width: 350px;
  padding: 35px 15px;
  text-align: center;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

</style>
