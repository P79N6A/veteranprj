<template>
  <div class="wrapper" :style="{ 'min-height': currentHeight + 'px' }">
    <!-- 登录与免登页面 -->
    <div
      class="maintainbox"
      v-if="true"
      :style="{
        'min-height': currentHeight + 'px',
        bottom: loginPageBto + 'px'
      }"
      :class="{'loginbgcbpc': true}"
    >
      <div class="maintain-content">
        <!-- 头部区域 -->
        <div class="top-header">
          <img src="../assets/images/title.png" alt="activity theme" />
        </div>
        <div class="main">
          <div class="login-box">
            <!-- 用户未登陆情形 -->
            <div v-if="!userIslogin">
              <div class="title">斑马智行用户快速登录</div>
              <ul class="input-box">
                <li class="item-phone">
                  <input
                    type="text"
                    v-model="userMobile"
                    maxlength="11"
                    placeholder="请输入您的手机号码"
                  />
                </li>
                <li class="item-mescode">
                  <input
                    type="text"
                    v-model="userMescode"
                    placeholder="请输入验证码"
                    maxlength="6"
                  />
                  <div @click="getMescode">{{ mesbtn }}</div>
                </li>
              </ul>
            </div>
            <!-- 用户免登录情形 -->
            <div v-if="userIslogin">
              <div class="user-name">用户名：<span>{{nickName||'-'}}</span></div>
            </div>
            <!-- 用户协议 -->
            <div class="user-agreement">
              <!-- 未登录 -->
              <span class="icon" v-if="!userIslogin" @click="selectAgreeMed">
                <img v-if="isAgreeBool" src="../assets/images/selected.png"/>
                <img v-if="!isAgreeBool" src="../assets/images/selectfalse.png"/>
              </span>
              <!-- 免登 -->
              <span class="icon" v-if="userIslogin">
                <img src="../assets/images/selected.png"/>
              </span>
              <span class="detail"
                >我已阅读并同意<span @click="swithAgreeMed"
                  >《用户协议》</span
                ></span
              >
            </div>
            <div class="slogan">
              报名后与平时一样开车<br />
              即有机会赢取丰厚奖品！
            </div>
            <!-- 立即参与 -->
            <div class="check-btn" @click="joinActMed">立即参加</div>
            <!-- 抽奖 -->
            <div class="lottery" @click="linkIntroMed">
              我还没有互联网汽车，立即体验和抽奖>>
            </div>
          </div>
        </div>
        <!-- 底部的logo -->
        <div class="banma-logo">
          <img src="../assets/images/logo.png" alt="logo" />
        </div>
      </div>
    </div>
    <!-- 首页动画 -->
    <mtloading v-on:loadingMed="loadingMed" v-if="loadingPageBool"></mtloading>
    <!-- 用户协议 -->
    <useragreement
      v-on:reviceBool="reviceMed"
      v-if="showAgreement"
    ></useragreement>
    <!-- 非车主用户弹窗 -->
    <joinfail v-on:closejoinfail="joinfailMed" v-if="failflag"></joinfail>
    <!-- 活动未结束 -->
    <waitresult v-if="waitflag"></waitresult>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import mtloading from './loading.vue'
import useragreement from '../components/userAgreement.vue'
import joinfail from '../components/joinfail.vue'
import waitresult from '../components/waitresult.vue'
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      baseFontsize: 14,
      pageHeight: 0,
      currentHeight: 0,
      bgcheight: 0,
      userIslogin: false, // 用户是否登陆
      userMobile: '', // 手机号
      userMescode: '', // 验证码
      clickBool: true, // 验证码防止多次点击
      mesbtn: '获取验证码',
      showAgreement: false,
      isAgreeBool: false, // 是否同意了用户协议
      loginPageBto: 0, // 首页bottom
      loadingPageBool: false, // 是否显示动画
      failflag: false, // 非车主
      nickName: '', // 用户名
      loginBgc: true, // 显示背景
      waitflag: false // 活动未结束
    }
  },
  computed: {
    updateHeight() {
      return this.$store.state.updateHeight
    },
    ...mapState([
      'userStatus'
    ])
  },
  components: {
    mtloading,
    useragreement,
    joinfail,
    waitresult
  },
  mounted() {
    // default
    this.defaultMed()
  },
  methods: {
    ...mapMutations(['getSuggestNextId', 'updateUserStatus']),
    /**
     * 页面加载默认方法
     */
    defaultMed() {
      // 判断是否为pc端打开
      if(!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
        this.$router.push({
          path: '/pcEntryPage'
        })
        return
      }
      // 页面高度
      this.pageHeight = document.documentElement.clientHeight
      // 基准字体
      this.baseFontsize = 14 * (document.documentElement.clientWidth / 375)
      // 判断是否为第一次加载
      var isFirstLoading = localStorage.getItem('isFirstLoading')
      // 是第一次加载
      if (!isFirstLoading) {
        // 第一次加载时页面高度为窗口高度
        this.currentHeight = this.pageHeight
        this.loginPageBto = this.$minpageHeight
        this.loadingPageBool = true
        // 隐藏login页背景
        this.loginBgc = false
        // 上传动画加载页面_页面展现
        var linktype = ''
        var ua = window.navigator.userAgent.toLowerCase()
        // 微信客户端
        if (this.$route.query.source == 'message'){
          // 短信
          linktype = 'loading_message'
        } else if (ua.match(/MicroMessenger/i) == 'micromessenger'){
          linktype = 'loading_wx'
        } else if ((ua.toLowerCase().indexOf('bm_android') !== -1) || (ua.toLowerCase().indexOf('banma_ios_app') !== -1)) {
          // 手机端
          linktype = 'loading_app'
        } else {
          linktype = 'loading_others'
        }
        // datadriver
        window._baq.push(['_trackEvent', 'driver_loading_pv', {'contenttype': linktype}])
        // 百度统计
        var htmjson = {'contenttype': linktype}
        window._hmt.push(['_trackEvent', 'driver_loading_pv', 'pv', htmjson.toString()]);
      } else {
        // 非第一次加载页面为最小高度
        this.currentHeight = this.$minpageHeight
        // 显示背景
        this.loginBgc = true
      }
      var token = localStorage.getItem('token')
      var banmaId = localStorage.getItem('banmaId')
      // 如果存在token 校验登录态
      if (token) {
        this.checkTokenMed(token, banmaId)
      } else {
        // 游客PV
        window._baq.push(['_trackEvent', 'driver_visitor_pv', {}])
        // 百度统计
        window._hmt.push(['_trackEvent', 'driver_visitor_pv', 'pv', ''])
      }
      // this.getUserJoinMed()
    },
    /**
     * 页面加载动画完成
     */
    loadingMed(data) {
      this.currentHeight = this.$minpageHeight
      // 如果加载完成
      if (data) {
        window.setTimeout(()=>{
          this.loginPageBto = 0
          // 设置is not first loading
          localStorage.setItem('isFirstLoading', 'hasloaded')
        },500)
        window.setTimeout(() => {
          this.loadingPageBool = false
        },2000)
      }
    },
    /**
     * 校验登录态
     */
    checkTokenMed(token, banmaId) {
      let param = {
        token: token
      }
      let api = 'checktoken'
      this.$fetchData.fetchGet(param, api).then(res => {
        // 登录态未失效
        if (res && (res.data && res.data.ebanma_cloud_account_base_token_check_response)) {
          // 免登
          this.updateUserInfo({ banmaId: banmaId, token: token })
          this.userIslogin = true
          // 获取用户名
          this.getUserInfoMed()
          // 登录用户PV
          window._baq.push(['_trackEvent', 'driver_login_pv', {}])
          // 百度统计
          window._hmt.push(['_trackEvent', 'driver_login_pv', 'pv', ''])
        } else {
          // 登录态已失效
          this.userIslogin = false
          localStorage.removeItem('token')
          localStorage.removeItem('banmaId')
          // 游客PV
          window._baq.push(['_trackEvent', 'driver_visitor_pv', {}])
          // 百度统计
          window._hmt.push(['_trackEvent', 'driver_visitor_pv', 'pv', ''])
        }
      })
    },
    /**
     * 获取验证码
     */
    getMescode() {
      // 验证手机号
      var reg = /^1[3456789]\d{9}$/
      if (!this.userMobile || !reg.test(this.userMobile)) {
        this.$toast('手机号码输入错误')
        return
      }
      // 防止按钮多次点击
      if (!this.clickBool) {
        return
      }
      this.clickBool = false
      // 倒计时
      var count = 60
      var timer = () => {
        setTimeout(() => {
          this.mesbtn = count + 's'
          count = count - 1
          if (count < 0) {
            this.mesbtn = '获取验证码'
            this.clickBool = true
          } else {
            timer()
          }
        }, 1000)
      }
      // 获取验证码
      let param = {
        operType: 1,
        mobile: this.userMobile
      }
      let api = 'getverifycode'
      this.$fetchData.fetchGet(param, api).then(res => {
        if (
          res &&
          (res.data && res.data.ebanma_cloud_zid_mp_verifycode_send_response)
        ) {
          timer()
        } else {
          // 接口异常时，按钮可点击
          this.clickBool = true
          // 提示报错信息
          var errMsg = res.data.error_response.subMsg || res.data.error_response.desc
          this.$toast(errMsg)
        }
      })
    },
    /**
     * 立即参加methods
     */
    joinActMed() {
      // 判断是否已登入 - 已登陆
      if (this.userIslogin) {
        // 如果用户已登录，此时去获取用户活动参与进度
        this.getUserJoinMed()
      } else {
        // 验证手机号
        var reg = /^1[3456789]\d{9}$/
        if (!this.userMobile || !reg.test(this.userMobile)) {
          this.$toast('手机号码输入错误')
          return
        }
        // 是否输入
        if (!this.userMescode) {
          this.$toast('验证码不能为空')
          return
        }
        // 是否已同意用户协议
        if (!this.isAgreeBool) {
          this.$toast('参与活动，需同意用户协议')
          return
        }
        // 登录
        let param = {
          mvCode: this.userMescode,
          mobile: this.userMobile,
          deviceType: 8,
          deviceId: this.createDeviceidMed()
        }
        let api = 'tologin'
        this.$fetchData.fetchGet(param, api).then(res => {
          // 如果接口报错
          if (res && (res.data && res.data.error_response)) {
            var errMsg = res.data.error_response.subMsg || res.data.error_response.desc
            this.$toast(errMsg)
          } else {
            if (res && (res.data && res.data.ebanma_cloud_account_base_register_response)) {
              // 获取到的数据
              var currentdata = res.data.ebanma_cloud_account_base_register_response
              // token
              var token = currentdata.accessToken
              // banmaid
              var banmaId = currentdata.bmAccountId
              this.updateUserInfo({ banmaId: banmaId, token: token })
              localStorage.setItem('token', token)
              localStorage.setItem('banmaId', banmaId)
              // 设置埋点自定义参数
              var currentBanmaId = banmaId
              // eslint-disable-next-line
              if (currentBanmaId) {
                // eslint-disable-next-line
                window._baq.push(['_setUserInfo', (currentBanmaId).toString() || '', '', '', ''])
                window._hmt.push(['_setCustomVar', 1, 'banmaId', (currentBanmaId).toString() || ''])
              }
              // 查看报名状态
              this.getUserJoinMed()
              // 调用微信sdk分享
              // this.$wxApi.wxApi()
            }
          }
        })
      }
      // 登录页_立即参加点击
      window._baq.push(['_trackEvent', 'driver_login_joinclick', {}])
      // 百度统计
      window._hmt.push(['_trackEvent', 'driver_login_joinclick', 'click', '']);
    },
    /**
     * 查看用户是否为车主用户
     */
    getCarLists() {
      let api = 'getCarLists'
      // 请求所需参数
      var token = localStorage.getItem('token')
      var banmaId = localStorage.getItem('banmaId')
      let param = {
        'token': token,
        'banmaId': banmaId
      }
      this.$fetchData.fetchGet(param, api).then(res => {
        if (res && (res.data && res.data.zebra_base_urm_account_vinlist_response)) {
          var selectCarOptions = res.data.zebra_base_urm_account_vinlist_response
          var isCarOwner = this.checkVinlist(selectCarOptions)
          // 车主用户
          if (isCarOwner) {
            // 车主用户
            this.$router.push({
              path: '/personalPage'
            })
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem('banmaId')
            // 非车主用户 弹窗提示
            this.failflag = true
            // 登录页_非斑马绑车用户_页面展现
            window._baq.push(['_trackEvent', 'driver_login_notuser_pv', {}])
            // 百度统计
            window._hmt.push(['_trackEvent', 'driver_login_notuser_pv', 'pv', '']);
          }
        }
      }, error => {
          console.log(error)
      })
    },
    /**
     * 筛选有效vin
     */
    checkVinlist (vinlist) {
      if (vinlist&&vinlist.length>0) {
        for (var i=0;i<vinlist.length;i++){
          // 为上汽或大通的车 且为车主
          if ((vinlist[i]['vehicleOemCode'].toLowerCase() == 'smpv') || (vinlist[i]['vehicleOemCode'].toLowerCase() == 'smcv')) {
            if (vinlist[i]['relation'] == 1) {
              return true
            }
          }
        }
      }
      return false
    },
    /**
     * 获取用户参与情况
     */
    getUserJoinMed() {
      // 请求所需参数
      let param = {
        campId: '1'
      }
      let api = 'userjoin'
      this.$fetchData
        .fetchVeteranGet(param, api, 'activityRegisterReqDto')
        .then(res => {
          if (res && (res.data && res.data.data)) {
            //存储suggestNextId
            this.$store.commit('getSuggestNextId',res.data.data.suggestNextId)
            // 获取到了报名信息
            var resdata = res.data.data
            let statusList = {campEndFlag : resdata.campEndFlag, firstFlag : resdata.firstFlag}
            this.updateUserStatus(statusList)
            // 如果是第一次参加活动 活动未结束且是第一次参加活动 跳转到信息填写页面
            if (!resdata.campEndFlag && resdata.firstFlag) {
              // 查看是否为车主
              this.getCarLists()
              // 非第一次参加 并且 活动已结束
            } else if (resdata.campEndFlag && !resdata.firstFlag) {
              this.isFinishMed()
              // 非第一次参加，且活动未结束
            } else if (!resdata.campEndFlag && !resdata.firstFlag) {
              // 不是第一次参与活动 且活动未结束/车主用户
              this.$router.push({
                path: '/veteran'
              })
            } else {
              // 活动结束 且活动没参加
              this.$toast('活动报名已截止，更多精彩内容请关注“你好斑马”官方服务号')
            }
          }
        })
    },
    /**
     * 判断活动结束
     */
    async isFinishMed () {
      // 活动已结束 并且已参与
      var winnerlist = await this.getWinnerMed()
      // 活动是否结束
      var isgetBool = false
      // 查询到获奖名单，活动结束
      if (winnerlist&&winnerlist.length>0) {
        this.$router.push({   
          name:'winAward',
          query: { awardStatus: '0' }
        })
      } else {
        // 中奖名单计算中
        this.waitflag = true
      }
    },
    /**
     * 获取winnerlist
     */
    async getWinnerMed () {
      let api = 'getWinner'
      let param = {
        campId: '1'
      }
      var promise = await new Promise((resolve,reject) => {
        this.$fetchData
        .fetchVeteranGet(param, api, 'getWinnerReqDto')
        .then(res => {
          if (res && (res.data && res.data.data)) {
            // 全能奖
            var omnipotentAward = res.data.data.vinRankPrizeList
            resolve(omnipotentAward)
          } else {
            resolve(false)
            if (res && (res.data && res.data.err_resp)) {
              this.$toast(res.data.err_resp.desc, 3000)
            }
          }
        }).catch(err => {
          Indicator.close()
        })
      })
      return promise
    },
    /**
     * 同意用户协议
     */
    selectAgreeMed() {
      this.isAgreeBool = !this.isAgreeBool
    },
    /**
     * 切换用户协议
     */
    swithAgreeMed() {
      this.showAgreement = !this.showAgreement
    },
    /**
     * 接收用户是否接受用户协议
     */
    reviceMed(data) {
      // 点击关闭用户协议
      if (data) {
        this.isAgreeBool = data
      }
      this.swithAgreeMed()
    },
    /**
     * 更新用户的token和banmaId
     */
    updateUserInfo(currentUserInfo) {
      this.$store.commit('updateUserInfo', currentUserInfo)
    },
    /**
     * 跳转到介绍页
     */
    linkIntroMed() {
      // 登录页_没有互联网汽车点击
      window._baq.push(['_trackEvent', 'driver_login_nocarclick', {}])
      // 百度统计
      window._hmt.push(['_trackEvent', 'driver_login_nocarclick', 'click', '']);
      this.$router.push({
        path: '/veteranintro'
      })
    },
    /**
     * 关闭非车主弹框
     */
    joinfailMed (data) {
      this.failflag = false
    },
    /**
     * 获取用户信息
     */
    getUserInfoMed () {
      // 请求所需参数
      let param = {
        campId: '1'
      }
      let api = 'getDriverDetail'
      this.$fetchData
        .fetchVeteranGet(param, api, 'activityRegisterReqDto')
        .then(res => {
          // 获取数据成功
          if (res && (res.data&&res.data.data)) {
            var resdata = res.data.data
            this.nickName = resdata.nickname
          } else {
            // 报错时
            if (res && (res.data && res.data.err_resp)) {
              var errdata = res.data.err_resp
              localStorage.removeItem('token')
              localStorage.removeItem('banmaId')
              this.userIslogin = false
            }
          }
        })
    },
    /**
     * 生成uuid格式的deviceid
     */
    createDeviceidMed () {
      return (this.createS4()+this.createS4()+"-"+this.createS4()+"-"+this.createS4()+"-"+this.createS4()+"-"+this.createS4()+this.createS4()+this.createS4())
    },
    createS4 () {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: auto;
  position: relative;
}
.loginbgcbpc {
  background-image: url('../assets/images/bg.png')!important;
}
.maintainbox {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  .maintain-content {
    position: relative;
    height: 100%;
    width: 100%;
  }
}
.top-header {
  width: 100%;
  height: 16.18rem;
  background: url(../assets/images/bg_top.png) no-repeat;
  background-size: 100% 100%;
  text-align: center;
  img {
    width: 21.79rem;
    margin-top: 4.14rem;
    user-select: none;
  }
}
.main {
  width: 100%;
  height: auto;
  overflow: hidden;
  .slogan {
    text-align: center;
    color: #028e82;
    font-size: 0.75rem;
    line-height: 1.07rem;
    margin-top: 2.11rem;
  }
  .login-box {
    width: 100%;
    .title {
      color: #0a997e;
      font-size: 1.11rem;
      height: 2.15rem;
      line-height: 2.15rem;
      font-weight: bold;
      text-align: center;
      margin-top: 2.17rem;
    }
    .user-name {
      text-align: center;
      color: #0a997e;
      font-size: 1.11rem;
      font-weight: bold;
      height: 1.07rem;
      line-height: 1.07rem;
      margin-top: 5.11rem;
    }
  }
  // 手机号与验证码输入框
  .input-box {
    text-align: center;
    overflow: hidden;
    li {
      width: 12.89rem;
      margin: 0 auto;
    }
    .item-phone {
      margin-top: 0.54rem;
      input {
        width: 12.89rem;
        height: 2.285rem;
        background-color: #4ecaac;
        border: none;
        outline: none;
        padding: 0;
        font-size: 11px;
        color: #fff;
        text-align: center;
      }
    }
    .item-mescode {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      margin-top: 0.428rem;
      input {
        width: 7.5rem;
        height: 1.785rem;
        background-color: #4ecaac;
        border: none;
        outline: none;
        padding: 0;
        text-align: center;
        color: #fff;
        font-size: 11px;
      }
      div {
        width: 4.928rem;
        height: 1.785rem;
        line-height: 1.785rem;
        background-color: #4ecaac;
        color: #fff;
        text-align: center;
      }
    }
  }
  .user-agreement {
    text-align: center;
    font-size: 0;
    height: 0.93rem;
    line-height: 0.93rem;
    margin-top: 0.86rem;
    span {
      font-size: 8px;
      height: 0.93rem;
      line-height: 0.93rem;
      display: inline-block;
      vertical-align: middle;
    }
    .detail {
      color: #028e82;
      span {
        text-decoration: underline;
        color: #5aacdb;
      }
    }
    .icon {
      margin-right: 0.43rem;
      img {
        height: 0.93rem;
        vertical-align: top;
      }
    }
  }
  .check-btn {
    width: 10.68rem;
    height: 2.32rem;
    background-color: #0a997e;
    font-size: 1.11rem;
    font-weight: bold;
    text-align: center;
    color: #fff;
    line-height: 2.32rem;
    user-select: none;
    border-radius: 0.42rem;
    margin: 0.54rem auto 0;
  }
  .lottery {
    color: #5aacdb;
    font-size: 0.75rem;
    text-decoration: underline;
    text-align: center;
    margin-top: 3.61rem;
    font-weight: bold;
  }
}
.banma-logo {
  position: absolute;
  bottom: 1.07rem;
  text-align: center;
  width: 100%;
  img {
    height: 2.46rem;
  }
}
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #fff;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #fff;
}
</style>
