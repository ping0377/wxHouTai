<template>
  <div id="admin">
    <el-container>
      <div id="menu" v-show="menu" style="width: 100%; height: 100%;">
        <el-row class="tac" style="height: 100%;">
          <el-col :span="24" style="height: 100%;">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              unique-opened
              background-color="#393D49"
              text-color="#fff"
              active-text-color="#ffd04b"
              unique-opened
              style="height: 100%;"
            >
              <!-- <el-submenu index="1" style="width: 100%;">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>首页管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-0" style="width: 100%;" @click="go('/admin/shop')">
                    <i class="el-icon-tickets"></i>
                    <span>精品购物</span>
                  </el-menu-item>
                  <el-menu-item index="1-0" style="width: 100%;" @click="go('/admin/img')">
                    <i class="el-icon-tickets"></i>
                    <span>轮播图</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu> -->
              <!-- 物品管理 -->
              <el-submenu index="2" style="width: 100%;">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>资料设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-0" style="width: 100%;" @click="go('/admin/shoplist')">
                    <i class="el-icon-tickets"></i>
                    <span>商品分类</span>
                  </el-menu-item>
                  <el-menu-item index="2-1" style="width: 100%;" @click="go('/admin/shopmanage')">
                    <i class="el-icon-tickets"></i>
                    <span>商品管理</span>
                  </el-menu-item>
                  <el-menu-item index="2-2" style="width: 100%;" @click="go('/admin/laundrylist')">
                    <i class="el-icon-tickets"></i>
                    <span>洗衣分类</span>
                  </el-menu-item>
                  <el-menu-item index="2-3" style="width: 100%;" @click="go('/admin/laundrymanage')">
                    <i class="el-icon-tickets"></i>
                    <span>洗衣管理</span>
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
                  <el-menu-item index="3-0" style="width: 100%;" @click="go('/admin/shoporder')">
                    <i class="el-icon-tickets"></i>
                    <span>购物订单</span>
                  </el-menu-item>
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
              <!-- 数据统计 -->
              <el-submenu index="6" style="width: 100%;">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="6-0" style="width: 100%;" @click="go('/main/openstatistics')">
                    <i class="el-icon-tickets"></i>
                    <span>营业统计</span>
                  </el-menu-item>
                  <el-menu-item index="6-1" style="width: 100%;" @click="go('/main/laundrystatistics')">
                    <i class="el-icon-tickets"></i>
                    <span>洗衣单统计</span>
                  </el-menu-item>
                  <el-menu-item index="6-2" style="width: 100%;" @click="go('/main/rechargestatistics')">
                    <i class="el-icon-tickets"></i>
                    <span>充值统计</span>
                  </el-menu-item>
                  <el-menu-item index="6-3" style="width: 100%;" @click="go('/main/cardgetstatistics')">
                    <i class="el-icon-tickets"></i>
                    <span>发卡统计</span>
                  </el-menu-item>
                  <el-menu-item index="6-4" style="width: 100%;" @click="go('/main/cardpoststatistics')">
                    <i class="el-icon-tickets"></i>
                    <span>退卡统计</span>
                  </el-menu-item>
                  <el-menu-item index="6-5" style="width: 100%;" @click="go('/main/paystatistics')">
                    <i class="el-icon-tickets"></i>
                    <span>扣款统计</span>
                  </el-menu-item>
                  <el-menu-item index="6-6" style="width: 100%;" @click="go('/main/nonpaymentstatistics')">
                    <i class="el-icon-tickets"></i>
                    <span>未付款洗衣单统计</span>
                  </el-menu-item>
                  <el-menu-item index="6-7" style="width: 100%;" @click="go('/main/receivestatistics')">
                    <i class="el-icon-tickets"></i>
                    <span>洗衣单取件付款统计</span>
                  </el-menu-item>
                  <el-menu-item index="6-8" style="width: 100%;" @click="go('/main/integralstatistics')">
                    <i class="el-icon-tickets"></i>
                    <span>积分赠送统计</span>
                  </el-menu-item>
                  <el-menu-item index="6-9" style="width: 100%;" @click="go('/main/vipstatistics')">
                    <i class="el-icon-tickets"></i>
                    <span>会员卡消费统计</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 其他 -->
              <el-submenu index="7" style="width: 100%">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>其他</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="7-0" style="width: 100%" @click="go('/admin/notice')">
                    <i class="el-icon-tickets"></i>
                    <span>预约通知</span>
                  </el-menu-item>
                  <el-menu-item index="7-1" style="width: 100%" @click="go('/admin/phone')">
                    <i class="el-icon-tickets"></i>
                    <span>预约电话</span>
                  </el-menu-item>
                  <el-menu-item index="7-2" style="width: 100%" @click="go('/admin/management')">
                    <i class="el-icon-tickets"></i>
                    <span>店铺管理</span>
                  </el-menu-item>
                  <el-menu-item index="7-3" style="width: 100%" @click="go('/admin/copy')">
                    <i class="el-icon-tickets"></i>
                    <span>拷贝店铺数据</span>
                  </el-menu-item>
                  <el-menu-item index="7-4" style="width: 100%" @click="go('/admin/setting')">
                    <i class="el-icon-tickets"></i>
                    <span>参数设置</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <el-header style="height: 42px;" class="header">
        <el-row>
          <div @click="backIndex()">
            <el-col :span="4" class="header-left">
             <p style="line-height: 22px; font-size: 15px;">返回</p>
            </el-col>
          </div>
          <el-col :span="9" style="line-height: 22px; font-size: 15px;">{{111}}</el-col>
          <el-popover
            placement="bottom"
            width="160"
            v-model="visible">
            <p>确定要退出吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="exit()">确定</el-button>
            </div>
            <el-col :span="8" slot="reference">
              <p style="font-size: 14px; line-height: 22px;">{{userName}}</p>
            </el-col>
          </el-popover>
          <el-col :span="3">
            <i class="el-icon-menu" @click="show()"></i>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="height: calc(100vh - 68px); padding: 0px; padding-top: 0px;">
        <router-view/>
      </el-main>
      <el-footer class="footer" style="height: 26px; line-height: 26px;">芙蓉云洗衣后台手机版</el-footer>
    </el-container>
  </div>
</template>

<script>
import * as axios from '@/common/js/axiosServer.js'
export default {
  data() {
    return {
      visible: false,
      menu:false,
      userName:'',
      title:''
    };
  },
  created() {
    let Client = localStorage.getItem("ClientAddr");
    let getUserName = axios.getUserName(Client);
    getUserName.then((res) => {
      if(res.data.State == '成功'){
        if(res.data.Body.Name == null){
          this.userName = res.data.Body.No;
        }else{
          this.userName = res.data.Body.Name;
        }
      }else{
        this.$message({
          message: '请重新登陆',
          type: 'error'
        });
        localStorage.removeItem("ClientAddr");
        this.$router.push({path: '/login'});
      }
    })
  },
  watch: {
    // watch最初绑定的时候是不会执行
    $route: {
      handler: function(val, oldVal){
        this.title = this.$route.meta.title;
      },
      // 最初绑定时立即执行
      immediate: true
    }
  },
  methods: {
    show() {
      this.menu = !this.menu;
    },
    go(url) {
      this.$router.push({path: url});
      this.show();
    },
    back(url) {
      this.$router.push({path: url});
      this.menu = false;
    },
    backIndex() {
      // 部署到服务器的子项目时地址的长度与本地开发时地址的长度差1个
      // 本地开发时条件应改为 location.href.split("/")[5] == "openstatistics"
      // 部署到服务器根目录时条件不变
      // 部署到服务器的子项目时条件应改为 location.href.split("/")[6] == "openstatistics"
      if(location.href.split("/")[5] == "openstatistics") {
        this.back('/admin/index');
      }else {
        this.back('/main/openstatistics');
      }
    },
    exit() {
      let Client = localStorage.getItem("ClientAddr");
      let loginOut = axios.loginOut(Client);
      loginOut.then((res) => {
        if(res.data.State == '成功'){
          this.$message({
            message: '退出成功',
            type: 'success'
          });
          localStorage.removeItem("ClientAddr");
        }else {
          this.$message({
            message: '退出失败',
            type: 'error'
          });
        }
      })
      this.visible = false;
      this.$router.push({path: '/login'});
    }
  }
};
</script>

<style scoped>
p {
  margin: 0px;
}
#admin {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.header {
  padding: 10px 0px 10px 20px;
  background-color: #393D49;
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
.footer{
  border-top: 1px solid #ccc;
  background-color: #EEEEEE;
}
</style>