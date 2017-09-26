<template>
  <div>
    <!--表格区域展示列表-->
    <div class="table-cel">
      <el-table :data="addPersonlist" border style="width: 100%;text-align: center;font-size:12px;" v-if="this.$route.path ==='/AddPersonRecord'">
        <el-table-column prop="sequence" label="序号" align="center"></el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称" align="center" ></el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
        <el-table-column prop="name" label="人员姓名" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, addPersonlist)" type="text" size="small"> 查看 </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="servicList" border style="width: 100%;text-align: center;font-size:12px;" v-if="this.$route.path !=='/AddPersonRecord'">
        <el-table-column prop="sequence" label="序号" align="center"></el-table-column>
        <el-table-column prop="companyName" label="企业名称" align="center" ></el-table-column>
        <el-table-column prop="createdDate" label="申请时间" align="center" ></el-table-column>
        <el-table-column prop="patientName" label="就诊人姓名" align="center" v-if="serviceType == 'doctor'"></el-table-column>
        <el-table-column prop="statusDesc" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button @click.native.prevent="showServicDetail(scope.$index, serviceType, servicList)" type="text" size="small"> 查看 </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器展示区域-->
      <div class="block" v-if="count > 0">
        <el-pagination
          class="yy"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[pageSize]"
          :page-count="count"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count">
        </el-pagination>
        <!--<div class="reveal">-->
          <!--<p>第1到第{{count}}条数据丨共{{total}}页，{{count}}条数据</p>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  export default {
    props: ['addPersonlist', 'serviceType', 'servicList', 'pageSize', 'count', 'page', 'total'],
    data () {
      return {
        ikangId: {
          name: '',
          gender: '',
          birthDate: '',
          idcard: '',
          mobile: '',
          ikangCard: '',
          crowd: '',
          idcardType: '',
          createTime: '',
          enterpriseName: '',
          department: ''
        }
      }
    },
    methods: {
      deleteRow (index, rows) {
        let list = rows[index]
        this.ikangId = {
          'name': list.name,
          'gender': list.gender,
          'birthDate': list.birthDate,
          'idcard': list.idcard,
          'mobile': list.mobile,
          'ikangCard': list.ikangCard,
          'createTime': list.createTime,
          'enterpriseName': list.enterpriseName,
          'department': list.department,
          'cardNo': list.cardNo,
          'idcardType': list.idcardType,
          'crowd': list.crowd
        }
        console.log(this.ikangId)
        Cookies.set('personDetail', JSON.stringify(this.ikangId))
        this.$router.push({path: '/Person'})
      },
      showServicDetail (index, serviceType, rows) {
        const ind = index++
        console.log(rows[ind].enterpriseId)
        this.$router.push({path: '/ServiceDetail/' + serviceType + '/' + rows[ind].id + '/' + rows[ind].enterpriseId})
      },
      handleSizeChange (val) {

      },
      handleCurrentChange (val) {
        console.log(val)
        this.$emit('PageIndex', val)
      }
    }
  }
</script>
<style scope>
  .table-cel{
    background: #fff;
  }
  .cell{
    text-align: center !important;
  }
  .el-button--text{
    color: #666666;
  }
  .el-pagination{
    padding-top: 10px;
    width: auto;
  }
  .el-table__row{
    height: 20px;
    line-height:20px;
  }
  .block{
    height: 50px;
    line-height:50px;
    position: relative;
  }
  .yy{
    position: absolute;
    right: 20px;
    top: 10px;
  }
  .reveal{
    position: absolute;
    right: 50px;
    top: 0;
    color: #000;
  }
  .el-pager li.active {
    border-color: orange!important;
    background-color: orange!important;
    color: #fff!important;
    cursor: default!important;
  }
  .el-pagination button:hover{
    color: orange!important;
  }
  .el-pager li:hover{
    color: orange!important;
  }
</style>
