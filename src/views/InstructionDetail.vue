<template>
  <div>
    <mainTop :pageBack="true" :newprofile="true" :title="'基础信息详情'" :detail="'信息配置'" :saves="true" @saveForm="saveForm"></mainTop>
    <instructionForm :ruleForm="ruleForm" :isDisabled="isDisabled" :formName="'配置详情'"></instructionForm>
  </div>
</template>
<script>
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import instructionForm from '../components/xxSetting/instructionForm.vue'
  export default {
    data () {
      return {
        isDisabled: true,
        id: this.$route.params.id,
        ruleForm: {}
      }
    },
    created () {
      this.getDetail()
    },
    components: {
      mainTop, instructionForm
    },
    methods: {
      getDetail () {
        this.$http.get(globals.host + 'resource/resourceQaInfo', {
          params: {
            'id': this.id
          }
        }).then((response) => {
          this.ruleForm = response.data.results
          this.ruleForm.status = String(this.ruleForm.status)
        })
      },
      saveForm () {
        this.$confirm('确定修改配置信息？', '提示', {}).then(() => {
          this.$http.post(globals.host + 'resource/updateResourceQa', this.ruleForm).then((response) => {
            if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
              this.$router.push({path: '/InstructionSetting'})
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
