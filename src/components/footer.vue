<template>
    <footer>
      <template v-if="!nav">  
        <router-link :to="{path:'/veteran'}" @click.native="linkMed('mainpage')" :class="{activeClass:active==1}">
          <div class="item">
            <div class="footerIcon_home">
              <img v-if="active!=1" src="../assets/images/icon_home.png" alt="">
              <img v-if="active==1" src="../assets/images/icon_home_active.png" alt="">
            </div>
            <span>首页</span>
          </div>
        </router-link>
        <router-link :to="{path:'./activityRule'}" @click.native="linkMed('strategy')" :class="{activeClass:active==2}">
          <div :class="[item,{item_2_active:active!=2}]">
            <div class="footerIcon_doc">
              <img v-if="active!=2" src="../assets/images/icon_doc.png" alt="">
              <img v-if="active==2" src="../assets/images/icon_doc_active.png" alt="">
            </div>
            <span>攻略</span>
          </div>
        </router-link>
        <router-link :to="{path:'./rankPage'}" @click.native="linkMed('rank')" :class="{activeClass:active==3}">
          <div class="item">
            <div class="footerIcon_list">
              <img v-if="active!=3" src="../assets/images/icon_list.png" alt="">
              <img v-if="active==3" src="../assets/images/icon_list_active.png" alt="">
            </div>
            <span>排行榜</span>
          </div>
        </router-link>
      </template>
      <template v-else>
        <router-link :to="{path:'./winningList'}" @click.native="linkMed('awardlist')" :class="{activeClass:active==4}">
          <div class="item">
            <div class="footerIcon_home">
              <img v-if="active!=4" src="../assets/images/icon_prize.png" alt="">
              <img v-if="active==4" src="../assets/images/icon_prize_active.png" alt="">
            </div>
            <span>获奖名单</span>
          </div>
        </router-link>
        <router-link :to="{path:'./myReports'}" @click.native="linkMed('report')" :class="{activeClass:active==5}">
          <div :class="[item,{item_2_active:active!=5}]">
            <div class="footerIcon_doc">
              <img v-if="active!=5" src="../assets/images/icon_doc.png" alt="">
              <img v-if="active==5" src="../assets/images/icon_doc_active.png" alt="">
            </div>
            <span>我的报告</span>
          </div>
        </router-link>
        <router-link :to="{path:'./rankPage'}" @click.native="linkMed('ranklist')" :class="{activeClass:active==3}">
          <div class="item">
            <div class="footerIcon_list">
              <img v-if="active!=3" src="../assets/images/icon_list.png" alt="">
              <img v-if="active==3" src="../assets/images/icon_list_active.png" alt="">
            </div>
            <span>排行榜</span>
          </div>
        </router-link>
      </template>
    </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'myFooter',
  data () {
    return {
      activeClass:'activeClass',
      item:'item'
    }
  },
  computed: {
    ...mapState([
      'nav'
    ])
  },
  props:['active', 'navStatus'],
  methods: {
    // 数据统计
    linkMed (type) {
      // 我的报告页_页面展现
      window._baq.push(['_trackEvent', 'driver_tab_switchclick', {'contenttype': type}])
      // 百度统计
      var htmjson = {'contenttype': type}
      window._hmt.push(['_trackEvent', 'driver_tab_switchclick', 'click', htmjson.toString()])
    }
  }
}
</script>
<style scoped lang="scss">
$color:#028e82;
$footerColor:#e4f8f0;
p{margin:0;}
img{width:100%;}

footer{
    width:100%;
    height:3.36rem;
    background:$footerColor;
    position: fixed;
    left: 0;
    bottom:0;
    display: flex;
    line-height: 3.36rem;
    justify-content: center;
    align-items: center;
    z-index: 80;
    &>a{
      width:33.3%;
      display: inline-block;
      text-decoration: none;
      height:100%;
    }
    .item {
      margin-top:.71rem;
      box-sizing: border-box;
      height: 1.86rem;
      font-size: 0;
      line-height: 1.86rem;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        color: #028e82;
        font-size: 1.06rem;
        margin-left: 0.54rem;
        height: 1.86rem;
        line-height: 1.9rem;
      }
      img {
        vertical-align: middle;
      }
    }
    .item_2_active {
      border-left: 1px solid #b7ddd4;
      border-right: 1px solid #b7ddd4;
    }

    .footerIcon_home{
      width:1.68rem;
      display: inline-block;
      img{
        margin-top:-3px;
      }
    }
    .footerIcon_doc{
      width:1.14rem;
      display: inline-block;
    }
    .footerIcon_list{
      width:1.21rem;
      display: inline-block;
    }
}
.activeClass{
    background:$color;
    .item span{
        color:#e4f8f0 !important;
    }
} 
</style>
