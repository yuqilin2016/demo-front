<template>
  <div class="test">

    <el-form :model="searchForm" ref="searchForm">
      <el-input 
      v-model="searchForm.number" 
      placeholder="输入商品编码" 
      style="width: 230px"
      clearable />
      <el-input 
      v-model="searchForm.name" 
      placeholder="输入商品名称" 
      style="width: 230px;margin-left: 20px"
      clearable />
      <el-button type="primary" style="margin-left: 10px" 
      @click="submitForm('searchForm')">查询
      </el-button>
    </el-form>
    <div style="width: 650px">
      <el-table :data="tableData" :default-sort="{prop: 'importDt', order: 'descending'}" stripe style="width: 100%">
      <el-table-column sortable prop="number" label="商品编码" width="180"/>
      <el-table-column prop="name" label="商品名称" width="180"/>
      <el-table-column sortable prop="price" label="价格" width="100"/>
      <el-table-column sortable prop="importDt" label="导入时间" />
    </el-table>
    </div>
    
    <el-pagination
      :total="total" background
      :page-sizes="[10, 20, 50, 100]"
      :page-size="ps"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="current_change"
      style="width: 650px;margin-top: 10px;text-align: center" />
    <back-to-top/>
  </div>
</template>

<script>
// import Mock from 'mockjs'
import BackToTop from '@/components/BackToTop'
// import qs from 'qs'
export default {
  components: {
    BackToTop
  },
  data() {
    return {
      tableData: [],
      total: 0,
      ps: 10,
      // currentPage: 1,
      pn:1,
      searchForm: {
      	number: '',
      	name: ''
      },
      params: {
      	conditions:{
      		nameLike: '',
      		numberLike: ''
      	},
      	pn: '',
      	ps: ''
      },
    }
  },
  created: function(){
  	this.init();
  },
  methods: {
  	init: function(){
  		this.$http.post('/web/v1/goods/page',{
  			pn:1,
  			ps:10
  		})
  	.then((response) => {
  		// console.log(response.datas);
  		this.tableData = response.datas;
  		// console.log(this.tableData);
  		this.total = response.tc;
  		if (this.total > 0) {
  			// for(var i=0; i<this.total; i++) {
  			// 	var parsedTime = this.parseTime(this.tableData[i].importDt, 'full');
  			// 	this.$set(this.tableData[i], 'importDt', 
  			// 		parsedTime);
  			// }
  			this.tableData.forEach((value, index, array) => {
  				var parsedTime = this.parseTime(value.importDt, 'full');
  				this.$set(value, 'importDt', parsedTime);
  			});
  			// console.log(this.tableData[0].importDt);
  		}
  		// for(var i=0; i<response.datas.length; i++){
  		// 	this.tableData.push(response.datas[i]);
  		// }
  		// return this.tableData;
  		// this.tableData = response.datas;
  	})
  	.catch((error) => {
  		console.error(error);
  	})
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
  		this.$http.post('/web/v1/goods/page', params)
  		.then((res) => {
  			this.tableData = res.datas;
  			this.tableData.forEach((value, index, array) => {
  				var parsedTime = this.parseTime(value.importDt, 'full');
  				this.$set(value, 'importDt', parsedTime);
  			});
  		})
  		.catch((err) => {
  			console.error(err);
  		});
  	},
  	handleSizeChange: function(val) {
  		this.ps = parseInt(val);
  		this.pn = 1;
  		this.params.conditions.numberLike = this.searchForm.number;
  		this.params.conditions.nameLike = this.searchForm.name;
  		this.params.pn = 1;
  		this.params.ps = this.ps;
  		this.$http.post('/web/v1/goods/page',this.params)
  		.then((response) => {
  			this.tableData = response.datas;
  			// console.log(this.tableData);
  			this.total = response.tc;
  			this.tableData.forEach((value, index, array) => {
  				var parsedTime = this.parseTime(value.importDt, 'full');
  				this.$set(value, 'importDt', parsedTime);
  			});
  		})
  		.catch((err) => {
  			console.error(err);
  		});
  	},
  	submitForm: function(){

  		this.params.conditions.numberLike = this.searchForm.number;
  		this.params.conditions.nameLike = this.searchForm.name;
  		this.params.pn = 1;
  		this.params.ps = this.ps;

  		this.$http.post('/web/v1/goods/page',this.params )
  		.then((response) => {
  			// console.log(this.params);
  			// console.log(response.datas);
  			this.tableData = response.datas;
  			this.total = this.tableData.length;
  			if (this.total > 0) {
  				// for(var i=0; i<this.total; i++) {
  				// 	var parsedTime = this.parseTime(this.tableData[i].importDt);
  				// 	this.$set(this.tableData[i], 'importDt', 
  				// 		parsedTime);
  				// }
  				this.tableData.forEach((value, index, array) => {
  					var parsedTime = this.parseTime(value.importDt, 'full');
  					this.$set(value, 'importDt', parsedTime);
  				});
  			}
  		})
  		.catch((error) => {
  			console.log(error);
  		});
  	}
  }
}
</script>
