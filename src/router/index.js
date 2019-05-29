import Vue from 'vue'
import Router from 'vue-router'
// import Veteran from '@/pages/Veteran' //ppt第9页，首页
// import UserLogin from '@/pages/UserLogin' //ppt第4-1页，参与
// import gradeDetail from '@/pages/gradeDetail' //ppt第10页，得分详情
// import activityRule from '@/pages/activityRule' //ppt第11页，活动攻略
// import personalPage from '@/pages/personalPage' //ppt第6页，个人信息
// import rankPage from '@/pages/rankPage' //ppt第12页，排行榜
// import Loading from '@/pages/loading' //ppt第3页，加载页
// import reportPage from '@/pages/reportPage' //ppt第13页，报告页
// import pcEntryPage from '@/pages/pcEntry' //ppt第15页，pc入口
// import ChallengeRound from '@/pages/challengeRound' // 挑战赛
// import WinAward from '@/pages/winAward' // 获奖页面
// import WinningList from '@/pages/winningList' // 中奖名单
// import MyReports from '@/pages/myReports' // 我的报告
// import reportPageB from '@/pages/reportPageB' //ppt第13页，我也要参加
// import reportPageA from '@/pages/reportPageA' //ppt第14页，APP端成绩单

//路由组件按需加载,提高首页加载效率

const Veteran = () =>
  import('@/pages/Veteran')
const UserLogin = () =>
  import('@/pages/UserLogin')
const gradeDetail = () =>
  import('@/pages/gradeDetail')
const activityRule = () =>
  import('@/pages/activityRule')
const personalPage = () =>
  import('@/pages/personalPage')
const rankPage = () =>
  import('@/pages/rankPage')
const Loading = () =>
  import('@/pages/loading')
const reportPage = () =>
  import('@/pages/reportPage')
const pcEntryPage = () =>
  import('@/pages/pcEntry')
const ChallengeRound = () =>
  import('@/pages/challengeRound')
const WinAward = () =>
  import('@/pages/winAward')
const WinningList = () =>
  import('@/pages/winningList')
const MyReports = () =>
  import('@/pages/myReports')
const reportPageB = () =>
  import('@/pages/reportPageB')
const reportPageA = () =>
  import('@/pages/reportPageA')
const veteranIntro = () =>
  import('@/pages/veteranIntro')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/personalPage',
    name: 'personalPage',
    component: personalPage
  },
  {
    path: '/',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/veteran',
    name: 'Veteran',
    component: Veteran
  },
  {
    path: '/gradeDetail',
    name: 'gradeDetail',
    component: gradeDetail
  },
  {
    path: '/activityRule',
    name: 'activityRule',
    component: activityRule
  },
  {
    path: '/rankPage',
    name: 'rankPage',
    component: rankPage
  },
  {
    path: '/loading',
    name: 'loading',
    component: Loading
  },
  {
    path: '/reportPage',
    name: 'reportPage',
    component: reportPage
  },
  {
    path: '/reportPageA',
    name: 'reportPageB',
    component: reportPageA
  },
  {
    path: '/reportPageB',
    name: 'reportPageB',
    component: reportPageB
  },
  {
    path: '/pcEntryPage',
    name: 'pcEntryPage',
    component: pcEntryPage
  },
  {
    path: '/challengeRound',
    name: 'challengeRound',
    component: ChallengeRound
  },
  {
    path: '/winAward',
    name: 'winAward',
    component: WinAward
  },
  {
    path: '/winningList',
    name: 'winningList',
    component: WinningList
  },
  {
    path: '/myReports',
    name: 'myReports',
    component: MyReports
  },
  {
    path: '/veteranintro',
    name: 'veteranIntro',
    component: veteranIntro
  },
  {
    path: '*',
    name: 'noFound',
    component: UserLogin
  }
  ]
})