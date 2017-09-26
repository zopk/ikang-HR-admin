<template>
  <el-row class="submits" :gutter="20">
    <el-col :span="4">
      <el-input placeholder="平台名称" type="text" v-model="form.platformName"></el-input>
    </el-col>
    <el-col :span="4">
      <el-input placeholder="企业名称" type="text" v-model="form.companyName"></el-input>
    </el-col>
    <el-col :span="4">
      <el-select placeholder="状态" v-model="form.status">
        <el-option label="全部" value=""></el-option>
        <el-option label="启用" value="0"></el-option>
        <el-option label="停用" value="1"></el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-input placeholder="创建人" type="text" v-model="form.createdBy"></el-input>
    </el-col>
    <el-col :span="4">
      <el-date-picker type="date" placeholder="创建时间" v-model="form.createdDate" style="width:100%;"></el-date-picker>
    </el-col>
    <el-col :span="4" style="float:right;text-align: right">
      <el-button type="primary" @click="onSearch()"
                 style="width:105px;">搜索
      </el-button>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    props: ['form'],
    data () {
      return {
      }
    },
    mounted () {
    },
    components: {
    },
    methods: {
      onSearch () {
        console.log(123)
        this.$emit('searchPlatfromList')
      }
    }
  }
</script>
<style>
  .submits{
    margin-top: 14px;
    margin-bottom: 4px;
    height: 40px;
    box-sizing: border-box;
  }
</style>
