<template>
  <div>
    <!--表格区域展示列表-->
    <div class="table-cel">
      <el-table :data="dataList.table" border style="width: 100%;text-align: center;font-size:12px;">
        <template v-for="column in Header">
          <el-table-column v-if="column.prop == 'operations'" :prop="column.prop" :label="column.name">
            <template scope="scope">
              <router-link to="/Basics">
                <el-button @click.native.prevent="goDetail(scope.$index, dataList.table)" type="text"
                           size="small">
                  查看
                </el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column v-else :prop="column.prop" :label="column.name"></el-table-column>
        </template>
      </el-table>
      <!--分页器展示区域-->
      <div class="block"  v-if="dataList.count > 0">
        <el-pagination
          class="yy"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[pageSize]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataList.count">
        </el-pagination>
        <!--<div class="reveal">-->
          <!--<p>第1到第{{dataList.count}}条数据丨共{{total}}页，{{dataList.count}}条数据</p>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['Header', 'dataList', 'pageSize', 'showDetail', 'total', 'page'],
    data () {
      return {
        pages: {
          currentPage3: 1,
          pageSize: 17,
          total: 50
        },
        tableData: [{
          id: '2',
          title: '如何添加人员',
          serial: '110010',
          category: '一级菜单',
          uppage: '00',
          state: '启用',
          founderName: 'admin',
          founderDate: '2017-9-26 16:43:32 ',
          name: '张三',
          operation: '查看'
        }]
      }
    },
    mounted () {
    },
    watch: {},
    components: {},
    methods: {
      goDetail (index, rows) {
        this.$emit('showDetail', rows[index].id)
      },
      handleSizeChange (val) {
        console.log(val)
      },
      handleCurrentChange (val) {
        this.$emit('goPage', val)
      }
    }
  }
</script>
<style>
  .table-cel {
    background: #fff;
    margin-top: 15px;
  }

  .cell {
    text-align: center !important;
    font-size: 12px;
  }

  .el-table .cell, .el-table th>div{
    padding: 0;
  }
  .el-table th {
    background-color: #fafafa;
  }

  .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div {
    background-color: #fafafa;
  }

  .el-button--text {
    color: #666666;
  }

  .el-pagination {
    padding-top: 10px;
    width: auto;
  }

  .el-table__row {
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
    border-color: orange;
    background-color: orange;
    color: #fff;
    cursor: default;
  }

  .el-pagination button:hover {
    color: orange;
  }

  .el-pager li:hover {
    color: orange;
  }
</style>
