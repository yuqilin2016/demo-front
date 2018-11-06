<template>
  <div style="width:100%">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <b>用户列表</b>
        <el-button type="text" style="float: right; padding: 3px 0">
          <router-link :to="{path:'/admin/newuser'}"> 新增用户 </router-link>
        </el-button>
      </div>
      <div style="width:300px;float:right;margin-bottom:16px;" >
        <el-input v-model="params.conditions.realNameLike" type="text" placeholder="请输入姓名进行查询" style="width:200px"/>
        <el-button type="primary" size="small" prop="realNameLike" @click="search">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="loginUserName"
          label="登录名"
          width="100">
          <template slot-scope="scope">
            <router-link :to="{path:'/admin/userdetails',query:{oUser:scope.row}}" style="color:blue;text-decoration:underline;">
              {{ scope.row.loginUserName }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="80"/>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="110"/>
        <el-table-column
          prop="userType"
          label="类型"
          width="100"/>
        <el-table-column
          prop="status"
          label="状态"
          width="60"/>
        <el-table-column
          prop="entryName"
          label="创建人"
          width="80"/>
        <el-table-column
          prop="entryDt"
          label="创建时间"
          width="100"
        />
        <el-table-column
          prop="updateName"
          label="更新人"
          width="80"/>
        <el-table-column
          prop="updateDt"
          label="更新时间"
          width="100"/>
        <el-table-column
          fixed="right"
          label="操作"
          style="position:relative;"
          min-width="240"
        >
          <template slot-scope="scope">

            <el-button type="primary" size="small">
              <!-- 点击查看时，获取当前行的登录名 并将数据（登录名）带到新的页面（用户详情页），通过登录名从后台获取数据，数据修改后提交给后台 -->
              <router-link :to="{path:'/admin/useredit',query:{loginUser:scope.row}}"> 编辑 </router-link>
            </el-button>
            <!-- 通过将当前登录名传给后台，后台根据登录名进行数据删除 -->
            <el-button type="danger" size="small" @click="open2()">删除</el-button>
            <el-button v-if="scope.row.status==1? true:false" type="warning" size="small" @click="changeStatus(scope.row)"> 禁用  </el-button>
            <el-button v-if="scope.row.status==0? true:false" type="success" size="small" @click="changeStatus(scope.row)"> 启用  </el-button>

          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :total="params.tc"
        :page-size="params.ps"
        background
        layout="prev, pager, next"
        @current-change="pageChange"/>
    </el-card>
  </div>
</template>
<style>
  th>.cell{
    width: 100%;
    text-align: center;
  }
  tr>td{
    text-align: center;
  }
</style>

<script>
import { parseTime } from '@/utils/index'
export default {
  name: 'UserManagement',
  data() {
    return {
      tableData: [],
      showThis: false,
      params: {
        ps: 3,
        pn: 0,
        tc: 0,
        conditions: {
          realNameLike: ''
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSizeChange(value) {
      alert(value)
    },
    open2() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取数据
    getList() {
      this.$http.post(this.$api.user.USERLIST, this.params).then(res => {
        this.tableData = res.datas
        this.params.tc = res.tc
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].updateDt = parseTime(this.tableData[i].updateDt, '{y}-{m}-{d}')
          this.tableData[i].entryDt = parseTime(this.tableData[i].entryDt, '{y}-{m}-{d}')
        }
      })
    },
    // 搜索
    search() {
      this.params.pn = 0
      this.getList()
    },
    // 分页获取数据
    pageChange(pn) {
      this.params.pn = pn
      this.getList()
    },
    // 状态改变
    changeStatus(value1) {
      if (value1.status === 1) {
        value1.status = 0
      } else {
        value1.status = 1
      }
      const params2 = {
        id: value1.id,
        status: value1.status
      }
      this.$http.post(this.$api.user.CHANGESTATUS, params2).then(res => {
      })
    }
  }
}

</script>
