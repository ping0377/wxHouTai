<template>
  <div id="cash_ticket">
    <div class="buttons">
      <el-button type="primary" style="width: 40%;" @click="addCoupon">添 加</el-button>
      <!-- <el-button type="primary" style="width: 40%;" @click="addDialog = true" plain>查 询</el-button> -->
    </div>

    <el-table ref="filterTable" :data="allData" style="width: 100%;">
      <el-table-column prop="name" align="center" min-width="90" fit="true" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tmoney" align="center" min-width="70" fit="true" show-overflow-tooltip></el-table-column>
      <el-table-column
        prop="addTime"
        align="center"
        min-width="80"
        fit="true"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center" min-width="65" fit="true">
        <template slot-scope="scope">
          <el-button type="text" slot="reference" @click="operate(scope.row)">操作</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加改弹窗 -->
    <el-dialog title="添加优惠券规则" :visible.sync="addDialog" fullscreen>
      <el-form :model="aform">
        <el-form-item label="优惠券名称" :label-width="formLabelWidth">
          <el-input v-model="aform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="优惠券金额" :label-width="formLabelWidth">
          <el-input v-model="aform.tmoney" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="有效期天数" :label-width="formLabelWidth">
          <el-input type="number" v-model="aform.days" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="满多少可消费" :label-width="formLabelWidth" style="text-align:left">
          <el-input type="number" v-model="aform.fullMan" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="titleimg" label="标题图片" :label-width="formLabelWidth">
          <el-upload
            action
            list-type="picture"
            accept=".jpeg, .png, .jpg"
            ref="upload"
            :http-request="upImg"
            :limit="1"
            id="addImg"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div class="prompt">只能上传jpg/png文件，且不超过1M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情描述" :label-width="formLabelWidth">
          <span class="infodepict" @click="detailedDescription = true">点击描述详情</span>
        </el-form-item>
        <el-form-item>
          <div class="ql-snow">
            <div class="ql-editor" ref="mianAdd"></div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">关 闭</el-button>
        <el-button type="primary" @click="addSub('addImg')">确认添加</el-button>
      </div>
    </el-dialog>
    <!-- 详情以及修改过弹窗 -->
    <el-dialog title="详情" :visible.sync="updateDialog" fullscreen>
      <el-form :model="upform">
        <el-form-item label="优惠券名称" :label-width="formLabelWidth">
          <el-input v-model="upform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="优惠券金额" :label-width="formLabelWidth">
          <el-input v-model="upform.tmoney" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="有效期天数" :label-width="formLabelWidth">
          <el-input type="number" v-model="upform.days" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          class="nonemargin"
          label="满多少可消费"
          :label-width="formLabelWidth"
          style="text-align:left"
        >
          <el-input type="number" v-model="infoMan" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          class="nonemargin"
          label="添加时间"
          :label-width="formLabelWidth"
          style="text-align:left"
        >
          <span autocomplete="off" style="display:inline-block;text-indent:2em">{{upform.addTime}}</span>
        </el-form-item>
        <el-form-item class="nonemargin" label="标题图片" :label-width="formLabelWidth">
          <img :src="upform.ticketImage" alt />
        </el-form-item>
        <el-form-item label="详情描述" :label-width="formLabelWidth">
          <span class="infodepict" @click="detailedDescription = true">点击描述详情</span>
        </el-form-item>
        <el-form-item>
          <div class="ql-snow">
            <div class="ql-editor" ref="mianChange" v-html="upform.tickeDescription"></div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">关 闭</el-button>
        <el-button type="info" @click="removeSub(upform.pkNo)">删 除</el-button>
        <el-button type="primary" @click="UpdateSub">保存更改</el-button>
      </div>
    </el-dialog>
    <el-dialog title="详情描述" :visible.sync="detailedDescription" fullscreen>
      <el-upload
        class="avatar-uploader"
        action="#"
        :http-request="quillUpImg"
        :headers="header"
        :show-file-list="false"
      ></el-upload>
      <quill-editor v-model="aform.details" :options="editorOption" ref="myQuillEditor"></quill-editor>
      <div class="details">
        <el-button type="info" plain @click="detailedDescription = false">关闭</el-button>
        <el-button type="primary" plain @click="getDetails">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
import { JsonPost } from "@/common/js/axiosServer.js";

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
  name: "cashTicket",
  data() {
    return {
      info: true,
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      allData: [],
      upform: {
        //更新表单
      },
      addDialog: false,
      updateDialog: false,
      detailedDescription: false,
      formLabelWidth: "100px",
      //添加表单
      useoptions: [
        { value: "按金额使用", lable: "按金额使用" },
        { value: "按件数使用", lable: "按件数使用" }
      ],
      infoMan: "",
      aform: {
        name: "",
        tmoney: "",
        days: "",
        fullMan: "",
        addTime: "",
        details: ""
      },
      C_ImgUrl: "",
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
      }
    };
  },
  created() {
    this.getAllTicket();
  },
  methods: {
    addCoupon() {
      this.addDialog = true;
      this.info = true;
      this.aform.details = "";
      try {
        this.$refs["mianAdd"].innerHTML = "";
      } catch (error) {}
    },
    quillUpImg(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.addImg(Client,File);
      addImg.then(res => {
        // 如果上传成功
        if (res.data.State == "成功") {
          let quill = this.$refs.myQuillEditor.quill;
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.url为服务器返回的图片地址
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
    //添加详情描述
    getDetails() {
      if (this.info == true) {
        console.log(this.$refs["mianAdd"]);
        this.$refs["mianAdd"].innerHTML = this.aform.details;
      } else if (this.info == false) {
        console.log(this.$refs["mianChange"]);
        this.$refs["mianChange"].innerHTML = this.aform.details;
      }
      console.log(this.info);
      this.detailedDescription = false;
    },
    //图片上传
    upImg(file) {
      let Client = localStorage.getItem("ClientAddr");
      let File = file.file;
      let addImg = axios.tickAddImg(Client, File);
      addImg.then(res => {
        if (res.data.State == "成功") {
          this.C_ImgUrl = res.data.Body;
        } else {
          this.$message.error(res.data.Reason);
        }
      });
    },
    // 获取优惠券
    getAllTicket() {
      let gt = JsonPost("Shop.ashx?Function=HttpQueryCoupon");
      let tre;
      gt.then(res => {
        if (res.data.State == "成功") {
          res.data.Body.forEach(item => {
            // item.days = item.days.substring(0, 10);
            //做此操作才能继续运行
            let str = item.trule.replace(/"/g, "'");
            tre = '"' + str + '"';
            //
            if (item.trule) item.trule = JSON.parse(tre);
            if (item.trule.FullReduce) {
              item.FullMan = item.trule.FullReduce.FullMan;
            } else {
              item.FullMan = 0;
            }
          });
          this.allData = res.data.Body;
          return;
        }
        this.$message.error(res.data.Reason);
      });
    },
    //添加提交
    addSub(id) {
      // 添加
      if (
        this.aform.name == "" ||
        this.aform.tmoney == "" ||
        this.aform.days == "" ||
        this.aform.fullMan == ""
      ) {
        this.$message.error("必填项不能为空");
        return;
      }
      let jData = {
        trule: {
          FullReduce: {
            FullMan: this.aform.fullMan
          }
        },
        name: this.aform.name,
        tmoney: this.aform.tmoney,
        days: this.aform.days,
        ticketImage: this.C_ImgUrl,
        tickeDescription: escape(this.aform.details)
      };
      // return;
      let gt = JsonPost("Shop.ashx?Function=HttpAddCoupon", jData);
      gt.then(res => {
        if (res.data.State == "成功") {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          axios.dltImg(id);
          this.addDialog = false;
          this.getAllTicket();
          this.aform.name = ""; //略
          this.aform.days = "";
          this.C_ImgUrl = "";
          this.aform.days = "";
          this.aform.fullMan = "";
          return;
        }
        this.$message.error(res.data.Reason);
      });
      return;
      // 修改
    },
    // 修改提交
    UpdateSub() {
      if (
        this.infoMan == "" ||
        this.upform.name == "" ||
        this.upform.tmoney == "" ||
        this.upform.days == ""
      ) {
        this.$message.error("必填项不能为空！");
        return;
      }
      let jData = {
        trule: {
          FullReduce: {
            FullMan: this.infoMan
          }
        },
        pkNo: this.upform.pkNo,
        name: this.upform.name,
        tmoney: this.upform.tmoney,
        ticketImage: this.upform.ticketImage,
        tickeDescription: escape(this.aform.details),
        days: this.upform.days,
        isShow:1
      };
      this.$confirm(
        "更新规则将影响已发出的优惠券价值, 请谨慎操作?",
        "重要警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let gt = JsonPost("Shop.ashx?Function=HttpChangeCoupon", jData);
          gt.then(res => {
            if (res.data.State == "成功") {
              this.$message({
                type: "success",
                message: "更新规则成功!"
              });
              this.updateDialog = false;
              this.getAllTicket();
              return;
            }
            this.$message.error(res.data.Reason);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更新"
          });
        });
    },
    // 操作点击
    operate(row) {
      let FullReduce = JSON.parse(row.trule.replace(/'/g, '"')).FullReduce;
      this.info = false;
      this.upform = row;
      this.infoMan = FullReduce.FullMan;
      this.updateDialog = true;
      this.upform.tickeDescription = unescape(row.tickeDescription);
      try {
        this.$refs["mianChange"].innerHTML = this.upform.tickeDescription;
      } catch (error) {}
    },
    removeSub(no) {
      let jData = {
        pkNo: no
      };
      this.$confirm("此操作将永久删除该条优惠券规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let gt = JsonPost("Shop.ashx?Function=HttpRemoveCoupon", jData);
          gt.then(res => {
            if (res.data.State == "成功") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.updateDialog = false;
              this.getAllTicket();
              return;
            }
            this.$message.error(res.data.Reason);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
.prompt{
  font-size: 12.5px;
}
.buttons {
  position: absolute;
  width: 100%;
  top: 40px;
  background-color: aliceblue;
}
.infodepict {
  color: blue;
  font-size: 13px;
}
.infodepict:hover {
  cursor: pointer;
}
.el-form-item {
  margin-bottom: 10px;
}
.details {
  margin-top: 25px;
}
.details .el-button {
  position: relative;
  left: 26%;
}
.nonemargin {
  margin: 0;
}
.el-form-item .el-form-item__content .ql-snow {
  padding-left: 36px;
}
</style>
<style>
#cash_ticket {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 40px;
}
#cash_ticket .el-table__header-wrapper {
  display: none;
}
#cash_ticket .buttons .el-button--primary {
  padding: 5px 0;
  margin: 3px 0;
}
.ql-toolbar.ql-snow {
  padding: 10px 0;
  background: #d5e7ee;
}
.ql-toolbar.ql-snow .ql-formats {
  margin: 0;
}
.el-dialog__body {
  padding: 0 10px;
}
.el-dialog__wrapper .el-input__inner {
  width: 90%;
}
.el-input__suffix {
  right: 12px;
}
.el-form-item__content {
  text-align: left;
}
</style>