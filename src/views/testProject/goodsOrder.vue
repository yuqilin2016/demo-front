<template>
  <div class="test">

    <el-form :model="searchOrder" ref="searchOrder">
      <el-input 
      v-model="searchOrder.number"
      placeholder="输入采购单号" 
      style="width: 200px"
      clearable />
      <el-input 
      v-model="searchOrder.ownerCode"
      placeholder="输入货主编码" 
      style="width: 150px;margin-left: 10px"
      clearable />
      <el-input 
      v-model="searchOrder.supplierCode"
      placeholder="输入供应商编码" 
      style="width: 150px;margin-left: 10px"
      clearable />
      <el-date-picker
        v-model="timeRange"
        value-format="yyyy-MM-dd'T'HH:mm:ss.SSS"
        :picker-options="pickerOptions1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="提交时间开始"
        end-placeholder="提交时间结束"
        style="margin-left: 10px">
      </el-date-picker>
      
      <el-button 
      type="primary" 
      style="margin-left: 10px" 
      @click="search">
      	查询
    	</el-button>
      <el-button icon="el-icon-plus" @click="toNewOrder"></el-button>
      <!-- <div>{{timeRange}}</div> -->
    </el-form>
    <el-table
    :data="tableData"
    :default-sort="{prop: 'commitTime', order: 'descending'}" 
    stripe highlight-current-row
    style="margin-top: 10px">
      <el-table-column sortable prop="number" label="采购单号" width="180">
      </el-table-column>
      <el-table-column align="center" label="货主信息">
      	<el-table-column prop="ownerName" label="货主名称" width="100">
      	</el-table-column>
      	<el-table-column sortable prop="ownerCode" label="货主编码" width="120">
      	</el-table-column>
      </el-table-column>
      <el-table-column  align="center" label="供应商信息">
      	<el-table-column prop="supplierName" label="供应商名称" width="100">
      		
      	</el-table-column>
      	<el-table-column sortable prop="supplierCode" label="供应商编码" width="120">
      		
      	</el-table-column>
      </el-table-column>
      <el-table-column  prop="count" label="订购商品种类数量" width="80"/>
      <el-table-column  align="center" sortable prop="sum" label="商品总数量" width="140"/>
      <el-table-column  sortable prop="commitTime" label="提交时间" width="180"/>
      <el-table-column  sortable prop="arriveDay" label="预计到货日期" width="180"/>
    </el-table>
    <el-pagination
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="ps"
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
      total: 0,
      ps: 10,
      pn: 1,
      searchOrder: {
      	number: '',
      	ownerCode: '',
      	supplierCode: '',
      	startTime: '',
      	endTime: ''
      },
      timeRange: [],
      params:{
      	conditions: {
      	    endTime: "",
      	    numberLike: "",
      	    ownerCodeLike: "",
      	    startTime: "",
      	    supplierCodeLike: ""
      	  },
      	pn:'',
      	ps:''
      }
    }
  },
  created() {
  	// var dataObj = Mock.mock({
  	// 	'tableData|200': [
  	// 	{
  	// 		'number': /\d{11}/,
  	// 		'ownerName': '货主@NATURAL(0,100)',
  	// 		'ownerCode': 'O@NATURAL(0,100)',
  	// 		'supplierName': '供应商@NATURAL(0, 100)',
  	// 		'supplierCode': 'S@NATURAL(0,100)',
  	// 		'count_kind': /\d{2}/,
  	// 		'count_sum': /\d{3}/,
  	// 		'commitTime': '@DATE("yyyy-MM-dd HH:mm:ss")',
  	// 		'arriveDay': '@DATE("yyyy-MM-dd")'
  	// 	}
  	// 	]
  	// })
  	// this.tableData = dataObj.tableData;
  	this.init();
  	// return this.tableData
  	// console.log(this.tableData);
  },
  methods: {
  	init: function () {
  		this.$http.post('/web/v1/order/page', {
  			pn:1,
  			ps:10
  		})
  		.then((res) => {
  			// console.log(res);
  			this.tableData = res.datas;
  			this.total = res.tc;

  			if (this.total > 0) {
  				this.tableData.forEach((value, index, array) => {
  					var parsedTime = this.parseTime(value.commitTime, 'full');
  					var parsedDay = this.parseTime(value.arriveDay, 'date');
  					this.$set(value, 'commitTime', parsedTime);
  					this.$set(value, 'arriveDay', parsedDay);
  					// if (value.sum === null) {
  					// 	this.$set(value, 'sum', 0);
  					// }
  				});
  			}
  		})
  		.catch((err) => {
  			console.error(err);
  		})
  	},
  	parseDay: function(msd) {
  		var date = new Date(msd);
  		var year = date.getFullYear();
  		var month = date.getMonth();
  		if (month + 1 <= 9) {
  			month = '0' + month + 1;
  		} else {
  			month += 1;
  		}
  		var day = date.getDate();
  		if (day <= 9) {
  			day = '0' + day;
  		}
  		return year+'-'+month+'-'+day;
  	},
  	parseTime: function(msd, parseType) {
  		//parseType:'full'表示'yyyy-MM-dd HH-mm-ss','date'表示'yyyy-MM-dd'
  		var date = new Date(msd);

  		var year = date.getFullYear(),
  				month = date.getMonth(),
					day = date.getDate();

  		if (month + 1 <= 9) {
  			month = '0' + month + 1;
  		} else {
  			month += 1;
  		}
  		if (day <= 9) {
  			day = '0' + day;
  		}

  		if (parseType === 'date') {
  			return `${year}-${month}-${day}`;
  		} else if (parseType === 'full') {
  			var hours = date.getHours(),
						minutes = date.getMinutes(),
						seconds = date.getSeconds();

  			if (hours <= 9) {
  				hours = '0' + hours;
  			}
  			if (minutes <= 9) {
  				minutes = '0' + minutes;
  			}
  			if (seconds <= 9) {
  				seconds = '0' + seconds;
  			}

  			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  		} else {
  			return '解析时间参数错误';
  		}
  	},
  	current_change: function(currentPage) {
  		this.pn = currentPage;
  		var params = {
  			ps: this.ps,
  			pn: this.pn
  		};
  		this.$http.post('/web/v1/order/page', params)
  		.then((response) => {
  			this.tableData = response.datas;
  			this.tableData.forEach((value, index, array) => {
  				this.tableData = response.datas;
  				// console.log(this.tableData);
  				this.total = response.tc;
  				this.tableData.forEach((value, index, array) => {
  					var parsedTime = this.parseTime(value.commitTime, 'full');
  					var parsedDay = this.parseTime(value.arriveDay, 'date');
  					this.$set(value, 'commitTime', parsedTime);
  					this.$set(value, 'arriveDay', parsedDay);
  					// if (value.sum === null) {
  					// 	this.$set(value, 'sum', 0);
  					// }
  				});
  			});
  		})
  		.catch((err) => {
  			console.error(err);
  		});
  	},
  	handleSizeChange: function(val) {
  		this.ps = parseInt(val);
  		this.pn = 1;

  		this.params.conditions.numberLike = this.searchOrder.number;
  		this.params.conditions.ownerCodeLike = this.searchOrder.ownerCode;
  		this.params.conditions.supplierCodeLike = this.searchOrder.supplierCode;
  		if (this.timeRange.length > 0) {
  			this.params.conditions.startTime = this.timeRange[0];
  			this.params.conditions.endTime = this.timeRange[1];
  		}
  		this.params.pn = 1;
  		this.params.ps = this.ps;

  		this.$http.post('/web/v1/order/page',this.params)
  		.then((response) => {
  			this.tableData = response.datas;
  			console.log(this.tableData);
  			this.total = response.tc;
  			this.tableData.forEach((value, index, array) => {
  				var parsedTime = this.parseTime(value.commitTime, 'full');
  				var parsedDay = this.parseTime(value.arriveDay, 'date');
  				this.$set(value, 'commitTime', parsedTime);
  				this.$set(value, 'arriveDay', parsedDay);
  				// if (value.sum === null) {
  				// 	this.$set(value, 'sum', 0);
  				// }
  			});
  		})
  		.catch((err) => {
  			console.error(err);
  		});
  	},
  	toNewOrder: function () {
  		this.$router.push('new-order');
  	},
  	search: function () {
  		// this.searchOrder.startTime = this.timeRange[0];
  		// this.searchOrder.endTime = this.timeRange[1];
  		this.params.conditions.numberLike = this.searchOrder.number;
  		this.params.conditions.ownerCodeLike = this.searchOrder.ownerCode;
  		this.params.conditions.supplierCodeLike = this.searchOrder.supplierCode;

  		if (this.timeRange.length > 0) {
  			this.params.conditions.startTime = this.timeRange[0];
  			this.params.conditions.endTime = this.timeRange[1];
  		}

  		this.params.pn = 1;
  		this.params.ps = this.ps;

  		this.$http.post('/web/v1/order/page', 
  		this.params)
  		.then((res) => {
  			// console.log(res);
  			this.tableData = res.datas;
  			this.total = res.tc;
  			if (this.total > 0) {
  				// for(var i=0; i<this.total; i++) {
  				// 	var parsedTime = this.parseTime(this.tableData[i].commitTime);
  				// 	var parsedDay = this.parseDay(this.tableData[i].arriveDay)
  				// 	this.$set(this.tableData[i], 'commitTime', 
  				// 		parsedTime);
  				// 	this.$set(this.tableData[i], 'arriveDay', 
  				// 		parsedDay);
  				// }
  				this.tableData.forEach((value, index, array) => {
  					var parsedTime = this.parseTime(value.commitTime, 'full');
  					var parsedDay = this.parseTime(value.arriveDay, 'date');
  					this.$set(value, 'commitTime', parsedTime);
  					this.$set(value, 'arriveDay', parsedDay);
  					// if (value.sum === null) {
  					// 	this.$set(value, 'sum', 0);
  					// }
  				});
  			}
  			// console.log(this.timeRange[0]);
  		})
  		.catch((err) => {
  			console.error(err);
  		});

  	}
  }
}
</script>

<style scoped>

</style>