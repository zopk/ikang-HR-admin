<template>
  <div>
    <mainTop :pageBack="true" :Newprofile1="true" :title="'使用说明详情'" :detail="'信息配置'" :saves="true" @saveForm="saveForm"></mainTop>
    <instructionForm :ruleForm="ruleForm" :isDisabled="isDisabled" :formName="'新建配置'"></instructionForm>
  </div>
</template>
<script>
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import instructionForm from '../components/xxSetting/instructionForm'
  export default {
    data () {
      return {
        isDisabled: false,
        ruleForm: {
          name: '',
          url: '',
          status: '0',
          createdBy: ''
        }
      }
    },
    mounted () {
    },
    components: {
      mainTop,
      instructionForm
    },
    methods: {
      saveForm () {
        if (this.ruleForm.name.trim() === '') {
          this.$alert('请输入标题', '提示')
          return
        }
        if (this.ruleForm.name.length > 20) {
          this.$alert('标题最多输入20位', '提示')
          return
        }
        if (this.ruleForm.url.trim() === '') {
          this.$alert('请输入地址', '提示')
          return
        }
        if (this.ruleForm.url.length > 200) {
          this.$alert('地址最多输入200位', '提示')
          return
        }
        this.$confirm('确定保存配置信息？', '提示', {}).then(() => {
          this.$http.post(globals.host + 'resource/addResourceQa', this.ruleForm).then((response) => {
            if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
              this.$router.push({path: '/InstructionSetting'})
            } else {
              if (response.data.message && response.data.message.length > 0) {
                this.$alert(response.data.message, '提示')
              }
            }
          })
        })
      }
    }
  }
</script>
<style>

</style>
