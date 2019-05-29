<template>
  <div class="home" id="main" :style="{ 'min-height': $minpageHeight + 'px' }">
    <div class="topBlock">
      <div class="title"><div style="width:15rem">恭喜报名成功！</div></div>
      <p class="title2">请完善个人资料</p>
      <p style="font-size:12px;">昵称修改</p>
      <input
        type="text"
        name=""
        id=""
        class="inputName"
        v-model="myname"
        maxlength="9"
        @blur="checkName"
      />
    </div>
    <div class="content">
      <p class="title">头像选择</p>
      <div class="portraitList">
        <div
          :class="[headIcon, { active: defaultHeadIconIndex == index }]"
          v-for="(item, index) in headIcons"
          :key="index"
          @click="chooseHeadIcon(index)"
        >
          <img :src="item" alt="" ref="image" />
          <!-- <img :src="'../assets/images/portrait'+index+'.png'" alt=""> -->
        </div>
      </div>
      <p class="title" style="margin-top:1.2rem;">车辆选择</p>
      <!-- <select class="" name="" id="">
                <option value="" disabled selected hidden v-if="options.length>1">选择参与自此活动的车辆</option>
                <option value="1" v-for="(item,index) in options" :key="index">
                    {{item.vehicleType}}-{{item.cardId}}
                </option>
            </select> -->
      <div class="selectCar">
        <div class="default" @click="toggleSelect">
          <div
            class="text"
            v-if="selectCarOptions.length>1"
            v-show="isSelecting === false && hasSelected === false"
          >
            选择参与自此活动的车辆
          </div>
          <div
            class="text"
            v-show="isSelecting === false && hasSelected === true"
          >
            {{ selectedBrandName }}<span v-if="selectedCardNumber">-{{ selectedCardNumber }}</span>
          </div>
          <div class="arrow">
            <img
              src="../assets/images/select-arrow-down.png"
              alt=""
              class="arrow_img"
              v-show="isSelecting === false"
            />
            <img
              src="../assets/images/select-arrow-up.png"
              alt=""
              class="arrow_img"
              v-show="isSelecting === true"
            />
          </div>
        </div>
        <div class="options" v-show="isSelecting === true">
          <div
            class="option"
            v-for="(item, i) in selectCarOptions"
            :key="i"
            @click="selectThisCar(item.vehicleBrandName, item.vehicleNumber, i)"
          >
            <span>{{ item.vehicleBrandName }}</span>
            <span v-if="item.vehicleNumber">-{{ item.vehicleNumber }}</span>
          </div>
        </div>
      </div>
      <!-- <p class="title3">*请选择参与此次活动的车辆。</p> -->
      <p class="title4">*个人资料提交后不可更改哦！</p>
      <!-- <router-link :to="{path:''}"> -->
      <button class="sureSubmit" @click="submitPage">确认提交</button>
      <!-- </router-link> -->
    </div>
    <div class="logo">
      <img src="../assets/images/logo_plus.png" alt="" />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import myFooter from '@/components/footer'

export default {
  name: 'personalPage',
  data() {
    return {
      myname: '',
      selectCarOptions: [],
      defaultHeadIconIndex: 0,
      headIcon: 'headIcon',
      active: 'active',
      isSelecting: false, //车辆选择下拉框状态，false关闭，true展开
      hasSelected: false, //已选择车辆
      selectedBrandName: '', //已选择车品牌
      selectedCardNumber: '', //已选择车牌号
      selectedIndex: '',
      headIcons: [
        require('../assets/images/portrait1.png'),
        require('../assets/images/portrait2.png'),
        require('../assets/images/portrait3.png'),
        require('../assets/images/portrait4.png'),
        require('../assets/images/portrait5.png'),
        require('../assets/images/portrait6.png')
      ],
      appuserName: '', // app内部获取到用户名时
    }
  },
  computed: {
    ...mapState(['vin', 'userInfo','suggestNextId'])
  },
  watch: {
    /**
     * 监听app中用户名
     */
    appuserName () {
      if (!this.appuserName) {
        this.myname = this.appuserName
      }
    }
  },
  created() {
    this.getCarLists()
  },
  mounted() {
    this.myname = '老司机' + this.suggestNextId
    // 页面加载默认方法
    this.defaultMed()
  },
  methods: {
    ...mapMutations(['updateVin']),
    /**
     * 默认方法
     */
    defaultMed() {
      // 个人信息页_页面展现
      window._baq.push(['_trackEvent', 'driver_personalinfo_pv', {}])
      // 百度统计
      window._hmt.push(['_trackEvent', 'driver_personalinfo_pv', 'pv', ''])
      // 判断是否是在 app中
      var u = navigator.userAgent
      if ((u.toLowerCase().indexOf('banma_ios_app') !== -1) || (u.toLowerCase().indexOf('bm_android') !== -1)) {
        this.getAppuserNick()
      }
    },
    /**
     * app 中获取用户昵称
     */
    getAppuserNick () {
      let banmaId = localStorage.getItem('banmaId')
      let param = {
        bmAccountId: banmaId
      }
      let api = 'getuserinfo'
      this.$fetchData.fetchGet(param, api).then(res => {
        if (res && (res.data&&res.data.ebanma_cloud_account_base_account_get_response)) {
          var resdata = res.data.ebanma_cloud_account_base_account_get_response
          var usernick = resdata.nick
          this.appuserName = usernick
        }
      })
    },
    chooseHeadIcon(i) {
      this.defaultHeadIconIndex = i
    },
    checkName() {
      //是否含表情包
      var reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g
      if (this.myname.match(reg)) {
        this.$toast('昵称不可包含表情包')
        this.myname = this.myname.replace(reg, '')
        return
      }
    },
    getCarLists() {
      let param = this.$store.state.userInfo //等于this.userInfo,因为已经使用...mapState引入了
      let api = 'getCarLists'
      this.$fetchData.fetchGet(param, api, 'activityUpdateProfileReqDto').then(
        res => {
          if (res.data.zebra_base_urm_account_vinlist_response) {
            this.selectCarOptions = res.data.zebra_base_urm_account_vinlist_response;
            // 过滤vinlist
            this.selectCarOptions = this.filterVinlist(this.selectCarOptions)
            if(this.selectCarOptions.length == 1){
              this.selectedBrandName = this.selectCarOptions[0].vehicleBrandName
              this.selectedCardNumber = this.selectCarOptions[0].vehicleNumber
              this.isSelecting = false 
              this.hasSelected = true
            }
          } else {
            this.$toast('获取车辆列表失败!', 3000)
          }
        },
        error => {
          console.log(error)
        }
      )
    },
    /**
     * 过滤处理vinlist
     */
    filterVinlist (vinlist) {
      var currentlist = []
      if (vinlist&&vinlist.length>0) {
        for (var i=0;i<vinlist.length;i++){
          if ((vinlist[i]['vehicleOemCode'].toLowerCase() == 'smpv') || (vinlist[i]['vehicleOemCode'].toLowerCase() == 'smcv')) {
            if (vinlist[i]['relation'] == 1) {
              currentlist.push(vinlist[i])
            }
          }
        }
      }
      return currentlist
    },
    submitPage() {
      if (!this.hasSelected) {
        this.$toast('请选择参与活动的车辆!', 3000)
      } else if (!this.myname) {
        this.$toast('请输入您的昵称!', 3000)
      } else {
        let currentVin = this.selectCarOptions[this.selectedIndex].vin
        let token = localStorage.getItem('token')
        this.$store.commit('updateVin', currentVin)
        // let avatar = encodeURIComponent(this.$refs.image[this.defaultHeadIconIndex].src)
        let avatar = this.defaultHeadIconIndex
        let param = {
          avatar: avatar + '',
          // "banmaId": parseInt(this.userInfo.banmaId),
          banmaId: 7,
          campId: '1',
          nickname: this.myname,
          vin: this.vin,
          token: token
        }
        let api = 'updateProfile'
        this.$fetchData
          .fetchVeteranGet(param, api, 'activityUpdateProfileReqDto')
          .then(res => {
            if (res && (res.data && res.data.err_resp)) {
              var subMsg = res.data.err_resp.desc.replace(
                'activityUpdateProfileReqDto.getNickname()',
                this.myname
              )
              this.$toast(subMsg)
            } else if (res && res.data.data) {
              this.$router.push({ path: '/veteran' })
              // 提交成功 统计提交次数
              window._baq.push([
                '_trackEvent',
                'driver_personalinfo_submitclick',
                {}
              ])
              // 百度统计
              window._hmt.push([
                '_trackEvent',
                'driver_personalinfo_submitclick',
                'click',
                ''
              ])
            }
          })
      }
    },
    toggleSelect() {
      this.isSelecting = !this.isSelecting
      this.hasSelected = false
    },
    selectThisCar(val1, val2, index) {
      this.isSelecting = false
      this.hasSelected = true
      this.selectedBrandName = val1
      this.selectedCardNumber = val2
      this.selectedIndex = index
    }
  },
  components: {}
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
  width: 100%;
  height: 100%;
  background: url('../assets/images/bg.png') no-repeat 0 center;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .logo {
    width: 8rem;
    position: absolute;
    bottom: 5px;
    left: 50%;
    margin-left: -4rem;
  }
  .topBlock {
    width: 100%;
    height: 16rem;
    background: url('../assets/images/bg_top.png') no-repeat 0 bottom;
    background-size: 100% 100%;
    color: $color;
    overflow: auto;
    text-align: center;
    .title {
      width:13rem;
      margin: 4rem auto 1rem auto;
      font-size: 1.9rem;
    }
    .title2 {
      font-size: 1.1rem;
      width: 13.86rem;
      display: inline-block;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid #028e8245;
      margin-bottom: 0.3rem;
    }
    .inputName {
      border: 0;
      outline: 0;
      background: #4ecaac;
      width: 10.2rem;
      height: 1.8rem;
      margin-top: 0.4rem;
      color: #fff;
      padding: 0 0.5rem;
      text-align: center;
    }
  }
  .content {
    text-align: center;
    .title {
      color: $color;
      font-size: 1.1rem;
      margin: 2rem 0 0.5rem 0;
    }
    .title3 {
      font-size: 0.6rem;
      color: $color;
      margin-top: 0.2rem;
    }
    .title4 {
      font-size: 0.85rem;
      color: $color;
      margin-top: 1.7rem;
    }
    .portraitList {
      width: 15.82rem;
      height: 9.4rem;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .headIcon {
        width: 4.2rem;
        height: 4.2rem;
        display: inline-block;
        background: #cacaca;
        overflow: hidden;
        > img {
          margin-top: 0.3rem;
        }
      }
      .active {
        background: #0a997e;
      }
    }
    .selectCar {
      width: 12rem;
      height: 1.8rem;
      display: inline-block;
      background: #4ecaac;
      border: 0;
      color: #fff;
      font-size: 0.75rem;
      position: relative;
      > .default {
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 0.3rem;
        box-sizing: border-box;
        .text {
          width: calc(100% - 1.8rem);
          float: left;
          padding-right: 5px;
        }
        .arrow {
          float: right;
          border-left: 1px solid #f0f0f0;
          padding-left: 0.1rem;
          .arrow_img {
            width: 1.2rem;
          }
        }
      }
      > .options {
        position: absolute;
        top: 1.8rem;
        left: 0;
        width: 100%;
        max-height: 8.5rem;
        overflow: auto;
        .option {
          width: 100%;
          height: 1.8rem;
          background: #e4f8f0;
          color: $color;
          line-height: 1.8rem;
          border-bottom: 1px solid #fff;
        }
      }
    }
    .sureSubmit {
      width: 9.7rem;
      height: 2.3rem;
      border-radius: 0.4rem;
      background: #0a997e;
      color: #fff;
      font-size: 1.11rem;
      letter-spacing: 1px;
      margin-top: 0.5rem;
    }
  }
}
</style>
