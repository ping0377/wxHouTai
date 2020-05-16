<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="12" :xs="24">
        <el-card class="box-card" style="width:100%">
          <div slot="header" class="clearfix">
            <span>公众号首页设置</span>
          </div>
          <div class="text">轮播图设置(3张)</div>
          <div class="demo-image">
            <div class="block" v-for="(fit,index) in indexbanner" :key="index">
              <img :src="fit" alt style="width:100px;height:100px;" />
              <el-button type="primary" size="mini" @click="deleimg(fit)">删除</el-button>
            </div>
          </div>
          <el-upload action="#" list-type="picture-card" align="left" :http-request="addbanners">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span
                  v-show="disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <div class="text item">主页优惠左图片设置</div>
          <el-upload
            class="avatar-uploader"
            action="#"
            align="left"
            :http-request="addIndexLeftImg"
          >
            <img
              v-if="IndexLeftImg"
              :src="IndexLeftImg"
              class="avatar"
              style="width:150px;height:120px;"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="text item">主页优惠右图片设置</div>
          <el-upload
            class="avatar-uploader"
            action="#"
            align="left"
            :http-request="addIndexRightImg"
          >
            <img
              v-if="IndexRightImg"
              :src="IndexRightImg"
              class="avatar"
              style="width:150px;height:120px;"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="text item">主页城市区域设置(可多选)</div>
          <el-select
            v-model="Provinces"
            style="width:100%"
            align="left"
            multiple
            placeholder="公众号搜索区域设置"
            @change="changeProvinces"
          >
            <el-option
              v-for="item in AllProvinces"
              :key="item.No"
              :label="item.Name"
              :value="item.No"
            ></el-option>
          </el-select>
        </el-card>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-card class="box-card" style="width:100%">
          <div slot="header" class="clearfix">
            <span>公众号预约设置</span>
          </div>
          <div class="text">预约件数设置(数字)</div>
          <el-input placeholder="输入预约最低件数" v-model="OrderClothsSum"></el-input>
          <div class="text">预约时间设置</div>
          <p
            v-for="(item,index) in timeArr"
            :key="index"
            align="left"
            style="paddingLeft:20px;"
          >{{item.time}}</p>
          <el-input placeholder="请输入上面格式的时间" v-model="strEndtime"></el-input>
          <div class="text">预约页面顶部图片设置(1张)</div>
          <el-upload class="avatar-uploader" action="#" align="left" :http-request="yuyuetop">
            <img
              v-if="OrderTittleImg"
              :src="OrderTittleImg"
              align="left"
              style="width:150px;height:120px;marginLeft:20px;"
            />
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
          <div class="text">预约方式设置</div>
          <el-switch
            v-model="isShop"
            active-text="开通店铺预约"
            inactive-text="不开通"
            @change="changeShopstate()"
            style="marginTop:10px;width:200px;marginRight:200px"
          ></el-switch>
          <br />
          <el-switch
            v-model="isPoint"
            active-text="开通店铺收衣点"
            inactive-text="不开通"
            @change="changePointstate()"
            style="marginTop:20px;width:200px;marginRight:200px"
          ></el-switch>
          <br />
          <el-switch
            v-model="isExpress"
            active-text="开通店铺快递柜"
            inactive-text="不开通"
            @change="changeExpressstate()"
            style="marginTop:20px;width:200px;marginRight:200px"
          ></el-switch>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :xs="24">
        <el-card class="box-card" style="width:100%">
          <div slot="header" class="clearfix">
            <span>公众号分享设置</span>
          </div>
          <div class="text">微信分享标题</div>
          <el-input placeholder="输入微信分享标题" v-model="ShareTittle"></el-input>
          <div class="text">微信分享描述</div>
          <el-input placeholder="输入微信分享描述" v-model="ShareRemark"></el-input>
          <div class="text">积分兑换比例</div>
          <el-input placeholder="输入积分兑换比例" v-model="RechargeUseInteusePercent"></el-input>
          <div class="text">微信分享图标(点击图片重新上传)</div>
          <el-upload class="avatar-uploader" action="#" align="left" :http-request="fxShareIcon">
            <img v-if="ShareIcon" :src="ShareIcon" class="avatar" style="width:150px;height:150ox;" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-card>
      </el-col>
    </el-row>
    <el-button
      type="primary"
      style="position:fixed;bottom:25px;left:20%;width:60%"
      @click="saveSet"
    >保存设置</el-button>
  </div>
</template>
<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      AllProvinces: [], //后台获取全部城市数据渲染
      Provinces: [], //城市  v-model   up
      strEndtime: "", //预约时间选择
      timeArr: [], //时间数组
      disabled: false,
      indexbanner: [], //轮播图数组
      OrderClothsSum: "", //预约件数
      alldataobj: [], //所有的数据，是一个数组
      ShareTittle: "", // 微信分享标题
      ShareRemark: "", //微信分享描述
      RechargeUseInteusePercent: "", //积分
      ShareIcon: "", //分享图标
      // fximageUrl: "", //分享图标
      OrderTittleImg: "", //预约界面头部照片
      IndexLeftImg: "", // 主页优惠左边照片
      IndexRightImg: "", //主页优惠右边图片
      SeachAreaScope: "", //公众号区域设置
      isShop: false, //  店铺预约
      isPoint: false, // 收衣点
      isExpress: false, //快递柜
      bannners:{
        Header:[]
      }
    };
  },
  mounted() {
    this.getallProvinces();
    this.getAlldata();
  },
  methods: {
    changeShopstate() {},
    changePointstate() {},
    changeExpressstate() {},
    // 删除轮播图
    deleimg(fit) {
      //  console.log(fit)
      let Client = localStorage.getItem("ClientAddr");
      let data = this.indexbanner;
      for (let i = 0; i < data.length; i++) {
        if (data[i] == fit) {
          data.splice(i, 1);
        }
      }
      let changeImg = axios.changeImg(Client, data);
      changeImg.then(res => {
        if (res.data.State == "成功") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 获取所有的设置信息
    getAlldata() {
      let Client = localStorage.getItem("ClientAddr");
      let getSetting = axios.getSetting(Client);
      getSetting.then(res => {
        console.log(res); //  返回的数据
        if (res.data.State == "成功") {
          this.alldataobj = res.data.Body;
          let data = res.data.Body;
          data.map(item => {
            if (item.Name == "MainPageData"&&item.Value) {
              let indexbanner = item.Value;
              this.indexbanner = JSON.parse(indexbanner).Header;
              this.bannners.Header=this.indexbanner;
            } else if (item.Name == "OrderClothsSum") {
              this.OrderClothsSum = item.Value;
            } else if (item.Name == "ShareTittle") {
              this.ShareTittle = item.Value;
            } else if (item.Name == "ShareRemark") {
              this.ShareRemark = item.Value;
            } else if (item.Name == "RechargeUseInteusePercent") {
              this.RechargeUseInteusePercent = item.Value;
            } else if (item.Name == "ShareIcon") {
              this.ShareIcon = item.Value;
              // console.log(this.ShareIcon, "ShareIcon");
            } else if (item.Name == "OrderTittleImg") {
              this.OrderTittleImg = item.Value;
            } else if (item.Name == "IndexLeftImg") {
              this.IndexLeftImg = item.Value;
            } else if (item.Name == "IndexRightImg") {
              this.IndexRightImg = item.Value;
            } else if (item.Name == "SeachAreaScope") {
              console.log(JSON.parse(item.Value))
              this.Provinces=JSON.parse(item.Value)
              this.SeachAreaScope = item.Value;
            } else if (item.Name == "funSetting") {
              // 预约方式设置
              let shopSetting = JSON.parse(item.Value);
              // let shopSetting = item.Value;
              shopSetting.map(item => {
                if (item.isShop) {
                  this.isShop = item.isShop;
                } else if (item.isPoint) {
                  this.isPoint = item.isPoint;
                } else if (item.isExpress) {
                  this.isExpress = item.isExpress;
                }
              });
            } else if (item.Name == "OrderDate") {
              // 预约时间
              // console.log(JSON.parse(item.Value), "time");
              this.timeArr = JSON.parse(item.Value);
            }
          });
        }
      });
    },
    // 选择的时间
    changeTime() {
      console.log(this.strEndtime);
    },
    // 选择城市
    changeProvinces() {
      console.log(this.Provinces);
      
    },
    // 添加轮播图
    addbanners(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.indexbanner.push(res.data.Body);
          this.bannners.Header= this.indexbanner;
          // console.log(this.upbanner, "upbanner");
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 后台获取城市区域数据
    getallProvinces() {
      let Client = localStorage.getItem("ClientAddr");
      let url = "app.ashx?Function=HttpQueryAllProvinces";
      let getallProvinces = axios.getallProvinces(url, Client);
      getallProvinces.then(res => {
        console.log(res, "所有省份");
        this.AllProvinces = res.data.Body;
      });
    },

    // 主页优惠左边图片
    addIndexLeftImg(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.IndexLeftImg = res.data.Body;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 主页优惠右侧的图片
    addIndexRightImg(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.IndexRightImg = res.data.Body;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 预约顶部图片
    yuyuetop(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        console.log(res, "yuyue");
        if (res.data.State == "成功") {
          this.OrderTittleImg = res.data.Body;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 微信分享图标
    fxShareIcon(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.ShareIcon = res.data.Body;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    handleRemove(file) {
      console.log(file);
    },
    // 保存设置，提交
    saveSet() {
      let newdate = {
        time: this.strEndtime
      };
      if (this.strEndtime) {
        this.timeArr.push(newdate);
      }
      let indexbanner = {
        Name: "MainPageData",
        Value: JSON.stringify(this.bannners),
        Note: "首页轮播"
      };
      let set = [
        { isShop: this.isShop },
        { isPoint: this.isPoint },
        { isExpress: this.isExpress }
      ];
      let upfunSetting = {
        Name: "funSetting",
        Value: JSON.stringify(set),
        Note: "预约方式设置"
      };
      let leftImg = {
        Name: "IndexLeftImg",
        Value: this.IndexLeftImg,
        Note: "首页优惠左侧图"
      };
      let rightImg = {
        Name: "IndexRightImg",
        Value: this.IndexRightImg,
        Note: "首页优惠右侧图"
      };
      let OrderClothsSum = {
        Name: "OrderClothsSum",
        Value: this.OrderClothsSum,
        Note: "预约下单数量限制"
      };
      let OrderDate = {
        Name: "OrderDate",
        Value: JSON.stringify(this.timeArr),
        Note: "预约时间"
      };
      let OrderTittleImg = {
        Name: "OrderTittleImg",
        Value: this.OrderTittleImg,
        Note: "预约页面顶部图片"
      };
      let RechargeUseInteusePercent = {
        Name: "RechargeUseInteusePercent",
        Value: this.RechargeUseInteusePercent,
        Note: "积分兑换比例"
      };
      let SeachAreaScope = {
        Name: "SeachAreaScope",
        Value: JSON.stringify(this.Provinces),
        Note: "公众号搜索区域设置"
      };
      let ShareIcon = {
        Name: "ShareIcon",
        Value: this.ShareIcon,
        Note: "微信分享图标"
      };
      let ShareRemark = {
        Name: "ShareRemark",
        Value: this.ShareRemark.toString(),
        Note: "微信分享描述"
      };
      let ShareTittle = {
        Name: "ShareTittle",
        Value: this.ShareTittle,
        Note: "微信分享标题"
      };
      let upallDate = [
        indexbanner,
        upfunSetting,
        leftImg,
        rightImg,
        OrderClothsSum,
        OrderDate,
        OrderTittleImg,
        RechargeUseInteusePercent,
        SeachAreaScope,
        ShareIcon,
        ShareRemark,
        ShareTittle
      ];
      // console.log(upallDate);
      let Client = localStorage.getItem("ClientAddr");
      let url = "Manager.ashx?Function=HttpSetStaticValue";
      let updatemsg = axios.updatemsg(url, Client, upallDate);
      updatemsg.then(res => {
        // console.log(res, "updatemsg");
        if (res.data.State == "成功") {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          this.getAlldata();
        } else {
          this.$message({
            message: res.data.Reason,
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.demo-image {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}
.block {
  width: 130px;
  height: 130px;
  margin-right: 20px;
  padding: 5px;
  border: 1px dashed #ccc;
}
.text {
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  text-align: left;
  font-weight: bold;
  border-left: 3px solid #000e1e;
  padding-left: 20px;
}
.clearfix{
  background-color:aqua ;
}
.clearfix span {
  font-size: 20px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.box-card {
  width: 480px;
}
.container {
  width: 98%;
  margin: 0 auto;
  padding: 5px;
}
</style>