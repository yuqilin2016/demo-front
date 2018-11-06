<template>
  <div style="padding: 10px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <b>{{ params.name }}的信息编辑</b>
      </div>
      <div>
        <el-container>
          <el-aside>
            <el-upload
              :data="{type: 'avatar'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :action="actionUrl"
              class="avatar-uploader">
              <!-- <img v-if="imgUrl" :src="imgUrl" class="avatar"> -->
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-aside>
          <el-main>
            <el-form ref="form" :model="params" :inline="isInline" label-width="75px" size="medium" label-position="left" class="demo-form-inline">
              <el-form-item label="姓名">
                <el-input v-model="params.name" />
              </el-form-item>
              <el-form-item label="出生年月">
                <el-date-picker v-model="params.birthDate" type="date" placeholder="选择日期" style="width: 188.8px"/>
              </el-form-item>
              <el-form-item label="籍贯">
                <el-input v-model="params.nativePlace" />
              </el-form-item>
              <el-form-item label="毕业学校">
                <el-input v-model="params.graduateSchool" />
              </el-form-item>
              <el-form-item label="专业">
                <el-input v-model="params.major" />
              </el-form-item>
              <el-form-item label="毕业时间">
                <el-date-picker v-model="params.graduateDate" type="date" placeholder="选择日期" style="width: 188.8px"/>
              </el-form-item>
              <el-form-item label="入职时间">
                <el-date-picker v-model="params.joinedDate" type="date" placeholder="选择日期" style="width: 188.8px"/>
              </el-form-item>
              <el-form-item label="导师" prop="tutorId">
                <el-select v-model="params.tutorId" placeholder="请选择" style="width:470px">
                  <el-option
                    v-for="item in options2"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="params.phone" />
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="params.address" style="width: 470px"/>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
        <el-form ref="form" :model="params" label-width="100px" label-position="top" style="width: 90%">
          <el-form-item label="个人简介">
            <el-input :rows="4" v-model="params.introduction" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="个人方向">
            <el-input :rows="3" v-model="params.direction" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="个人兴趣">
            <el-input :rows="3" v-model="params.interest" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="当前id" style="display:none">
            <el-input :rows="3" v-model="params.userId" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="edit()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Pedit',
  data() {
    return {
      actionUrl: process.env.BASE_API + this.$api.source.getImgUrl,
      params: {},
      options2: [],
      imageUrl: '',
      // 吧isInline的值赋给inline属性，使表单元素为行内显示。
      isInline: true
    }
  },
  created() {
    this.params = this.$route.query.message
    this.imageUrl = this.params.picturePath
    console.log(this.params.picturePath)
    this.getTotur()
  },
  methods: {
    edit() {
      this.$http.post(this.$api.personal.EDITPEROSON, this.params).then(res => {
        this.$message({ message: '保存成功', type: 'success' })
      }).catch(() => {
        this.$message.error('更新失败')
      })
    },
    // 与上传图片相关。
    handleAvatarSuccess(res, file) {
      this.imageUrl = process.env.BASE_API + res.content
      console.log(this.imageUrl)
      this.params.picturePath = this.imageUrl
      console.log(this.params.picturePath)
    },
    getTotur() {
      this.$http.post(this.$api.user.USERLIST, this.params).then(res => {
        this.options2 = res.datas
      })
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

