<template>
  <div class="addcontent">
    <el-dialog title="添加用户信息" :visible.sync="dialogEdit.show" width="50%">
      <div class="addContent">
        <el-form
          :model="editFrom"
          :rules="rules"
          ref="editData"
          label-width="100px"
          class="demo-editFrom"
          size="mini"
        >
          <el-form-item label="date" prop="date">
            <el-date-picker
              type="date"
              v-model="editFrom.date"
              placeholder="select date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="name" prop="name">
            <el-input v-model="editFrom.name" placeholder="enter user name" maxlength="10"></el-input>
          </el-form-item>

          <el-form-item label="phone" prop="phone">
            <el-input v-model="editFrom.phone" placeholder="enter phone" maxlength="11"></el-input>
          </el-form-item>

          <el-form-item label="idCard" prop="idCard">
            <el-input v-model="editFrom.idCard" placeholder="enter idCard" maxlength="18"></el-input>
          </el-form-item>

          <el-form-item label="address" prop="address">
            <el-input v-model="editFrom.address" placeholder="enter address" maxlength="25"></el-input>
          </el-form-item>

          <el-form-item label="email" prop="email">
            <el-input v-model="editFrom.email" placeholder="enter email" maxlength="25"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogEdit.show=false">取 消</el-button> -->
        <el-button @click="dialogEdit.show=false">取 消</el-button>
        <el-button type="primary" @click="determine('editData')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "EditContent",
  props: {
    dialogEdit: Object,
    editFrom: Object
  },
  data() {
    return {
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
    determine(editData) {
      console.log(editData);
      this.$refs[editData].validate(valid => {
        if (valid) {
          // var api='http://localhost:3000/management';
          console.log(this.editFrom.id);
          this.axios
            .post("/api/update", {
              id: this.editFrom.id,
              name: this.editFrom.name,
              date: this.editFrom.date,
              phone: this.editFrom.phone,
              idCard: this.editFrom.idCard,
              address: this.editFrom.address,
              email: this.editFrom.email
            })
            .then(response => {
              this.$message({
                type: "success",
                message: "success"
              });
              console.log(response)

              this.dialogEdit.show = false;
              this.$emit("update");
              // this.$emit("key值","this.editFrom")传递的是两个参数，一个key，一个是你要传递的值
              this.$emit("updateEdit");
            });
          // this.editFrom="";
        } else {
          console.log("error");
          return false;
        }
      });
    }
    // cancel() {
    //     this.dialogEdit.show=false;
    //     // this.editFrom=''
    // }
  }
};
</script>

<style scoped>
</style>