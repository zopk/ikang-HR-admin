<template>
  <div>
    <!--绿色就医详情-->
    <el-row :gutter="24" :data="serviceList" v-if="serviceType == 'doctor'">
      <div class="infos">
        <div class="bg"></div>
        <p class="top"><span class="cos"></span>{{details}}</p>
        <el-row :gutter="24">
          <el-col :span="12" label="服务单状态" style="text-align:right;">服务单状态</el-col>
          <el-col :span="12">{{serviceList.statusDesc}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="医院" style="text-align:right;">医院</el-col>
          <el-col :span="12">{{serviceList.hospital}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="科室" style="text-align:right;">科室</el-col>
          <el-col :span="12">{{serviceList.deptName}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="就医时间" style="text-align:right;">就医时间</el-col>
          <el-col :span="12">{{serviceList.bookingDate}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="医师级别" style="text-align:right;">医师级别</el-col>
          <el-col :span="12">{{serviceList.doctorLevel}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="医生名称" style="text-align:right;">医生名称</el-col>
          <el-col :span="12">{{serviceList.doctorName}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="就诊人姓名" style="text-align:right;">就诊人姓名</el-col>
          <el-col :span="12">{{serviceList.patientName}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="就诊人电话" style="text-align:right;">就诊人电话</el-col>
          <el-col :span="12">{{serviceList.patientTel}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="就诊人身份证" style="text-align:right;">就诊人身份证</el-col>
          <el-col :span="12">{{serviceList.patientIdno}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="申请时间" style="text-align:right;">申请时间</el-col>
          <el-col :span="12">{{serviceList.createdDate}}</el-col>
        </el-row>
        <el-row :gutter="24" class="btns" v-if="serviceList.status == 0">
          <el-col :span="12" style="text-align: center;">
            <el-row style="float:right;text-align: center">
              <el-button type="primary" style="width:120px;" @click="onSubmit(serviceList.id)">完成</el-button>
            </el-row>
            <el-row style="clear:right;text-align: right;">
              <span>点击完成表示已完成此次服务</span>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-button style="width:120px;" @click="onSubmitOff(serviceList.id)">取消</el-button>
            </el-row>
            <el-row>
              <span>点击取消返回服务次数</span>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <!--专家讲座详情-->
    <el-row :gutter="24" :data="serviceList"  v-if="serviceType == 'lecture'">
      <div class="infos">
        <div class="bg"></div>
        <p class="top"><span class="cos"></span>{{details}}</p>
        <el-row :gutter="24">
          <el-col :span="12" label="服务单状态" style="text-align:right;">服务单状态</el-col>
          <el-col :span="12">{{serviceList.statusDesc}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="讲座类型" style="text-align:right;">讲座类型</el-col>
          <el-col :span="12">{{serviceList.category}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="讲座时间" style="text-align:right;">讲座时间</el-col>
          <el-col :span="12">{{serviceList.bookingDate}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="专家级别" style="text-align:right;">专家级别</el-col>
          <el-col :span="12">{{serviceList.expertLevel}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="申请时间" style="text-align:right;">申请时间</el-col>
          <el-col :span="12">{{serviceList.createdDate}}</el-col>
        </el-row>
        <el-row :gutter="24" class="btns" v-if="serviceList.status == 0">
          <el-col :span="12" style="text-align: center;">
            <el-row style="float:right;text-align: center">
              <el-button type="primary" style="width:120px;" @click="onSubmit(serviceList.id)">完成</el-button>
            </el-row>
            <el-row style="clear:right;text-align: right;">
              <span>点击完成表示已完成此次服务</span>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-button style="width:120px;" @click="onSubmitOff(serviceList.id)">取消</el-button>
            </el-row>
            <el-row>
              <span>点击取消返回服务次数</span>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <!--团检专车详情-->
    <el-row :gutter="24" :data="serviceList"  v-if="serviceType == 'bus'">
      <div class="infos">
        <div class="bg"></div>
        <p class="top"><span class="cos"></span>{{details}}</p>
        <el-row :gutter="24">
          <el-col :span="12" label="服务单状态" style="text-align:right;">服务单状态</el-col>
          <el-col :span="12">{{serviceList.statusDesc}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="出发时间" style="text-align:right;">出发时间</el-col>
          <el-col :span="12">{{serviceList.createdDate}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="出发地点" style="text-align:right;">出发地点</el-col>
          <el-col :span="12">{{serviceList.startAddr}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="到达地点" style="text-align:right;">西直门分院</el-col>
          <el-col :span="12">{{serviceList.endAddr}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="申请时间" style="text-align:right;">申请时间</el-col>
          <el-col :span="12">{{serviceList.updatedDate}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="联系人姓名" style="text-align:right;">联系人姓名</el-col>
          <el-col :span="12">{{serviceList.name}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="联系人电话" style="text-align:right;">联系人电话</el-col>
          <el-col :span="12">{{serviceList.telephone}}</el-col>
        </el-row>
        <el-row :gutter="24" class="btns" v-if="serviceList.status == 0">
          <el-col :span="12" style="text-align: center;">
            <el-row style="float:right;text-align: center">
              <el-button type="primary" style="width:120px;" @click="onSubmit(serviceList.id)">完成</el-button>
            </el-row>
            <el-row style="clear:right;text-align: right;">
              <span>点击完成表示已完成此次服务</span>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-button style="width:120px;" @click="onSubmitOff(serviceList.id)">取消</el-button>
            </el-row>
            <el-row>
              <span>点击取消返回服务次数</span>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <!--报告解读详情-->
    <el-row :gutter="24" :data="serviceList"  v-if="serviceType == 'report'">
      <div class="infos">
        <div class="bg"></div>
        <p class="top"><span class="cos"></span>{{details}}</p>
        <el-row :gutter="24">
          <el-col :span="12" label="服务单状态" style="text-align:right;">服务单状态</el-col>
          <el-col :span="12">{{serviceList.statusDesc}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="解读时间" style="text-align:right;">解读时间</el-col>
          <el-col :span="12">{{serviceList.bookingDate}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="解读人电话" style="text-align:right;">解读人电话</el-col>
          <el-col :span="12">{{serviceList.telephone}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="申请时间" style="text-align:right;">申请时间</el-col>
          <el-col :span="12">{{serviceList.createdDate}}</el-col>
        </el-row>
        <el-row :gutter="24" class="btns" v-if="serviceList.status == '0' ">
          <el-col :span="12" style="text-align: center;">
            <el-row style="float:right;text-align: center">
              <el-button type="primary" style="width:120px;" @click="onSubmit(serviceList.id)">完成</el-button>
            </el-row>
            <el-row style="clear:right;text-align: right;">
              <span>点击完成表示已完成此次服务</span>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-button style="width:120px;" @click="onSubmitOff(serviceList.id)">取消</el-button>
            </el-row>
            <el-row>
              <span>点击取消返回服务次数</span>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'NavMenu',
    props: ['serviceType', 'serviceList', 'details'],
    data () {
      return {
      }
    },
    methods: {
//      详情显示的确定服务状态
      onSubmit (id) {
        this.$confirm('确定完成服务订单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        })
        .then(() => {
          this.$emit('finishService', id)
        })
        .catch(() => {
          console.log('error')
        })
      },
//      详情显示的取消服务状态
      onSubmitOff (id) {
        this.$confirm('确定取消服务订单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$emit('calloffService', id)
        })
        .catch(() => {
          console.log('error')
        })
      }
    }
  }
</script>
<style scoped>
  .infos{
    width: 100%;
    min-width: 742px;
    height: 758px;
    background: #fff;
    margin-top:30px;
    margin-left: 10px;
    position: relative;
  }

  .infos .bg{
    width: 100%;
    height: 130px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url(../../assets/images/bgChange.png) no-repeat center;
    background-size:  100%;
  }

  .infos .top{
    padding-top: 30px;
    margin-left: 40px;
    color:#6d6d6d;
    margin-bottom: 20px;
  }

  .top::before{
    content:"";
    width:2px;
    height:20px;
    position:absolute;
    top:30px;
    left:30px;
    background:#4297da;
  }

  .infos .el-row{
    height: 40px;
    line-height: 40px;
  }

  .infos .btns{
    margin-top: 30px;
  }

  .infos .btns span{
    display: inline-block;
    color: #999999;
    font-size:12px;
  }

  .pingtai{
    margin-top: 20px;
  }

  .el-row .el-col:nth-child(1){
    color: #999999;
  }

  .el-row .el-col:nth-child(2){
    color: #666666;
  }
</style>
