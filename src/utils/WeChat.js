/**
 * 微信js-sdk
 * li yubo
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import fetchData from '@/ajax/fetchData.js'
import wx from 'weixin-js-sdk'

export default {
    wxApi: () => {
        let api = 'getPromoAuth'
        let url = encodeURIComponent(location.href.split('#')[0]) //"http://a.b.com/1.jsp"
        let param = {
            "promoType": "weixin",
            "url": url
        }
        fetchData.fetchVeteranGet(param, api, 'getPromoReqDto')
            .then((res) => {
                let data
                if (res && (res.data && res.data.data)) {
                    data = res.data.data
                    wx.config({
                        debug: true, // 开启调试模式
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature, // 必填，签名
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function() {
                        wx.onMenuShareAppMessage({
                            title: '分享给朋友', // 分享标题
                            desc: '我的宝宝贝', // 分享描述
                            link: location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: '../assets/images/logo_plus.png', // 分享图标
                            success() {
                                console.log('成功分享给朋友');
                            },
                            cancel() {
                                console.log('分享到朋友取消');
                            },
                        });
                        // 分享到朋友圈
                        wx.onMenuShareTimeline({
                            title: '分享到朋友圈', // 分享标题
                            desc: '我的宝贝白又白', // 分享描述
                            link: location.href.split('#')[0], // 分享链接
                            imgUrl: '../assets/images/logo_plus.png', // 分享图标
                            success() {
                                console.log('成功分享到朋友圈');
                            },
                            cancel() {
                                console.log('分享到朋友圈取消');
                            },
                        });
                    })
                    wx.error(function(res) {
                        console.log(res)
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
    }
}