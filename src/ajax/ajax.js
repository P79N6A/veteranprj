/**
 * Created by Cris 04/06/2019
 */

import axios from 'axios'
import qs from 'qs'
let options = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 1000 * 60
}

let ajax = {
  /**
   * post请求方法
   * @param {param} 请求参数
   * @param {domainUrl} 域名
   */
  post: (param, domainUrl) => {
    const promise = new Promise((resolve, reject) => {
      axios.post(domainUrl, qs.stringify(param), options)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
    return promise
  },
  /**
   * 公有云get请求方法
   * @param {param} 请求参数
   * @param {domainUrl} 域名
   */
  get: (param, domainUrl) => {
    const promise = new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        params: param,
        baseURL: domainUrl,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
    return promise
  },
  /**
   * 私有云get请求方法
   * @param {url} method
   * @param {param} 请求参数
   * @param {domainUrl} 域名
   */
  privateget: (url, param, domainUrl) => {
    const promise = new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: url,
        params: param,
        baseURL: domainUrl,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
    return promise
  }
}

export default ajax
