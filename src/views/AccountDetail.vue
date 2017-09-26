<template>
  <div>
    <mainTop
      :pageBack='true'
      :title="'用户详情'"
      :saves="true"
      @saveForm="saveForm">
    </mainTop>
    <div class="pingtai">
      <div class="froms">
        <myFroms
          :userParam="userParam"
          :userDetail="'用户详情'">
        </myFroms>
      </div>
      <div class="chuan">
        <myTransfer
          :userParam="userParam"
          :data="data"
          :ind="data.ind"
          :searchCompany="searchCompany"
          @clearCompany="clearCompany"
          @searchList="searchList"
          @infosIds="infosIds"
          :values="data.values">
        </myTransfer>
      </div>
    </div>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import myFroms from '../components/createaccount/createUser'
  import myTransfer from '../components/createaccount/createpPatform'
  export default {
    data () {
      return {
        uid: this.$route.params.id,
        data: [],
        ind: '',
        values: '',
        enterpriseId: '',
        searchCompany: '',
        userParam: {
          'id': '',
          'account': '',
          'pwd': '',
          'logonid': '',
          'mobile': '',
          'type': '1',
          'position': '',
          'status': '0',
          'infoIds': [],
          'email': ''
        },
        sparam: {
          cParam: {
            'page': 1,
            'pageSize': 100
          },
          'companyName': '',
          'createdBy': '',
          'createdDate': '',
          'platformName': '',
          'status': 100
        }
      }
    },
    mounted () {
      if (Cookies.get('mainDatabase')) {
        this.enterpriseId = JSON.parse(Cookies.get('mainDatabase')).enterpriseId
      } else {
        globals.loginCall(this.$route.path)
      }
      this.entpList()
      this.accountList()
    },
    components: {
      mainTop,
      myFroms,
      myTransfer
    },
    methods: {
//      获取用户的信息
      accountList () {
        this.$http.get(globals.host + 'user/getUserInfo', {params: {'uid': this.uid}})
          .then((response) => {
            if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
              this.userParam = response.data.results
              this.userParam.type = String(this.userParam.type)
              this.userParam.status = String(this.userParam.status)
              if (this.userParam.infoIds === null) {
                this.userParam.infoIds = []
              } else {
                this.userParam.infoIds = response.data.results.infoIds
              }
            }
          })
      },
//      获取平台管理的公司
      entpList () {
        this.$http.post(globals.host + 'entpfm/entplist', this.sparam)
          .then((response) => {
            if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
              let list = response.data.results.table
              this.data = []
              list.forEach((item) => {
                this.data.push({
                  values: item.platformName,
                  ind: item.id
                })
              })
              return this.data
            }
          })
      },
//      搜索平台展示信息
      searchList (searchCompany) {
        this.sparam.platformName = searchCompany
        this.$http.post(globals.host + 'entpfm/entplist', this.sparam)
          .then((response) => {
            if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
              let result = response.data.results.table
              this.data = []
              result.forEach((item) => {
                this.data.push({
                  values: item.platformName,
                  ind: item.id
                })
              })
              return this.data
            }
          })
      },
//      确认平台选项
      infosIds (val) {
        val.forEach((item) => {
          if (this.userParam.infoIds.indexOf() !== -1) {
            this.userParam.infoIds.push(item)
          }
        })
        console.log(this.userParam.infoIds)
//        return this.userParam.infoIds
      },
      saveForm () {
        if (this.userParam.logonid === '') {
          this.$alert('请输入账号', '提示', {})
          return
        }
        if (this.userParam.pwd === '') {
          this.$alert('请输入密码', '提示', {})
          return
        }
        if (this.userParam.position === '') {
          this.$alert('请输入职位', '提示', {})
          return
        }
        if (this.userParam.mobile === '') {
          this.$alert('请输入联系电话', '提示', {})
          return
        } else if (!globals.Reg.verifyMobile.test(this.userParam.mobile)) {
          this.$alert('联系电话输入有误请重新输入', '提示', {})
          return
        }
        if (this.userParam.email === '') {
          this.$alert('请输入邮箱', '提示', {})
        } else if (!globals.Reg.verifyEmail.test(this.userParam.email)) {
          this.$alert('邮箱输入有误请重新输入', '提示', {})
          return
        }
//        确定保存修改的信息
        this.$confirm('确定保存信息吗？', '提示', {})
          .then(() => {
            let infos = {
              enterpriseId: this.enterpriseId,
              logonid: this.userParam.logonid,
              id: this.uid,
              pwd: JSON.parse(Cookies.get('mainDatabase')).pwd,
              status: this.userParam.status,
              type: this.userParam.type,
              infoIds: this.userParam.infoIds,
              email: this.userParam.email,
              mobile: this.userParam.mobile }
            console.log(infos)
            this.$http.post(globals.host + 'user/editUser', infos)
              .then((response) => {
                if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
                  this.$router.push({path: '/Accountlist'})
                }
              })
          })
      },
      clearCompany () {
        console.log(111)
        this.sparam.platformName = ''
        this.entpList()
      }
    }
  }
</script>
<style scoped>
  .pingtai{
    height: auto;
    background: #fff;
    margin-top: 15px;
  }
  .forms{
    padding-top: 50px;
    width: 100%;
  }
  .chuan{
    margin-top: 25px;
  }
</style>
