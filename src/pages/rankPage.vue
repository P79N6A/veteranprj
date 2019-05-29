<template>
  <div class="mainwrapper">
    <div class="midcontent">
      <div class="home">
        <div class="title">
          <div class="icon_bar">
            <img src="../assets/images/icon_bar.png" alt="" />
          </div>
          <span>排行榜</span>
          <router-link v-if="isbackShow" tag="div" class="backTo" to="/winAward">返回</router-link>
        </div>
        <div class="content">
          <p class="title">个人排行榜</p>
          <div class="normal" v-if="vinList.length">
            <div class="thead">
              <div class="tr">
                <div class="td" style="width: 30%;">排名</div>
                <div class="td nick">昵称</div>
                <div class="td" style="width: 33%;">综合得分</div>
              </div>
            </div>
            <div class="tbody">
              <div
                class="tr"
                v-for="(item_tr, index_tr) in vinList.slice(0, 5)"
                :key="index_tr"
              >
                <div class="td" style="width: 27%;">
                  第{{ item_tr.dayRank || '-' }}名
                </div>
                <div class="td nick">{{ item_tr.dim || '-' }}</div>
                <div class="td" style="width: 33%;">
                  {{ item_tr.dayScore || '-' }}分
                </div>
              </div>
              <!-- <div class="tr" v-for="(item_tr,index_tr) in table_person" :key="index_tr+10">
                    <div class="td" style="width: 27%;"><div class="td_first">第{{item_tr.order}}名</div></div>
                    <div class="td nick">{{item_tr.name}}</div>
                    <div class="td" style="width: 33%;">{{item_tr.grade}}分</div>
                </div> -->
              <div class="tr" v-if="vinList.length > 5">
                <div class="td lue" style="width: 27%;">····</div>
              </div>

              <div class="tr">
                <div class="td" style="width: 27%;">
                  第{{ vinList[5].dayRank || '-' }}名
                </div>
                <div class="td nick">{{ vinList[5].dim || '-' }}</div>
                <div class="td" style="width: 33%;">
                  {{ vinList[5].dayScore || '-' }}分
                </div>
              </div>

              <div class="tr" v-if="vinList.length >= 50">
                <div class="td" style="width: 27%;">
                  第{{ vinList[49].dayRank || '-' }}名
                </div>
                <div class="td nick">{{ vinList[0].dim }}</div>
                <div class="td" style="width: 33%;">
                  {{ vinList[49].dayScore || '-' }}分
                </div>
              </div>
              <div class="tr tr_head2">
                <div class="border"></div>
                <div class="tr-text">具备获奖资格的前100名将赢得奖品哦</div>
                <div class="border"></div>
              </div>
              <div class="tr tr_head">
                <div class="td" style="width: 30%;">
                  第{{ myRank || '-' }}名
                </div>
                <div class="td nick">我</div>
                <div class="td" style="width: 33%;">{{ myScore || '-' }}分</div>
              </div>
            </div>
          </div>
          <div class="faildata" v-if="!vinList.length">
            未查询到数据...
          </div>
          <p class="remind">*若分数相同，按报名先后顺序。</p>
          <p class="title">城市排行榜</p>
          <div class="normal" v-if="cityList.length">
            <div class="thead">
              <div class="tr">
                <div class="td" style="width: 30%;">排名</div>
                <div class="td nick">城市</div>
                <div class="td" style="width: 33%">综合得分</div>
              </div>
            </div>
            <div class="tbody">
              <div
                class="tr"
                v-for="(item_tr, index_tr) in cityList"
                :key="index_tr"
              >
                <div class="td" style="width: 30%;">
                  第{{ item_tr.dayRank || '-' }}名
                </div>
                <div class="td nick text-ellipsis">{{ item_tr.dim?(item_tr.dim).split('#')[1]:item_tr.dim || '-' }}</div>
                <div class="td" style="width: 33%;">
                  {{ item_tr.dayScore || '-' }}分
                </div>
              </div>

              <div class="tr tr_head tr_mar">
                <div class="td" style="width: 30%;">
                  第{{ myCityRank || '-' }}名
                </div>
                <div class="td nick text-ellipsis">{{ myCity?(myCity).split('#')[1]:myCity || '-' }}</div>
                <div class="td" style="width: 33%;">
                  {{ myCityScore || '-' }}分
                </div>
              </div>
            </div>
          </div>
          <div class="faildata" v-if="!cityList.length">
            未查询到数据...
          </div>
          <p class="title">男女战斗力大比拼</p>
          <!--  @click="shareAppMessage" -->
          <div class="vsBlock" v-if="genderList.length">
            <div class="icon_head icon_head_man">
              <img src="../assets/images/icon_man.png" alt="" />
            </div>
            <div class="vsInfo">
              <div class="vsInfoText">
                <span>综合得分：{{ genderList[0].dayScore || '-' }}</span>
                <span style="float:right"
                  >综合得分：{{ genderList[1].dayScore || '-' }}</span
                >
              </div>
              <div class="vsLine">
                <div class="vsLineMan" :style="'width:' + vs1"></div>
                <div class="vsLineWoman" :style="'width:' + vs2"></div>
                <div class="icon_vs" :style="'left:' + vs1">
                  <img src="../assets/images/icon_vs.png" alt="" />
                </div>
              </div>
            </div>
            <div class="icon_head icon_head_woman">
              <img src="../assets/images/icon_women.png" alt="" />
            </div>
          </div>
          <div class="faildata" v-if="!genderList.length">
            未查询到数据...
          </div>
          <p class="title">各年龄段老司机实力总览</p>
          <!--  @click="shareTimeline" -->
          <div class="yearsBlock" v-if="ageList.length">
            <ul>
              <li v-for="(item, index) in ageList" :key="index">
                <span class="years">{{ item.dim || '-' }}</span>
                <div class="lineBg">
                  <div
                    class="line"
                    :style="{ width: (item.dayScore / ageTotal) * 100 + '%' }"
                  ></div>
                </div>
                <span class="grade">综合得分：{{ item.dayScore || '-' }}</span>
              </li>
            </ul>
          </div>
          <div class="faildata" v-if="!ageList.length">
            未查询到数据...
          </div>
        </div>
      </div>
    </div>
    <my-footer active="3"></my-footer>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { mapState } from 'vuex'
import myFooter from '@/components/footer'
export default {
  name: 'rankPage',
  data() {
    return {
      vinList: [],
      cityList: [],
      genderList: [],
      ageList: [],
      myCity: '',
      myCityRank: '',
      myCityScore: '',
      myRank: '',
      myScore: '',
      isDialog: 0
    }
  },
  computed: {
    ...mapState([
      'userStatus'
    ]),
    isbackShow() {
      if(this.userStatus.campEndFlag && !this.userStatus.firstFlag) {
        return true
      } 
    },
    vs1() {
      if (this.genderList.length) {
        let genderTotal =
          parseInt(this.genderList[0].dayScore) +
          parseInt(this.genderList[1].dayScore)
        return (
          Math.floor((this.genderList[0].dayScore / genderTotal) * 100) + '%'
        )
      }
    },
    vs2() {
      if (this.genderList.length) {
        let genderTotal =
          parseInt(this.genderList[0].dayScore) +
          parseInt(this.genderList[1].dayScore)
        return (
          Math.floor((this.genderList[1].dayScore / genderTotal) * 100) + '%'
        )
      }
    },
    ageTotal() {
      if (this.ageList.length) {
        let total = 0
        this.ageList.forEach((val, i) => {
          total += parseInt(val.dayScore)
        })
        return total
      }
    }
  },
  mounted() {
    this.defaultMed()
  },
  methods: {
    // default method
    defaultMed() {
      // 排行榜页_页面展现
      window._baq.push(['_trackEvent', 'driver_ranklist_pv', {}])
      // 百度统计
      window._hmt.push(['_trackEvent', 'driver_ranklist_pv', 'pv', ''])
      Indicator.open()
      // 请求所需参数
      var token = localStorage.getItem('token')
      var banmaId = localStorage.getItem('banmaId')
      let param = {
        banmaId: parseInt(banmaId),
        campId: '1',
        token: token,
        rankingType: 'city'
      }
      let param2 = {
        banmaId: parseInt(banmaId),
        campId: '1',
        token: token,
        rankingType: 'vin'
      }
      let param3 = {
        banmaId: parseInt(banmaId),
        campId: '1',
        token: token,
        rankingType: 'age_decade'
      }
      let param4 = {
        banmaId: parseInt(banmaId),
        campId: '1',
        token: token,
        rankingType: 'gender'
      }
      let api = 'getRankingList'
      this.$fetchData
        .fetchVeteranGet(param, api, 'rankingListReqDto')
        .then(res => {
          if (res && (res.data && res.data.err_resp)) {
            this.isDialog += 1
            if (this.isDialog <= 1) {
              this.$toast(res.data.err_resp.desc, 3000)
            }
          } else {
            if (res && (res.data && res.data.data)) {
              this.cityList = res.data.data.rankingList
              this.myCity = res.data.data.myCity
              this.myCityRank = res.data.data.myRank
              this.myCityScore = res.data.data.myScore
            }
          }
        })
      this.$fetchData
        .fetchVeteranGet(param2, api, 'rankingListReqDto')
        .then(res => {
          if (res && (res.data && res.data.err_resp)) {
            this.isDialog += 1
            if (this.isDialog <= 1) {
              this.$toast(res.data.err_resp.desc, 3000)
            }
          } else {
            if (res && (res.data && res.data.data)) {
              this.vinList = res.data.data.rankingList
              this.myRank = res.data.data.myRank
              this.myScore = res.data.data.myScore
            }
          }
          Indicator.close()
        }).catch(err => {
          Indicator.close()
        })
      this.$fetchData
        .fetchVeteranGet(param3, api, 'rankingListReqDto')
        .then(res => {
          if (res && (res.data && res.data.err_resp)) {
            this.isDialog += 1
            if (this.isDialog <= 1) {
              this.$toast(res.data.err_resp.desc, 3000)
            }
          } else {
            if (res && (res.data && res.data.data)) {
              this.ageList = res.data.data.rankingList
            }
          }
        })
      this.$fetchData
        .fetchVeteranGet(param4, api, 'rankingListReqDto')
        .then(res => {
          if (res && (res.data && res.data.err_resp)) {
            this.isDialog += 1
            if (this.isDialog <= 1) {
              this.$toast(res.data.err_resp.desc, 3000)
            }
          } else {
            if (res && (res.data && res.data.data)) {
              this.genderList = res.data.data.rankingList
            }
          }
        })
    }
  },
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
.faildata {
  height: 80px;
  color: #333;
  text-align: center;
  line-height: 80px;
  font-style: italic;
  font-size: 0.75rem;
}

.home {
  color: $color;
  width: 100%;
  height: 100%;
  background: url('../assets/images/bg.png') no-repeat 0 center;
  background-size: 100% 100%;
  overflow: hidden;
  padding: 0 2.75rem;
  box-sizing: border-box;

  > .title {
    padding: 3rem 0 1rem;
    overflow: hidden;
    position: relative;

    .icon_bar {
      width: 1.8rem;
      float: left;
      margin-top: 0.3rem;
    }

    > span {
      font-size: 1.9rem;
      font-weight: 700;
      float: left;
      margin-left: 0.4rem;
    }

    .backTo{
      position: absolute;
      top: 3.6rem;
      right: 0;
      font-size: .7rem;
      color: #ffffff;
      background: $color;
      width: 3rem;
      height: 1.3rem;
      line-height: 1.3rem;
      border-radius: .3rem;
      text-align: center;
    }
  }

  .content {
    height: calc(100% - 10.85rem);
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .title {
      margin-top: 1.46rem;
      margin-bottom: 3px;
      font-weight: 700;
    }

    .remind {
      font-size: 0.75rem;
      margin-top: 0.3rem;
    }

    .normal {
      width: 100%;
      font-size: 0.75rem;

      .thead {
        background: linear-gradient(left, #29ebd7, #7d44e7);
        color: #fff;
        margin-bottom: 0.3rem;

        .tr {
          display: flex;

          .td {
            text-align: center;
          }

          .nick {
            flex: 1;
          }
        }
      }

      .tbody {
        // max-height:13.75rem;
        border-style: solid;
        border-width: 1px;
        border-image-source: linear-gradient(-90deg, #7168e8 0%, #4ad0f8 100%);
        border-image-slice: 1;
        text-align: center;

        .tr {
          display: flex;

          &.tr_head {
            background: linear-gradient(left, #29ebd7, #7d44e7);
            color: #fff;
            width: 95%;
            margin: auto;
            margin-bottom: 0.3rem;

            .td {
              padding: 0;
            }
          }

          &.tr_mar {
            margin: 0.5rem auto;
          }

          &.tr_head2 {
            width: 95%;
            margin: 0.6rem auto;

            .tr-text {
              font-size: 0.8rem;
              flex: 1;
              text-align: center;
            }

            .border {
              width: 10%;
              border: 1px solid $color;
              margin: auto;
            }
          }

          .td {
            text-align: center;
            padding: 4px 0px 0 0px;
          }

          .lue {
            font-size: 0.8rem;
            font-weight: bold;
            letter-spacing: 3px;
          }

          .nick {
            flex: 1;
          }
          .text-ellipsis {
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
          }

          &:last-child {
            > td:first-child {
              padding: 4px;
            }
          }
        }
      }
    }

    .vsBlock {
      height: 2.6rem;
      overflow: auto;
      margin-top: 1rem;

      .icon_head {
        width: 2.36rem;
        float: left;
        height: 2.36rem;
        background: $footerColor;
        box-sizing: border-box;
        padding: 2px;
      }

      .icon_head_woman {
        float: right;

        img {
          height: 100%;
        }
      }

      .vsInfo {
        width: calc(100% - 6rem);
        height: 100%;
        float: left;
        margin: 0 0.64rem;
        font-size: 0.75rem;

        .vsInfoText {
          margin-bottom: 4px;
        }

        .vsLine {
          width: 100%;
          height: 0.9rem;
          background: $footerColor;
          position: relative;
          box-sizing: border-box;
          padding: 0.1rem;

          .vsLineMan {
            // width:60%;
            height: 0.65rem;
            background: #2becd7;
            float: left;
          }

          .vsLineWoman {
            // width:40%;
            height: 0.65rem;
            background: #7d42e7;
            float: right;
          }
        }

        .icon_vs {
          width: 1.4rem;
          position: absolute;
          top: -0.3rem;
          left: 60%;
          margin-left: -0.7rem;
        }
      }
    }

    .yearsBlock {
      margin-top: 1.05rem;
      overflow: hidden;

      > ul > li {
        margin-bottom: 1rem;
        width: 100%;
        float: left;

        > * {
          float: left;
        }

        .years {
          font-size: 0.75rem;
          font-weight: 700;
          width: 2.5rem;
          display: block;
        }

        .lineBg {
          width: calc(100% - 10.5rem);
          height: 1.1rem;
          background: $footerColor;
          margin: 0 0.5rem;
          box-sizing: border-box;
          padding: 3px;
          overflow: hidden;

          .line {
            width: 60%;
            height: 100%;
            background: linear-gradient(left, #7d44e7, #29ebd7);
          }
        }

        .grade {
          width: 7rem;
          text-align: left;
          font-size: 0.75rem;
          float: right;
        }
      }
    }
  }
}
</style>
