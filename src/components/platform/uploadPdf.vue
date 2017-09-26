<template>
  <div class="upload">
    <div class="reportUpload">
      <el-form class="formUpload" :inline="true">
        <el-form-item>
          <h3> 报告上传:</h3>
        </el-form-item>
        <el-form-item label="标题：">
          <el-input v-model="uploadParams.reportName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="报告：">
          <el-upload
            class="upload-demo"
            :action="action"
            :data="uploadParams"
            :show-file-list="false"
            accept=".pdf"
            :auto-upload="true"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :before-upload="uploadBefore"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="uploadList">
      <h3> 报告列表:</h3>
      <ul>
        <li v-for="(data,index) in uploadList">
          <div class="left">
            <span>报告{{index + 1}}：</span>
            <span>{{data.reportName}}</span>
          </div>
          <el-button class="right" type="text" @click="delReport(data.id, data.reportName)" >删除</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['form', 'action', 'uploadParams', 'uploadList'],
    data () {
      return {
        fileList: []
      }
    },
    mounted () {
    },
    components: {},
    methods: {
      uploadError (err, file, fileList) {
        console.log(err)
      },
      uploadSuccess (response, file, fileList) {
        if (typeof (response) !== 'undefined' && response.code === 1) {
          this.$alert(file.name + '   上传成功！', '提示')
          this.$emit('getUploadList')
        } else {
          if (response.message && response.message.length > 0) {
            this.$alert(response.message, '提示')
          }
        }
      },
      uploadBefore (file) {
        if (this.uploadParams.reportName.trim() === '') {
          this.$alert('请输入上传报告标题', '提示')
          return false
        } else {
          return true
        }
      },
      delReport (id, name) {
        this.$confirm('确定删除报告' + name + '?', '提示', {}).then(() => {
          this.$emit('delReport', id)
        }).catch(() => {
          console.log('取消')
        })
      }
    }
  }
</script>
<style scoped>
  .upload {
    margin-top: 50px;
  }

  .upload .reportUpload,.upload .uploadList {
    width: 90%;
    margin: 0 auto;
  }

  .upload .reportUpload h4, .upload .reportUpload .formUpload {
    display: inline-block;
  }

  .upload .uploadList ul{
    margin-top:30px;
  }
  .upload .uploadList ul li{
    width: 70%;
    overflow: hidden;
  }
  .upload .uploadList ul li .left{
    width:70%;
    float: left;
  }
  .upload .uploadList ul li .right{
    width:10%;
    float: right;
    text-align: right;
  }
</style>
