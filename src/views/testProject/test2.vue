<template>
	<div>
		<el-form :model="searchOrder" ref="searchOrder">
			<el-row :gutter="10">
				<el-col :span="5">
					<el-input 
					v-model="searchOrder.number"
					placeholder="输入采购单号" 
					clearable />
				</el-col>
				<el-col :span="4">
					<el-input 
					v-model="searchOrder.ownerCode"
					placeholder="输入货主编码" 
					clearable />
				</el-col>
				<el-col :span="4">
					<el-input 
					v-model="searchOrder.supplierCode"
					placeholder="输入供应商编码" 
					clearable />
				</el-col>
				<el-col :span="7">
					<el-date-picker
						class="datePicker"
						v-model="searchOrder.timeRange"
					  value-format="yyyy-MM-dd'T'HH:mm:ss.SSS"
					  :picker-options="pickerOptions1"
					  type="datetimerange"
					  range-separator="至"
					  start-placeholder="提交时间开始"
					  end-placeholder="提交时间结束"
					  style="width: 100%">
					</el-date-picker>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" style="width: 30%">
		  		查询
					</el-button>
		  		<el-button icon="el-icon-plus" style="width: 30%"></el-button>
				</el-col>
			</el-row>
		  <!-- <div>{{timeRange}}</div> -->
		</el-form>

	  <el-table
	  :data="tableData"
	  :default-sort="{prop: 'commitTime', order: 'descending'}" 
	  highlight-current-row
	  style="margin-top: 10px">
	    <el-table-column sortable prop="number" label="采购单号" min-width="180">
	    </el-table-column>
	    <el-table-column align="center" label="货主信息">
	      <el-table-column prop="ownerName" label="货主名称" min-width="120">
	      </el-table-column>
	      <el-table-column sortable prop="ownerCode" label="货主编码" min-width="120">
	      </el-table-column>
	    </el-table-column>
	    <el-table-column  align="center" label="供应商信息">
	      <el-table-column prop="supplierName" label="供应商名称" min-width="120">
	      </el-table-column>
	      <el-table-column sortable prop="supplierCode" label="供应商编码" min-width="120">
	      </el-table-column>
	    </el-table-column>
	    <el-table-column  prop="count" label="商品种类" min-width="80"/>
	    <el-table-column  align="center" sortable prop="sum" label="商品总数量" min-width="120"/>
	    <el-table-column  sortable prop="commitTime" label="提交时间" min-width="160"/>
	    <el-table-column  sortable align="center" prop="arriveDay" label="预计到货日期" min-width="140"/>
	  </el-table>
	</div>
</template>
<script>
import Mock from 'mockjs'
export default {
	data () {
		return {
			searchOrder:{},
			tableData:[],
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
          'ownerName': '@FIRST',
          'ownerCode': '@NATURAL(0,100)',
          'supplierName': '@FIRST',
          'supplierCode': '@NATURAL(0,100)',
          'count': '@NATURAL(0,10)',
          'sum': '@NATURAL(0,1000)',
          'commitTime': '@DATE("yyyy-MM-dd HH:mm:ss")',
          'arriveDay': '@DATE'
        }]
      })
      console.log(datas)
      this.tableData = datas.datas
      // console.log(this.tableData)
  	}
  }
}
</script>
<style>

</style>