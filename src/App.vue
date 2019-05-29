<template>
  <div id="app" class="app">
    <router-view />  
  </div>
</template>

<script>
import { constants } from 'fs';
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'nav',
      'userStatus'
    ]),
    pagecount () {
      return this.$store.state.count
    }
  },
  mounted () {
    // if(!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
    //   return
    // }else{
    //   this.$wxApi.wxApi()
    // }
    // 无需动态域名的请求
    // this.ajaxFetchGet()
    // this.ajaxFetchPost()
    // 需要动态域名的请求
    // this.ajaxPrivateFetchGet()
    this.defaultMed()
  },
  watch: {
    $route(to,from){
      //令页面始终位于顶端
      document.getElementById('app').scrollTop = 0

      // 判断是否为pc端打开
      if(!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
        this.$router.push({
          path: '/pcEntryPage'
        })
        return
      }
      let currentNav;
      let patgList = (from.path == '/winAward' || from.path == '/winningList' || from.path == '/myReports') && to.path == '/rankPage';
      let status = (to.path == '/activityRule' && this.userStatus.campEndFlag && !this.userStatus.firstFlag)
      if(to.path == '/winAward' || to.path == '/winningList' || to.path == '/myReports' || patgList || status) {
        currentNav = true
        this.$store.commit('updateNav', currentNav)
      }else{
        currentNav = false
        this.$store.commit('updateNav', currentNav)
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateNav'
    ]),
    /**
     * 默认加载方法
     */
    defaultMed () {
      var token = localStorage.getItem('token')
      var banmaId = localStorage.getItem('banmaId')
      // 免登
      this.updateUserInfo({ banmaId: banmaId, token: token })
    },
    /**
     * 示例：无需动态域名的请求
     */
    ajaxFetchGet () {
      let param = {
        v: '1.0',
        limit: 3,
        positionNumber: 'M00P107'
      }
      let api = 'noteBooks'
      this.$fetchData.fetchGet(param, api).then(res => {
        console.log(res)
      })
    },
    /**
     * 示例：无需动态域名的请求
     */
    ajaxFetchPost () {
      let param = {
        v: '1.0',
        limit: 3,
        positionNumber: 'M00P107'
      }
      let api = 'usersign'
      this.$fetchData.fetchPost(param, api).then(res => {
        console.log(res)
      })
    },
    /**
     * 示例需要动态域名的请求
     */
    ajaxPrivateFetchGet () {
      // 请求参数
      let param = {
        vin: this.$paramData.vin
      }
      this.$fetchData.fetchPrivateGet(param, 'getrescueorder', 'rescue').then(res => {
        console.log(res)
      })
    },
    /**
     * 更新用户的token和banmaId
     */
    updateUserInfo(currentUserInfo) {
      this.$store.commit('updateUserInfo', currentUserInfo)
    }
  }
}
</script>

<style lang="scss">
* {
  -webkit-overflow-scrolling: touch;
  -webkit-touch-callout: unset!important;
}
.mint-indicator-mask {
  background: rgba(83, 183, 164, 1)!important;
  z-index: 99!important;
  opacity: 1!important;
}
body,html,#app{
  width:100%;
  height:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: auto;
}
ul,li,ol,dl,dd{
  list-style: none;
  margin:0;
  padding:0;
}
button{
  border:0;
  outline:0;
}
table,thead,tbody,tr,td,input{
  margin:0;
  padding:0;
  border:0;
  border-spacing: 0;
  border-collapse: collapse;
  -webkit-appearance: none;
  border-radius:0;
}
.wrapper {
  min-height: 43rem;
}
.mainwrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.midcontent {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.midcontent::-webkit-scrollbar {
    display: none;
}
// mint-ui z-index
.mint-indicator-wrapper {
  z-index: 9999;
}
</style>
