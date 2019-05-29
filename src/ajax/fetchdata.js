/**
 * Created by Cris 04/06/2019
 */
import ajaxMed from './ajax.js'
import getDomain from '../utils/domain.js'
import apiUtils from './api-utils.js'
import Vue from 'vue'
import router from '../router'

let vm = new Vue({
  router
})
let ajaxParam = {
  /**
   * @method 获取当前的时间戳
   */
  timestamp: () => {
    const nowtime = new Date()
    // 获取年月日 时分秒
    const y = nowtime.getFullYear()
    let MM = nowtime.getMonth() + 1
    MM = MM < 10 ? ('0' + MM) : MM
    let D = nowtime.getDate()
    D = D < 10 ? ('0' + D) : D
    let h = nowtime.getHours()
    h = h < 10 ? ('0' + h) : h
    let mm = nowtime.getMinutes()
    mm = mm < 10 ? ('0' + mm) : mm
    let s = nowtime.getSeconds()
    s = s < 10 ? ('0' + s) : s
    let fulltime = y + '-' + MM + '-' + D + ' ' + h + ':' + mm + ':' + s
    return fulltime
  },
  /**
   * @method 生成签名
   */
  sign: (param, appSecert) => {
    // 生成签名
    let sign = ''
    sign = window.___ssign(param, appSecert)
    return sign
  }
}

export default {
  /**
   * @method 公有云get方法，不需要动态匹配域名
   * @param {param} 请求参数
   * @param {api} 接口请求的method
   */
  fetchGet: (param, api) => {
    let domainUrl = getDomain.baseurl + '/router/rest'
    // 获取method
    api = apiUtils[api].api
    param['method'] = api
    // 设置时间戳
    param['timestamp'] = ajaxParam.timestamp()
    // 设置 v
    param['v'] = param.v || '1.0'
    // 设置appKey
    param['appKey'] = getDomain.appKey
    // 签名sign
    var appSecert = getDomain.appSecert
    param['sign'] = ajaxParam.sign(param, appSecert)
    let promise = new Promise((resolve, reject) => {
      ajaxMed.get(param, domainUrl).then(res => {
        if (res) {
          resolve(res)
        }
        // 非P环境输出log
        if (getDomain.env !== 'P') {
          console.log(api, res)
        }
      }).catch(err => {
        reject(err)
      })
    })
    return promise
  },
  /**
   * @method 老司机公有云get方法，不需要动态匹配域名
   * @param {param} 请求参数
   * @param {api} 接口请求的method
   * @param {ReqDto} 接口参数bto
   */
  fetchVeteranGet: (param, api, ReqDto) => {
    // 获取method
    api = apiUtils[api].api
    let domainUrl = getDomain.veteranbaseurl + api
    // 组装参数 添加data
    let token = localStorage.getItem('token')
    let banmaId = localStorage.getItem('banmaId')
    //let banmaId = 7
    if (banmaId) {
      banmaId = parseInt(banmaId)
    }
    // param传递的token
    var parambanmaId = param.banmaId
    if (parambanmaId) {
      parambanmaId = parseInt(parambanmaId)
    }
    param['banmaId'] = banmaId || parambanmaId
    // param['banmaId'] = 7
    var dataObj = {
      data: {
        token: token || param.token
      }
    }
    dataObj.data[ReqDto] = param
    // 设置appKey
    dataObj.data['appKey'] = getDomain.appKey
    // 设置时间戳
    dataObj.data['timestamp'] = ajaxParam.timestamp()
    // 设置 v
    dataObj.data['v'] = param.v || '1.0'
    // 签名sign
    dataObj.data['sign'] = ajaxParam.sign(dataObj)

    let promise = new Promise((resolve, reject) => {
      ajaxMed.get(dataObj, domainUrl).then(res => {
        if (res) {
          resolve(res)
        }
        // 登录态失效 重新登录
        if (res && (res.data && res.data.err_resp)) {
          var errcode = res.data.err_resp.code
          // "登录态失效，请重新登录"
          if (errcode == '14101' || errcode == '14102') {
            var errMsg = res.data.err_resp.msg
            vm.$toast(errMsg)
            localStorage.removeItem('token')
            localStorage.removeItem('banmaId')
            vm.$router.push({
              path: '/'
            })
          }
        }
        // 非P环境输出log
        if (getDomain.env !== 'P') {
          console.log(api, res)
        }
      }).catch(err => {
        reject(err)
      })
    })
    return promise
  },
  /**
   * @method 公有云post方法，不需要动态匹配域名
   * @param {param} 请求参数
   * @param {api} 接口请求的method
   */
  fetchPost: (param, api) => {
    // 获取api
    api = apiUtils[api].api
    let domainUrl = getDomain.baseurl + '/router/rest/' + api
    // 设置appKey
    param['appKey'] = getDomain.appKey
    // 设置时间戳
    param['timestamp'] = ajaxParam.timestamp()
    // 设置 v
    param['v'] = param.v || '1.0'
    // 签名sign
    param['sign'] = ajaxParam.sign(param)
    let promise = new Promise((resolve, reject) => {
      ajaxMed.post(param, domainUrl).then(res => {
        if (res) {
          resolve(res)
        }
        // 非P环境输出log
        if (getDomain.env !== 'P') {
          console.log(api, res)
        }
      }).catch(err => {
        reject(err)
      })
    })
    return promise
  }
}