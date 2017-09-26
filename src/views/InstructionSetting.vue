<template>
  <div>
    <mainTop :tittle="'使用说明配置'" :newInfo="true" :save="false" @NewSetting="goNewInstruction"></mainTop>
    <tableList :Header="Header" @goPage="goPage" :dataList="InstructionSettingList" :pageSize="page.pageSize" @showDetail="goDetail"></tableList>
  </div>
</template>
<script>
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import tableList from '../components/common/table.vue'
  export default {
    data () {
      return {
        InstructionSettingList: [],
        count: 0,
        page: {
          page: 1,
          pageSize: 20
        },
        Header: [{
          prop: 'sequence',
          name: '序号'
        }, {
          prop: 'name',
          name: '标题'
        }, {
          prop: 'url',
          name: '地址'
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
    created () {
      this.getInstructionSetting()
    },
    components: {
      mainTop, tableList
    },
    methods: {
      getInstructionSetting () {
        this.$http.get(globals.host + 'resource/resourceQaList', {
          params: this.page
        }).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            let results = response.data.results
            this.count = results.count
            let count = this.count - (this.page.page - 1) * this.page.pageSize
            let leng = results.table.length
            if (count > 0 && leng > 0) {
              results.table.forEach(function (item) {
                item.sequence = count
                item.status = item.status === 0 ? '启用' : '停用'
                item.createdBy = '管理员'
                count = count - 1
              })
              this.InstructionSettingList = results
            } else {
              this.InstructionSettingList = []
            }
          }
        }, function () {
        })
      },
      goNewInstruction () {
        this.$router.push({path: '/NewInstruction'})
      },
      goDetail (id) {
        this.$router.push({path: '/InstructionDetail/' + id})
      },
      goPage (page) {
        this.page.page = page
        this.getInstructionSetting()
      }
    }
  }
</script>
<style scoped>
  p{
    line-height:47px;
    border-bottom: 1px solid #c3c3c3;
  }

</style>
