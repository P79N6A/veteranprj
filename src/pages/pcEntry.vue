<template>
  <div class="pcEntry">
    <div class="qrcode">
      <img :src="imgUrl" alt="扫描二维码" />
    </div>
    <!-- <p style="margin-top:10px;">2019/05/29~2019/06/18</p>
    <p>扫描二维码</p>
    <p>参与驾驶行为大比拼</p> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: require('../assets/images/linkqrcode.png')
    }
  }
}
</script>
<style lang="scss" scoped>
.pcEntry {
  height: 100%;
  min-height: 800px;
  background: url('../assets/images/pc_bg.png') no-repeat;
  background-size: 100% 100%;
  text-align: center;
  .qrcode {
    width: 180px;
    height: 180px;
    border: 10px solid #fff;
    background: #53854d;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    font-size: 21px;
    color: #efefef;
  }
}
@media screen and (max-width:1366px){
  .qrcode {
    margin-top: 26%;
  }
}
@media screen and (min-width:1367px){
  .qrcode {
    margin-top: 24%;
  }
}
</style>


