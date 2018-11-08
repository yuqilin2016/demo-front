<template>
  <div class="test">

    <el-form label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单号：">
            <el-input v-model="id" readonly style="width:180px;float: left"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预计到货日期：">
            <el-date-picker v-model="date" type="date" style="width:180px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="货主编码：" >
            <el-input style="width:180px;float: left"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商编码：">
            <el-input style="width:180px;float: left"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="货主名称：" >
            <el-input style="width:180px;float: left"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商名称：">
            <el-input style="width:180px;float: left"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button @click="dialogVisible=true">添加商品</el-button>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible" title="添加商品" width="40%">
      <el-form label-width="120px">
        <el-form-item label="商品：">
          <el-select ref="goodsName" v-model="goodsName" placeholder="请选择商品" style="width: 180px">
            <el-option label="iPhone 7 128G" value="iPhone 7 128G"/>
            <el-option label="iPhone X 128G" value="iPhone X 128G"/>
          </el-select>
        </el-form-item>
        <el-form-item label="采购数量：">
          <el-input v-model="count" style="width:180px;float: left"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="tableData">
      <el-table-column prop="name" label="商品名称" width="180"/>
      <el-table-column prop="count" label="采购数量" width="180"/>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 20150203023,
      date: '',
      dialogVisible: false,
      goodsName: '',
      tableData: [],
      count: ''
    }
  },
  methods: {
    addGoods: function() {
      this.dialogVisible = false
      var info = {
        'name': this.$refs.goodsName.value,
        'count': this.count
      }
      var isExsit = false
      if (this.tableData.length > 0) {
        this.tableData.forEach(function(item, index, array) {
          if (item.name === info.name) {
            isExsit = true
            item.count = info.count
          }
        })
        if (!isExsit) {
          this.tableData.push(info)
        }
      } else {
        this.tableData.push(info)
      }
      this.goodsName = ''
      this.count = ''
      // console.log(info);
      // console.log(this.tableData);
    }
  }
}
</script>

<style scoped>

</style>
