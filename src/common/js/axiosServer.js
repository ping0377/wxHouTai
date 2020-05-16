import $axios from 'axios';
// let HTTP = '/api/';// 发布模式要改成这个
let HTTP = 'http://weilang.fryxy.cn/api/';
// let quillHTTP = 'http://xyxh.fryxy.cn/association/';

// 图片上传
  // 'http://weilang.fryxy.cn/api/HttpImager.ashx?Function=HttpCreatePicture'

export async function addImg(Client, File) {
  let Data = new FormData();
  let url = HTTP + 'HttpImager.ashx?Function=HttpCreatePicture';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("File", File);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


// export async function quilladdImg(File, name) {
//   console.log(File,!name)
//   if (!name) {
//     name = "";
//   };
//   let Data = new FormData();
//   Data.append("file", File);
//   Data.append("fileName", name);
//   let url = quillHTTP + 'comm/batchUpload'
//   return $axios.post(url, Data, { emulateJSON: true }, {
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

//图片上传
export async function tickAddImg(Client, File) {
  let Data = new FormData();
  let url = HTTP + 'HttpImager.ashx?Function=HttpCreatePicture';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("File", File);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'

    }
  })
}

// 登录
export async function getLogin(username, userpwd) {
  let Data = new FormData();
  let json_array = {
    "WorkerNo": username,
    "Pwd": userpwd
  }
  let url = HTTP + 'Manager.ashx?Function=HttpLogin';
  if (JSON.stringify(json_array) != "{}") {
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 退出登录
export async function loginOut(Client) {
  let Data = new FormData();
  let url = HTTP + 'Shop.ashx?Function=HttpExit';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", "");
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 获取用户名
export async function getUserName(Client) {
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", "");
  }
  let url = HTTP + 'Manager.ashx?Function=HttpQueryWorkerInfo';
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 获取全部数据
export async function getAllData(Client) {
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", "");
  }
  let url = HTTP + 'Manager.ashx?Function=HttpQueryReserveOrder';
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 获取商店
export async function getShop(Client) {
  let url = HTTP + 'app.ashx?Function=HttpQueryAllShop';
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 获取状态
export async function getAllType(Client) {
  let url = HTTP + 'Manager.ashx?Function=HttpQueryReserveStates';
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", null);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 搜索数据
export async function getSearchData(Client, dateStart, dateEnd) {
  let Data = new FormData();
  let json_array = {}
  if (dateStart != "") {
    json_array["StartDt"] = dateStart;
  }
  if (dateEnd != "") {
    json_array.EndDt = dateEnd;
  }
  let url = HTTP + 'Manager.ashx?Function=HttpQueryReserveOrder';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 卡详细介绍
export async function getCardDetails(Client) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpQueryCardTypeDetails';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", "");
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 会员卡类型
export async function getCardType(Client) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpQueryCardType';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", "");
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 删除卡类型
export async function delCardType(Client, No) {
  let json_array = {
    "No": No
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpRemoveCardType';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 添加卡类型
export async function addCardType(Client) {
  let json_array = {
    "Name": "还没想好",
    "ImageUrl": null,
    "lifeDate": 360,
    "gbMoney": 5,
    "givePoint": 0,
    "giveMoney": 0,
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpAddCardType';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 卡类型修改
export async function changeTypeData(Client, Name, ImageUrl, lifeDate, gbMoney, givePoint, giveMoney, No, isteam, discount) {
  let Data = new FormData();
  let json_array = {
    "Name": Name,
    "ImageUrl": ImageUrl,
    "lifeDate": lifeDate,
    "gbMoney": gbMoney,
    "givePoint": givePoint,
    "giveMoney": giveMoney,
    "No": No,
    "isBoon": isteam,
    "discount": discount
  }
  let url = HTTP + 'Manager.ashx?Function=HttpCardTypeChange';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 卡详细介绍
export async function getCardDetail(Client) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpQueryCardTypeDetails';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", "");
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 获取卡类型
export async function CardDetailType(Client) {
  let url = HTTP + 'Manager.ashx?Function=HttpQueryCardType';
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", null);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 删除卡详情
export async function delCardDetail(Client, No) {
  let json_array = {
    "No": No
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpRemoveCardTypeDetails';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 添加卡详情
export async function addCardDetail(Client) {
  let json_array = {
    "Header": "还没想好",
    "Content": "还没想好",
    "TypeNo": null
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpAddCardTypeDetails';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 修改卡详情
export async function changeDataDetail(Client, Header, Type, Content, No) {
  let Data = new FormData();
  let json_array = {
    "Header": Header,
    "Content": Content,
    "TypeNo": Type,
    "No": No
  }
  let url = HTTP + 'Manager.ashx?Function=HttpChangeCardTypeDetails';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 获取管理员
export async function getWorker(Client) {
  let url = HTTP + 'Manager.ashx?Function=HttpQueryAllWorker';
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 营业统计
export async function searchOS(Client, startTime, endTime, WorkerNo, ShopNo) {
  let url = HTTP + 'Shop.ashx?Function=HttpQueryIncomeDetails';
  let Data = new FormData();
  let json_array = {
    "StartDt": startTime,
    "EndDt": endTime,
    "WorkerNo": WorkerNo,
    "ShopNo": ShopNo
  }
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 发卡统计
export async function searchDataCGS(Client, startTime, endTime, WorkerNo, ShopNo) {
  let Data = new FormData();
  let json_array = {
    "StartDt": startTime,
    "EndDt": endTime,
    "WorkerNo": WorkerNo,
    "ShopNo": ShopNo
  }
  let url = HTTP + 'Manager.ashx?Function=HttpQueryCardDispatchMoney';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 洗衣单统计
export async function searchDataLS(Client, startTime, endTime, WorkerNo, ShopNo) {
  let Data = new FormData();
  let json_array = {
    "StartDt": startTime,
    "EndDt": endTime,
    "WorkerNo": WorkerNo,
    "ShopNo": ShopNo
  }
  let url = HTTP + 'Manager.ashx?Function=HttpQueryWashOrderMoney';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 充值统计
export async function searchDataRCS(Client, startTime, endTime, WorkerNo, ShopNo) {
  let Data = new FormData();
  let json_array = {
    "StartDt": startTime,
    "EndDt": endTime,
    "WorkerNo": WorkerNo,
    "ShopNo": ShopNo
  }
  let url = HTTP + 'Manager.ashx?Function=HttpQueryCardRechargeMoney';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 退卡统计
export async function searchDataCGB(Client, startTime, endTime, WorkerNo, ShopNo) {
  let Data = new FormData();
  let json_array = {
    "StartDt": startTime,
    "EndDt": endTime,
    "WorkerNo": WorkerNo,
    "ShopNo": ShopNo
  }
  console.log(json_array)
  let url = HTTP + 'Manager.ashx?Function=HttpQueryCardGiveBackMoney';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 扣款统计
export async function searchDataPS(Client, startTime, endTime, WorkerNo, ShopNo) {
  let Data = new FormData();
  let json_array = {
    "startDt": startTime,
    "endDt": endTime,
    "WorkerNo": WorkerNo,
    "ShopNo": ShopNo
  }
  console.log(json_array)
  let url = HTTP + 'Manager.ashx?Function=HttpQueryDebitInformation';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 未付款洗衣单统计
export async function searchDataNPS(Client, startTime, endTime, WorkerNo, ShopNo) {
  let Data = new FormData();
  let json_array = {
    "StartDt": startTime,
    "EndDt": endTime,
    "WorkerNo": WorkerNo,
    "ShopNo": ShopNo
  }
  let url = HTTP + 'Manager.ashx?Function=HttpQueryWashOrderNotPay';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 积分赠送统计
export async function searchDataIS(Client, startTime, endTime) {
  let Data = new FormData();
  let json_array = {
    "StartDt": startTime,
    "EndDt": endTime
  }
  let url = HTTP + 'Manager.ashx?Function=HttpQueryIntegralDive';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 会员消费统计
export async function searchDataVS(Client, startTime, endTime, Name, Tel, shop) {
  let Data = new FormData();
  let json_array = {
    "StartDt": startTime, //开始时间
    "EndDt": endTime, //结束时间
    "CardNo": "", //卡号
    "Name": Name, //用户姓名
    "Tel": Tel, //用户电话
    "RechargeValue": 0, //充值金额
    "GiveValue": 0, //赠送金额
    "ConsumptionValue": 0, //消费金额
    "Balance": 0, //余额
    "issueDate": "", //发行日期
    "stateName": "", //卡状态
    "typeName": "", //卡类型
    "shopNo": shop
  }
  let url = HTTP + 'Shop.ashx?Function=HttpQueryCardConsumptionViewForShop';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 电话预约
export async function phoneOrder(Client) {
  let url = HTTP + 'Manager.ashx?Function=HttpQueryTelPreOrder';
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", null);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 电话预约 删除
export async function delPhoneOrder(Client, No) {
  let json_array = {
    "No": No
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpRemoveTelPreOrder';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 电话预约 添加
export async function addPhoneOrder(Client, createDt) {
  let json_array = {
    "Addr": null,
    "Name": null,
    "RecvDt": null,
    "Tel": null,
    "createDt": createDt,
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpAddTelPreOrder';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 电话预约 修改
export async function changePhoneOrder(Client, Addr, Name, RecvDt, Tel, No) {
  let Data = new FormData();
  let json_array = {
    "Name": Name,
    "Addr": Addr,
    "RecvDt": RecvDt,
    "Tel": Tel,
    "No": No
  }
  let url = HTTP + 'Manager.ashx?Function=HttpChangeTelPreOrder';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 商品分类
export async function ShopList(Client) {
  let url = HTTP + 'Manager.ashx?Function=HttpQueryGoodsType';
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", null);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 商品分类 添加
export async function addShopList(Client) {
  let json_array = {
    "Name": "还没想好"
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpAddGoodsType';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 商品分类 删除
export async function delShopList(Client, No) {
  let json_array = {
    "No": No
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpRemoveGoodsType';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 商品分类 修改
export async function changeShopList(Client, Name, No) {
  let Data = new FormData();
  let json_array = {
    "Name": Name,
    "No": No
  }
  let url = HTTP + 'Manager.ashx?Function=HttpRenameGoodsType';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 洗衣分类
export async function WashList(Client) {
  let url = HTTP + 'Manager.ashx?Function=HttpQueryOnLineType';
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", null);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 洗衣分类 添加
export async function addWashList(Client) {
  let json_array = {
    "Name": "还没想好"
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpAddOnLineType';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 洗衣分类 删除
export async function delWashList(Client, No) {
  let json_array = {
    "No": No
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpRemoveOnLineType';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 洗衣分类 修改
export async function changeWashList(Client, Name, No) {
  let Data = new FormData();
  let json_array = {
    "Name": Name,
    "No": No
  }
  let url = HTTP + 'Manager.ashx?Function=HttpRenameOnLineType';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 洗衣管理
export async function getWashManage(Client) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpQueryOnline';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", "");
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 洗衣管理 获取类型
export async function WashManageType(Client) {
  let url = HTTP + 'Manager.ashx?Function=HttpQueryOnLineType';
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", null);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 洗衣管理 添加
export async function addWashManage(Client) {
  let json_array = {
    "TypeNo": null,
    "Name": "",
    "ImageUrl": "",
    "Price": "0-999999"
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpAddOnline';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 洗衣管理 修改
export async function changeWashManage(Client, Name, ImageUrl, Price, TypeNo, No) {
  let Data = new FormData();
  let json_array = {
    "Name": Name,
    "ImageUrl": ImageUrl,
    "Price": Price,
    "TypeNo": TypeNo,
    "No": No
  }
  let url = HTTP + 'Manager.ashx?Function=HttpChangeOnline';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 洗衣管理 删除
export async function delWashManage(Client, No) {
  let json_array = {
    "No": No
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpRemoveOnline';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 商品管理
export async function getShopManage(Client) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpQueryGoods';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", "");
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 商品管理 获取类型
export async function ShopManageType(Client) {
  let url = HTTP + 'Manager.ashx?Function=HttpQueryGoodsType';
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", null);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 商品管理 添加
export async function addShopManage(Client) {
  let json_array = {
    "TypeNo": null,
    "Name": "",
    "ImageUrl": "",
    "Price": "0-999999"
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpAddGoods';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 商品管理 修改
export async function changeShopManage(Client, Name, ImageUrl, Price, TypeNo, No) {
  let Data = new FormData();
  let json_array = {
    "Name": Name,
    "ImageUrl": ImageUrl,
    "Price": Price,
    "TypeNo": TypeNo,
    "No": No
  }
  let url = HTTP + 'Manager.ashx?Function=HttpChangeGoods';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 商品管理 删除
export async function delShopManage(Client, No) {
  let json_array = {
    "No": No
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpRemoveGoods';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 轮播图
export async function getImg(Client) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpGetMainPageHeader';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", "");
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 提交修改的图片
export async function changeImg(Client, Imgs) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpSetMainPageHeader';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(Imgs));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 员工管理
export async function searchStaff(Client, shop, worker) {
  let Data = new FormData();
  let json_array = {};
  if (!!shop) {
    json_array.ShopNo = shop;
  };
  if (!!worker) {
    json_array.WorkerNo = worker;
  }
  let url = HTTP + 'Manager.ashx?Function=HttpQueryAllWorkerEx';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 员工管理 添加
export async function addStaff(Client) {
  let json_array = {}
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpAddWorker';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 员工管理 修改
export async function changeStaff(Client, Name, Tel, workerAdd, idNum, sex, loginPwd, Shop, Remark, No) {
  let json_array = {
    "Name": Name,
    "Tel": Tel,
    "workerAdd": workerAdd,
    "idNum": idNum,
    "sex": sex,
    "loginPwd": loginPwd,
    "ShopNo": Shop,
    "Remark": Remark,
    "No": No
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpChangeWorker';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 员工管理 开除
export async function delStaff(Client, No) {
  let json_array = {
    "No": No
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpRemoveWorker';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 权限管理
export async function jurisdiction(Client, No) {
  let json_array = {
    "WorkerNo": No
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpQueryWorkerAuth';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 设置权限
export async function setPer(Client, No, Per) {
  let json_array = {
    "WorkerNo": No,
    "Per": Per
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpSetWorkerAuth';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 分销统计
export async function searchWDI(Client, No, Year, Month) {
  let json_array = {
    "WorkerNo": No,
    "SearchYear": Year,
    "SearchMonth": Month
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpDispachInfoForWeb';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 拷贝店铺数据
export async function Copy(Client, ShopNo1, ShopNo2) {
  let json_array = {
    "ShopNo1": ShopNo1,
    "ShopNo2": ShopNo2
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpCopyShopData';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 预约通知
export async function searchNotice(Client, shop) {
  let Data = new FormData();
  let json_array = {
    fkshopNo:shop
  };
  // if (!!shop) {
  //   json_array.fkshopNo = shop;
  // };
  let url = HTTP + 'Shop.ashx?Function=HttpGetWXNotification';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 预约通知 添加
export async function addNotice(Client, obj) {
  console.log(obj);
  let Data = new FormData();
  let url = HTTP + 'Shop.ashx?Function=HttpAddWXNotification';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(obj));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 查询微信
export async function getOpenId(Client, name) {
  let json_array = {
    "nickName": name
  }
  let Data = new FormData();
  let url = HTTP + 'Shop.ashx?Function=HttpGetOpenIdByName';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 预约通知 修改
export async function changeNotice(Client, Tel, Shop, No, wx) {
  let json_array = {
    "OpenId": wx,
    "Tel": Tel,
    "fkshopNo": Shop,
    "pkNo": No
  }
  let Data = new FormData();
  let url = HTTP + 'Shop.ashx?Function=HttpChangeWXNotification';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 预约通知 删除
export async function delNotice(Client, No) {
  let json_array = {
    "pkNo": No
  }
  let Data = new FormData();
  let url = HTTP + 'Shop.ashx?Function=HttpDelWXNotification';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//所有快递柜
export async function getallSack(Client, inc, posturl) {
  let Data = new FormData();
  let url = HTTP + posturl;
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(inc));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 店铺管理
export async function getAllShop(Client) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpQueryAllShop';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//收衣点查询
export async function queryInc(Client, name) {
  let json_array = {
    "name": name
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpSearchVirtual';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 店铺管理 修改
export async function setShop(Client, json_array) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpChangeVirtualShop';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 参数设置
export async function getSetting(Client) {
  let json_array = ["RechargeUseInteusePercent", "UserRegisterGive", "GiveWhenShareSuccess",
    "ShareTittle", "ShareRemark", "ShareIcon",'IndexLeftImg','IndexRightImg'
  ]
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpQueryStaticValue';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    // Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 参数设置 上传图标
export async function setImg(Client, img, name) {
  let json_array = {
    "Name": name,
    "Value": img
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpSetStaticValue';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 参数设置 更新
export async function setText(Client, value, name) {
  let json_array = {
    "Name": name,
    "Value": value
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpSetStaticValue';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 所有收衣点
export async function allIncome(Client, income) {
  let url = HTTP + `Manager.ashx?Function=HttpGetCabinets`;
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(income));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//  删除收衣点
export async function deletIncome(Client, inc) {
  let Data = new FormData();
  let url = HTTP + `Manager.ashx?Function=HttpRemoveCabinet`
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(inc));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 修改收衣点
export async function changeIncome(Client, income) {
  let url = HTTP + `Manager.ashx?Function=HttpChangeVirtual`;
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(income));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 添加收衣点
export async function addStore(Client, income) {
  let Data = new FormData();
  let url = HTTP + `Manager.ashx?Function=HttpAddCabinet`;
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(income));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//店铺管理  所有收衣店铺
export async function AllVirtualShop(Client, shopNo) {
  let url = HTTP + `Manager.ashx?Function=HttpQueryAllVirtualShop`;
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(shopNo));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//添加收衣店铺
export async function addShop(Client, inc) {
  let url = HTTP + `Manager.ashx?Function=HttpCreateVirtualShop`;
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(inc));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除收衣点店铺
export async function dltIshop(Client, inc) {
  let url = HTTP + `Manager.ashx?Function=HttpRemoveVirtualShop`;
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(inc));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//开除员工
export async function dltEmployee(Client, incNo) {
  let url = HTTP + `Manager.ashx?Function=HttpRemoveWorker`;
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(incNo));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//添加员工
export async function AddPersonnel(Client, inc) {
  let url = HTTP + `Manager.ashx?Function=HttpAddVirtualWorker`;
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(inc));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// export async function allIncome(Client, income) {
//   let url = HTTP + `Manager.ashx?Function=HttpGetCabinets`;
//   let Data = new FormData();
//   if (JSON.stringify(Client) != "{}") {
//     Data.append("ClientAddr", Client);
//     Data.append("Data", JSON.stringify(income));
//   }
//   return $axios.post(url, Data, {
//     emulateJSON: true
//   }, {
//       headers: {
//         'Content-Type': 'application/json;charset=UTF-8'
//       }
//     })
// }

//所有衣服名称
export async function allDress() {
  let Client = localStorage.getItem("ClientAddr");
  let url = HTTP + "Shop.ashx?Function=HttpQueryClothesNameByAll"
  let Data = new FormData()
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//所有员工
export async function allStaffs(Client, staff) {
  let url = HTTP + "Manager.ashx?Function=HttpQueryAllWorkerEx"
  let Data = new FormData()
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(staff))
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 充值设置
export async function getChargeSet(Client) {
  let json_array = ["RechargePattern", "RechargeSendType"]
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpQueryStaticValue';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 充值设置 更新
export async function setCharge(Client, value, name) {
  let json_array = {
    "Name": name,
    "Value": value
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpSetStaticValue';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 预约设置
export async function getReservationSet(Client) {
  let json_array = ["OrderDate", "OrderClothsSum", "OrderTittleImg", "funSetting"]
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpQueryStaticValue';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 预约设置 更新
export async function setReservation(Client, value, name) {
  let json_array = {
    "Name": name,
    "Value": value
  }
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpSetStaticValue';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 智能柜
export async function getBox(Client, incType, No) {
  let Data = new FormData();
  let json_array = {
    type: incType,
    shopNo: No,
  }
  let url = HTTP + 'Manager.ashx?Function=HttpGetCabinets';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
    // Data.append("Data", JSON.stringify({
    //   "shopNo": No
    // }));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 智能柜 删除
export async function delBox(Client, id) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpRemoveCabinet';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify({
      "deviceID": id
    }));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 智能柜 添加
export async function addBox(Client, obj) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpAddCabinet';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(obj));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 智能柜 修改
export async function changeBox(Client, obj) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpChangeCabinet';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(obj));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 柜门
export async function getDoor(Client, id) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpGetLocker';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify({
      "deviceID": id
    }));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 柜门 修改
export async function changeDoor(Client, deviceID, boxInfo) {
  let Data = new FormData();
  let json_array = {
    deviceID: deviceID,
    boxInfo: boxInfo
  }
  let url = HTTP + 'Manager.ashx?Function=HttpChangeCabinetLocker';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 柜门 删除
export async function delDoor(Client, deviceID, boxInfo) {
  let Data = new FormData();
  let json_array = {
    deviceID: deviceID,
    boxInfo: boxInfo
  }

  let url = HTTP + 'Manager.ashx?Function=HttpRemoveCabinetLocker';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// HTTP请求，application/json;charset=UTF-8头部形式
export async function JsonPost(url, json_array = {}) {
  let Data = new FormData();
  let Client = localStorage.getItem("ClientAddr");
  let URL = HTTP + url;
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(json_array));
  }
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

}

// 批量添加袋子
export async function addBags(Client, obj) {
  let Data = new FormData();
  let url = HTTP + 'Manager.ashx?Function=HttpAddVirtualLocker';
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("Data", JSON.stringify(obj));
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 通用方法
export async function upData(port, obj) {
  let Data = new FormData();
  let url = HTTP + port;
  let Client = localStorage.getItem("ClientAddr");
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    if (JSON.stringify(obj) != "{}" && !!obj) {
      Data.append("Data", JSON.stringify(obj));
    } else {
      Data.append("Data", "");
    }
  }
  return $axios.post(url, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// export async function tx_url(){

// }

//添加完删除有图片上传处的图片
export async function dltImg(id1, id2) {
  try {
    let addDimg = document.getElementById(id1).getElementsByTagName("ul")[0].getElementsByClassName("el-icon-close")[0]
    addDimg.click()
  } catch (error) {}
  try {
    let addJimg = document.getElementById(id2).getElementsByTagName("ul")[0].getElementsByClassName("el-icon-close")[0]
    addJimg.click()
  } catch (error) {}
}
// 获取分销商列表 // 根据名称或者电话模糊查询分销商信息
export async function get_fxs(url, Client, name) {
  let URL = HTTP + url;
  let Data = new FormData();
  let form={
    'name':name
  }
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("data",JSON.stringify(form))
  }
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 根据名称或者电话模糊查询分销商信息

// 修改分销商信息
export async function change_fxs(url, Client, form) {
  let URL = HTTP + url;
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append("data", JSON.stringify(form));
  }
  console.log(Data, 'data')
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 根据分销商编号和时间获取订单记录
export async function getfx_list(pkNo, url, Client, startDt, endDt) {
  let URL = HTTP + url;
  let Data = new FormData();
  let form = {
    'startDt': startDt,
    'endDt': endDt,
    'PartnerNo': pkNo
  }
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append('data', JSON.stringify(form))
  }
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 根据订单编号获取数据
export async function getdetails(url,Client,ReserveNo) {
  let URL = HTTP + url;
  let Data = new FormData();
  let form = {
   'ReserveNo':ReserveNo
  }
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append('data', JSON.stringify(form))
  }
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 获取指定分销商的订单信息，渲染剩余5个方块
export async function getordermsg(url,Client,PartnerNo) {
  let URL = HTTP + url;
  let Data = new FormData();
  let form = {
   'PartnerNo':PartnerNo
  }
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append('data', JSON.stringify(form))
  }
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 收衣点数据查询
export async function getacceptclothemsg(url,Client,data) {
  let URL = HTTP + url;
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append('data', JSON.stringify(data))
  }
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 删除收衣点信息
export async function delemsg(url,Client,pkNo) {
  let URL = HTTP + url;
  let Data = new FormData();
  let form={
    pkNo:pkNo
  }
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append('data', JSON.stringify(form))
  }
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 审核采集收衣点数据  通过/拒绝
export async function auditmsg(url,Client,data) {
  let URL = HTTP + url;
  let Data = new FormData();
  
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append('data', JSON.stringify(data))
  }
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 收衣点统计的
export async function getclothesmsg(url,Client,data) {
  let URL = HTTP + url;
  let Data = new FormData();
  
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append('data', JSON.stringify(data))
  }
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 获取所有省份
export async function getallProvinces(url,Client) {
  let URL = HTTP + url;
  let Data = new FormData();
  
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    // Data.append('data', JSON.stringify(data))
  }
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 修改设置，好多数据
export async function updatemsg(url,Client,jsonArr) {
  let URL = HTTP + url;
  let Data = new FormData();
  if (JSON.stringify(Client) != "{}") {
    Data.append("ClientAddr", Client);
    Data.append('data', JSON.stringify(jsonArr))
  }
  return $axios.post(URL, Data, {
    emulateJSON: true
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
