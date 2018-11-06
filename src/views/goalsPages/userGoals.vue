<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <b>{{ userName }}的阶段目标</b>
    </div>
    <div>
      <div v-if="showData" style="width: 100%;height: 120px;align: center;font-size: 30px">暂无目标，请新建目标</div>
      <div v-for="(item,index) in goal" v-show="!showData" :key="index" style="width: 95%; padding-bottom: 30px">
        <el-row>
          <el-col :span="6">
            <div class="lefticon">
              <span style="font-size: 50px">{{ index+1 }}</span>
            </div>
          </el-col>
          <el-col :span="18">
            <div style="margin-bottom: 20px">
              <b style="font-size: 20px">标题：{{ item.title }}</b>
              <!-- 按钮位置 -->
              <div class="btn">
                <!-- 未提交显示，或者有拒绝原因显示；提交后，显示已提交，影藏按钮， -->
                <div v-authorize="'MANAGER'" v-if="(item.status === 3)?true:false" style="display: inline;float: left;margin-right: 12px">
                  <el-button type="primary" size="small" @click="rejectBtn(index)">拒绝</el-button>
                  <el-button type="primary" size="small" @click="passBtn(index)">通过</el-button>
                </div>
                <div v-authorize="'MEMBER'" v-if="(item.status === 1||item.status === 2)?true:false" style="display: inline;float: left;margin-right: 12px">
                  <el-button type="primary" size="small" @click="resetBtn(index)">修改</el-button>
                  <el-button type="primary" size="small" @click="submitBtn(index)">提交</el-button>
                </div>
                <el-button
                  v-authorize="'MEMBER'"
                  v-if="item.status === 3?true:false"
                  style="display: inline;"
                  type="info"
                  size="small"
                  disabled>已提交</el-button>
                <el-button
                  v-authorize="['MANAGER','MEMBER']"
                  v-if="item.status === 4?true:false"
                  style="display: inline;"
                  type="info"
                  size="small"
                  disabled>已通过</el-button>
                <el-button
                  v-authorize="'MANAGER'"
                  v-if="item.status === 3?true:false"
                  style="display: inline"
                  type="info"
                  size="small"
                  disabled>待审核</el-button>
                <el-button
                  v-authorize="'MANAGER'"
                  v-if="item.status === 2?true:false"
                  style="display: inline"
                  type="info"
                  size="small"
                  disabled>已拒绝</el-button>
                <el-button
                  v-authorize="'MANAGER'"
                  v-if="item.status === 4?true:false"
                  style="display: inline"
                  type="info"
                  size="small"
                  @click="selfReviewBtn(index)">自评</el-button>
                <el-button
                  v-authorize="'MANAGER'"
                  v-if="item.status === 5?true:false"
                  style="display: inline"
                  type="info"
                  size="small"
                  disabled>已自评</el-button>
                <el-button
                  v-authorize="'MANAGER'"
                  v-if="item.status === 5?true:false"
                  style="display: inline"
                  type="info"
                  size="small"
                  @click="commentBtn(index)">评审</el-button>
                <el-button
                  v-authorize="'MANAGER'"
                  v-if="item.status === 6?true:false"
                  style="display: inline"
                  type="info"
                  size="small"
                  disabled>已完成</el-button>
              </div>
            </div>
            <div style="margin-bottom: 10px;">目标：{{ item.aim }}</div>
            <div style="margin-bottom: 10px;color: cyan"> 标准：{{ item.standard }}</div>
            <div style="margin-bottom: 10px;">
              <span>起止日期：{{ item.startDate }}</span>
              <span>~</span>
              <span>{{ item.endDate }}</span>
            </div>
            <div
              v-if="Boolean(item.refusalCause)&&((item.status === 2)||(item.status === 3))"
              style="margin-bottom: 10px;color: red">拒绝原因：{{ item.refusalCause }}</div>
          </el-col>
        </el-row>
      </div>
      <div class="createBox">
        <el-button
          v-authorize="'MEMBER'"
          v-if="goal.length === 4?false:true"
          type="primary"
          size="medium"
          class="createBtn"
          @click="createBtn">新建</el-button>
      </div>
    </div>
    <!-- 弹出框 -->
    <div>
      <!-- 拒绝提示框 -->
      <div>
        <el-dialog :visible.sync="rejectGoal" title="提示" width="40%">
          <el-form ref="rulePostObj" :rules="inputRules" :model="rulePostObj" label-width="100px" label-position="top">
            <el-form-item label="拒绝原因：" prop="refusalCause">
              <el-input :rows="5" v-model="rulePostObj.refusalCause" type="textarea" placeholder="请输入拒绝原因" name="refusalCause" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="rejectFoo('rulePostObj')">确 定</el-button>
            <el-button type="info" @click="rejectGoal = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 通过提示框 -->
      <div>
        <el-dialog :visible.sync="passGoal" title="提示" width="40%">
          <span>确定通过？</span>
          <span slot="footer" class="dialog-footer">
            <el-button :plain="true" type="primary" @click="passFoo">确 定</el-button>
            <el-button type="info" @click="passGoal = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 修改按钮 -->
      <div>
        <el-dialog :visible.sync="resetGoal" title="修改" width="40%">
          <el-form ref="rulePostObj" :rules="inputRules" :model="rulePostObj" label-width="60px" label-position="left">
            <el-form-item label="名称" prop="title">
              <el-input v-model="rulePostObj.title" name="title" />
            </el-form-item>
            <el-form-item label="目标" prop="aim">
              <el-input v-model="rulePostObj.aim" :rows="3" type="textarea" name="aim" />
            </el-form-item>
            <el-form-item label="标准" prop="standard">
              <el-input v-model="rulePostObj.standard" :rows="3" type="textarea" name="standard" />
            </el-form-item>
            <el-form-item label="日期" required>
              <el-col :span="11">
                <el-form-item prop="startDate">
                  <el-date-picker
                    v-model="rulePostObj.startDate"
                    type="date"
                    placeholder="起始日期"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                    name="startDate" />
                </el-form-item>
              </el-col>
              <el-col :span="2" class="line">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endDate">
                  <el-date-picker
                    v-model="rulePostObj.endDate"
                    type="date"
                    placeholder="结束时间"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                    name="endDate" />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="resetFoo()">保 存</el-button>
            <el-button type="info" @click="resetGoal = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 提交弹出框 -->
      <div>
        <el-dialog :visible.sync="submitGoal" title="提示" width="40%">
          <span>确定提交？</span>
          <span slot="footer" class="dialog-footer">
            <el-button :plain="true" type="primary" @click="submitFoo">提 交</el-button>
            <el-button type="info" @click="submitGoal = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 新建弹出框 -->
      <div>
        <el-dialog :visible.sync="createGoal" title="新建" width="40%">
          <el-form ref="rulePostObj" :rules="inputRules" :model="rulePostObj" label-width="60px" label-position="left">
            <el-form-item label="名称" prop="title">
              <el-input v-model="rulePostObj.title" name="title" />
            </el-form-item>
            <el-form-item label="目标" prop="aim">
              <el-input v-model="rulePostObj.aim" :rows="3" type="textarea" name="aim" />
            </el-form-item>
            <el-form-item label="标准" prop="standard">
              <el-input v-model="rulePostObj.standard" :rows="3" type="textarea" name="standard" />
            </el-form-item>
            <el-form-item label="日期">
              <el-col :span="11">
                <el-form-item prop="startDate">
                  <el-date-picker
                    v-model="rulePostObj.startDate"
                    type="date"
                    placeholder="起始日期"
                    format="yyyy-MM-dd"
                    style="width: 100%;"
                    name="startDate" />
                </el-form-item>
              </el-col>
              <el-col :span="2" class="line">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endDate">
                  <el-date-picker
                    v-model="rulePostObj.endDate"
                    type="date"
                    placeholder="结束日期"
                    format="yyyy-MM-dd"
                    style="width: 100%;"
                    name="endDate" />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button :plain="true" type="primary" @click="createFoo('rulePostObj')">确 定</el-button>
            <el-button @click="createGoal = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 自评弹出框 -->
      <div>
        <el-dialog :visible.sync="selfReviewGoal" title="自评" width="60%">
          <el-form ref="rulePostObj" :rules="inputRules" :model="rulePostObj" label-position="left" inline class="demo-table-expand">
            <el-form-item label="起止日期">
              <span>{{ rulePostObj.startDate }} ~ {{ rulePostObj.endDate }}</span>
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ rulePostObj.title }}</span>
            </el-form-item>
            <el-form-item label="目标">
              <span>{{ rulePostObj.aim }}</span>
            </el-form-item>
            <el-form-item label="标准">
              <span>{{ rulePostObj.standard }}</span>
            </el-form-item>
            <el-form-item label="评语" prop="selfReview">
              <el-input v-model="rulePostObj.selfReview" :rows="3" type="textarea" name="selfReview" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="selfReviewFoo">提 交</el-button>
            <el-button type="info" @click="selfReviewGoal = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 审评弹出框 -->
      <div>
        <el-dialog :visible.sync="commentGoal" title="评审" width="60%">
          <el-form ref="rulePostObj" :rules="inputRules" :model="rulePostObj" label-position="left" inline class="demo-table-expand">
            <el-form-item label="起止日期">
              <span>{{ rulePostObj.startDate }} ~ {{ rulePostObj.endDate }}</span>
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ rulePostObj.title }}</span>
            </el-form-item>
            <el-form-item label="目标">
              <span>{{ rulePostObj.aim }}</span>
            </el-form-item>
            <el-form-item label="标准">
              <span>{{ rulePostObj.standard }}</span>
            </el-form-item>
            <el-form-item label="自评">
              <span>{{ rulePostObj.selfReview }}</span>
            </el-form-item>
            <el-form-item label="评语" prop="comment">
              <el-input v-model="rulePostObj.comment" :rows="3" type="textarea" name="comment" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="commentFoo">提 交</el-button>
            <el-button type="info" @click="commentGoal = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </el-card>
</template>

<script>
import {
  parseTime
} from '@/utils/index'

export default {
  name: 'UserGoals',
  data() {
    return {
      userName: '',
      // refusalCause: '',
      inputRules: {
        refusalCause: [{
          required: true,
          message: '请输入拒绝原因',
          trigger: 'blur'
        },
        {
          max: 400,
          message: '长度在200个字以内',
          trigger: 'blur'
        }
        ],
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        aim: [{
          required: true,
          message: '请输入目标',
          trigger: 'blur'
        }],
        standard: [{
          required: true,
          message: '请输入标准',
          trigger: 'blur'
        },
        {
          max: 400,
          message: '长度在200个字以内',
          trigger: 'blur'
        }
        ],
        selfReview: [{
          required: true,
          message: '请输入自评',
          trigger: 'blur'
        },
        {
          max: 400,
          message: '长度在200个字以内',
          trigger: 'blur'
        }
        ],
        comment: [{
          required: true,
          message: '请输入评审',
          trigger: 'blur'
        },
        {
          max: 400,
          message: '长度在200个字以内',
          trigger: 'blur'
        }
        ],
        startDate: [{
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        endDate: [{
          required: true,
          message: '请选择时间',
          trigger: 'change'
        }]
      },
      showData: false,
      rejectGoal: false,
      passGoal: false,
      resetGoal: false,
      createGoal: false,
      submitGoal: false,
      selfReviewGoal: false,
      commentGoal: false,
      // rejectIndex: 0,
      passIndex: 0,
      // resetIndex: 0,
      createIndex: 0,
      submitIndex: 0,
      createObject: {
        title: '',
        aim: '',
        standard: '',
        startDate: '',
        endDate: ''
      },
      postData: {
        conditions: {}
      },
      getNamePost: {},
      selectName: {},
      goal: [],
      rulePostObj: {},
      postSubmitGoal: {}
    }
  },
  created() {
    // this.showData = false
    if (this.$route.query.id) {
      this.getNamePost.userId = this.postData.conditions.userId = this.$route.query.id
      this.getName(this.getNamePost)
      this.getGoals(this.postData)
    } else {
      this.getNamePost.userId = this.postData.conditions.userId = JSON.parse(localStorage.user).id
      this.getName(this.getNamePost)
      this.getGoals(this.postData)
    }
  },
  methods: {
    getName(userId) {
      this.$http.post(this.$api.member.SELF_INFO, userId).then((res) => {
        this.userName = res.name
      })
    },
    getGoals(data) {
      this.$http.post(this.$api.manager.USERGOALS, data).then((res) => {
        // console.log(res)
        // console.log(res.datas)
        if (res.datas.length !== 0) {
          this.goal = res.datas
          this.goal.forEach((item) => {
            item.startDate = parseTime(item.startDate, '{y}-{m}-{d}')
            item.endDate = parseTime(item.endDate, '{y}-{m}-{d}')
          })
          this.showData = false
        } else {
          this.showData = true
        }
      })
    },
    passBtn(index) {
      // 通过
      this.passIndex = index
      this.passGoal = true
    },
    passFoo() {
      this.$http.post(this.$api.manager.PASS, this.goal[this.passIndex]).then(() => {
        this.$message({
          message: '通过成功',
          type: 'success'
        })
        this.getGoals(this.postData)
      }).catch(() => {
        this.$message.error('通过失败')
      })
      this.passGoal = false
    },

    rejectBtn(index) {
      this.rejectGoal = true
      this.rulePostObj = this.goal[index]
    },
    // rejectFoo(ruleObj) {
    //   this.$refs[ruleObj].validate((valid) => {
    //     if (valid) {
    //       this.$http.post(this.$api.manager.REFUSE, this.rulePostObj).then(() => {
    //         this.$message({
    //           message: '拒绝成功',
    //           type: 'success'
    //         })
    //         this.getGoals(this.postData)
    //       }).catch(() => {
    //         this.$message.error('拒绝失败')
    //       })
    //       this.rejectGoal = false
    //     } else {
    //       this.$message.error('请正确输入！')
    //     }
    //   })
    // },
    resetBtn(index) {
      // 修改
      this.resetGoal = true
      this.rulePostObj = this.goal[index]
      // console.log(this.rulePostObj)
    },
    // resetFoo(ruleObj) {
    //   this.$refs[ruleObj].validate(valid => {
    //     if (valid) {
    //       this.$http.post(this.$api.member.UPDATE_GOAL, this.rulePostObj).then(() => {
    //         this.getGoals(this.postData)
    //         this.$message({
    //           message: '修改成功',
    //           type: 'success'
    //         })
    //       }).catch(() => {
    //         this.$message.error('修改失败')
    //       })
    //       this.resetGoal = false
    //     } else {
    //       this.$message.error('请正确输入！')
    //     }
    //   })
    // },
    submitBtn(index) {
      // 提交
      this.submitGoal = true
      this.submitIndex = index
    },
    submitFoo() {
      this.submitGoal = false
      this.postSubmitGoal.id = this.goal[this.submitIndex].id
      this.$http.post(this.$api.member.SUBMIT_GOAL, this.postSubmitGoal).then(() => {
        this.getGoals(this.postData)
        this.$message({
          message: '提交成功',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('提交失败')
      })
    },
    createBtn() {
      this.rulePostObj = this.createObject
      // console.log(this.rulePostObj)
      this.createGoal = true
      this.createObject.phase = this.goal.length + 1
    },
    // createFoo(ruleObj) {
    //   // save方法
    //   this.$refs[ruleObj].validate((valid) => {
    //     if (valid) {
    //       this.$http.post(this.$api.member.CREATE_GOAL, this.rulePostObj).then(() => {
    //         this.getGoals(this.postData)
    //         this.$message({
    //           message: '新建成功',
    //           type: 'success'
    //         })
    //       }).catch(() => {
    //         this.$message.error('新建失败')
    //       })
    //       this.createGoal = false
    //     } else {
    //       this.$message.error('请正确输入！')
    //     }
    //   })
    // },
    rejectFoo() {
      this.Foo('rulePostObj', this.$api.manager.REFUSE, '拒绝', this.rejectGoal)
    },
    createFoo() {
      this.Foo('rulePostObj', this.$api.member.CREATE_GOAL, '新建', this.createGoal)
    },
    resetFoo() {
      this.Foo('rulePostObj', this.$api.member.UPDATE_GOAL, '修改', this.resetGoal)
    },
    Foo(ruleObj, url, doSomething, dialog) {
      this.$refs[ruleObj].validate((valid) => {
        if (valid) {
          this.$http.post(url, this.rulePostObj).then(() => {
            this.$message({
              message: `${doSomething}成功！`,
              type: 'success'
            })
            this.getGoals(this.postData)
          }).catch(() => {
            this.$message.error(`${doSomething}失败！`)
          })
          dialog = false
        } else {
          this.$message.error('请正确输入！')
        }
      })
    },

    selfReviewBtn(index) {
      // 自评
      this.selfReviewGoal = true
      this.rulePostObj = this.goal[index]
    },
    selfReviewFoo() {
      // 自评
      this.selfReviewGoal = false
    },
    commentBtn(index) {
      // 评审
      this.commentGoal = true
      this.rulePostObj = this.goal[index]
    },
    commentFoo() {
      // 评审
      this.commentGoal = false
    }
  }
}

</script>

<style>
  .lefticon {
    width: 100px;
    height: 100px;
    background-color: cyan;
    line-height: 100px;
    text-align: center;
    border: 1px solid #000;
    border-radius: 50%;
    margin-left: 90px;
  }

  .leftBox {
    /* height: 200px; */
    width: 10px;
    background-color: cyan;
    margin-left: 100px;
  }

  .btn {
    float: right;
    margin-right: 50px;
    display: block;
    width: 300px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 100%;
  }

  .createBox {
    padding: 50px;
  }

  .createBtn {
    margin-left: 250px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
