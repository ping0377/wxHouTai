<template>
  <div id="Setting">
    <!-- 数据 -->
    <dl v-for="data in tableData" style="margin-left: 10px;">
      <el-row style="width: 100%; margin: 0px; text-align: left;" :gutter="20">
        <el-col :span="24">
          <span>{{data.label}}</span>
        </el-col>
      </el-row>
      <el-row style="width: 100%; line-height: 40px; margin: 0px; margin-top: 5px;" :gutter="10">
        <el-col :span="20">
          <el-input v-model="data.Value" style="width: 100%;"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="text" @click="textUpData(data,$event)">更新</el-button>
        </el-col>
      </el-row>
    </dl>
    <!-- 简介 -->
    <!-- <dl v-for="mark in Remark"    style="margin-left:10px;">
      <el-row style="width: 100%; margin: 0px; text-align: left;" :gutter="20">
        <el-col :span="24">
          <span>{{mark.label}}</span>
        </el-col>
      </el-row>
      <el-row style="width: 100%; line-height: 42px; margin: 0px; margin-top: 10px;" :gutter="10">
        <el-col :span="20">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="mark.Value"
            style="width: 100%;"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="text" @click="textUpData(mark,$event)">更新</el-button>
        </el-col>
      </el-row>
    </dl>-->
    <el-row>
      <el-col :span="12">
        <el-select
          v-model="value1"
          multiple
          placeholder="全国"
          style="text-align: left;"
          @change="changeselected"
        >
          <el-option
            v-for="item in AllProvinces"
            :key="item.Name"
            :label="item.Name"
            :value="item.Name"
          ></el-option>
        </el-select>
        <el-button @click="newcity">更新城市</el-button>
      </el-col>
    </el-row>
    <!-- 图标 -->

    <dl v-for="ico in Ico" style="margin-left: 10px; margin-right: 10px;">
      <el-row style="width: 20%; margin: 0px;" :gutter="20">
        <el-col :span="24" style="text-align: left;">
          <span>{{ico.label}}</span>
        </el-col>
      </el-row>
      <el-row style="width: 20%; margin: 0px; margin-top: 10px;" :gutter="10">
        <el-col :span="24">
          <img
            :src="ico.Value"
            id="Img"
            alt="Image"
            @error="showDefImage"
            @click="imgUpData(ico,$event)"
          />
        </el-col>
      </el-row>
    </dl>
    <!-- 图片弹窗 -->
    <el-dialog title="更新图标" :visible.sync="dialogFormVisible" width="80%" top="25vh">
      <el-upload
        ref="upLoad"
        action="#"
        :http-request="addImg"
        :auto-upload="false"
        list-type="picture"
        accept=".jpeg, .png, .gif, .jpg"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
      </el-upload>
    </el-dialog>
    <!-- 开始  公众号主页优惠编辑  左右两边的照片-->
    <el-row style="margin-left: 10px; margin-right: 10px;">
      <el-col :span="24" style="text-align: left;">
        <span style="fontSize:18px;">主页优惠图片设置</span>
      </el-col>
      <el-col style="text-align: left;margin-left: 20px;" :span="24">
        <span style="fontSize:16px;">左边照片设置</span>
        <img src alt />
        <el-upload
          ref="upLoad"
          action="#"
          :http-request="addImg1"
          :auto-upload="false"
          list-type="picture"
          accept=".jpeg, .png, .gif, .jpg"
        >
          <el-button slot="trigger" size="small" type="primary">选取照片</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUploads"
          >上传到服务器</el-button>
        </el-upload>
      </el-col>
      <el-col style="text-align: left;margin-left: 20px;" :span="24">
        <span style="fontSize:16px;">右边照片设置</span>
        <el-upload
          ref="upLo"
          action="#"
          :http-request="addImg2"
          :auto-upload="false"
          list-type="picture"
          accept=".jpeg, .png, .gif, .jpg"
        >
          <el-button slot="trigger" size="small" type="primary">选取照片</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUp">上传到服务器</el-button>
        </el-upload>
      </el-col>
    </el-row>
      <el-button type="primary" style="position:fixed;bottom:25px;left:20%;width:60%">保存设置</el-button>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      value1: "", //城市
      AllProvinces: [],
      tableData: [],
      Remark: [],
      Ico: [],
      dialogFormVisible: false,
      ImgUrl: "",
      imgName: "",
      leftimg: "leftimg",
      leftimgurl: "",
      rightimg: "",
      rightimgurl: ""
    };
  },
  created() {
    this.getAllData();
  },
  mounted() {
    this.getallProvinces();
  },
  methods: {
    changeselected() {
      console.log(this.value1);
    },
    getallProvinces() {
      let Client = localStorage.getItem("ClientAddr");
      let url = "app.ashx?Function=HttpQueryAllProvinces";
      let getallProvinces = axios.getallProvinces(url, Client);
      getallProvinces.then(res => {
        console.log(res, "所有省份");
        this.AllProvinces = res.data.Body;
      });
    },
    submitUploads() {
      this.$refs.upLoad.submit();
    },
    submitUp() {
      this.$refs.upLo.submit();
    },
    // 获取数据
    getAllData() {
      let Client = localStorage.getItem("ClientAddr");
      let getSetting = axios.getSetting(Client);
      getSetting.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.getItem(res.data.Body);
        }
      });
    },
    getItem(data) {
      let getData = data;
      let getIco = [];
      let getRemark = [];
      let getItem = [];
      for (let i = 0; i < getData.length; i++) {
        // console.log(getData[i]);
        if (getData[i].Name == "ShareIcon") {
          // getIco[i].label = "分享展示图标";
          getData[i].label = "分享展示图标";
          getIco.push(getData[i]);
        } else if (getData[i].Name == "IndexLeftImg") {
          // getIco[i].label = "主页优惠左侧照片";
          getData[i].label = "主页优惠左侧照片";
          getIco.push(getData[i]);
        } else if (getData[i].Name == "IndexRightImg") {
          // getIco[i].label = "主页优惠右侧照片";
          getData[i].label = "主页优惠右侧照片";
          getIco.push(getData[i]);
        } else {
          getItem.push(getData[i]);
        }
      }
      this.Ico = getIco;
      console.log(this.Ico, "ico");
      this.Remark = getRemark; //  这个没数据
      this.getName(getItem);
    },
    getName(nameData) {
      console.log(nameData, "namedata");
      for (let j = 0; j < nameData.length; j++) {
        switch (nameData[j].Name) {
          case "GiveWhenShareSuccess":
            nameData[j].label = "分享赠送积分";
            break;
          case "RechargeUseInteusePercent":
            nameData[j].label = "积分价格";
            break;
          case "ShareTittle":
            nameData[j].label = "分享展示标题";
            break;
          case "ShareRemark":
            nameData[j].label = "描述";
            case "SeachAreaScope" :
              nameData[j].label='城市选择'
          default:
            nameData[j].label = "注册赠送积分点数";
        }
      }
      this.tableData = nameData;
      console.log(this.tableData, "tabledata");
    },
    showDefImage() {
      event.target.src = "./static/img/zhanwei.jpg";
    },
    // 修改图片
    imgUpData(item, event) {
      this.imgName = item.Name;
      this.dialogFormVisible = true;
    },
    addImg(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.ImgUrl = res.data.Body;
          this.setImg();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    addImg1(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.ImgUrl = res.data.Body;
          this.imgName = "IndexLeftImg";
          this.setImg();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    addImg2(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
          this.ImgUrl = res.data.Body;
          this.imgName = "IndexRightImg";
          this.setImg();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    setOpen1() {
      this.$message({
        message: "更新成功",
        type: "success"
      });
    },
    setImg() {
      let Client = localStorage.getItem("ClientAddr");
      let img = this.ImgUrl;
      let name = this.imgName;
      let setImg = axios.setImg(Client, img, name);
      setImg.then(res => {
        if (res.data.State == "成功") {
          this.setOpen1();
          this.getAllData();
          this.$refs.upLoad.clearFiles();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible = false;
    },
    submitUpload() {
      this.$refs.upLoad.submit();
    },
    newcity() {
      let Client = localStorage.getItem("ClientAddr");
      let value = this.value1.toString();
      let name = "SeachAreaScope";
      let setText = axios.setText(Client, value, name);
      setText.then(res => {
        console.log(res,'新城市')
        if (res.data.State == "成功") {
          this.setOpen1();
          this.getAllData();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 文本上传   更新数据
    textUpData(item, event) {
      let Client = localStorage.getItem("ClientAddr");
      let value = item.Value;
      let name = item.Name;
      let setText = axios.setText(Client, value, name);
      setText.then(res => {
        if (res.data.State == "成功") {
          this.setOpen1();
          this.getAllData();
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    }
  }
};
</script>

<style scoped>
#Setting {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
dd {
  margin: 0px;
}
span {
  font-size: 14px;
  color: #96979a;
}
#Img {
  width: 100%;
}
</style>
