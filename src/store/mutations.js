export default {
    /**
     * @param {param}: method param
     */
    defaultMed(state, param) {
        state.param = param
    },
    addCount(state, count) {
        state.count = count
    },
    /**
     * 页面高度设置
     * @param {*} state 
     * @param {*} currentHeight 
     */
    updateHeight(state, currentHeight) {
        state.pageHeight = currentHeight
    },
    /**
     * 领取奖品状态
     * @param {*} state 
     * @param {*} submitStatus 
     */
    updateStatus(state, submitStatus) {
        state.submitStatus = submitStatus
    },
    /**
     * 底部nav的2种状态
     * @param {*} state 
     * @param {*} nav 
     */
    updateNav(state, currentNav) {
        state.nav = currentNav
    },
    /**
     * 更新用户的vin号信息
     * @param {*} state 
     * @param {*} vin 
     */
    updateVin(state, currentVin) {
        state.vin = currentVin
    },
    /**
     * 获取昵称ID
     * @param {*} state 
     * @param {*} suggestNextId 
     */
    getSuggestNextId(state, suggestNextId) {
        state.suggestNextId = suggestNextId
    },
    /**
     * 更新用户的banmaId与token数据信息
     * @param {banmaId}
     * @param {token}
     */
    updateUserInfo(state, currentUserInfo) {
        // 更新banmaId
        if (currentUserInfo.banmaId) {
            state.userInfo.banmaId = currentUserInfo.banmaId
        }
        // 更新 token
        if (currentUserInfo.token) {
            state.userInfo.token = currentUserInfo.token
        }
    },
    /**
     * 更新用户的campEndFlag与firstFlag状态
     * @param {campEndFlag}
     * @param {firstFlag}
     */
    updateUserStatus(state, currentUserStatus) {
        // 更新 campEndFlag
        state.userStatus.campEndFlag = currentUserStatus.campEndFlag
            // 更新 firstFlag
        state.userStatus.firstFlag = currentUserStatus.firstFlag

    }
}