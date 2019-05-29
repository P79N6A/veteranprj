/**
 * @method native能力兼容 兼容android/ios
 * Created by Cris 04/06/2019
 */
import commonUtils from './common.js'

let nativeMed = {
  // 是否是2.2版本
  isMore2Dot2: commonUtils.isVersionMore2Dot2(),
  // 是否为ios
  isFromIos: commonUtils.isFromIos(),
  // 是否为android
  isFromAndroid: commonUtils.isFromAndroid(),
  default: () => {
    console.log(commonUtils.isVersionMore2Dot2())
    console.log('default')
  },
  /**
   * 调用webview base中的方法接口
   * @param methodName
   * @param params
   * @param success
   * @param error
   */
  baseWebviewCall (methodName, params, success, error) {
    return window.WindVane.call('BMJSBridge', methodName, params, success, (e) => {
      console.log(e)
    })
  },
  /**
   * 获取用户登录信息
   * @useOld
   * @returns token、tokenA、vin、oemCode、banmaId、creditCode、secureTimestamp、clientId、headUrl、oemMobile、statusBarHeight
   */
  getNativeData () {
    if (!this.isMore2Dot2 || window.isOldWebview) { // 余额以及发现模块使用旧版本的webview
      return new Promise((resolve, reject) => {
        resolve(JSON.parse(window.webview.getNativeData()))
      })
    } else {
      return this.baseWebviewCall('getNativeData')
    }
  },
  /**
   * 调用默认toast弹框
   * @param msg
   */
  messageToastAction (msg) {
    if (this.isFromAndroid || this.isFromIos) {
      if (!this.isMore2Dot2 || window.isOldWebview) {
        window.webview.messageToastAction(msg)
      } else {
        this.baseWebviewCall('messageToastAction', {msg})
      }
    }
  },
  /**
   * 接口返回error处理
   * @param type
   * @param data
   * @param vin
   */
  errorHandler (type, data, vin) {
    if (this.isFromAndroid || this.isFromIos) {
      if (!this.isMore2Dot2 || window.isOldWebview) {
        console.log('data' + data)
        window.webview.errorMessageHandler(type, JSON.stringify(data), vin)
      } else {
        this.baseWebviewCall('errorMessageHandler', {type, data, vin})
      }
    }
  }
}

export default nativeMed
