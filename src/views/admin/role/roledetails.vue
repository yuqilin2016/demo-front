<template>
  <div class="roleDetail" style="width:100%">
    <el-card class="box-card" style="width:100%">
      <div slot="header" class="clearfix">
        <b>角色详情</b>
      </div>
      <div style="width:80%;margin:20px auto;display:flex;justify-content:space-around;">
        <div class="roledetails">
          <div>
            <span>角色编码:</span>
            <span> {{ roles.code }} </span>
          </div>
          <div>
            <span>角色名称:</span>
            <span> {{ roles.name }} </span>
          </div>
          <div>
            <span>租户名称:</span>
            <span>王老五</span>
          </div>
          <div>
            <span>角色状态:</span>
            <span style="color:red">{{ roles.status }}</span>
          </div>
          <div>
            <el-button type="success" size="small" @click="enable">
              启用
            </el-button>
            <el-button type="warning" size="small" @click="disable">
              禁用
            </el-button>
          </div>
        </div>
        <div class="permission">
          <h4>拥有权限</h4>
          <div class="permission">
            <el-tree
              ref="tree"
              :data="resource"
              :props="defaultProps"
              node-key="id"/>
          </div>
        </div>
      </div>
    </el-card>
  </div>

</template>
<style>
.roleDetail>div{
    float: left;padding: 20px;
}
    .roledetails{
        width: 240px;
    }
    .roledetails>div{
        width: 100%;
        height: 40px;
        font-size: 14px;
    }
    .roledetails>div>span{
        display: block;
        float: left;
        width: 80px;
        line-height: 40px
    }
    .roledetails>div>p{
        width: 100px;
        float: left;
    }
    .permission{
      width: 300px;
    }
    button{
        width: 60px;
    }
</style>

<script>
export default {
  name: 'RoleDetails',
  data() {
    return {
      selectedOptions: [],
      roles: '',
      // 角色权限数据，从后台获取
      resource: [],
      defaultProps: {
        children: 'resourceBean',
        label: 'name'
      },
      params: {
        id: ''
      }
    }
  },
  created() {
    this.roles = this.$route.query.role
    this.params.id = this.roles.id
    this.getresource()
  },
  methods: {
    getresource() {
      this.$http.post(this.$api.source.ROLERESOURCE, this.params).then(res => {
        this.resource = res
      })
    },
    // 启用
    enable() {
      const params2 = {
        id: this.roles.id,
        status: 1
      }
      this.roles.status = 1
      this.$http.post(this.$api.role.CHANGESTATUS, params2).then(res => {
      })
    },
    // 禁用
    disable() {
      const params3 = {
        id: this.roles.id,
        status: 0
      }
      this.roles.status = 0
      this.$http.post(this.$api.role.CHANGESTATUS, params3).then(res => {
      })
    }
  }

}
</script>
