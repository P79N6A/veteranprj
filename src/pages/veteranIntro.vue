<template>
  <div class="wrapper">
    <img src="../assets/images/veteranintro.png" alt="veteran introduction" />
    <div class="clickarea" @click="linkMed"></div>
    <!-- 弹框区域 -->
    <div class="maskbox" v-if="showContent" :class="showContent ? 'fadein' : 'fadeout'">
      <!-- 内容区域 -->
      <div class="content">
        <div class="top-closebox">
          <span @click="closeMed"><img src="../assets/images/close.png" alt=""></span>
        </div>
        <div class="detail">
          您将前往第三方页面，<br />
          该页面并非斑马设计、运营，与斑马无关，是否前往？
        </div>
        <div class="surebtn" @click="sureMed">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showContent: false
    }
  },
  methods: {
    /**
     * 关闭弹窗
     */
    closeMed () {
      this.showContent = false
    },
    /**
     * 确认前往页面
     */
    sureMed () {
      this.showContent = false
      window.location.href = "http://h5.aitouch.com/h5/a/#/older-index"
    },
    /**
     * 跳转到第三方网站,点击弹窗
     */
    linkMed() {
      // 游客用户页_0元赢取点击
      window._baq.push(['_trackEvent', 'driver_visitor_0yuanclick', {}])
      // 百度统计
      window._hmt.push(['_trackEvent', 'driver_visitor_0yuanclick', 'click', ''])
      this.showContent = true
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: auto;
    user-select: none;
  }
  .clickarea {
    width: 64.8%;
    height: 2.86rem;
    left: 17.6%;
    background-color: rgba(255, 255, 255, 0);
    position: absolute;
    bottom: 8.86rem;
  }
  // 弹窗区域
  .maskbox {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: rgba(83, 183, 164, 0.7);
    .content {
      position: fixed;
      width: 19rem;
      padding: 0.4rem 0.4rem 1.07rem;
      box-sizing: border-box;
      left: 50%;
      top: 50%;
      text-align: center;
      background: #e4f8f0;
      transform: translate(-50%, -50%);
      color: #028e82;
      border-radius: 0.54rem;
      .top-closebox {
        width: 100%;
        height: 1.2rem;
        text-align: right;
        span {
          height: 1.2rem;
          width: 1.2rem;
          vertical-align: top;
        }
        img {
          height: 1.2rem;
          width: 1.2rem;
          vertical-align: top;
        }
      }
      .detail {
        font-size: 0.75rem;
        width: 90%;
        margin: 1.07rem auto 1.46rem;
      }
      .surebtn {
        width: 8.54rem;
        height: 1.86rem;
        background-color: #0a997e;
        font-size: 0.89rem;
        color: #fff;
        text-align: center;
        line-height: 1.86rem;
        font-weight: bold;
        border-radius: 0.357rem;
        margin: 0 auto;
        user-select: none;
      }
    }
  }
}
.fadein {
  animation: animate_in 0.25s;
}
.fadeout {
  animation: animate_out 0.25s;
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
</style>

