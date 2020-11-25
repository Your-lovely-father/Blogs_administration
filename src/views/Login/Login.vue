<template>
  <div class="login_bg">
    <div class="box">
      <div class="login_box">
        <!--   title区域         -->
        <p class="title_h1">
          欢迎登陆 <span class="title_h3">王晓冷个人博客管理系统</span>
        </p>
        <!--    表单区        -->
        <el-form
          :model="loginForm"
          class="login_form"
          :rules="rules"
          ref="loginFormRef"
        >
          <!--    用户区   -->
          <el-form-item prop="email">
            <el-input
              v-model="loginForm.email"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <!--     密码区      -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login()" class="color_login"
              >登录</el-button
            >
            <el-button type="info" @click="reset" class="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../../api/login";
export default {
  data() {
    var validatorEmail = function (rule, value, callback) {
      let Email = /^\w{5,}@[a-z0-9]{2,3}\.[a-z]+$|\,$/;
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else if (!Email.test(value)) {
        callback(new Error("邮箱号格式错误"));
      } else {
        callback(); //重点
      }
    };
    var validatorPass = function (rule, value, callback) {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (!/^[a-zA-Z0-9]{6,18}$/.test(value)) {
        callback(new Error("密码长度6-18位"));
      } else {
        callback(); //重点
      }
    };
    return {
      loginForm: {
        email: "95241616@qq.com",
        password: "",
      },
      rules: {
        email: [{ validator: validatorEmail, trigger: "blur" }],
        password: [{ validator: validatorPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    reset() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate((value) => {
        if (!value) return;
        Api.login(this.loginForm).then((res) => {
          if (res.code == 0 ) {
            this.$message.success(res.message);
            window.localStorage.setItem('token',res.data._id)
            this.$router.push("/browse");
          } else {
            this.$message.error(res.message);
            return;
          }
        });
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
}
.login_bg {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url("../../assets/img/wallhaven-xlx51z.jpg") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.box {
  width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login_box {
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 0 0 10px #eee;
  border: 1px #eee solid;
  padding: 5px 0;
}
.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  margin-top: 30px;
  padding: 0 20px;
  box-sizing: border-box;
}

.title_h1 {
  text-align: center;
  width: 100%;
  font-size: 25px;
  font-weight: bold;
  margin-top: 35px;
}

.title_h3 {
  font-size: 18px;
  font-weight: bold;
}

.color_login {
  background: #ffbd14;
  outline: none;
  border: none;
}

.reset {
  outline: none;
  border: none;
}

@media (max-width: 550px) {
  .box {
    width: 90%;
  }
}
</style>
