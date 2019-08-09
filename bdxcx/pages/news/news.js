const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        primaryurl: app.globalData.primaryurl,
        navbar: ["企业新闻", "行业新闻"],
        currentIndex: 0,//tabbar索引 
        newsOne: [],
        newsTwo: [],
        newpage1: 2,
        newpage2: 2,
        pagestart1: true,
        pagestart2: true,
    },
    navbarTab: function (e) {
        var that = this
        that.setData({
            currentIndex: e.currentTarget.dataset.index
        })
        console.log(that.data.currentIndex)
    },
    newsDetailed: function (e) {
        console.log(e)
        swan.navigateTo({
            url: '../newsDetailed/newsDetailed?index=' + e.target.dataset.index + "&type=" + this.data.currentIndex,
        });
    },
    getdataLoad: function (id) {
        //    监听页面加载的生命周期函数
        var that = this
        swan.request({
            url: app.globalData.primaryurl + "/newsList", // 新闻
            method: 'GET',
            dataType: 'json',
            data: {
                typeid: id
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                if (id == 0) {
                    that.setData({
                        newsOne: res.data
                    })
                } else {
                    that.setData({
                        newsTwo: res.data
                    })
                }
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
    },
    onLoad: function () {
        var that = this
        swan.showLoading({
            title: '数据载入中',
        })
        that.getdataLoad(0);
        that.getdataLoad(1);
    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数

    },
    onShow: function () {
        // 监听页面显示的生命周期函数
         var that=this
        swan.request({
            url: that.data.primaryurl + '/moreSeo', // 首页seo
            method: 'GET',
            dataType: 'json',
            data: {
                name: "资讯"
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res)
                 swan.setPageInfo({
                    title: res.data.seo_title,
                    keywords: res.data.keywords,
                    description:res.data.description,
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
    },
    onHide: function () {
        // 监听页面隐藏的生命周期函数

    },
    onUnload: function () {
        // 监听页面卸载的生命周期函数

    },
    onPullDownRefresh: function () {
        // 监听用户下拉动作

        // 监听用户下拉动作
        //下拉刷新
        // var that = this
        // swan.showNavigationBarLoading() //在标题栏中显示加载
        // that.getdataLoad(0);
        // that.getdataLoad(1); //再次调用请求方法重置数组
        // that.setData({
        //   newpage1:0,
        //   newpage2:0,
        //   pagestart1:true,
        //   pagestart2:true
        // })
        // setTimeout(function(){
        //             // complete
        //             swan.hideNavigationBarLoading() //完成停止加载
        //             swan.stopPullDownRefresh() //停止下拉刷新
        // },1500);
        // console.log(that.data.newsOne)
    },
    onReachBottom: function () {
        var that = this;
        // 页面上拉触底事件的处理函数

        if (that.data.currentIndex == 0) {
            if (that.data.pagestart1 == true) {
                swan.showLoading({
                    title: '数据载入中',
                })
                let downindex = that.data.newpage1++
                swan.request({
                    url: app.globalData.primaryurl + "/newsList",  // 公司新闻
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        typeid: 0,
                        page: downindex
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        if (res.data != "") {
                            let newsOne = that.data.newsOne
                            console.log(res)
                            for (var i = 0; i < res.data.length; i++) {
                                console.log(i)
                                newsOne.push(res.data[i])
                            }
                            that.setData({
                                newsOne: newsOne
                            })
                            console.log(that.data.newsOne)
                            swan.hideLoading()
                        } else {
                            that.setData({
                                pagestart1: false,
                            })
                            swan.showToast({
                                title: '没有更多数据了',
                                icon: 'none',
                                duration: 1500
                            })
                        }
                    },
                    fail: function (err) {
                        swan.showToast({
                            title: '错误信息：' + err.errMsg,
                            icon: 'none',
                            duration: 1500,
                        })

                    }
                });
            } else {
                swan.showToast({
                    title: '没有更多数据了',
                    icon: 'none',
                    duration: 1500
                })
            }
        } else {
            if (that.data.pagestart2 == true) {
                swan.showLoading({
                    title: '数据载入中',
                })
                let downindex = that.data.newpage2++
                swan.request({
                    url: app.globalData.primaryurl + "/newsList", // 企业新闻
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        typeid: 1,
                        page: downindex
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        if (res.data != "") {
                            let newsTwo = that.data.newsTwo
                            console.log(res)
                            for (var i = 0; i < res.data.length; i++) {
                                console.log(i)
                                newsTwo.push(res.data[i])
                            }
                            that.setData({
                                newsTwo: newsTwo
                            })
                            swan.hideLoading()
                        } else {
                            that.setData({
                                pagestart2: false,
                            })
                            swan.showToast({
                                title: '没有更多数据了',
                                icon: 'none',
                                duration: 1500
                            })
                        }
                    },
                    fail: function (err) {
                        swan.showToast({
                            title: '错误信息：' + err.errMsg,
                            icon: 'none',
                            duration: 1500
                        })
                    }
                });
            } else {
                swan.showToast({
                    title: '没有更多数据了',
                    icon: 'none',
                    duration: 1500
                })
            }
        }

    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }

})
