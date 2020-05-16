<template>
  <div id="app">
    <router-view v-if="IsRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      IsRouterAlive: true
    };
  },
  methods:{
    //刷新当前页面
    reload(){
      this.IsRouterAlive=false;
      this.$nextTick(function(){
        this.IsRouterAlive=true
      })
    }
  }
};
</script>
<style scoped >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.el-table th{
  padding:0px !important;
  
}
.el-table td{
   padding: 3px 0px !important;
}
.el-message-box{
  width: 90%;
  max-width: 360px;
}
.deliver-laundry .el-tabs__content{
  padding: 0px;
}
.box-card .el-card__body{
  padding: 0px !important;
}
</style>
