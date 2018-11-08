<template>
  <div class="test">

    <el-form>
      <el-input placeholder="输入商品编码" style="width: 230px"/>
      <el-input placeholder="输入商品名称" style="width: 230px;margin-left: 20px"/>
      <el-button type="primary" style="margin-left: 10px">查询</el-button>
    </el-form>
    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" :default-sort="{prop: 'time', order: 'descending'}" stripe style="width: 100%">
      <el-table-column sortable prop="encoding" label="商品编码" width="180"/>
      <el-table-column prop="name" label="商品名称" width="180"/>
      <el-table-column sortable prop="price" label="价格" width="100"/>
      <el-table-column sortable prop="time" label="导入时间" width="180"/>
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
      // tableData: [{
      //   encoding: '20150203023001',
      //   name: 'iPhone 7 128G',
      //   price: '100',
      //   time: '2015-01-01 12:20:22'
      // }, {
      //   encoding: '20150203023002',
      //   name: 'iPhone 7 128G',
      //   price: '100',
      //   time: '2015-01-01 12:20:22'
      // }, {
      //   encoding: '20150203023003',
      //   name: 'iPhone 7 128G',
      //   price: '100',
      //   time: '2015-01-01 12:20:22'
      // }, {
      //   encoding: '20150203023004',
      //   name: 'iPhone 7 128G',
      //   price: '100',
      //   time: '2015-01-01 12:20:22'
      // }]
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
  			'encoding': /\d{13}/,
  			'name': 'iPhone @NATURAL(5,8) 128G',
  			'price': /\d{3}/,
  			'time': '@DATE("yyyy-MM-dd HH:mm:ss")'
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
  	}
  }
}
</script>
