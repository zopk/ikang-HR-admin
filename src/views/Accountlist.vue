<template>
  <div>
    <mainTop :tittle="'账号管理'" :account="true"></mainTop>
    <menuList
      @accountSearch="accountSearch"
      :accountList="accountList">
    </menuList>
    <menuTable
      @PageIndex="PageIndex"
      :listAcount="listAcount"
      :pageSize="accountList.pageSize"
      :total="total"
      :page="accountList.page"
      :count="accountList.count">
    </menuTable>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import menuList from '../components/account/condition'
  import menuTable from '../components/account/accountList'
  export default {
    data () {
      return {
        total: '',
        accountList: {
          pageSize: 20,
          page: 1,
          count: 0,
          username: '',
          status: ''
        },
        listAcount: []
      }
    },
    components: {
      mainTop,
      menuList,
      menuTable
    },
    watch: {
      $route (to) {
        this.accountList.page = 1
        this.Account()
      }
    },
    mounted () {
      if (Cookies.get('mainDatabase')) {
//        this.accountList.username = JSON.parse(Cookies.get('mainDatabase')).logonid
        this.Account()
      } else {
        globals.loginCall('/')
      }
    },
    methods: {
//      搜索条件查询
      accountSearch () {
        console.log(111)
        this.accountList.page = 1
        if (this.accountList.username) {
          this.accountList.logonid = this.accountList.username
          console.log(this.accountList.logonid)
        }
        this.Account()
      },
//      首页账户列表数据展示
      Account () {
        let list = {
          username: this.accountList.logonid,
          status: this.accountList.status,
          page: this.accountList.page,
          pageSize: this.accountList.pageSize}
        console.log(list)
        this.$http.get(globals.host + 'user/getUserList', {params: list})
          .then((response) => {
            if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
              let results = response.data.results.table
              this.accountList.count = response.data.results.count
              let count = response.data.results.count - (this.accountList.page - 1) * this.accountList.pageSize
              this.total = Math.floor((response.data.results.count + this.accountList.pageSize - 1) / this.accountList.pageSize)
              console.log(count)
              let leng = results.length
              if (count > 0 && leng > 0) {
                results.forEach(function (item) {
                  item.sequence = count
                  count = count - 1
                  item.status = String(item.status) === '0' ? '启用' : '停用'
                })
                this.listAcount = results
                console.log(results[0].status)
              } else {
                this.listAcount = []
              }
            }
          })
          .catch(() => {
            this.listAcount = []
          })
      },
//      切换分页
      PageIndex (val) {
        console.log(val)
        this.accountList.page = val
        this.Account()
      }
    }
  }
</script>
<style scoped>

</style>
