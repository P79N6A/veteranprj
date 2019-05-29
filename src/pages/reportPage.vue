<template>
  <div class="home" id="home">
    <!-- <div id="screenshot"> -->
    <div v-if="isShow">
      <div class="topBlock">
        <div style="overflow:hidden;">
          <div class="title_img">
            <img src="../assets/images/title.png" alt="谁是老司机" />
          </div>
          <div class="logo">
            <img src="../assets/images/logo.png" alt="logo" />
          </div>
        </div>

        <div class="driverInfo">
          <div class="title">
            {{ driveInfo.nickname || '-' }}的驾驶行为成绩单
          </div>
          <div class="minTitle">
            <span v-if="isFirstDay"
              >我已打败全国{{
                driveInfo.defeatPercentage || '-'
              }}%的用户，</span
            >居全国{{ driveInfo.rank || '-' }}名！
          </div>
          <div class="portrait">
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
      </div>
      <div id="qrcode"></div>
      <p class="p">长按可保存成绩单<br />识别二维码参与驾驶行为大比拼</p>
    </div>
    <img
      v-if="!isShow"
      width="100%"
      height="100%"
      :src="dataURL"
      alt="分享图"
    />
  </div>
  <!-- </div> -->
</template>
<script>
import { Indicator } from 'mint-ui'
import myFooter from '@/components/footer'
import html2canvas from 'html2canvas'
import { setTimeout } from 'timers'
import QRCode from 'qrcodejs2'
var touchStartTime
var touchEndTime
var touchDuringTime
export default {
  name: 'home',
  data() {
    return {
      driveInfo: {},
      scoreList: [],
      totalScore: 0,
      dataURL: '',
      isShow: true,
      isFirstDay: null,//是否活动第一天
      randa_control:0,
      randa_fuelElc:0,
      randa_safe:0,
      randa_challenge:0,
      randa_wisdom:0 
    }
  },
  computed: {
    scoreData() {
      const { scoreList, totalScore } = this
      return { scoreList, totalScore }
    }
  },
  created() {
    this.getInitData()
  },
  mounted() {
    this.isFirstDay = new Date('2019/05/30') > new Date()
    this.$nextTick(() => {
      this.setEcharts(this.scoreList, this.totalScore)
    })
    this.defaultMed()
  },
  watch: {
    scoreData: {
      handler: function(val) {
        this.setEcharts(val.scoreList, val.totalScore)
        setTimeout(() => {
          this.screenshot()
        }, 1500)
      },
      deep: true
    },
    dataURL(newVal) {
      newVal != '' ? (this.isShow = false) : (this.isShow = true)
    }
  },
  methods: {
    /**
     * 默认加载
     */
    defaultMed() {
      // 报告页_页面展现
      window._baq.push(['_trackEvent', 'driver_report_pv', {}])
      // 百度统计
      window._hmt.push(['_trackEvent', 'driver_report_pv', 'pv', ''])
      Indicator.open()
    },
    getInitData() {
      let token = localStorage.getItem('token')
      let param = {
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
          } else {
            if (res && (res.data && res.data.err_resp)) {
              this.$toast(res.data.err_resp.desc, 3000)
            }
          }
          this.qrcode()
          Indicator.close()
          // 数据加载之后1500ms 无数据也绘制页面
          setTimeout(() => {
            this.screenshot()
          }, 1500)
        }).catch(err => {
          this.qrcode()
          Indicator.close()
          // 数据加载之后1500ms 无数据也绘制页面
          setTimeout(() => {
            this.screenshot()
          }, 1000)
        })
    },
    qrcode() {
      // 参数
      var linkparam = this.getlinkparamMed()
      // 区分环境
      var linkUrl = ''
      if (location.host === 'h5.zebred.com') {
        // 生产环境
        linkUrl =
          'https://h5.zebred.com/veteranprj/index.html#/reportPageB' + linkparam
      } else if (location.host.includes('pre.h5.zebred.com')) {
        // 线上QA环境
        linkUrl =
          'https://pre.h5.zebred.com/veteranprj/index.html#/reportPageB' +
          linkparam
      } else {
        // 其他环境
        linkUrl =
          'https://apph5-qa.zebred.com/zxqapp/veteranprj/#/reportPageB' +
          linkparam
      }
      let qrcode = new QRCode('qrcode', {
        width: 100,
        height: 100,
        text: linkUrl, // 二维码地址
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.L
      })
    },
    getlinkparamMed() {
      // 昵称
      var nickname = '-'
      if (this.driveInfo.nickname) {
        nickname = this.driveInfo.nickname
      }
      // 百分比
      var defeatPercentage = '-'
      if (this.driveInfo.defeatPercentage) {
        defeatPercentage = this.driveInfo.defeatPercentage
      }
      // 排名
      var rank = '-'
      if (this.driveInfo.rank) {
        rank = this.driveInfo.rank
      }
      // 头像
      var avatar = '-'
      if (this.driveInfo.avatar) {
        avatar = this.driveInfo.avatar
      }
      // city
      var city = '-'
      if (this.driveInfo.city) {
        city = this.driveInfo.city
      }
      // dayScore
      var dayScore = '-'
      if (this.driveInfo.dayScore) {
        dayScore = this.driveInfo.dayScore
      }
      // dayScore
      var totalScore = '-'
      if (this.totalScore) {
        totalScore = this.totalScore
      }
      // controlScore
      var controlScore = '-'
      if (this.driveInfo.controlScore) {
        controlScore = this.driveInfo.controlScore
      }
      // fuelElcScore
      var fuelElcScore = '-'
      if (this.driveInfo.fuelElcScore) {
        fuelElcScore = this.driveInfo.fuelElcScore
      }
      // safeScore
      var safeScore = '-'
      if (this.driveInfo.safeScore) {
        safeScore = this.driveInfo.safeScore
      }
      // challengeScore
      var challengeScore = '-'
      if (this.driveInfo.challengeScore) {
        challengeScore = this.driveInfo.challengeScore
      }
      // wisdomScore
      var wisdomScore = '-'
      if (this.driveInfo.wisdomScore) {
        wisdomScore = this.driveInfo.wisdomScore
      }
      // var param = '?nickname=' + nickname + '&defeatPercentage=' + defeatPercentage +'&rank=' + rank + '&avatar=' + avatar + '&city=' + city + '&dayScore=' + dayScore + '&totalScore=' + totalScore + '&controlScore=' + controlScore + '&fuelElcScore=' + fuelElcScore +'&safeScore=' + safeScore + '&challengeScore=' + challengeScore + '&wisdomScore=' + wisdomScore
      var param = '?param=' + nickname + ',' + defeatPercentage + ',' + rank + ',' + avatar + ',' +
        city + ',' + dayScore + ',' + totalScore + ',' + controlScore + ',' + fuelElcScore +
        ',' + safeScore + ',' + challengeScore + ',' + wisdomScore
      return param
    },
    utf16to8(str) {
      var out, i, len, c
      out = ''
      len = str.length
      for (i = 0; i < len; i++) {
        c = str.charCodeAt(i)
        if (c >= 0x0001 && c <= 0x007f) {
          out += str.charAt(i)
        } else if (c > 0x07ff) {
          out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f))
          out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f))
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
        } else {
          out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f))
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
        }
      }
      return out
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
            textStyle: {
              color: '#028e82',
              fontSize: 14
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
            fontSize: 26
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
                  padding: 3,
                  backgroundColor: '#0a997e',
                  borderRadius: 15,
                  lineHeight: 14,
                  show: false,
                  formatter: function(params) {
                    return params.value
                  }
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
    screenshot() {
      html2canvas(document.querySelector('#home')).then(canvas => {
        //let imgUrl
        this.dataURL = canvas.toDataURL('image/png')
        //let img = new Image();
        // img.src = imgUrl;
        // img.style.width = '100%';
        // img.style.height = '100%';
        // img.style.position='absolute';
        // img.style.top=0;
        // img.style.left=0;
        // img.style.zIndex=99;
        // document.querySelector("#home").appendChild(img);
      })
      // html2canvas(document.querySelector("#home"),{
      //   allowTaint: true,
      //   taintTest: false,
      //   width: '100%',
      //   height: '100%',
      //   // window.devicePixelRatio是设备像素比
      //   dpi: window.devicePixelRatio,
      //   onrendered: function(canvas) {
      //       const dataUrl = canvas.toDataURL("image/png", 1.0),
      //             newImg = document.createElement("img");
      //             console.log(canvas)
      //       newImg.src = dataUrl;
      //       document.querySelector("#home").append(newImg);
      //       newImg.style.width = '100%';
      //       newImg.style.height = '100%';
      //       newImg.style.position='absolute';
      //       newImg.style.top=0;
      //       newImg.style.left=0;
      //       newImg.style.zIndex=99;
      //   }
      // })
    },
    // mytouchStart(e){
    //     touchStartTime = e.timeStamp;
    // },
    // mytouchEnd(e){
    //     touchEndTime = e.timeStamp;
    //     touchDuringTime = (touchEndTime - touchStartTime)/1000;
    //     if(touchDuringTime>1){
    //         html2canvas(document.querySelector("#screenshot")).then(canvas => {
    //             document.body.appendChild(canvas);

    //         });
    //     }
    // },
    setQRcode() {}
  },
  components: {
    'my-footer': myFooter
  }
}
</script>

<style lang="scss" scoped>
* {
  user-select: auto !important;
}
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
.home {
  width: 100%;
  min-height: 100%;
  overflow: auto;
  position: relative;
  background: url('../assets/images/bg.png') no-repeat 0 center;
  background-size: 100% 100%;
  #screenshot {
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .topBlock {
    width: 100%;
    height: 16rem;
    background: url('../assets/images/bg_top.png') no-repeat 0 bottom;
    background-size: 100% 100%;
    color: $color;
    overflow: auto;
    box-sizing: border-box;
    padding-top: 2.5rem;
    .title_img {
      width: 4.75rem;
      float: right;
      margin-right: 1.25rem;
    }
    .logo {
      width: 4.75rem;
      float: left;
      margin-left: 1.2rem;
    }
    .driverInfo {
      width: 100%;
      overflow: hidden;
      margin-top: 1rem;
      .title {
        font-size: 1.1rem;
        font-weight: 700;
        padding-left: 3.43rem;
        margin-bottom: 0.3rem;
      }
      .minTitle {
        font-size: 0.75rem;
        padding-left: 3.43rem;
        margin-bottom: 1.2rem;
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
      bottom: 1rem;
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
    margin-bottom: 3.36rem;
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
      width: 16rem;
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
        top: -3px;
        left: calc(33% - 0.25rem);
        z-index: 9;
      }
      .mark2 {
        width: 0.5rem;
        position: absolute;
        top: -3px;
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
  #qrcode {
    width: 100px;
    height: 100px;
    margin: 2rem auto 0 auto;
  }
  .p {
    width: 16rem;
    margin: 0.5rem auto;
    text-align: center;
    font-size: 0.5rem;
    color: $color;
  }
}
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>
