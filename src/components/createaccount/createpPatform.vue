<template>
  <div class="guan">
    <p class="detail">平台管理</p>
    <div class="bg">
      <div class="bb"></div>
    </div>
    <div class="list">
      <div class="bg"></div>
      <div class="search">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-input placeholder="平台名称" v-model="searchCompany" style="width: 200px;"></el-input>
          </el-col>
          <el-col :span="6" float="right">
            <el-button type="primary" style="width:104px;float:right;" @click="searchList()">搜索</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" style="width:104px;float:right;" @click="clearAll()">清空</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="ck">
        <el-row :gutter="24">
          <el-transfer
            v-model="userParam.infoIds"
            :titles="['全部平台','已选平台']"
            :props="{
                label: 'values',
                key: 'ind'
            }"
            @change="handleChange"
            :data="data">
          </el-transfer>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['userParam', 'data', 'values', 'ind'],
    data () {
      return {
        searchCompany: '',
        infoIds: [],
        sparam: {
          cParam: {
            'page': 1,
            'pageSize': 100
          },
          'companyName': '',
          'createdBy': '',
          'createdDate': '',
          'platformName': '',
          'status': 100
        },
        cParam: {}
      }
    },
    mounted () {
    },
    methods: {
      handleChange (value, direction, movedKeys) {
        console.log(direction)
        if (direction === 'right') {
          movedKeys.forEach((item, index) => {
            this.infoIds.push(item)
          })
          let cons = Array.from(new Set(this.infoIds))
          this.$emit('infosIds', cons)
        } else {
          console.log(this.infoIds)
          value.forEach((item) => {
            this.infoIds.pop(item)
          })
          console.log(this.infoIds)
          let cons = Array.from(new Set(this.infoIds))
          this.$emit('infosIds', cons)
        }
      },
      searchList () {
        this.$emit('searchList', this.searchCompany)
      },
      clearAll () {
        this.$emit('clearCompany')
        this.searchCompany = ''
      }
    }
  }
</script>
<style scoped>
  .guan {
    position: relative;
  }

  .bg{
    position: absolute;
    bottom: -100px;
    left: 0;
    height: 100px;
    width: 100%;
  }

   .bb{
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url(../../assets/images/bgChange.png) no-repeat center;
    background-size:  100%;
  }

  .detail {
    position: absolute;
    top: -40px;
    left: 30px;
    border-left: 3px solid #4297da;
    padding-left: 15px;
  }

  .list {
    margin-left: 20%;
    margin-right: 35%;
    padding-top: 30px;
    margin-top: 50px;
    width: 540px;
    min-width: 540px;
    height: 420px;
    background: #f9f9f9;
    border: 1px solid #ebebeb;
  }

  .list .search {
    margin-left: 40px;
  }

  .list .ck {
    margin-left: 10%;
  }

  .el-col-10 {
    margin-left: -12px !important;
  }

  .el-row {
    display: inline-block;
    margin-bottom: 15px;
  }

  .el-transfer-panel__item{
    padding-left: 0!important;
    border-bottom: 1px solid #ccc;
  }
</style>
