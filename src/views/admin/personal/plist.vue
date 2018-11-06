<template>
  <div style="width:100%;padding:0 20px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <b>人员列表</b>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="/admin/newperson"> 新增人员 </router-link>
        </el-button>
      </div>
      <div style="width:300px;float:right;margin-bottom:16px;">
        <el-input v-model="params.conditions.nameLike" type="text" placeholder="请输人员信息" style="width:200px"/>
        <el-button type="primary" size="small" props="nameLike" @click="search">搜索</el-button>
      </div>

      <el-table
        :data="tableData"
        border
        style="width: 100%;text-align:center">
        <el-table-column
          fixed
          prop="userId"
          label="编号"
          width="100"
        >
          <template slot-scope="scope">
            <router-link :to="{path:'/admin/pdetails',query:{row:scope.row}}" style="color:blue;text-decoration:underline;">
              {{ scope.row.userId }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="80"/>
        <el-table-column
          prop="graduateSchool"
          label="毕业学校"
          width="100"/>
        <el-table-column
          prop="major"
          label="专业"
          width="100"/>
        <el-table-column
          prop="graduateDate"
          label="毕业时间"
          width="106"/>
        <el-table-column
          prop="tutorId"
          label="导师"
          width="80"/>
        <el-table-column
          prop="joinedDate"
          label="入职时间"
          width="106"/>
        <el-table-column
          prop="nativePlace"
          label="籍贯"
          width="100"/>
        <el-table-column
          prop="birthDate"
          label="出生日期"
          width="106"/>
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
          width="106"/>
        <el-table-column
          prop="updateName"
          label="更新人"
          width="80"/>
        <el-table-column
          prop="updateDt"
          label="更新时间"
          width="106"/>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="240"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small">
              <!--  进入编辑页， -->
              <router-link :to="{path:'/admin/pedit',query:{message:scope.row}}" > 编辑 </router-link>
            </el-button>
            <el-button type="danger" size="small">删除</el-button>
            <el-button v-authorize="MANAGER" v-if="scope.row.status==1? true:false" type="warning" size="small" @click="changeStatus(scope.row)"> 禁用  </el-button>
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
  name: 'Plist',
  data() {
    return {
      // 人员列表数据，后台获取
      content: null,
      tableData: [],
      params: {
        ps: 3,
        pn: 0,
        tc: 0,
        conditions: {
          name: ''
        }
      }
    }
  },
  created() {
    this.getPlist()
  },
  methods: {
    // 获取数据
    getPlist() {
      this.$http.post(this.$api.personal.PERSONALLIST, this.params).then(res => {
        this.tableData = res.datas
        this.params.tc = res.tc
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].birthDate = parseTime(this.tableData[i].birthDate, '{y}-{m}-{d}')
          this.tableData[i].graduateDate = parseTime(this.tableData[i].graduateDate, '{y}-{m}-{d}')
          this.tableData[i].joinedDate = parseTime(this.tableData[i].joinedDate, '{y}-{m}-{d}')
          this.tableData[i].entryDt = parseTime(this.tableData[i].entryDt, '{y}-{m}-{d}')
          this.tableData[i].updateDt = parseTime(this.tableData[i].updateDt, '{y}-{m}-{d}')
        }
      }).catch((err) => {
        alert(err)
      })
    },
    // 搜索
    search() {
      this.params.pn = 0
      this.getPlist()
    },
    // 分页获取数据
    pageChange(pn) {
      this.params.pn = pn
      this.getPlist()
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
      this.$http.post(this.$api.personal.CHANGESTATUS, params2).then(res => {
      })
    }

  }
}
</script>

