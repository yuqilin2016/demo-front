<template>
  <div class="test">

    <el-form style="width: 700px">
      <el-form-item label="商品导入文件：">

        <el-upload
        	ref="upload"
          :auto-upload="false"
          :on-change="handleUploadSuccess"
          :before-remove="beforeRemove"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :on-success="handleResponse"
          style="display: inline;"
					:on-error="handleError"
					:headers="header"
					:limit="3"
          action="http://192.168.0.102:9999/web/v1/goods/importGoods">
          <el-input :value="url" style="width: 300px"/>
          <el-button icon="el-icon-upload2">添加文件</el-button>
          <div slot="tip">只能上传txt文件，以英文逗号分隔</div>
        </el-upload>
      </el-form-item>
      <el-button id="import" type="primary" :disabled="isDisabled" @click="submitUpload" :loading="isImporting">导入</el-button>
      <span class="error" v-show="isDisabled" style="color: red">只能上传txt和xls文件!</span>
      <div class="errorMsg" style="margin-top: 10px">
      {{errorMsg}}
    	</div>
    	<!-- <div class="successMsg" style="color: blue;margin-top: 10px">
      {{successMsg}}
    	</div> -->
      <div class="res" style="color: red;margin-top: 10px">
      	{{ res }}
      	<el-button v-show="res" @click="clear">清除</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'GoodsImport',
  data() {
    return {
      url: '',
      isDisabled: false,
      res:'',
      isImporting: false,
      isError:false,
      header: {
      	"X-Session-Token": ''
      },
      errorMsg:'',
      // successMsg: ''
      // names:[]
    }
  },
  computed: {
  	// ...mapGetters([
  	// 	'token'
  	// ]),
  	// header: function(){
  	// 	return {"X-Session-Token": token};
  	// }

  	// this.header["X-Session-Token"] = token;
  },
  mounted: function(){
  	this.$nextTick(function(){
  		this.header["X-Session-Token"] = '21f02e17-d5df-44c9-b7f6-66b8dd5a669b';
  	});
  },
  methods: {
    handleUploadSuccess: function(response, file, fileList) {
      // console.log(file);
      // console.log(token);
      var count = file.length;
      if(count > 0) {
      	  var type = file[count-1].raw.type;
      	  this.url = file[count-1].name;
      	  if(type !== 'text/plain' && type !== 'application/vnd.ms-excel') {
      			this.isDisabled = true;
      			
      		} else {
      			this.isDisabled = false;
      			
      		}
      	} else {
      		return true;
      	}
     
    },
    beforeUpload: function(file) {

    },
    handleRemove(file, fileList) {
        // console.log(file);
        // console.log(fileList);
        var count = fileList.length;
        var onlyText = fileList.every(function(item, index, array) {
        	return (item.raw.type === 'text/plain' || item.raw.type ==='application/vnd.ms-excel');
        });
        if(onlyText) {
        	this.isDisabled = false;
        	
        }else{
        	this.isDisabled = true;
        	
        }
        if(count > 0) {
        	this.url = fileList[count-1].name;
        } else {
        	this.url = '';
        }
        
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
    submitUpload() {
        this.$refs.upload.submit();
        this.isImporting = true;
    },
    handleResponse(response, file, fileList) {
    	// console.log(response);
    	this.errorMsg = response.errorMsg;
    	let msg = document.querySelector('.errorMsg');
    	if(this.errorMsg.indexOf('错误') !== -1) {
    		msg.style.color = 'red';
    	} else {
    		msg.style.color = 'blue';
    	}
    	// this.successMsg = 
    	this.isImporting = false;
    	this.url = '';
    },
    handleError(err, file, fileList) {
    	console.error(err);
    	this.isImporting = false;
    	this.url = '';
    	this.res = '连接错误！';
    },
    clear () {
    	this.res = '';
    }
  }
}
</script>
