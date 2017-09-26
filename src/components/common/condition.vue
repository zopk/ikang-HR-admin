<template>
  <div class="condition">
    <!--人员表单区域搜索查询-->
    <el-form :model="listData" class="submits" :gutter="20" v-if="this.$route.path === '/AddPersonRecord'" ref="myForm1">
      <el-form-item :span="4" style="width: 18%;float:left;margin-right: 20px;" prop="enterpriseName">
        <el-input placeholder="企业名称" type="text" v-model="listData.enterpriseName"></el-input>
      </el-form-item>
      <el-form-item :span="4" style="width: 18%;float:left;margin-right: 20px;" prop="createTime">
        <el-date-picker type="daterange" placeholder="添加时间" v-model="listData.createTime" @change="dateChange(listData.createTime)" style="width:100%;"></el-date-picker>
      </el-form-item>
      <el-form-item :span="4" style="width: 18%;float:left;margin-right: 20px;" prop="name">
        <el-input placeholder="人员姓名" type="text" v-model="listData.userName"></el-input>
      </el-form-item>
      <el-form-item :span="4" style="float:right;">
        <el-button type="primary" @click="onSubmit()" style="width:105px;">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--服务表单区域搜索查询-->
    <el-form  :model="listData"  class="submits" :gutter="20" v-if="this.$route.path !== '/AddPersonRecord'" ref="forms">
       <el-form-item :span="4" style="width: 18%;float:left;margin-right: 20px;" prop="companyName">
         <el-input placeholder="企业名称" type="text" v-model="listData.companyName"></el-input>
       </el-form-item>
       <el-form-item :span="4" style="width: 18%;float:left;margin-right: 20px;" prop="createdDate">
         <el-date-picker type="daterange"  placeholder="申请时间" @change="dateChange" v-model="listData.createdDate" style="width:100%;"></el-date-picker>
       </el-form-item>
      <el-form-item :span="4"  v-if="this.serviceType == 'doctor'" style="width: 18%;float:left;margin-right: 30px;" prop="patientName">
        <el-input v-model="listData.patientName" placeholder="就诊人姓名"></el-input>
      </el-form-item>
      <el-form-item :span="4"  style="width: 18%;max-width:40%;float:left;margin-right: 20px;" prop="status">
        <el-select placeholder="状态" selected v-model="listData.status" style="width: 100%;">
          <el-option label="全部" value=""></el-option>
          <el-option label="待处理" value="0"></el-option>
          <el-option label="已完成" value="1"></el-option>
          <el-option label="HR取消" value="2"></el-option>
          <el-option label="后台取消" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :span="4" style="float:right;">
        <el-button type="primary" @click="onSubmit()" style="width:105px;float:right;">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: ['listData', 'serviceType', 'pageSize', 'count', 'page'],
    data () {
      return {
      }
    },
    mounted () {
    },
    components: {
    },
    methods: {
      onSubmit () {
        console.log(this.listData)
        this.$emit('searchService')
      },
      dateChange () {
        this.$emit('dateChange')
      }
    }
  }
</script>
<style scoped>
  .submits{
    width: 100%;
    min-width: 85%;
    margin-top: 14px;
    margin-bottom: 4px;
    height: 40px;
    box-sizing: border-box;
  }

  .el-form-item{
    margin-bottom: 0;
  }
</style>
