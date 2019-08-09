Component({
    properties: {
        propName: { // 属性名
            type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: 'tabBarComponent', // 属性初始值（必填）
            observer: function (newVal, oldVal) {
                // 属性被改变时执行的函数（可选）
            }
        }
    },

    data: {
        age: 1,
        tabBar: [
            {
                "current": 0,
                "pagePath": "/pages/index/index",
                "text": "首页",
                "iconPath": "../../images/index.png",
                "selectedIconPath": "../../images/index_active.png"
            },
            {
                "current": 1,
                "pagePath": "/pages/project/project",
                "text": "项目",
                "iconPath": "../../images/project.png",
                "selectedIconPath": "../../images/project_active.png"
            },
            {
                "current": 0,
                "pagePath": "/pages/news/news",
                "text": "资讯",
                "iconPath": "../../images/form.png",
                "selectedIconPath": "../../images/form_active.png"
            }
        ]
    }, // 私有数据，可用于模版渲染

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },

    detached: function () { },

    methods: {
        onTap: function (event) {
            // let that = this;
            // let index = event.currentTarget.dataset.index;
            // that.data.tabBar[index].current = 0;
            // this.setData({
            //     tabBar:that.data.tabBar
            // });
        },
        callPhone: function () {
            let callPhone = getApp().globalData.callPhone;
            callPhone();
        },
    }
});
