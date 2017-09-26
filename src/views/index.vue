<template>
  <div>
    <p>{{infos.todayDate}} <span>{{infos.title}}</span></p>
    <div class="cards">
      <el-row :gutter="24">
        <el-col :span="8">
          <div class="list lis doctor" @click="doctor">
            <div class="icon">
              <img  :src="Icon1">
              <h3>{{serverTime.enterpriseServiceDoctorApplyNum}}<span>次</span></h3>
              <p class="f12">{{applyTitle.green}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" >
          <div class="list lecture" @click="lecture">
            <div class="icon">
              <img  :src="Icon2">
              <h3>{{serverTime.enterpriseServiceLectureApplyNum}}<span>次</span></h3>
              <p class="f12">{{applyTitle.lecture}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" >
          <div class="list report" @click="report">
            <div class="icon">
              <img  :src="Icon3" >
              <h3>{{serverTime.enterpriseServiceReportApplyNum}}<span>次</span></h3>
              <p class="f12">{{applyTitle.report}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="list2">
        <el-col :span="16">
          <div class="list add" @click="add">
            <div class="icon icon2">
              <img  :src="Icon4">
              <h3>{{serverTime.personnelAddNum}}<span>人</span></h3>
              <p class="f12">{{applyTitle.add}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="list bus" @click="car">
            <div class="icon icon3">
              <img  :src="Icon5">
              <h3>{{serverTime.enterpriseServiceBusApplyNum}}<span>次</span></h3>
              <p class="f12">{{applyTitle.car}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import globals from './../config'
  import Icon1 from '../assets/images/icon1.png'
  import Icon2 from '../assets/images/icon2.png'
  import Icon3 from '../assets/images/icon3.png'
  import Icon4 from '../assets/images/icon4.png'
  import Icon5 from '../assets/images/icon5.png'
  export default {
    name: 'index',
    props: ['nodeTreeShow'],
    data () {
      return {
        Icon1,
        Icon2,
        Icon3,
        Icon4,
        Icon5,
        userId: '',
        serverTime: {
          enterpriseServiceDoctorApplyNum: '',
          enterpriseServiceLectureApplyNum: '',
          enterpriseServiceReportApplyNum: '',
          personnelAddNum: '',
          enterpriseServiceBusApplyNum: ''
        },
        type: '',
        infos: {
          todayDate: '2017-08-18',
          title: '最新情报'
        },
        applyTitle: {
          green: '绿色就医申请次数',
          lecture: '专家讲座申请次数',
          report: '报告解读申请次数',
          add: '新添加人数',
          car: '团检专车申请次数'
        }
      }
    },
    watch: {
      $route () {
        this.Servicetimes()
      }
    },
    mounted () {
      if (Cookies.get('mainDatabase')) {
        if (this.nodeTreeShow) {
          this.userId = JSON.parse(Cookies.get('mainDatabase')).id
          this.type = JSON.parse(Cookies.get('mainDatabase')).type
          this.Servicetimes()
        }
      } else {
        globals.loginCall(this.$route.path)
      }
    },
    methods: {
      Servicetimes () {
        this.infos.todayDate = globals.format(new Date())
        let userId = {'userId': this.userId}
        this.$http.get(globals.host + 'entpfm/serviceapplynum', {
          params: userId
        })
        .then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.serverTime = response.data.results
          }
          console.log(this.serverTime)
          if (response.data.code === 500 || response.data.code === 2) {
            this.serverTime.enterpriseServiceDoctorApplyNum = 0
            this.serverTime.enterpriseServiceLectureApplyNum = 0
            this.serverTime.enterpriseServiceReportApplyNum = 0
            this.serverTime.personnelAddNum = 0
            this.serverTime.enterpriseServiceBusApplyNum = 0
          }
        })
        .catch((error) => {
          console.log(error)
        })
      },
      doctor () {
        this.$router.push({path: '/Service/doctor'})
      },
      lecture () {
        this.$router.push({path: '/Service/lecture'})
      },
      report () {
        this.$router.push({path: '/Service/report'})
      },
      add () {
        this.$router.push({path: '/AddPersonRecord'})
      },
      car () {
        this.$router.push({path: '/Service/bus'})
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    line-height: 47px;
  }
  .cards .list{
    width: 100%;
    height: 380px;
    text-align:center;
    background: #fff;
    border-radius: 4px;
    margin-top: 15px;

  }
  .cards .doctor{
    background:  url(../assets/images/doctor.png) no-repeat center;
     background-size: 100%;

  }
  .cards .lecture{
    background:  url(../assets/images/lecture.png) no-repeat center;
    background-size: 100%;
  }
  .cards .report{
    background:  url(../assets/images/report.png) no-repeat center;
    background-size: 100%;
  }
  .cards .add{
    background:  url(../assets/images/addpersopn.png) no-repeat center;
    background-size: 100%;
  }
  .cards .bus{
    background:  url(../assets/images/bus.png) no-repeat center;
    background-size: 100%;
  }
  .list {
    cursor: pointer;
  }
  .list .icon img{
    width: 44px;
    height: 44px;
    margin-top: 78px;
    margin-bottom: 28px;
  }
  .list .icon h3{
    font-size: 40px;
    line-height: 46px;
    color: #333;
    font-weight: normal;
  }
  .list .icon h3 span{
    font-size: 20px;
    color:#484848;
    display: inline-block;
    margin-top: 5px;
  }
  .list .icon p{
    font-size: 12px;
    margin-top: 30px;
  }
  .list2{
    margin-top: 20px;
  }
  .list2 .icon2 img{
    width: 158px;
    height: 100px;
    margin-top: 68px;
  }
  .list2 .icon3 img{
    width: 56px;
    height: 40px;
    margin-top: 100px;
  }
  .list2 .icon2 p {
    margin-top: 0;
  }
  .list2 .icon3 p{
    font-size: 12px;
    margin-top: 30px;
  }
</style>
