<template>
  <div>
    <mainTop :pageBack="true" :newprofile="true" :title="'基础信息配置'" :detail="'信息配置'" :saves="true" @saveForm="saveForm"></mainTop>
    <basicsForm :ruleForm="ruleForm" :isDisabled="isDisabled" :getFirstList="getFirstList" :formName="'新建配置'"></basicsForm>
  </div>
</template>
<script>
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import basicsForm from '../components/xxSetting/basicsForm'
  export default {
    data () {
      return {
        isDisabled: false,
        ruleForm: {
          name: '',
          code: '',
          type: '',
          pid: '',
          status: '0'
        },
        getFirstList: {}
      }
    },
    mounted () {
      this.getFirstTree()
    },
    components: {
      mainTop, basicsForm
    },
    methods: {
      getFirstTree () {
        this.$http.get(globals.host + 'resource/firstResource', {}).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.getFirstList = response.data.results
            console.log(this.getFirstList)
          }
        })
      },
      saveForm () {
        if (this.ruleForm.name.trim() === '') {
          this.$alert('请输入名称', '提示')
          return
        }
        if (this.ruleForm.code.trim() === '') {
          this.$alert('请输入code', '提示')
          return
        } else
        if (!globals.Reg.verifyNumber.test(this.ruleForm.code.trim())) {
          this.$alert('code只能为数字', '提示')
          return
        } else
        if (this.ruleForm.code.trim().length < 6) {
          this.$alert('code只能为6位数字', '提示')
          return
        }
        if (this.ruleForm.type === '') {
          this.$alert('请选择类别', '提示')
          return
        }
        if (this.ruleForm.type === '2' && this.ruleForm.pid === '') {
          this.$alert('请选择上级页面', '提示')
          return
        }
        this.$confirm('确定保存配置信息？', '提示', {}).then(() => {
          if (this.ruleForm.type !== '2') {
            this.ruleForm.pid = '0'
          }
          this.ruleForm.pid = String(this.ruleForm.pid)
          this.$http.post(globals.host + 'resource/addResource', this.ruleForm).then((response) => {
            if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
              this.$router.push({path: '/BasicSetting'})
            } else {
              if (response.data.message && response.data.message.length > 0) {
                this.$alert(response.data.message, '提示')
                console.log(response.data.message)
              }
            }
          }, function () {
          })
        }).catch(() => {
          console.log('取消')
        })
      }
    }
  }
</script>
<style>

</style>
