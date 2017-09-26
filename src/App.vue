<template>
  <div id="app">
    <headbar v-if="hasSidebar"></headbar>
    <div :class="{'main':hasSidebar}">
      <sidebar @nodeTreeAdmin="nodeTreeAdmin"  v-if="hasSidebar"></sidebar>
      <div :class="{'mainContent':hasSidebar}" >
          <!--<router-view keep-alive v-if="this.nodeTreeShow !== {}" :nodeTreeShow="nodeTreeShow"></router-view>-->
        <router-view v-if="this.nodeTreeShow !== {}" :nodeTreeShow="nodeTreeShow"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import './App.css'
  import headbar from './components/common/headbar.vue'
  import sidebar from './components/common/sidebar.vue'
  export default {
    name: 'app',
    data () {
      return {
        myHead: true,
        mySlider: true,
        nodeTreeShow: {}
      }
    },
    components: {
      headbar, sidebar
    },
    computed: {
      hasSidebar () {
        return ['404', 'login'].indexOf(this.$route.name) < 0
      }
    },
    methods: {
      nodeTreeAdmin (data) {
        console.log(data)
        this.nodeTreeShow = data
      }

    }
  }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #666;
  }

  .main {
    width: 100%;
    min-width: 1000px;
    margin: 0 auto;
    height:100%;
    /*position: relative;*/
  }
  .myLogin{
    position: relative;
  }
  .mainContent {
    position: absolute;
    right: 50px;
    top: 51px;
    bottom: 0;
    left: 260px;
    min-width: 1000px;
  }

</style>
