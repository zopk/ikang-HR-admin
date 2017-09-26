<template>
  <div class="wrap">
    <div class="content-wrap">
      <el-row>
        <el-col :span="10">
          <div class="logo" @click="back()">
            <img :src="logo" alt="ikang" ><span>企业版管理平台</span>
          </div>
        </el-col>
        <el-col :span="13" style="margin-right: -4%;min-width:500px;">
          <div class="userInfo">
            <span>{{loginName}}  &nbsp;&nbsp;&nbsp; &nbsp; {{logonRights}}</span>
            <span class="amend" @click="amendPasswd()">修改密码</span>
            <span @click="loginout">退出</span>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="修改密码" :before-close="closeDialog"  :visible.sync="dialogFormVisible" :show-close="true" align="left" style="padding: 10px 10px ;top:20%;font-size: 16px;">
        <el-form ref="form" :rules="rules" :model="form"  >
          <el-form-item label="请输入原密码：" prop="passwd" :minlength="0" :maxlength="20" :label-width="formLabelWidth">
            <el-input type="password" auto-complete="new-password" v-model="form.passwd" style="width: 65%;"></el-input>
          </el-form-item>
          <el-form-item label="请输入新密码：" prop="newPasswd" :label-width="formLabelWidth">
            <el-input type="password" auto-complete="new-password" :minlength="6" :maxlength="20"  v-model="form.newPasswd" style="width: 65%;"></el-input>
          </el-form-item>
          <el-form-item label="请再次输入新密码：" prop="aginPasswd" :label-width="formLabelWidth" required>
            <el-input type="password"  auto-complete="new-password" :minlength="6" :maxlength="20" v-model="form.aginPasswd" style="width: 65%;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="callOff">取 消</el-button>
          <el-button type="primary" @click="changePwd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import globals from './../../config'
  import logo from './../../assets/images/logo.png'
  export default{
    data () {
      let filterPasswd = (rule, value, callback) => {
        console.log(value)
        if (value.trim() === '') {
          callback(new Error('请输入原密码'))
        } else {
          callback()
        }
      }
      let filterNewpasswd = (rule, value, callback) => {
        console.log(value)
        if (value.trim() === '') {
          callback(new Error('请输入新密码'))
        } else {
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('请再次输入新密码'))
          console.log(123)
        } else if (value !== this.form.newPasswd) {
          callback(new Error('两次新密码不一致，请重新输入'))
          console.log(234)
        } else {
          callback()
        }
      }
      return {
        logo,
        dialogFormVisible: false,
        formLabelWidth: '35%',
        loginName: '',
        logonRights: '',
        type: '',
        form: {
          passwd: '',
          newPasswd: '',
          aginPasswd: ''
        },
        rules: {
          passwd: [
            { required: true, message: '请输入原密码', trigger: 'blur' },
            { min: 1, max: 20, message: '原密码限制长度0-20位', trigger: 'blur' },
            { validator: filterPasswd, message: '请输入原密码', trigger: 'blur' }
          ],
          newPasswd: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 20, message: '新密码限制长度6-20位', trigger: 'blur' },
            { validator: filterNewpasswd, message: '请再次输入新密码', trigger: 'blur' }
          ],
          aginPasswd: [
            { min: 6, max: 20, message: '新密码限制长度6-20位', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      if (Cookies.get('mainDatabase')) {
        this.type = JSON.parse(Cookies.get('mainDatabase')).type
        if (this.type === 2) {
          this.loginName = JSON.parse(Cookies.get('mainDatabase')).logonid
          this.logonRights = '普通成员'
        } else if (this.type === 1) {
          this.loginName = JSON.parse(Cookies.get('mainDatabase')).logonid
          this.logonRights = '管理员'
        } else {
          this.loginName = JSON.parse(Cookies.get('mainDatabase')).logonid
          this.logonRights = '超级管理员'
        }
      } else {
        globals.loginCall(this.$route.path)
      }
    },
    methods: {
      closeDialog (done) {
        setTimeout(() => {
          this.dialogFormVisible = false
        }, 100)
        this.$refs.form.resetFields()
      },
//      点击按钮显示弹层
      amendPasswd () {
        if (this.type === 1 || this.type === 2) {
          this.dialogFormVisible = true
        } else if (this.type === 0) {
          this.$confirm('该用户没有权限', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
      },
//      确定修改密码
      changePwd () {
        if (this.form.passwd.trim() === '') {
          this.$alert('请输入原密码', '提示')
          return
        } else
        if (this.form.newPasswd.trim() === '') {
          this.$alert('请输入新密码', '提示')
          return
        } else
        if (this.form.newPasswd.trim().length < 6 || this.form.newPasswd.trim().length > 20) {
          this.$alert('新密码限制长度6-20位', '提示')
          return
        } else
        if (this.form.aginPasswd.trim() === '') {
          this.$alert('请再次输入新密码', '提示')
          return
        } else {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              console.log(111)
              if (this.form.newPasswd === this.form.aginPasswd) {
                this.$http.post(globals.host + 'user/modifiedPwd', {
                  passwd: this.form.passwd,
                  newPasswd: this.form.newPasswd
                }).then((response) => {
                  if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
                    this.dialogFormVisible = false
                    this.$confirm('密码修改成功', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'success'
                    })
                      .then(() => {
                        globals.loginCall('/')
                      })
                  } else {
                    if (response.data.message && response.data.message.length > 0) {
                      this.$alert(response.data.message, '提示')
                      console.log(response.data.message)
                    }
                  }
                })
              } else {
                this.$confirm('密码修改失败', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'success'
                })
                  .then(() => {
                    globals.loginCall('/')
                  })
              }
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      },
//      取消以后清除数据返回当前页
      callOff () {
        this.dialogFormVisible = false
        this.$refs.form.resetFields()
      },
      loginout () {
        globals.loginCall(this.$route.path)
      },
      back () {
        this.$router.push({path: '/'})
      }
    }
  }
</script>
<style scoped>
  input.el-input__inner:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }

  .wrap {
    width: 100%;
    min-width: 1000px;
    background: #fff;
    border-bottom: 1px solid #dedede;
  }

  .content-wrap {
    width: 100%;
    min-width: 1300px;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
  }

  .logo {
    color: #ec5a1b;
    font-size: 18px;
    cursor: pointer;
  }

  .logo img {
    vertical-align: text-bottom;
    margin: 16px 5px 0 20px;
    cursor: pointer;
  }

  .userInfo {
    text-align: right;
    font-size: 14px;
    width: 100%;
    min-width:1000px;
    float: right;
  }

  .userInfo a, .userInfo span {
    margin-left: 32px;
    color: #262626;
  }

  .userInfo span:last-child {
    cursor: pointer;
  }
  .userInfo .amend{
    cursor: pointer;
  }
  .el-dialog__header{
    border-bottom:1px solid #ccc!important;
    font-size: 16px!important;
    text-align: center!important;
  }
</style>
