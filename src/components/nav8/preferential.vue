<template>
  <div class="container">
    <el-button type="primary">左边的图片设置</el-button>
    <br />
    <el-upload
      ref="upLoad"
      action="#"
      :http-request="addImg"
      :auto-upload="false"
      list-type="picture"
      accept=".jpeg, .png, .gif, .jpg"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
    <el-button type="primary">右边的图片设置</el-button>

    <el-upload
      ref="upLo"
      action="#"
      :http-request="addImg"
      :auto-upload="false"
      list-type="picture"
      accept=".jpeg, .png, .gif, .jpg"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUp">上传到服务器</el-button>
    </el-upload>
  </div>
</template> 
<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      url: "",
      show: false,
      url2: "",
      show2: false
    };
  },
  mounted() {
    //   this.url=window.location.host+'api/Manager.ashx?Function=HttpAddMinShopGather';
    this.url =
      "http://weilang.fryxy.cn/api/Manager.ashx?Function=HttpAddMinShopGather";
    this.url2 =
      "http://weilang.fryxy.cn/api/Manager.ashx?Function=HttpAddMinShopGather";
  },
  methods: {
    addImg(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then(res => {
        console.log(res);
        if (res.data.State == "成功") {
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    submitUpload() {
      this.$refs.upLoad.submit();
    },
    submitUp(){
         this.$refs.upLo.submit();
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.url = URL.createObjectURL(file.raw);
      this.show = true;
    },
    isok(res, file) {
      this.url2 = URL.createObjectURL(file.raw);
      this.show2 = true;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped>
.container {
  width: 98%;
  /* border: 1px solid red; */
  height: 600px;
  margin: 0 auto;
  margin-top: 10px;
}
.el-button {
  margin-bottom: 20px;
}
</style>