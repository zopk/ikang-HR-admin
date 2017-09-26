<template>
  <div class="table-cel">
    <el-table :data="listAcount" border style="width: 100%;text-align: center;font-size:12px;">
      <el-table-column prop="sequence" label="序号" align="center"></el-table-column>
      <el-table-column prop="logonid" label="账号" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center"></el-table-column>
      <el-table-column prop="creatName" label="创建人" align="center"></el-table-column>
      <el-table-column prop="createdDate" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button @click.native.prevent="showServicDetail(scope.$index, listAcount)" type="text" size="small"> 查看
          </el-button>
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
</template>
<script>
  export default {
    props: ['listAcount', 'pageSize', 'page', 'count', 'total'],
    data () {
      return {}
    },
    mounted () {

    },
    components: {},
    methods: {
      showServicDetail (index, rows) {
        console.log(rows[index].id)
        this.$router.push({path: '/AccountDetail/' + rows[index].id})
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
<style>
  .table-cel {
    background: #fff;
  }

  .cell {
    text-align: center !important;
  }

  .el-button--text {
    color: #666666;
  }

  .el-pagination {
    padding-top: 10px;
    width: auto;
  }

  .el-table__row {
    height: 20px;
    line-height: 20px;
  }

  .block {
    height: 50px;
    line-height: 50px;
    position: relative;
  }

  .yy {
    position: absolute;
    right: 20px;
    top: 10px;
  }

  .reveal {
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
