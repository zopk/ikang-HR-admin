<template>
  <div class="addrecord">
    <mainTop :tittle="tittle"></mainTop>
    <menuList
      @searchService="searchService"
      @dateChange="dateChange"
      :listData="listData"
      :serviceType="serviceType"
     >
    </menuList>
    <tableList
      @PageIndex="PageIndex"
      :count="listData.count"
      :total="total"
      :page="listData.page"
      :pageSize="listData.pageSize"
      :pageSizes="listData.pageSizes"
      :serviceType="serviceType"
      :servicList="servicList">
    </tableList>
  </div>
</template>
<script>
//  import Cookies from 'js-cookie'
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import tableList from '../components/common/tablelist'
  import menuList from '../components/common/condition'
  export default {
    data () {
      return {
        tittle: '',
        total: '',
        serviceType: this.$route.params.serviceType,
        servicList: [],
        serverApi: '',
        listData: {
          page: 1,
          count: 0,
          pageSize: 20,
          status: '',
          companyName: '',
          createdDate: [],
          creatName: '',
          patientName: '',
          startDate: '',
          endDate: ''
        }
      }
    },
    created () {
      this.Infos()
    },
    mounted () {
    },
    watch: {
      $route () {
        this.serviceType = this.$route.params.serviceType
        this.listData.createdDate = []
        this.listData.status = ''
        this.listData.startDate = ''
        this.listData.endDate = ''
        this.listData.companyName = ''
        this.listData.creatName = ''
        this.listData.patientName = ''
        this.Infos()
      }
    },
    components: {
      mainTop,
      tableList,
      menuList
    },
    methods: {
      dateChange () {},
//      首页数据展示
      Infos () {
        if (this.serviceType === 'doctor') {
          this.tittle = '绿色就医服务'
        } else if (this.serviceType === 'lecture') {
          this.tittle = '专家讲座服务'
        } else if (this.serviceType === 'bus') {
          this.tittle = '团检专车服务'
        } else if (this.serviceType === 'report') {
          this.tittle = '报告解读服务'
        }
        this.ServiceList('entsrv/' + this.serviceType + '/search')
        this.dateChange()
      },
 //      条件搜索展示
      searchService () {
        this.listData.page = 1
        this.Infos()
      },
//      表格数据
      ServiceList (api) {
        if (this.listData.createdDate.length > 0 && this.listData.createdDate[0] !== null) {
          this.listData.startDate = globals.format(this.listData.createdDate[0])
          this.listData.endDate = globals.format(this.listData.createdDate[1])
        } else {
          this.listData.startDate = ''
          this.listData.endDate = ''
        }
        console.log('listData', this.listData)
        this.$http.get(globals.host + api, {params: this.listData}).then((response) => {
          console.log(response.data.results)
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            let results = response.data.results.table
            this.listData.count = response.data.results.count
            let count = response.data.results.count - (this.listData.page - 1) * this.listData.pageSize
            this.total = Math.floor((response.data.results.count + this.listData.pageSize - 1) / this.listData.pageSize)
            console.log(count)
            let leng = results.length
            if (count > 0 && leng > 0) {
              results.forEach(function (item) {
                item.sequence = count
                count = count - 1
              })
              this.servicList = results
            } else {
              this.servicList = []
            }
          }
        })
        .catch(() => {
          this.servicList = []
        })
      },
 //      分页下标的切换
      PageIndex (val) {
        this.listData.page = val
        this.Infos()
      }
    }
  }
</script>
<style>

</style>
