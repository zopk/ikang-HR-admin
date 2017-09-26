<template>
  <div class="sidebar">
    <el-menu router default-active="1" class="el-menu-vertical-demo">
      <el-submenu index="1" v-if="showSlider.page1">
        <template slot="title">{{showSlider.page1List.name}}</template>
        <el-menu-item-group>
          <el-menu-item index="/AddPersonRecord" v-if="isRightShow.addPerson">
            {{showSlider.page1List.listDetail[0].name}}
          </el-menu-item>
          <el-menu-item index="/Service/doctor" v-if="isRightShow.doctor">
            {{showSlider.page1List.listDetail[1].name}}
          </el-menu-item>
          <el-menu-item index="/Service/lecture" v-if="isRightShow.addPerson">
            {{showSlider.page1List.listDetail[2].name}}
          </el-menu-item>
          <el-menu-item index="/Service/bus" v-if="isRightShow.lecture">
            {{showSlider.page1List.listDetail[3].name}}
          </el-menu-item>
          <el-menu-item index="/Service/report" v-if="isRightShow.report">
            {{showSlider.page1List.listDetail[4].name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2" v-if="showSlider.page2">
        <template slot="title">{{showSlider.page2List.name}}</template>
        <el-menu-item-group>
          <el-menu-item index="/BasicSetting" v-if="isRightShow.info">
            {{showSlider.page2List.listDetail[0].name}}
          </el-menu-item>
          <el-menu-item index="/InstructionSetting" v-if="isRightShow.use">
            {{showSlider.page2List.listDetail[1].name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3" v-if="showSlider.page3">
        <template slot="title">{{showSlider.page3List.name}}</template>
        <el-menu-item-group>
          <el-menu-item v-if="isRightShow.list" index="/PlatformtList" >
            {{showSlider.page3List.listDetail[0].name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4" v-if="showSlider.page4">
        <template slot="title">{{showSlider.page4List.name}}</template>
        <el-menu-item-group>
          <el-menu-item index="/Accountlist" v-if="isRightShow.number">
            {{showSlider.page4List.listDetail[0].name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import globals from './../../config'
  export default {
    data () {
      return {
        nodeTreeAdmin: {},
        isRightShow: {
          addPerson: false,
          doctor: false,
          lecture: false,
          bus: false,
          report: false,
          info: false,
          use: false,
          list: false,
          number: false
        }
      }
    },
    watch: {
      getTree () {
        this.type = JSON.parse(Cookies.get('mainDatabase')).type
        this.showSlider()
      }
    },
    computed: {
      showSlider () {
        let menuList = {}
        for (let i = 0; i < this.nodeTreeAdmin.length; i++) {
          let list = this.nodeTreeAdmin[i]
          if (list.code === '020101') {
            menuList.page1 = true
            menuList.page1List = {
              'name': list.name,
              'url': list.url,
              'listDetail': list.enterpriseResourcemodel
            }
          }
          if (list.code === '020102') {
            menuList.page2 = true
            menuList.page2List = {
              'name': list.name,
              'url': list.url,
              'listDetail': list.enterpriseResourcemodel
            }
          }
          if (list.code === '020103') {
            menuList.page3 = true
            menuList.page3List = {
              'name': list.name,
              'url': list.url,
              'listDetail': list.enterpriseResourcemodel
            }
          }
          if (list.code === '020104') {
            menuList.page4 = true
            menuList.page4List = {
              'name': list.name,
              'url': list.url,
              'listDetail': list.enterpriseResourcemodel
            }
          }
        }
        console.log('page4', menuList.page4)
        return menuList
      }
    },
    mounted () {
      if (Cookies.get('mainDatabase')) {
//        this.type = JSON.parse(Cookies.get('mainDatabase')).type
        this.getTree()
      } else {
        globals.loginCall(this.$route.path)
      }
    },
    components: {},
    methods: {
      getTree () {
        let d = new Date().getTime()
        this.$http.get(globals.host + 'pfmprivilege/nodeTreeAdmin?d=' + d, {}).then((response) => {
          if (typeof (response.data) !== 'undefined' && response.data.code === 1) {
            this.nodeTreeAdmin = response.data.results.table
            this.nodeTreeAdmin.forEach((item) => {
              let isShow = item.enterpriseResourcemodel
              isShow.forEach((item2) => {
                if (item2.code === '020201') {
                  this.isRightShow.addPerson = true
                }
                if (item2.code === '020202') {
                  this.isRightShow.doctor = true
                }
                if (item2.code === '020203') {
                  this.isRightShow.lecture = true
                }
                if (item2.code === '020204') {
                  this.isRightShow.bus = true
                }
                if (item2.code === '020205') {
                  this.isRightShow.report = true
                }
                if (item2.code === '020206') {
                  this.isRightShow.info = true
                }
                if (item2.code === '020207') {
                  this.isRightShow.use = true
                }
                if (item2.code === '020208') {
                  this.isRightShow.list = true
                }
                if (item2.code === '020209') {
                  this.isRightShow.number = true
                }
              })
            })
            this.$emit('nodeTreeAdmin', this.showSlider)
          }
        }, function () {
        })
      }
    }
  }
</script>
<style>
  .sidebar {
    width: 238px;
    position: absolute;
    left: 0;
    top: 51px;
    bottom: 0;
    padding-bottom: 260px;
    height:100%;
    background-color: #fff;
  }

  .sidebar .el-menu, .sidebar .el-menu-item-group__title {
    background-color: #fff!important;
  }

  .sidebar .el-submenu__title, .sidebar .el-submenu.is-active .el-submenu__title {
    border-bottom: 1px solid #f2f2f2!important;
  }

  .sidebar a {
    color: #666;
  }

  .sidebar a.router-link-active {
    color: #4297da;
  }
</style>

