<template>
  <el-form :rules="rules2" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="平台名称" prop="platformName">
      <el-input v-model="ruleForm.platformName" :maxlength="20"></el-input>
    </el-form-item>
    <el-form-item label="所属企业" prop="companyName">
      <el-input v-model="ruleForm.companyName" @blur="getCompanyList" :disabled="isDisabled"></el-input>
      <!--<el-input v-model="ruleForm.companyName" ></el-input>-->
    </el-form-item>
    <el-form-item label="" prop="code" v-if="companyList.length > 0">
      <el-radio-group v-model="ruleForm.companyName" v-for="(data,index) in companyList" key="companyList" @change.native.prevent="getPID(data)">
        <el-radio :label="data.organName" >{{data.organName}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="平台状态">
      <el-select v-model="ruleForm.status" placeholder="请选择">
        <el-option label="启用" value="0"></el-option>
        <el-option label="停用" value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    props: ['ruleForm', 'companyList', 'isDisabled'],
    data () {
      return {
        active: 0,
        rules2: {
          platformName: [
            { required: true, message: '请输入平台名称', trigger: 'blur' },
            { min: 1, max: 20, message: '字数限制1-20位', trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: '请选择所属企业', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getCompanyList () {
        if (this.ruleForm.companyName !== '') {
          this.$emit('getCompanyList')
        }
      },
      getPID (data) {
        console.log(data)
        this.ruleForm.pid = data.organId
      }
    }
  }
</script>
<style>
  .demo-ruleForm {
    width: 400px;
    margin: 50px auto;

  }
</style>
