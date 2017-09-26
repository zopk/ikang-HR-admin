<template>
  <div>
    <mainTop :pageBack="'true'" :title="title"></mainTop>
    <serviceDetail
      :serviceType="serviceType"
      :serviceList="serviceList"
      :details="details"
      @finishService="finishService"
      @calloffService="calloffService">
    </serviceDetail>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import serviceDetail from '../components/common/detailPage'
  export default {
    data () {
      return {
        title: '',
        details: '',
        serviceType: this.$route.params.serviceType,
        id: this.$route.params.id,
        source: 'ser',
        page: '',
        enterpriseId: this.$route.params.enterpriseId,
        serviceList: {
          'bookingDate': '',
          'createdDate': '',
          'updatedDate': ''
        },
        serviceData: {
        }
      }
    },
    mounted () {
      if (Cookies.get('mainDatabase')) {
//        this.enterpriseId = (JSON.parse(Cookies.get('mainDatabase'))).enterpriseId
        this.getServerDetail()
      } else {
        globals.loginCall()
      }
      this.listTitle()
    },
    components: {
      mainTop,
      serviceDetail
    },
    created () {
      this.getServerDetail()
    },
    watch: {
      $route (to) {
        this.serviceType = this.$route.params.serviceType
        this.listTitle()
      }
    },
    methods: {
//      获取数据列表
      listTitle () {
        if (this.serviceType === 'doctor') {
          this.title = '绿色就医详情'
          this.details = '就医信息'
        } else if (this.serviceType === 'lecture') {
          this.title = '专家讲座详情'
          this.details = '讲座信息'
        } else if (this.serviceType === 'bus') {
          this.title = '团检专车详情'
          this.details = '专车服务'
        } else if (this.serviceType === 'report') {
          this.title = '报告解读详情'
          this.details = '解读服务'
        }
      },
//      查看详情
      getServerDetail () {
        let sref = this
        this.$http.get(globals.host + 'entsrv/' + sref.serviceType + '/get', {
          params: {
            'enterpriseId': this.enterpriseId,
            'id': this.id,
            'source': this.source
          }
        })
        .then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.serviceList = response.data.results
          }
        })
      },
//      完成订单服务
      finishService (id) {
        let sref = this
        this.$http.post(globals.host + 'entsrv/' + sref.serviceType + '/edit', {
          'enterpriseId': this.enterpriseId,
          'id': id,
          'status': 1,
          'statusDesc': '已完成'
        })
        .then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.$router.push({path: '/Service/' + sref.serviceType})
          }
        })
      },
//      取消订单服务
      calloffService (id) {
        let sref = this
        this.$http.post(globals.host + 'entsrv/' + sref.serviceType + '/edit', {
          'enterpriseId': this.enterpriseId,
          'id': id,
          'status': 3,
          'statusDesc': '后台取消'
        })
        .then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.$router.push({path: '/Service/' + sref.serviceType})
          }
        }, function () {
        })
      }
    }
  }
</script>
<style>
.el-message-box__title{
  text-align: center!important;
}
</style>
