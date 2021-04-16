//app.js

App({

  onLaunch: function () {
    wx.cloud.init({
      env: 'toilet-1gnno22xffab4f81',
      traceUser: true
    })
    wx.login({
      success: res => {
        console.log("登陆成功:", res.code);
        wx.switchTab({
          url: '/pages/my/my',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '登陆失败，请检查网络'
        })
      }
    })
  },
  globalData: {
    isLogin: false
  }
})
