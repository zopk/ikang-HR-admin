<template>
  <div>
    <mainTop :tittle="'平台列表'" :project="true"></mainTop>
    <condition @searchPlatfromList="getPlatformList" :form="form"></condition>
    <tablelist :Header="Header" :dataList="platformList" :pageSize="form.cParam.pageSize" @goPage="goPage"
               @showDetail="showPlatforms"></tablelist>
  </div>
</template>
<script>
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import condition from '../components/platform/condition.vue'
  import tablelist from '../components/common/table.vue'
  export default {
    data () {
      return {
        platformList: [],
        form: {
          cParam: {
            page: 1,
            pageSize: 20
          },
          platformName: '',
          companyName: '',
          status: '',
          createdBy: '',
          createdDate: ''
        },
        Header: [{
          prop: 'sequence',
          name: '序号'
        }, {
          prop: 'platformName',
          name: '平台名称'
        }, {
          prop: 'companyName',
          name: '企业名称'
        }, {
          prop: 'status',
          name: '状态'
        }, {
          prop: 'createdBy',
          name: '创建人'
        }, {
          prop: 'createdDate',
          name: '创建时间'
        }, {
          prop: 'operations',
          name: '操作'
        }]
      }
    },
    created () {
      this.getPlatformList()
    },
    components: {
      mainTop, condition, tablelist
    },
    methods: {
      showPlatforms (id) {
        this.$router.push({path: '/ShowPlatforms/' + id})
      },
      searchPlatfromList () {
        this.form.cParam.page = 1
        this.getPlatformList()
      },
      getPlatformList () {
        if (this.form.createdDate) {
          this.form.createdDate = globals.format(this.form.createdDate)
        }
        this.$http.post(globals.host + 'entpfm/entplist', this.form).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.platformList = response.data.results
            let results = response.data.results
            this.count = results.count
            let count = this.count - (this.form.cParam.page - 1) * this.form.cParam.pageSize
            let leng = results.table.length
            if (count > 0 && leng > 0) {
              results.table.forEach(function (item) {
                item.sequence = count
                item.status = item.status === 0 ? '启用' : '停用'
//                item.createdBy = '管理员'
                count = count - 1
              })
              this.platformList = results
            } else {
              this.platformList = []
            }
          }
        })
      },
      goPage (page) {
        this.form.cParam.page = page
        this.getPlatformList()
      }
    }
  }
</script>
<style>

</style>
