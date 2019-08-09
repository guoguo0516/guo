var bdParse = require('../../bdParse/bdParse.js');
const app = getApp()
Page({
    data: {
        primaryurl: app.globalData.primaryurl,
        setdata: {},   //新闻详情
        terms: false,  //留言提交按钮是否禁用状态
        newsRecommend: [],
        toView: '', //锚点滚动
    },
    // radioChange:function(e){
    //         var that=this
    //         if (e.detail.value == '') {
    //          that.setData({
    //             terms:true
    //         })
    //         }
    //         else {
    //         that.setData({
    //             terms:false
    //         })
    //         }
    //         console.log(e.detail.value);

    // },//勾选条款
    getdata: function (id) {
        var that = this;
        swan.request({
            url: app.globalData.primaryurl + '/newsDetail',
            method: 'GET',
            dataType: 'json',
            data: {
                id: id
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    setdata: res.data
                })
                var article = res.data.content;

                bdParse.bdParse('article', 'html', article, that, 5)
                swan.hideLoading()
            },
            fail: function (err) {
                swan.showToast({
                    title: '错误信息：' + err.errMsg,
                    icon: 'none',
                    duration: 1500
                })
            }
        });
    },//获取新闻详情
    getnewsRecommend: function (type, infoid) {
        var that = this;
        swan.request({
            url: app.globalData.primaryurl + '/newsRecommend',
            method: 'GET',
            dataType: 'json',
            data: {
                id: infoid,
                type: type
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    newsRecommend: res.data
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
    },//获取新闻推荐
    scrollToViewFn(e) {

        this.setData({
            toView: e.currentTarget.dataset.opt,
        })

    },// 滚动锚点
    bindscroll(e) {

        this.setData({
            toView: "",
        })
    },


    newsDetailed: function (e) {

        swan.navigateTo({
            url: '../newsDetailed/newsDetailed?index=' + e.target.dataset.index + "&type=" + this.data.currentIndex,
        });
    },
    onLoad: function (options) {
        var that = this;
        var index = options.index;
        var type = options.type;
        that.getdata(index)
        that.getnewsRecommend(type, index)
        swan.showLoading({
            title: '数据载入中',
        })
        // 监听页面加载的生命周期函数

    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数

    },
    onShow: function () {
        // 监听页面显示的生命周期函数
        var that=this
        
          swan.setPageInfo({
                    title: that.data.setdata.seo_title,
                    keywords: that.data.setdata.keywords,
                    description:that.data.setdata.description,
                    articleTitle:that.data.setdata.seo_title,
                    releaseDate:that.data.setdata.create_time,
                    image: [
                        that.data.primaryurl+that.data.setdata.thumb
                        
                    ],
                    success: function () {
                        console.log('setPageInfo success');
                    },
                    fail: function (err) {
                        console.log('setPageInfo fail', err);
                    }
          })
         
        swan.hideLoading()

        
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