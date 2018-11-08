<template>
  <div class="test">

    <el-form>
      <el-input placeholder="输入采购单号" style="width: 150px"/>
      <el-input placeholder="输入货主编码" style="width: 150px;margin-left: 10px"/>
      <el-input placeholder="输入供应商编码" style="width: 150px;margin-left: 10px"/>
      <el-date-picker
        v-model="value1"
        :picker-options="pickerOptions1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="提交时间开始"
        end-placeholder="提交时间结束"
        style="margin-left: 10px"/>
      <!-- <el-date-picker type="datetime" placeholder="提交时间结束" style="width: 150px;margin-left: 10px"></el-date-picker> -->
      <el-button type="primary" style="margin-left: 10px">查询</el-button>
      <el-button icon="el-icon-plus" @click="toNewOrder"/>
    </el-form>
    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" :default-sort="{prop: 'submit_time', order: 'descending'}" stripe style="width: 100%">
      <el-table-column sortable prop="id" label="采购单号" width="180"/>
      <el-table-column prop="owner" label="货主信息" width="180"/>
      <el-table-column prop="supplier" label="供应商信息" width="180"/>
      <el-table-column sortable prop="count_kind" label="订购商品种类数量" width="180"/>
      <el-table-column sortable prop="count_sum" label="商品总数量" width="180"/>
      <el-table-column sortable prop="submit_time" label="提交时间" width="180"/>
      <el-table-column sortable prop="expect_date" label="预计到货日期" width="180"/>
    </el-table>
    <el-pagination
      :total="total"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="current_change"/>
    <back-to-top/>
  </div>
</template>

<script>
import Mock from 'mockjs'
import BackToTop from '@/components/BackToTop'

export default {
  components: {
    BackToTop
  },
  data() {
    return {
      value1: '',
      pickerOptions1: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: [],
      total: 200,
      pageSize: 20,
      currentPage: 1
    }
  },
  created() {
  	var dataObj = Mock.mock({
  		'tableData|200': [
  		{
  			'id': /\d{11}/,
  			'owner': '货主@NATURAL(0,100)',
  			'supplier': '供应商@NATURAL(0, 100)',
  			'count_kind': /\d{2}/,
  			'count_sum': /\d{3}/,
  			'submit_time': '@DATE("yyyy-MM-dd HH:mm:ss")',
  			'expect_date': '@DATE("yyyy-MM-dd")'
  		}
  		]
  	})
  	this.tableData = dataObj.tableData
  	return this.tableData
  	// console.log(this.tableData);
  },
  methods: {
  	current_change: function(currentPage) {
  		this.currentPage = currentPage
  	},
  	handleSizeChange: function(val) {
  		this.pageSize = parseInt(val)
  		this.currentPage = 1
  	},
  	toNewOrder: function() {
  		this.$router.push('new-order')
  	}
  }
}
</script>
