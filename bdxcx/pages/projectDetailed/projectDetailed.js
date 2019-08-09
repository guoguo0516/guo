var bdParse = require('../../bdParse/bdParse.js');
const app = getApp()

Page({
    data: {
        primaryurl: app.globalData.primaryurl,
        index: "", //项目页面跳转参数
        projectbanner: [],
        navbar: ["项目介绍", "加盟优势", "加盟支持", "加盟条件"],
        currentIndex: 0,//tabbar索引 
        setdata: {},
        switchIndicateStatus: true,
        switchAutoPlayStatus: true,
        switchDuration: 500,
        autoPlayInterval: 3000,
        toView: '',
        terms: false, //模态框是否勾选条款
        showModal: false, //模态框初始状态
        modalval: "", //模态框表单
        phoneval: "", //项目介绍表单
        infoRecommend: []//新闻推荐
    },
    navbarTab: function (e) {
        var that = this
        that.setData({
            currentIndex: e.currentTarget.dataset.index
        })

    },
    // radioChange:function(e){
    //             var that=this
    //             if (e.detail.value == '') {
    //              that.setData({
    //                  terms:false

    //             })
    //             }                      //是否勾选条款
    //             else {
    //             that.setData({
    //                 terms:true
    //             })
    //             }
    //           

    //     },      
    showDialogBtn: function () {
        this.setData({
            showModal: true
        })

    },//点击显示模态框
    inputChange: function (e) {
        this.setData({
            modalval: e.detail.value
        })

    },//模态框表单
    phoneChange: function (e) {
        this.setData({
            phoneval: e.detail.value
        })

    },//项目介绍表单




    preventTouchMove: function () {

    },//弹出框蒙层截断touchmove事件

    hideModal: function () {
        this.setData({
            showModal: false
        });
    },//隐藏模态对话框

    onCancel: function () {
        this.hideModal();
    },//对话框取消按钮点击事件

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
    onConfirm: function (e) {

        var that = this
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        var modalval = that.data.modalval;
        var terms = that.data.terms;
        if (modalval.length == 0) {
            swan.showToast({
                title: '请输入手机号！',
                icon: 'none',
                duration: 1500
            })
            return false;
        } else if (modalval.length != 11) {
            swan.showToast({
                title: '手机号码有误！',
                icon: 'none',
                duration: 1500
            })
            return false;
        } else if (!myreg.test(modalval)) {
            swan.showToast({
                title: '手机号码有误！',
                icon: 'none',
                duration: 1500
            })
            return false;
        }
        // else if(terms ==false){
        //      swan.showToast({
        //         title: '请阅读并同意条款!',
        //         icon: 'none',
        //         duration: 1500
        //       })
        //      return false;}
        else {

            swan.request({
                url: app.globalData.primaryurl + '/addMsg', // 留言提交
                method: 'POST',
                dataType: 'json',
                data: {
                    "name": "",
                    "mobile": modalval,
                    "content": "",
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    that.hideModal();
                    swan.showToast({
                        title: res.data.msg,
                        icon: 'success',
                        duration: 1500

                    })

                },
                fail: function (err) {
                    swan.showToast({
                        title: '错误信息：' + err.data.msg,
                        icon: 'none',
                        duration: 1500
                    })
                }
            });
        }


    },//底部模态框手机号码提交



    phoneform: function (e) {
        var that = this
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        var phoneval = that.data.phoneval;
        var terms = that.data.terms;
        if (phoneval.length == 0) {
            swan.showToast({
                title: '请输入手机号！',
                icon: 'none',
                duration: 1500
            })
            return false;
        } else if (phoneval.length != 11) {
            swan.showToast({
                title: '手机号码有误！',
                icon: 'none',
                duration: 1500
            })
            return false;
        } else if (!myreg.test(phoneval)) {
            swan.showToast({
                title: '手机号码有误！',
                icon: 'none',
                duration: 1500
            })
            return false;
        }
        // else if(terms ==false){
        //      swan.showToast({
        //         title: '请阅读并同意条款!',
        //         icon: 'none',
        //         duration: 1500
        //       })
        //      return false;}
        else {
            swan.request({
                url: app.globalData.primaryurl + '/addMsg', // 留言提交
                method: 'POST',
                dataType: 'json',
                data: {
                    "name": "",
                    "mobile": phoneval,
                    "content": "",
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    that.hideModal();
                    swan.showToast({
                        title: res.data.msg,
                        icon: 'success',
                        duration: 1500

                    })
                },
                fail: function (err) {
                    swan.showToast({
                        title: '错误信息：' + err.data.msg,
                        icon: 'none',
                        duration: 1500
                    })
                }
            });
        }

    },//项目介绍手机号码提交


    getbanner: function (index) {
        var that = this
        swan.request({
            url: app.globalData.primaryurl + '/getBanner', // 项目banner
            method: 'GET',
            dataType: 'json',
            data: {
                typeid: index
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                that.setData({
                    projectbanner: res.data
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

    },//获取轮播图
    getdata: function (index) {
        var that = this

        swan.request({
            url: app.globalData.primaryurl + '/proDetail',//项目详情请求
            method: 'GET',
            dataType: 'json',
            data: {
                id: index
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res)
                that.setData({
                    setdata: res.data
                })

                var article = that.data.setdata.advant;
                var introduction = that.data.setdata.introduction;
                var support = that.data.setdata.support;
                var conditions = that.data.setdata.conditions;
                bdParse.bdParse('introduction', 'html', introduction, that, 5)
                bdParse.bdParse('article', 'html', article, that, 5)
                bdParse.bdParse('support', 'html', support, that, 5)
                bdParse.bdParse('conditions', 'html', conditions, that, 5)
                swan.setNavigationBarTitle({
                    title: that.data.setdata.name
                });


            },
            fail: function (err) {
                swan.showToast({
                    title: '错误信息：' + err.errMsg,
                    icon: 'none',
                    duration: 1500
                })
            }
        });
    },//获取项目数据
    getinfoRecommend(index) {
        var that = this;
        swan.request({
            url: app.globalData.primaryurl + '/proRecommend', // 底部相关推荐
            method: 'GET',
            dataType: 'json',
            data: {
                type: index,
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {

                that.setData({
                    infoRecommend: res.data
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
    },//获取底部推荐
    newsDetailed: function (e) {
        swan.navigateTo({
            url: '../newsDetailed/newsDetailed?index=' + e.target.dataset.index + "&type=" + e.target.dataset.typeid,
        });
    }, //推荐跳转










    onLoad: function (options) {
        // 监听页面加载的生命周期函数

        swan.showLoading({
            title: '数据载入中',
        })
        var index = options.index
        var that = this
        that.getbanner(index)
        that.getdata(index)
        that.getinfoRecommend(index)





    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函
        swan.hideLoading()


    },
    onShow: function () {
        // 监听页面显示的生命周期函数
         var that=this
        setTimeout(function(){
          swan.setPageInfo({
                    title: that.data.setdata.seo_title,
                    keywords: that.data.setdata.keywords,
                    description:that.data.setdata.description,
                    releaseDate:that.data.setdata.created_time,
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
        }, 1500);
        
          
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