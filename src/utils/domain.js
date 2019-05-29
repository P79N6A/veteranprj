/**
 * Created by Cris 04/06/2019
 */
// 环境变量
let env
if (location.host === 'h5.zebred.com') {
  env = 'P'
} else if (location.host.includes('pre.h5.zebred.com')) {
  env = 'QA'
} else if (location.host.includes('pp.h5.zebred.com')) {
  env = 'PP'
} else {
  env = 'QA'
}
// baseurl
const baseurlist = {
  'P': 'https://gw.zebred.com',
  'PP': 'https://pp.gw.zebred.com',
  'QA': 'https://pre.gw.zebred.com',
  'DEV': 'https://pre.gw.zebred.com'
}
const baseurl = baseurlist[env]
// veteranbaseurl
const veteranbaseurlist = {
  'P': 'https://bm-avn.ebanma.com',
  'PP': 'https://bm-avn-pp.ebanma.com',
  'QA': 'https://bm-avn-qa.ebanma.com',
  'DEV': 'https://bm-avn-daily.ebanma.com'
}
const veteranbaseurl = veteranbaseurlist[env]
// appkey
const appKeylist = {
  'P': 1160,
  'PP': 1008,
  'QA': 1008,
  'DEV': 1008
}
let appKey = appKeylist[env]
// 仅在QA测试
var appSecert = ''
if (env == 'P') {
  // 1160
  appSecert = '7EF16C86C3F9B90E491A1512AED55036'
} else {
  // 1108
  appSecert = '128EC45C2C3AFB7B3A83217848F3E410'
}

/**
 * 获取屏幕最小高度
 */
// 预设的最小高度
var baseFontsize = 14 * (document.documentElement.clientWidth / 375)
var minHeight = baseFontsize * 46
// 如果预设高度小于一屏高度时，高度等于屏幕高度
var pageHeight = document.documentElement.clientHeight
var currentHeight = 0
if (minHeight < pageHeight) {
  currentHeight = pageHeight
} else {
  currentHeight = minHeight
}

/**
 * 头像列表
 */
var imgUrlArr = [
  require('../assets/images/portrait1.png'),
  require('../assets/images/portrait2.png'),
  require('../assets/images/portrait3.png'),
  require('../assets/images/portrait4.png'),
  require('../assets/images/portrait5.png'),
  require('../assets/images/portrait6.png')
]

export default {
  env,
  baseurl,
  appKey,
  appSecert,
  currentHeight,
  veteranbaseurl,
  imgUrlArr
}
