<template>
  <div id="registeredBlog">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="text">M-SYSTEM</div>
      </div>
      <div>
        <el-form
          :model="blogLoginForm"
          status-icon
          :rules="rules"
          ref="blogLoginForm"
          class="demo-blogLoginForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="blogLoginForm.username"
              placeholder="username"
              maxlength="11"
              onkeyup="value=value.replace(/[^\w\/]/ig,'')"
            >
              <!-- onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')" -->
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="blogLoginForm.password"
              autocomplete="off"
              placeholder="password"
              maxlength="25"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="enterCode">
            <el-button
              class="verify"
              v-model="blogLoginForm.verificationCode"
              @click="changeCode"
            >{{blogLoginForm.verificationCode}}</el-button>

            <el-input
              class="enterVerifyCode"
              autocomplete="off"
              placeholder="Input verification code"
              v-model="blogLoginForm.enterCode"
              maxlength="5"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="loginBtn" type="primary" @click="submitForm('blogLoginForm')">登录</el-button>
            <div>
              <el-link disabled>还没有账号?</el-link>
              <span type="info" class="el-info" @click="jump">立即注册>></span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogLoginForm: {
        username: "",
        password: "",
        verificationCode: "", //验证码
        enterCode: "" //输入验证码
      },
      rules: {
        username: [
          {
            required: true,
            message: " username cannot be empty",
            trigger: "blur"
          },
          { min: 11, max: 11, trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: " username cannot be empty",
            trigger: "blur"
          },
          { min: 8, max: 25, trigger: "blur" }
        ],
        enterCode: [{ required: true, message: "Input verify code" }]
      }
    };
  },
  created() {
    this.changeCode();
  },
  methods: {
    submitForm(blogLoginForm) {
      var verifyCode = this.blogLoginForm.enterCode.toUpperCase();
      var _this = this;
      this.$refs[blogLoginForm].validate(valid => {
        if (valid) {
          if (verifyCode === this.blogLoginForm.verificationCode) {
            this.axios
              .post("/api/login", {
                username: _this.blogLoginForm.username,
                password: _this.blogLoginForm.password
              })
              .then(response => {
                console.log(response);
               
                if (response.data.code==1) {
                    this.$message({
                        message:"success",
                        type:"success"
                    })
                } else if(response.data.code==-1) {
                    this.$message({
                        message:"用户名或密码错误,请重新输入!!",
                        type:"error"
                    })
                }
                this.$router.push({ path: "/main" });
              });
          } else {
            this.$message.error("验证码不正确");
            this.changeCode()
          }
        } else {
          this.$message.error("请按要求填写对应信息");
        }
      });
    },

    changeCode() {
      //验证码
      let code = "";
      let codeLength = 5;
      let randomNumber = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (let i = 0; i < codeLength; i++) {
        let index = Math.floor(Math.random() * 36);
        code += randomNumber[index];
        //  console.log(code)
      }
      this.blogLoginForm.verificationCode = code;
    },
    jump() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>
<style scoped lang="less">
.registeredBlog {
}
.box-card {
  width: 380px;
  height: 380px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .text {
    text-align: center;
    color: red;
  }
  .loginBtn {
    width: 100%;
  }
  .el-info {
    color: red;
  }
  .el-info:hover {
    color: blue;
    cursor: pointer;
  }
  .verify {
    width: 50%;
    float: left;
    background-color: #ebebeb;
  }
  .enterVerifyCode {
    width: 50%;
  }
}
</style>
