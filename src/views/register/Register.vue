<template>
  <div id="registeredBlog">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="text">M-SYSTEM</div>
      </div>
      <div>
        <el-form
          :model="registeredForm"
          status-icon
          :rules="rules"
          ref="registeredForm"
          class="demo-registeredForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="registeredForm.username"
              placeholder="username"
              onkeyup="value=value.replace(/[^\w\/]/ig,'')"
              maxlength="11"
            >
              <!-- onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')" -->
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="registeredForm.password"
              autocomplete="off"
              placeholder="password"
              maxlength="25"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="checkPassword">
            <el-input
              type="password"
              v-model="registeredForm.checkPassword"
              autocomplete="off"
              placeholder="checkPassword"
              maxlength="25"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              class="registeredBtn"
              type="primary"
              @click="submitForm('registeredForm')"
            >注册</el-button>
            <div>
              <el-link disabled>已有账号,</el-link>
              <span type="info" class="el-info" @click="jump">直接登录>></span>
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
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter your password"));
      } else if (value !== this.registeredForm.password) {
        callback(new Error("Password inconsistency"));
      } else {
        callback();
      }
    };
    return {
      registeredForm: {
        username: "",
        password: "",
        checkPassword: ""
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
        checkPassword: [
          { validator: validatePass2, trigger: "blur" },
          { min: 8, max: 25, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var _this = this;
          this.axios
            .post("/api/register", {
              username: _this.registeredForm.username,
              password: _this.registeredForm.password
            })
            .then(response => {
              console.log(response);
              if (response.data.code == 1) {
                this.$message({
                  message: "REGISTERED SUCCESS",
                  type: "success"
                });
                this.$router.push({ path: "/login" });
              } else if (response.data.code == -1) {
                this.$message({
                  message: "该账号已被注册",
                  type: "warning"
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    jump() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style scoped lang="less">
#registeredBlog {
  // background-color: red;
  width: 100%;
  height: 100%;
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
  .registeredBtn {
    width: 100%;
  }
  .el-info {
    color: red;
  }
  .el-info:hover {
    color: blue;
    cursor: pointer;
  }
}
</style>