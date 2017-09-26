<template>
  <div>
    <mainTop :tittle="'基础信息配置'" :newInfo="true" :save="false" @NewSetting="goNewBasics"></mainTop>
    <tableList :Header="Header" @goPage="goPage" :dataList="BasicSettingList" :page="page.page" :pageSize="page.pageSize" @showDetail="goDetail" :total="total"></tableList>
  </div>
</template>
<script>
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import tableList from '../components/common/table'
  export default {
    data () {
      return {
        page: {
          page: 1,
          pageSize: 20
        },
        total: '',
        BasicSettingList: [],
        count: 0,
        Header: [{
          prop: 'sequence',
          name: '序号'
        }, {
          prop: 'name',
          name: '名称'
        }, {
          prop: 'code',
          name: 'code'
        }, {
          prop: 'type',
          name: '类别'
        }, {
          prop: 'pcode',
          name: '上级页面'
        }, {
          prop: 'status',
          name: '状态'
        }, {
          prop: 'createdBy',
          name: '创建人'
        }, {
          prop: 'updatedDate',
          name: '创建时间'
        }, {
          prop: 'operations',
          name: '操作'
        }]
      }
    },
    methods: {
      getBasicSetting () {
        this.$http.get(globals.host + 'resource/resourceList', {
          params: this.page
        }).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            let results = response.data.results
            this.count = results.count
            let count = this.count - (this.page.page - 1) * this.page.pageSize
            this.total = Math.floor((response.data.results.count + this.page.pageSize - 1) / this.page.pageSize)
            let leng = results.table.length
            if (count > 0 && leng > 0) {
              results.table.forEach(function (item) {
                item.sequence = count
                item.status = item.status === 0 ? '启用' : '停用'
                item.createdBy = '管理员'
                count = count - 1
              })
              this.BasicSettingList = results
            } else {
              this.BasicSettingList = []
            }
          }
        }, function () {
        })
      },
      goNewBasics () {
        this.$router.push({path: '/NewBasics'})
      },
      goDetail (id) {
        this.$router.push({path: '/BasicsDetail/' + id})
      },
      goPage (page) {
        this.page.page = page
        this.getBasicSetting()
      }
    },
    mounted () {
      this.getBasicSetting()
    },
    components: {
      mainTop, tableList
    }
  }
</script>
<style scoped>
  p {
    line-height: 47px;
    border-bottom: 1px solid #c3c3c3;
  }

</style>
