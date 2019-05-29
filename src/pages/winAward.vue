<template>
  <div class="mainwrapper">
    <div class="midcontent">
      <div
        class="award-wrapper wrapper"
        :style="{ 'min-height': $minpageHeight + 'px' }"
      >
        <div class="topBlock">
          <div class="title_img">
            <img src="../assets/images/title.png" alt="谁是老司机" />
          </div>
          <div class="logo">
            <img src="../assets/images/logo.png" alt="logo" />
          </div>

          <div class="driverInfo">
            <div class="portrait">
              <img
                :src="imgUrlArr[driverInfo.avatar] || imgUrlArr[0]"
                alt="logo"
              />
            </div>
            <div class="driverInfoRight">
              <div
                class="driverInfoLine"
                style="border-bottom:1px solid rgba(2, 142, 130,.2);padding-bottom:.6rem;margin-bottom:.4rem;"
              >
                <div class="driverInfoItem1">
                  <div class="icon_name">
                    <img src="../assets/images/icon_name.png" alt="" />
                  </div>
                  <div class="div_name">{{ driverInfo.nickname || '-' }}</div>
                </div>
                <div class="driverInfoItem2" style="margin-left:3px;">
                  <div class="icon_site">
                    <img src="../assets/images/icon_site.png" alt="" />
                  </div>
                  <div class="div_site">{{ driverInfo.city || '-' }}</div>
                </div>
              </div>
              <div class="driverInfoLine">
                <div class="driverInfoItem1">
                  <div class="icon_grade">
                    <img src="../assets/images/icon_grade.png" alt="" />
                  </div>
                  <div class="div_grade">
                    <p style="font-size:.85rem;float:none;">综合得分</p>
                    <p style="font-size:1.1rem;">
                      {{ driverInfo.dayScore || '-' }}
                    </p>
                  </div>
                </div>
                <div class="driverInfoItem2">
                  <div class="icon_rank">
                    <img src="../assets/images/icon_rank.png" alt="" />
                  </div>
                  <div class="div_rank">
                    <p style="font-size:.85rem;float:none;">个人排名</p>
                    <p style="font-size:1.1rem;">
                      {{ driverInfo.rank || '-' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="isShow">
          <div class="award-content" v-if="awardStatus == 0">
            <div class="award-header">
              <img
                src="../assets/images/award_icon.png"
                class="award-header-icon"
              />
              <div class="award-haeder-title">恭喜你!</div>
            </div>
            <div class="award-desc mar">{{ awardMes }}</div>
            <div class="award-desc">赢得以下奖品</div>
            <div class="award-photo-box">
              <div class="award-photo">
                <img src="../assets/images/gradeDetail.png" />
              </div>
            </div>
            <div class="take-award-btn" v-if="promptBool" @click="promptOn">
              前去领奖
            </div>
            <div class="about-award">
              了解活动规则及奖品详情,点击
              <router-link :to="{ name: 'activityRule' }"
                >查看攻略>></router-link
              >
            </div>
          </div>
          <div class="award-content" v-else-if="awardStatus == 1">
            <div class="no-award-header">
              <img
                src="../assets/images/no_award_icon.png"
                class="award-header-icon"
              />
              <div class="award-haeder-title">值得鼓励!</div>
            </div>
            <div class="award-desc mar">
              虽未获得奖品，但是你依旧榜上有名！点击<router-link to="/rankPage"
                >“排行榜”</router-link
              >看看自己第几名！
            </div>
            <div class="about-award about-mar">
              了解活动规则及奖品详情,点击
              <router-link :to="{ name: 'activityRule' }"
                >查看攻略>></router-link
              >
            </div>
          </div>
          <div class="award-content" v-else>
            <div class="no-award-header">
              <img
                src="../assets/images/no_rank_icon.png"
                class="award-header-icon"
              />
              <div class="award-haeder-title">很遗憾!</div>
            </div>
            <div class="award-desc mar">
              由于你未满足上榜条件,未能进入最终榜单。
            </div>
            <div class="award-desc">非常感谢参与本次活动!</div>
            <div class="about-award about-mar">
              了解活动规则及奖品详情,点击
              <router-link :to="{ name: 'activityRule' }"
                >查看攻略>></router-link
              >
            </div>
          </div>
        </div>
        <transition name="fade">
          <div v-if="!driverInfo.giftGot">
            <template v-if="!takeSucc">
              <mongolia
                :width="width"
                :height="height"
                v-show="promptSwitch"
                @close="promptOff"
              >
                <div slot="content">
                  <img
                    @click="promptOff"
                    src="../assets/images/close_icon.png"
                    class="close"
                  />
                  <div class="form-title">填写领奖信息</div>
                  <div class="form-group">
                    <form id="award-form">
                      <div class="form-item">
                        <label for="name">姓名</label>
                        <input
                          type="text"
                          class="form-ipt"
                          placeholder="填写真实姓名"
                          id="name"
                          v-model="name"
                        />
                      </div>
                      <div class="form-item">
                        <label for="phone">电话</label>
                        <input
                          type="text"
                          class="form-ipt"
                          placeholder="填写联系电话号码"
                          id="phone"
                          v-model="phone"
                        />
                      </div>
                      <div class="form-item">
                        <label for="address">快递地址<br />(选填)</label>
                        <input
                          type="text"
                          class="form-ipt"
                          placeholder="填写快递地址"
                          id="address"
                          v-model="address"
                        />
                      </div>
                    </form>
                    <div class="form-desc">*提交后不可更改哦!</div>
                    <div class="form-submit" @click="submitData">提交</div>
                  </div>
                </div>
              </mongolia>
            </template>

            <template v-else>
              <mongolia
                :width="width"
                :height="height"
                v-show="promptSwitch"
                @close="promptOff"
              >
                <div slot="content">
                  <img
                    @click="promptOff"
                    src="../assets/images/close_icon.png"
                    class="close"
                  />
                  <div class="form-title-succ">提交成功</div>
                  <div class="form-desc-succ">
                    工作人员会尽快与你联络核实获奖信息
                  </div>
                  <div class="comfire-btn" @click="promptOff2">确定</div>
                </div>
              </mongolia>
            </template>
          </div>

          <div v-else>
            <mongolia
              :width="width"
              :height="height"
              v-show="promptSwitch"
              @close="promptOff"
            >
              <div slot="content">
                <img
                  @click="promptOff"
                  src="../assets/images/close_icon.png"
                  class="close"
                />
                <div class="form-desc-succ pad">
                  你已提交过领奖信息，工作人员会尽快与你联络核实获奖信息。
                </div>
              </div>
            </mongolia>
          </div>
        </transition>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import Mongolia from '@/components/mongolia'
import MyFooter from '@/components/footer'
export default {
  data() {
    return {
      driverInfo: {},
      width: 19,
      height: 18,
      awardStatus: 0, // 0 上榜获奖  1 上榜未获奖  2 未上榜
      promptSwitch: false,
      takeSucc: false,
      name: '',
      phone: '',
      address: '',
      isShow: false,
      awardMes: '', // 获奖信息
      promptBool: false // 前去领奖按钮
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this.defaultData()
  },
  mounted() {
    Indicator.open()
    this.defaultMed()
  },
  methods: {
    /**
     * 默认加载
     */
    defaultMed() {
      // 获奖页_页面展现
      window._baq.push(['_trackEvent', 'driver_award_pv', {}])
      // 百度统计
      window._hmt.push(['_trackEvent', 'driver_award_pv', 'pv', ''])
    },
    ...mapMutations(['updateStatus']),
    async defaultData() {
      let api = 'getDriverReport'
      let token = this.userInfo.token
      let param = {
        campId: '1',
        token
      }
      // 获取winnerlist
      var totalList = await this.getWinnerMed()
      // 全能奖list
      var winnerlist = totalList.omnipotentAward
      var luckList = totalList.luckyAward
      var collectiveList = totalList.collectiveAward.vinList
      var collectiveObj = totalList.collectiveAward
      this.$fetchData
        .fetchVeteranGet(param, api, 'activityRegisterReqDto')
        .then(res => {
          if (res && (res.data && res.data.data)) {
            this.driverInfo = res.data.data
            this.isShow = true
            if (this.driverInfo.giftGot) {
              this.height = 6
            }
            var currentVin = this.driverInfo.vin
            var currentCity = this.driverInfo.city
            // 是否满足上榜条件
            if (parseInt(this.driverInfo.fivekmDays || 0) < 3) {
              this.awardStatus = 2
              return
            }
            // 是否获得全能奖
            var isgetBool = false
            if (currentVin && (winnerlist && winnerlist.length > 0)) {
              isgetBool = this.isGetFullaward(currentVin, winnerlist)
            }
            if (isgetBool) {
              // 全能奖
              this.awardStatus = 0
              // 显示前去领奖按钮
              this.promptBool = true
              // 砖石老司机
              if (currentVin == winnerlist[0].vin) {
                this.awardMes = '本次活动成功获得"钻石老司机"奖项！'
              } else if (this.isGetPlatinumMed(currentVin, winnerlist)) {
                // 铂金老司机
                this.awardMes = '本次活动成功获得"铂金老司机"奖项！'
              } else {
                // 斑马智行认证老司机称号
                this.awardMes = '本次活动成功获得"斑马智行认证老司机称号"奖项！'
                this.promptBool = false
              }
              Indicator.close()
              return
            }
            // 是否获得幸运奖
            var isLuck = false
            if (currentVin && (luckList && luckList.length > 0)) {
              isLuck = this.isGetLuckaward(currentVin, luckList)
            }
            if (isLuck) {
              // 获得幸运奖
              this.awardStatus = 0
              this.awardMes = '本次活动成功获得"幸运锦鲤"奖项！'
              this.promptBool = false
              Indicator.close()
              return
            }
            // 是否获得集体奖
            var isCollective = false
            if (currentCity.indexOf(collectiveObj.city) == -1) {
              isCollective = false
            } else if (
              currentVin &&
              (collectiveList && collectiveList.length > 0)
            ) {
              isCollective = this.isCollectiveaward(currentVin, collectiveList)
            }
            if (isCollective) {
              // 获得集体奖
              this.awardMes = '本次活动成功获得集体奖!'
              this.awardStatus = 0
              Indicator.close()
              return
            } else {
              this.awardStatus = 1
              Indicator.close()
            }
          } else {
            this.awardStatus = 1
            Indicator.close()
            if (res && (res.data && res.data.err_resp)) {
              this.$toast(res.data.err_resp.desc, 3000)
            }
          }
        })
        .catch(err => {
          Indicator.close()
        })
    },
    /**
     * 获取winnerlist
     */
    async getWinnerMed() {
      let api = 'getWinner'
      let token = this.userInfo.token
      let param = {
        campId: '1',
        token
      }
      var promise = await new Promise((resolve, reject) => {
        this.$fetchData
          .fetchVeteranGet(param, api, 'getWinnerReqDto')
          .then(res => {
            if (res && (res.data && res.data.data)) {
              // 全能奖
              var omnipotentAward = res.data.data.vinRankPrizeList
              var luckyAward = res.data.data.vinLuckyPrizeList
              var collectiveAward = res.data.data.cityRankPrize
              var awardList = {
                omnipotentAward,
                luckyAward,
                collectiveAward
              }
              resolve(awardList)
            } else {
              resolve(false)
              if (res && (res.data && res.data.err_resp)) {
                this.$toast(res.data.err_resp.desc, 3000)
              }
            }
            Indicator.close()
          })
          .catch(err => {
            Indicator.close()
          })
      })
      return promise
    },
    /**
     * 判断用户是否中全能奖
     */
    isGetFullaward(currentVin, winnerlist) {
      var result = false
      for (var i = 0; i < winnerlist.length; i++) {
        if (winnerlist[i].vin == currentVin) {
          result = true
          return result
        }
      }
      return result
    },
    /**
     * 判断是否获得铂金老司机称号 2-9名（包含第2名和第9名）
     */
    isGetPlatinumMed(currentVin, winnerlist) {
      var result = false
      for (var i = 0; i < 9; i++) {
        if (winnerlist[i].vin == currentVin) {
          result = true
          return result
        }
      }
      return result
    },
    /**
     * 判断用户是否中幸运奖
     */
    isGetLuckaward(currentVin, luckList) {
      var result = false
      for (var i = 0; i < luckList.length; i++) {
        if (luckList[i].vin == currentVin) {
          result = true
          return result
        }
      }
      return result
    },
    /**
     * 判断用户是否中集体奖
     */
    isCollectiveaward(currentVin, collectiveList) {
      var result = false
      for (var i = 0; i < collectiveList.length; i++) {
        if (collectiveList[i] == currentVin) {
          result = true
          return result
        }
      }
      return result
    },
    promptOn() {
      this.promptSwitch = true
      // 获奖页_前去领奖点击
      window._baq.push(['_trackEvent', 'driver_award_getawardclick', {}])
      // 百度统计
      window._hmt.push([
        '_trackEvent',
        'driver_award_getawardclick',
        'click',
        ''
      ])
      // 获奖页_领奖信息_页面展现
      window._baq.push(['_trackEvent', 'driver_award_info_pv', {}])
      // 百度统计
      window._hmt.push(['_trackEvent', 'driver_award_info_pv', 'pv', ''])
    },
    promptOff() {
      this.promptSwitch = false
    },
    promptOff2() {
      this.promptSwitch = false
      this.height = 6
    },
    submitData() {
      // 点击提交埋点统计
      window._baq.push(['_trackEvent', 'driver_award_info_submitclick', {}])
      // 百度统计
      window._hmt.push([
        '_trackEvent',
        'driver_award_info_submitclick',
        'click',
        ''
      ])
      var phoneReg = /^1[34578]\d{9}$/
      var nameReg = /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/
      var api = 'getGift'
      var param = {
        banmaId: parseInt(this.userInfo.banmaId),
        token: this.userInfo.token,
        campId: '1',
        giftName: this.name,
        giftPhone: this.phone,
        giftAddress: this.address
      }
      // let addressReg = /^([\u4e00-\u9fa5]+(省|自治区)-)?[\u4e00-\u9fa5]+市-[\u4e00-\u9fa5]+(区|县)$/
      if (!phoneReg.test(this.phone)) {
        this.$toast('手机号码有误,请正确输入!', 3000)
        return
      }
      if (!nameReg.test(this.name)) {
        this.$toast('姓名有误,请正确输入!', 3000)
        return
      }
      // if(!this.address){
      //     this.$toast('快递地址必须填写!', 3000)
      //     return
      // }
      if (phoneReg.test(this.phone) && nameReg.test(this.name)) {
        this.$fetchData
          .fetchVeteranGet(param, api, 'getGiftReqDto')
          .then(res => {
            if (res && (res.data && res.data.data)) {
              this.takeSucc = true
              this.height = 9
              // 获奖页_提交成功_页面展示
              window._baq.push([
                '_trackEvent',
                'driver_award_info_success_pv',
                {}
              ])
              // 百度统计
              window._hmt.push([
                '_trackEvent',
                'driver_award_info_success_pv',
                'pv',
                ''
              ])
            } else {
              if (res && (res.data && res.data.err_resp)) {
                this.$toast(res.data.err_resp.desc, 3000)
              }
            }
          })
      }
    }
  },
  components: {
    Mongolia,
    MyFooter
  }
}
</script>

<style lang="less" scoped>
.size(@width, @height) {
  width: @width;
  height: @height;
}
@darker: #0a997e;
@lighter: #4ecaac;
@white: #fff;
p {
  margin: 0;
}
img {
  width: 100%;
}
input::-webkit-input-placeholder {
  color: @white;
}
.award-wrapper {
  .size(100%, 100%);
  background: url('../assets/images/bg.png') no-repeat 0 center;
  background-size: 100% 100%;
  .topBlock {
    .size(100%, 16rem);
    background: url('../assets/images/bg_top.png') no-repeat 0 bottom;
    background-size: 100% 100%;
    color: @darker;
    overflow: auto;
    .title_img {
      width: 12.64rem;
      margin: 3.07rem auto 1.6rem auto;
    }
    .logo {
      width: 4.43rem;
      position: absolute;
      top: 3.07rem;
      left: 1.11rem;
    }
    .driverInfo {
      width: 100%;
      overflow: hidden;
      .portrait {
        .size(4.04rem, 4.04rem);
        float: left;
        margin-left: 3.43rem;
        background: @darker;
      }
      .icon_name {
        width: 1.32rem;
      }
      .icon_site {
        width: 1.29rem;
      }
      .icon_grade {
        width: 1.64rem;
        & > img {
          position: relative;
          top: 0.35rem;
        }
      }
      .icon_rank {
        width: 1.71rem;
        & > img {
          position: relative;
          top: 0.35rem;
        }
      }
      .div_name {
        margin: 0.15rem 0 0 0.4rem;
        max-width: 6rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .div_site {
        margin: 0.15rem 0 0 0.2rem;
        max-width: 4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      }
      .div_grade {
        margin-left: 3px;
      }
      .driverInfoRight {
        float: left;
        margin-left: 2rem;
        .driverInfoLine {
          width: 100%;
          overflow: auto;
          & * {
            float: left;
          }
          .driverInfoItem1 {
            width: 8rem;
          }
          .driverInfoItem2 {
            .size(6rem, 1.6rem);
          }
        }
      }
    }
  }
  .award-content {
    padding-bottom: 4rem;
    .award-header {
      margin-top: 2rem;
      text-align: center;
      .award-header-icon {
        width: 2rem;
        vertical-align: bottom;
      }
      .award-haeder-title {
        display: inline-block;
        font-size: 2rem;
        color: @darker;
        font-family: FZLTZHK--GBK1-0;
      }
    }
    .no-award-header {
      margin-top: 5rem;
      text-align: center;
      .award-header-icon {
        width: 2rem;
        vertical-align: bottom;
      }
      .award-haeder-title {
        display: inline-block;
        font-size: 2rem;
        color: @darker;
        font-family: FZLTZHK--GBK1-0;
      }
    }
    .award-desc {
      font-size: 1rem;
      color: #0a997e;
      text-align: center;
    }
    .mar {
      margin: 1rem auto 0;
      width: 90%;
      text-align: center;
    }
    .award-photo-box {
      margin-top: 1rem;
      .award-photo {
        margin: auto;
        .size(12rem, 8rem);
        border: 2px dashed @darker;
        & > img {
          .size(100%, 100%);
        }
      }
    }
    .take-award-btn {
      margin: auto;
      margin-top: 2rem;
      .size(10rem, 2rem);
      line-height: 2rem;
      color: @white;
      text-align: center;
      background: @darker;
      border-radius: 0.4rem;
    }
    .about-award {
      margin-top: 1rem;
      font-size: 0.7rem;
      color: @darker;
      text-align: center;
      & > a {
        color: #5aacdb;
        text-decoration: underline;
      }
    }
    .about-mar {
      margin-top: 6rem;
    }
  }
  .close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    .size(1rem, 1rem);
  }
  .form-title {
    font-size: 1.3rem;
    font-weight: bold;
    color: @darker;
    text-align: center;
    padding-top: 1rem;
  }
  .form-title-succ {
    font-size: 0.8rem;
    font-weight: bold;
    color: @darker;
    text-align: center;
    padding-top: 1rem;
  }
  .form-desc-succ {
    margin: 1rem 0;
    font-size: 0.7rem;
    color: @darker;
    text-align: center;
    &.pad {
      padding: 1rem;
    }
  }
  .comfire-btn {
    .size(10rem, 2.4rem);
    background: @darker;
    color: @white;
    text-align: center;
    line-height: 2.4rem;
    border-radius: 0.4rem;
    margin: auto;
  }
  .form-group {
    margin-top: 1rem;
    #award-form {
      color: @white;
      padding: 0 1rem;
      .form-item {
        display: flex;
        margin-bottom: 1rem;
        label {
          width: 4rem;
          color: @darker;
          font-size: 0.7rem;
          margin: auto;
          margin-right: 0.5rem;
          text-align-last: justify;
          text-align: justify;
        }
        .form-ipt {
          flex: 1;
          color: @white;
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          outline: none;
          border: 0;
          background: @lighter;
        }
      }
    }
    .form-submit {
      margin: auto;
      margin-top: 0.5rem;
      .size(10rem, 2rem);
      background: @darker;
      color: @white;
      text-align: center;
      line-height: 2rem;
      border-radius: 0.4rem;
    }
    .form-desc {
      font-size: 0.7rem;
      color: @darker;
      margin-top: 1.5rem;
      text-align: center;
    }
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-leave {
    opacity: 1;
  }
  .fade-enter-active {
    transition: opacity 0.5s;
  }
  .fade-leave-active {
    opacity: 0;
    transition: opacity 0.5s;
  }
}
</style>


