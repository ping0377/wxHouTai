<template>
  <div id="LaundryManage">
    <el-table
      ref="filterTable"
      :data="allData"
      style="width: 100%"
      height="calc(100vh - 108px)"
      >
      <el-table-column
        prop="Name"
        label="名称"
        align="center"
        min-width="85"
        fit="true"
        column-key="No"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="Price"
        label="价格"
        align="center"
        min-width="70"
        fit="true"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="Type"
        label="类型名称"
        align="center"
        min-width="90"
        fit="true"
        :filters="optionsT"
        :filter-method="filterType"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="65"
        fit="true">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="click">
            <div>
              <el-button type="text" size="small" @click="getData(scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="changeData(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="delShow(scope.row)">删除</el-button>
            </div>
            <el-button type="text" slot="reference">操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%;">
      <el-button type="text" style="width: 100%;" @click="addData">添 加</el-button>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogFormVisible1" fullscreen>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">编号:</dd>
        <dd class="item2 xqfl2">{{No}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">名称:</dd>
        <dd class="item2 xqfl2">{{Name}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">价格:</dd>
        <dd class="item2 xqfl2">{{Price}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">类别名称:</dd>
        <dd class="item2 xqfl2">{{Type}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">图片:</dd>
        <dd class="item2">
          <img :src="ImageUrl" id="Img" alt="Image" @error="showDefImage">
        </dd>
      </dl>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible2" fullscreen>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <dl class="text">
          <dd class="item1">编号:</dd>
          <dd class="item">{{C_No}}</dd>
        </dl>
        <dl class="text">
          <dd class="item1">原图片:</dd>
          <dd class="item">
            <img :src="C_Img" id="Img" alt="Image" @error="showDefImage">
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">名称:</dd>
          <dd class="item">
            <el-form-item prop="C_Name" class="C_Name">
              <el-input v-model="ruleForm.C_Name" clearable style="width: 90%"></el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">价格(元/件):</dd>
          <dd class="item">
            <el-form-item prop="C_Price" class="C_Price">
              <el-input v-model="ruleForm.C_Price" clearable style="width: 90%"></el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">类别名称:</dd>
          <dd class="item">
            <el-form-item prop="C_Type" class="C_Type">
               <el-select v-model="ruleForm.C_Type" style="width: 90%" placeholder="请选择类别名称">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </dd>
        </dl>
      </el-form>
      <dl class="text">
        <!-- <dd class="item1">图片</dd> -->
        <dd class="item">
          <!-- <input type="file" ref="Img" id="Img"> -->
          <el-upload
            class="upload-demo"
            action=""
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
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upData('ruleForm')">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogFormVisible3" width="90%" top="25vh">
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">编号:</dd>
        <dd class="del2">{{delNo}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">名称:</dd>
        <dd class="del2">{{delName}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="del">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from '@/common/js/axiosServer.js'
export default {
  data() {
    return {
      allData: [],
      optionsT: [],
      TypeOptions: null,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      // 详情
      Name: "",
      ImageUrl: "",
      No: "",
      Price: "",
      Type: "",
      // 删除
      delNo: "",
      delName: "",
      // 修改
      C_Img:"",
      ruleForm: {
        C_Type:"", //类型名称
        C_Name:"", // 名称
        C_Price:"" // 价格
      },
      options:[],
      rules: {
        // 类型名称
        C_Type: [
          { required: true, message: '请选择类型名称', trigger: 'change' }
        ],
        // 名称
        C_Name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
        // 价格
        C_Price: [
          { required: true, message: '价格不能为空', trigger: 'blur' },
        ]
      },
      C_No: "",
      C_ImgUrl: ""
    }
  },
  created() {
    this.getAllData();
    this.getType();
  },
  methods: {
    // 表格
    getAllData() {
      let Client = localStorage.getItem("ClientAddr");
      let getWashManage = axios.getWashManage(Client);
      let zhanwei = './static/img/zhanwei.jpg';
      getWashManage.then((res) => {
        if(res.data.State == '成功'){
          for(var i=0;i<res.data.Body.length;i++){
            if(!(!!res.data.Body[i].ImageUrl)){
              res.data.Body[i].ImageUrl = zhanwei;
            }
          }
          this.allData = res.data.Body;
        }else{
          this.$message.error(res.data.Reason);
        }
      })
    },
    getType(){
      let allType = [];
      this.TypeOptions = [];
      this.TypeOptions.push({ No: null, Name: "全部" });
      if(this.TypeOptions != null && this.TypeOptions.length != 0) {
        let Client = localStorage.getItem("ClientAddr");
        let WashManageType = axios.WashManageType(Client);
        WashManageType.then((res) => {
          if(res.data.State == '成功'){
            this.TypeOptions = this.TypeOptions.concat(res.data.Body);
            allType = res.data.Body;
            if(allType.length != 0) {
              let type = [];
              let typeName = [];
              for(let i=0;i<allType.length;i++){
                type.push(allType[i].Name);
                if(typeName.indexOf(type[i]) == -1){
                  typeName.push(type[i]);
                }
              }
              for(let j=0;j<typeName.length;j++){
                this.optionsT.push({value:typeName[j],text:typeName[j]});
              }
            }
          }else{
          this.$message.error(res.data.Reason);
        }
        })
      }
    },
    // 查询
    filterType(value, row) {
      return row.Type === value;
    },
    // 添加
    addOpen1() {
      this.$message({
        message: '添加成功',
        type: 'success'
      });
    },
    // 添加
    addData() {
      let Client = localStorage.getItem("ClientAddr");
      let addWashManage = axios.addWashManage(Client);
      addWashManage.then((res) => {
        if(res.data.State == '成功'){
          this.getAllData();
          this.addOpen1();
        }else {
          this.$message.error(res.data.Reason);
        }
      })
    },
    // 详情
    showDefImage() {
      event.target.src = "./static/img/zhanwei.jpg";
    },
    getData(row) {
      this.No = row.No;
      this.Name = row.Name;
      this.ImageUrl = row.ImageUrl;
      this.Price = row.Price;
      this.Type = row.Type;
      this.dialogFormVisible1 = true;
    },
    // 修改
    changeOpen1() {
      this.$message({
        message: '修改成功',
        type: 'success'
      });
    },
    getOptions() {
      if(this.options.length == 0) {
        for(let i=1;i<this.TypeOptions.length;i++){
          this.options.push({value:this.TypeOptions[i].No,label:this.TypeOptions[i].Name});
        }
      }
    },
    changeData(row) {
      this.getOptions();
      this.C_Img = row.ImageUrl;
      this.C_No = row.No;
      this.ruleForm.C_Name = row.Name;
      this.ruleForm.C_Price = row.Price;
      this.C_ImgUrl = row.ImageUrl;
      console.log(row);
      let val = "";
      for(let i=0;i<this.options.length;i++)
      {
        if(this.options[i].label == row.Type){
          val = this.options[i].value;
          break;
        }
      }
      this.ruleForm.C_Type = val;
      this.dialogFormVisible2 = true;
    },
  //   upImg(){
  //     let img = this.$refs.Img;
  //     let Client = localStorage.getItem("ClientAddr");
  //     let file =img.files[0];
  //     let addImg = axios.addImg(Client, file);
  //     addImg.then((res) => {
  //       if(res.data.State == '成功'){
  //         this.C_ImgUrl = res.data.Body;
  //       }
  //     })
  //   },
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
    upData(formName) {
      this.$refs[formName].validate((valid) =>{
        if(valid) {
          let Client = localStorage.getItem("ClientAddr");
          let imgUrl = this.C_ImgUrl; //图片
          let name = this.ruleForm.C_Name; //名称
          let no = this.C_No; //编号
          let type = this.ruleForm.C_Type; //类型名称
          let price = this.ruleForm.C_Price; // 价格
          let changeWashManage = axios.changeWashManage(Client,name,imgUrl,price,type,no);
          changeWashManage.then((res) => {
            if(res.data.State == '成功'){
              this.getAllData();
              this.changeOpen1();
              this.dialogFormVisible2 = false;
            }else {
              this.$message.error(res.data.Reason);
            }
          });
          this.$refs.upload.clearFiles();
        }
      })
    },
    // 删除
    delShow(row) {
      this.dialogFormVisible3 = true;
      this.delNo = row.No;
      this.delName = row.Name;
    },
    delopen() {
      this.$message({
        message: '删除成功',
        type: 'success'
      });
    },
    del(){
      let Client = localStorage.getItem("ClientAddr");
      let delWashManage = axios.delWashManage(Client, this.delNo);
      delWashManage.then((res) => {
        if(res.data.State == '成功'){
          this.delopen();
          this.getAllData();
        }else {
          this.$message.error(res.data.Reason);
        }
      });
      this.dialogFormVisible3 = false;
    }
  }
}
</script>

<style scoped>
#LaundryManage {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#viewImg{
  width: 90px;
  height: 60px;
}

dd{
  margin: 0px;
}
.block{
  margin-bottom: 10px;
}
.text{
  margin-top: 10px;
  margin-bottom: 10px;
}
.item{
  text-align: left;
}
.item1{
  text-align: left;
  margin-bottom: 5px;
}
.item2{
  text-align: left;
}
.xqfl,.del{
  overflow: hidden;
}
.xqfl1{
  float: left;
  margin-bottom: 5px;
  margin-right: 5px;
}
.xqfl2{
  float: left;
  line-height: 19px;
}
.del1{
  float: left;
  text-align: right;
  margin-right: 5px;
  width: 25%;
}
.del2{
  float: left;
  text-align: left;
  width: 65%;
}
#Img{
  width: 200px;
  height: 134px;
}
</style>