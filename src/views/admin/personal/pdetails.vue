<template>
  <div style="padding: 10px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <b>人员详情</b>
      </div>
      <div>
        <el-container>
          <el-aside>
            <img v-if="formData.picturePath" :src="formData.picturePath" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-aside>
          <el-main>
            <el-form ref="form" :model="formData" :inline="isInline" label-width="75px" size="medium" label-position="left" class="demo-form-inline">
              <el-form-item label="姓名">
                <el-input v-model="formData.name" :disabled="banWrite"/>
              </el-form-item>
              <el-form-item label="出生年月">
                <el-input v-model="formData.birthDate" :disabled="banWrite" style="width: 188.8px"/>
              </el-form-item>
              <el-form-item label="籍贯">
                <el-input v-model="formData.address" :disabled="banWrite"/>
              </el-form-item>
              <el-form-item label="毕业学校">
                <el-input v-model="formData.graduateSchool" :disabled="banWrite"/>
              </el-form-item>
              <el-form-item label="专业">
                <el-input v-model="formData.major" :disabled="banWrite"/>
              </el-form-item>
              <el-form-item label="毕业时间">
                <el-input v-model="formData.graduateDate" :disabled="banWrite" style="width: 188.8px"/>
              </el-form-item>
              <el-form-item label="入职时间">
                <el-input v-model="formData.joinedDate" :disabled="banWrite" style="width: 188.8px"/>
              </el-form-item>
              <el-form-item label="导师">
                <el-input v-model="formData.tutorId" :disabled="banWrite" style="width: 470px"/>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formData.phone" :disabled="banWrite"/>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="formData.address" :disabled="banWrite" style="width: 470px"/>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
        <el-form ref="form" :model="formData" label-width="100px" label-position="top" style="width: 90%">
          <el-form-item label="个人简介">
            <el-input :rows="4" v-model="formData.introduction" :disabled="banWrite" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="个人方向">
            <el-input :rows="3" v-model="formData.direction" :disabled="banWrite" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="个人兴趣">
            <el-input :rows="3" v-model="formData.interest" :disabled="banWrite" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
        </el-form>

      </div>
    </el-card>
  </div>

</template>

<script>
import { parseTime } from '@/utils/index'
export default {
  name: 'Pdetails',
  data() {
    return {
      formData: {
      },
      params: {
        userId: ''
      },
      imageUrl: '',
      // 吧isInline的值赋给inline属性，使表单元素为行内显示。
      isInline: true,
      banWrite: true
    }
  },
  created() {
    this.params.userId = this.$route.query.row.userId
    this.getUserMessage()
  },
  methods: {
    getUserMessage() {
      this.$http.post(this.$api.personal.PERSONDETAIL, this.params).then(res => {
        this.formData = res
        this.formData.birthDate = parseTime(this.formData.birthDate, '{y}-{m}-{d}')
        this.formData.graduateDate = parseTime(this.formData.graduateDate, '{y}-{m}-{d}')
        this.formData.joinedDate = parseTime(this.formData.joinedDate, '{y}-{m}-{d}')
      })
    },
    // 与上传图片相关。
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style>
  .btn{
    margin: 50px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    width: 80%;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80%;
    height: 230px;
    line-height: 230px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 230px;
    display: block;
  }
</style>
