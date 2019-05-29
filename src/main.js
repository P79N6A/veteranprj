// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入初始化样式表
import './assets/css/normalize.css'
// 引入自适应适配文件
import './assets/js/rem.js'
// 引入Vuex
import store from './store'
// 引入手机系统区分文件
import deviceEnv from './utils/device-env'
// axios请求方法
import fetchData from './ajax/fetchData.js'
// native中能力兼容
import nativeMed from './utils/native-utils.js'
// 实现android低版本es6 api的兼容
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
// 引入echarts
import Echarts from 'echarts'
//引入微信sdk
import wx from 'weixin-js-sdk'
import wxApi from '@/utils/WeChat.js'
// mint-ui css
import 'mint-ui/lib/style.css'

Vue.use(Echarts)
require('es6-promise').polyfill()
Es6Promise.polyfill()

import toastRegistry from './toast/index'
// 这里也可以直接执行 toastRegistry()
Vue.use(toastRegistry)
    // 输出最小高度
import domainMed from './utils/domain'
// 设置埋点自定义参数
var currentBanmaId = localStorage.getItem('banmaId')
    // eslint-disable-next-line
if (currentBanmaId) {
    // eslint-disable-next-line
    window._baq.push(['_setUserInfo', (currentBanmaId).toString() || '', '', '', ''])
    window._hmt.push(['_setCustomVar', 1, 'banmaId', (currentBanmaId).toString() || ''])
}
// eslint-disable-next-line
// window._baq.push(['_setCustomVar', 'PhoneNumber', data.oemMobile||''])
// eslint-disable-next-line
// window._baq.push(['_setCustomVar', 'vin', data.vin||''])
// 集成plus
// var onPlusReady = function (callback, context = this) {
//   if (window.plus) {
//     callback.call(context)
//   } else {
//     document.addEventListener('plusready', callback.bind(context))
//   }
// }
// Vue.mixin({
//   beforeCreate () {
//     onPlusReady(() => {
//       console.log(222222222)
//       this.plusReady = true
//     }, this)
//   },
//   methods: {
//     onPlusReady: onPlusReady
//   }
// })

Vue.config.devtools = true

Vue.prototype.$deviceEnv = deviceEnv
Vue.prototype.$fetchData = fetchData
Vue.prototype.$nativeMed = nativeMed
Vue.prototype.$wx = wx
Vue.prototype.$echarts = Echarts
Vue.prototype.$wxApi = wxApi
Vue.prototype.$minpageHeight = domainMed.currentHeight
Vue.prototype.imgUrlArr = domainMed.imgUrlArr
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})