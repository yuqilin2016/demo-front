<template>
  <div style="width:100%;padding:0 20px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <b>角色列表</b>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="/admin/newrole"> 新增角色 </router-link>
        </el-button>
      </div>

      <div style="width:300px;float:right;margin-bottom:16px;">
        <el-input v-model="params.conditions.nameLike" type="text" placeholder="请输角色名称" style="width:200px"/>
        <el-button type="primary" size="small" prop="nameLike" @click="search" >搜索</el-button>
      </div>

      <el-table
        :data="tableData"
        border
        style="width: 100%;text-align:center">
        <el-table-column
          prop="id"
          label="id"
          width="80"/>
        <el-table-column
          fixed
          prop="code"
          label="角色编码"
          width="100"
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/admin/roledetails',query:{role:scope.row}}" style="color:blue;text-decoration:underline;">
              {{ scope.row.code }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          width="100"/>
        <el-table-column
          prop="status"
          label="状态"
          width="100"/>
        <el-table-column
          prop="entryName"
          label="创建人"
          width="100"/>
        <el-table-column
          prop="entryDt"
          label="创建时间"
          width="150"/>
        <el-table-column
          prop="updateName"
          label="更新人"
          width="100"/>
        <el-table-column
          prop="updateDt"
          label="更新时间"
          width="150"/>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="240"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small">
              <router-link :to="{path:'/admin/roedit',query:{rolemessage:scope.row}}"> 编辑 </router-link>
            </el-button>
            <el-button type="danger" size="small" @click="open2()">删除</el-button>
            <el-button v-if="scope.row.status==1? true:false" type="warning" size="small" @click="changeStatus(scope.row)"> 禁用  </el-button>
            <el-button v-if="scope.row.status==0? true:false" type="success" size="small" @click="changeStatus(scope.row)"> 启用  </el-button>
          </template>
        </el-table-column>
      </el-table>
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

</style>

<script>
import { parseTime } from '@/utils/index'
export default {
  name: 'Role',
  data() {
    return {
      // 角色信息数据，从后台获取
      tableData: [],
      params: {
        ps: 3,
        pn: 0,
        tc: 0,
        conditions: {
          nameLike: ''
        }
      }
    }
  },
  created() {
    this.getRolelist()
  },
  methods: {
    // 数据的获取
    getRolelist() {
      this.$http.post(this.$api.role.ROLELIST, this.params).then(res => {
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
      this.getRolelist()
    },
    // 分页获取数据
    pageChange(pn) {
      this.params.pn = pn
      this.getRolelist()
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
      this.$http.post(this.$api.role.CHANGESTATUS, params2).then(res => {
      })
    }
  }
}
</script>
