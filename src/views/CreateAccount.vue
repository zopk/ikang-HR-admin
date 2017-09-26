<template>
  <div>
    <mainTop
      :pageBack='true'
      :title="'新建用户'"
      :saves="true"
      @saveForm="saveForm">
    </mainTop>

    <div class="pingtai">
      <div class="froms">
        <myFroms
          :userParam="userParam"
          :userDetail="'新建用户'">
        </myFroms>
      </div>

      <div class="chuan">
          <myTransfer
            :userParam="userParam"
            :data="data"
            :ind="ind"
            :searchCompany="searchCompany"
            :values="values"
            @infosIds="infosIds"
            @clearCompany="clearCompany"
            @searchList="searchList">
          </myTransfer>
      </div>
    </div>
  </div>
</template>
<script>
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import myFroms from '../components/createaccount/createUser'
  import myTransfer from '../components/createaccount/createpPatform'
  export default {
    data () {
      return {
        data: [],
        ind: '',
        values: '',
        searchCompany: '',
        userParam: {
          id: '0',
          logonid: '',
          pwd: '',
          mobile: '',
          type: '2',
          position: '',
          status: '0',
          infoIds: [],
          email: ''
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
      this.entpList()
    },
    computed: {

    },
    components: {
      mainTop,
      myFroms,
      myTransfer
    },
    methods: {

//      确定保存信息，成功返回登录页
      saveForm () {
        if (this.userParam.logonid === '') {
          this.$alert('请输入账号', '提示', {})
          return
        } else
        if (globals.Reg.verifyAccount.test(this.userParam.logonid.trim())) {
          this.$alert('账号不能输入中文', '提示', {})
          return
        }
        if (this.userParam.pwd === '') {
          this.$alert('请输入密码', '提示', {})
          return
        } else if (this.userParam.pwd.trim().length < 6) {
          this.$alert('密码只能输入6-20位', '提示', {})
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
          return
        } else if (!globals.Reg.verifyEmail.test(this.userParam.email)) {
          this.$alert('邮箱输入有误请重新输入', '提示', {})
          return
        }
        this.$confirm('确定保存信息吗？', '提示', {})
        .then(() => {
          this.$http.post(globals.host + 'user/addUser', this.userParam)
            .then((response) => {
              if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
                this.$router.push({path: '/Accountlist'})
              } else {
                if (response.data.message && response.data.message.length > 0) {
                  this.$alert(response.data.message, '提示')
                  console.log(response.data.message)
                }
              }
            })
        })
      },
//      平台展示
      entpList () {
//        this.$http.post(globals.host + 'entpfm/entplist', this.sparam)
//          .then((response) => {
//            if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
//              let list = response.data.results.table
//              console.log(list)
//              this.data = []
//              list.forEach((item, index) => {
//                this.data.push({
//                  values: item.platformName,
//                  ind: item.id
//                })
//              })
//              return this.data
//            }
//          })
        this.searchList()
      },
//      搜索平台
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
//      选中平台
      infosIds (val) {
        val.forEach((item) => {
          if (this.userParam.infoIds.indexOf() !== -1) {
            this.userParam.infoIds.push(item)
          }
        })
        console.log(this.userParam.infoIds)
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
    height: 1026px;
    background: #fff;
    margin-top: 15px;
    margin-bottom: 20px;
  }
  .forms{
    margin-top: 50px;
    width: 100%;
  }
  .chuan{
    margin-top: 25px;
  }
</style>
