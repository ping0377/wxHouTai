// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import './assets/index.css';
import store from './store' //配置vuex
import VueClipboard from 'vue-clipboard2'
import QuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import ViewUI from 'view-design';
import $ from 'jquery'

Vue.use(QuillEditor)
Vue.use(VueClipboard)
Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.prototype.$Common = {};

//高德地图
import AMap from 'vue-amap'
Vue.use(AMap)
// 初始化地图
AMap.initAMapApiLoader({
  // 高德的key
  key: '3ab4f8834420771a249ceb40dd2edfb3',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //使用vuex
  components: {
    App
  },
  template: '<App/>'
})

// 日期过滤
Vue.filter('data', function (value) {
  let MD = value.split("-")[1] + "-" + value.split("-")[2].split(" ")[0];
  return MD;
})

// 时间过滤
Vue.filter('time', function (value) {
  let HM = value.split("-")[2].split(" ")[1].split(":")[0] + ":" + value.split("-")[2].split(" ")[1].split(":")[1];
  return HM;
})
