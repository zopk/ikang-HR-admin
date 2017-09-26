<template>
  <div>
	  <mainTop :pageBack="true"  :title="'添加人员详情'" ></mainTop>
    <personDetail :details="'人员信息'" :personDetailList="personDetailList"></personDetail>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import globals from './../config'
  import mainTop from '../components/common/mainTop'
  import personDetail from '../components/person/personDtail'
  export default {
    data () {
      return {
        userId: '',
        listData: {
          page: 1,
          pageSize: 20,
          userId: '',
          count: 0,
          enterpriseName: '',
          createDate: '',
          userName: '',
          createTime: ''
        },
        personDetailList: []
      }
    },
    mounted () {
      if (Cookies.get('mainDatabase')) {
        if (Cookies.get('personDetail')) {
          this.personDetailList = JSON.parse(Cookies.get('personDetail'))
          let caredType = this.personDetailList
          console.log(caredType)
          if (caredType.gender === 0) {
            caredType.gender = '女'
          } else if (caredType.gender === 1) {
            caredType.gender = '男'
          } else {
            caredType.gender = '-'
          }
          if (caredType.crowd === null) {
            caredType.crowd = '-'
          }
          if (caredType.cardNo === null) {
            caredType.cardNo = '-'
          }
          if (caredType.department === '') {
            caredType.department = '-'
          }
          if ((caredType.mobile && caredType.birthDate && caredType.idcard) === null) {
            caredType.mobile = '-'
            caredType.birthDate = '-'
            caredType.idcard = '-'
          }
          if (caredType.ikangCard === null) {
            caredType.ikangCard = '-'
          }
          if (caredType.idcardType === 1) {
            caredType.idcardType = '身份证'
          } else if (caredType.idcardType === 2) {
            caredType.idcardType = '护照'
          } else if (caredType.idcardType === 3) {
            caredType.idcardType = '军官证'
          } else if (caredType.idcardType === 4) {
            caredType.idcardType = '港澳通行证'
          } else if (caredType.idcardType === 5) {
            caredType.idcardType = '驾驶证'
          } else if (caredType.idcardType === 6) {
            caredType.idcardType = '户口本'
          } else if (caredType.idcardType === 7) {
            caredType.idcardType = '医保手册'
          } else if (caredType.idcardType === 8) {
            caredType.idcardType = '暂住证'
          } else if (caredType.idcardType === 9) {
            caredType.idcardType = '其他'
          } else if (caredType.idcardType === -1 || caredType.idcardType === 0 || caredType.idcardType === null) {
            caredType.idcardType = '-'
          }
        }
      } else {
        globals.loginCall(this.$route.path)
      }
    },
    watch: {
      $route () {
        this.Detail()
      }
    },
    components: {
      mainTop,
      personDetail
    },
    methods: {

    }
  }
</script>
<style>

</style>
