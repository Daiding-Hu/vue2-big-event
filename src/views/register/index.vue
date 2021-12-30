<template>
  <div id="app">
    <div class="register_container">
      <div class="register_box">
        <h1>HI~</h1>
        <h1>欢迎进入大事件注册页</h1>
        <div class="register_info">
          <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules">
            <el-form-item prop="username">
              <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                placeholder="请输入账户密码"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <el-input
                v-model="registerForm.repassword"
                placeholder="请再次确认密码"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleReg">注册</el-button>
            </el-form-item>
            <span>已有账号 </span>
            <el-link type="primary" @click="$router.push('/login')">去登录</el-link>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api/register.js'
export default {
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        repassword: ''
      },
      registerFormRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { pattern: /^[a-z\d]{6,10}$/i, message: '用户名为6-10为字母数字' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '请输入6-15位密码', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '请确认6-15位密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 兜底校验
    handleReg() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        const {
          data: { code, message }
        } = await registerAPI(this.registerForm)
        if (code === 0) {
          this.$message.success(message)
          this.$router.push('/login')
        } else {
          this.$message.warning(message)
        }
      })
    }
  }
}
</script>

<style>
.register_container {
  position: relative;
  background: url('~@/assets/images/login_bg.jpg');
  background-size: 100% 100%;
  height: 100%;
  background-size: cover;
}
.register_box {
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
.register_info {
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
</style>
