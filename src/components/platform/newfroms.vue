<template>
    <el-form  :model="form" label-width="300px">
      <el-form-item label="账号" >
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.passwd"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="form.position"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.emails"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.region" placeholder="请选择角色" style="width:200px;">
          <el-option label="项执人员" value="shanghai"></el-option>
          <el-option label="管理员" value="beijing"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.region" placeholder="请选择状态" style="width:200px;">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="停用" value="beijing"></el-option>
          </el-select>
      </el-form-item>
    </el-form>
</template>
<script>
  export default {
    data () {
      return {
        form: {
          account: '',
          name: '',
          passwd: '',
          position: '',
          emails: '',
          tel: ''
        },
        dese: [
          {
            id: '0',
            tit: '启用'
          },
          {
            id: '1',
            tit: '停用'
          }
        ],
        juese: [
          {
            id: '0',
            tit: '项执人员'
          },
          {
            id: '1',
            tit: '管理员'
          }
        ]
      }
    },
    methods: {
    }
  }
</script>
<style scoped>
  .el-form{
    margin-bottom: 10px;
  }
  .el-input {
    width: 200px;
  }
  .el-form-item{
    margin-top:10px;
    margin-bottom: 0;
  }
</style>
