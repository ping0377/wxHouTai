import Vue from 'vue'
import Vuex from 'vuex'
import timer from './modules/timer'
import coupon from './modules/coupon'
import card from './modules/card'
import del from './modules/del'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timer,
    coupon,
    card,
    del
  }
})