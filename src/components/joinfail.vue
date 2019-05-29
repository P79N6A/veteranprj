<template>
  <div
    class="toastbox"
    v-if="showWrap"
    :class="showContent ? 'fadein' : 'fadeout'"
  >
    <div
      class="wrap"
      v-if="showWrap"
      :class="showContent ? 'fadein' : 'fadeout'"
    >
      <div class="closebox" @click="closeMed">
        <img src="../assets/images/close.png" alt="" />
      </div>
      <div class="content">
        <div class="left"><img src="../assets/images/fail_icon.png" alt="" /></div>
        <div class="right">
          您还不是荣威、名爵、大通的斑马智行用户，或未绑定车辆，本次活动无法参与。您可前往了解互联网汽车，并参与活动抽奖哦！
          <!-- 未查询到您绑定的车辆，<br />
          本次活动无法参与。<br />
          您可前往了解互联网汽车，<br />
          并参与活动抽奖哦！ -->
        </div>
      </div>
      <!-- 按钮 -->
      <div class="link-btn" @click="linkIntroMed">立即前往</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showContent: true,
      showWrap: true
    }
  },
  methods: {
    closeMed () {
      this.$emit('closejoinfail', false)
    },
    linkIntroMed () {
      // 前往介绍页
      this.$router.push({
        path: '/veteranintro'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.toastbox {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(83, 183, 164, 0.7);
  top: 0;
  left: 0;
  z-index: 9999;
}
.closebox {
  width: 100%;
  text-align: center;
  height: 100%;
  align-items: center;
  text-align: right;
  margin-bottom: 0.5rem;
}
.closebox img {
  width: 1.18rem;
  height: 1.18rem;
  vertical-align: middle;
}
.wrap {
  position: fixed;
  width: 19rem;
  box-sizing: border-box;
  padding: 0.39rem 0.39rem 1.07rem;
  left: 50%;
  top: 50%;
  text-align: center;
  background: #e4f8f0;
  transform: translate(-50%, -50%);
  color: #028e82;
  border-radius: 0.54rem;
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      width: 3.46rem;
      margin-right: 0.68rem;
      img {
        width: 3.46rem;
      }
    }
    .right {
      font-size: 0.75rem;
      font-weight: bold;
      line-height: 0.96rem;
      width: 10.5rem;
      text-align: left;
    }
  }
  .link-btn {
    width: 8.54rem;
    height: 1.86rem;
    font-size: 0.89rem;
    color: #fff;
    text-align: center;
    line-height: 1.86rem;
    user-select: none;
    background-color: #028e82;
    border-radius: 0.35rem;
    margin: 1.5rem auto 0;
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

