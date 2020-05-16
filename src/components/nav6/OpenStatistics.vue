<template>
  <div id="OpenStatistics">
    <!-- 查询 -->
    <el-row class="borderS">
      <el-col :span="18" class="time">
        <span>{{view1}} - {{view2}}</span>
      </el-col>
      <el-col :span="6">
        <div style="width: 100%;">
          <el-button type="default" style="width: 100%; padding: 5px;" @click="getSearch()">查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <el-collapse accordion>
      <!-- 营业额 -->
      <el-row>
        <el-col :span="24" class="t_text">
          <h3>营业额:<span>{{openMoney.toFixed(2)}}</span>元</h3>
        </el-col>
      </el-row>
      <!-- 洗护现金收入 -->
      <el-collapse-item>
        <template slot="title">
          <div class="border-title">
            <div class="text-title">
              <el-row>
                <el-col :span="12" class="text1 title1">洗护现金收入:</el-col>
                <el-col :span="10" class="text2 title2"><span>{{CashMoney.toFixed(2)}}</span>元</el-col>
              </el-row>
            </div>
          </div>
        </template>
        <!-- 实际支付总额 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">
                <div>实际支付总额:</div> <!-- 实际支付总额 -->
                <div>会员卡实付额:</div> <!-- 会员卡实付额 -->
                <div>订单总额:</div> <!-- 订单总额 -->
              </el-col>
              <el-col :span="10" class="text2">
                <div>{{washTotalMoney.toFixed(2)}}元</div> <!-- 实际支付总额 -->
                <div>{{CardPayMoney_W.toFixed(2)}}元</div> <!-- 会员卡实付额 -->
                <div>{{TotalOrder.toFixed(2)}}元</div> <!-- 订单总额 -->
              </el-col>
              <el-col class="text3" style="line-height: 96px;">
                <!-- <i class="el-icon-arrow-right"></i> -->
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 付款总额 -->
        <div class="border" @click="go('/admin/laundrystatistics')">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">付款单总额:</el-col>
              <el-col :span="10" class="text2">{{totalPrice.toFixed(2)}}元</el-col>
              <el-col class="text3" style="line-height: 24px;">
                <i class="el-icon-arrow-right"></i>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 未付款总额 -->
        <div class="border" @click="go('/admin/nonpaymentstatistics')">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">未付款单总额:</el-col>
              <el-col :span="10" class="text2">{{notPayment.toFixed(2)}}元</el-col>
              <el-col class="text3" style="line-height: 24px;">
                <i class="el-icon-arrow-right"></i>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 优惠总额 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">
                <div>优惠总额:</div> <!-- 优惠总额 -->
                <div>卡折扣优惠:</div> <!-- 卡折扣优惠 -->
                <div>优惠券:</div> <!-- 优惠券 -->
                <div>临时折扣优惠:</div> <!-- 临时折扣优惠 -->
              </el-col>
              <el-col :span="10" class="text2">
                <div>{{TotalDiscount.toFixed(2)}}元</div> <!-- 优惠总额 -->
                <div>{{CardDiscMoney.toFixed(2)}}元</div> <!-- 卡折扣优惠 -->
                <div>{{Coupon.toFixed(2)}}元</div> <!-- 优惠券 -->
                <div>{{tempDiscMoney.toFixed(2)}}元</div> <!-- 临时折扣优惠 -->
              </el-col>
              <el-col class="text3" style="line-height: 96px;">
                <!-- <i class="el-icon-arrow-right"></i> -->
              </el-col>
            </el-row>
          </div>
        </div>
      </el-collapse-item>
      <!-- 会员卡实际收入 -->
      <el-collapse-item>
        <template slot="title">
          <div class="border-title">
            <div class="text-title">
              <el-row>
                <el-col :span="12" class="text1 title1">会员卡实际收入:</el-col>
                <el-col :span="10" class="text2 title2"><span>{{vipTotalMoney.toFixed(2)}}</span>元</el-col>
              </el-row>
            </div>
          </div>
        </template>
        <!-- 卡充值 -->
        <div class="border" @click="go('/admin/rechargestatistics')">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">
                <div>卡充值张数:</div>
                <div>卡充值总额:</div>
                <div>卡赠送总额:</div>
              </el-col>
              <el-col :span="10" class="text2">
                <div>{{RechargeCount_C}}张</div> <!-- 卡充值张数 -->
                <div>{{RechargeValue_C.toFixed(2)}}元</div> <!-- 卡充值总额 -->
                <div>{{GiveValue_C.toFixed(2)}}元</div> <!-- 卡赠送总额 -->
              </el-col>
              <el-col class="text3" style="line-height: 72px;">
                <i class="el-icon-arrow-right"></i>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 发卡统计 -->
        <div class="border" @click="go('/admin/cardgetstatistics')">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">
                <div>新发卡张数:</div>
                <div>卡工本费:</div>
              </el-col>
              <el-col :span="10" class="text2">
                <div>{{DispatchCount_C}}张</div> <!-- 发卡张数 -->
                <div>{{gbMoney_C.toFixed(2)}}元</div> <!-- 卡工本费 -->
              </el-col>
              <el-col class="text3" style="line-height: 48px;">
                <i class="el-icon-arrow-right"></i>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 卡扣款 -->
        <div class="border" @click="go('/admin/paystatistics')">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">卡扣款:</el-col>
              <el-col :span="10" class="text2">{{DebitMoney_C.toFixed(2)}}元</el-col>
              <el-col class="text3" style="line-height: 24px;">
                <i class="el-icon-arrow-right"></i>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-collapse-item>
      <!-- 营业总支出 -->
      <el-collapse-item>
        <template slot="title">
          <div class="border-title">
            <div class="text-title">
              <el-row>
                <el-col :span="12" class="text1 title1">营业总支出:</el-col>
                <el-col :span="10" class="text2 title2"><span>- {{tOperExpenses.toFixed(2)}}</span>元</el-col>
              </el-row>
            </div>
          </div>
        </template>
        <!-- 撤单笔数 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">
                <div>撤单笔数:</div> <!-- 撤单笔数 -->
                <div>撤单订单总额:</div> <!-- 撤单订单总额 -->
                <div>撤单退回现金:</div> <!-- 撤单退回现金 -->
                <div>撤单退回卡金额:</div> <!-- 撤单退回卡金额 -->
                <div>退赔笔数:</div> <!-- 退赔笔数 -->
                <div>退赔退回现金:</div> <!-- 退赔退回现金 -->
                <div>退赔退回卡金额:</div> <!-- 退赔退回卡金额 -->
              </el-col>
              <el-col :span="10" class="text2">
                <div>{{OrderAbandon}}笔</div> <!-- 撤单笔数 -->
                <div>{{WithdrawalTotal.toFixed(2)}}元</div> <!-- 撤单订单总额 -->
                <div>{{WithdrawalCashBack.toFixed(2)}}元</div> <!-- 撤单退回现金 -->
                <div>{{WithdrawalCard.toFixed(2)}}元</div> <!-- 撤单退回卡金额 -->
                <div>{{RefCount}}笔</div> <!-- 退赔笔数 -->
                <div>{{RefMoney.toFixed(2)}}元</div> <!-- 退赔退回现金 -->
                <div>{{RefCardMoney.toFixed(2)}}元</div> <!-- 退赔退回卡金额 -->
              </el-col>
              <el-col class="text3" style="line-height: 168px;">
                <i class="el-icon-arrow-right"></i>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 会员退卡张数 -->
        <div class="border" @click="go('/admin/cardpoststatistics')">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">
                <div>会员退卡张数:</div> <!-- 会员退卡张数 -->
                <div>退卡退回现金:</div> <!-- 会员退卡金额 -->
              </el-col>
              <el-col :span="10" class="text2">
                <div>{{giveBackCount_C}}张</div> <!-- 会员退卡张数 -->
                <div>{{giveBackMoney_C.toFixed(2)}}元</div> <!-- 退卡退回现金 -->
              </el-col>
              <el-col class="text3" style="line-height: 48px;">
                <i class="el-icon-arrow-right"></i>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-collapse-item>
      <!-- 实际总入账 -->
      <el-row>
        <el-col :span="24" class="t_text">
          <h3>实际总入账:<span>{{realMoney.toFixed(2)}}</span>元</h3>
        </el-col>
      </el-row>
      <!-- 现金 -->
      <el-collapse-item>
        <template slot="title">
          <div class="border-title">
            <div class="text-title">
              <el-row>
                <el-col :span="12" class="text1 title1">现金总入账:</el-col>
                <el-col :span="10" class="text2 title2"><span>{{CashMoney_G.toFixed(2)}}</span>元</el-col>
              </el-row>
            </div>
          </div>
        </template>
        <!-- 卡现金 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">卡现金:</el-col>
              <el-col :span="10" class="text2">{{cashMoney_C.toFixed(2)}}元</el-col>
            </el-row>
          </div>
        </div>
        <!-- 洗护现金 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">洗护现金:</el-col>
              <el-col :span="10" class="text2">{{CashMoney_W.toFixed(2)}}元</el-col>
            </el-row>
          </div>
        </div>
        <!-- 现金支出 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">现金支出:</el-col>
              <el-col :span="10" class="text2">- {{CashMoney_GB.toFixed(2)}}元</el-col>
            </el-row>
          </div>
        </div>
      </el-collapse-item>
      <!-- 支付宝 -->
      <el-collapse-item>
        <template slot="title">
          <div class="border-title">
            <div class="text-title">
              <el-row>
                <el-col :span="12" class="text1 title1">支付宝总入账:</el-col>
                <el-col :span="10" class="text2 title2"><span>{{AliPayMoney_G.toFixed(2)}}</span>元</el-col>
              </el-row>
            </div>
          </div>
        </template>
        <!-- 卡支付宝 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">卡支付宝:</el-col>
              <el-col :span="10" class="text2">{{AliPayMoney_C.toFixed(2)}}元</el-col>
            </el-row>
          </div>
        </div>
        <!-- 洗护支付宝 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">洗护支付宝:</el-col>
              <el-col :span="10" class="text2">{{AliPayMoney_W.toFixed(2)}}元</el-col>
            </el-row>
          </div>
        </div>
      </el-collapse-item>
      <!-- 微信 -->
      <el-collapse-item>
        <template slot="title">
          <div class="border-title">
            <div class="text-title">
              <el-row>
                <el-col :span="12" class="text1 title1">微信总入账:</el-col>
                <el-col :span="10" class="text2 title2"><span>{{WeChatMoney_G.toFixed(2)}}</span>元</el-col>
              </el-row>
            </div>
          </div>
        </template>
        <!-- 卡微信 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">卡微信:</el-col>
              <el-col :span="10" class="text2">{{WeChatMoney_C.toFixed(2)}}元</el-col>
            </el-row>
          </div>
        </div>
        <!-- 洗护微信 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">洗护微信:</el-col>
              <el-col :span="10" class="text2">{{WeChatMoney_W.toFixed(2)}}元</el-col>
            </el-row>
          </div>
        </div>
      </el-collapse-item>
      <!-- 其他 -->
      <el-collapse-item>
        <template slot="title">
          <div class="border-title">
            <div class="text-title">
              <el-row>
                <el-col :span="12" class="text1 title1">其他总入账:</el-col>
                <el-col :span="10" class="text2 title2"><span>{{OtherMoney_G.toFixed(2)}}</span>元</el-col>
              </el-row>
            </div>
          </div>
        </template>
        <!-- 卡其他 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">卡其他入账:</el-col>
              <el-col :span="10" class="text2">{{OtherMoney_C.toFixed(2)}}元</el-col>
            </el-row>
          </div>
        </div>
        <!-- 洗护其他 -->
        <div class="border">
          <div class="text">
            <el-row>
              <el-col :span="12" class="text1">洗护其他入账:</el-col>
              <el-col :span="10" class="text2">{{OtherMoney_W.toFixed(2)}}元</el-col>
            </el-row>
          </div>
        </div>
      </el-collapse-item>
      <!-- 订单统计 -->
      <el-collapse-item>
        <template slot="title">
          <div class="order">
            <el-row>
              <el-col :span="24">订单统计</el-col>
            </el-row>
          </div>
        </template>
        <!-- 收入洗护单 -->
        <div class="border_N">
          <div class="text order_text">
            <el-row>
              <el-col :span="12" class="text1">收入洗护单:</el-col>
              <el-col :span="10" class="text2"><span class="order_span">{{washOrderCount}}</span>单</el-col>
            </el-row>
          </div>
        </div>
        <!-- 收件总数 -->
        <div class="border_N">
          <div class="text order_text">
            <el-row>
              <el-col :span="12" class="text1">收件总数:</el-col>
              <el-col :span="10" class="text2"><span class="order_span">{{totalCount}}</span>单</el-col>
            </el-row>
          </div>
        </div>
        <!-- 取走洗护单 -->
        <div class="border_N">
          <div class="text order_text">
            <el-row>
              <el-col :span="12" class="text1">取走洗护单:</el-col>
              <el-col :span="10" class="text2"><span class="order_span">{{takeWashorderCount}}</span>单</el-col>
            </el-row>
          </div>
        </div>
        <!-- 取件总数 -->
        <div class="border_N">
          <div class="text order_text">
            <el-row>
              <el-col :span="12" class="text1">取件总数:</el-col>
              <el-col :span="10" class="text2"><span class="order_span">{{takeObjectCount}}</span>件</el-col>
            </el-row>
          </div>
        </div>
        <!-- 未支付件数 -->
        <div class="border_N">
          <div class="text order_text">
            <el-row>
              <el-col :span="12" class="text1">未支付件数:</el-col>
              <el-col :span="10" class="text2"><span class="order_span">{{noPayCloths}}</span>件</el-col>
            </el-row>
          </div>
        </div>
        <!-- 卡支付件数 -->
        <div class="border_N">
          <div class="text order_text">
            <el-row>
              <el-col :span="12" class="text1">卡支付件数:</el-col>
              <el-col :span="10" class="text2"><span class="order_span">{{cardCloths}}</span>件</el-col>
            </el-row>
          </div>
        </div>
        <!-- 非卡支付件数 -->
        <div class="border_N">
          <div class="text order_text">
            <el-row>
              <el-col :span="12" class="text1">非卡支付件数:</el-col>
              <el-col :span="10" class="text2"><span class="order_span">{{noCardCloths}}</span>件</el-col>
            </el-row>
          </div>
        </div>
      </el-collapse-item>
      <!-- 物件数量统计 -->
      <el-collapse-item>
        <template slot="title">
          <div class="order">
            <el-row>
              <el-col :span="24">物件数量统计</el-col>
            </el-row>
          </div>
        </template>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="ServiceName"
              label="服务类型"
              min-width="160"
              align="center"
              fit="true">
            </el-table-column>
            <el-table-column
              prop="servicecount"
              label="服务件数"
              min-width="160"
              align="center"
              fit="true">
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 查询弹出 -->
    <el-dialog title="查询" :visible.sync="dialogFormVisible" fullscreen>
      <div class="block">
        <p class="block-text">开始时间:</p>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left">
        </el-date-picker>
      </div>
      <div class="block">
        <p class="block-text">结束时间:</p>
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 90%"
          :editable="false"
          :clearable="false"
          class="left">
        </el-date-picker>
      </div>
      <div class="block">
        <p class="block-text">选择员工:</p>
        <el-select class="left" v-model="val1" placeholder="请选择员工" style="width: 90%">
          <el-option :label="select1_l" :value="select1_v"></el-option>
          <el-option
            v-for="item in optionsW"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <p class="block-text">选择店铺:</p>
        <el-select class="left" v-model="val2" placeholder="请选择店铺" style="width: 90%">
          <el-option :label="select2_l" :value="select2_v"></el-option>
          <el-option
            v-for="item in optionsS"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="searchData()">查 询</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from '@/common/js/axiosServer.js'
export default {
  data() {
    return {
      // 总数据
      allData:[],
      // 显示
      tableData:[],
      // 洗护
      totalPrice: 0, //付款单总额
      notPayment: 0, //未付款单总额
      CardPayMoney_W: 0, //会员卡实付额
      CardDiscMoney: 0, //卡折扣优惠
      Coupon: 0, //优惠券
      tempDiscMoney: 0, //临时折扣优惠
      washTotalMoney: 0, //实际支付总额
      CashMoney:0, //洗护现金收入
      TotalOrder:0, // 订单总额
      TotalDiscount:0, // 优惠总额
      // 会员卡
      DebitMoney_C: 0, //卡扣款金额
      DispatchCount_C: 0, //新发卡数
      GiveValue_C: 0, //卡赠送总额
      RechargeCount_C: 0, //卡充值张数
      RechargeValue_C: 0, //卡充值总额
      gbMoney_C: 0, //卡工本费
      vipTotalMoney: 0, //会员卡实际收入
      // 营业
      tOperExpenses: 0, //营业总支出
      giveBackCount_C: 0, //会员退卡张数
      giveBackMoney_C: 0, //退卡退回现金
      RefCount: 0, //退赔笔数
      RefMoney: 0, //退赔退回现金
      OrderAbandon: 0, //撤单笔数
      WithdrawalTotal: 0, //撤单订单总额
      WithdrawalCashBack: 0,//撤单退回现金
      WithdrawalCard: 0,//撤单退回卡金额
      RefCardMoney: 0, //退赔退回卡金额
      openMoney: 0, //营业额
      // 入账
      realMoney: 0, //实际总入账
      CashMoney_G: 0, //现金总入账
      cashMoney_C: 0, //卡现金
      CashMoney_W: 0, //洗护现金
      CashMoney_GB: 0, //现金支出
      WeChatMoney_C: 0, //卡微信入账
      WeChatMoney_W: 0, //洗护微信入账
      WeChatMoney_G: 0, //微信总计
      AliPayMoney_W: 0, //洗护支付宝入账
      AliPayMoney_C: 0, //卡支付宝入账
      AliPayMoney_G: 0, //支付宝总计
      OtherMoney_W:0, //洗护其他入账
      OtherMoney_C: 0, //卡其他入账
      OtherMoney_G: 0, //其他总入账
      // 订单统计
      totalCount: 0, //收件总数
      washOrderCount: 0, //收入洗护单
      cardCloths: 0, //卡支付件数
      takeObjectCount: 0, //取件总数
      takeWashorderCount: 0, //取走洗护单
      noCardCloths: 0, //非卡支付
      noPayCloths: 0, //未支付
      // 查询
      val1:"",
      val2:"",
      view1:"",
      view2:"",
      value1:"",
      value2:"",
      dialogFormVisible: false,
      select1_l:"全部员工",
      select1_v:null,
      select2_l:"全部店铺",
      select2_v:null,
      optionsW:[],
      optionsS:[],
      workerData:[],
      worker:null,
      shopData:[],
      shop:null
    }
  },
  created() {
    this.getShop()
    this.getWorker();
    this.getTime();
    this.search(this.value1, this.value2, this.worker, this.shop);
  },
  methods: {
    getTime() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.view1 = year + seperator1 + month + seperator1 + strDate;
      this.view2 = year + seperator1 + month + seperator1 + strDate;
      this.getTimeData();
    },
    getTimeData() {
      var date = new Date();
      let getData = this.$Common;
      var seperator2 = ":";
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      hour = (hour != 0 && hour < 10) ? '0' + hour : hour = hour;
      minute = (minute < 10) ? '0' + minute : minute = minute;
      second = (second < 10) ? '0' + second : second = second;
      if(getData.sTime){
        let hour1 = getData.sTime.split(" ")[1].split(":")[0];
        if(hour1 == "00") {
          hour1 = "0";
        };
        this.value1 = getData.sTime;
        this.view1 = getData.sTime.split(" ")[0] + " " + hour1 + "时";
      }else{
        this.value1 = this.view1 + " 00:00:00";
        this.view1 = this.view1 + " 0时";
      }
      if(getData.eTime){
        let hour2 = getData.eTime.split(" ")[1].split(":")[0];
        if(hour2 == "00") {
          hour2 = "0";
        };
        this.value2 = getData.eTime;
        this.view2 = getData.eTime.split(" ")[0] + " " + hour2 + "时";
      }else{
        this.value2 = this.view2 + " " + hour + seperator2 + minute + seperator2 + second;
        this.view2 = this.view2 + " " + hour + "时";
      }
      this.getData();
    },
    getData(){
      let getData = this.$Common;
      if(getData.Shop){
        this.shop = getData.Shop;
      }
      if(getData.Worker){
        this.worker = getData.Worker;
      }
    },
    getWorker() {
      let Client = localStorage.getItem("ClientAddr");
      let getCGSWorker = axios.getWorker(Client);
      getCGSWorker.then((res) => {
        if(res.data.State == '成功'){
          this.workerData = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    getShop() {
      let Client = localStorage.getItem("ClientAddr");
      let getShop = axios.getShop(Client);
      getShop.then((res) => {
        if(res.data.State == '成功'){
          this.shopData = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    search(sTime,eTime,wNo,sNo) {
      let Client = localStorage.getItem("ClientAddr");
      let startTime = sTime;
      let endTime = eTime;
      let WorkerNo = wNo;
      let ShopNo = sNo;
      let searchOS = axios.searchOS(Client,startTime,endTime,WorkerNo,ShopNo);
      searchOS.then((res) => {
        if(res.data.State == '成功'){
          this.allData = res.data.Body;
          this.calculation();
          this.commData();
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    calculation() {
      let data = this.allData;
      let allSum = 0;
      //洗护
      this.totalPrice = data.WashOrderIncome.TotalPrice; //付款单总额
      this.notPayment = data.WashOrderIncome.non_payment; //未付款单总额
      this.CardPayMoney_W = data.WashOrderIncome.CardPayMoney; //会员卡实付额
      this.CardDiscMoney = data.WashOrderIncome.cardDiscMoney; //卡折扣优惠
      this.Coupon = data.WashOrderIncome.Coupon; //优惠券
      this.tempDiscMoney = data.WashOrderIncome.tempDiscMoney; // 临时折扣优惠
      this.CashMoney = parseFloat(data.WashOrderIncome.WeChatMoney) + parseFloat(data.WashOrderIncome.AliPayMoney) + parseFloat(data.WashOrderIncome.CompanyNetMoney) + parseFloat(data.WashOrderIncome.CashMoney); // 洗护现金收入
      this.TotalOrder = parseFloat(data.WashOrderIncome.TotalPrice) + parseFloat(data.WashOrderIncome.non_payment) // 订单总额
      this.TotalDiscount = parseFloat(data.WashOrderIncome.cardDiscMoney) + parseFloat(data.WashOrderIncome.Coupon) + parseFloat(data.WashOrderIncome.tempDiscMoney) // 优惠总额
        //实际支付总额
      this.washTotalMoney = data.WashOrderIncome.payMoney
      this.tableData = data.WashOrderIncome.ObjectInfo; //洗护表格
      //会员卡
      this.DebitMoney_C = data.CardIncome.DebitMoney; //卡扣款金额
      this.DispatchCount_C = data.CardIncome.DispatchCount; //新发卡数
      this.GiveValue_C = data.CardIncome.GiveValue; //卡赠送总额
      this.RechargeCount_C = data.CardIncome.RechargeCount; //卡充值张数
      this.RechargeValue_C = data.CardIncome.RechargeValue; //卡充值总额
      this.gbMoney_C = data.CardIncome.gbMoney; //卡工本费
        //会员卡实际收入 = 卡充值 + 卡工本费
      this.vipTotalMoney = parseFloat(data.CardIncome.RechargeValue) + parseFloat(data.CardIncome.gbMoney); //会员卡实际收入
      //营业
      this.giveBackCount_C = data.CardIncome.giveBackCount; //会员退卡张数
      this.giveBackMoney_C = parseFloat(data.CardIncome.giveBackMoney); //退卡退回现金
      this.RefMoney = parseFloat(data.WashOrderIncome.RefMoney); //退赔退回现金
      this.RefCount = data.WashOrderIncome.RefCount; //退赔笔数
      this.OrderAbandon = data.WashOrderIncome.AbandonCount; //撤单笔数
      this.WithdrawalTotal = parseFloat(data.WashOrderIncome.RefWashOrderValue); //撤单订单总额
      this.WithdrawalCashBack = parseFloat(data.WashOrderIncome.AbandonMoney); //撤单退回现金
      this.WithdrawalCard = parseFloat(data.WashOrderIncome.AbandonCardMoney); //撤单退回卡金额
      this.RefCardMoney = data.WashOrderIncome.RefCardMoney; //退赔退回卡金额
        //营业总支出 = 退赔退回现金 + 退回卡金额
      this.tOperExpenses = parseFloat(data.WashOrderIncome.AbandonMoney) + parseFloat(data.WashOrderIncome.RefMoney) + parseFloat(data.CardIncome.giveBackMoney);//营业总支出
        //营业额 = (付款单总额 + 卡充值总额 + 卡工本费 + 卡扣款金额 + 未付款单总额) - (退赔退回现金 + 退卡退回现金 + 退回卡金额)
      this.openMoney = (parseFloat(data.WashOrderIncome.TotalPrice) + parseFloat(data.CardIncome.RechargeValue) + parseFloat(data.CardIncome.gbMoney) + parseFloat(data.CardIncome.DebitMoney) + parseFloat(data.WashOrderIncome.non_payment)) - (parseFloat(data.WashOrderIncome.RefWashOrderValue) + parseFloat(data.WashOrderIncome.RefMoney) + parseFloat(data.CardIncome.giveBackMoney) + parseFloat(data.WashOrderIncome.RefCardMoney)); //营业额
      //入账
      this.CashMoney_G = parseFloat(data.WashOrderIncome.CashMoney) + parseFloat(data.CardIncome.CashMoney) - parseFloat(data.CardIncome.giveBackMoney) - parseFloat(data.WashOrderIncome.AbandonMoney) - parseFloat(data.WashOrderIncome.RefMoney) //现金总入账
      this.cashMoney_C = data.CardIncome.CashMoney; //卡现金
      this.CashMoney_W = data.WashOrderIncome.CashMoney; //洗护现金
        //现金支出 = 退赔退回现金 + 退卡退回现金
      this.CashMoney_GB = parseFloat(data.CardIncome.giveBackMoney) + parseFloat(data.WashOrderIncome.RefMoney) + parseFloat(data.WashOrderIncome.AbandonMoney); //现金支出
      this.WeChatMoney_C = data.CardIncome.WeChatMoney; //卡微信入账
      this.WeChatMoney_W = data.WashOrderIncome.WeChatMoney; //洗护微信入账
      this.WeChatMoney_G = parseFloat(data.CardIncome.WeChatMoney) + parseFloat(data.WashOrderIncome.WeChatMoney); //微信总入账
      this.AliPayMoney_C = data.CardIncome.AliPayMoney; //卡支付宝入账
      this.AliPayMoney_W = data.WashOrderIncome.AliPayMoney;//洗护支付宝入账
      this.AliPayMoney_G = parseFloat(data.CardIncome.AliPayMoney) + parseFloat(data.WashOrderIncome.AliPayMoney); //支付宝总入账
      this.OtherMoney_C = data.CardIncome.OtherMoney; //卡其他入账
      this.OtherMoney_W = data.WashOrderIncome.CompanyNetMoney; //洗护其他入账
        //其他总入账 = 卡其他入账 + 洗护其他入账
      this.OtherMoney_G = parseFloat(data.CardIncome.OtherMoney) + parseFloat(data.WashOrderIncome.CompanyNetMoney); //其他总入账
        //实际总入账 = 充值现金 + 洗护现金 - 现金支出 + 支付宝总入账 + 微信总入账 + 其他总入账 - 退赔退回现金
      this.realMoney = parseFloat(data.CardIncome.CashMoney) + parseFloat(data.WashOrderIncome.CashMoney) - parseFloat(data.CardIncome.giveBackMoney) -   parseFloat(data.WashOrderIncome.AbandonMoney) - parseFloat(data.WashOrderIncome.RefMoney) + parseFloat(data.WashOrderIncome.AliPayMoney) + parseFloat(data.CardIncome.AliPayMoney) + parseFloat(data.WashOrderIncome.WeChatMoney) + parseFloat(data.CardIncome.WeChatMoney) + parseFloat(data.WashOrderIncome.CompanyNetMoney) + parseFloat(data.CardIncome.OtherMoney) //实际总入账
      //订单统计
      this.washOrderCount = data.WashOrderIncome.WashOrderCount; //收入洗护单
      this.cardCloths = data.WashOrderIncome.CardCloths; //卡支付件数
      this.takeObjectCount = data.WashOrderIncome.take_object_count; //取件总数
      this.takeWashorderCount = data.WashOrderIncome.take_washorder_count; //取走洗护单
      this.noCardCloths = data.WashOrderIncome.NoCardCloths; //非卡支付
      this.noPayCloths = data.WashOrderIncome.NoPayCloths; //未支付
      for(let i = 0; i < data.WashOrderIncome.ObjectInfo.length; i ++){
        allSum += data.WashOrderIncome.ObjectInfo[i].servicecount;
      }
      this.totalCount = allSum; //收件总数
    },
    commData() {
      this.$Common.sTime = this.value1;
      this.$Common.eTime = this.value2;
      this.$Common.Shop = this.shop;
      this.$Common.Worker = this.worker;
    },
    workerOptions(){
      if(this.optionsW.length == 0) {
        if(this.workerData.length != 0){
          for(let i=0;i<this.workerData.length;i++){
            this.optionsW.push({value:this.workerData[i].No,label:this.workerData[i].Name});
          }
        }
      }
    },
    shopOptions(){
      if(this.optionsS.length == 0) {
        if(this.shopData.length != 0){
          for(let i=0;i<this.shopData.length;i++){
            this.optionsS.push({value:this.shopData[i].ShopNo,label:this.shopData[i].Name});
          }
        }
      }
    },
    getSearch() {
      this.workerOptions();
      this.shopOptions();
      this.val1 = this.worker;
      this.val2 = this.shop;
      this.dialogFormVisible = true;
    },
    searchData() {
      let hour1 = this.value1.split(" ")[1].split(":")[0];
      let hour2 = this.value2.split(" ")[1].split(":")[0];
      if(hour1 == "00") {
        hour1 = "0";
      };
      if(hour2 == "00") {
        hour2 = "0";
      }
      this.view1 = this.value1.split(" ")[0] + " " + hour1 + "时";
      this.view2 = this.value2.split(" ")[0] + " " + hour2 + "时";
      let startT = this.value1;
      let endT = this.value2;
      let workerN = this.val1;
      this.worker = this.val1;
      let shopN = this.val2;
      this.shop = this.val2;
      this.search(startT,endT,workerN,shopN);
      this.dialogFormVisible = false;
    },
    go(url) {
      this.$router.push({path: url});
    }
  }
}
</script>

<style scoped>
#OpenStatistics{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

/* 查询 */
.borderS{
   border-bottom: 1px solid #E0E0E0;
}
.time{
  font-size: 14px;
  color: #727377;
  line-height: 26px;
}
/* 总统计 */
.t_text h3{
  margin: 5px;
  font-family: 'Courier New', Courier, monospace;
}
.t_text span{
  color: green;
}
/* 标题 */
.title1,.title2{
  font-weight: bold;
  font-size: 16px;
}
.title2 span{
  color: red;
}
.border-title{
  width: 100%;
  overflow: hidden;
}
.text-title{
  width: 95%;
  float: right;
}
/* 内容 */
.border{
  width: 100%;
  margin: 0px;
  overflow: hidden;
  border-top: 1px solid #E0E0E0;
}
.border_N{
  width: 100%;
  margin: 0px;
  overflow: hidden;
}
.text{
  width: 95%;
  float: right;
  font-size: 14px;
}
.text1{
  text-align: left;
}
.text2{
  text-align: right;
}
.text3{
  width: 21px;
  text-align: right;
}
.order_text{
  font-weight: bold;
}
/* 统计 */
.order{
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  color: #576573;
}
.order_span{
  color: red;
}
/* 弹框 */
.block{
  margin-bottom: 10px;
  overflow: hidden;
}
.block-text{
  text-align: left;
  font-size: 14px;
  margin: 0px;
  margin-bottom: 5px;
}
.left{
  float: left;
}
</style>