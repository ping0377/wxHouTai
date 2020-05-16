<template>
  <div id="Management">
    <div class="ab">
      <el-row>
        <el-col>
          <el-menu id="shopnav" :default-active="active" mode="horizontal">
            <el-menu-item index="1" @click="store()">普通店铺</el-menu-item>
            <el-menu-item index="2" @click="income()">收衣点店铺</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <!-- 查询 -->
      <el-row class="border">
        <el-col :span="12" class="time">
          <span>{{view1}}</span>
        </el-col>
        <el-col class="right" :span="6">
          <div style="width: 100%;">
            <el-button
              type="text"
              class="search"
              style="width: 100%; padding: 5px;"
              @click="getSearchM()"
            >查 询</el-button>
          </div>
        </el-col>
      </el-row>
      <div v-show="inquire">
        <!-- <el-row>
        <el-col :span="20" :offset="2">
          <el-input v-model="inquireNum" size="small" placeholder="请输入店铺号">
            <template slot="prepend" class="query">店铺号查询</template>
          </el-input>
        </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="20" :offset="2">
            <el-input v-model="inquireAddr" size="small" :placeholder="`请输入`+queryone">
              <template slot="prepend">{{queryone}} 查 询</template>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <!-- 表格 —— 店铺 -->
      <el-table
        ref="filterTable"
        :data="tableData | shopNofilter"
        style="width: 100%"
        height="calc(100vh - 94px)"
        v-show="storeshow"
      >
        <el-table-column label="图标" align="center" min-width="110" fit="true">
          <template slot-scope="scope">
            <img :src="scope.row.ImageUrl" id="viewImg" alt="Image" @error="showDefImage" />
          </template>
        </el-table-column>
        <el-table-column
          prop="No"
          label="店铺号"
          align="center"
          min-width="65"
          fit="true"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="Name"
          label="名称"
          align="center"
          min-width="80"
          fit="true"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center" min-width="65" fit="true">
          <template slot-scope="scope">
            <el-popover placement="left" trigger="click">
              <div>
                <el-button type="text" size="small" @click="getData(scope.row)">详情</el-button>
                <el-button type="text" size="small" @click="changeData(scope.row,false)">设置</el-button>
              </div>
              <el-button type="text" slot="reference">操作</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 —— 收衣店铺-->
      <el-table
        ref="filterTable"
        :data="allShop | shopNofilter"
        style="width: 100%"
        height="calc(100vh - 200px)"
        v-show="incomeshow"
      >
        <el-table-column label="图标" align="center" min-width="110" fit="true">
          <template slot-scope="scope">
            <img :src="scope.row.ImageUrl" id="viewImg" @error="showDefImage" />
          </template>
        </el-table-column>
        <el-table-column
          prop="No"
          label="店铺号"
          align="center"
          min-width="65"
          fit="true"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="Name"
          label="店名"
          align="center"
          min-width="80"
          fit="true"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center" min-width="65" fit="true">
          <template slot-scope="scope">
            <el-popover placement="left" trigger="click">
              <div>
                <el-button type="text" size="small" @click="dltIncole(scope.row)">删除</el-button>
                <el-button type="text" size="small" @click="getData(scope.row)">详情</el-button>
                <el-button type="text" size="small" @click="changeData(scope.row,true)">修改</el-button>
              </div>
              <el-button type="text" slot="reference">操作</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-row v-show="incomeshow">
        <el-col :span="24">
          <el-button @click="showIncome()" class="showIncome" type="primary" round>添加收衣点店铺</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogFormVisible1" fullscreen>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">店铺号:</dd>
        <dd class="item2 xqfl2">{{No}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">名称:</dd>
        <dd class="item2 xqfl2">{{Name}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">负责人:</dd>
        <dd class="item2 xqfl2">{{perInCharge}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">电话:</dd>
        <dd class="item2 xqfl2">{{contectTel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">电子邮箱:</dd>
        <dd class="item2 xqfl2">{{email}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1">简介图片:</dd>
        <dd class="item2">
          <br />
          <img :src="detailsImageUrl" id="detailsImg" alt="Image" @error="showDefImage" />
        </dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">地址:</dd>
        <dd class="item2 xqfl2">{{shopAdd}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">店铺简介:</dd>
        <br />
        <dd class="item2 xqfl2 abstract">
          <div class="ql-snow">
            <div class="ql-editor" ref="mianD" v-html="briefInfo"></div>
          </div>
        </dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">管理员编号:</dd>
        <dd class="item2 xqfl2">{{ManagerNo}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">图标:</dd>
        <dd class="item2">
          <img :src="ImageUrl" id="Img" alt="Image" @error="showDefImage" />
        </dd>
      </dl>
    </el-dialog>
    <!-- 设置弹窗 -->
    <div class="a" style="margin:30px;display:none">
      <!-- <el-dialog title="修改" :visible.sync="dialogFormVisible2" fullscreen> -->
      <p>修改</p>
      <!-- <dl class="text">
        <dd class="item1">店铺号:</dd>
        <dd class="item">{{C_No}}</dd>
      </dl>-->
      <dl class="text">
        <dd class="item1">名称:</dd>
        <dd class="item">
          <el-input v-model="C_Name" style="width: 90%" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">负责人:</dd>
        <dd class="item">
          <el-input v-model="C_perInCharge" style="width: 90%" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">电话:</dd>
        <dd class="item">
          <el-input v-model="C_contectTel" style="width: 90%" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">电子邮箱:</dd>
        <dd class="item">
          <el-input v-model="C_email" style="width: 90%" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item">
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="upImg1"
            list-type="picture"
            accept=".jpeg, .png, .gif, .jpg"
            :limit="1"
            ref="upload1"
          >
            <span style="text-align: left;">简介图片:</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">地址:</dd>
        <dd class="item">
          <el-input
            v-model="C_shopAdd"
            type="textarea"
            resize="none"
            clearable
            style="min-height:22px;width:82%"
            id="yongchedidian"
            @focus="map_"
          ></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          店铺简介：
          <span class="infodepict" @click="detailedDescription = true">点击描述详情</span>
        </dd>
        <dd class="item">
          <div class="ql-snow">
            <div class="ql-editor" ref="mianChange" v-html="C_briefInfo"></div>
          </div>
        </dd>
      </dl>
      <dl class="text" v-show="up">
        <dd class="item1">提成比例:</dd>
        <dd class="item">
          <el-input v-model="scale" style="width: 90%" clearable placeholder="输入提成比例,范围为 0 ~ 0.99"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">管理员编号:</dd>
        <dd class="item">
          <el-select v-model="C_ManagerNo" style="width: 90%" placeholder="请选择管理员编号">
            <el-option
              v-for="item in optionsW"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item">
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="upImg2"
            list-type="picture"
            accept=".jpeg, .png, .gif, .jpg"
            :limit="1"
            ref="upload2"
          >
            <span style="text-align: left;">图标:</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button id="add" type="primary" @click="upData()">修 改</el-button>
      </span>
    </div>
    <!-- 添加弹窗 -->
    <div class="b" style="margin:30px;display:none">
      <!-- <el-dialog title="添加收衣店铺" :visible.sync="dialogFormVisible4" fullscreen> -->
      <p>添加洗衣点店铺</p>
      <dl class="text">
        <dd class="item1">店铺名称:</dd>
        <dd class="item">
          <el-input
            v-model="incName"
            class="inp"
            size="mini"
            style="width: 90%"
            @blur="addHint(`hint1`,`名称`)"
            clearable
          ></el-input>
          <span class="hint" id="hint1"></span>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">负责人:</dd>
        <dd class="item">
          <el-input
            v-model="incperInCharge"
            class="inp"
            size="mini"
            style="width: 90%"
            @blur="addHint(`hint2`,`负责人`)"
            clearable
          ></el-input>
          <span class="hint" id="hint2"></span>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">联系电话:</dd>
        <dd class="item">
          <el-input
            v-model="incContectTel"
            class="inp"
            size="mini"
            style="width: 90%"
            @blur="addHint(`hint3`,`联系电话`)"
            clearable
          ></el-input>
          <span class="hint" id="hint3"></span>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">邮箱:</dd>
        <dd class="item">
          <el-input
            v-model="incEmail"
            class="inp"
            size="mini"
            style="width: 90%"
            @blur="addHint(`hint4`,`邮箱`)"
            clearable
          ></el-input>
          <span class="hint" id="hint4"></span>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item">
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="upImg2"
            list-type="picture"
            accept=".jpeg, .png, .gif, .jpg"
            :limit="1"
            ref="upload2"
            id="addDimg"
          >
            <span style="text-align: left;">店铺图标:</span>
            <el-button size="small" type="primary">点击上传</el-button>
            <div class="prompt">只能上传jpg/png文件，且不超过1M</div>
          </el-upload>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item">
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="upImg1"
            list-type="picture"
            accept=".jpeg, .png, .gif, .jpg"
            :limit="1"
            ref="upload1"
            id="addJimg"
          >
            <span style="text-align: left;">简介图片:</span>
            <el-button size="small" type="primary">点击上传</el-button>
            <div class="prompt">只能上传jpg/png文件，且不超过1M</div>
          </el-upload>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">详细地址:</dd>
        <dd class="item">
          <!-- <el-input v-model="incShopAdd" class="inp" size="mini" style="width: 90%" @blur="addHint(`hint7`,`地址`)" clearable ></el-input> -->
          <el-input
            v-model="incShopAdd"
            class="inp"
            size="mini"
            type="textarea"
            clearable
            id="tj_map"
            @focus="map_1"
            style="min-height:22px;width:82%"
          ></el-input>
          <span class="hint" id="hint7"></span>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          店铺简介：
          <span class="infodepict" @click="detailedDescription = true">点击描述详情</span>
        </dd>
        <dd class="item">
          <div class="ql-snow">
            <div class="ql-editor" ref="mianAdd"></div>
          </div>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button id="add" type="primary" :plain="true" @click="addInc('addDimg','addJimg')">添 加</el-button>
      </span>
    </div>
    <el-dialog title="店铺简介编辑" :visible.sync="detailedDescription" fullscreen>
      <el-upload
        class="avatar-uploader"
        action="#"
        :http-request="quillUpImg"
        :headers="header"
        :show-file-list="false"
      ></el-upload>
      <quill-editor v-model="incBriefInfo" :options="editorOption" ref="myQuillEditor"></quill-editor>
      <div class="details">
        <el-button type="info" plain @click="detailedDescription = false">关闭</el-button>
        <el-button type="primary" plain @click="getDetails">确定</el-button>
      </div>
    </el-dialog>
    <!-- 地图 -->
    <el-dialog title="选择地址" :visible.sync="map" fullscreen></el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";

let that;
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ align: [] }], // 对齐方式
  ["link", "image"], // 链接、图片、视频
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  ["clean"] // 清除文本格式
];
export default {
  inject: ["reload"],
  data() {
    return {
      map: false,
      info: true,
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        placeholder: "编辑详情描述",
        modules: {
          toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      detailedDescription: false,
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      href:
        "http://apis.map.qq.com/tools/locpicker?search=1&type=0&key=7Y7BZ-YWG6D-R3O4A-P45VJ-7EEYK-XPBIF&referer=myapp",
      active: "1",
      inquire: false,
      inquireNum: "",
      inquireAddr: "",
      queryone: `店 名`,
      // 收衣点修改
      up: "",
      chIncId: "", //编号
      chIncNo: "", //店铺号
      chIncName: "", //名称
      chIncAddress: "", //地址
      incoDetails: false,
      allShop: [], //所有收衣点
      incaddress: "", //地址
      storeshow: true, //店铺
      incomeshow: false, //收衣店铺
      //收衣店铺添加
      incFkshopNo: "", //收衣店铺号
      incManagerNo: "", //管理员编号
      //添加收衣店铺所需信息
      incName: "", //收衣店铺名称
      incperInCharge: "", //负责人
      incContectTel: "", //联系电话
      incEmail: "", //邮箱
      incImageUrl: "", //店铺图标
      incdetailsImageUrl: "", //简介图片
      incBriefInfo: "", //店铺简介
      incDescribe: "", //店铺描述
      incShopAdd: "", //地址
      staffShow: false, //全部员工表格
      allData: [],
      tableData: [],
      dialogFormVisible1: false, // 详情
      dialogFormVisible2: false, // 设置
      dialogFormVisible3: false, // 查询
      dialogFormVisible4: false, // 添加
      //添加虚拟柜
      addNum: "", //编号
      addName: "", //名称
      addNo: "", //店铺号
      addAddress: "", //地址
      addtype: "虚拟柜",
      // 查询
      view1: "",
      view2: "",
      val1: "",
      val2: "",
      select1_l: "普通店铺",
      select1_v: null,
      select2_v: null,
      optionsW: [],
      optionsS: [],
      workerData: [],
      shopData: [],
      worker: null,
      shop: null,
      // 详情
      ImageUrl: "", // 图标
      ManagerNo: "", // 管理员编号
      Name: "", // 名称
      No: "", // 店铺号
      briefInfo: "", // 介绍
      contectTel: "", // 电话
      detailsImageUrl: "", // 简介图片
      email: "", // 电子邮箱
      perInCharge: "", // 负责人
      shopAdd: "", // 店铺地址
      // 设置
      C_ImageUrl: "", // 图标
      C_ManagerNo: "", // 管理员编号
      C_Name: "", // 名称
      C_No: "", // 编号
      C_briefInfo: "", // 介绍
      C_contectTel: "", // 电话
      C_detailsImageUrl: "", // 简介图片
      C_email: "", // 电子邮箱
      C_perInCharge: "", // 负责人
      options: [], // 店铺列表
      C_shopAdd: "", // 店铺地址
      lng: "",
      lat: "",
      x_lng: "",
      x_lat: "",
      scale: "",
      //修改前图标
      R_ImageUrl: "", //图标
      R_detailsImageUrl: "" //简介图片
    };
  },
  beforeMount() {
    that = this;
    this.getWorker();
    this.getShop();
    this.getAllData();
    let Base64 = require("js-base64").Base64;
  },
  mounted() {
    let uptype = localStorage.getItem("uptype");
    if (this.$route.query.type == "tianjia") {
      let dat = JSON.parse(Base64.decode(this.$route.query.obj));
      // this.dialogFormVisible4 = true;
      // $(".b").css("display", "block");
      this.active = "2";
      this.storeshow = false;
      this.incomeshow = true;
      this.storeshow = false;
      if (dat.incName != "") {
        this.incName = dat.incName;
      } else {
        this.$message.error("收衣店铺名称不能为空");
      }
      if (dat.incperInCharge != "") {
        this.incperInCharge = dat.incperInCharge;
      }
      if (dat.incContectTel != "") {
        this.incContectTel = dat.incContectTel;
      }
      if (dat.incEmail != "") {
        this.incEmail = dat.incEmail;
      }
      if (dat.C_ImageUrl != "") {
        this.C_ImageUrl = dat.C_ImageUrl;
      }
      if (dat.C_detailsImageUrl != "") {
        this.C_detailsImageUrl = dat.C_detailsImageUrl;
      }
      if (dat.incDescribe != "") {
        this.incDescribe = dat.incDescribe;
      }
      if (dat.incBriefInfo != "") {
        this.incBriefInfo = dat.incBriefInfo;
      }
      if (dat.No) {
        this.C_No = dat.No;
      }
    } else if (this.$route.query.type == "bianji" && uptype == "false") {
      this.dialogFormVisible2 = true;
      $(".a").css("display", "block");
      this.active = "1";
      if (dat.C_Name != "") {
        this.C_Name = dat.C_Name;
      }
      if (dat.C_perInCharge != "") {
        this.C_perInCharge = dat.C_perInCharge;
      }
      if (dat.C_contectTel != "") {
        this.C_contectTel = dat.C_contectTel;
      }
      if (dat.C_email != "") {
        this.C_email = dat.C_email;
      }
      if (dat.C_briefInfo != "") {
        this.C_briefInfo = unescape(dat.incBriefInfo);
      }
      if (dat.C_ManagerNo != "") {
        this.C_ManagerNo = dat.C_ManagerNo;
      }
      if (dat.C_detailsImageUrl != "") {
        this.C_detailsImageUrl = dat.C_detailsImageUrl;
      }
      if (dat.C_ImageUrl != "") {
        this.C_ImageUrl = dat.C_ImageUrl;
      }
      if (dat.No) {
        this.C_No = dat.No;
      }
    } else if (this.$route.query.type == "bianji" && uptype == "true") {
      this.income();
      this.dialogFormVisible2 = true;
      $(".a").css("display", "block");
      this.active = "2";
      if (dat.C_Name != "") {
        this.C_Name = dat.C_Name;
      }
      if (dat.C_perInCharge != "") {
        this.C_perInCharge = dat.C_perInCharge;
      }
      if (dat.C_contectTel != "") {
        this.C_contectTel = dat.C_contectTel;
      }
      if (dat.C_email != "") {
        this.C_email = dat.C_email;
      }
      if (dat.C_briefInfo != "") {
        this.C_briefInfo = unescape(dat.incBriefInfo);
      }
      if (dat.C_ManagerNo != "") {
        this.C_ManagerNo = dat.C_ManagerNo;
      }
      if (dat.C_detailsImageUrl != "") {
        this.C_detailsImageUrl = dat.C_detailsImageUrl;
      }
      if (dat.C_ImageUrl != "") {
        this.C_ImageUrl = dat.C_ImageUrl;
      }
      if (dat.scale != "") {
        this.scale = dat.scale;
      }
      if (dat.No != "") {
        this.C_No = dat.No;
      }
      if (dat.up != "") {
        this.up = true;
      }
    }
  },

  methods: {
    cancel() {
      $(".a").css("display", "none");
      $(".b").css("display", "none");
      $(".ab").css("display", "block");
    },
    map_() {
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "yongchedidian"
        });
        AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          that.C_shopAdd = e.poi.district + e.poi.name;
          console.log(e);
          console.log(e.poi.location.lat);
          console.log(e.poi.location.lng);
          that.x_lat = e.poi.location.lat;
          that.x_lng = e.poi.location.lng;
          that.lat = e.poi.location.lat;
          that.lng = e.poi.location.lng;
        }
      });
    },
    map_1() {
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "tj_map"
        });
        AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          that.incShopAdd = e.poi.district + e.poi.name;
          that.lat = e.poi.location.lat;
          that.lng = e.poi.location.lng;
        }
      });
    },
    getMap() {
      //略
    },
    //添加详情描述
    getDetails() {
      console.log(this.info);
      if (this.info == true) {
        try {
          this.detailedDescription = false;
          this.$refs["mianAdd"].innerHTML = this.incBriefInfo;
        } catch (error) {
          this.detailedDescription = false;
          this.$refs["mianChange"].innerHTML = this.incBriefInfo;
        }
      } else if (this.info == false) {
        this.detailedDescription = false;
        this.$refs["mianChange"].innerHTML = this.incBriefInfo;
      }
      this.detailedDescription = false;
    },
    //编辑器图片上传
    quillUpImg(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        // 如果上传成功
        if (res.data.State == "成功") {
          let quill = this.$refs.myQuillEditor.quill;
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.data.Body为服务器返回的图片地址
          quill.insertEmbed(length, "image", res.data.Body);
          // 调整光标到最后
          quill.setSelection(length + 1);
          // loading动画消失
          this.quillUpdateImg = false;
        } else {
          this.quillUpdateImg = false;
          this.$message.error("图片插入失败");
        }
      });
    },

    toSelectAddress(type) {
      let uptype = localStorage.getItem("uptype");
      let href = window.location.href;
      let urlArr = href.split("?");
      if (type == "tianjia") {
        let tj_obj = {
          incName: this.incName,
          incperInCharge: this.incperInCharge,
          incContectTel: this.incContectTel,
          incEmail: this.incEmail,
          C_ImageUrl: this.C_ImageUrl,
          C_detailsImageUrl: this.C_detailsImageUrl,
          incDescribe: this.incDescribe,
          incBriefInfo: escape(this.C_briefInfo),
          No: this.C_No
        };
        let obj = Base64.encode(JSON.stringify(tj_obj));
        let dz_data = encodeURIComponent(
          urlArr[0] + "?type=" + type + "&obj=" + obj
        );
        this.href = this.href + `&backurl=` + dz_data;
      } else if (type == "bianji" && uptype == "false") {
        let xg_obj = {
          C_Name: this.C_Name,
          C_perInCharge: this.C_perInCharge,
          C_contectTel: this.C_contectTel,
          C_email: this.C_email,
          C_ImageUrl: this.C_ImageUrl,
          C_detailsImageUrl: this.C_detailsImageUrl,
          C_ManagerNo: this.C_ManagerNo,
          incBriefInfo: escape(this.C_briefInfo),
          No: this.C_No
        };
        let obj = Base64.encode(JSON.stringify(xg_obj));
        let dz_data = encodeURIComponent(
          urlArr[0] + "?type=" + type + "&obj=" + obj
        );
        this.href = this.href + `&backurl=` + dz_data;
      } else if (type == "bianji" && uptype == "true") {
        let xg_obj = {
          C_Name: this.C_Name,
          C_perInCharge: this.C_perInCharge,
          C_contectTel: this.C_contectTel,
          C_email: this.C_email,
          C_ImageUrl: this.C_ImageUrl,
          C_detailsImageUrl: this.C_detailsImageUrl,
          C_ManagerNo: this.C_ManagerNo,
          incBriefInfo: escape(this.C_briefInfo),
          No: this.C_No,
          scale: this.scale,
          up: this.up
        };
        let obj = Base64.encode(JSON.stringify(xg_obj));
        let dz_data = encodeURIComponent(
          urlArr[0] + "?type=" + type + "&obj=" + obj
        );
        this.href = this.href + `&backurl=` + dz_data;
      }

      let handleUrl = function(url) {
        let decodedUrl = decodeURI(url);
        let query = decodedUrl.split("?")[1];
        let queryObj = {};
        if (query) {
          let queryArr = query.split("&");
          queryArr.forEach(item => {
            let itemArr = item.split("=");
            queryObj[itemArr[0]] = itemArr[1];
          });
        }
        console.log("处理url", queryObj);
        return queryObj;
      };
    },
    getEl(id) {
      return document.getElementById(id);
    },
    getName(name) {
      return document.getElementsByClassName(name);
    },
    //清空隐藏查询
    clearInc() {
      this.inquire = false;
      this.inquireNum = "";
      this.inquireAddr = "";
    },
    // 所有收衣店铺
    income() {
      this.staffShow = false;
      this.clearInc();
      this.queryone = `店名`;
      this.incomeshow = true;
      this.storeshow = false;
      this.view1 = `收衣点店铺`;
      this.employee = true;
      let shop = {};
      let Client = localStorage.getItem("ClientAddr");
      let allInc = axios.AllVirtualShop(Client, shop);
      allInc
        .then(resp => {
          if (resp.data.State == `成功`) {
            this.allShop = resp.data.Body;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 收衣店铺详情
    getIncData(row) {
      this.incoDetails = true;
      this.incFkshopNo = row.No; //店铺号
      this.incName = row.Name; //名称
      this.incManagerNo = row.ManagerNo; //管理员编号
      this.incperInCharge = row.perInCharge; //管理员
      this.incContectTel = row.contectTel; //电话
      this.incEmail = row.email; //邮箱
      this.incdetailsImageUrl = row.detailsImageUrl; //简介图片地址
      this.incBriefInfo = row.briefInfo; //介绍
      this.incImageUrl = row.ImageUrl; //图标地址
      this.incShopAdd = row.shopAdd;
      this.incId = row.deviceID;
      this.incaddress = row.address;
      this.incType = row.type;
    },
    // 添加收衣店铺信息
    addHint(hintid, str) {
      if (event.target.value == "") {
        this.getEl(hintid).innerText = str + `不能为空`;
      }
      event.target.onfocus = () => {
        event.target.parentNode.nextElementSibling.innerText = "";
      };
    },
    // 添加收衣店铺弹框
    showIncome() {
      $(".a").css("display", "none");
      $(".ab").css("display", "none");
      $(".b").css("display", "block");
      this.dialogFormVisible4 = true;
      $(".b").css("display", "block");
      this.info = true;
      this.incBriefInfo = "";
      try {
        this.$refs["mianAdd"].innerHTML = "";
      } catch (error) {}
    },
    // 添加收衣点店铺
    addInc(id1, id2) {
      console.log(id1,id2)
      let inc = {
        Name: this.incName,
        perInCharge: this.incperInCharge,
        contectTel: this.incContectTel,
        email: this.incEmail,
        ImageUrl: this.C_ImageUrl,
        detailsImageUrl: this.C_detailsImageUrl,
        briefInfo: escape(this.incBriefInfo),
        description: this.incDescribe,
        shopAdd: this.incShopAdd,
        lat: this.lat,
        lng: this.lng
      };
      console.log(inc)
      let Client = localStorage.getItem("ClientAddr");
      console.log(Client,'Client')
      if (
        !!!this.incName ||
        !!!this.incperInCharge ||
        !!!this.incContectTel ||
        !!!this.incEmail ||
        !!!this.C_ImageUrl ||
        !!!this.C_detailsImageUrl ||
        !!!this.incShopAdd
      ) {
        this.$message({
          message: `信息未填写完整`,
          type: "warning"
        });
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(this.incContectTel)) {
        this.$message({
          message: `手机号码格式有误，检查手机号码`,
          type: "warning"
        });
        return false;
      } else if (this.lat == "" || this.lng == "") {
        this.$message({
          message: `请点击提示选点，获取经纬度`,
          type: "warning"
        });
        return false;
      } else {
        let addStore = axios.addShop(Client, inc);
        addStore
          .then(resp => {
            console.log(resp);
            if (resp.data.State == `成功`) {
              this.$message({
                message: `添加成功`,
                type: "success"
              });
              [
                this.incName,
                this.incperInCharge,
                this.incContectTel,
                this.incEmail,
                this.C_ImageUrl,
                this.C_detailsImageUrl,
                this.incBriefInfo,
                this.incDescribe,
                this.incShopAdd
              ] = [""];
              axios.dltImg(id1, id2);
              this.dialogFormVisible4 = false;
              $(".b").css("display", "none");
              $(".ab").css("display", "block");
              this.income();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 删除收衣店铺
    dltIncole(row) {
      let inc = {
        No: row.No
      };
      let Client = localStorage.getItem("ClientAddr");
      let deletSpot = axios.dltIshop(Client, inc);
      deletSpot
        .then(resp => {
          if (resp.data.State == `成功`) {
            this.$message({
              message: `删除成功`,
              type: "success"
            });
            this.income();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 店铺
    store() {
      this.staffShow = false;
      this.queryone = `名称`;
      this.clearInc();
      this.incomeshow = false;
      this.storeshow = true;
      this.view1 = `普通店铺`;
      this.employee = false;
    },
    // 表格
    getAllData() {
      let Client = localStorage.getItem("ClientAddr");
      let getAllShop = axios.getAllShop(Client);
      let zhanwei = "./static/img/zhanwei.jpg";
      let shop = {};
      let allInc = axios.AllVirtualShop(Client, shop);
      let shops;
      allInc
        .then(resp => {
          if (resp.data.State == `成功`) {
            shops = resp.data.Body;
            getAllShop.then(res => {
              // console.log(res.data.Body.length);
              if (res.data.State == "成功") {
                for (var i = 0; i < res.data.Body.length; i++) {
                  if (!!!res.data.Body[i].ImageUrl) {
                    res.data.Body[i].ImageUrl = zhanwei;
                  }
                  if (!!!res.data.Body[i].detailsImageUrl) {
                    res.data.Body[i].detailsImageUrl = zhanwei;
                  }
                }
                // 普通店铺(不包含收衣点店铺)
                for (let k = 0; k < res.data.Body.length; k++) {
                  // console.log(k, res.data.Body[k].No);
                  for (let l = 0; l < shops.length; l++) {
                    // console.log(l, k, res.data.Body[k].No, shops[l].No);
                    // console.log(res.data.Body[l]);
                    if (res.data.Body[k].No == shops[l].No) {
                      res.data.Body.splice(k, 1);
                    }
                  }
                }
                this.tableData = res.data.Body;
              } else {
                this.$message.error(res.data.Reason);
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getShop() {
      let Client = localStorage.getItem("ClientAddr");
      let getShop = axios.getShop(Client);
      getShop.then(res => {
        if (res.data.State == "成功") {
          this.shopData = res.data.Body;
          this.shopOptions();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    getWorker() {
      let Client = localStorage.getItem("ClientAddr");
      let getWorker = axios.getWorker(Client);
      getWorker.then(res => {
        if (res.data.State == "成功") {
          this.workerData = res.data.Body;
          this.workerOptions();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    workerOptions() {
      this.optionsW = [];
      if (this.workerData.length != 0) {
        for (let i = 0; i < this.workerData.length; i++) {
          this.optionsW.push({
            value: this.workerData[i].No,
            label: this.workerData[i].No
          });
        }
      }
      this.viewSearchW();
    },
    shopOptions() {
      this.optionsS = [];
      if (this.shopData.length != 0) {
        for (let i = 0; i < this.shopData.length; i++) {
          this.optionsS.push({
            value: this.shopData[i].ShopNo,
            label: this.shopData[i].Name
          });
        }
      }
      this.viewSearchS();
    },
    // 查询
    getSearchM() {
      this.inquireNum = "";
      this.inquireAddr = "";
      this.inquire = !this.inquire;
    },
    searchData() {
      let data = [];
      let oldData = this.allData;
      for (let i = 0; i < this.allData.length; i++) {
        if (!!this.val1 && !!this.val2) {
          if (
            this.val1 == this.allData[i].No &&
            this.val2 == this.allData[i].ManagerNo
          ) {
            data.push(this.allData[i]);
            this.shop = this.val1;
            this.worker = this.val2;
          }
        } else if (!!this.val1) {
          if (this.val1 == this.allData[i].No) {
            data.push(this.allData[i]);
            this.shop = this.val1;
          }
        } else if (!!this.val2) {
          if (this.val2 == this.allData[i].ManagerNo) {
            data.push(this.allData[i]);
            this.worker = this.val2;
          }
        } else {
          data = oldData;
          this.shop = null;
          this.worker = null;
        }
      }
      this.tableData = data;
      this.shopOptions();
      this.workerOptions();
      this.dialogFormVisible3 = false;
    },
    viewSearchS() {
      if (this.optionsS.length != 0) {
        for (let i = 0; i < this.optionsS.length; i++) {
          if (this.optionsS[i].value == this.val1) {
            this.view1 = this.optionsS[i].label;
          } else if (!!!this.val1) {
            this.view1 = "普通店铺";
            this.val1 = null;
          }
        }
      }
    },
    viewSearchW() {
      if (this.optionsW.length != 0) {
        for (let j = 0; j < this.optionsW.length; j++) {
          if (this.optionsW[j].value == this.val2) {
            this.view2 = this.optionsW[j].label;
          } else if (!!!this.val2) {
            this.val2 = null;
          }
        }
      }
    },
    // 详情
    showDefImage() {
      event.target.src = "./static/img/zhanwei.jpg";
    },
    getData(row) {
      this.ImageUrl = row.ImageUrl; // 图标
      this.ManagerNo = row.ManagerNo; // 管理员编号
      this.Name = row.Name; // 名称
      this.No = row.No; // 店铺号
      this.briefInfo = unescape(row.briefInfo); // 简介
      this.contectTel = row.contectTel; // 电话
      this.detailsImageUrl = row.detailsImageUrl; // 简介图片
      this.email = row.email; // 电子邮箱
      this.perInCharge = row.perInCharge; // 负责人
      this.shopAdd = row.shopAdd; // 店铺地址
      this.dialogFormVisible1 = true;
    },
    // 设置
    changeOpen1() {
      this.$message({
        message: "设置成功",
        type: "success"
      });
    },
    changeData(row, up) {
      $(".ab").css("display", "none");
      $(".a").css("display", "block");
      $(".b").css("display", "none");
      localStorage.setItem("uptype", up);
      this.info = false;
      this.up = up;
      this.C_Name = row.Name; // 名称
      this.C_No = row.No; // 编号
      this.C_briefInfo = unescape(row.briefInfo); // 简介
      this.C_contectTel = row.contectTel; // 电话
      this.C_email = row.email; // 电子邮箱
      this.C_perInCharge = row.perInCharge; // 负责人
      this.C_shopAdd = row.shopAdd; // 店铺地址
      this.x_lng = row.lng;
      this.x_lat = row.lat;
      this.scale = row.scale;
      this.R_ImageUrl = row.ImageUrl;
      this.R_detailsImageUrl = row.detailsImageUrl;
      let val = "";
      for (let i = 0; i < this.optionsW.length; i++) {
        if (this.optionsW[i].label == row.ManagerNo) {
          val = this.optionsW[i].value;
          break;
        }
      }
      this.C_ManagerNo = val;
      this.dialogFormVisible2 = true;
    },
    upImg1(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        if (res.data.State == "成功") {
          this.C_detailsImageUrl = res.data.Body;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    upImg2(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        if (res.data.State == "成功") {
          this.C_ImageUrl = res.data.Body;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    upData() {
      console.log(this.lat, that.lng);
      let uptype = localStorage.getItem("uptype");
      console.log(uptype);
      let Client = localStorage.getItem("ClientAddr");
      let json_array;
      if (uptype == "true") {
        console.log("收衣点");
        if (this.C_ImageUrl == "" && this.C_detailsImageUrl == "") {
          json_array = {
            No: this.C_No, // 编号
            Name: this.C_Name, // 名称
            perInCharge: this.C_perInCharge, // 负责人
            contectTel: this.C_contectTel, // 电话
            email: this.C_email, // 电子邮箱
            detailsImageUrl: this.R_detailsImageUrl, // 简介图片
            ImageUrl: this.R_ImageUrl, // 图标
            shopAdd: this.C_shopAdd, // 店铺地址
            ManagerNo: this.C_ManagerNo, // 管理员编号
            briefInfo: escape(this.incBriefInfo), // 介绍
            scale: this.scale,
            lat: this.x_lat,
            lng: this.x_lng
          };
          if (this.incBriefInfo == "") {
            json_array.briefInfo = escape(this.C_briefInfo);
          }
        } else if (this.C_ImageUrl == "" && this.C_detailsImageUrl != "") {
          json_array = {
            No: this.C_No, // 编号
            Name: this.C_Name, // 名称
            perInCharge: this.C_perInCharge, // 负责人
            contectTel: this.C_contectTel, // 电话
            email: this.C_email, // 电子邮箱
            ImageUrl: this.R_ImageUrl, // 图标
            detailsImageUrl: this.C_detailsImageUrl, //简介图片
            shopAdd: this.C_shopAdd, // 店铺地址
            ManagerNo: this.C_ManagerNo, // 管理员编号
            briefInfo: escape(this.incBriefInfo), // 介绍
            scale: this.scale,
            lat: this.x_lat,
            lng: this.x_lng
          };
          if (this.incBriefInfo == "") {
            json_array.briefInfo = escape(this.C_briefInfo);
          }
        } else if (this.C_detailsImageUrl == "" && this.C_ImageUrl != "") {
          json_array = {
            No: this.C_No, // 编号
            Name: this.C_Name, // 名称
            perInCharge: this.C_perInCharge, // 负责人
            contectTel: this.C_contectTel, // 电话
            email: this.C_email, // 电子邮箱
            detailsImageUrl: this.R_detailsImageUrl, // 简介图片
            ImageUrl: this.C_ImageUrl, //图标
            shopAdd: this.C_shopAdd, // 店铺地址
            ManagerNo: this.C_ManagerNo, // 管理员编号
            briefInfo: escape(this.incBriefInfo), // 介绍
            scale: this.scale,
            lat: this.x_lat,
            lng: this.x_lng
          };
          if (this.incBriefInfo == "") {
            json_array.briefInfo = escape(this.C_briefInfo);
          }
        } else {
          json_array = {
            ImageUrl: this.C_ImageUrl, //图标
            detailsImageUrl: this.C_detailsImageUrl, //简介图片
            No: this.C_No, // 编号
            Name: this.C_Name, // 名称
            perInCharge: this.C_perInCharge, // 负责人
            contectTel: this.C_contectTel, // 电话
            email: this.C_email, // 电子邮箱
            shopAdd: this.C_shopAdd, // 店铺地址
            ManagerNo: this.C_ManagerNo, // 管理员编号
            briefInfo: escape(this.incBriefInfo), // 介绍
            scale: this.scale,
            lat: this.x_lat,
            lng: this.x_lng
          };
          if (this.incBriefInfo == "") {
            json_array.briefInfo = escape(this.C_briefInfo);
          }
        }
      } else if (uptype == "false") {
        console.log("普通");
        if (this.C_ImageUrl == "" && this.C_detailsImageUrl == "") {
          json_array = {
            No: this.C_No, // 编号
            Name: this.C_Name, // 名称
            perInCharge: this.C_perInCharge, // 负责人
            contectTel: this.C_contectTel, // 电话
            email: this.C_email, // 电子邮箱
            detailsImageUrl: this.R_detailsImageUrl, // 简介图片
            ImageUrl: this.R_ImageUrl, // 图标
            shopAdd: this.C_shopAdd, // 店铺地址
            ManagerNo: this.C_ManagerNo, // 管理员编号
            briefInfo: escape(this.incBriefInfo), // 介绍
            lat: this.x_lat,
            lng: this.x_lng
          };
          if (this.incBriefInfo == "") {
            json_array.briefInfo = escape(this.C_briefInfo);
          }
        } else if (this.C_ImageUrl == "" && this.C_detailsImageUrl != "") {
          json_array = {
            No: this.C_No, // 编号
            Name: this.C_Name, // 名称
            perInCharge: this.C_perInCharge, // 负责人
            contectTel: this.C_contectTel, // 电话
            email: this.C_email, // 电子邮箱
            ImageUrl: this.R_ImageUrl, // 图标
            detailsImageUrl: this.C_detailsImageUrl, //简介图片
            shopAdd: this.C_shopAdd, // 店铺地址
            ManagerNo: this.C_ManagerNo, // 管理员编号
            briefInfo: escape(this.incBriefInfo), // 介绍
            lat: this.x_lat,
            lng: this.x_lng
          };
          if (this.incBriefInfo == "") {
            json_array.briefInfo = escape(this.C_briefInfo);
          }
        } else if (this.C_detailsImageUrl == "" && this.C_ImageUrl != "") {
          json_array = {
            No: this.C_No, // 编号
            Name: this.C_Name, // 名称
            perInCharge: this.C_perInCharge, // 负责人
            contectTel: this.C_contectTel, // 电话
            email: this.C_email, // 电子邮箱
            detailsImageUrl: this.R_detailsImageUrl, // 简介图片
            ImageUrl: this.C_ImageUrl, //图标
            shopAdd: this.C_shopAdd, // 店铺地址
            ManagerNo: this.C_ManagerNo, // 管理员编号
            briefInfo: escape(this.incBriefInfo), // 介绍
            lat: this.x_lat,
            lng: this.x_lng
          };
          if (this.incBriefInfo == "") {
            json_array.briefInfo = escape(this.C_briefInfo);
          }
        } else {
          json_array = {
            ImageUrl: this.C_ImageUrl, //图标
            detailsImageUrl: this.C_detailsImageUrl, //简介图片
            No: this.C_No, // 编号
            Name: this.C_Name, // 名称
            perInCharge: this.C_perInCharge, // 负责人
            contectTel: this.C_contectTel, // 电话
            email: this.C_email, // 电子邮箱
            shopAdd: this.C_shopAdd, // 店铺地址
            ManagerNo: this.C_ManagerNo, // 管理员编号
            briefInfo: escape(this.incBriefInfo), // 介绍
            lat: this.x_lat,
            lng: this.x_lng
          };
          if (this.incBriefInfo == "") {
            json_array.briefInfo = escape(this.C_briefInfo);
          }
        }
      }
      console.log(json_array);
      let setShop = axios.setShop(Client, json_array);
      setShop.then(res => {
        if (res.data.State == "成功") {
          if (res.data.Body) {
            if (uptype == "true") {
              this.income();
              this.getAllData();
              this.changeOpen1();
              this.$refs.upload1.clearFiles();
              this.$refs.upload2.clearFiles();
              this.dialogFormVisible2 = false;
              $(".a").css("display", "none");
              this.reload();
            } else if (uptype == "false") {
              this.income();
              this.changeOpen1();
              this.$refs.upload1.clearFiles();
              this.$refs.upload2.clearFiles(); //略
              this.dialogFormVisible2 = false;
              $(".a").css("display", "none");
              this.store();
              this.reload();
            }
            // if (this.up == true || this.up == "") {
            // } else if(this.up == false){
            // }
          } else {
            this.$message.error("修改失败");
          }
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    }
  },

  filters: {
    //查询过滤器
    shopNofilter: function(val) {
      let arrIcn = new Array();
      for (let i = 0; i < val.length; i++) {
        if (val[i].fkshopNo) {
          if (
            val[i].fkshopNo.indexOf(that.inquireNum) != -1 &&
            val[i].address.indexOf(that.inquireAddr) != -1
          ) {
            arrIcn.push(val[i]);
          }
        }
        if (val[i].No) {
          if (
            val[i].No.indexOf(that.inquireNum) != -1 &&
            val[i].Name.indexOf(that.inquireAddr) != -1
          ) {
            arrIcn.push(val[i]);
          }
        }
      }
      return arrIcn;
    }
  }
};
</script>

<style scoped>
.details {
  margin-top: 25px;
}
.details .el-button {
  position: relative;
  left: 26%;
}
.infodepict {
  color: blue;
  font-size: 13px;
}
.infodepict:hover {
  cursor: pointer;
}
.prompt {
  height: 20px;
  line-height: 30px;
  font-size: 12.5px;
  position: relative;
  right: -93px;
}
.el-dialog__wrapper .el-input__inner {
  width: 100%;
}
#Management {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#viewImg {
  width: 90px;
  height: 60px;
}
dd {
  margin: 0px;
}
.block {
  margin-bottom: 10px;
}
.block-text {
  text-align: left;
  font-size: 14px;
  margin: 0px;
  margin-bottom: 5px;
}
.left {
  float: left;
}
.text {
  margin-top: 10px;
  margin-bottom: 10px;
}
.item {
  text-align: left;
}
.item1 {
  text-align: left;
  margin-bottom: 5px;
}
.item2 {
  text-align: left;
}
.time {
  font-size: 14px;
  color: #727377;
  line-height: 26px;
}
.xqfl,
.del {
  overflow: hidden;
}
.xqfl1 {
  float: left;
  margin-bottom: 5px;
  margin-right: 5px;
}
.xqfl2 {
  float: left;
  line-height: 19px;
}
.del1 {
  float: left;
  text-align: right;
  margin-right: 5px;
  width: 20%;
}
.del2 {
  float: left;
  text-align: left;
  width: 70%;
}
.tip {
  color: red;
  text-align: left;
  font-size: 14px;
  margin-top: 5px;
}
#Img,
.Img {
  width: 100px;
}
#detailsImg,
.detailsImg {
  width: 100px;
}
.el-col-offset-2 {
  display: flex;
  justify-content: space-evenly;
  padding: 0.5em 0;
}
.el-button--danger {
  font-size: 1em;
}
.showIncome {
  margin: 0.5em;
}
.item2 span {
  margin: 0 0.5em;
  color: blue;
}
.hint {
  display: block;
  height: 1em;
  color: red;
  text-indent: 1em;
}
#shopnav {
  height: 46px;
  line-height: 46px;
  margin-bottom: 10px;
}
.el-menu--horizontal > .el-menu-item {
  height: 46px;
  line-height: 46px;
}
.border {
  position: relative;
}
.right {
  position: absolute;
  right: 0;
  text-align: right;
}
.abstract p img {
  max-width: 100%;
}
</style>