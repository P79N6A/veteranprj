<template>
  <div
    class="loading-wrapper"
    :style="{ height: pageHeight + 'px' }"
    :class="{ fadeout: !hideBgcbool }"
  >
    <!-- 背景 -->
    <div class="loadingbgc" :style="{ bottom: -bgcheight + 'rem' }"></div>
    <!-- 车辆及文字信息 -->
    <div class="infobox" :style="{ bottom: carbtoheight + 'rem' }">
      <!-- car & word -->
      <div class="carbgc">
        <!-- 其他信息展示框 -->
        <div class="otherinfo">
          <!-- 首屏 logo和进度条 -->
          <div
            class="logo-progress"
            :class="{ logodown: logoDown }"
            :style="{ bottom: -firstheight + 'rem' }"
            v-if="firstBool"
          >
            <img
              class="btologo"
              src="../assets/images/loading/btologo.png"
              alt="banam logo"
            />
            <div class="progressbox">
              <div class="progressbar">
                <!-- 当前进度 -->
                <div
                  class="current-bgc"
                  :style="{ width: 100 - barstatus + '%' }"
                ></div>
              </div>
              <div class="current-status">{{ barstatus + '%' }}</div>
            </div>
          </div>
          <!-- 文言 -->
          <div class="dialogue-box" v-if="secendBool">
            <div class="dialogue-item">
              <img
                class="dialogue-img"
                src="../assets/images/loading/dialogue1.png"
                alt=""
                v-if="dialogueFirst"
              />
              <img
                class="dialogue-speed"
                src="../assets/images/loading/speedline.png"
                alt=""
                :class="{ dialoguebgc: dialogueFirstBto }"
              />
            </div>
            <div class="dialogue-item">
              <img
                class="dialogue-img"
                src="../assets/images/loading/dialogue2.png"
                alt=""
                v-if="dialogueSecond"
              />
              <img
                class="dialogue-speed"
                src="../assets/images/loading/speedline.png"
                alt=""
                v-if="dialogueSecondBto"
              />
            </div>
            <div class="dialogue-item">
              <img
                class="dialogue-img"
                src="../assets/images/loading/dialogue3.png"
                alt=""
                v-if="dialogueThird"
              />
              <img
                class="dialogue-speed"
                src="../assets/images/loading/speedline.png"
                alt=""
                v-if="dialogueThirdBto"
              />
            </div>
          </div>
        </div>
        <!-- 车固定 -->
        <img
          class="car-icon"
          src="../assets/images/loading/car.png"
          alt="car"
          v-if="carBool"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageHeight: 0, // 页面高度
      bgcheight: 0, // 背景图高度
      carbtoheight: 23.82,
      barstatus: 0,
      isBtofadeOut: false, // 底部效果先隐藏
      logoDown: false, // 底部logo是否下移
      firstBool: true,
      firstheight: 1.714,
      secendBool: false, // 第二步显示文言
      dialogueFirst: false, // 文言第一步
      dialogueFirstBto: false, // 文言第一步轨迹线
      dialogueSecond: false, // 文言第二步
      dialogueSecondBto: false, // 文言第二步轨迹线
      dialogueThird: false, // 文言第三步
      dialogueThirdBto: false, // 文言第三步轨迹线
      baseFontsize: 14, // 默认是14px
      isEmitBool: false, // 是否为第一次通知登陆页动画结束
      carBool: true, // 控制小车显示的boolean
      hideBgcbool: true // 隐藏背景色
    }
  },
  mounted() {
    this.defaultMed()
  },
  methods: {
    defaultMed() {
      this.pageHeight = document.documentElement.clientHeight
      this.baseFontsize = 14 * (document.documentElement.clientWidth / 375)
      var calbtoHeight = this.pageHeight / this.baseFontsize / 2
      if (calbtoHeight) {
        this.carbtoheight = parseFloat(calbtoHeight)
      }
      this.statusBar()
    },
    /**
     * 加载进度条
     */
    statusBar() {
      if (this.barstatus < 100) {
        var timer = setInterval(() => {
          if (this.barstatus < 40) {
            this.barstatus += 2
          } else if (this.barstatus < 60) {
            this.barstatus += 1
          } else {
            this.barstatus += 2
          }
          if (this.barstatus >= 100) {
            window.clearInterval(timer)
            this.logoDown = true
            this.isBtofadeOut = true
            // 整个banner下移1rem
            setTimeout(() => {
              this.runMed()
              this.logoDown = false
              // this.firstBool = false
            }, 400)
          }
        }, 50)
      }
    },
    /**
     * 运行
     */
    runMed() {
      var timer = setInterval(() => {
        this.bgcheight += 0.4
        this.firstheight += 0.4
        // 轨迹线先显示出来
        if (this.bgcheight > 15) {
          this.secendBool = true
          this.dialogueFirstBto = true
        }
        if (this.bgcheight > 30) {
          this.firstBool = false
          window.clearInterval(timer)
          // 显示第一步文言
          this.dialogueFirst = true
          // 停顿片刻继续跑
          setTimeout(() => {
            this.secendBool = false
            this.dialogueFirst = false
            this.secendRunMed()
          }, 2000)
        }
      }, 10)
    },
    secendRunMed() {
      var timer = setInterval(() => {
        this.bgcheight += 0.4
        // 轨迹线先显示出来
        if (this.bgcheight > 45) {
          this.secendBool = true
          this.dialogueSecondBto = true
        }
        if (this.bgcheight > 60) {
          window.clearInterval(timer)
          // 显示第二步的文言
          this.dialogueSecond = true
          // 停顿片刻继续跑
          setTimeout(() => {
            this.secendBool = false
            this.dialogueSecond = false
            this.thirdRunMed()
          }, 2000)
        }
      }, 10)
    },
    /**
     * 第三步
     */
    thirdRunMed() {
      var timer = setInterval(() => {
        this.bgcheight += 0.4
        // 轨迹线先显示出来
        if (this.bgcheight > 75) {
          this.secendBool = true
          this.dialogueThirdBto = true
        }
        if (this.bgcheight > 90) {
          window.clearInterval(timer)
          // 显示第二步的文言
          this.dialogueThird = true
          // 停顿片刻继续跑
          setTimeout(() => {
            this.secendBool = false
            this.dialogueThird = false
            this.lastRunMed()
          }, 2000)
        }
      }, 10)
    },
    /**
     * 最后一步
     */
    lastRunMed() {
      var totalHeight = this.pageHeight
      var timer = setInterval(() => {
        this.carbtoheight += 0.5
        // 隐藏背景
        this.hideBgcbool = false
        if (!this.isEmitBool) {
          this.isEmitBool = true
          this.$emit('loadingMed', true)
        }
        if (this.carbtoheight >= (this.pageHeight + 3.54)) {
          window.clearInterval(timer)
          // 隐藏小车
          this.carBool = false
        }
      }, 10)
    }
  }
}
</script>
<style lang="less" scoped>
.loading-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.loadingbgc {
  width: 100%;
  height: 150rem;
  background: url(../assets/images/loading/loadingbgc.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0;
}
.infobox {
  width: 100%;
  position: fixed;
  bottom: 23.82rem;
  left: 0;
  .carbgc {
    position: relative;
    text-align: center;
    .car-icon {
      width: 2.07rem;
      height: 3.54rem;
      position: absolute;
      margin-left: 50%;
      left: -1.035rem;
      bottom: 0;
    }
    .otherinfo {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: auto;
      text-align: center;
      .logo-progress {
        position: relative;
        bottom: -1.714rem;
        .progressbox {
          height: 5rem;
          position: absolute;
          bottom: -5rem;
          text-align: center;
          width: 100%;
          .progressbar {
            height: 0.82rem;
            width: 6.71rem;
            border: 0.11rem solid #fff;
            margin: 1rem auto 0;
            background: linear-gradient(90deg, #7c43e7 0%, #2cead7 100%);
            .current-bgc {
              float: right;
              height: 100%;
              background-color: #fff;
            }
          }
          .current-status {
            text-align: center;
            font-size: 1rem;
            color: #fff;
            font-weight: bold;
            line-height: 1.8;
          }
        }
      }
      .logodown {
        bottom: -1.2rem;
      }
      .btologo {
        width: 7rem;
      }
      .dialogue-box {
        width: 100%;
        .dialogue-item {
          width: 100%;
          text-align: center;
          .dialogue-img {
            height: 5.76rem;
            position: relative;
            bottom: 5rem;
          }
          .dialogue-speed {
            width: 9.944rem;
            position: absolute;
            bottom: -13rem;
            margin-left: 50%;
            left: -4.972rem;
          }
        }
      }
    }
  }
}
@-webkit-keyframes fadeOut {
  0% {
    opacity: 1; /*初始状态 透明度为1*/
  }
  50% {
    opacity: 0.5; /*中间状态 透明度为0*/
  }
  100% {
    opacity: 0; /*结尾状态 透明度为0*/
  }
}
.fadein {
  animation: animate_in 0.5s;
}
.fadeout {
  animation: animate_out 1s;
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

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0; /*初始状态 透明度为1*/
  }
  50% {
    opacity: 0.5; /*中间状态 透明度为0*/
  }
  100% {
    opacity: 1; /*结尾状态 透明度为0*/
  }
}
.dialoguebgc {
  -webkit-animation-name: fadeIn; /*动画名称*/
  -webkit-animation-duration: 2s; /*动画持续时间*/
  -webkit-animation-iteration-count: 1; /*动画次数*/
  -webkit-animation-delay: 0s; /*延迟时间*/
}
</style>


