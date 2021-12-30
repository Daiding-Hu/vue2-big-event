<template>
  <div id="app">
    <div class="login_container">
      <div class="login_box">
        <h1>HI~</h1>
        <h1>欢迎进入大事件登录页</h1>
        <div class="login_info">
          <el-form ref="loginFormRef" :model="LoginForm" :rules="loginFormRules">
            <el-form-item prop="username">
              <el-input v-model="LoginForm.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="LoginForm.password"
                placeholder="账户密码"
                type="password"
                show-password
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-checkbox label="记住密码" name="type"></el-checkbox>
            <el-form-item>
              <el-button type="primary" @click="handleLogin" round>登录</el-button>
            </el-form-item>
            <span>没有账号？</span>
            <el-link type="primary" @click="$router.push('/register')">注册账户</el-link>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/login.js'
export default {
  data() {
    return {
      name: 'Login',
      LoginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-z\d]{6,10}$/i, message: '用户名必须是6-10位字母数字' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^[a-z\d]{6,16}$/i, message: '密码必须是6-16位字母数字' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const {
          data: { code, message, token }
        } = await loginAPI(this.LoginForm)
        if (code === 0) {
          this.$message.success(message)
          this.$router.replace('/')
          this.$store.commit('user/setToken', token)
        } else {
          this.$message.warning(message)
        }
      })
    }
  }
}
</script>

<style>
.login_container {
  position: relative;
  background: url('~@/assets/images/login_bg.jpg');
  background-size: 100% 100%;
  height: 100%;
  background-size: cover;
}
.login_box {
  position: absolute;
  left: 80%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 500px;
  /* border: 1px solid #000; */
}
h1 {
  font-size: 22px;
  line-height: 22px;
}
.login_info {
  /* border: 1px solid #000; */
  margin-top: 50px;
  width: 300px;
  height: 300px;
}
.el-button {
  width: 100%;
}

.el-input {
  margin-top: 10px;
}
span {
  font-size: 12px;
  vertical-align: bottom;
}
.el-checkbox {
  margin-bottom: 20px;
}
</style>
