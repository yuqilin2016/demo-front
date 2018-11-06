<template>
  <div class="roleDetail">
    <el-card class="box-card" style="width:100%">
      <div slot="header" class="clearfix">
        <b>角色 {{ params.name }} 编辑</b>
      </div>
      <div style="width:80%;margin:20px auto;display:flex;justify-content:space-around;">
        <div class="permission">
          <el-tree
            ref="tree"
            :data="resource"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            @check-change="getCheckedNodes"/>
        </div>
        <div class="roledetails">
          <!-- <div>
            <span>租户：</span>
            <span>某某某***</span>
          </div> -->
          <el-form>
            <el-form-item label="角色编码：">
              <el-input v-model="params.code" type="text" disabled/>
            </el-form-item>
            <el-form-item label="角色名称：">
              <el-input v-model="params.name" type="text" placeholder="名称"/>
            </el-form-item>
            <el-form-item label="角色描述：">
              <el-input v-model="params.description" type="text" placeholder="描述"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updataRole">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </el-card>
  </div>
</template>
<style>
li{
  list-style: none;
  margin-left: 40px;
}
.tog{
  display: inline-block;
  border: 1px solid rgb(236, 226, 226);
  width: 14px;height: 14px;
  text-align: center;
  line-height: 12px;
  margin-right: 6px;
}
.roleDetail>div{
    padding: 20px;
}
    .roledetails{
        width: 240px;
        /* margin-left: 20px; */
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
// 用户权限数据，通过ajax获取

export default {
  name: 'RoleEdit',
  data() {
    return {
      // message: {},
      params: {},
      resource: [],
      defaultProps: {
        children: 'resourceBean',
        label: 'name'
      }
    }
  },
  mounted() {
    this.params = this.$route.query.rolemessage
  },
  created() {
    this.getresource()
  },
  methods: {
    showToggle: function(value) {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.btnText = '-'
      } else {
        this.btnText = '+'
      }
    },
    getresource() {
      this.$http.post(this.$api.source.LIST).then(res2 => {
        this.resource = res2
      })
    },
    updataRole() {
      this.$http.post(this.$api.role.UPDATA, this.params).then(res => {
        this.$message({ message: '保存成功', type: 'success' })
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },
    getCheckedNodes() {
      var checkNode = this.$refs.tree.getCheckedNodes(false, true)
      this.params.resourceIds = []
      for (var i = 0; i < checkNode.length; i++) {
        this.params.resourceIds.push(checkNode[i].id)
      }
    }
  }
}

</script>

