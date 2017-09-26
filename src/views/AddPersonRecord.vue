<template>
  <div class="addrecord">
    <mainTop :tittle="'添加人员记录'"></mainTop>
    <menuList
      @searchService="searchService"
      @dateChange="dateChange"
      :listData="listData">
    </menuList>
    <tableList
      @PageIndex="PageIndex"
      :addPersonlist="addPersonlist"
      :page="listData.page"
      :total="total"
      :pageSize="listData.pageSize"
      :count="listData.count">
    </tableList>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import menuList from '../components/common/condition'
  import tableList from '../components/common/tablelist'
  export default {
    data () {
      return {
        userId: '',
        addPersonlist: [],
        total: '',
        type: '',
        listData: {
          page: 1,
          pageSize: 20,
          userId: '',
          count: 0,
          enterpriseName: '',
//          createDateStart: '',
//          createDateEnd: '',
          userName: '',
          createTime: []
        }
      }
    },
    mounted () {
      this.listData.page = 1
      if (Cookies.get('mainDatabase')) {
        this.type = JSON.parse(Cookies.get('mainDatabase')).type
        this.userId = JSON.parse(Cookies.get('mainDatabase')).id
        this.listData.userId = this.userId
        this.Infos()
      } else {
        globals.loginCall('/')
      }
    },
    watch: {
      $route (to) {
        this.Infos()
      }
    },
    components: {
      mainTop,
      menuList,
      tableList
    },
    methods: {
//      条件搜索列表展示
      searchService () {
        console.log(this.listData)
        this.listData.page = 1
        this.Infos()
      },
      dateChange (val) {
        console.log(val)
      },
//      首页数据展示
      Infos () {
        if (this.listData.createTime.length > 0 && this.listData.createTime[0] !== null) {
          this.listData.createDateStart = globals.format(this.listData.createTime[0])
          this.listData.createDateEnd = globals.format(this.listData.createTime[1])
        } else {
          this.listData.createDateStart = ''
          this.listData.createDateEnd = ''
        }
        this.$http.get(globals.host + 'entemp/employees/adm', {params: this.listData})
        .then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            let result = response.data.results.table
            this.listData.count = response.data.results.count
            let count = response.data.results.count - (this.listData.page - 1) * this.listData.pageSize
            this.total = Math.floor((response.data.results.count + this.listData.pageSize - 1) / this.listData.pageSize)
            console.log(count)
            let leng = result.length
            if (leng > 0 && count > 0) {
              result.forEach((item) => {
                item.sequence = count
                count = count - 1
              })
              this.addPersonlist = result
            } else {
              this.addPersonlist = []
            }
          }
        })
        .catch(() => {
          this.addPersonlist = []
        })
      },
//      分页切换
      PageIndex (val) {
        this.listData.page = val
        this.Infos()
      }
    }
  }
</script>
