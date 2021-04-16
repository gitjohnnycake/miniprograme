// 引入SDK核心类
var QQMapWX = require('../../map/qqmap-wx-jssdk');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: '2XVBZ-DAICG-PD4QJ-IPYIL-3H4ES-3SBY4' // 必填
});
//index.js
const app = getApp()
Page({
  data: {
    choseValue: '',
    isShow: '',
    latitude: '',
    longitude: '',
    good: '0',
    bad: '0',
    isGetUserLocation: false,
    toiletData: []
  },

  onLoad: function () {
    this.userGetSetting()
    wx.showShareMenu({
      withShareTicket: true,
    })
  },
  onShow: function () {
    if (!app.globalData.isLogin) {
      wx.showToast({
        icon: 'loading',
        title: '请先登陆',
        success: res => {
          setTimeout(() => {
            wx.switchTab({
              url: '../my/my',
            })
          }, 1000)
        }
      })
    }
  },
  // 调用地图接口
  getMap() {
    qqmapsdk.search({
      keyword: '厕所',
      page_size: 20,
      success: res => {
        this.setData({
          toiletData: res.data
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
 
  // 选择地点打开地图
  showMap(e) {
    this.setData({
      latitude: this.data.toiletData[e.currentTarget.dataset.index].location.lat,
      longitude: this.data.toiletData[e.currentTarget.dataset.index].location.lng
    })
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        const lat = this.data.latitude
        const lng = this.data.longitude
        wx.openLocation({
          latitude: lat,
          longitude: lng,
          scale: 18
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  // 用户进行授权
  userGetSetting() {
    wx.getSetting({
      success: res => {
        if (!res.authSetting["scope.userInfo"] && res.authSetting["scope.userLocation"]) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: res => {
              console.log("请求信息成功", res);
            },
            fail: err => {
              console.log("请求信息失败", err);
              this.showModal()
            }
          })
        } else if (res.authSetting["scope.userInfo"] && !res.authSetting["scope.userLocation"]) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: res => {
              console.log("请求地址成功", res);
              this.getMap()
            },
            fail: err => {
              console.log("请求地址失败", err);
              this.showModal()
            }
          })
        } else if (!res.authSetting["scope.userInfo"] && !res.authSetting["scope.userLocation"]) {
          wx.authorize({
            scope: [
              'scope.userInfo',
              'scope.userLocation'
            ],
            success: res => {
              console.log("请求信息地址成功", res);
            },
            fail: err => {
              console.log("请求信息地址失败", err);
              this.showModal()
            }
          })
        }
      },
      fail: err => {
        wx.showToast({
          title: '授权失败，请重新授权',
        })
      }
    })
  },
  // 提示授权信息
  showModal() {
    wx.showModal({
      content: '需要授权信息进行定位',
      success: res => {
        if (res.confirm) {
          wx.openSetting({
            success: {}
          })
        } else {
          console.log("取消");
          this.userGetSetting()
        }
      }
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.userGetSetting()
    this.getMap()
    wx.stopPullDownRefresh({
      success: res => { }
    })
  }
})
