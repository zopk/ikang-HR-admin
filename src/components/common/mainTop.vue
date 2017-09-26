<template>
  <div class="mainTop">
    <el-row :gutter="0">
      <el-col :span="4" style="width:150px;">
        <span class="title f14"  v-if="tittle" >{{tittle}}</span>
        <div class="back" v-if="pageBack" @click="goback()"><i class="el-icon-arrow-left"></i>&nbsp;返回上一页</div>
      </el-col>
      <el-col :span="16" >
        <span class="title2 f14"v-if="pageBack" >{{title}}</span>
      </el-col>
      <el-col :span="4" v-if="newInfo" style="text-align: right;float:right">
        <el-button style="width:104px;" @click="Newinfo">新建配置</el-button>
      </el-col>
      <el-col :span="4" v-if="saves" style="text-align: right;float:right">
        <el-button type="primary" style="width:104px;" @click="save()">保存</el-button>
      </el-col>
      <el-col :span="4" v-if="project" style="text-align: right;float:right">
        <el-button style="width:104px;" @click="platform">新建平台</el-button>
      </el-col>
      <el-col :span="4" v-if="next" style="text-align: right;float:right">
        <el-button style="width:104px;" type="primary" @click="nextStep">{{nextStepName}}</el-button>
      </el-col>
      <el-col :span="4" v-if="account" style="text-align: right;float:right">
        <el-button style="width:104px;" @click="acceleration">新建账号</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'NavMenu',
    props: ['tittle', 'title', 'newInfo', 'saves', 'project', 'account', 'next', 'pageBack', 'nextStepName'],
    data () {
      return {
        input3: '',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        formLabelAlign1: {
          name: '',
          region: '',
          type: ''
        }
      }
    },
    mouted () {
    },
    methods: {
      Newinfo () {
        this.$emit('NewSetting')
      },
      save () {
        this.$emit('saveForm')
      },
      platform () {
        this.$router.push({path: '/NewPlatforms'})
      },
      acceleration () {
        this.$router.push({path: '/CreateAccount'})
      },
      nextStep () {
        this.$emit('nextStep')
      },
      goback () {
        this.$router.back(-1)
      }
    }
  }
</script>
<style scoped>
  .mainTop {
    height: 47px;
    width: 100%;
    line-height:47px;
    border-bottom: 1px solid #c3c3c3;
  }

  .mainTop .title {
    display: inline-block;
    text-align: left;
    font-size: 14px;
  }

  .mainTop .title2{
    display: inline-block;
    height: 46px;
    /*margin-left: 42px;*/
    color: #4297da;
    font-size: 14px;
    border-bottom: 2px solid #4297da;
  }

  .back{
    cursor: pointer;
    text-align: left;
    line-height: 47px;
    font-size: 14px;
  }

  .back i{
    color: #595959;
    font-size: 16px;
    margin-left: 6px;
  }
</style>
