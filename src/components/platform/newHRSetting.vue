<template>
  <div class="newHR">
    <div>
      <h4>功能配置：选择HR端可使用的功能模块</h4>
      <el-table :data="menu" border class="menuSetting">
        <el-table-column
          prop="first.name"
          label="一级目录" width="200">
          <template scope="scope">
            <el-checkbox :label="menu[scope.$index].first.name"  :disabled="menu[scope.$index].first.name === '页面级'"
                         @change.native.prevent="changList(scope.$index)"
                         :checked="menu[scope.$index].first.checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          prop="second"
          label="二级目录">
          <template scope="scope">
            <el-checkbox v-for="(data,index) in menu[scope.$index].second" key="menu[scope.$index].second"
                         :label="data.name"
                         @change.native.prevent="changList(scope.$index, index)"
                         :checked="data.checked"></el-checkbox>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-form>
      <el-form-item label="数据来源">
        <el-select v-model="mySetForm.projectNo" placeholder="请选择" style="width:300px;">
          <el-option :label="resource.projectname" v-for="resource in resourceData" key="resourceData"
                     :value="resource.projectid"></el-option>
        </el-select>
        <span>选择一个项目，HR端展示所选项目的数据</span>
      </el-form-item>
    </el-form>
    <el-form :inline="true">
      <el-form-item label="HR平台登录账号">
        <el-input v-model="mySetForm.platformUser.logonid" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <input type="password" name="txtPassword" style="display:none">
        <el-input  type="password" name="txtPassword" auto-complete="new-password" v-model="mySetForm.platformUser.pwd" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="密码" style="display: none">
        <input type="password" name="txtPassword" style="display:none">
        <el-input  name="txtPassword" auto-complete="new-password" v-model="mySetForm.platformUser.logonid" placeholder=""></el-input>
      </el-form-item>
      <span style="line-height: 30px;display: inline-block">账号1-20位，密码6-20位</span>
    </el-form>
    <el-form :inline="true">
      <el-form-item label="业务服务日期:"></el-form-item>
      <el-form-item label="开始时间" prop="serviceStart">
        <el-date-picker type="date" placeholder="选择日期" v-model="eInfo.serviceStart"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="serviceEnd">
        <el-date-picker type="date" placeholder="选择日期" v-model="eInfo.serviceEnd"></el-date-picker>
      </el-form-item>
    </el-form>
    <div>
      <h4>业务服务团队：</h4>
      <el-table :data="eTeam" border class="menuSetting">
        <el-table-column
          prop="position"
          label="职位">
          <template scope="scope">
            <el-input v-model="eTeam[scope.$index].position" placeholder="" :maxlength="20"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
          <template scope="scope">
            <el-input v-model="eTeam[scope.$index].name" placeholder="" :maxlength="20"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
          <template scope="scope">
            <el-input v-model="eTeam[scope.$index].mobile" placeholder="" :maxlength="20"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
          <template scope="scope">
            <el-input v-model="eTeam[scope.$index].email" placeholder="" :maxlength="40"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="operations" label="操作">
          <template scope="scope">
            <el-button @click.native.prevent="deleteList(scope.$index)" type="text"
                       size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="menuSetting" style="margin-top:0px;">
        <el-button @click.native.prevent="addList()" type="text"
                   size="small">
          <i class="el-icon-plus el-icon--left"></i>添加行
        </el-button>
      </div>
    </div>
    <el-form :inline="true">
      <el-form-item label="绿色就医服务:">
      </el-form-item>
      <el-form-item label="次数">
        <el-input-number v-model="eService[0].amount" :min="0" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="服务通知人员:">
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="eService[0].mobile" placeholder="" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="eService[0].email" placeholder="" :maxlength="40"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true">
      <el-form-item label="专家讲座服务:">
      </el-form-item>
      <el-form-item label="次数">
        <el-input-number v-model="eService[1].amount" :min="0" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="服务通知人员:">
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="eService[1].mobile" placeholder="" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="eService[1].email" placeholder="" :maxlength="40"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true">
      <el-form-item label="团检专车服务:">
      </el-form-item>
      <el-form-item label="次数">
        <el-input-number v-model="eService[2].amount" :min="0" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="服务通知人员:">
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="eService[2].mobile" placeholder="" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="eService[2].email" placeholder="" :maxlength="40"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true">
      <el-form-item label="报告解读服务:">
      </el-form-item>
      <el-form-item label="次数">
        <el-input-number v-model="eService[3].amount" :min="0" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="服务通知人员:">
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="eService[3].mobile" placeholder="" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="eService[3].email" placeholder="" :maxlength="40"></el-input>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="iKangCare+图标">
        <el-select v-model="eInfo.isDisplayIkang" placeholder="请选择" style="width:300px;">
          <el-option label="不显示" value="0"></el-option>
          <el-option label="显示" value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: ['newCompanyData', 'mySetForm', 'menu', 'resourceData', 'eTeam', 'eService', 'eInfo', 'resourceList', 'isDisabled'],
    data () {
      return {
        test: '',
        active: 0
      }
    },
    methods: {
      changeDate () {
        this.eInfo.serviceStart = this.date1
        this.eInfo.serviceEnd = this.date2
      },
      changList (index, index2 = null) {
        if (index2 !== null) {
          if (this.menu[index].second[index2].checked === undefined || this.menu[index].second[index2].checked === false) {
            this.menu[index].second[index2].checked = true
          } else {
            this.menu[index].second[index2].checked = false
          }
        } else {
          if (this.menu[index].first.checked === undefined || this.menu[index].first.checked === false) {
            this.menu[index].first.checked = true
          } else {
            this.menu[index].first.checked = false
          }
        }
      },
      deleteList (index) {
        this.eTeam.splice(index, 1)
      },
      addList () {
        if (this.eTeam.length > 4) {
          return false
        } else {
          this.eTeam.push({
            name: '',
            mobile: '',
            email: '',
            position: ''
          })
        }
      }
    }
  }
</script>
<style>
  .newHR {
    margin-left: 20px;
    margin-top: 30px;
    padding-bottom: 100px;
  }

  .menuSetting {
    width: 84%;
    margin: 20px auto;
    text-align: center;
    font-size: 12px;
  }

  .cell {
    text-align: center !important;
    font-size: 12px;
  }

  .el-table .cell, .el-table th > div {
    padding: 0;
  }

  .el-table th {
    background-color: #fafafa;
  }

  .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div {
    background-color: #fafafa;
  }

  .el-table__body-wrapper {
    overflow: hidden;
  }
</style>
