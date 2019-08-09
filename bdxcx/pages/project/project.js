const app = getApp()
Page({
    data: {
        navbar: ["戴龙项目", "", ""],
        primaryurl: app.globalData.primaryurl,
        currentIndex: 0,//tabbar索引 
        projectList: [],
        pageindex: 0,
        pagestart: true
    },

    newsDetailed: function (e) {
        swan.navigateTo({
            url: '../projectDetailed/projectDetailed?index=' + e.target.dataset.index,
        });
    },
    getdataLoad: function () {
        var that = this
        swan.showLoading({
            title: '数据载入中',
        })
        swan.request({
            url: app.globalData.primaryurl + '/proList', // 项目列表
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
    onLoad: function () {
        // 监听页面加载的生命周期函数
        this.getdataLoad()
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
                name: "项目"
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
        swan.hideLoading()
    },
    onHide: function () {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function () {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function (e) {
        var that = this
        // 监听用户下拉动作
        //下拉刷新
        swan.showNavigationBarLoading() //在标题栏中显示加载
        that.getdataLoad() //再次调用请求方法重置数组
        that.data.pagestart = true;
        that.data.pageindex = 0;
        setTimeout(function () {
            // complete
            swan.hideNavigationBarLoading() //完成停止加载
            swan.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
    },
    onReachBottom: function () {
        // var that=this;
        //  swan.showLoading({
        //     title: '数据载入中',
        // })
        // 页面上拉触底事件的处理函数
        // let pageindex=that.data.pageindex++
        // if(that.data.pagestart ==true){
        //     swan.request({
        //     url: app.globalData.primaryurl+'/proList', // 项目列表
        //     method: 'GET',
        //     dataType: 'json',
        //     data: {
        //         page:pageindex
        //     },
        //     header: {
        //         'content-type': 'application/json' // 默认值
        //     },
        //     success: function (res) {
        //         if(res.data!=""){
        //             let project=that.data.projectList
        //             console.log(res)
        //             for(var i=0;i<res.data.length;i++){
        //                 console.log(i)
        //                 project.push(res.data[i])
        //             }
        //             that.setData({
        //             projectList:project
        //             })
        //             swan.hideLoading()
        //         }else{
        //             that.setData({
        //                 pagestart:false
        //             })
        //             swan.showToast({
        //             title: '没有更多数据了',
        //             icon:"none",
        //             duration: 1500
        //         })
        //         }
        //     },
        //     fail: function (err) {
        //          swan.showToast({
        //             title: '错误信息：' + err.errMsg,
        //             icon: 'none',
        //             duration: 1500
        //         })
        //     }
        //  });
        // }else{
        //     swan.showToast({
        //             title: '没有更多数据了',
        //             icon: 'none',
        //             duration: 1500
        //     })
        // }

    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});