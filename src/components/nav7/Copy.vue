<template>
  <div id="Copy">
    <el-row>
      <el-col :span="24">
        <span>源店铺编号</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input v-model="ShopNo1" placeholder="请输入源店铺编号" style="width: 80%" clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span>目的店铺编号</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input v-model="ShopNo2" placeholder="请输入目的店铺编号" style="width: 80%" clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="button">
          <el-button @click="clean">清 空</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as axios from '@/common/js/axiosServer.js'
export default {
  data() {
    return {
      ShopNo1:"",
      ShopNo2:""
    }
  },
  methods: {
    submit() {
      let Client = localStorage.getItem("ClientAddr");
      let shopNo1 = this.ShopNo1;
      let shopNo2 = this.ShopNo2;
      let Copy = axios.Copy(Client,shopNo1,shopNo2);
      Copy.then((res) => {
        if(res.data.State == '成功'){
          this.$message({
            message: "拷贝成功",
            type: 'success'
          });
        }else{
          this.$message.error(res.data.Reason);
        }
      });
    },
    clean() {
      this.ShopNo1 = "";
      this.ShopNo2 = "";
    }
  }
}
</script>

<style scoped>
#Copy{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
span{
  text-align: left;
  padding-left: 5px;
  width: 80%;
  display: block;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 5px;
}
.button{
  width: 90%;
  margin: auto;
  margin-top: 20px;
}
</style>
