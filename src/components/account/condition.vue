<template>
    <div>
      <el-form class="submits" :gutter="20" :model="accountList" ref="myForm">
        <el-form-item :span="4" style="width: 18%;margin-right: 20px;float: left;" prop="logonid">
          <el-input placeholder="账号" type="text" v-model="accountList.logonid"></el-input>
        </el-form-item>
        <el-form-item :span="4" style="width: 18%;max-width:100%;margin-right: 20px;float: left;" prop="status">
          <el-select placeholder="状态" v-model="accountList.status" style="width: 100%;">
            <el-option label="全部" value=""></el-option>
            <el-option label="启用" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
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
    props: ['accountList'],
    data () {
      return {
        account: '',
        status: ''
      }
    },
    mounted () {
    },
    components: {},
    methods: {
      onSubmit () {
        console.log(this.accountList)
        this.$emit('accountSearch', this.$refs.myForm)
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
