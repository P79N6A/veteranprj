<template>
  <div class="agreebox">
    <div class="mainbox">
      <div class="title">
        “谁是老司机”首届互联网汽车驾驶行为大比拼用户协议
        <div class="closebox" @click="reviceMed(false)">
          <img src="../assets/images/close.png" alt="" />
        </div>
      </div>
      <div class="main">
        <!-- 隐私指引 -->
        <div class="listbox">
          <div class="list-title">隐私指引</div>
          <div class="list-dte">
            1.
            斑马网络技术有限公司（以下简称“斑马”）是本次“谁是老司机”首届互联网汽车驾驶行为大比拼（以下简称“活动”）的组织者。
          </div>
          <div class="list-dte fontbold">
            2.
            在报名参加本次活动之前,请务必仔细阅读并同意本条款及活动规则。如有异议,请勿报名参加本次活动。报名参加本活动，即视为您同意本协议。
          </div>
          <div class="list-dte">
            3.
            参与本次活动不收取任何费用（但不包括报名时所产生的网络数据供应商收费），原则上每个人只拥有一次参与机会
          </div>
          <div class="list-dte">
            4.
            如果斑马发现或收到他人举报或投诉参与者违反活动规则的，斑马有权对违规参与者处以取消参赛资格的处罚。
          </div>
        </div>
        <!-- 隐私指引 -->
        <div class="listbox">
          <div class="list-title">隐私指引</div>
          <div class="list-dte fontbold">
            1.
            为生成您的得分，并据此排名，斑马使用您本次活动期间及报名日前15天的驾驶行为数据（包括：急刹车、急减速、急加速、刹车、油门、方向盘数据）、地图导航数据（红绿灯、道路拥堵数据等）、应用使用数据（斑马智行系统中智慧加油、智慧停车等应用的使用数据）。如斑马将上述数据用于其他用途，将会另行获得您的同意。
          </div>
          <div class="list-dte fontbold">
            2.
            若您在5月27日或以后对车机端的隐私屏蔽开关进行操作，可能会影响数据与得分的准确性。
          </div>
          <div class="list-dte fontbold">
            3.
            因技术限制性，驾驶行为得分仅根据“现有的”的数据生成并提供，仅供参考，斑马并不保证准确性。
          </div>
          <div class="list-dte fontbold">
            4.
            斑马会严格遵守与数据保护相关的法律法规和《斑马智行用户隐私政策》。
          </div>
          <div class="list-dte fontbold">
            5.
            驾驶行为数据得分涉及参与者的个人隐私，参与者应当妥善保管您的手机号及验证码，切勿向任何人泄漏。
          </div>
        </div>
        <!-- 奖品 -->
        <div class="listbox">
          <div class="list-title">奖品</div>
          <div class="list-dte">1. 各奖项奖品设置见活动规则。</div>
          <div class="list-dte fontbold">
            2.
            奖品的各项细节由斑马拥有全权决定权，斑马不会接受相关的协商。活动中属于彩蛋部分的奖品，由各第三方商家提供并选择，与彩蛋活动相关的奖品请与第三方商家联系。联系方式请见活动规则。
          </div>
          <div class="list-dte">
            3.
            斑马保留随时以另一件同样价值，或更高价值的物品，替代原奖品的权利。
          </div>
          <div class="list-dte">
            4.
            斑马会严格遵守与数据保护相关的法律法规和《斑马智行用户隐私政策》。
          </div>
          <div class="list-dte">4. 获奖资格不可转让，亦不可折现。</div>
        </div>
        <!-- 获奖者 -->
        <div class="listbox">
          <div class="list-title">获奖者</div>
          <div class="list-dte">1. 获奖者数量、获奖概率见活动规则。</div>
          <div class="list-dte">
            2.
            只有获奖者才会收到来自组织者的通知，组织者将在产生结果之后尽快通知获奖者，并安排奖品领取。
          </div>
          <div class="list-dte">
            3. 斑马与本次活动相关的工作人员有权利获悉获奖者的姓名及联系方式。
          </div>
          <div class="list-dte">
            4. 如在一周内获奖者不能够或不愿意接受奖品，获奖资格将被取消。
          </div>
          <div class="list-dte">
            5.
            获奖者将会在活动截止时间后一周由斑马公开，斑马将对公开的信息进行处理以保障您的隐私。
          </div>
        </div>
      </div>
      <div class="revicebtn" @click="reviceMed(true)">接受</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    /**
     * 接受用户协议
     */
    reviceMed(bool) {
      this.$emit('reviceBool', bool)
    }
  }
}
</script>

<style lang="less" scoped>
.agreebox {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(83, 183, 164, 0.7);
  top: 0;
  left: 0;
  .mainbox {
    position: fixed;
    width: 19rem;
    padding: 0.68rem;
    padding-right: 1.67rem;
    padding-bottom: 0;
    box-sizing: border-box;
    left: 50%;
    top: 50%;
    text-align: center;
    background: #e4f8f0;
    transform: translate(-50%, -50%);
    color: #028e82;
    border-radius: 0.54rem;
    .title {
      position: relative;
      color: #0a997e;
      font-size: 0.96rem;
      font-weight: bold;
      padding: 0.5rem 2rem 1rem;
      .closebox {
        position: absolute;
        width: 1.21rem;
        height: 1.21rem;
        right: 0;
        top: 0.25rem;
        line-height: 1;
        img {
          width: 100%;
        }
      }
    }
  }
  .main {
    font-size: 0.75rem;
    max-height: 23rem;
    overflow: scroll;
    overflow-x: hidden;
    padding: 0 0.4rem;
    text-align: justify;
    .maintitle {
      text-align: center;
    }
    .listbox {
      margin-bottom: 1.07rem;
      .list-title {
        font-weight: bold;
      }
      .list-dte {
        font-size: 0.75rem;
      }
      .fontbold {
        font-weight: bold;
      }
    }
  }
  .main::-webkit-scrollbar-thumb {
    width: 0.4rem;
    background: #028e82;
  }
  .main::-webkit-scrollbar {
    width: 0.2rem;
    background: #dedede;
  }
  .revicebtn {
    width: 9.71rem;
    height: 2.32rem;
    background-color: #0a997e;
    color: #fff;
    line-height: 2.32rem;
    border-radius: 0.36rem;
    font-size: 1.07rem;
    margin: 1.14rem auto;
  }
}
</style>

