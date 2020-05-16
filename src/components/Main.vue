<template>
  <div id="main">
    <el-container>
      <div id="menu" v-show="menu" style="width: 100%; height: 100vh;">
        <el-row class="tac" style="height: 100%;">
          <el-col :span="24" style="height: 100%;">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              unique-opened
              background-color="#393D49"
              text-color="#fff"
              active-text-color="#ffd04b"
              style="height: 100%;"
            >
              <el-menu-item index="11" @click="go('/admin/OpenStatistics')">
                <i class="el-icon-goods"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <!-- 数据统计 -->
              <el-submenu index="6" style="width: 100%;">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    index="6-1"
                    style="width: 100%;"
                    @click="go('/admin/laundrystatistics')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>洗衣单统计</span>
                  </el-menu-item>
                  <el-menu-item index="6-1" style="width: 100%;" @click="go('/admin/msgget')">
                    <i class="el-icon-tickets"></i>
                    <span>收衣点数据采集</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-1"
                    style="width: 100%;"
                    @click="go('/admin/getclothesmsg')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>收衣点统计</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-1"
                    style="width: 100%;"
                    @click="go('/admin/getclothefeedingsmsg')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>收衣点员工收送统计</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-7"
                    style="width: 100%;"
                    @click="go('/admin/deliverlaundrystatistics')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>送洗衣物统计</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-2"
                    style="width: 100%;"
                    @click="go('/admin/rechargestatistics')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>充值统计</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-3"
                    style="width: 100%;"
                    @click="go('/admin/cardgetstatistics')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>发卡统计</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-4"
                    style="width: 100%;"
                    @click="go('/admin/cardpoststatistics')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>退卡统计</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-5"
                    style="width: 100%;"
                    @click="go('/admin/paystatistics')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>扣款统计</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-6"
                    style="width: 100%;"
                    @click="go('/admin/nonpaymentstatistics')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>未付款洗衣单统计</span>
                  </el-menu-item>
                  <!-- <el-menu-item index="6-7" style="width: 100%;" @click="go('/admin/receivestatistics')">
                    <i class="el-icon-tickets"></i>
                    <span>洗衣单取件付款统计</span>
                  </el-menu-item>-->
                  <el-menu-item
                    index="6-8"
                    style="width: 100%;"
                    @click="go('/admin/integralstatistics')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>积分赠送统计</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-9"
                    style="width: 100%;"
                    @click="go('/admin/couponsalesrecord')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>券销售记录</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-10"
                    style="width: 100%;"
                    @click="go('/admin/cardtypestatistics')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>卡类型统计</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-11"
                    style="width: 100%;"
                    @click="go('/admin/delstatistics')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>删除记录</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="1" style="width: 100%;">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>公众号管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-0" style="width: 100%;" @click="go('/admin/img')">
                    <i class="el-icon-tickets"></i>
                    <span>轮播图</span>
                  </el-menu-item>
                  <!-- <el-menu-item index="1-0" style="width: 100%;" @click="go('/admin/preferential')">
                    <i class="el-icon-tickets"></i>
                    <span>首页优惠图片设置</span>
                  </el-menu-item>-->
                  <el-menu-item index="8-0" style="width: 100%" @click="go('/admin/notice')">
                    <i class="el-icon-tickets"></i>
                    <span>预约通知</span>
                  </el-menu-item>
                  <el-menu-item
                    index="7-1"
                    style="width: 100%"
                    @click="go('/admin/reservationset')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>预约设置</span>
                  </el-menu-item>
                  <el-menu-item index="8-2" style="width: 100%" @click="go('/admin/management')">
                    <i class="el-icon-tickets"></i>
                    <span>店铺管理</span>
                  </el-menu-item>
                  <el-menu-item index="8-4" style="width: 100%" @click="go('/admin/Setting')">
                    <i class="el-icon-tickets"></i>
                    <span>参数设置</span>
                  </el-menu-item>
                  <el-menu-item
                    index="8-5"
                    style="width: 100%"
                    @click="go('/admin/parameterSetting')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>新参数设置</span>
                  </el-menu-item>
                  <!-- <el-menu-item index="1-1" style="width: 100%;" @click="go('/admin/shop')">
                    <i class="el-icon-tickets"></i>
                    <span>精品购物</span>
                  </el-menu-item>-->
                </el-menu-item-group>
              </el-submenu>
              <!-- 物品管理 -->
              <el-submenu index="2" style="width: 100%;">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>资料设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-0" style="width: 100%;" @click="go('/admin/boxset')">
                    <i class="el-icon-tickets"></i>
                    <span>洗衣柜设置</span>
                  </el-menu-item>
                  <!-- <el-menu-item index="2-0" style="width: 100%;" @click="go('/admin/shoplist')">
                    <i class="el-icon-tickets"></i>
                    <span>商品分类</span>
                  </el-menu-item>
                  <el-menu-item index="2-1" style="width: 100%;" @click="go('/admin/shopmanage')">
                    <i class="el-icon-tickets"></i>
                    <span>商品管理</span>
                  </el-menu-item>-->
                  <el-menu-item index="2-1" style="width: 100%;" @click="go('/admin/cashTicket')">
                    <i class="el-icon-tickets"></i>
                    <span>优惠券设置</span>
                  </el-menu-item>
                  <el-menu-item
                    index="2-2"
                    style="width: 100%;"
                    @click="go('/admin/launderTicket')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>洗衣券设置</span>
                  </el-menu-item>
                  <el-menu-item index="2-3" style="width: 100%;" @click="go('/admin/laundrylist')">
                    <i class="el-icon-tickets"></i>
                    <span>洗衣分类</span>
                  </el-menu-item>
                  <el-menu-item
                    index="2-4"
                    style="width: 100%;"
                    @click="go('/admin/laundrymanage')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>洗衣管理</span>
                  </el-menu-item>
                  <el-menu-item
                    index="2-5"
                    style="width: 100%;"
                    @click="go('/admin/virtualcabinet')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>收衣点</span>
                  </el-menu-item>
                  <el-menu-item
                    index="2-6"
                    style="width: 100%;"
                    @click="go('/admin/expresscabinet')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>快递柜</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 订单管理 -->
              <el-submenu index="3" style="width: 100%;">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1" style="width: 100%;" @click="go('/admin/index')">
                    <i class="el-icon-tickets"></i>
                    <span>预约订单</span>
                  </el-menu-item>
                  <el-menu-item index="3-2" style="width: 100%;" @click="go('/admin/phoneorder')">
                    <i class="el-icon-tickets"></i>
                    <span>电话预约</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 会员卡 -->
              <el-submenu index="4" style="width: 100%;">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>会员卡</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-0" style="width: 100%;" @click="go('/admin/viptype')">
                    <i class="el-icon-tickets"></i>
                    <span>会员卡类型</span>
                  </el-menu-item>
                  <el-menu-item index="4-1" style="width: 100%;" @click="go('/admin/vipdetail')">
                    <i class="el-icon-tickets"></i>
                    <span>卡详细介绍</span>
                  </el-menu-item>
                  <el-menu-item
                    index="6-9"
                    style="width: 100%;"
                    @click="go('/admin/vipstatistics')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>会员卡消费统计</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 员工管理 -->
              <el-submenu index="5" style="width: 100%;">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>员工管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-0" style="width: 100%;" @click="go('/admin/staff')">
                    <i class="el-icon-tickets"></i>
                    <span>员工管理</span>
                  </el-menu-item>
                  <el-menu-item index="5-1" style="width: 100%;" @click="go('/admin/jurisdiction')">
                    <i class="el-icon-tickets"></i>
                    <span>权限管理</span>
                  </el-menu-item>
                  <el-menu-item index="5-2" style="width: 100%;" @click="go('/admin/distribution')">
                    <i class="el-icon-tickets"></i>
                    <span>分销统计</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!-- 分销商-->
              <el-submenu index="7" style="width: 100%">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>分销商</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="7-0" style="width: 100%" @click="go('/admin/fenxiao')">
                    <i class="el-icon-tickets"></i>
                    <span>分销商列表</span>
                  </el-menu-item>
                  <!-- <el-menu-item
                    index="7-1"
                    style="width: 100%"
                    @click="go('/admin/reservationset')"
                  >
                    <i class="el-icon-tickets"></i>
                    <span>预约设置</span>
                  </el-menu-item>-->
                </el-menu-item-group>
              </el-submenu>
              <!-- 其他 -->
              <el-submenu index="8" style="width: 100%">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>其他</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="8-3" style="width: 100%" @click="go('/admin/copy')">
                    <i class="el-icon-tickets"></i>
                    <span>拷贝店铺数据</span>
                  </el-menu-item>

                  <el-menu-item index="8-5" style="width: 100%" @click="go('/admin/chargeset')">
                    <i class="el-icon-tickets"></i>
                    <span>充值设置</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!-- 顶部导航 -->
      <el-header style="height: 42px;" class="header">
        <el-row>
          <el-col :span="2" align="left">
            <i class="el-icon-menu" @click="show()"></i>
          </el-col>
          <el-col :span="15" style="line-height: 22px; font-size: 15px;">{{title}}</el-col>
          <el-popover placement="bottom" width="160" v-model="visible">
            <p>确定要退出吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="exit()">确定</el-button>
            </div>
            <el-col :span="7" slot="reference">
              <!-- 超级管理员 -->
              <p style="font-size: 14px; line-height: 22px; padding-right:15px;" align="right">{{userName}}</p>
            </el-col>
          </el-popover>
          <!-- <el-col :span="3">
            <i class="el-icon-menu" @click="show()"></i>
          </el-col>-->
        </el-row>
      </el-header>

      <el-main style="height: calc(100vh - 68px); padding: 0px; padding-top: 0px;">
        <router-view />
      </el-main>
      <el-footer class="footer" style="height: 26px; line-height: 26px;">芙蓉云洗衣后台手机版</el-footer>
    </el-container>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      visible: false,
      menu: false,
      No: "",
      userName: "", // 超级管理员
      title: "" //营业统计
    };
  },
  created() {
    let Client = localStorage.getItem("ClientAddr");
    let getUserName = axios.getUserName(Client);
    getUserName.then(res => {
      // console.log(res);
      if (res.data.State == "成功") {
        if (res.data.Body.Name == null) {
          console.log(this.userName);
        } else {
          this.No = res.data.Body.No;
          this.userName = res.data.Body.Name 
          // console.log(this.userName); // 超级管理员
          // console.log(this.No); //账号编号：0001
        }
      } else {
        this.$message({
          message: "请重新登陆",
          type: "error"
        });
        localStorage.removeItem("ClientAddr");
        this.$router.push({ path: "/login" });
      }
    });
  },
  watch: {
    // watch最初绑定的时候是不会执行
    $route: {
      handler: function(val, oldVal) {
        this.title = this.$route.meta.title;
        // console.log(this.title); //营业统计
      },
      // 最初绑定时立即执行
      immediate: true //  该属性使watch绑定的时候立即执行
    }
  },
  methods: {
    showindex() {
      this.menu = !this.menu;
    },
    show() {
      this.menu = !this.menu;
    },
    go(url) {
      // 点击去往新页面
      // @click="go('/admin/setting')"
      // console.log(url)
      this.$router.push({ path: url }); //这个路由路径
      this.show();
    },
    back(url) {
      // 返回到首页
      //  <div @click="back('/admin/openstatistics')">
      this.$router.push({ path: url });
      this.menu = false;
    },
    exit() {
      // 确定退出
      let Client = localStorage.getItem("ClientAddr");
      let loginOut = axios.loginOut(Client);
      loginOut.then(res => {
        if (res.data.State == "成功") {
          this.$message({
            message: "退出成功",
            type: "success"
          });
          localStorage.removeItem("ClientAddr");
        } else {
          this.$message({
            message: "退出失败",
            type: "error"
          });
        }
      });
      this.visible = false;
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style scoped>
p {
  margin: 0px;
}
#main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.header {
  padding: 10px 0px 10px 15px;
  background-color: #393d49;
  color: white;
}
.header-left {
  text-align: left;
}
.el-icon-menu {
  height: 21px;
  line-height: 22px;
  font-size: 20px;
}
#menu {
  position: absolute;
  top: 40px;
  z-index: 3;
  text-align: left;
}
.footer {
  border-top: 1px solid #ccc;
  background-color: #eeeeee;
}
</style>