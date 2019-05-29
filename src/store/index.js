/**
 * Created by Cris 04/06/2019
 * 状态管理模式
 */

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

/**
 * @param {state}: 驱动应用的数据源
 * @param {actions}: 响应在 view 上的用户输入导致的状态变化
 */

const store = new Vuex.Store({
    state: {
        creator: 'crisliu',
        date: '04/06/2019',
        count: 0,
        pageHeight: 0, // 页面高度
        nav: false,
        suggestNextId: '', // 昵称id
        userStatus: {
            campEndFlag: false,
            firstFlag: true
        },
        userInfo: {
            banmaId: '',
            token: ''
        },
        vin: '',
        submitStatus: false // 是否已经领过奖品状态
    },
    mutations: mutations,
    actions: actions
})

export default store