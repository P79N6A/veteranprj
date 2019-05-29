/**
 * Created by Cris 04/06/2019
 */

// 当前所处的请求环境
const ua = navigator.userAgent
let deviceEnv = ''
if (ua.toLowerCase().indexOf('bm_android') !== -1) {
  // 安卓
  deviceEnv = 'bm_android'
} else if (ua.toLowerCase().indexOf('banma_ios_app') !== -1) {
  // ios
  deviceEnv = 'banma_ios_app'
} else {
  deviceEnv = ''
}

export default deviceEnv
