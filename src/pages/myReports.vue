<template>
  <div class="mainwrapper">
    <div class="midcontent">
      <div
        class="wrapper report-wrapper"
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
                      {{ driveInfo.dayScore || '-' }}分
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

        <div class="report-content">
          <router-link tag="div" to="/winAward" class="back-btn"
            >返回</router-link
          >
          <div class="echarts">
            <div class="randa randa_control">{{ randa_control }}</div>
            <div class="randa randa_fuelElc">{{ randa_fuelElc }}</div>
            <div class="randa randa_safe">{{ randa_safe }}</div>
            <div class="randa randa_challenge">{{ randa_challenge }}</div>
            <div class="randa randa_wisdom">{{ randa_wisdom }}</div>
            <div id="echart1"></div>
          </div>
          <div class="build-reports" @click="createReport">生成我的报告</div>
        </div>
      </div>
    </div>

    <my-footer active="5"></my-footer>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import MyFooter from '@/components/footer'
export default {
  data() {
    return {
      driveInfo: {},
      scoreList: [],
      totalScore: 0,
      dataURL: '',
      randa_control: 0,
      randa_fuelElc: 0,
      randa_safe: 0,
      randa_challenge: 0,
      randa_wisdom: 0
    }
  },
  computed: {
    scoreData() {
      const { scoreList, totalScore } = this
      return {
        scoreList,
        totalScore
      }
    }
  },
  created() {
    this.getInitData()
  },
  mounted() {
    // 打开加载框
    Indicator.open()
    this.$nextTick(() => {
      // 我的报告页_页面展现
      window._baq.push(['_trackEvent', 'driver_finalreport_pv', {}])
      // 百度统计
      window._hmt.push(['_trackEvent', 'driver_finalreport_pv', 'pv', ''])
      this.setEcharts(this.scoreList, this.totalScore)
    })
  },
  watch: {
    scoreData: {
      handler: function(val) {
        this.setEcharts(val.scoreList, val.totalScore)
      },
      deep: true
    }
  },
  components: {
    MyFooter
  },
  methods: {
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
            Indicator.close()
            this.driveInfo = res.data.data
            this.scoreList = [
              parseInt(this.driveInfo.controlScore),
              parseInt(this.driveInfo.fuelElcScore),
              parseInt(this.driveInfo.safeScore),
              parseInt(this.driveInfo.challengeScore),
              parseInt(this.driveInfo.wisdomScore)
            ]
            this.scoreList.forEach(val => {
              this.totalScore += val
            })
          } else {
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
    setEcharts(_val, total) {
      this.randa_control = _val[0] || 0
      this.randa_fuelElc = _val[1] || 0
      this.randa_safe = _val[2] || 0
      this.randa_challenge = _val[3] || 0
      this.randa_wisdom = _val[4] || 0
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
                  show: false,
                  formatter: function(params) {
                    return params.value
                  },
                  rich: {
                    width: 50,
                    height: 50
                  },
                  padding: 3,
                  backgroundColor: '#0a997e',
                  borderRadius: 15,
                  lineHeight: 14
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
    /**
     * 生成我的报告
     */
    createReport() {
      // app端显示
      var u = navigator.userAgent
      if (
        u.toLowerCase().indexOf('banma_ios_app') !== -1 ||
        u.toLowerCase().indexOf('bm_android') !== -1
      ) {
        this.$router.push({
          path: '/reportPageA'
        })
        return
      }
      // 非app端显示
      this.$router.push({
        path: '/reportPage'
      })
    }
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

.report-wrapper {
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
        background: @white;
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

  .report-content {
    // overflow: hidden;
    position: relative;

    .back-btn {
      position: absolute;
      top: 2rem;
      right: 1.8rem;
      .size(3rem, 1.3rem);
      color: @white;
      background: @darker;
      border-radius: 0.3rem;
      font-size: 0.7rem;
      line-height: 1.3rem;
      text-align: center;
      z-index: 99;
    }

    .echarts {
      width: 22rem;
      height: 19.5rem;
      margin: 0.5rem auto 0 auto;
      .randa {
        position: absolute;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        color: #eee;
        text-align: center;
        line-height: 1.8rem;
        background: @darker;
        z-index: 2;
      }
      .randa_control {
        top: 2rem;
        left: 12.5rem;
      }
      .randa_fuelElc {
        top: 7.5rem;
        left: 5rem;
      }
      .randa_safe {
        bottom: 7.8rem;
        left: 8rem;
      }
      .randa_challenge {
        bottom: 7.8rem;
        right: 8rem;
      }
      .randa_wisdom {
        top: 7.4rem;
        right: 5rem;
      }
      #echart1 {
        width: 100%;
        height: 100%;
      }
    }

    .build-reports {
      margin: auto;
      margin-top: 4rem;
      .size(9.7rem, 2.32rem);
      line-height: 2.35rem;
      color: @white;
      background: @darker;
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 1px;
      border-radius: 0.4rem;
      text-align: center;
    }
  }
}
</style>
