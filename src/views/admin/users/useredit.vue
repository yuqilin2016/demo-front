<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <b>编辑{{ formData.id }}的信息</b>
      </div>
      <el-form ref="formData" :model="formData" :rules="rules2" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="id" prop="id" style="display:none">
          <el-input v-model="formData.id" type="text" auto-complete="off" disabled/>
        </el-form-item>
        <el-form-item label="登录名" prop="loginUserName">
          <el-input v-model="formData.loginUserName" type="text" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="formData.name" type="text" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="formData.phone" type="text" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="密码" prop="loginPassword">
          <el-input v-model="formData.loginPassword" type="password" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="formData.checkPass" type="password" auto-complete="off"/>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item label="类型" prop="userType">
          <el-select v-model="formData.userType" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <!-- 角色 -->
        <el-form-item label="角色" prop="userType">
          <el-select v-model="formData.roleIds" multiple placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- 将数据提交给后台并保存到数据库 -->
          <el-button type="primary" @click="editUser">提交</el-button>
          <el-button @click="resetForm(formData)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'UserEdit',
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.checkPass !== '') {
          this.$refs.formData.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.loginPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      formData: {},
      params: {
        ps: 100,
        pn: 0,
        tc: 0,
        conditions: {
          nameLike: ''
        }
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },
      options: [{
        value: 'management',
        id: '1',
        label: '管理员'
      },
      {
        value: 'management',
        id: '2',
        label: '项目经理'
      },
      {
        value: 'member',
        id: '3',
        label: '项目成员'
      }],
      options2: []
    }
  },
  created() {
    this.formData = this.$route.query.loginUser
    this.getRolelist()
  },
  methods: {
    getRolelist() {
      this.$http.post(this.$api.role.ROLELIST, this.params).then(res => {
        this.options2 = res.datas
      })
    },
    editUser() {
      this.$http.post(this.$api.user.UPDATAUSER, this.formData).then((res) => {
        this.$message({ message: '保存成功', type: 'success' })
        // setTimeout(function() {
        //   window.location.href = 'http://localhost:8000/#/admin/usermanagement'
        // }, 2000)
      }).catch(() => {
        this.$message.error('更新失败')
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
