<template>
  <div class="M_system">
    <el-divider content-position="right" @click="AddContent">ADD</el-divider>
    <div>
      <el-input placeholder="请输入内容" v-model="search">
        <template slot="prepend">查询数据</template>
      </el-input>
    </div>

    <!-- 表格内容 -->
    <el-table
      :data="tableData.filter(data=>!search||data.name.toLowerCase().includes(search.toLowerCase())||data.phone.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*PageSize,currentPage*PageSize)"
      border
      style="width: 100%;margin-top:10px;"
    >
      <el-table-column fixed prop="date" label="date" width="250"></el-table-column>
      <el-table-column prop="name" label="name" width="200"></el-table-column>
      <el-table-column prop="phone" label="phone" width="200"></el-table-column>
      <el-table-column prop="idCard" label="idCard" width="300"></el-table-column>
      <el-table-column prop="address" label="address" width="350"></el-table-column>
      <el-table-column prop="email" label="email" width="320"></el-table-column>
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.$index,scope.row)" type="text" size="small">Edit</el-button>
          <el-button type="text" size="small" @click="delRow(scope.$index,scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
    <AddContent :dialogVisible="dialogVisible" @update="getUserInfo"></AddContent>
    <EditContent :dialogEdit="dialogEdit" :editFrom="editFrom" @update="getUserInfo"></EditContent>
    <router-view></router-view>
  </div>
</template>

<script>
import AddContent from "../content/AddContent";
import EditContent from "../content/EditContent";
export default {
  components: {
    AddContent,
    EditContent
  },
  name: "MSYSTEM",
  data() {
    return {
      // AddContent 弹出框
      dialogVisible: {
        show: false
      },
      dialogEdit: {
        show: false
      },
      // search 查询数据
      search: "",
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      //  totalCount:1,
      // 个数选择器（可修改）
      pageSizes: [10, 20, 30, 40],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
      editFrom: {
        date: "",
        name: "",
        phone: "",
        idCard: "",
        address: "",
        email: ""
      },
      tableData: []
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    editClick(index, row) {
      this.dialogEdit.show = true;
      this.editFrom = {
        date: row.date,
        name: row.name,
        phone: row.phone,
        idCard: row.idCard,
        address: row.address,
        email: row.email,
        id: row.id
      };
    },
    AddContent() {
      this.dialogVisible.show = true;
    },
    delRow(index, row) {
      this.axios.post('/api/delete',{id:row.id}).then(response => {
        console.log("success");
         console.log(response);
        this.getUserInfo();
      });
    },
    getUserInfo: function() {
      // var api = "http://localhost:3000/management";
      this.axios.get("/api/search").then(response => {
        this.tableData = response.data;
        console.log(response);
      });
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    }
  }
};
</script>
<style scoped lang="less">
.M_system {
  padding: 25px;
}

// AddContent style
.el-divider {
  cursor: pointer;
}
</style>
