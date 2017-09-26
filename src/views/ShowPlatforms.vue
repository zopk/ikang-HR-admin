<template>
  <div class="platform">
    <mainTop :pageBack="true" :next="true" :title="'新建平台'" @nextStep="nextStep" :nextStepName="nextStepName"></mainTop>
    <div class="stepBox">
      <div class="bg"></div>
      <el-steps :space="300" :active="active" class="step" align-center center>
        <el-step title="基本设置"></el-step>
        <el-step title="HR端设置"></el-step>
        <!--<el-step title="团检报告设置"></el-step>-->
      </el-steps>
      <newCompany
        v-if="active == 1"
        :ruleForm="ruleForm"
        :companyList="companyList"
        @getCompanyList="getCompanyList"
        :isDisabled="isDisabled">
      </newCompany>
      <newHRSetting
        v-if="active == 2"
        :menu="menu"
        :newCompanyData="newCompanyData"
        :mySetForm="mySetForm"
        :eInfo="eInfo"
        :resourceData="resourceData"
        :eTeam="eTeam"
        :eService="eService"
        :isDisabled="isDisabled">
      </newHRSetting>
      <!--<uploadPdf-->
        <!--v-show="active == 3"-->
        <!--:action="action"-->
        <!--:uploadParams="uploadParams"-->
        <!--:uploadList="uploadList"-->
        <!--@getUploadList="getUploadList"-->
        <!--@delReport="delReport">-->
      <!--</uploadPdf>-->

    </div>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import newCompany from '../components/platform/newCompany.vue'
  import newHRSetting from '../components/platform/newHRSetting.vue'
  import uploadPdf from '../components/platform/uploadPdf.vue'
  export default {
    data () {
      return {
        isDisabled: true,
        active: 1,
        id: this.$route.params.id,
        action: globals.host + 'entrep/upload',
        enterpriseId: '',
        uploadParams: {
          enterpriseId: '',
          reportName: ''
        },
        uploadList: [],
        nextStepName: '下一步',
        newCompanyData: {},
        HRlist: [],
        eResourceList: [],
        eInfo: {},
        mySetForm: {
          projectNo: '',
          platformUser: {
            logonid: '',
            pwd: ''
          },
          eResourceList: [],
          eInfo: {},
          eTeam: [],
          eService: []
        },
        eTeam: [{
          name: '',
          mobile: '',
          email: '',
          position: ''
        }],
        eService: [{
          amount: 0,
          email: '',
          mobile: '',
          serviceType: 1
        }, {
          amount: 0,
          email: '',
          mobile: '',
          serviceType: 2
        }, {
          amount: 0,
          email: '',
          mobile: '',
          serviceType: 3
        }, {
          amount: 0,
          email: '',
          mobile: '',
          serviceType: 4
        }],
        menu: [],
        resourceData: [],
        ruleForm: {
          platformName: 'test',
          companyName: '',
          status: '0',
          pid: '',
          createdBy: '13'
        },
        companyList: []
      }
    },
    watch: {
      eInfo (newVal) {
        this.eInfo = newVal
        console.log(JSON.stringify(newVal))
      }
    },
    mounted () {
      if (Cookies.get('mainDatabase')) {
        this.enterpriseId = JSON.parse(Cookies.get('mainDatabase')).enterpriseId
        this.uploadParams.enterpriseId = this.enterpriseId
        this.getPlatformsDetail()
      } else {
        globals.loginCall()
      }
    },
    components: {
      mainTop, newCompany, newHRSetting, uploadPdf
    },
    methods: {
      getPlatformsDetail () {
        this.$http.get(globals.host + 'entpfm/einfo/' + this.id, {}).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.eInfo = response.data.results
            this.ruleForm = response.data.results
            this.ruleForm.status = String(this.ruleForm.status)
          }
        })
      },
      getCompanyList () {
        this.$http.get(globals.host + 'entpfm/findenterprise', {
          params: {
            'name': this.ruleForm.companyName
          }
        }).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.companyList = response.data.results
          }
        })
      },
      newCompany () {
        this.$http.post(globals.host + 'entpfm/modifyenterprise', this.ruleForm).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            console.log(response.data.results)
            this.active++
            this.nextStepName = '保存'
            this.newCompanyData = response.data.results
            this.newHRsetting()
            this.getDataResource()
          }
        })
      },
      getDataResource () {
        this.$http.get(globals.host + 'entpfm/findproject/' + this.newCompanyData.pid, {}).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.resourceData = response.data.results
          }
        })
      },
      newHRsetting () {
        this.$http.post(globals.host + 'entpfm/gethr', this.newCompanyData).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.HRlist = response.data.results
            this.eInfo = response.data.results.eInfo
            this.eInfo.serviceStart = this.eInfo.serviceStart !== null ? this.eInfo.serviceStart.substring(0, 10) : ''
            this.eInfo.serviceEnd = this.eInfo.serviceEnd !== null ? this.eInfo.serviceEnd.substring(0, 10) : ''
            this.eInfo.isDisplayIkang = String(response.data.results.eInfo.isDisplayIkang)
            if (response.data.results.eTeam && response.data.results.eTeam.length > 0) {
              this.eTeam = response.data.results.eTeam
            }
            if (response.data.results.eService && response.data.results.eService.length > 0) {
              this.eService = response.data.results.eService
              this.eService.forEach((item) => {
                if (item.amount > 999) {
                  this.$alert('服务次数不能大于999', '提示')
                  return
                }
              })
            }
            this.mySetForm.platformUser = response.data.results.platformUser
            this.mySetForm.platformUser.pwd = ''
            if (response.data.results.projectNo === null) {
              this.mySetForm.projectNo = ''
            } else {
              this.mySetForm.projectNo = String(response.data.results.projectNo)
            }
            let table = response.data.results.resourceBaseModel
            let mydata = []
            let mydata3 = {
              first: {
                'name': '页面级',
                'checked': false
              },
              resourceId: '0',
              second: ''
            }
            let mydata4 = []
            table.forEach(function (item) {
              let mydata2 = []
              if (item.type === 1) {
                item.enterpriseResourcemodel.forEach(function (item2) {
                  mydata2.push({
                    'name': item2.name,
                    'resourceId': item2.resourceId,
                    'checked': item2.check
                  })
                })
                mydata.push({
                  first: {
                    'name': item.name,
                    'resourceId': item.resourceId,
                    'checked': item.check
                  },
                  second: mydata2
                })
              } else if (item.type === 2 || item.type === 0) {
                mydata4.push({
                  'name': item.name,
                  'resourceId': item.resourceId,
                  'checked': item.check
                })
              }
            })
            mydata3.second = mydata4
            mydata.push(mydata3)
            this.menu = mydata
            console.log(this.menu)
          }
        })
      },
      saveHRsetting () {
        this.$http.post(globals.host + 'entpfm/sethr', this.mySetForm).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
//            this.active++
            this.nextStepName = '保存'
            this.$confirm('确定保存平台信息', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            })
              .then(() => {
                this.$router.push({path: '/PlatformtList'})
              })
//            if (this.active === 3) {
//              this.nextStepName = '保存'
//            }
            this.uploadParams.enterpriseId = this.mySetForm.eInfo.id
//            this.getUploadList()
          }
        })
      },
//      getUploadList () {
//        this.$http.get(globals.host + 'entrep/list', {
//          params: {
//            enterpriseId: this.mySetForm.eInfo.id
//          }
//        }).then((response) => {
//          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
//            this.uploadList = response.data.results.table
//          }
//        })
//      },
//      delReport (id) {
//        this.$http.post(globals.host + 'entrep/del', {
//          id: id
//        }).then((response) => {
//          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
//            this.$alert('报告删除成功', '提示')
//            this.getUploadList()
//          } else {
//            if (response.data.message && response.data.message.length > 0) {
//              this.$alert(response.data.message, '提示')
//            }
//          }
//        })
//      },
//      goBack () {
//        if (this.active !== 1) {
//          if (this.active > 1) {
//            this.active --
//            this.nextStepName = '下一步'
//          } else {
//            return false
//          }
//        } else {
//          this.$router.back(-1)
//        }
//      },
      nextStep () {
        if (this.active === 1) {
          if (this.ruleForm.platformName.trim() === '') {
            this.$alert('请输入平台名称', '提示')
            return
          }
          this.newCompany()
        } else if (this.active === 2) {
          this.eResourceList = []
          this.menu.forEach((item) => {
            if (item.first.checked && item.first.checked === true) {
              this.eResourceList.push({
                resourceId: item.first.resourceId
              })
            }
            item.second.forEach((item2) => {
              if (item2.checked && item2.checked === true) {
                this.eResourceList.push({
                  resourceId: item2.resourceId
                })
              }
            })
          })
          let eTeam = []
          let iseTeam = 1
          this.eTeam.forEach((item) => {
            if (item.name.trim() !== '' || item.mobile.trim() !== '' || item.position.trim() !== '' || item.email.trim() !== '') {
              if (item.name.trim() !== '' && item.mobile.trim() !== '') {
                if (!globals.Reg.verifyMobile.test(item.mobile.trim())) {
                  this.$alert('业务服务团队手机号格式错误！', '提示')
                  iseTeam = 0
                }
              } else {
                this.$alert('业务服务团队姓名和手机号必填！', '提示')
                iseTeam = 0
              }
              eTeam.push(item)
            }
          })
          if (!iseTeam) {
            return
          }
          let eService = []
          let iseService = 1
          this.eService.forEach((item) => {
            if (item.amount !== 0 || item.email.trim() !== '' || item.mobile.trim() !== '') {
              if (item.email.trim() === '' || item.mobile.trim() === '') {
                this.$alert('服务手机号和邮箱必填！', '提示')
                iseService = 0
              }
              if (!globals.Reg.verifyEmail.test(item.email.trim())) {
                this.$alert('服务邮箱格式错误！', '提示')
                iseService = 0
              }
              if (!globals.Reg.verifyMobile.test(item.mobile.trim())) {
                this.$alert('服务手机号格式错误！', '提示')
                iseService = 0
              }
              eService.push(item)
            }
          })
          if (!iseService) {
            return
          }
          this.mySetForm.eTeam = eTeam
          this.mySetForm.eService = eService
          this.mySetForm.eResourceList = this.eResourceList
          if (this.eInfo.serviceEnd !== '' && this.eInfo.serviceEnd !== undefined) {
            this.eInfo.serviceEnd = globals.format(this.eInfo.serviceEnd)
          }
          if (this.eInfo.serviceStart !== '' && this.eInfo.serviceStart !== undefined) {
            this.eInfo.serviceStart = globals.format(this.eInfo.serviceStart)
          }
          this.mySetForm.eInfo = this.eInfo
          if (this.mySetForm.eResourceList.length === 0) {
            this.$alert('请选择功能配置！', '提示')
            return
          }
          if (this.mySetForm.projectNo === '') {
            this.$alert('请选择数据来源！', '提示')
            return
          }
          if (this.mySetForm.platformUser.logonid === '' || this.mySetForm.platformUser.logonid === null || this.mySetForm.platformUser.pwd === '' || this.mySetForm.platformUser.pwd === null) {
            this.$alert('请输入HR平台登录账号和密码！', '提示')
            return
          }
          if (this.mySetForm.platformUser.logonid.length > 20) {
            this.$alert('HR平台登录账号最长不超过20位！', '提示')
            return
          }
          if (this.mySetForm.platformUser.pwd.length > 20 || this.mySetForm.platformUser.pwd.length < 6) {
            this.$alert('HR平台登录密码限制6-20位！', '提示')
            return
          }
          if (globals.Reg.verifyAccount.test(this.mySetForm.platformUser.logonid)) {
            this.$alert('HR平台账号不能输入中文！', '提示')
            return
          }
          this.saveHRsetting()
//          this.$router.push({path: '/PlatformtList'})
        }
//        } else if (this.active === 3) {
//          this.$router.push({path: '/PlatformtList'})
//        }
      }
    }
  }
</script>
<style scoped>
  .stepBox {
    background-color: #fff;
    width: 100%;
    margin-top: 20px;
    min-height: 623px;
    min-width: 1000px;
    position: relative;
    overflow-y:auto;
  }
  .stepBox .bg{
    width: 100%;
    height: 130px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url(../assets/images/bgChange.png) no-repeat center;
    background-size:  100%;
  }
  .step {
    margin: 0 auto;
    padding-top: 30px;
  }
</style>
