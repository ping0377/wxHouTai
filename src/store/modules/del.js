export default {
  namespaced: true,
  state: {
    timeValue1: "",
    viewTime1: "",
    timeValue2: "",
    viewTime2: ""
  },
  mutations: {
    getTime(state) {
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
    }
  }
}
