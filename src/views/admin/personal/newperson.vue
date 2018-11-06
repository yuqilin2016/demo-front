<template>
  <div style="padding: 10px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <b>人员新增</b>
      </div>
      <div>
        <el-container>
          <el-aside>
            <el-upload
              :data="{type: 'avatar'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              action="http://192.168.1.55:9001/web/v1/files/upload"
              class="avatar-uploader">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-aside>
          <el-main>
            <el-form ref="form" :model="formData" :inline="isInline" label-width="75px" size="medium" label-position="left" class="demo-form-inline">
              <el-form-item label="选择用户" prop="userId">
                <el-select v-model="formData.userId" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="formData.name" />
              </el-form-item>
              <el-form-item label="出生年月">
                <el-date-picker v-model="formData.birthDate" type="date" placeholder="选择日期" style="width: 188.8px"/>
              </el-form-item>
              <el-form-item label="籍贯">
                <el-input v-model="formData.nativePlace" />
              </el-form-item>
              <el-form-item label="毕业学校">
                <el-input v-model="formData.graduateSchool" />
              </el-form-item>
              <el-form-item label="专业">
                <el-input v-model="formData.major" />
              </el-form-item>
              <el-form-item label="毕业时间">
                <el-date-picker v-model="formData.graduateDate" type="date" placeholder="选择日期" style="width: 188.8px"/>
              </el-form-item>
              <el-form-item label="入职时间">
                <el-date-picker v-model="formData.joinedDate" type="date" placeholder="选择日期" style="width: 188.8px"/>
              </el-form-item>
              <el-form-item label="导师" prop="tutorId">
                <el-select v-model="formData.tutorId" placeholder="请选择" style="width:470px">
                  <el-option
                    v-for="item in options2"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formData.phone" />
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="formData.address" style="width: 470px"/>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
        <el-form ref="form" :model="formData" label-width="100px" label-position="top" style="width: 90%">
          <el-form-item label="个人简介">
            <el-input :rows="4" v-model="formData.introduction" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="个人方向">
            <el-input :rows="3" v-model="formData.direction" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="个人兴趣">
            <el-input :rows="3" v-model="formData.interest" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="edit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NewPerson',
  data() {
    return {
      formData: {
        address: '',
        birthDate: '',
        direction: '',
        graduateDate: '',
        graduateSchool: '',
        interest: '',
        introduction: '',
        joinedDate: '',
        major: '',
        name: '',
        nativePlace: '',
        phone: '',
        picturePath: '',
        tutorId: '',
        userId: ''
      },
      params: {
        conditions: {
          userType: '2'
        },
        ps: '99'
      },
      options: [],
      options2: [],
      imageUrl: '',
      // 吧isInline的值赋给inline属性，使表单元素为行内显示。
      isInline: true
    }
  },
  mounted() {
    this.getNoInfoUserId()
    this.getTotur()
  },
  methods: {
    edit() {
      this.$http.post(this.$api.personal.ADDPERSON, this.formData).then(res => {
        this.$message({ message: '保存成功', type: 'success' })
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },
    getTotur() {
      this.$http.post(this.$api.user.USERLIST, this.params).then(res => {
        this.options2 = res.datas
      })
    },
    getNoInfoUserId() {
      this.$http.post(this.$api.user.NOINFOUSERID).then(res => {
        this.options = res
      })
    },
    // 与上传图片相关。
    handleAvatarSuccess(res, file) {
      this.imageUrl = process.env.BASE_API + res.content
      this.formData.picturePath = this.imageUrl
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

