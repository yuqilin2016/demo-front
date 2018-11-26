<template>
  <div class="test">

    <el-form label-width="140px" 
    :model="saveOrder" ref="saveOrder" :rules="rules1" style="margin-top: 10px">
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="7">
          <el-form-item label="订单号：">
            <el-input v-loading="loading1" v-model="id" :disabled="true" style="min-width: 180px">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item prop="arriveDay" label="预计到货日期：">
            <el-date-picker 
            v-model="saveOrder.arriveDay" 
            :picker-options="pickerOptions1"
            type="date" value-format="yyyy-MM-dd'T'HH:mm:ss.SSS"
            style="width:100%;min-width: 180px">
          </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="7">
          <el-form-item prop="ownerCode" label="货主编码：" >
            <el-input v-model="saveOrder.ownerCode" style="min-width: 180px">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item prop="supplierCode" label="供应商编码：">
            <el-input v-model="saveOrder.supplierCode" style="min-width: 180px">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="7">
          <el-form-item prop="ownerName" label="货主名称：" >
            <el-input v-model="saveOrder.ownerName" style="min-width: 180px">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item prop="supplierName" label="供应商名称：">
            <el-input v-model="saveOrder.supplierName" style="min-width: 180px">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6">
          <el-form-item>
          <el-button @click="chooseGoods">添加商品</el-button>
          <el-button type="primary" @click="submitForm('saveOrder')">
          保存
          </el-button>
        </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog :visible.sync="dialogVisible" title="添加商品" width="40%"
    @close="clearGoods" v-if="dialogVisible">
      <el-form label-width="120px" 
      :model="saveGoods" ref="saveGoods" :rules="rules2">
        <el-form-item label="商品：">
          <el-select v-loading="loading2" v-model="saveGoods.goodsSelect" value-key="number"
          placeholder="请选择商品" style="width: 180px">
            <el-option  
            v-for="(item,index) in goodsList"
            :label="item.name"
            :value="item"
            :key="item.number">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="purchaseQuantity" label="采购数量：">
          <el-input v-model="saveGoods.purchaseQuantity" 
          style="width:180px;float: left"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods('saveGoods')">
          添加
        	</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div>
      <el-table :data="tableData" v-show="tableData.length" highlight-current-row style="width: 55%;margin-left: 25%;margin-top: 10px">
      <el-table-column prop="goodsNumber" label="商品编码" min-width="180"/>
      <el-table-column prop="goodsName" label="商品名称" min-width="180"/>
      <el-table-column prop="purchaseQuantity" label="采购数量" min-width="180"/>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading1: true,
      loading2: true,
      id: 0,
      date: '',
      dialogVisible: false,
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
        goodsSelect: {
          name: '',
          number: ''
        },
        purchaseQuantity:''
      },
      // goodsSelect: {
      //   goodsNumber: '',
      //   goodsName: '',
      // },
      rules1: {
      	arriveDay: [
            { type: 'string', required: true, message: '请选择日期' },
        ],
        ownerCode: [
        	{ required: true, message: '请输入货主编码', trigger: 'blur' },
          {validator: (rule, value, callback) => {
            if (/^[A-Za-z0-9]+$/.test(value) == false) {
              callback(new Error("货主编码为字母+数字"));
            } else {
              callback();
            }
          }, trigger: ['blur','change']
          },
          // {validator: (rule, value, callback) => {
          //   if (/^[A-Za-z0-9]+$/.test(value) == false) {
          //     callback(new Error("货主编码为字母+数字"));
          //   } else {
          //     callback();
          //   }
          // }, trigger: 'change'
          // }
        ],
        ownerName: [
        	{ required: true, message: '请输入货主名称', trigger: 'change' },
        ],
        supplierCode: [
        	{ required: true, message: '请输入供应商主编码', trigger: 'blur' },
          {validator: (rule, value, callback) => {
            if (/^[A-Za-z0-9]+$/.test(value) == false) {
              callback(new Error("货主编码为字母+数字"));
            } else {
              callback();
            }
            }, trigger: ['blur','change']
          },
          // {validator: (rule, value, callback) => {
          //   if (/^[A-Za-z0-9]+$/.test(value) == false) {
          //     callback(new Error("货主编码为字母+数字"));
          //   } else {
          //     callback();
          //   }
          //   }, trigger: 'change'
          // }
        ],
        supplierName: [
        	{ required: true, message: '请输入供应商主名称', trigger: 'change' },
        ],
      },
      rules2: {
      	// goodsName: [
      	// 	{ required: true, message: '请选择商品名称', trigger: 'blur' },
      	// ],
      	purchaseQuantity: [
      		{ required: true, message: '请输入商品数量', trigger: 'blur' },
          {  validator: (rule, value, callback) => {
              if (/^[1-9]\d*$/.test(value) == false) {
              callback(new Error("商品数量只能为正整数"));
              } else {
              callback();
              }
            }, trigger: ['blur','change']
          },
          // {  validator: (rule, value, callback) => {
          //     if (/^[1-9]\d*$/.test(value) == false) {
          //     callback(new Error("商品数量只能为正整数"));
          //     } else {
          //     callback();
          //     }
          //   }, trigger: 'change' 
          // }
      	]
      }
    }
  },
  created: function(){
  
    this.$http.post('/web/v1/order/getNumner')
    .then((res) => {
      this.loading1 = false
    	// console.log(res);
    	this.id = res;
    })
    .catch((err) => {
    	console.error(err);
    });
  },
  methods: {
    chooseGoods () {
      this.loading2 = true
      this.$http.post('/web/v1/orderDerail/showGoods')
      .then((res) => {
        this.loading2 = false
        this.goodsList = res.datas;
      })
      .catch((err) => {
        console.error(err);
      });
      this.dialogVisible = true;
    },
    clearGoods () {
      this.saveGoods = {
      }
    },
    addGoods(formName) {
      // console.log(this.isNumber(this.saveGoods.purchaseQuantity))
      var goodsInfo = {
        goodsName: '',
        goodsNumber: '',
        purchaseQuantity: ''
      }
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.saveGoods.goodsSelect.name !== '') {
            goodsInfo.goodsName = this.saveGoods.goodsSelect.name
            goodsInfo.goodsNumber = this.saveGoods.goodsSelect.number
            goodsInfo.purchaseQuantity = this.saveGoods.purchaseQuantity
            // console.log(goodsInfo)
            var isExsit = false
            if (this.tableData.length > 0) {
              this.tableData.forEach((item, index, array) => {
                if (item.goodsNumber === goodsInfo.goodsNumber) {
                  isExsit = true
                  item.purchaseQuantity = goodsInfo.purchaseQuantity
                }
              });
              if (!isExsit) {
                this.tableData.push(goodsInfo);
              }
              
            } else {
              this.tableData.push(goodsInfo);
            };
            this.dialogVisible = false;
            this.saveGoods = {
            },
            // this.goodsError = false;
            console.log(this.tableData);
          } else {
            this.$message({
              message: '请选择商品！',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '请检查输入！',
            type: 'warning'
          })
        }
      })
    },
  	submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        	if (this.tableData.length > 0) {
        		this.saveOrder.list = this.tableData;
        		this.saveOrder.number = this.id;
        		// console.log(this.saveOrder);
        		this.$http.post('/web/v1/order/save',this.saveOrder)
            .then(() => {
              this.$message({
                message: '保存订单成功！',
                type: 'success'
              });
              this.$router.push('order-list');
            })
            .catch((err) => {
              this.$message.error(err);
            })	
        	} else {
        		this.$message({
              message: '请添加商品！'
            });
        	} 
        } else {
          this.$message.error('保存失败！请检查输入')
          return false;
        }
      });
    }
	}
}
</script>

<style>
/*.goodsTable .el-table{
  border-bottom:none !important
}*/
</style>
