<template>
  <div class="test">

    <el-form>
      <el-form-item label="商品导入文件：">

        <el-upload
          :auto-upload="false"
          :on-change="handleUploadSuccess"
          style="display: inline;"
          action="">
          <el-input :value="url" style="width: 300px"/>
          <el-button icon="el-icon-upload2">添加文件</el-button>
        </el-upload>
      </el-form-item>
      <el-button type="primary" @click="upLoad">导入</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'GoodsImport',
  data() {
    return {
      url: ''
    }
  },
  methods: {
    handleUploadSuccess: function(response, file, fileList) {
      // console.log(fileList);
      // var oFReader = new FileReader();
      // oFReader.readAsDataURL(file[0]);
      // oFReader.onloadend = function (oFREvent) {
      // 	this.url = oFREvent.target.result;
      // }
      this.url = file[0].name
      console.log(file[0].url)
      // console.log(file[0].url instanceof blob);
    },
    upLoad: function() {

    }
  }
}
</script>
