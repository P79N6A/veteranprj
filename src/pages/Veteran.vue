<template>
  <div class="mainwrapper">
    <div class="midcontent">
      <div class="home">
        <div class="topBlock">
          <div class="title_img">
            <img src="../assets/images/title.png" alt="谁是老司机" />
          </div>
          <div class="logo">
            <img src="../assets/images/logo.png" alt="logo" />
          </div>
          <div class="driverInfo">
            <div tag="div" class="portrait">
              <img
                :src="imgUrlArr[driveInfo.avatar] || imgUrlArr[0]"
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
                  <div class="div_name">{{ driveInfo.nickname || '-' }}</div>
                </div>
                <div class="driverInfoItem2" style="margin-left:3px;">
                  <div class="icon_site">
                    <img src="../assets/images/icon_site.png" alt="" />
                  </div>
                  <div class="div_site">{{ driveInfo.city || '-' }}</div>
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
                      {{ driveInfo.dayScore || '-' }}
                    </p>
                  </div>
                </div>
                <div class="driverInfoItem2">
                  <div class="icon_rank">
                    <img src="../assets/images/icon_rank.png" alt="" />
                  </div>
                  <div class="div_rank">
                    <p style="font-size:.85rem;float:none;">个人排名</p>
                    <p style="font-size:1.1rem;">{{ driveInfo.rank || '-' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="echartBlock">
          <div class="echarts">
            <div class="randa randa_control">{{randa_control}}</div>
            <div class="randa randa_fuelElc">{{randa_fuelElc}}</div>
            <div class="randa randa_safe">{{randa_safe}}</div>
            <div class="randa randa_challenge">{{randa_challenge}}</div>
            <div class="randa randa_wisdom">{{randa_wisdom}}</div>
            <div id="echart1"></div>
          </div>
          
          <span class="gradeDetail" @click="linkDtepage">得分详情>></span>
          <div class="toEarnScore" @click="linkToGetpoint">
            <img src="../assets/images/toEarnScore.png" alt="去赚分" />
            <div class="highLight"></div>
          </div>
        </div>
        <p class="explain1">
          *报名当日分数基于5月14日-5月28日的驾驶行为计算，第二天开始以活动期间的驾驶行为计算。
        </p>
        <div class="buttonBlock">
          <div>
            <button class="creatMyReport" @click="createReport">
              生成我的报告
            </button>
          </div>

          <div class="stepDiv">
            <div class="mark">
              <img src="../assets/images/mark.png" alt="mark" />
            </div>
            <div class="mark2">
              <img src="../assets/images/mark.png" alt="mark" />
            </div>
            <div
              :class="[
                shadeDiv,
                { shadeDiv0: step == 0 },
                { shadeDiv1: step == 1 },
                { shadeDiv2: step == 2 },
                { shadeDiv3: step >= 3 }
              ]"
            ></div>
          </div>
          <p class="explain2" v-if="step < 3">{{ explain[step] }}</p>
          <p class="explain2" v-else>{{ explain[3] }}</p>
        </div>
      </div>
    </div>
    <my-footer active="1"></my-footer>
    <div
      class="toastbox"
      id="toastbox"
      :class="firstIn?'fadein':'fadeout'"
      v-if="firstIn"
    >
      <div class="warp">
        <div class="closeBlock">
          <div class="closeImg" @click="closeWarp">
            <img src="../assets/images/close.png" alt="" />
          </div>
        </div>
        <p class="p1">记得收藏地址</p>
        <p class="p2">活动期间每日来查看自己的驾驶成绩哦！</p>
        <div>
          <div class="order">1.</div>
          <p class="p3">点击右上角</p>
          <div class="point">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div>
          <div class="order">2.</div>
          <p class="p3">选择“收藏”或“浮窗”</p>
        </div>
        <div class="iconLists">
          <img
            v-if="isAndroid === true"
            src="../assets/images/save_android.png"
            alt=""
          />
          <img
            v-else
            src="../assets/images/save_ios.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var token = localStorage.getItem('token')
import { Indicator } from 'mint-ui'
import { mapState } from 'vuex'
import myFooter from '@/components/footer'
export default {
  name: 'home',
  data() {
    return {
      firstIn: false,
      driveInfo: {},
      scoreList: [],
      totalScore: 0,
      step: 0, //用户当前参与天数
      shadeDiv: 'shadeDiv',
      explain: [
        '*活动期间至少要有3天行驶里程达到5km，才获得进入最终获奖榜单资格哦！',
        '*再有2天行驶里程达到5km，即可进入最终获奖榜单哦！',
        '*再有1天行驶里程达到5km，即可进入最终获奖榜单哦！',
        '*已有3天行驶超过5km，你已进入最终获奖榜单！'
      ],
      isAndroid: null,
      randa_control:0,
      randa_fuelElc:0,
      randa_safe:0,
      randa_challenge:0,
      randa_wisdom:0
    }
  },
  computed: {
    ...mapState(['userInfo']),
    scoreData() {
      const { scoreList, totalScore } = this
      return { scoreList, totalScore }
    }
  },
  created() {
    Indicator.open()
    var u = navigator.userAgent.toLowerCase(),
      app = navigator.appVersion
    var isAndroid = u.indexOf('android') > -1 || u.indexOf('linux') > -1 //android终端或者uc浏览器
    alert(u)
    alert('isAndroid:'+isAndroid)
    //var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    if (u.match(/MicroMessenger/i) == 'micromessenger') {
      alert('微信环境')
    // if(u.indexOf('MicroMessenger')>-1){
      //微信环境才显示收藏
      //判断是否第一次进首页--收藏提醒
      if (localStorage.getItem('hadEnteredVeteran')!='true') {
        alert('第一次登陆')
        this.firstIn = true
        localStorage.setItem('hadEnteredVeteran', true)
        if (isAndroid == true) {
          //显示安卓版收藏
          this.isAndroid = true
        } else this.isAndroid = false //显示iOS版收藏
      } else {
        this.firstIn = false
      }
    }else{
      this.firstIn = false
    }
    this.getInitData()
  },
  watch: {
    // scoreList(newVal,oldVal) {
    //   this.setEcharts(newVal, this.totalScore)
    // }
    scoreData: {
      handler: function(val) {
        this.setEcharts(val.scoreList, val.totalScore)
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setEcharts(this.scoreList, this.totalScore)
    })

    // 统计页面PV
    window._baq.push(['_trackEvent', 'driver_mainpage_pv', {}])
    // 百度统计
    window._hmt.push(['_trackEvent', 'driver_mainpage_pv', 'pv', ''])
  },
  methods: {
    getInitData() {
      let token = localStorage.getItem('token')
      let banmaId = localStorage.getItem('banmaId')
      let param = {
        banmaId: 7,
        campId: '1',
        token
      }
      let api = 'getDriverReport'
      this.$fetchData
        .fetchVeteranGet(param, api, 'activityRegisterReqDto')
        .then(res => {
          if (res && (res.data && res.data.data)) {
            this.driveInfo = res.data.data
            this.step = parseInt(res.data.data.fivekmDays||0)
            this.scoreList = [
              parseInt(this.driveInfo.controlScore||0),
              parseInt(this.driveInfo.fuelElcScore||0),
              parseInt(this.driveInfo.safeScore||0),
              parseInt(this.driveInfo.challengeScore||0),
              parseInt(this.driveInfo.wisdomScore||0)
            ]
            this.totalScore = this.driveInfo.dayScore||0
            Indicator.close()
          } else {
            Indicator.close()
            if (res && (res.data && res.data.err_resp)) {
              if (res.data.err_resp.code == '36094') {
                res.data.err_resp.desc = '获取昨日数据失败，请稍后再试'
              }
              this.$toast(res.data.err_resp.desc, 3000)
            }
          }
        })
    },
    createReport() {
      // 统计页面PV
      window._baq.push(['_trackEvent', 'driver_mainpage_reportclick', {}])
      // 百度统计
      window._hmt.push([
        '_trackEvent',
        'driver_mainpage_reportclick',
        'click',
        ''
      ])
      // app端显示
      var u = navigator.userAgent
      if ( u.toLowerCase().indexOf('banma_ios_app') !== -1 || u.toLowerCase().indexOf('bm_android') !== -1 ) {
        this.$router.push({
          path: '/reportPageA'
        })
        return
      }
      // 非app端显示
      this.$router.push({
        path: '/reportPage'
      })
    },
    setEcharts(_val, total) {
      this.randa_control = _val[0] || 0;
      this.randa_fuelElc= _val[1] || 0;
      this.randa_safe = _val[2] || 0;
      this.randa_challenge = _val[3] || 0;
      this.randa_wisdom = _val[4] || 0;
      var dom = document.getElementById('echart1')
      var myChart = this.$echarts.init(dom)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          show: false
        },
        radar: {
          nameGap: 13, //文字与图形的间距
          indicator: [
            { text: `操控`, max: 100 },
            { text: `节能`, max: 100 },
            { text: `安全`, max: 100 },
            { text: `挑战`, max: 100 },
            { text: `智慧`, max: 100 }
          ],
          center: ['50%', '55%'],
          radius: '83%',
          name: {
            rich:{
              width:'120%'
            },
            textStyle: {
              color: '#028e82',
              fontSize: 14,
              textaLign:'center'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: '#4ecaac' // 图表背景的颜色
            }
          }
        },
        title: {
          text: total,
          x: 'center',
          top: '50%',
          textStyle: {
            color: '#fff',
            fontWeight: 'bolder',
            fontSize: 22
          }
        },
        series: {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              }
            }
          },
          data: [
            {
              value: _val,
              name: '老司机',
              label: {
                normal: {
                  show: false,
                  formatter: function(params) {
                    return params.value
                  }
                  // padding: 3,
                  // backgroundColor: '#0a997e',
                  // borderRadius: 15,
                  // lineHeight: 14
                }
              },
              areaStyle: {
                normal: {
                  color: 'rgba(255, 255, 255, 0.75)'
                }
              },
              lineStyle: {
                width: 0
              },
              itemStyle: {
                color: '#fff'
              }
            }
          ]
        }
      })
    },
    closeWarp() {
      this.firstIn = false;
    },

    /**
     * 跳转到得分详情页
     */
    linkDtepage() {
      // 活动首页_得分详情点击
      window._baq.push(['_trackEvent', 'driver_mainpage_detailclick', {}])
      // 百度统计
      window._hmt.push([
        '_trackEvent',
        'driver_mainpage_detailclick',
        'click',
        ''
      ])
      this.$router.push({
        path: '/gradeDetail'
      })
    },
    /**
     * 点击去赚分
     */
    linkToGetpoint() {
      // 活动首页_去赚分点击
      window._baq.push(['_trackEvent', 'driver_mainpage_earnscoreclick', {}])
      // 百度统计
      window._hmt.push([
        '_trackEvent',
        'driver_mainpage_earnscoreclick',
        'click',
        ''
      ])
      this.$router.push({
        path: '/challengeRound'
      })
    }
  },
  components: {
    'my-footer': myFooter
  }
}
</script>

<style lang="scss" scoped>
$color: #028e82;
$footerColor: #e4f8f0;
p {
  margin: 0;
}
img {
  width: 100%;
}
@keyframes highLight {
  0% {
    left: 0;
    opacity: 0;
  }
  50% {
    left: 110%;
    opacity: 0.5;
  }
  100% {
    left: 110%;
    opacity: 0;
  }
}
.fadein {
  animation: animate_in 0.25s;
}
.fadeout {
  animation: animate_out 0.35s;
  opacity: 0;
}
@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.midcontent{
  background: url('../assets/images/bg.png') no-repeat 0 center;
  background-size: 100% 100%;
}
.home {
  width: 100%;
  height: auto;
  position: relative;
  
  &::-webkit-scrollbar {
    display: none;
  }
  .topBlock {
    width: 100%;
    height: 16rem;
    background: url('../assets/images/bg_top.png') no-repeat 0 bottom;
    background-size: 100% 100%;
    color: $color;
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
            width: 6rem;
            height: 1.6rem;
          }
        }
      }
    }
    .portrait {
      width: 4.04rem;
      height: 4.04rem;
      float: left;
      margin-left: 3.43rem;
      background: $color;
      overflow: hidden;
    }

    .icon_name {
      width: 1.32rem;
    }
    .icon_site {
      width: 1.29rem;
    }
    .icon_grade {
      width: 1.64rem;
    }
    .icon_rank {
      width: 1.71rem;
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
    .div_rank {
    }
  }
  .echartBlock {
    overflow: hidden;
    position: relative;
    .echarts {
      width: 22rem;
      height: 19.5rem;
      margin: 0.5rem auto 0 auto;
      .randa{
        position:absolute;
        width:1.8rem;
        height:1.8rem;
        border-radius: 50%;
        color:#eee;
        text-align: center;
        line-height:1.8rem;
        background: $color;
        z-index: 2;
      }
      .randa_control{top:2.5rem;left:12.5rem;}
      .randa_fuelElc{top:7.9rem;left:5.2rem;}
      .randa_safe{bottom:1.5rem;left:8rem;}
      .randa_challenge{bottom:1.5rem;right:8rem;}
      .randa_wisdom{top:7.9rem;right:5.2rem;}
      #echart1{
        width:100%;
        height:100%;
      }
    }
    .gradeDetail {
      position: absolute;
      z-index: 9;
      color: $color;
      font-size: 0.95rem;
      top: 2.5rem;
      right: 1.6rem;
      text-decoration: underline;
    }
    .toEarnScore {
      position: absolute;
      bottom: 2.5rem;
      right: 1rem;
      & > img {
        width: 5.75rem;
      }
      .highLight {
        position: absolute;
        top: 0;
        width: 3px;
        height: 100%;
        background: #fff;
        animation: highLight 1.5s;
        animation-delay: 3s;
        animation-iteration-count: 2;
        transform: rotate(30deg);
        opacity: 0;
      }
    }
  }
  .explain1 {
    width: 18rem;
    margin: 0 auto;
    text-align: center;
    font-size: 0.75rem;
    color: $color;
    opacity: 0.85;
  }
  .buttonBlock {
    text-align: center;
    margin-top: 1.9rem;
    padding-bottom: 3.36rem;
    .creatMyReport {
      width: 9.7rem;
      height: 2.32rem;
      background: #0a997e;
      color: #fff;
      font-size: 1rem;
      border: 0;
      outline: 0;
      border-radius: 4px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .explain2 {
      width: 90%;
      margin: 0 auto;
      text-align: center;
      font-size: 0.75rem;
      color: $color;
      opacity: 0.85;
    }
    .stepDiv {
      width: 11.8rem;
      height: 0.6rem;
      margin: 1.8rem auto 0.4rem auto;
      box-sizing: border-box;
      background: linear-gradient(left, #7d42e7, #2bebd7);
      position: relative;
      .mark {
        width: 0.5rem;
        position: absolute;
        top: -6px;
        left: calc(33% - 0.25rem);
        z-index: 9;
      }
      .mark2 {
        width: 0.5rem;
        position: absolute;
        top: -6px;
        left: calc(66% - 0.25rem);
        z-index: 9;
      }
      .shadeDiv {
        height: 100%;
        background: $footerColor;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
      }
      .shadeDiv3 {
        //第三天
        width: 0;
      }
      .shadeDiv2 {
        //第二天
        width: 33.33%;
      }
      .shadeDiv1 {
        //第1天
        width: 66.66%;
      }
      .shadeDiv0 {
        //未开始
        width: 100%;
      }
    }
  }
}
  .toastbox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(83, 183, 164, 0.7);
    .warp {
      width: 16.3rem;
      height: 21rem;
      background: #e4f8f0;
      border-radius: 0.55rem;
      margin: 13rem auto;
      text-align: center;
      padding: 0 0.7rem;
      p {
        color: $color;
      }
      .p1 {
        font-size: 16px;
      }
      .closeBlock {
        padding: 0.5rem 0 0.25rem;
        overflow: hidden;
        .closeImg {
          width: 1.2rem;
          float: right;
        }
      }
      .order {
        width: 1rem;
        height: 1rem;
        background: $color;
        color: #fff;
        display: inline-block;
        font-size: 0.75rem;
      }
      .p3 {
        font-size: 0.75rem;
        display: inline;
        margin-left: 4px;
      }
      .iconLists {
        margin-top: 0.4rem;
      }
      .point {
        display: inline-block;
        background: #fff;
        height: 1rem;
        line-height: 1;
        margin-left: 2px;
        > div {
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: $color;
          display: inline-block;
          margin: 0 2px;
        }
      }
    }
  }
</style>
