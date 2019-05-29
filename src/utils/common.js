/**
 * Created by Cris 04/06/2019
 */

export default {
  /**
   * 判断app版本是否大于等于2.2
   * @return {boolean}
   */
  isVersionMore2Dot2 () {
    let u = navigator.userAgent
    /* if (this.isFromAndroid()) { // 如果是安卓手机，使用旧版本的webview
      return false
    } */
    if (u.indexOf('appVersionName') > 0) {
      let appVersion = ''
      appVersion = u.match(/#appVersionName:(\S*)#/)[1]
      let strs = appVersion.split('.')
      if (parseInt(strs[0]) < 2) {
        return false
      } else {
        if (parseInt(strs[1]) < 2) {
          return false
        } else {
          return true
        }
      }
    }
    return false
  },
  /**
   * 判断ios
   * @return {boolean}
   */
  isFromIos () {
    let u = navigator.userAgent
    // banma_ios_app
    if (u.toLowerCase().indexOf('banma_ios_app') !== -1) {
      return true
    }
    return false
  },
  /**
   * 判断安卓设备
   * @returns {boolean}
   */
  isFromAndroid () {
    let u = navigator.userAgent
    console.log(JSON.stringify(u))
    if (u.toLowerCase().indexOf('bm_android') !== -1) {
      return true
    }
    return false
  }
}
