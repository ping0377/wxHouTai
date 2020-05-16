<template>
  <div id="cash_ticket">
    <div class="buttons">
      <el-button type="primary" style="width: 40%;" @click="addDialog = true">添 加</el-button>
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
    <el-dialog title="添加洗衣券规则" :visible.sync="addDialog" fullscreen>
      <el-form :model="aform">
        <el-form-item label="洗衣券名称" :label-width="formLabelWidth">
          <el-input type="text" v-model="aform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="有效天数" :label-width="formLabelWidth">
          <el-input type="number" v-model="aform.days" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="满多少可消费" :label-width="formLabelWidth">
          <span>{{aform.fullMan}}</span>
        </el-form-item>
        <el-form-item label="券面值" :label-width="formLabelWidth">
          <el-input type="number" v-model="aform.ticketvalue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="抵扣件数" :label-width="formLabelWidth">
          <el-input type="number" v-model="aform.deductionsum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发行数量" :label-width="formLabelWidth">
          <el-input type="number" v-model="aform.quantity" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择使用范围" :label-width="formLabelWidth">
          <el-select :multiple-limit="0" collapse-tags v-model="addtrules" multiple placeholder="请选择">
            <el-option v-for="item in alldressName" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题图片" :label-width="formLabelWidth">
          <el-upload
            action
            list-type="picture"
            accept=".jpeg, .png, .gif, .jpg"
            ref="upload"
            :http-request="upImg"
            :limit="1"
            id="addimg"
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
            <div class="ql-editor" ref="mianD"></div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">关 闭</el-button>
        <el-button type="primary" @click="addSub('addimg')">确认添加</el-button>
      </div>
    </el-dialog>
    <!-- 详情以及修改弹窗 -->
    <el-dialog title="详情" :visible.sync="updateDialog" fullscreen>
      <el-form :model="upform">
        <el-form-item label="洗衣券名称" :label-width="formLabelWidth">
          <el-input v-model="upform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="券面值" :label-width="formLabelWidth">
          <el-input v-model="upform.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="有效天数" :label-width="formLabelWidth">
          <el-input type="text" v-model="upform.days" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="nonemargin" label="满多少可消费" :label-width="formLabelWidth">
          <span>{{upform.FullMan}}</span>
        </el-form-item>
        <el-form-item class="nonemargin" label="发行数量" :label-width="formLabelWidth">
          <span>{{upform.quantity}}</span>
        </el-form-item>
        <el-form-item class="nonemargin" label="添加时间" :label-width="formLabelWidth">
          <span autocomplete="off">{{upform.addTime}}</span>
        </el-form-item>
        <el-form-item label="使用规则" :label-width="formLabelWidth">
          <span>满{{upform.FullMan}}元可用，可用衣物为：{{range}}</span>
        </el-form-item>
        <el-form-item label="券类型" :label-width="formLabelWidth">
          <!-- <el-select placeholder="请选择">
            <el-option
              v-for="item in useoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
          <span>按{{upform.type}}使用</span>
        </el-form-item>
        <el-form-item label="选择使用范围" :label-width="formLabelWidth">
          <el-select :multiple-limit="0" collapse-tags v-model="trules" multiple placeholder="请选择">
            <el-option v-for="item in alldressName" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否可销售" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="isSell" label="true">是</el-radio>
            <el-radio v-model="isSell" label="false">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否展示" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="isShow" label="true">是</el-radio>
            <el-radio v-model="isShow" label="false">否</el-radio>
          </template>
        </el-form-item> -->
        <el-form-item label="抵扣件数" :label-width="formLabelWidth">
          <el-input type="number" v-model="upform.iCount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题图片" :label-width="formLabelWidth">
          <img :src="infoImgurl" class="infoimg" />
        </el-form-item>
        <el-form-item label="详情描述" :label-width="formLabelWidth">
          <span class="infodepict" @click="detailedDescription = true">点击描述详情</span>
        </el-form-item>
        <el-form-item>
          <div class="ql-snow">
            <div class="ql-editor" ref="mianD" v-html="upform.tickeDescription"></div>
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
  created() {
    this.getAllTicket();
  },
  beforeCreate() {
    let allDress = axios.allDress();
    allDress.then(res => {
      console.log(res);
      if (res.data.Body != 0) {
        try {
          for (let i = 1; i < res.data.Body.length; i++) {
            this.alldressName.push(res.data.Body[i]);
          }
        } catch (error) {}
      }
    });
  },
  data() {
    return {
      changeOldtrules: [],
      alldressName: [],
      //规则
      FullMan: "",
      range: "",
      allData: [],
      upform: {
        //更新表单
      },
      // isSell: "",
      // isShow: "",
      addDialog: false,
      updateDialog: false,
      detailedDescription: false,
      formLabelWidth: "100px",
      //添加表单
      useoptions: [
        { value: "按金额使用", lable: "按金额使用" },
        { value: "按件数使用", lable: "按件数使用" }
      ],
      aform: {
        name: "",
        days: "",
        fullMan: 0,
        addTime: "",
        details: "", //详情描述
        ticketclass: "", //券类型
        ticketvalue: "", //券面值
        deductionsum: "", //抵扣件数
        usenorm: "", //使用范围
        days: "", //有效天数
        trule: {}, //使用规则
        quantity: ""
      },
      addtrules: [],
      trules: [], //使用范围
      C_ImgUrl: "",
      infoImgurl: "",
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
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    };
  },
  methods: {
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
      this.$refs["mianD"].innerHTML = this.aform.details;
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
    // 获取洗衣券
    getAllTicket() {
      let dat={
        type:"后台"
      }
      let gt = JsonPost("Shop.ashx?Function=HttpQueryLaundryCoupon",dat);
      let tre;
      gt.then(res => {
        if (res.data.State == "成功") {
          res.data.Body.forEach(item => {
            let str = item.trule.replace(/"/g, "'");
            tre = '"' + str + '"';
            if (item.trule) item.trule = JSON.parse(tre);
            if (item.trule.FullReduce) {
              item.FullMan = item.trule.FullReduce.FullMan;
            } else {
              item.FullMan = 0;
            }
          });
          console.log(res.data.Body)
          this.allData = res.data.Body;
          return;
        }
        this.$message.error(res.data.Reason);
      });
    },
    //添加提交
    addSub(id) {
      let str = escape(this.aform.details);
      // 添加
      let jData = {
        trule: {
          FullReduce: { FullMan: this.aform.fullMan, range: this.addtrules }
        },
        name: this.aform.name,
        price: this.aform.ticketvalue,
        ticketClass: this.aform.ticketclass,
        useRule: this.aform.userule,
        // ticketValue: this.aform.ticketvalue,
        // useNorm: this.aform.usenorm,
        iCount: this.aform.deductionsum,
        days: this.aform.days,
        ticketImage: this.C_ImgUrl,
        tickeDescription: escape(this.aform.details),
        quantity: this.aform.quantity
      };
      let gt = JsonPost("Shop.ashx?Function=HttpAddLaundryCoupon", jData);
      gt.then(res => {
        if (res.data.State == "成功") {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          axios.dltImg(id);
          this.addDialog = false;
          this.getAllTicket();
          this.aform.name = "";
          this.aform.ticketvalue = "";
          this.aform.ticketclass = "";
          this.aform.userule = "";
          this.aform.deductionsum = "";
          this.aform.days = "";
          this.aform.quantity = "";
          this.C_ImgUrl = "";
          this.aform.details = "";
          this.addtrules = [];
          this.$refs["mianD"].innerHTML = "";
          return;
        }
        this.$message.error(res.data.Reason);
      });
      return;
      // 修改
    },
    changFull() {
      this.aform.trule.range = this.trules;
    },
    // 修改提交
    UpdateSub() {
      let jData = {
        trule: {
          FullReduce: {
            FullMan: this.upform.FullMan,
            range:
              this.trules == ""
                ? (this.trules = this.changeOldtrules)
                : (this.trules = this.trules)
          }
          // FullReduce:{"FullMan":0,range:["001","002"]}
        },
        pkNo: this.upform.pkNo,
        name: this.upform.name,
        iCount: this.upform.iCount,
        price: this.upform.price,
        ticketImage: this.upform.ticketImage,
        quantity: this.upform.quantity,
        tickeDescription:
          this.aform.details == ""
            ? escape(this.upform.tickeDescription)
            : escape(this.aform.details),
        days: this.upform.days,
        isSell: true,
        isShow: true
      };
      this.$confirm(
        "更新规则将影响已发出的洗衣券价值, 请谨慎操作?",
        "重要警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let gt = JsonPost(
            "Shop.ashx?Function=HttpChangeLaundryCoupon",
            jData
          );
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
      console.log(row)
      //略
      this.isSell = row.isSell ? true : false;
      this.isShow = row.isShow ? true : false;
      this.updateDialog = true;
      this.aform.details = "";
      this.trules = [];
      this.range = "";
      this.upform = row;
      this.upform.tickeDescription = unescape(this.upform.tickeDescription);
      let trule = row.trule.replace(/'/g, '"');
      this.infoImgurl = row.ticketImage;
      this.upform.usenorm = JSON.parse(trule).FullReduce.range;
      this.changeOldtrules = this.upform.usenorm;
      this.aform.trule = JSON.parse(trule);
      if (this.aform.trule.FullReduce.range) {
        for (let i = 0; i < this.aform.trule.FullReduce.range.length; i++) {
          if (i < this.aform.trule.FullReduce.range.length - 1) {
            this.aform.trule.FullReduce.range[i] += ",";
          }
          this.range += this.aform.trule.FullReduce.range[i];
        }
      }
    },
    removeSub(no) {
      let jData = {
        pkNo: no
      };
      this.$confirm("此操作将永久删除该条洗衣券规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let gt = JsonPost(
            "Shop.ashx?Function=HttpRemoveLaundryCoupon",
            jData
          );
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
.prompt {
  font-size: 12.5px;
}
.infoimg {
  position: relative;
  top: 11px;
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
  margin-bottom: 0px;
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
.infoimg {
  width: 100px;
}
.el-checkbox__label {
  padding-left: 5px;
}
.el-checkbox {
  margin-right: 10px;
}
.el-form-item {
  margin-bottom: 5px;
}
</style>
<style>
.el-icon-arrow-up {
  position: relative;
  right: 15px;
}
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
  right: -5px;
}
.el-form-item__label {
  line-height: 40px;
}
.el-input__inner {
  height: 34px;
  line-height: 34px;
}
.el-form-item__content {
  text-align: left;
}
.el-form-item__content .el-input__inner {
  min-width: 217px;
}
</style>