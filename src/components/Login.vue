<template>
  <body id="backgnd">
    <el-form id='loginCard' label-position="left" label-width="0px">
      <h1 class="title">至善作文通</h1>
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
  </body>
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
      let _this = this
      try {
        let successResponse = await this.$axios.post('/auth', {
          username: this.username,
          password: this.password
        })
        if (successResponse.data.code === 200) {
          _this.$store.commit('token', successResponse.data.result)
          try {
            let successResponse = await this.$axios.get('user/basicInfo', {
              headers: {
                'x-api-token': this.$store.state.token
              }
            })
            if (successResponse.data.code === 200) {
              _this.$store.commit('user', successResponse.data.result)
            } else {
              alert(successResponse.data.reason)
            }
          } catch (e) {
            alert('请求用户信息: 未知错误')
          }
          _this.$router.replace({path: '/index'})
        } else {
          alert('账号或密码错误')
        }
      } catch (e) {
        alert('认证: 未知错误')
      }
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
  background: rgba(255, 255, 255, 0.98);
}
.title {
  color: rgb(85,85,85)
}
#backgnd {
  background-image: url("../../static/login-background.jpg");
  height: 100%;
  width: 100%;
  position: fixed;
  background-size: cover;
  background-position: center;
}

</style>
