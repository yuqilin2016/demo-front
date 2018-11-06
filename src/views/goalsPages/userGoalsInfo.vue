<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>成员目标审核</span>
    </div>
    <div style="margin: 15px;float: right;">
      <el-select slot="prepend" v-model="select" placeholder="请选择" style="display: inline-block;width: 120px">
        <!-- <el-option label="编号" value="1"></el-option> -->
        <el-option label="姓名" value="1"/>
        <el-option label="阶段" value="2"/>
        <el-option label="标题" value="3"/>
        <el-option label="状态" value="4"/>
        <el-option label="提交日期" value="5"/>
      </el-select>
      <!-- <el-select @click="inputFoo" v-model="searchInfo" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
          <el-option v-for="item in searchData" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select> -->
      <el-input v-if="(select == 1||select == 3||select == 0)?true:false" v-model="searchInfo" placeholder="请输入内容" clearable style="display: inline-block;width: 350px"/>
      <!-- 选择阶段时 ，会变成选择框 -->

      <el-select v-if="(select == 2)?true:false" slot="prepend" v-model="searchInfo" style="display: inline-block;width: 350px" placeholder="请选择">
        <el-option label="第一阶段" value="1"/>
        <el-option label="第二阶段" value="2"/>
        <el-option label="第三阶段" value="3"/>
        <el-option label="第四阶段" value="4"/>
      </el-select>
      <!-- 状态 -->
      <el-select v-if="(select == 4)?true:false" slot="prepend" v-model="searchInfo" style="display: inline-block;width: 350px" placeholder="请选择">
        <el-option label="新建" value="1"/>
        <el-option label="已拒绝" value="2"/>
        <el-option label="待审核" value="3"/>
        <el-option label="已通过" value="4"/>
      </el-select>

      <div v-if="(select == 5)?true:false" class="block" style="display: inline-block;">
        <!-- 提交日期搜索框 -->
        <el-date-picker v-model="searchInfo" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"/>
      </div>
      <el-button slot="append" icon="el-icon-search" style="display: inline-block;width: 50px" @click="search"/>
    </div>

    <div>
      <el-table :data="tableData" border style="width: 100%;text-align:center" fit>
        <!-- <el-table-column prop="userId" label="编号" width="90"/> -->
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phase" label="阶段" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="seDate" label="起止日期" />
        <el-table-column prop="submitter" label="提交人" />
        <el-table-column prop="submitDt" label="提交时间" />
        <el-table-column prop="auditor" label="审核人" />
        <el-table-column prop="auditDt" label="审核时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="examineGoals(scope.$index, scope.row)">审核
              <!-- <router-link :to="{path:'/manager/userGoals',query:{userId: scope.row.userId}}"> 审核 </router-link> -->
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :total="postData.tc"
        :page-size="postData.ps"
        background
        layout="prev, pager, next"
        @current-change="pageChange"/>
    </div>

  </el-card>
</template>

<script>
import { parseTime } from '@/utils/index'

export default {
  name: 'UserGoalsInfo',
  data() {
    return {
      // pageSize: 5,
      // 列表中有数据的总数
      searchInfo: '', // 输入框中输入的值
      select: '', // 选择搜索的选项
      // 搜索提交时间的数据
      selectPerson: null,
      statusTrans: ['新建', '已拒绝', '待审核', '已通过'],
      phaseTrans: ['第一阶段', '第二阶段', '第三阶段', '第四阶段'],
      postData: {
        conditions: {},
        ps: 4,
        pn: 1,
        tc: 0
      }, // 传出数据
      tableData: [],
      nameSelect: {} // 传入接受数据
    }
  },
  watch: { select: function clearSearchInfo() {
    this.searchPost = {}
    this.postData.conditions = {}
    this.searchInfo = ''
  } },
  created() {
    this.getData(this.postData)
  },
  methods: {
    // 获取数据方法
    getData(data) {
      this.$http.post(this.$api.manager.USERGOALS_LIST, data).then((res) => {
        this.tableData = res.datas
        this.postData.tc = res.tc
        this.transData()
        // console.log(this.postData.tc)
        // console.log(this.postData.pn)
        // console.log(this.postData.ps)
      }).catch(error => {
        console.log(error)
      })
    },
    // 姓名、阶段、状态转换方法
    transData() {
      this.tableData.forEach((item, index) => {
        item.submitDt = parseTime(item.submitDt)
        item.auditDt = parseTime(item.auditDt)
        item.startDate = parseTime(item.startDate)
        item.endDate = parseTime(item.endDate)
        item.seDate = `${item.startDate} ~ ${item.endDate}`
        item.phase = this.phaseTrans[item.phase - 1]
        item.status = this.statusTrans[item.status - 1]
      })
    },
    pageChange(pn) {
      this.postData.pn = pn
      this.getData(this.postData)
    },
    // 搜索方法
    search() {
      switch (parseInt(this.select)) {
        case 1:
          this.nameSelect.nameLike = this.searchInfo
          this.$http.post(this.$api.manager.SEARCH_NAME, this.nameSelect).then(res => {
            // console.log(res)
            this.tableData = res
            this.postData.tc = res ? res.length : 0
            this.transData()
          }).catch(error => {
            console.log(error)
          })
          // this.clearSearchInfo()
          // this.postData.conditions.nameLike = this.searchInfo
          // this.getData(this.postData)
          // this.clearSearchInfo()
          break
        case 2:
          this.postData.conditions.phase = parseInt(this.searchInfo)
          this.getData(this.postData)
          // this.clearSearchInfo()
          break
        case 3:
          this.postData.conditions.titleLike = this.searchInfo
          this.getData(this.postData)
          // this.clearSearchInfo()
          break
        case 4:
          this.postData.conditions.status = parseInt(this.searchInfo)
          this.getData(this.postData)
          // this.clearSearchInfo()
          break
        case 5:
          this.postData.conditions.submitDtStart = this.searchInfo[0]
          this.postData.conditions.submitDtEnd = this.searchInfo[1]
          this.getData(this.postData)
          // this.clearSearchInfo()
          break
      }
    },
    // 审核方法
    examineGoals(index, row) {
      this.selectPerson = row.userId
      this.$router.push({ path: 'userGoals', query: { id: this.selectPerson }})
    }
  }
}
</script>
<style>
  th>.cell {
    width: 100%;
    text-align: center;
  }
  .a {
    display: inline-block;
    width: 120px
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>

