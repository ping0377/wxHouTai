import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Admin from '@/components/Main'
// import Main from '@/components/Admin'
// nav1
import Img from '@/components/nav1/Img'
import Shop from '@/components/nav1/Shop'
// nav2
import LaunderTicket from '@/components/nav2/launderTicket'
import ShopList from '@/components/nav2/ShopList'
import ShopManage from '@/components/nav2/ShopManage'
import LaundryList from '@/components/nav2/LaundryList'
import LaundryManage from '@/components/nav2/LaundryManage'
import BoxSet from '@/components/nav2/BoxSet'
import BoxOpen from '@/components/nav2/BoxOpen'
import CashTicket from '@/components/nav2/cashTicket'
import VirtualCabinet from '@/components/nav2/VirtualCabinet'
import SarkBox from '@/components/nav2/SarkBox'
import ExpressCabinet from '@/components/nav2/ExpressCabinet'
// nav3
import PhoneOrder from '@/components/nav3/PhoneOrder'
import Index from '@/components/nav3/Index'
// nav4
import VipDetail from '@/components/nav4/VipDetail'
import VipType from '@/components/nav4/VipType'
// nav5
import Staff from '@/components/nav5/Staff'
import Distribution from '@/components/nav5/Distribution'
import Jurisdiction from '@/components/nav5/Jurisdiction'
// nav6
import OpenStatistics from '@/components/nav6/OpenStatistics'
import CardgetStatistics from '@/components/nav6/CardgetStatistics'
import CardpostStatistics from '@/components/nav6/CardpostStatistics'
import PayStatistics from '@/components/nav6/PayStatistics'
import VipStatistics from '@/components/nav6/VipStatistics'
import RechargeStatistics from '@/components/nav6/RechargeStatistics'
import LaundryStatistics from '@/components/nav6/LaundryStatistics'
import IntegralStatistics from '@/components/nav6/IntegralStatistics'
import ReceiveStatistics from '@/components/nav6/ReceiveStatistics'
import NonpaymentStatistics from '@/components/nav6/NonpaymentStatistics'
import DeliverLaundryStatistics from '@/components/nav6/DeliverLaundryStatistics'
import CouponSalesRecord from '@/components/nav6/CouponSalesRecord'
import CardTypeStatistics from '@/components/nav6/CardTypeStatistics'
import DelStatistics from '@/components/nav6/DelStatistics'
// nav7
import Setting from '@/components/nav7/Setting'
import Copy from '@/components/nav7/Copy'
import Management from '@/components/nav7/Management'
import ReservationSet from '@/components/nav7/ReservationSet'
import Notice from '@/components/nav7/Notice'
import ChargeSet from '@/components/nav7/ChargeSet'
import ce from '@/components/nav7/ce'
// nav8
import fenxiao from '@/components/nav8/fenxiao'
import tj from '@/components/nav8/tj'
import msgget from '@/components/nav8/msgget'
import preferential from '@/components/nav8/preferential'
import getclothesmsg from '@/components/nav8/getclothesmsg'
import details from '@/components/nav8/details'
import getclothefeedingsmsg from '@/components/nav8/getclothefeedingsmsg'

import parameterSetting from '@/components/nav7/parameterSetting'
Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/ce',
      name: 'ce',
      component: ce
    },
    // {
    //   path: '/main',
    //   name: 'main',
    //   component: Main,
    //   meta: {
    //     requrireAuth: true
    //   },
    //   children:[
    //     {
    //       path: 'openstatistics',
    //       name: 'openstatistics',
    //       component: OpenStatistics,
    //       meta: {
    //         requrireAuth: true,
    //         title: "营业统计"
    //       }
    //     },
    //     {
    //       path: 'cardgetstatistics',
    //       name: 'cardgetstatistics',
    //       component: CardgetStatistics,
    //       meta: {
    //         requrireAuth: true,
    //         title: "发卡统计"
    //       }
    //     },
    //     {
    //       path: 'cardpoststatistics',
    //       name: 'cardpoststatistics',
    //       component: CardpostStatistics,
    //       meta: {
    //         requrireAuth: true,
    //         title: "退卡统计"
    //       }
    //     },
    //     {
    //       path: 'paystatistics',
    //       name: 'paystatistics',
    //       component: PayStatistics,
    //       meta: {
    //         requrireAuth: true,
    //         title: "扣款统计"
    //       }
    //     },
    //     {
    //       path: 'vipstatistics',
    //       name: 'vipstatistics',
    //       component: VipStatistics,
    //       meta: {
    //         requrireAuth: true,
    //         title: "会员卡消费统计"
    //       }
    //     },
    //     {
    //       path: 'rechargestatistics',
    //       name: 'rechargestatistics',
    //       component: RechargeStatistics,
    //       meta: {
    //         requrireAuth: true,
    //         title: "充值统计"
    //       }
    //     },
    //     {
    //       path: 'laundrystatistics',
    //       name: 'laundrystatistics',
    //       component: LaundryStatistics,
    //       meta: {
    //         requrireAuth: true,
    //         title: "洗衣单统计"
    //       }
    //     },
    //     {
    //       path: 'integralstatistics',
    //       name: 'integralstatistics',
    //       component: IntegralStatistics,
    //       meta: {
    //         requrireAuth: true,
    //         title: "积分赠送统计"
    //       }
    //     },
    //     {
    //       path: 'receivestatistics',
    //       name: 'receivestatistics',
    //       component: ReceiveStatistics,
    //       meta: {
    //         requrireAuth: true,
    //         title: "取件付款统计"
    //       }
    //     },
    //     {
    //       path: 'nonpaymentstatistics',
    //       name: 'nonpaymentstatistics',
    //       component: NonpaymentStatistics,
    //       meta: {
    //         requrireAuth: true,
    //         title: "未付洗衣单统计"
    //       }
    //     }
    //   ]
    // },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requrireAuth: true
      },
      children: [
        // 统计
        {
          path: 'openstatistics',
          name: 'openstatistics',
          component: OpenStatistics,
          meta: {
            requrireAuth: true,
            title: "营业统计"
          }
        },
        {
          path: 'parameterSetting',
          name: 'parameterSetting',
          component: parameterSetting,
          meta: {
            requrireAuth: true,
            title: "参数设置"
          }
        },
        {
          path: 'getclothefeedingsmsg',
          name: 'getclothefeedingsmsg',
          component: getclothefeedingsmsg,
          meta: {
            requrireAuth: true,
            title: "收衣点员工收送统计"
          }
        },
        {
          path: 'details',
          name: 'details',
          component: details,
          meta: {
            requrireAuth: true,
            title: "详情页"
          }
        },
        {
          path: 'getclothesmsg',
          name: 'getclothesmsg',
          component: getclothesmsg,
          meta: {
            requrireAuth: true,
            title: "收衣点统计"
          }
        },
        {
          path: 'preferential',
          name: 'preferential',
          component: preferential,
          meta: {
            requrireAuth: true,
            title: "首页优惠设置"
          }
        },
        {
          path: 'msgget',
          name: 'msgget',
          component: msgget,
          meta: {
            requrireAuth: true,
            title: "收衣点采集"
          }
        },
        {
          path: 'fenxiao',
          name: 'fenxiao',
          component: fenxiao,
          meta: {
            requrireAuth: true,
            title: "分销商列表"
          }
        },
        {
          path:'tj',
          name:'tj',
          component:tj,
          meta:{
            requrireAuth: true,
            title: "分销详情"
          }
        },
        {
          path: 'cardgetstatistics',
          name: 'cardgetstatistics',
          component: CardgetStatistics,
          meta: {
            requrireAuth: true,
            title: "发卡统计"
          }
        },
        {
          path: 'cardpoststatistics',
          name: 'cardpoststatistics',
          component: CardpostStatistics,
          meta: {
            requrireAuth: true,
            title: "退卡统计"
          }
        },
        {
          path: 'paystatistics',
          name: 'paystatistics',
          component: PayStatistics,
          meta: {
            requrireAuth: true,
            title: "扣款统计"
          }
        },
        {
          path: 'vipstatistics',
          name: 'vipstatistics',
          component: VipStatistics,
          meta: {
            requrireAuth: true,
            title: "会员卡消费统计"
          }
        },
        {
          path: 'rechargestatistics',
          name: 'rechargestatistics',
          component: RechargeStatistics,
          meta: {
            requrireAuth: true,
            title: "充值统计"
          }
        },
        {
          path: 'laundrystatistics',
          name: 'laundrystatistics',
          component: LaundryStatistics,
          meta: {
            requrireAuth: true,
            title: "洗衣单统计"
          }
        },
        {
          path: 'deliverlaundrystatistics',
          name: 'deliverlaundrystatistics',
          component: DeliverLaundryStatistics,
          meta: {
            requrireAuth: true,
            title: "送洗衣物统计"
          }
        },
        {
          path: 'couponsalesrecord',
          name: 'couponsalesrecord',
          component: CouponSalesRecord,
          meta: {
            requrireAuth: true,
            title: "券销售记录"
          }
        },
        {
          path: 'cardtypestatistics',
          name: 'cardtypestatistics',
          component: CardTypeStatistics,
          meta: {
            requrireAuth: true,
            title: "卡类型统计"
          }
        },
        {
          path: 'delstatistics',
          name: 'delstatistics',
          component: DelStatistics,
          meta: {
            requrireAuth: true,
            title: "删除记录"
          }
        },
        {
          path: 'integralstatistics',
          name: 'integralstatistics',
          component: IntegralStatistics,
          meta: {
            requrireAuth: true,
            title: "积分赠送统计"
          }
        },
        {
          path: 'receivestatistics',
          name: 'receivestatistics',
          component: ReceiveStatistics,
          meta: {
            requrireAuth: true,
            title: "取件付款统计"
          }
        },
        {
          path: 'nonpaymentstatistics',
          name: 'nonpaymentstatistics',
          component: NonpaymentStatistics,
          meta: {
            requrireAuth: true,
            title: "未付洗衣单统计"
          }
        },
        {
          path: 'index',
          name: 'index',
          component: Index,
          meta: {
            requrireAuth: true,
            title: "预约订单"
          }
        },
        {
          path: 'img',
          name: 'img',
          component: Img,
          meta: {
            requrireAuth: true,
            title: "轮播图"
          }
        },
        {
          path: 'shop',
          name: 'shop',
          component: Shop,
          meta: {
            requrireAuth: true,
            title: "精品购物"
          }
        },
        {
          path: 'boxset',
          name: 'boxset',
          component: BoxSet,
          meta: {
            requrireAuth: true,
            title: "洗衣柜设置"
          }
        },
        {
          path: 'shoplist',
          name: 'shoplist',
          component: ShopList,
          meta: {
            requrireAuth: true,
            title: "商品分类"
          }
        },
        {
          path: 'shopmanage',
          name: 'shopmanage',
          component: ShopManage,
          meta: {
            requrireAuth: true,
            title: "商品管理"
          }
        },
        {
          path: 'cashTicket',
          name: 'cashTicket',
          component: CashTicket,
          meta: {
            requrireAuth: true,
            title: "优惠券设置"
          }
        },

        {
          path: 'laundrylist',
          name: 'laundrylist',
          component: LaundryList,
          meta: {
            requrireAuth: true,
            title: "洗衣分类"
          }
        },
        {
          path: 'laundrymanage',
          name: 'laundrymanage',
          component: LaundryManage,
          meta: {
            requrireAuth: true,
            title: "洗衣管理"
          }
        },
        {
          path: 'virtualcabinet',
          name: 'virtualcabinet',
          component: VirtualCabinet,
          meta: {
            requrireAuth: true,
            title: "收衣点"
          }
        },
        {
          path: 'expresscabinet',
          name: 'expresscabinet',
          component: ExpressCabinet,
          meta: {
            requrireAuth: true,
            title: "快递柜"
          }
        },
        {
          path: 'phoneorder',
          name: 'phoneoder',
          component: PhoneOrder,
          meta: {
            requrireAuth: true,
            title: "电话预约"
          }
        },
        {
          path: 'vipdetail',
          name: 'vipdetail',
          component: VipDetail,
          meta: {
            requrireAuth: true,
            title: "卡详细介绍"
          }
        },
        { //略
          path: 'launderTicket',
          name: 'launderTicket',
          component: LaunderTicket,
          meta: {
            requrireAuth: true,
            title: "洗衣券设置"
          }
        },
        {
          path: 'viptype',
          name: 'viptype',
          component: VipType,
          meta: {
            requrireAuth: true,
            title: "会员卡类型"
          }
        },
        {
          path: 'distribution',
          name: 'distribution',
          component: Distribution,
          meta: {
            requrireAuth: true,
            title: "分销统计"
          }
        },
        {
          path: 'staff',
          name: 'staff',
          component: Staff,
          meta: {
            requrireAuth: true,
            title: "员工管理"
          }
        },
        {
          path: 'jurisdiction',
          name: 'jurisdiction',
          component: Jurisdiction,
          meta: {
            requrireAuth: true,
            title: "权限管理"
          }
        },
        {
          path: 'setting',
          name: 'setting',
          component: Setting,
          meta: {
            requrireAuth: true,
            title: "参数设置"
          }
        },
        {
          path: 'notice',
          name: 'notice',
          component: Notice,
          meta: {
            requrireAuth: true,
            title: "预约通知"
          }
        },
        {
          path: 'management',
          name: 'management',
          component: Management,
          meta: {
            requrireAuth: true,
            title: "店铺管理"
          }
        },
        {
          path: 'reservationset',
          name: 'reservationset',
          component: ReservationSet,
          meta: {
            requrireAuth: true,
            title: "预约设置"
          }
        },
        {
          path: 'copy',
          name: 'copy',
          component: Copy,
          meta: {
            requrireAuth: true,
            title: "拷贝店铺数据"
          }
        },
        {
          path: 'chargeset',
          name: 'chargeset',
          component: ChargeSet,
          meta: {
            requrireAuth: true,
            title: "充值设置"
          }
        }
      ]
    },
    {
      path: '/boxopen',
      name: 'boxopen',
      component: BoxOpen,
      meta: {
        requrireAuth: true,
      }
    },
    {
      path: "/sarkbox",
      name: "sarkbox",
      component: SarkBox,
      meta: {
        requrireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
  } else {
    let user = localStorage.getItem("ClientAddr");
    if (user) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
  // else if (to.meta.requrireAuth) {
  //   var user = localStorage.getItem("ClientAddr");
  //   if (user) {
  //     next();
  //   } else {
  //     next({
  //       path: '/login'
  //     });
  //   }
  // } else {
  //   next();
  // }
})

export default router;
