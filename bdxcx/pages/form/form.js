Component({
    properties: {
        propName: { // 属性名
            type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: 'val', // 属性初始值（必填）
            observer: function (newVal, oldVal) {
                // 属性被改变时执行的函数（可选）
            }
        }
    },

    data: {
        terms: false,  //留言提交按钮是否禁用状态
        username: "",
        phone: "",
        msg: "",

    }, // 私有数据，可用于模版渲染

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },

    detached: function () { },

    methods: {
        nameChange: function (e) {
            this.setData({    //项目介绍表单
                username: e.detail.value
            })
        },
        phoneChange: function (e) {
            this.setData({    //留言表单
                phone: e.detail.value
            })
        },
        msgChange: function (e) {
            this.setData({    //项目介绍表单
                msg: e.detail.value
            })
        },

        onTap: function () {
            var userName = this.data.username;
            var mobile = this.data.phone;
            var msg = this.data.msg;
            var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
            var name = /^[u4E00-u9FA5]+$/;
            if (userName == '') {
                swan.showToast({
                    title: '请输入用户名',
                    icon: 'none',
                    duration: 1500,
                })
                return false
            } else if (mobile == '') {
                swan.showToast({
                    title: '手机号不能为空',
                    icon: 'none',
                    duration: 1500,
                })

                return false
            } else if (mobile.length != 11) {
                swan.showToast({
                    title: '手机号码有误！',
                    icon: 'none',
                    duration: 1500
                })
                return false;
            } else if (!phonetel.test(mobile)) {
                swan.showToast({
                    title: '手机号码有误！',
                    icon: 'none',
                    duration: 1500
                })
                return false;
            } else {
                swan.request({
                    url: 'https://small.dailongint.com/addMsg', // 留言提交
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        "name": userName,
                        "mobile": mobile,
                        "content": msg
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        console.log(res)
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

        },

        //        radioChange:function(e){
        //         var that=this
        //         if (e.detail.value == '') {
        //          that.setData({
        //             terms:true
        //         })
        //         }                                         //条款勾选
        //         else {
        //         that.setData({
        //             terms:false
        //         })
        //         }
        //         console.log(e.detail.value);

        // },
    }
});