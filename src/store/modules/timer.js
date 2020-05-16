export default {
  namespaced: true,
  state: {
    shopValue: "",
    timeValue1: "",
    viewTime1: "",
    timeValue2: "",
    viewTime2: "",
    timeValue3: "",
    viewTime3: "",
    timeValue4: "",
    viewTime4: "",
    timeValue5: "",
    viewTime5: "",
    timeValue6: "",
    viewTime6: ""
  },
  mutations: {
    getTime1(state) {
      let date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      hour = (hour != 0 && hour < 10) ? '0' + hour : hour = hour;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (!state.timeValue1 || !state.viewTime1) {
        state.timeValue1 = year + "-" + month + "-" + strDate + " 00:00:00"
        state.viewTime1 = year + "-" + month + "-" + strDate + " 0时"
      }
      if (!state.timeValue2 || !state.viewTime2) {
        state.timeValue2 = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second
        state.viewTime2 = year + "-" + month + "-" + strDate + " " + hour + "时"
      }
    },
    getTime2(state) {
      let date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      hour = (hour != 0 && hour < 10) ? '0' + hour : hour = hour;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (!state.timeValue3 || !state.viewTime3) {
        state.timeValue3 = year + "-" + month + "-" + strDate + " 00:00:00"
        state.viewTime3 = year + "-" + month + "-" + strDate + " 0时"
      }
      if (!state.timeValue4 || !state.viewTime4) {
        state.timeValue4 = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second
        state.viewTime4 = year + "-" + month + "-" + strDate + " " + hour + "时"
      }
    },
    getTime3(state) {
      let date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      hour = (hour != 0 && hour < 10) ? '0' + hour : hour = hour;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (!state.timeValue5 || !state.viewTime5) {
        state.timeValue5 = year + "-" + month + "-" + strDate + " 00:00:00"
        state.viewTime5 = year + "-" + month + "-" + strDate + " 0时"
      }
      if (!state.timeValue6 || !state.viewTime6) {
        state.timeValue6 = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second
        state.viewTime6 = year + "-" + month + "-" + strDate + " " + hour + "时"
      }
    }
  },
  actions: {
    changeTime1(context, value) {
      context.state.timeValue1 = value;
      let h = value.split(":")[0].split(" ")[1];
      let date = value.split(" ")[0];
      if (Number(h) < 1) {
        h = Number(h);
      }
      context.state.viewTime1 = date + " " + h + "时";
    },
    changeTime2(context, value) {
      context.state.timeValue2 = value;
      let h = value.split(":")[0].split(" ")[1];
      let date = value.split(" ")[0];
      if (Number(h) < 1) {
        h = Number(h);
      }
      context.state.viewTime2 = date + " " + h + "时";
    },
    changeTime3(context, value) {
      context.state.timeValue3 = value;
      let h = value.split(":")[0].split(" ")[1];
      let date = value.split(" ")[0];
      if (Number(h) < 1) {
        h = Number(h);
      }
      context.state.viewTime3 = date + " " + h + "时";
    },
    changeTime4(context, value) {
      context.state.timeValue4 = value;
      let h = value.split(":")[0].split(" ")[1];
      let date = value.split(" ")[0];
      if (Number(h) < 1) {
        h = Number(h);
      }
      context.state.viewTime4 = date + " " + h + "时";
    },
    changeTime5(context, value) {
      context.state.timeValue5 = value;
      let h = value.split(":")[0].split(" ")[1];
      let date = value.split(" ")[0];
      if (Number(h) < 1) {
        h = Number(h);
      }
      context.state.viewTime5 = date + " " + h + "时";
    },
    changeTime6(context, value) {
      context.state.timeValue6 = value;
      let h = value.split(":")[0].split(" ")[1];
      let date = value.split(" ")[0];
      if (Number(h) < 1) {
        h = Number(h);
      }
      context.state.viewTime6 = date + " " + h + "时";
    },
    changeShop(context, value) {
      context.state.shopValue = value;
    }
  }
}
