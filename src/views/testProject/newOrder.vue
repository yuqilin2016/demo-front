<template>
  <div class="test">

    <el-form label-width="140px" 
    :model="saveOrder" ref="saveOrder" :rules="rules1">
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单号：">
            <el-input v-model="id" readonly style="width:180px;float: left"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="arriveDay" label="预计到货日期：">
            <el-date-picker 
            v-model="saveOrder.arriveDay" 
            :picker-options="pickerOptions1"
            type="date" value-format="yyyy-MM-dd'T'HH:mm:ss.SSS"
            style="width:180px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="ownerCode" label="货主编码：" >
            <el-input v-model="saveOrder.ownerCode" style="width:180px;float: left"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="supplierCode" label="供应商编码：">
            <el-input v-model="saveOrder.supplierCode" style="width:180px;float: left"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="ownerName" label="货主名称：" >
            <el-input v-model="saveOrder.ownerName" style="width:180px;float: left"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="supplierName" label="供应商名称：">
            <el-input v-model="saveOrder.supplierName" style="width:180px;float: left"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button @click="dialogVisible=true">添加商品</el-button>
        <el-button type="primary" @click="submitForm('saveOrder')">
        保存
      	</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible" title="添加商品" width="40%" v-if="dialogVisible">
      <el-form label-width="120px" 
      v-model="saveGoods" ref="saveGoods">
        <el-form-item prop="goodsName" label="商品：">
          <el-select ref="goodsName" v-model="saveGoods.goodsName" value-key="number"
          placeholder="请选择商品" style="width: 180px">
            <el-option  
            v-for="(item,index) in goodsList"
            :label="item.name"
            v-bind:value="item"
            :key="index">
            </el-option>
          </el-select>
          <!-- <span style="color: red">{{ goodsError }}</span> -->
        </el-form-item>
        <el-form-item prop="purchaseQuantity" label="采购数量：">
          <el-input v-model="saveGoods.purchaseQuantity" 
          style="width:180px;float: left"/>
          <!-- <span v-show="numberError" style="color: red">{{numberError}}</span> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods('saveGoods')">
          添加
        	</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table :data="tableData">
      <el-table-column prop="goodsNumber" label="商品编码" width="180"/>
      <el-table-column prop="goodsName" label="商品名称" width="180"/>
      <el-table-column prop="purchaseQuantity" label="采购数量" width="180"/>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      date: '',
      dialogVisible: false,
      // goodsError: false,
      // numberError: false,
      goodsName: {},
      tableData: [],
      count: '',
      goodsList:[],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000;
        }
      },
      saveOrder: {
      	arriveDay: '',
      	list:[],
      	number: '',
      	ownerCode: '',
      	ownerName: '',
      	supplierCode: '',
      	supplierName: ''
      },
      saveGoods: {
      	goodsNumber: '',
      	goodsName: '',
      	purchaseQuantity: ''
      },
      rules1: {
      	arriveDay: [
            { type: 'string', required: true, message: '请选择日期', trigger: 'change' },
        ],
        ownerCode: [
        	{ required: true, message: '请输入货主编码', trigger: 'change' },
        ],
        ownerName: [
        	{ required: true, message: '请输入货主名称', trigger: 'change' },
        ],
        supplierCode: [
        	{ required: true, message: '请输入供应商主编码', trigger: 'change' },
        ],
        supplierName: [
        	{ required: true, message: '请输入供应商主名称', trigger: 'change' },
        ],
      },
      rules2: {
      	goodsName: [
      		{ required: true, message: '请选择商品名称', trigger: 'change' },
      	],
      	purchaseQuantity: [
      		{ required: true, message: '请输入商品数量', trigger: 'change' },
      	]
      }
    }
  },
  created: function(){
  	this.$http.post('/web/v1/orderDerail/showGoods')
      .then((res) => {
      	// console.log(res);
      	this.goodsList = res.datas;
      })
      .catch((err) => {
      	console.error(err);
      });
    this.$http.post('/web/v1/order/getNumner')
    .then((res) => {
    	// console.log(res);
    	this.id = res;
    })
    .catch((err) => {
    	console.error(err);
    });
  },
  // computed: {
  // 	goodsError: function(){
  // 		if (!this.$refs.goodsName) {
  // 			return '';
  // 		}
  // 		if (this.$refs.goodsName.value.name === '') {
  // 			return '请选择商品:';
  // 		} else {
  // 			return '';
  // 		}
  // 	},
  // 	numberError: function(){
  // 		if (!this.$refs.goodsName) {
  // 			return '';
  // 		}
  // 		if (this.$refs.goodsName.value.number === '') {
  // 			return '请输入数量:';
  // 		} else {
  // 			return '';
  // 		}
  // 	}
  // },
  methods: {
    addGoods(formName) {
    	if (!this.$refs.goodsName.value.name) {
    		this.saveGoods.goodsName = this.$refs.goodsName.value;
    	} else {
    		this.saveGoods.goodsName = this.$refs.goodsName.value.name;
    	}
    	
    	this.saveGoods.goodsNumber = this.$refs.goodsName.value.number;

    	// if (this.saveGoods.goodsName === '') {
    	// 	this.goodsError = true;
    	// }
    	// if (this.saveGoods.purchaseQuantity === '') {
    	// 	this.numberError = true;
    	// }
    	console.log(this.$refs.goodsName);
    	if (this.saveGoods.purchaseQuantity !== '' 
    		&& this.saveGoods.goodsName !== '') {
    		var isExsit = false;
    		if (this.tableData.length > 0) {
    		  this.tableData.forEach((item, index, array) => {
    		    if (item.goodsNumber === this.saveGoods.goodsNumber) {
    		      isExsit = true
    		      item.purchaseQuantity = this.saveGoods.purchaseQuantity
    		    }
    		  });
    		  if (!isExsit) {
    		    this.tableData.push(this.saveGoods);
    		  }
    		  
    		} else {
    		  this.tableData.push(this.saveGoods);
    		};
    		this.dialogVisible = false;
    		this.saveGoods = {
    		  	goodsNumber: '',
    		  	goodsName: '',
    		  	purchaseQuantity: ''
    		  };
    		// this.goodsError = false;
    		console.log(this.tableData);
    	}
    	// console.log(this.saveGoods);
    	// var info = {
    	// 	'goodsNumber': this.$refs.goodsName.value.number,
    	//   'goodsName': this.$refs.goodsName.value.name,
    	//   'purchaseQuantity': parseInt(this.count)
    	// };
    	// console.log(this.$refs.goodsName.value);
    	
    	// this.$refs[formName].validate((valid) => {
    	// 	if (valid) {
    	// 		this.dialogVisible = false;
    	// 		this.saveGoods.goodsNumber = this.$refs.goodsName.value.number;
    	// 		// var info = {
    	// 		// 	'goodsNumber': this.$refs.goodsName.value.number,
    	// 		//   'goodsName': this.$refs.goodsName.value.name,
    	// 		//   'purchaseQuantity': parseInt(this.count)
    	// 		// };
    	// 		// console.log(this.$refs.goodsName.value);
    	// 		var isExsit = false
    	// 		if (this.tableData.length > 0) {
    	// 		  this.tableData.forEach(function(item, index, array) {
    	// 		    if (item.goodsNumber === this.saveGoods.goodsNumber) {
    	// 		      isExsit = true
    	// 		      item.purchaseQuantity = this.saveGoods.purchaseQuantity
    	// 		    }
    	// 		  })
    	// 		  if (!isExsit) {
    	// 		    this.tableData.push(this.saveGoods);
    	// 		  }
    	// 		} else {
    	// 		  this.tableData.push(this.saveGoods);
    	// 		}
    	// 		// this.tableData.push(info);
    	// 		// this.goodsName = ''
    	// 		// this.count = ''
    	// 	} else {
     //      console.log('error submit!!');
     //      return false;
     //    }
    	// });
      // console.log(info);
      // console.log(this.tableData);
    },
  	submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        	if (this.tableData.length > 0) {
        		this.saveOrder.list = this.tableData;
        		this.saveOrder.number = this.id;
        		console.log(this.saveOrder);
        		this.$http.post('/web/v1/order/save',this.saveOrder);
        		this.$router.push('order-list');
        	} else {
        		alert('请添加商品！');
        	} 
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
	}
}
</script>

<style scoped>

</style>
