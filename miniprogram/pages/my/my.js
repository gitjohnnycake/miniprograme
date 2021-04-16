const app = getApp()
const db = wx.cloud.database()
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      openid: '',
      userInfo: {},
      gender: '',
      hasUserInfo: false
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
    })
  },
  // 用户授权
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善用户信息',
      success: res => {
        app.globalData.isLogin = true
        this.setData({
          userInfo: res.userInfo,
          gender: res.userInfo.gender,
          hasUserInfo: true
        })
        this.getOpenid()
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  },
  // 获取用户openid
  getOpenid() {
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: res => {
        let openid = res.result.openid
        db.collection('user').where({
          _openid: openid
        })
        .get()
        .then(res => {
          if (res.data.length == 0) {
            this.addOpenID()
          }else {
            wx.setStorageSync('user', res.data[0])
          }
        })
        this.setData({
          openid
        })
      }
    })
  },
  addOpenID() {
    let user = {
      nickName: this.data.userInfo.nickName,
      avatarUrl: this.data.userInfo.avatarUrl,
      gender: this.data.userInfo.gender,
    }
    wx.setStorageSync('user', user)
    db.collection('user')
    .add({
      data: user
    })
    .then(res => {
      console.log(res);
    })
  },

  // 关于
  goAbout () {
    wx.navigateTo({
      url: '../about/about',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})