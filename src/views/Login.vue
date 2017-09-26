<template>
  <div class="box">
  <div class="login">
    <div class="Login">
      <el-row :gutter="24">
        <el-col :span="12" class="_left">
          <div class="bg">
            <img :src="Logo" alt="ikang企业管理平台">
          </div>
        </el-col>
        <el-col :span="12" class="_right">
          <div class="login-message">
            <span class="jiao top"></span>
            <span class="jiao right"></span>
            <span class="jiao left"></span>
            <span class="jiao bottom"></span>
            <p>ikang企业管理平台</p>
            <div class="forms">
              <div class="errorInfo">
                <span class="Tip" v-show="error"><span style="display: inline-block">{{errorText}}</span></span>
              </div>
              <ul class="Inputs">
                <li class="username" :class="{'error': !errorArr.username}">
                  <!--<input type="text" name="txtUsername" style="display:none">-->
                  <input type="text" autocomplete="new-password" placeholder="请输入用户名" class="text"  v-model="account.username" >
                </li>
                <li class="passwd" :class="{'error':!errorArr.passwd}">
                  <input type="password" name="txtPassword" style="display:none">
                  <input type="password" name="txtPassword" autocomplete="new-password" placeholder="请输入密码" class="text" v-model="account.passwd">
                </li>
                <li class="codes" style="display: block;">
                  <img :src="Imgs" @click="getCode()" title="点击刷新" alt="点击刷新">
                  <input type="text" :class="{'error':!errorArr.code}" @keyup.enter="handleLogin()" v-model="account.code" placeholder="请输入验证码" class="code">
                </li>
              </ul>
              <div class="info" @click="getCode()">点击图片刷新验证码</div>
              <div class="sign-in f14" @click="handleLogin()">登&nbsp;&nbsp;&nbsp;录</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <p class="address f14">爱康国宾集团技术部支持</p>
  </div>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import globals from './../config'
  import Logo from '../assets/images/login-banner.png'
  export default {
    name: 'Login',
    data () {
      return {
        Logo,
        error: false,
        Imgs: '',
        errorArr: {
          username: true,
          passwd: true,
          code: true
        },
        errorText: '',
        account: {
          username: '',
          passwd: '',
          code: ''
        },
        mainDatabase: {},
        codeResults: ''
      }
    },
    mounted () {
      this.getCode()
    },
    methods: {
      getCode () {
        let d = new Date().getTime()
        this.$http.get(globals.host + 'user/getImgCode?d= ' + d).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.codeResults = response.data.results
            this.Imgs = this.codeResults.img
          }
        })
      },
      // 保存数据
      register () {
        this.$http.get(globals.host + 'user/adminLogin', {
          params: this.account
        })
        .then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.error = false
            this.mainDatabase = response.data.results
            let mainDatabase = {
              'id': this.mainDatabase.id,
              'logonid': this.mainDatabase.logonid,
              'pwd': this.mainDatabase.pwd,
              'enterpriseId': this.mainDatabase.enterpriseId,
              'type': this.mainDatabase.type
            }
            Cookies.set('mainDatabase', JSON.stringify(mainDatabase))
            if (Cookies.get('afterLoginTarget')) {
              let afterLoginTarget = Cookies.get('afterLoginTarget')
              this.$router.push({path: afterLoginTarget})
            } else {
              this.$router.push({path: '/'})
            }
          } else {
            this.error = true
            this.errorText = response.data.message
            this.getCode()
            this.account.code = ''
          }
        }).catch((err) => {
          this.errorText = err.data.message
          console.log(err.data.message)
        })
      },
      // 用户登录的状态值
      handleLogin () {
        if (this.account.username.trim() === '') {
          this.error = true
          this.errorArr.username = false
          this.errorText = '请输入账号'
          return
        } else {
          this.error = false
          this.errorArr.username = true
          this.errorText = ''
          this.loginPassword()
        }
      },
      // 判断密码的状态值
      loginPassword () {
        if (this.account.passwd.trim() === '') {
          this.error = true
          this.errorArr.passwd = false
          this.errorText = '请输入密码'
          return
        } else {
          this.error = false
          this.errorArr.passwd = true
          this.errorText = ''
          this.loginCode()
        }
      },
      // 判断验证码
      loginCode () {
        if (this.account.code.trim() === '') {
          this.error = true
          this.errorArr.code = false
          this.errorText = '请输入验证码'
        } else {
          this.error = false
          this.errorArr.code = true
          this.errorText = ''
          this.register()
        }
      }
    }
  }
</script>
<style scoped>
  .box{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
  }
  .login {
    /*overflow: hidden;*/
    position: absolute;
    left: 50%;
    right: 50%;
    top: 25%;
    width: 100%;
    height: 400px;
    -webkit-transform: translate(-50%);    /* for Chrome || Safari */
    -moz-transform: translate(-50%);       /* for Firefox */
    -ms-transform: translate(-50%);        /* for IE */
    -o-transform: translate(-50%);         /* for Opera */
    transform: translate(-50%);
    background: #4297da;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  ._left {
    width: 500px;
    margin-right: 32px;
  }
  ._right {
    width: 468px;
  }
  .Login {
    width: 1000px;
    height: 400px;
    margin: auto;
    background: #4297da;
  }
  .bg {
    width: 416px;
    height: 314px;
    margin: 50px;
  }
  .login-message {
    width: 100%;
    height: 426px;
    margin-top: -13px;
    text-align: center;
    background: #fbfbfb;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    position: relative;
  }
  .login-message span.jiao{
    display: inline-block;
    width: 9px;
    height: 14px;
  }
  .login-message .top{
    background: url(../assets/images/top.png) no-repeat center;
    background-size: 100%;
    position: absolute;
    left: -9px;
    top: -2px;
  }
  .login-message .right{
    background: url(../assets/images/right.png) no-repeat center;
    background-size: 100%;
    position: absolute;
    right: -9px;
    top: -2px;
  }
  .login-message .left{
    background: url(../assets/images/left.png) no-repeat center;
    background-size: 100%;
    position: absolute;
    left: -9px;
    bottom: 0;
  }
  .login-message .bottom{
    background: url(../assets/images/bottom.png) no-repeat center;
    background-size: 100%;
    position: absolute;
    right: -9px;
    bottom: 0;
  }

  .login-message p {
    color: #777777;
    font-size: 26px;
    line-height: 114px;
  }
  .forms {
    width: 326px;
    height: 326px;
    margin: auto;
    margin-top: -30px;
    position: relative;
  }
  .forms .errorInfo {
    padding: 5px 0;
    height: 30px;
    overflow: hidden;
  }
  .forms .Tip {
    display: block;
    background: url(https://static-oauth2.health.ikang.com/static/images/tipIcon.png) no-repeat left center #fbe0d1;
    line-height: 28px;
    font-size: 14px;
    border: 1px solid #f7b28c;
    text-align: left;
    padding-left: 50px;
  }
  .forms .Tip span {
    color: #ea5504;
    font-size: 12px;
  }
  .forms .Inputs li {
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    font-size: 14px;
    position: relative;
  }
  .forms .Inputs .text {
    width: 85%;
    height: 38px;
    line-height: 38px;
    float: right;
    border: none;
    padding-left: -20px;
  }
  .forms .Inputs li.username {
    background: url(./../assets/images/user.png) no-repeat 10px center #fff;
    width: 326px;
    border: 1px solid #ccc;
  }
  .forms .Inputs li.passwd {
    background: url(./../assets/images/password.png) no-repeat 10px center #fff;
    width: 326px;
    border: 1px solid #ccc;
  }
  .error {
    border: 1px solid red !important;
  }
  .codes img {
    float: right;
    margin-top: 0;
    cursor: pointer;
    width: 136px;
    height: 41px;
    border: 1px solid #e6ebee;
    overflow: hidden;
  }
  .code {
    float: left;
    height: 36px;
    width: 150px;
    padding-left: 15px;
    border: 1px solid #ccc;
  }
  .code .tt {
    border-left: 1px solid #e1e1e1;
    height: 36px;
    line-height: 36px;
  }
  .code .tt input {
    width: 100%;
    height: 36px;
    border: 0;
    padding-left: 10px;
  }
  .info {
    position: absolute;
    right: 0;
    bottom: 100px;
    font-size: 12px;
    cursor: pointer;
  }
  .ps {
    border: 1px solid #e1e1e1;
    height: 36px;
    line-height: 36px;
  }
  .ps img {
    width: 100%;
    height: 100%;
  }
  .code .ls {
    margin-right: 27px;
  }
  .wei {
    position: absolute;
    right: 0;
    bottom: 76px;
    color: #c8c8c8;
  }
  .sign-in {
    width: 100%;
    height: 36px;
    margin-top: 30px;
    background: #4297da;
    color: #fff;
    border: 1px solid #9cc8ff;
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    float: left;
  }
  .address {
    width: 100%;
    min-width:1000px;
    float: left;
    text-align: center;
    line-height: 130px;
    color: #707070;
  }

</style>

