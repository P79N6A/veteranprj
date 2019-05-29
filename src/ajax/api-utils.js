/**
 * Created by Cris 04/06/2019
 */

const apiUtils = {
    tologin: {
        api: 'ebanma.cloud.account.base.register',
        name: '登录接口'
    },
    getverifycode: {
        api: 'ebanma.cloud.zid.mp.verifycode.send',
        name: '获取验证码接口'
    },
    getuserinfo: {
      api: 'ebanma.cloud.account.base.account.get',
      name: '利用banmaid获取用户昵称'
    },
    checktoken: {
        api: 'ebanma.cloud.account.base.token.check',
        name: '校验登录态'
    },
    userjoin: {
        api: '/app-avn/camp/1.0/sign',
        name: '用户活动报名接口'
    },
    usersign: {
        api: '/camp/mobileMock/1.0/sign',
        name: '登录时获取用户参与情况'
    },
    veteranquiz: {
        api: '/app-avn/veteran/1.0/quiz',
        name: '老司机活动发起竞猜'
    },
    getQuizDefenders: {
        api: '/app-avn/veteran/1.0/getQuizDefenders',
        name: '老司机活动获取竞猜对象列表'
    },
    getRankingList: {
        api: '/app-avn/veteran/1.0/getRankingList',
        name: '老司机活动获取排行榜'
    },
    getDriverDetail: {
        api: '/app-avn/veteran/1.0/getDriverDetail',
        name: '老司机活动获取驾驶行为个人详情'
    },
    getDriverReport: {
        api: '/app-avn/veteran/1.0/getDriverReport',
        name: '老司机活动获取驾驶行为报告'
    },
    updateProfile: {
        api: '/app-avn/camp/1.0/updateProfile',
        name: '更新活动参与者个人信息'
    },
    noteBooks: {
        api: 'zebra.carcloud.cms.advertisement.get',
        name: '获取路书列表接口'
    },
    getrescueorder: {
        name: '救援首页获取订单',
        api: 'rescue/1.0/getOrder'
    },
    getCarLists: {
        name: '获取个人车辆列表',
        api: 'zebra.base.urm.account.vinlist'
    },
    getGift: {
        api: '/app-avn/camp/1.0/getGift',
        name: '运营平台活动领奖'
    },
    getPromoAuth: {
        api: '/app-avn/camp/1.0/getPromoAuth',
        name: '公众号推广获取授权'
    },
    getWinner: {
        api: '/app-avn/veteran/1.0/getWinner',
        name: '活动获取中奖名单'
    }
}

export default apiUtils