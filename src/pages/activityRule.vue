<template>
  <div class="mainwrapper">
    <div class="midcontent">
      <div class="home">
        <img src="../assets/images/strategy.jpg" alt="">
        <div class="ruleDiv" v-if="false">
          <div class="rule-title">
            <div class="activityRuleImg">
              <img src="../assets/images/activityRule.png" alt="" />
            </div>
            <span>活动攻略</span>
          </div>
          <div class="rule-content">{{ ruleText }}</div>
        </div>
      </div>
    </div>
    <my-footer active="2"></my-footer>
  </div>
</template>
<script>
import myFooter from '@/components/footer'
export default {
  name: 'activityRule',
  data() {
    return {
    }
  },
  mounted() {
    // 攻略页_页面展现
    window._baq.push(['_trackEvent', 'driver_strategy_pv', {}])
    // 百度统计
    window._hmt.push(['_trackEvent', 'driver_strategy_pv', 'pv', ''])
  },
  methods: {},
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

.home {
  color: $color;
  width: 100%;
  height: auto;
  padding-bottom: 3.36rem;
}
</style>
