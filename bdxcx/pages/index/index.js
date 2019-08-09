/**
 * @file index.js
 * @author swan
 */
const app = getApp()


/* globals Page */
Page({
    data: {
        primaryurl: app.globalData.primaryurl,
        projectImg: [],
        indexbanner: [], //首页轮播图
        projectList: [], //项目列表
        current: 0,
        switchIndicateStatus: true,
        switchAutoPlayStatus: true,
        switchDuration: 500,
        autoPlayInterval: 3000
    },
    recom(e) {   /*头部要写跳转方法*/
        swan.navigateTo({
            url: '../projectDetailed/projectDetailed?index=' + e.target.dataset.index,
        });
    },
    onLoad: function () {
        var that = this
     
        
        // 监听页面加载的生命周期函数
        swan.showLoading({
            title: '数据载入中',
        })
        


        swan.request({
            url: that.data.primaryurl + '/getBanner', // 首页banner
            method: 'GET',
            dataType: 'json',
            data: {
                typeid: 0
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                that.setData({
                    indexbanner: res.data
                })

            },
            fail: function (err) {
                swan.showToast({
                    title: '错误信息：' + err.errMsg,
                    icon: 'none',
                    duration: 1500
                })
            }
        });
        swan.request({
            url: that.data.primaryurl + '/pushPro', // 主推项目
            method: 'GET',
            dataType: 'json',
            data: {

            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                that.setData({
                    projectImg: res.data
                })

            },
            fail: function (err) {
                swan.showToast({
                    title: '错误信息：' + err.errMsg,
                    icon: 'none',
                    duration: 1500
                })
            }
        });


        swan.request({
            url: that.data.primaryurl + '/recommendPro', // 项目列表
            method: 'GET',
            dataType: 'json',
            data: {

            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                that.setData({
                    projectList: res.data
                })

            },
            fail: function (err) {
                swan.showToast({
                    title: '错误信息：' + err.errMsg,
                    icon: 'none',
                    duration: 1500
                })
            }
        });
    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
        swan.hideLoading()
       
    },
    onShow: function () {
        var that=this
        swan.request({
            url: that.data.primaryurl + '/moreSeo', // 首页seo
            method: 'GET',
            dataType: 'json',
            data: {
                name: "首页"
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res)
                 swan.setPageInfo({
                    title: res.data.seo_title,
                    keywords: res.data.keywords,
                    description:res.data.description ,
                    image: [
                        that.data.primaryurl+res.data.photo
                        
                    ],
                    success: function () {
                        console.log('setPageInfo success');
                    },
                    fail: function (err) {
                        console.log('setPageInfo fail', err);
                    }
                })
            },
            fail: function (err) {
                swan.showToast({
                    title: '错误信息：' + err.errMsg,
                    icon: 'none',
                    duration: 1500
                })
            }
        });
        // 监听页面显示的生命周期函数
         

    },
    onHide: function () {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function () {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function () {
        // 监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});
