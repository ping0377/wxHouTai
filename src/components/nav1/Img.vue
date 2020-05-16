<template>
  <div id="Img">
    <el-table
      ref="filterTable"
      :data="allData"
      style="width: 100%"
      height="calc(100vh - 108px)">
      <el-table-column
        label="编号"
        align="center"
        min-width="80"
        fit="true"
        column-key="No">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column
        label="图片"
        align="center"
        min-width="160"
        fit="true"
        column-key="No">
        <template slot-scope="scope">
          <img :src="scope.row" id="viewImg" alt="Image" @error="showDefImage">
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="80"
        fit="true"
        column-key="No">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click">
            <div>
              <el-button type="text" size="small" @click="change(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
            </div>
            <el-button type="text" slot="reference">操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%;">
      <el-button type="text" style="width: 100%;" @click="dialogFormVisible3 = true">添 加</el-button>
    </div>
    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible1" fullscreen>
      <dl class="text">
        <!-- <dd class="item1">图片</dd> -->
        <dd class="item">
          <!-- <input type="file" ref="Img" id="Img"> -->
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="upImg"
            list-type="picture"
            accept = ".jpeg, .png, .gif, .jpg"
            :limit="1"
            ref="upload">
            <span style="text-align: left;">图片:</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="upData()">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogFormVisible2" width="90%" top="25vh">
      <div style="margin-bottom: 10px;">
        <span>图片:</span>
      </div>
      <div>
        <img :src="delURL" class="IMG" alt="Image">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="delImg()">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible3" width="80%" top="25vh">
      <el-upload
        ref="upLoad"
        action="#"
        :http-request="addImg"
        :auto-upload="false"
        list-type="picture"
        accept = ".jpeg, .png, .gif, .jpg">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from '@/common/js/axiosServer.js'
export default {
  data() {
    return {
      allData: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      // 修改
      C_ImgUrl: "", // 修改后URL
      C_imgUrl: "", // 修改前URL
      // 删除
      delURL: "", // 删除的URL
      // 添加
      A_ImgUrl: ""
    }
  },
  created() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      let Client = localStorage.getItem("ClientAddr");
      let getImg = axios.getImg(Client);
      getImg.then((res) => {
        if(res.data.State == '成功'){
          this.allData = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    showDefImage() {
      event.target.src = "./static/img/zhanwei.jpg";
    },
    // 修改
    changeOpen1() {
      this.$message({
        message: '修改成功',
        type: 'success'
      });
    },
    change(row) {
      this.C_imgUrl = row;
      this.dialogFormVisible1 = true;
    },
    upImg(file){
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then((res) => {
        if(res.data.State == '成功'){
          this.C_ImgUrl = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    upData() {
      let Client = localStorage.getItem("ClientAddr");
      let data = this.allData;
      for(let i=0;i<data.length;i++){
        if(data[i] == this.C_imgUrl){
          data[i] = this.C_ImgUrl;
        }
      }
      let changeImg = axios.changeImg(Client,data);
      changeImg.then((res) => {
        if(res.data.State == '成功'){
          this.getAllData();
          this.changeOpen1();
          this.$refs.upload.clearFiles();
        }else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible1 = false;
    },
    // 删除
    del(row) {
      this.delURL = row;
      this.dialogFormVisible2 = true;
    },
    delopen() {
      this.$message({
        message: '删除成功',
        type: 'success'
      });
    },
    delImg() {
      let Client = localStorage.getItem("ClientAddr");
      let data = this.allData;
      for(let i=0;i<data.length;i++){
        if(data[i] == this.delURL){
          data.splice(i,1);
        }
      }
      let changeImg = axios.changeImg(Client,data);
      changeImg.then((res) => {
        if(res.data.State == '成功'){
          this.delopen();
          this.getAllData();
        }else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible2 = false;
    },
    // 添加
    addImg(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client, File);
      addImg.then((res) => {
        if(res.data.State == '成功'){
          this.A_ImgUrl = res.data.Body;
          this.addUpImg();
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    addOpen1() {
      this.$message({
        message: '添加成功',
        type: 'success'
      });
    },
    addUpImg() {
      let Client = localStorage.getItem("ClientAddr");
      let data = this.allData;
      data.push(this.A_ImgUrl);
      let changeImg = axios.changeImg(Client,data);
      changeImg.then((res) => {
        if(res.data.State == '成功'){
          this.addOpen1();
          this.getAllData();
          this.$refs.upLoad.clearFiles();
        }else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible3 = false;
    },
    submitUpload() {
      this.$refs.upLoad.submit();
    }
  }
}
</script>

<style scoped>
#Img{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
dd{
  margin: 0px;
}
#viewImg{
  width: 150px;
  height: 90px;
}
.text{
  margin-top: 10px;
  margin-bottom: 10px;
}
.item{
  text-align: left;
}
.IMG{
  width: 100px;
  height: 90px;
}
</style>
