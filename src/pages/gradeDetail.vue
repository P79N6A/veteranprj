<template>
  <div class="mainwrapper">
    <div class="midcontent">
      <div class="home">
        <div class="topBlock">
          <div class="title">
            <div class="title_img">
              <img src="../assets/images/gradeDetail.png" alt="" />
            </div>
            <span>得分详情</span>
          </div>
          <div class="driverInfo">
            <div class="portrait">
              <img :src="imgUrlArr[avatar]" alt="" />
            </div>
            <div class="driverInfoRight">
              <div
                class="driverInfoLine"
                style="border-bottom:1px solid rgba(2, 142, 130,.2);
          padding-bottom:.6rem;margin-bottom:.4rem;margin-top:.4rem;"
              >
                <div class="driverInfoItem1">
                  <div class="icon_name">
                    <img src="../assets/images/icon_name.png" alt="" />
                  </div>
                  <div class="div_name">{{ driverId||'-' }}</div>
                </div>
              </div>
              <div class="driverInfoLine">
                <div class="driverInfoItem1">
                  <div class="icon_grade">
                    <img src="../assets/images/icon_grade.png" alt="" />
                  </div>
                  <div class="div_grade">
                    <span>综合得分{{ driverGrade||'-' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="explain1">6月19日将公布获奖名单，敬请期待哦！</p>
        <p class="dataError" v-if="dataIsError||(infoLists.length==0)">抱歉，未查询到数据...</p>
        <div class="infoList" v-if="!dataIsError">
          <ul class="infoListUl">
            <li v-for="(item, index) in infoLists" :key="index">
              <div class="infoItem-title">
                <span class="item-time">{{
                  item.pt.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3')
                }}</span>
                <span>当日得分</span>
                <span class="item-grade">{{ item.dayScore }}</span>
              </div>
              <ul class="infoItem-ul">
                <li>
                  <label>操控：</label>
                  <span>{{ item.controlScore }}</span>
                </li>
                <li>
                  <label>智慧：</label>
                  <span>{{ item.wisdomScore }}</span>
                </li>
                <li>
                  <label>安全：</label>
                  <span>{{ item.safeScore }}</span>
                </li>
                <li>
                  <label>节能：</label>
                  <span>{{ item.fuelElcScore }}</span>
                </li>
                <li>
                  <label>挑战：</label>
                  <span>{{ item.challengeScore }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
import { mapState } from 'vuex'
import myFooter from '@/components/footer'
export default {
  name: 'gradeDetail',
  data() {
    return {
      avatar: 0,
      driverId: '',
      driverGrade: '',
      infoLists: [],
      dataIsError: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    let token = this.userInfo.token
    let param = {
      banmaId: 7,
      campId: '1',
      token: token
    }
    let api = 'getDriverDetail'
    this.$fetchData.fetchVeteranGet(param, api, 'activityRegisterReqDto').then(
      res => {
        Indicator.close()
        if (res.data.err_resp) {
          this.$toast(res.data.err_resp.msg)
          this.dataIsError = true
          return
        } else {
          if (
            res &&
            res.data &&
            res.data.data &&
            res.data.data.driverBehaviorDailyList
          ) {
            this.infoLists = res.data.data.driverBehaviorDailyList
            if (this.infoLists.length&&(this.infoLists.length > 0)) {
              this.infoLists = this.infoLists.reverse()
            }
          }
          this.avatar = res.data.data.avatar
          this.driverId = res.data.data.nickname
          this.driverGrade = res.data.data.dayScore
        }
      },
      error => {
        console.log(error)
      }
    )
  },
  mounted() {
    // 正在加载
    Indicator.open()
    // 得分详情页_页面展现PV
    window._baq.push(['_trackEvent', 'driver_detail_pv', {}])
    // 百度统计
    window._hmt.push(['_trackEvent', 'driver_detail_pv', 'pv', ''])
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
.midcontent{
  background: url('../assets/images/bg.png') no-repeat 0 center;
  background-size: 100% 100%;
}
.home {
  width: 100%;
  height: auto;
  

  .topBlock {
    width: 100%;
    height: 16rem;
    background: url('../assets/images/bg_top.png') no-repeat 0 bottom;
    background-size: 100% 100%;
    color: $color;
    overflow: auto;
    .title {
      overflow: hidden;
      margin: 4rem 0 2.39rem 3.43rem;
      .title_img {
        width: 1.56rem;
        margin-right: 0.5rem;
        float: left;
      }
      & > span {
        font-size: 1.56rem;
      }
    }

    .driverInfo {
      width: 100%;
      overflow: hidden;
      .driverInfoRight {
        float: left;
        margin-left: 2rem;
        font-size: 1.1rem;
        .driverInfoLine {
          width: 100%;
          overflow: auto;
          & * {
            float: left;
          }
          .driverInfoItem1 {
            width: 11.25rem;
          }
        }
      }
    }
    .portrait {
      width: 5.3rem;
      height: 5.3rem;
      float: left;
      margin-left: 3.43rem;
      background: $color;
    }

    .icon_name {
      width: 1.36rem;
    }
    .icon_grade {
      width: 1.64rem;
    }
    .div_name {
      margin: 0.3rem 0 0 0.6rem;
      max-width: 9rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .div_grade {
      margin: 0.3rem 0 0 0.4rem;
    }
  }
  .explain1,
  .dataError {
    width: 18rem;
    margin: 1.64rem auto 1rem auto;
    text-align: center;
    font-size: 0.75rem;
    color: $color;
    opacity: 0.85;
  }
  .dataError {
    color: #333;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-style: italic;
    font-size: 0.75rem;
  }
  .infoList {
    width: 21.43rem;
    overflow: auto;
    margin: 0 auto;
    padding-bottom: 5.06rem;
    .infoListUl > li {
      width: 100%;
      min-height: 7.5rem;
      margin-bottom: 1.18rem;
      background: $footerColor;
      padding: 0.75rem 0.6rem;
      box-sizing: border-box;
      color: $color;
      .infoItem-title {
        width: 100%;
        height: 1.5rem;
        border-bottom: 1px solid $color;
        .item-time {
          width: 10.5rem;
          padding-left: 1rem;
          box-sizing: border-box;
          display: inline-block;
        }
      }
      .infoItem-ul {
        padding: 0.5rem 1rem;
        box-sizing: border-box;
        font-size: 0.85rem;
        overflow: hidden;
        & > li {
          float: left;
          margin-bottom: 0.4rem;
          & > label {
          }
          &:nth-child(odd) {
            width: 55%;
          }
          &:nth-child(even) {
            width: 45%;
          }
        }
      }
    }
    &::-webkit-scrollbar {
      //隐藏滚动条
      display: none;
    }
  }
}
</style>
