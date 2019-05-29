<template>
  <div class="home">
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
        <div class="title">{{ driveInfo.nickname || '-' }}的驾驶行为成绩单</div>
        <div class="minTitle">
          我已打败全国{{ driveInfo.defeatPercentage || '-' }}%的用户，居全国{{
            driveInfo.rank || '-'
          }}名！
        </div>
        <div class="portrait">
          <img :src="imgUrlArr[driveInfo.avatar] || imgUrlArr[0]" alt="logo" />
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
                <p style="font-size:1.1rem;">{{ driveInfo.dayScore || '-' }}</p>
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
    <button class="metoojoin" @click="join">我也要参加</button>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      driveInfo: {
        nickname: '',
        defeatPercentage: '',
        rank: '',
        avatar: '',
        city: '',
        dayScore: ''
      },
      scoreList: [],
      totalScore: 0,
      randa_control:0,
      randa_fuelElc:0,
      randa_safe:0,
      randa_challenge:0,
      randa_wisdom:0 
    }
  },
  watch: {
    driveInfo: {
      handler: function(val) {},
      deep: true
    }
  },
  mounted() {
    // 统计页面PV
    window._baq.push(['_trackEvent', 'driver_share_pv', {}])
    // 百度统计
    window._hmt.push(['_trackEvent', 'driver_share_pv', 'pv', ''])
    // 获取参数 与加载页面
    this.defaultMed()
  },
  methods: {
    /**
     * 获取链接后面的参数
     */
    defaultMed() {
      var getparam = this.$route.query.param
      getparam = getparam.split(',')
      // 获取参数
      this.driveInfo['nickname'] = getparam[0]
      this.driveInfo['defeatPercentage'] = getparam[1]
      this.driveInfo['rank'] = getparam[2]
      this.driveInfo['avatar'] = getparam[3]
      this.driveInfo['city'] = getparam[4]
      this.driveInfo['dayScore'] = getparam[5]
      this.totalScore = getparam[6]
      // 每一项得分
      this.scoreList = [
        parseInt(getparam[7]),
        parseInt(getparam[8]),
        parseInt(getparam[9]),
        parseInt(getparam[10]),
        parseInt(getparam[11])
      ]
      this.setEcharts(this.scoreList, this.totalScore)
    },
    join() {
      // 分享页_我也要参加点击
      window._baq.push(['_trackEvent', 'driver_share_jointooclick', {}])
      // 百度统计
      window._hmt.push([
        '_trackEvent',
        'driver_share_jointooclick',
        'click',
        ''
      ])
      this.$router.push({
        path: '/'
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
    }
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
.home {
  width: 100%;
  min-height: 100%;
  background: url('../assets/images/bg.png') no-repeat 0 center;
  background-size: 100% 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .metoojoin {
    width: 9.71rem;
    height: 2.29rem;
    background: #0a997e;
    color: #fff;
    border-radius: 0.4rem;
    font-size: 1.1rem;
    margin: 3.5rem auto;
    display: block;
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
      background: #fff;
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
  }
}
</style>
