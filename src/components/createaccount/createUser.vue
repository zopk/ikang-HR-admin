<template>
  <div class="account">
    <p class="detail">{{userDetail}}</p>
    <el-form  :model="userParam" label-width="35%" :rules="rules" ref="ruleForm1">
      <el-form-item label="账号" prop="logonid">
        <el-input type="text" v-model="userParam.logonid" placeholder="请输入账号" :maxlength="20" auto-complete="new-password" initial='off'></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd" v-if="this.$route.path === '/CreateAccount'">
        <input type="password" name="txtPassword" style="display:none">
        <el-input type="password" v-model="userParam.pwd" placeholder="请输入密码" :maxlength="20" name="txtPassword" auto-complete="new-password" initial='off'></el-input>
      </el-form-item>

      <el-form-item label="职位" prop="position">
        <el-input type="text" v-model="userParam.position" placeholder="请输入职位" :maxlength="20" auto-complete="new-password" initial='off'></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input type="text"  v-model="userParam.mobile" placeholder="请输入联系电话" :maxlength="20" auto-complete="new-password" initial='off'></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input type="text" v-model="userParam.email" placeholder="请输入电子邮箱" :maxlength="50" auto-complete="new-password" initial='off'></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="userParam.type" placeholder="请选择角色" style="width:200px;">
          <el-option label="管理员" value="1" selected></el-option>
          <el-option label="项执人员" value="2" selected></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="userParam.status" placeholder="请选择状态" style="width:200px;">
          <el-option label="启用" value="0">启用</el-option>
          <el-option label="停用" value="1">停用</el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import globals from '././../../config'
  export default {
    props: ['userParam', 'userDetail'],
    data () {
      let validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'))
        } else if (globals.Reg.verifyAccount.test(value)) {
          callback(new Error('账号不能输入中文'))
        }
        callback()
      }
      let validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      let validatePosition = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('职位不能为空'))
        }
        callback()
      }
      let validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('电话不能为空'))
        } else if (!globals.Reg.verifyMobile.test(value)) {
          callback(new Error('联系电话输入有误请重新输入'))
        }
        callback()
      }
      let validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('邮箱不能为空'))
        } else if (!globals.Reg.verifyEmail.test(value)) {
          callback(new Error('邮箱输入有误请重新输入'))
        }
        callback()
      }
      return {
        rules: {
          logonid: [
            { validator: validateAccount, trigger: 'blur' },
            {required: true, message: '账号不能为空', trigger: 'blur'},
            {min: 1, max: 20, message: '账号只能输入20位', trigger: 'blur'}
          ],
          pwd: [
            { validator: validatePwd, trigger: 'blur' },
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 6, max: 20, message: '密码只能输入6-20位', trigger: 'blur'}
          ],
          position: [
            { validator: validatePosition, trigger: 'blur' },
            {required: true, message: '职位不能为空', trigger: 'blur'},
            {min: 1, max: 20, message: '职位只能输入20位', trigger: 'blur'}
          ],
          mobile: [
            { validator: validateMobile, trigger: 'blur' },
            {required: true, message: '电话不能为空', trigger: 'blur'},
            {min: 1, max: 20, message: '电话只能输入20位', trigger: 'blur'}
          ],
          email: [
            { validator: validateEmail, trigger: 'blur' },
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {min: 1, max: 50, message: '邮箱只能输入1-50位', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
    },
    methods: {
    }
  }
</script>
<style scoped>
  .el-input__inner:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }

  .account{
    position: relative;
  }

  .detail{
    position: absolute;
    top: 30px;
    left: 30px;
    border-left:3px solid #4297da;
    padding-left: 15px;
  }

  .el-input {
    width: 200px!important;
  }

  .el-form{
    padding-top: 50px;
  }
  .el-form-item{
    margin-top:10px;
  }

  .el-form-item__content{
    width: 50%;
    margin-left: 0;
  }
</style>
