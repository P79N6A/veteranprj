<template>
  <div class="toastbox" v-if="showWrap" :class="showContent ? 'fadein' : 'fadeout'">
    <div
      class="wrap"
      v-if="showWrap"
      :class="showContent ? 'fadein' : 'fadeout'"
    >
      {{ text }}
      <div class="closebox" @click="closeMed"><img src="./images/close.png" alt=""></div>
    </div>
  </div>
</template>

<style scoped>
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
  width: 2rem;
  text-align: center;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
}
.closebox img {
  width: 1.18rem;
  height: 1.18rem;
  vertical-align: middle;
}
.wrap {
  position: fixed;
  width: 19rem;
  padding: 1.46rem 2.64rem;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  text-align: center;
  background: #e4f8f0;
  transform: translate(-50%, -50%);
  color: #028e82;
  border-radius: 0.54rem;;
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