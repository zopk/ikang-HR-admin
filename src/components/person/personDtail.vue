<template>
  <div>
    <!--人员记录详情-->
    <el-row :gutter="24">
      <div class="infos">
        <div class="bg"></div>
        <p class="top"><span class="cos"></span>{{details}}</p>
        <el-row :gutter="24">
          <el-col :span="12" label="姓名" style="text-align:right;">姓名</el-col>
          <el-col :span="12">{{personDetailList.name}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="性别" style="text-align:right;">性别</el-col>
          <el-col :span="12">{{personDetailList.gender}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="出生日期" style="text-align:right;">出生日期</el-col>
          <el-col :span="12">{{personDetailList.birthDate}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="证件类型" style="text-align:right;">证件类型</el-col>
          <el-col :span="12">{{personDetailList.idcardType}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="证件号码" style="text-align:right;">证件号码</el-col>
          <el-col :span="12">{{personDetailList.idcard}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="手机号码" style="text-align:right;">手机号码</el-col>
          <el-col :span="12">{{personDetailList.mobile}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="部门" style="text-align:right;">部门</el-col>
          <el-col :span="12">{{personDetailList.department}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="人员登录卡号" style="text-align:right;">人员登录卡</el-col>
          <el-col :span="12">{{personDetailList.cardNo}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="所属人群" style="text-align:right;">所属人群</el-col>
          <el-col :span="12">{{personDetailList.crowd}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="爱康卡号" style="text-align:right;">爱康卡号</el-col>
          <el-col :span="12">{{personDetailList.ikangCard}}</el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12" label="添加时间" style="text-align:right;">添加时间</el-col>
          <el-col :span="12">{{personDetailList.createTime}}</el-col>
        </el-row>
        <el-row :gutter="24" class="btns" v-if="personDetailList.status === '0'">
          <el-col :span="12" style="text-align: center;">
            <el-row style="float:right;text-align: center">
              <el-button type="primary" style="width:120px;" @click="onSubmit()">完成</el-button>
            </el-row>
            <el-row style="clear:right;text-align: right;">
              <span>点击完成表示已完成此次服务</span>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-button style="width:120px;" @click="onSubmitOff()">取消</el-button>
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
    props: ['details', 'personDetailList'],
    data () {
      return {
      }
    }
  }
</script>
<style scoped>
  .infos{
    min-width: 1000px;
    height: 758px;
    background: #fff;
    margin-top:30px;
    margin-left: 10px;
    position: relative;
  }

  .infos .bg{
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url(../../assets/images/bgChange.png) no-repeat center;
    background-size:  100%;
  }

  .infos .top{
    padding-top: 18px;
    margin-left: 40px;
    font-size: 14px;
    color:#6d6d6d;
  }

  .top::before{
    content:"";
    width:2px;
    height:20px;
    position:absolute;
    top:18px;
    left:30px;
    background:#4297da;
  }

  .infos .el-col-12 {
    font-size: 12px;
  }

  .infos .el-row{
    height: 35px;
    line-height: 35px;
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
