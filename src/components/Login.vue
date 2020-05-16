<template>
  <div id="index">
    <div id="window">
      <div id="title">
        <h1>后台管理系统</h1>
      </div>
      <div id="border">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          style="width: 90%; margin: auto;"
        >
          <el-form-item prop="user">
            <el-input v-model="ruleForm.user" placeholder="请输入员工编号" autocomplete="off" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item prop="pw">
            <el-input v-model="ruleForm.pw" placeholder="请输入登录密码" show-password autocomplete="off" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入员工编号"));
      } else {
        callback();
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入登录密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        pw: ""
      },
      rules: {
        user: [{ validator: checkUser, trigger: "blur" }],
        pw: [{ validator: checkPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var username = this.ruleForm.user;
          var pass = this.ruleForm.pw;
          let getLogin = axios.getLogin(username, pass);
          getLogin.then(res => {
            console.log(res)
            if (res.data.State == "成功") {
              localStorage.setItem("ClientAddr",res.data.ClientAddr);
              this.$router.push({path: '/admin/openstatistics'});
            } else {
              this.$message.error("账号或密码错误");
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
#index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #2e67ae;
  height: 100vh;
}
#window {
  min-width: 250px;
  width: 80%;
  height: 280px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#title {
  width: calc(100% + 4px);
  margin: auto;
  margin-bottom: 22px;
  background-color: #2e67ae;
  color: white;
}
#title h1 {
  margin: 0px;
}
#border {
  width: 90%;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 2px solid white;
  border-radius: 10px;
  background-color: white;
}
.el-form-item__content{
  text-align: center;
}
</style>