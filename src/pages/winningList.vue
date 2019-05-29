<template>
  <div class="mainwrapper">
    <div class="midcontent">
      <div
        class="wrapper winning-wrapper"
        :style="{ 'min-height': $minpageHeight + 'px' }"
      >
        <div class="win-title-box">
          <div class="title-left">
            <img src="../assets/images/row.png" class="title-image" />
            <span class="title-content">获奖名单</span>
          </div>
          <div class="title-right" @click="back">
            <div class="title-backBtn">返回</div>
          </div>
        </div>

        <div class="win-content">
          <div class="win-content-in">
            <div class="table-header">
              <div class="table-header-title">全能奖</div>
              <div class="table-header-desc"></div>
            </div>
            <div class="thead">
              <div class="rank flex-thead">排名</div>
              <div class="nickname flex-thead">昵称</div>
              <div class="point flex-thead">最终得分</div>
              <div class="time flex-thead">报名时间</div>
            </div>
            <div class="tbody">
              <div
                class="tbody-tr"
                :class="{ border: index == omnipotentAward.length - 1 }"
                v-for="(item, index) in omnipotentAward"
                :key="index"
              >
                <div class="tbody-td">{{ item.dayRank || '-' }}</div>
                <div class="tbody-td">{{ item.nickname | getSubStr }}</div>
                <div class="tbody-td">{{ item.dayScore || '-' }}</div>
                <div class="tbody-td">{{ item.time || '-' }}</div>
              </div>
            </div>
            <div class="all-desc">*若分数相同按报名先后顺序</div>
          </div>

          <div class="win-content-in marT">
            <div class="table-header">
              <div class="table-header-title">集体奖</div>
              <div class="table-header-desc"></div>
            </div>
            <div class="thead">
              <div class="city flex-thead2">城市</div>
              <div class="average-score flex-thead2">平均分数</div>
            </div>
            <div class="tbody tbody2">
              <div class="city-name">{{ (collectiveAwards.city?(collectiveAwards.city).split('#')[1]:collectiveAwards.city) || '-' }}</div>
              <div class="average-point">
                {{ collectiveAwards.dayScore || '-' }}分
              </div>
            </div>
          </div>

          <div class="win-content-in marT">
            <div class="table-header">
              <div class="table-header-title">幸运奖</div>
              <div class="table-header-desc"></div>
            </div>
            <div class="thead">
              <div class="rank flex-thead">排名</div>
              <div class="nickname flex-thead">昵称</div>
              <div class="point flex-thead">最终得分</div>
              <div class="time flex-thead">报名时间</div>
            </div>
            <div class="tbody">
              <div
                class="tbody-tr"
                :class="{ border: index == luckyAward.length - 1 }"
                v-for="(item, index) in luckyAward"
                :key="index"
              >
                <div class="tbody-td">{{ item.dayRank || '-' }}</div>
                <div class="tbody-td">{{ item.nickname | getSubStr }}</div>
                <div class="tbody-td">{{ item.dayScore || '-' }}</div>
                <div class="tbody-td">{{ item.time || '-' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer active="4" navStatus="award"></my-footer>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { mapState } from 'vuex'
import MyFooter from '@/components/footer'
export default {
  data() {
    return {
      omnipotentAward: [],
      collectiveAwards: {},
      luckyAward: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this.defaultData()
  },
  filters: {
    getSubStr(str) {
      if (str && str.length > 6) {
        let subStr1 = str.substr(0, 3)
        let subStr2 = str.substr(str.length - 3, 3)
        let subStr = subStr1 + '...' + subStr2
        return subStr
      } else if (str && str.length <= 6) {
        return str
      } else {
        return '-'
      }
    }
  },
  mounted() {
    // 打开加载框
    Indicator.open()
    this.defaultMed()
  },
  methods: {
    /**
     * 默认加载
     */
    defaultMed() {
      // 攻略页_页面展现
      window._baq.push(['_trackEvent', 'driver_awardlist_pv', {}])
      // 百度统计
      window._hmt.push(['_trackEvent', 'driver_awardlist_pv', 'pv', ''])
    },
    defaultData() {
      let api = 'getWinner'
      let token = this.userInfo.token
      let param = {
        campId: '1',
        token
      }
      this.$fetchData
        .fetchVeteranGet(param, api, 'getWinnerReqDto')
        .then(res => {
          if (res && (res.data && res.data.data)) {
            this.omnipotentAward = res.data.data.vinRankPrizeList
            this.collectiveAwards = res.data.data.cityRankPrize
            this.luckyAward = res.data.data.vinLuckyPrizeList
            Indicator.close()
          } else {
            Indicator.close()
            if (res && (res.data && res.data.err_resp)) {
              this.$toast(res.data.err_resp.desc, 3000)
            }
          }
        }).catch(err => {
          Indicator.close()
        })
    },
    back() {
      this.$router.push({
        path: '/winAward'
      })
    }
  },
  components: {
    MyFooter
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
.winning-wrapper {
  .size(100%, 100%);
  background: url('../assets/images/bg.png') no-repeat 0 center;
  background-size: 100% 100%;
  overflow: hidden;
  .win-title-box {
    padding: 3rem 3rem 1rem 3rem;
    display: flex;
    overflow: hidden;
    .title-left {
      flex: 1;
      margin: auto 0;
      .title-image {
        .size(2rem, 2rem);
        vertical-align: middle;
      }
      .title-content {
        font-size: 2rem;
        font-weight: bold;
        color: @darker;
        vertical-align: middle;
      }
    }
    .title-right {
      width: 3rem;
      margin: auto 0;
      .title-backBtn {
        .size(3rem, 1.3rem);
        line-height: 1.45rem;
        color: @white;
        background: @darker;
        font-size: 0.75rem;
        text-align: center;
        border-radius: 0.4rem;
      }
    }
  }
  .win-content {
    // padding-bottom: 4rem;
    height: calc(100% - 11rem);
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .win-content-in {
      padding: 0 2.3rem;
      overflow: hidden;
      .table-header {
        padding-left: 1rem;
        padding-right: 1.5rem;
        font-size: 0.85rem;
        color: @darker;
        font-weight: 600;
        .table-header-title {
          float: left;
        }
        .table-header-desc {
          float: right;
        }
      }
      .thead {
        display: flex;
        .size(100%, 1.4rem);
        background-image: linear-gradient(-90deg, #7856e5 0%, #43e3fb 100%);
        line-height: 1.45rem;
        color: @white;
        font-size: 0.8rem;
        .flex-thead {
          flex: 1;
          text-align: center;
        }
        .flex-thead2 {
          flex: 1;
        }
        .city {
          padding-left: 2rem;
        }
        .average-score {
          text-align: right;
          padding-right: 1.8rem;
        }
      }
      .tbody {
        border-style: solid;
        border-width: 1px;
        border-image-source: linear-gradient(-90deg, #7168e8 0%, #4ad0f8 100%);
        border-image-slice: 1;
        margin-top: 0.2rem;
        padding: 0 0.5rem;
        color: @darker;
        &.tbody2 {
          display: flex;
          .city-name {
            flex: 1;
            padding-left: 1.5rem;
          }
          .average-point {
            flex: 1;
            padding-right: 1.5rem;
            text-align: right;
          }
        }
        .tbody-tr {
          display: flex;
          padding: 0.3rem 0;
          border-bottom: 1px solid #4ad0f8;
          &.border {
            border: 0;
          }
          .tbody-td {
            flex: 1;
            text-align: center;
            margin: auto;
          }
        }
      }
      .all-desc {
        font-size: 0.75rem;
        color: @darker;
        margin-top: 0.2rem;
      }
    }
    .marT {
      margin-top: 1.5rem;
    }
  }
}
</style>


