<template>
  <div class="mainwrapper">
    <div class="midcontent">
      <div
        class="challenge-wrapper wrapper"
        :style="{ 'min-height': $minpageHeight + 'px' }"
      >
        <div class="shadeDiv" id="shadeDiv">
          <div class="pk-block">
            <img
              src="../assets/images/close-white.png"
              alt=""
              class="result-close"
              @click="closePk"
            />
            <div class="triangle-1"></div>
            <div class="triangle-2"></div>
            <div class="triangle-3"></div>
            <div class="triangle-4"></div>
            <div class="pk-border"></div>
            <div class="pk-left">
              <div class="left-1">
                <div class="left-1-lt">
                  <img src="../assets/images/pk-pentagon.png" alt="" />
                </div>
                <div class="left-1-rt">
                  <div class="left-1-rt-1"></div>
                  <div class="left-1-rt-2">
                    <div class="left-1-rt-2-1"></div>
                    <div class="left-1-rt-2-2"></div>
                  </div>
                  <div class="left-1-rt-3"></div>
                </div>
              </div>
              <div class="left-2">
                <div class="portrait">
                  <img :src="imgUrlArr[mydata.avatar]" alt="" />
                </div>
                <div class="userId">{{ mydata.nickname||'匿名老司机' }}</div>
              </div>
              <div class="left-3">
                {{ mydata.todayPKScore }}
              </div>
            </div>
            <div class="pk-right">
              <div class="right-1">
                <div id="right-1-1"></div>
                <div id="right-1-2"></div>
              </div>
              <div class="right-2">
                <div class="portrait">
                  <img :src="imgUrlArr[pking.avatar]" alt="" />
                </div>
                <div class="userId">{{ pking.nickname||'匿名老司机' }}</div>
              </div>
              <div class="right-3">{{ pking.todayPKScore }}</div>
            </div>
            <div class="pk-title">
              <span class="pk-title-1">挑战中</span>
              <span id="pk-title-point1">.</span>
              <span id="pk-title-point2">.</span>
              <span id="pk-title-point3">.</span>
            </div>
            <div class="pk-keyword">
              <div class="pk-keyword-line"></div>
              <div class="keyword">
                <img :src="PK_keyword[pkindex]" alt="" />
              </div>
            </div>
            <div class="pk-result">
              <div class="pk-result-div" v-if="pkResult == 1">
                <img src="../assets/images/star.png" alt="" class="star-1" />
                <img src="../assets/images/star.png" alt="" class="star-2" />
                <img src="../assets/images/star.png" alt="" class="star-3" />
                <img src="../assets/images/star.png" alt="" class="star-4" />
                <img src="../assets/images/star.png" alt="" class="star-5" />
                <img src="../assets/images/star.png" alt="" class="star-6" />
                <div class="result-img">
                  <img src="../assets/images/pk-win.png" alt="" />
                </div>
              </div>
              <div class="pk-result-div" v-if="pkResult == 0">
                <div class="equally-1"></div>
                <div class="equally-2"></div>
                <img
                  src="../assets/images/pk-equally-2.png"
                  alt=""
                  class="equally-3"
                />
                <div class="equally-4"></div>
                <img
                  src="../assets/images/pk-equally-2.png"
                  alt=""
                  class="equally-5"
                />
                <div class="equally-6"></div>
                <div class="result-img">
                  <img src="../assets/images/pk-equally.png" alt="" />
                </div>
              </div>
              <div class="pk-result-div" v-if="pkResult == -1">
                <div class="equally-1 fail"></div>
                <div class="equally-2"></div>
                <img
                  src="../assets/images/pk-fail-1.png"
                  alt=""
                  class="equally-3"
                />
                <div class="equally-4"></div>
                <img
                  src="../assets/images/pk-fail-1.png"
                  alt=""
                  class="equally-5"
                />
                <div class="equally-6"></div>
                <div class="result-img">
                  <img src="../assets/images/pk-fail.png" alt="" />
                </div>
              </div>
              <div class="result-grade">+{{ pkReward }}分！</div>
              <p class="result-text">
                今天需要行驶超过1 km，分数才会加入到明天的成绩中哦！
              </p>
            </div>
          </div>
          <div class="point-detail" @click="gotoGradeDetail">
            <img
              src="../assets/images/point_btn.png"
              class="point-detail-image"
            />
          </div>
        </div>

        <div class="challenge-header">
          <header>
            <img
              src="../assets/images/icon_vs.png"
              alt="vs"
              class="challenge-icon"
            />
            <span class="challenge-title">赚分挑战赛</span>
          </header>
          <section>
            <div class="header-left">
              <img :src="imgUrlArr[mydata.avatar]" alt="头像" class="avatar" />
            </div>
            <div class="header-right">
              <div class="header-flex">
                <div class="user">
                  <div class="user-icon">
                    <img src="../assets/images/icon_name.png" />
                  </div>
                  <div class="user-name">{{ mydata.nickname }}</div>
                </div>
                <div class="line"></div>
                <div class="point-rank">
                  <div class="point">
                    <img
                      src="../assets/images/icon_grade.png"
                      class="point-icon"
                    />
                    <div class="point-text">
                      <div class="point-title">综合得分</div>
                      <div class="point-num">{{ mydata.dayScore }}</div>
                    </div>
                  </div>
                  <div class="rank">
                    <img
                      src="../assets/images/icon_rank.png"
                      class="rank-icon"
                    />
                    <div class="rank-text">
                      <div class="rank-title">个人排名</div>
                      <div class="rank-num">{{ mydata.rank }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="challenge-content">
          <h2 class="pk-title">今日PK关键词</h2>
          <div class="logo">
            <img :src="PKlogo[pkindex]" class="pk-logo" />
          </div>

          <div class="challenge-list-wrapper">
            <div class="challenge-list">
              <div
                class="challenge-item"
                v-for="(item, index) in challenge"
                :key="index"
              >
                <div class="challenge-item-user">
                  <img :src="imgUrlArr[item.avatar || '0']" class="item-user" />
                  <div class="pointBg">+{{ item.quizReward }}</div>
                  <div class="item-userName-box">
                    <div class="item-userName">
                      {{ item.nickname || '匿名老司机' }}
                    </div>
                  </div>
                </div>

                <div class="item-info">
                  <div class="item-point">综合得分: {{ item.dayScore }}</div>
                  <div class="item-rank">个人排名: {{ item.rank }}</div>
                </div>

                <div
                  v-if="isFirstPK"
                  class="challenge-btn"
                  @click="promptOn(index)"
                >
                  挑战TA
                </div>
                <div v-else class="challenge-btn-gray">挑战TA</div>
              </div>
            </div>
            <div class="challenge-desc">
              每天只有1次挑战机会哦<br />挑战时间段，每日9：00-23：00
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <mongolia
        :content="content"
        v-show="promptSwitch"
        @close="promptOff"
      ></mongolia>
    </transition>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { mapState } from 'Vuex'
import myFooter from '@/components/footer'
import Mongolia from '@/components/mongolia'
export default {
  data() {
    return {
      pkResult: null, //1为成功，0为平局，-1为失败
      pkReward: 0, //只有pkResult为1成功时，才有quizReward，其余可以按产品约定理解为0
      promptSwitch: false,
      currentIndex: 0,
      content: '今日挑战次数已用完,明天再来吧!',
      isFirstPK: false, //第一次PK
      mydata: {
        avatar: 0,
        nickname: '-',
        dayScore: '-',
        rank: '-',
        todayPKScore: '-'
      },
      pking: {
        avatar: 0,
        nickname: '-',
        dayScore: '-',
        todayPKScore: '-'
      },
      challenge: [
        {
          avatar: '0',
          nickname: '-',
          dayScore: '-',
          rank: '-',
          quizReward: '-'
        },
        {
          avatar: '0',
          nickname: '-',
          dayScore: '-',
          rank: '-',
          quizReward: '-'
        },
        {
          avatar: '0',
          nickname: '-',
          dayScore: '-',
          rank: '-',
          quizReward: '-'
        }
      ],
      pkindex: 0, //今日PK关键词顺序
      PKlogo: [
        require('../assets/images/PKlogo-control.png'), //ControlScore
        require('../assets/images/PKlogo-intelligence.png'), //WisdomScore
        require('../assets/images/PKlogo-safty.png'), //SafeScore
        require('../assets/images/PKlogo-energy.png') //FuelElcScore
      ],
      PK_keyword: [
        require('../assets/images/pk-keyword-control.png'),
        require('../assets/images/pk-keyword-intelligence.png'),
        require('../assets/images/pk-keyword-safty.png'),
        require('../assets/images/pk-keyword-energy.png')
      ],
      fulldata: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    let token = this.userInfo.token
    let param = {
      banmaId: 7,
      campId: '1',
      token: token
    }
    let api = 'getQuizDefenders'
    this.$fetchData
      .fetchVeteranGet(param, api, 'activityRegisterReqDto')
      .then(res => {
        Indicator.close()
        if (res.data.err_resp) {
          this.$toast(res.data.err_resp.msg)
          return
        }
        if (res.data.data) {
          let data = res.data.data
          this.fulldata = data
          this.mydata = data.attacker
          this.isFirstPK = !data.attackedFlag //attackedFlag:true,已经挑战过

          if (data.defenderStrong) {
            if (!data.defenderStrong.avatar) {
              data.defenderStrong.avatar = '0'
            }
            this.challenge[0] = data.defenderStrong
          }
          if (data.defenderMedium) {
            if (!data.defenderMedium.avatar) {
              data.defenderMedium.avatar = '0'
            }
            this.challenge[1] = data.defenderMedium
          }
          if (data.defenderWeak) {
            if (!data.defenderWeak.avatar) {
              data.defenderWeak.avatar = '0'
            }
            this.challenge[2] = data.defenderWeak
          }
          if (data.attackTarget == 'ControlScore' && data.defenderWeak) {
            this.pkindex = 0
            this.mydata.todayPKScore = data.attacker.controlScore
            this.challenge[0].todayPKScore = data.defenderStrong.controlScore
            this.challenge[1].todayPKScore = data.defenderMedium.controlScore
            this.challenge[2].todayPKScore = data.defenderWeak.controlScore
          }
          if (data.attackTarget == 'WisdomScore' && data.defenderWeak) {
            this.pkindex = 1
            this.mydata.todayPKScore = data.attacker.wisdomScore
            this.challenge[0].todayPKScore = data.defenderStrong.wisdomScore
            this.challenge[1].todayPKScore = data.defenderMedium.wisdomScore
            this.challenge[2].todayPKScore = data.defenderWeak.wisdomScore
          }
          if (data.attackTarget == 'SafeScore' && data.defenderWeak) {
            this.pkindex = 2
            this.mydata.todayPKScore = data.attacker.safeScore
            this.challenge[0].todayPKScore = data.defenderStrong.safeScore
            this.challenge[1].todayPKScore = data.defenderMedium.safeScore
            this.challenge[2].todayPKScore = data.defenderWeak.safeScore
          }
          if (data.attackTarget == 'FuelElcScore' && data.defenderWeak) {
            this.pkindex = 3
            this.mydata.todayPKScore = data.attacker.fuelElcScore
            this.challenge[0].todayPKScore = data.defenderStrong.fuelElcScore
            this.challenge[1].todayPKScore = data.defenderMedium.fuelElcScore
            this.challenge[2].todayPKScore = data.defenderWeak.fuelElcScore
          }

          let thisHours = new Date().getHours()
          if (thisHours < 9 || thisHours > 23) {
            this.promptSwitch = false
            this.content = ''
            this.isFirstPK = false
            return
          } else {
            console.log(this.isFirstPK)
            if (!this.isFirstPK) {
              this.promptSwitch = true
              this.content = '今日挑战次数已用完,明天再来吧!'
              this.isFirstPK = false
              return
            } else {
              this.promptSwitch = false
            }
          }
        }
      })
  },
  mounted() {
    // 正在加载
    Indicator.open()
    // 挑战页_页面展现PV
    window._baq.push(['_trackEvent', 'driver_challenge_pv', {}])
    // 百度统计
    window._hmt.push(['_trackEvent', 'driver_challenge_pv', 'pv', ''])
  },
  methods: {
    gotoGradeDetail() {
      this.$router.push('/gradeDetail')
    },
    pk(attacker, defender, num) {
      // pk 前判断时间
      let thisHours = new Date().getHours()
      if (thisHours < 9 || thisHours > 23) {
        this.promptSwitch = true
        this.content = '当前不在挑战时间段，请于每日9：00-23：00前来挑战'
        this.isFirstPK = false
        return
      }
      let token = this.userInfo.token
      let param = {
        attackTarget: this.fulldata.attackTarget,
        attacker: attacker,
        defender: defender,
        token: token
      }
      let api = 'veteranquiz'
      this.$fetchData.fetchVeteranGet(param, api, 'quizReqDto').then(res => {
        if (res.data.err_resp) {
          this.$toast(res.data.err_resp.msg)
          return
        }
        if (res.data.data) {
          this.pkResult = res.data.data.result
          this.pkReward =
            res.data.data.quizReward > 0 ? res.data.data.quizReward : 0
          this.isFirstPK = false
          // 埋点统计PK结果
          var finalres = this.pkResult
          this.dataAnysisMed(finalres, num)
        }
      })
    },
    promptOn(index) {
      if (this.isFirstPK) {
        document.getElementById('shadeDiv').style.display = 'block'
        this.pking = this.challenge[index] //挑战谁就赋值谁的数据给pking
        this.pk(this.mydata, this.pking, index)
      } else {
        this.promptSwitch = true
        this.currentIndex = index
      }
    },
    promptOff() {
      this.promptSwitch = false
    },
    closePk() {
      document.getElementById('shadeDiv').style.display = 'none'
    },
    /**
     * pk结果埋点
     * @param {result} pk结果 1为成功，0为平局，-1为失败
     * @param {num} pk的序号 0为高排名，1为中排名，2为低排名
     */
    dataAnysisMed(result, num) {
      var objres = {
        contenttype: '',
        contenttype2: ''
      }
      if (num == 0) {
        objres['contenttype'] = 'challenge_high'
      } else if (num == 1) {
        objres['contenttype'] = 'challenge_mid'
      } else {
        objres['contenttype'] = 'challenge_low'
      }
      if (result == 0) {
        objres['contenttype2'] = 'challenge_draw'
      } else if (result == 1) {
        objres['contenttype2'] = 'challenge_success'
      } else {
        objres['contenttype2'] = 'challenge_fail'
      }
      window._baq.push([
        '_trackEvent',
        'driver_challenge_challengeclick',
        objres
      ])
      // 百度统计
      window._hmt.push([
        '_trackEvent',
        'driver_challenge_challengeclick',
        'click',
        objres.toString()
      ])
    }
  },
  components: {
    'my-footer': myFooter,
    Mongolia
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

.challenge-wrapper {
  .size(100%, 100%);
  background: url('../assets/images/bg.png') no-repeat 0 center;
  background-size: 100% 100%;

  .challenge-header {
    .size(100%, 16rem);
    background: url('../assets/images/bg_top.png') no-repeat 0 bottom;
    background-size: 100% 100%;
    font-family: FZLTZHK--GBK1-0;

    header {
      padding: 3.5rem 0 0 3rem;

      .challenge-icon {
        .size(2rem, 2rem);
        vertical-align: middle;
      }

      .challenge-title {
        font-family: FZLTTHK--GBK1-0;
        font-size: 2rem;
        font-weight: bold;
        font-stretch: normal;
        color: @darker;
        vertical-align: middle;
      }
    }

    section {
      padding: 2rem 3rem 0 3rem;
      display: flex;

      .header-left {
        width: 5rem;
        margin-right: 2rem;
        .avatar {
          .size(100%, 5rem);
          background: @darker;
        }
      }

      .header-right {
        flex: 1;
        .header-flex {
          display: flex;
          flex-direction: column;
          color: @darker;
          .user {
            flex: 1;
            display: flex;
            .user-icon {
              width: 1.3rem;
              margin-right: 1rem;
              img {
                .size(100%, 1.5rem);
              }
            }
            .user-name {
              flex: 1;
              font-size: 1rem;
              margin: auto 0;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              max-width: 12rem;
            }
          }
          .line {
            border: 1px solid #ace0d8;
            width: 100%;
            margin: 0.5rem 0;
          }
          @media screen and (-webkit-min-device-pixel-ratio: 2) {
            .line {
              border: 0.5px solid #ace0d8;
            }
          }
          @media screen and (-webkit-min-device-pixel-ratio: 3) {
            .line {
              border: 0.333333px solid #ace0d8;
            }
          }
          .point-rank {
            flex: 1;
            display: flex;
            justify-content: space-between;
            .point {
              display: flex;
              .point-icon {
                .size(1.56rem, 1.6rem);
                margin: auto 0;
                margin-right: 0.7rem;
              }
              .point-text {
                font-size: 1rem;
                color: @darker;
                .point-title {
                  font-size: 0.7rem;
                }
              }
            }
            .rank {
              display: flex;
              .rank-icon {
                .size(1.56rem, 1.6rem);
                margin: auto 0;
                margin-right: 0.7rem;
              }
              .rank-text {
                font-size: 1rem;
                color: @darker;
                .rank-title {
                  font-size: 0.7rem;
                }
              }
            }
          }
        }
      }
    }
  }

  .challenge-content {
    font-family: FZLTZHK--GBK1-0;
    color: @darker;
    padding-bottom: 4.36rem;
    .pk-title {
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-size: 1rem;
      text-align: center;
    }
    .logo {
      text-align: center;
      .pk-logo {
        .size(12rem, 8rem);
      }
    }
    .challenge-list-wrapper {
      margin-top: 2.5rem;
      .challenge-list {
        display: flex;
        .challenge-item {
          flex: 1;
          margin: auto;
          text-align: center;
          .challenge-item-user {
            position: relative;
            .item-user {
              .size(5rem, 5rem);
              background: @lighter;
            }
            .pointBg {
              .size(4rem, 2rem);
              background: url('../assets/images/pointBg.png') no-repeat top;
              line-height: 2rem;
              background-size: 100% 100%;
              font-size: 1rem;
              color: #fff;
              text-align: center;
              position: absolute;
              top: -0.8rem;
              left: 27%;
              line-height: 2rem;
            }
            .item-userName-box {
              font-size: 0.7rem;
              width: 5rem;
              position: absolute;
              left: -2.5rem;
              bottom: 0.15rem;
              color: @white;
              text-align: center;
              margin-left: 50%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .item-info {
            font-size: 0.8rem;
            margin-top: 0.5rem;
            .item-point {
              margin-bottom: 0.1rem;
            }
          }
          .challenge-btn {
            .size(4rem, 2rem);
            margin: auto;
            margin-top: 1rem;
            background: @darker;
            color: @white;
            font-size: 1rem;
            text-align: center;
            border-radius: 0.8rem;
            line-height: 2rem;
            padding: 0 0.4rem;
          }
          .challenge-btn-gray {
            .size(4rem, 2rem);
            margin: auto;
            margin-top: 1rem;
            background: #999;
            color: @white;
            font-size: 1rem;
            text-align: center;
            border-radius: 0.8rem;
            line-height: 2rem;
            padding: 0 0.4rem;
          }
        }
      }
      .challenge-desc {
        margin-top: 1.5rem;
        font-size: 0.8rem;
        text-align: center;
      }
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
<style lang="scss" scoped>
$mainColor: #0a997e;
@keyframes extendLine-1 {
  //挑战中。。。
  0% {
    width: 90%;
  }
  20% {
    width: 30%;
  }
  40% {
    width: 70%;
  }
  60% {
    width: 40%;
  }
  80% {
    width: 60%;
  }
  100% {
    width: 90%;
  }
}
@keyframes extendLine-2 {
  0% {
    width: 55%;
  }
  20% {
    width: 10%;
  }
  40% {
    width: 65%;
  }
  60% {
    width: 30%;
  }
  80% {
    width: 80%;
  }
  100% {
    width: 60%;
  }
}
@keyframes extendLine-3 {
  0% {
    width: 20%;
  }
  20% {
    width: 50%;
  }
  40% {
    width: 25%;
  }
  60% {
    width: 70%;
  }
  80% {
    width: 40%;
  }
  100% {
    width: 100%;
  }
}
@keyframes point-1 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  20% {
    opacity: 1;
  }
  30% {
    opacity: 0.5;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0.5;
  }
  80% {
    opacity: 0;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes point-2 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  20% {
    opacity: 0.5;
  }
  30% {
    opacity: 1;
  }
  40% {
    opacity: 0.5;
  }
  50% {
    opacity: 0;
  }
  60% {
    opacity: 0.5;
  }
  70% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes point-3 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  30% {
    opacity: 0.5;
  }
  40% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  60% {
    opacity: 0;
  }
  70% {
    opacity: 0.5;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes pk-ball-1 {
  0% {
    transform: rotate(0);
  }
  33% {
    transform: rotate(720deg);
  }
  66% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(400deg);
  }
}
@keyframes pk-ball-2 {
  0% {
    transform: rotate(0);
  }
  33% {
    transform: rotate(-320deg);
  }
  66% {
    transform: rotate(160deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes portrait-left {
  0% {
    margin-left: 2rem;
  }
  30% {
    margin-left: 0.5rem;
  }
  40% {
    margin-left: 2rem;
  }
  70% {
    margin-left: 1rem;
  }
  75% {
    margin-left: 2rem;
  }
  95% {
    margin-left: 1.5rem;
  }
  100% {
    margin-left: 2rem;
  }
}
@keyframes portrait-right {
  0% {
    margin-right: 2rem;
  }
  30% {
    margin-right: 0.5rem;
  }
  40% {
    margin-right: 2rem;
  }
  70% {
    margin-right: 1rem;
  }
  75% {
    margin-right: 2rem;
  }
  95% {
    margin-right: 1.5rem;
  }
  100% {
    margin-right: 2rem;
  }
}
@keyframes keyword {
  0% {
    transform: scale(1, 1);
  }
  30% {
    transform: scale(1.375, 1.375);
  }
  40% {
    transform: scale(1, 1);
  }
  70% {
    transform: scale(1.375, 1.375);
  }
  75% {
    transform: scale(1, 1);
  }
  95% {
    transform: scale(1.375, 1.375);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes gradecard {
  from {
    transform: rotateX(90deg);
  }
  to {
    transform: rotateX(0deg);
  }
}
@keyframes pk-title {
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(90deg);
  }
}
@keyframes pk-left {
  from {
    left: 0;
  }
  to {
    left: -13.1rem;
  }
}
@keyframes pk-right {
  from {
    right: 0;
  }
  to {
    right: -13.5rem;
  }
}
@keyframes pk-keyword {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes star-1 {
  0% {
    opacity: 0;
  }
  33% {
    opacity: 1;
  }
  67% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes closePk {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.shadeDiv {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(10, 153, 126, 0.7);
  z-index: 99;
  display: none;
  .pk-block {
    img {
      width: 100%;
      vertical-align: inherit;
    }

    width: 24rem;
    height: 14rem;
    margin: 16rem auto 1.2rem auto;
    position: relative;
    overflow: hidden;
    .triangle-1 {
      width: 0;
      height: 0;
      border-width: 1rem 1.1rem 0 0;
      border-style: solid;
      border-color: #53b7a4 transparent transparent transparent;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
    }
    .triangle-2 {
      width: 0;
      height: 0;
      border-width: 0 1.03rem 0.9rem 0;
      border-style: solid;
      border-color: transparent #53b7a4 transparent;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 3;
    }
    .triangle-3 {
      width: 0;
      height: 0;
      border-width: 0 1.03rem 0.9rem 0;
      border-style: solid;
      border-color: transparent transparent #53b7a4;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 3;
    }
    .triangle-4 {
      width: 0;
      height: 0;
      border-width: 1rem 1.1rem 0 0;
      border-style: solid;
      border-color: transparent #53b7a4 transparent transparent;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 3;
    }
    .pk-border {
      width: 100%;
      height: 100%;
      position: absolute;
      background: url('../assets/images/pk-cardBorder.png');
      background-size: 100% 100%;
      z-index: 2;
    }
    .pk-left {
      width: 13.07rem;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: url('../assets/images/pk-lt-bg.png');
      background-size: 100% 100%;
      z-index: -1;
      animation: pk-left 0.5s linear 1 normal forwards;
      animation-delay: 3.75s;
      .left-1 {
        width: 5.8rem;
        height: 1.04rem;
        margin: 1.54rem 0 1.14rem 1.75rem;
        float: left;
        .left-1-lt {
          width: 1rem;
          height: 1rem;
          float: left;
          margin-right: 3px;
        }
        .left-1-rt {
          width: calc(4.8rem - 3px);
          height: 1rem;
          float: left;
          .left-1-rt-1 {
            height: 0.25rem;
            background: #fff;
            margin-bottom: 2px;
            animation: extendLine-1 3s linear 1 normal forwards;
          }
          .left-1-rt-2 {
            margin-bottom: 2px;
            overflow: hidden;
            .left-1-rt-2-1 {
              height: 0.25rem;
              background: #fff;
              float: left;
              margin-right: 3px;
              animation: extendLine-2 3s linear 1 normal forwards;
            }
            .left-1-rt-2-2 {
              width: 0.5rem;
              height: 0.25rem;
              background: #fff;
              float: left;
            }
          }
          .left-1-rt-3 {
            height: 0.25rem;
            background: #fff;
            animation: extendLine-3 3s linear 1 normal forwards;
          }
        }
      }
      .left-2 {
        width: 5.25rem;
        height: 5.25rem;
        float: left;
        border-bottom: 2px solid #fff;
        margin: 0 5rem 0.64rem 2rem;
        position: relative;
        animation: portrait-left 1.5s ease 1 normal forwards;
        .portrait {
          height: 100%;
          overflow: hidden;
        }
        .userId {
          width: 100%;
          height: 1rem;
          text-align: center;
          color: #fff;
          position: absolute;
          bottom: 0;
          font-size: 0.65rem;
          background: rgba(26, 23, 197, 0.7);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .left-3 {
        width: 5.25rem;
        height: 1.36rem;
        background: url('../assets/images/pk-gradeBg-lt.png');
        background-size: 100% 100%;
        margin: 0 0 0 2rem;
        float: left;
        color: $mainColor;
        text-align: center;
        line-height: 1.5;
        transform: rotateX(90deg);
        animation: gradecard 0.75s linear 1 normal forwards;
        animation-delay: 3s;
      }
    }
    .pk-right {
      width: 13.46rem;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      background: url('../assets/images/pk-rt-bg.png');
      background-size: 100% 100%;
      z-index: -1;
      animation: pk-right 0.5s linear 1 normal forwards;
      animation-delay: 3.75s;
      .right-1 {
        float: right;
        width: 2.07rem;
        height: 2.07rem;
        margin: 1.04rem 1.71rem 0.64rem 9rem;
        position: relative;
        #right-1-1 {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: url('../assets/images/pk-ball1.png');
          background-size: 100% 100%;
          animation: pk-ball-1 3s linear 1 normal forwards;
        }
        #right-1-2 {
          width: 1.75rem;
          height: 1.75rem;
          position: absolute;
          top: 0.18rem;
          left: 2px;
          background: url('../assets/images/pk-ball2.png');
          background-size: 100% 100%;
          animation: pk-ball-2 3s linear 1 normal forwards;
        }
      }
      .right-2 {
        width: 5.25rem;
        height: 5.25rem;
        float: right;
        border-bottom: 2px solid #fff;
        margin: 0 2rem 0.64rem 5rem;
        position: relative;
        animation: portrait-right 1.5s ease 1 normal forwards;
        .portrait {
          height: 100%;
          overflow: hidden;
        }
        .userId {
          width: 100%;
          height: 1rem;
          text-align: center;
          color: #fff;
          position: absolute;
          bottom: 0;
          font-size: 0.65rem;
          background: rgba(26, 23, 197, 0.7);
        }
      }
      .right-3 {
        width: 5.25rem;
        height: 1.36rem;
        background: url('../assets/images/pk-gradeBg-rt.png');
        background-size: 100% 100%;
        margin: 0 2rem 0 0;
        float: right;
        color: $mainColor;
        text-align: center;
        line-height: 1.5;
        transform: rotateX(90deg);
        animation: gradecard 0.75s linear 1 normal forwards;
        animation-delay: 3s;
      }
    }
    .pk-title {
      width: 8rem;
      height: 2rem;
      margin: 0 auto;
      background: url('../assets/images/pk-challengeBg.png');
      background-size: 100% 100%;
      font-size: 0.9rem;
      line-height: 2rem;
      font-family: '微软雅黑';
      font-weight: 700;
      text-align: center;
      color: #5f9bdd;
      animation: pk-title 0.5s linear 1 normal forwards;
      animation-delay: 3.75s;
      transform-origin: center top;
      > .pk-title-1 {
        font-size: 1rem;
        letter-spacing: 2px;
        background: -webkit-linear-gradient(left, #7b46e6, #5f9bdd);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      #pk-title-point1 {
        animation: point-1 3s linear 1 normal forwards;
      }
      #pk-title-point2 {
        animation: point-2 3s linear 1 normal forwards;
      }
      #pk-title-point3 {
        animation: point-3 3s linear 1 normal forwards;
      }
    }
    .pk-keyword {
      width: 7.71rem;
      height: 5rem;
      margin: 2rem auto;
      overflow: auto;
      animation: pk-keyword 0.75s ease 1 normal forwards;
      animation-delay: 3.75s;
      .keyword {
        width: 5rem;
        margin: 1rem auto;
        animation: keyword 1.5s ease 1 normal forwards;
      }
    }
    .pk-result {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -2;
      background: linear-gradient(left, #7d43e7, #4fcdd7);
      text-align: center;
      .pk-result-div {
        width: 100%;
        height: 8.5rem;
        position: relative;
        overflow: hidden;
      }
      .result-img {
        width: 8.86rem;
        margin: 1rem auto 0.3rem auto;
      }
      .result-grade {
        width: 8.46rem;
        height: 1.96rem;
        border-radius: 0.4rem;
        background: linear-gradient(left, #19d1f4, #3e4691);
        opacity: 0.95;
        margin: 0 auto;
        color: #fff;
        font-size: 1.15rem;
        text-align: center;
        line-height: 1.9rem;
      }
      .result-text {
        font-size: 0.65rem;
        color: #fff;
        margin-top: 0.55rem;
      }
      .star-1 {
        width: 1.86rem;
        position: absolute;
        top: 3rem;
        left: 5.5rem;
        opacity: 0;
        animation: star-1 1.75s linear 1 normal forwards;
        animation-delay: 4.5s;
      }
      .star-2 {
        width: 0.8rem;
        position: absolute;
        top: 3.5rem;
        left: 8.5rem;
        opacity: 0;
        animation: star-1 1.75s linear 1 normal forwards;
        animation-delay: 4.75s;
      }
      .star-3 {
        width: 1.2rem;
        position: absolute;
        top: 6rem;
        left: 7.5rem;
        opacity: 0;
        animation: star-1 2s linear 1 normal forwards;
        animation-delay: 5s;
      }
      .star-4 {
        width: 0.8rem;
        position: absolute;
        top: 4rem;
        right: 8.5rem;
        opacity: 0;
        animation: star-1 1.75s linear 1 normal forwards;
        animation-delay: 5s;
      }
      .star-5 {
        width: 2.3rem;
        position: absolute;
        top: 2rem;
        right: 5.8rem;
        opacity: 0;
        animation: star-1 1.75s linear 1 normal forwards;
        animation-delay: 4.75s;
      }
      .star-6 {
        width: 1.76rem;
        position: absolute;
        top: 5rem;
        right: 5.5rem;
        opacity: 0;
        animation: star-1 1.75s linear 1 normal forwards;
        animation-delay: 5s;
      }
      .equally-1 {
        width: 1.5rem;
        height: 1.5rem;
        border: 3px solid #fff32d;
        border-radius: 50%;
        box-sizing: border-box;
        position: absolute;
        top: 3rem;
        left: 6rem;
        opacity: 0;
        animation: star-1 1.75s linear 1 normal forwards;
        animation-delay: 4.5s;
      }
      .equally-2 {
        width: 0.5rem;
        height: 0.5rem;
        background: #f2f2f2;
        border-radius: 50%;
        position: absolute;
        top: 3.5rem;
        left: 8.5rem;
        opacity: 0;
        animation: star-1 1.75s linear 1 normal forwards;
        animation-delay: 4.75s;
      }
      .equally-3 {
        width: 1.14rem;
        position: absolute;
        top: 6rem;
        left: 7rem;
        opacity: 0;
        animation: star-1 2s linear 1 normal forwards;
        animation-delay: 5s;
      }
      .equally-4 {
        width: 0.65rem;
        height: 0.65rem;
        background: #f2f2f2;
        border-radius: 50%;
        position: absolute;
        top: 3.8rem;
        right: 8.5rem;
        opacity: 0;
        animation: star-1 1.75s linear 1 normal forwards;
        animation-delay: 5s;
      }
      .equally-5 {
        width: 1.8rem;
        position: absolute;
        top: 2rem;
        right: 6rem;
        opacity: 0;
        animation: star-1 1.75s linear 1 normal forwards;
        animation-delay: 4.75s;
      }
      .equally-6 {
        width: 1.2rem;
        height: 1.2rem;
        border: 3px solid #f2f2f2;
        border-radius: 50%;
        box-sizing: border-box;
        position: absolute;
        top: 6rem;
        right: 6.5rem;
        opacity: 0;
        animation: star-1 1.75s linear 1 normal forwards;
        animation-delay: 5s;
      }
      .fail {
        border-color: #f2f2f2;
      }
    }
    .result-close {
      width: 1.68rem;
      height: 1.68rem;
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      z-index: 99;
      opacity: 0;
      animation: closePk 0.1s linear 1 normal forwards;
      animation-delay: 4.5s;
    }
  }
  .point-detail {
    width: 100%;
    text-align: center;
    .point-detail-image {
      width: 9rem;
      height: 2rem;
    }
    opacity: 0;
    animation: closePk 0.1s linear 1 normal forwards;
    animation-delay: 4.5s;
  }
}
</style>
