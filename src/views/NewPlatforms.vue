<template>
  <div class="platform">
    <mainTop :pageBack="true" :next="true" :title="'新建平台'"  @nextStep="nextStep" :nextStepName="nextStepName"></mainTop>
    <div class="stepBox">
      <el-steps :space="300" :active="active" class="step" align-center center>
        <el-step title="基本设置"></el-step>
        <el-step title="HR端设置"></el-step>
        <!--<el-step title="团检报告设置"></el-step>-->
      </el-steps>
      <newCompany :ruleForm="ruleForm" :companyList="companyList"
                  @getCompanyList="getCompanyList"  v-show="active == 1"></newCompany>
      <newHRSetting :menu="menu" :newCompanyData="newCompanyData" :isDisabled="isDisabled"
                    :mySetForm="mySetForm" :eInfo="eInfo" :resourceData="resourceData" :eTeam="eTeam"
                    :eService="eService" v-show="active == 2"></newHRSetting>
      <!--<uploadPdf v-show="active == 3" :action="action" :uploadParams="uploadParams" :uploadList="uploadList"-->
                 <!--@getUploadList="getUploadList" @delReport="delReport"></uploadPdf>-->
    </div>
  </div>
</template>
<script>
  import globals from './../config'
  import Cookies from 'js-cookie'
  import mainTop from '../components/common/mainTop'
  import newCompany from '../components/platform/newCompany.vue'
  import newHRSetting from '../components/platform/newHRSetting.vue'
  import uploadPdf from '../components/platform/uploadPdf.vue'
  export default {
    data () {
      return {
        isDisabled: false,
        active: 1,
        action: globals.host + 'entrep/upload',
        enterpriseId: '',
        uploadParams: {
          enterpriseId: '',
          reportName: ''
        },
        uploadList: [],
        nextStepName: '下一步',
        newCompanyData: [],
        HRlist: [],
        eResourceList: [],
        serviceStart: '',
        eInfo: {
          serviceStart: '',
          serviceEnd: ''
        },
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
          platformName: '',
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
      }
    },
    mounted () {
      if (Cookies.get('mainDatabase')) {
        this.enterpriseId = JSON.parse(Cookies.get('mainDatabase')).enterpriseId
        this.uploadParams.enterpriseId = this.enterpriseId
      } else {
        globals.loginCall('/')
      }
    },
    components: {
      mainTop, newCompany, newHRSetting, uploadPdf
    },
    methods: {
//      获取所属企业列表
      getCompanyList () {
        this.$http.get(globals.host + 'entpfm/findenterprise', {
          params: {
            'name': this.ruleForm.companyName
          }
        }).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.companyList = response.data.results
            this.companyList.forEach((item) => {
              if (item.organName === this.ruleForm.companyName) {
                this.ruleForm.pid = item.organId
                return
              }
            })
          }
        })
      },
      newCompany () {
        this.$http.post(globals.host + 'entpfm/modifyenterprise', this.ruleForm).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            console.log(response.data.results)
            console.log(45612)
            this.active++
            this.nextStepName = '保存'
            this.newCompanyData = response.data.results
            this.newHRsetting()
            this.getDataResource()
          } else {
            if (response.data.message.length > 0) {
              this.$alert(response.data.message, '提示')
            }
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
//      HR设置
      newHRsetting () {
        this.$http.post(globals.host + 'entpfm/gethr', this.newCompanyData).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.HRlist = response.data.results
            this.eInfo = response.data.results.eInfo
            this.eInfo.isDisplayIkang = String(response.data.results.eInfo.isDisplayIkang)
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
            table.forEach((item) => {
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
//            this.getUploadList()
          }
        })
      },
//      getUploadList () {
//        this.$http.get(globals.host + 'entrep/list', {
//          params: {
//            enterpriseId: this.enterpriseId
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
      nextStep () {
        console.log(111)
        if (this.active === 1) {
          console.log(111)
          if (this.ruleForm.platformName.trim() === '') {
            this.$alert('请输入平台名称', '提示')
            return
          }
          if (this.ruleForm.companyName.trim() === '') {
            this.$alert('请输入所属企业', '提示')
            return
          }
          let hasCompanyName = 0
          this.companyList.forEach((item) => {
            if (this.ruleForm.companyName === item.organName) {
              hasCompanyName = 1
            }
          })
          if (!hasCompanyName) {
            this.$alert('请选择列表所属企业', '提示')
            return
          }
          this.newCompany()
        } else if (this.active === 2) {
          console.log(555)
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
            console.log(item.amount)
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
          console.log('serviceEnd', this.eInfo.serviceEnd)
          console.log('serviceStart', this.eInfo.serviceStart)
          if (this.eInfo.serviceEnd !== '' && this.eInfo.serviceEnd !== undefined) {
            this.eInfo.serviceEnd = globals.format(this.eInfo.serviceEnd)
          }
          if (this.eInfo.serviceStart !== '' && this.eInfo.serviceStart !== undefined) {
            this.eInfo.serviceStart = globals.format(this.eInfo.serviceStart)
          }
          this.mySetForm.eInfo = this.eInfo
          if (this.mySetForm.eResourceList.length === 0) {
            this.$alert('请选择功能配置！', '提示', {})
            return
          }
          if (this.mySetForm.projectNo === '') {
            this.$alert('请选择数据来源！', '提示', {})
            return
          }
          if (this.mySetForm.platformUser.logonid === '' || this.mySetForm.platformUser.pwd === '') {
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
  }

  .step {
    margin: 0 auto;
    padding-top: 30px;
  }
</style>
