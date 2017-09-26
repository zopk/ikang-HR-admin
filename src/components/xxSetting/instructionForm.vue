<template>
  <div class="form">
    <div class="formName">{{formName}}</div>
    <div class="bg"></div>
    <div class="formList">
      <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name">
          <el-input  v-model="ruleForm.name" :disabled="isDisabled" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="url">
          <el-input  v-model="ruleForm.url" :disabled="isDisabled" :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
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
  export default {
    props: ['isDisabled', 'ruleForm', 'formName'],
    data () {
      let filterNmae = (rule, value, callback) => {
        console.log(value)
        if (value.trim() === '') {
          callback(new Error('请输入标题'))
        } else {
          callback()
        }
      }
      let filterUrl = (rule, value, callback) => {
        console.log(value)
        if (value.trim() === '') {
          callback(new Error('请输入地址'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          name: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 1, max: 20, message: '标题最多输入20位', trigger: 'blur' },
            { validator: filterNmae, message: '请输入标题', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入地址', trigger: 'blur' },
            { min: 1, max: 200, message: '地址最多输入200位', trigger: 'blur' },
            { validator: filterUrl, message: '请输入地址', trigger: 'blur' }
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
