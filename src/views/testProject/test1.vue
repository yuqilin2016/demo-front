<template>
	<div>
	  <el-table
	 :data="tableData" :default-sort="{prop: 'importDt', order: 'descending'}"  highlight-current-row>
	  <el-table-column sortable prop="number" label="商品编码" min-width="180"/>
	  <el-table-column prop="name" label="商品名称" min-width="180"/>
	  <el-table-column sortable prop="price" label="价格" min-width="120"/>
	  <el-table-column sortable prop="importDt" label="导入时间" min-width="180"/>
	</el-table>
	</div>
</template>
<script>
import Mock from 'mockjs'
export default {
	data () {
		return {
			tableData:[]
		}
	},
	created: function(){
  	this.init();
  },
  methods: {
  	init () {
  		var datas = Mock.mock({
        'datas|10':[{
          'number|+1': 201811250000,
          'name': '@STRING',
          'price': '@NATURAL(0,2000)',
          'importDt': '@DATE'
        }]
      })
      console.log(datas)
      this.tableData = datas.datas
      // console.log(this.tableData)
  	}
  }
}
</script>
