<template>
  <div>
    <el-dialog title="添加用户信息" :visible.sync="dialogVisible.show" width="50%">
      <div class="addContent">
        <el-form
          :model="addContentForm"
          :rules="rules"
          ref="addData"
          label-width="100px"
          class="demo-addContentForm"
          size="mini"
        >
          <el-form-item label="date" prop="date">
            <el-date-picker
              type="date"
              v-model="addContentForm.date"
              placeholder="select date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="name" prop="name">
            <el-input v-model="addContentForm.name" placeholder="enter user name" maxlength="10"></el-input>
          </el-form-item>

          <el-form-item label="phone" prop="phone">
            <el-input
              v-model="addContentForm.phone"
              placeholder="enter phone"
              maxlength="11"
              oninput="value=value.replace(/[^\d]/g, '')"
            ></el-input>
          </el-form-item>

          <el-form-item label="idCard" prop="idCard">
            <el-input
              v-model="addContentForm.idCard"
              placeholder="enter idCard"
              maxlength="18"
              onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)));"
            ></el-input>
          </el-form-item>

          <el-form-item label="address" prop="address">
            <el-input v-model="addContentForm.address" placeholder="enter address" maxlength="25"></el-input>
          </el-form-item>

          <el-form-item label="email" prop="email">
            <el-input v-model="addContentForm.email" placeholder="enter email" maxlength="25"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible.show=false">取 消</el-button> -->
        <el-button @click="dialogVisible.show=false">取 消</el-button>
        <el-button type="primary" @click="determine('addData')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "AddContent",
  props: {
    dialogVisible: Object
  },
  data() {
    return {
      addContentForm: {
        date: "",
        name: "",
        phone: "",
        idCard: "",
        address: "",
        email: ""
      },
      rules: {
        date: [
          { required: true, message: "please enter date", trigger: "blur" }
        ],
        name: [
          {
            required: true,
            message: "please enter user name",
            trigger: "blur"
          },
          { min: 2, max: 10, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "please enter phone", trigger: "blur" },
          { min: 11, max: 11, trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "please enter idCard", trigger: "blur" },
          { min: 18, max: 18, trigger: "blur" }
        ],
        address: [
          { required: true, message: "please enter address", trigger: "blur" },
          { min: 5, max: 25, trigger: "blur" }
        ],
        email: [
          { required: true, message: "please enter email", trigger: "blur" },
          { type: "email", min: 10, max: 25, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    determine(addData) {
      this.$refs[addData].validate(valid => {
        if (valid) {
          this.axios
            .post("/api/addContent", this.addContentForm)
            .then(response => {
              console.log(response);

              if (response.data.status == 1) {
                this.$message({
                  type: "success",
                  message: "success"
                });
              } else if (response.data.status == -1) {
                this.$message({
                  message: "信息已存在",
                  type: "error"
                });
              }
              this.dialogVisible.show = false;
              this.$emit("update");
            //   this.addContentForm = "";
            });
            
        } else {
          console.log("error");
          return false;
        }
      });
    }
    // cancel() {
    //     this.dialogVisible.show=false;
    //     // this.addContentForm=''
    // }
  }
};
</script>

<style scoped>
</style>