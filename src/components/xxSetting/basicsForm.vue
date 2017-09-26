<template>
  <div class="form">
    <div class="formName">{{formName}}</div>
    <div class="bg"></div>
    <div class="formList">
      <el-form :model="ruleForm" :rules="rules2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input  v-model="ruleForm.name" :disabled="isDisabled" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="code" prop="code">
          <el-input  v-model="ruleForm.code" :disabled="isDisabled" :maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="type" >
          <el-select v-model="ruleForm.type" placeholder="请选择" :disabled="isDisabled">
            <el-option label="一级菜单" value="1"></el-option>
            <el-option label="二级菜单" value="2"></el-option>
            <el-option label="页面级" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级页面" prop="pid" v-show="ruleForm.type == 2" required>
          <el-select v-model="ruleForm.pid" placeholder="请选择"  :disabled="isDisabled">
            <el-option v-for="data in getFirstList" key="getFirstList" :label="data.name" :value="data.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" >
          <el-select v-model="ruleForm.status" placeholder="请选择" >
            <el-option label="启用" value="0" ></el-option>
            <el-option label="停用" value="1" ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import globals from '../../config'
  export default {
    props: ['isDisabled', 'ruleForm', 'getFirstList', 'formName'],
    data () {
      let filterCode = (rule, value, callback) => {
        console.log(value)
        if (!globals.Reg.verifyNumber.test(value.trim())) {
          callback(new Error('code只能为数字'))
        } else {
          callback()
        }
      }
      return {
        rules2: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 20, message: '标题最多输入20位', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入code', trigger: 'blur' },
            { min: 6, max: 6, message: 'code只能为6位', trigger: 'blur' },
            { validator: filterCode, message: 'code只能为数字', trigger: 'blur' }
          ],
          type: [
            { required: true, trigger: 'change', message: '请选择类别' }
          ]
        }
      }
    },
    mounted () {
    },
    components: {
    },
    methods: {
    }
  }
</script>
<style>
  .form{
    background-color: #fff;
    padding-top: 30px;
    margin-top: 20px;
    min-height: 623px;
    position: relative;
  }
  .form .bg{
    width: 100%;
    height: 130px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url(../../assets/images/bgChange.png) no-repeat center;
    background-size:  100%;
  }
  .form .formName{
    margin: 0px 30px;
    border-left: 3px solid skyblue;
    padding-left: 10px;
  }
  .form .formList{
    width:400px;
    margin: 50px auto;
  }
</style>
