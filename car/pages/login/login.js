// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      loginName:'',
      password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.login({
        success:function(res){
         wx.setStorage({
           key: 'code',
           data: res.code,
         })
        }
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

  },
  //获取手机号码和密码
  phone:function(e){
    let str = e.currentTarget.dataset.type;
    this.setData({
      [str]: e.detail.value
    })
  },
  //点击登录事件
  login:function(){
    let mobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    let that = this;
    console.log(this.data.loginName)
    if(mobile.test(this.data.loginName)){
      if(this.data.password.length>=6){
        app.wxItools.wxItools.request(app.__config.InterfaceUrl.login, 'POST', {
          loginName: that.data.loginName,
          password: that.data.password,
          code:wx.getStorageSync('code')
          // token: wx.getStorageSync('userMsg').token
        }, (ret) => {
            console.log(ret)
            if(ret.code==200){
                wx.setStorage({
                  key: 'userInfo',
                  data: ret.data.userInfo,
                });
              wx.setStorage({
                key: 'loginInfo',
                data: {
                  phone: that.data.loginName,
                  password: that.data.password
                },
              });
              wx.setStorage({
                key: 'token',
                data: ret.data.token,
              })
            }
            wx.reLaunch({
              url: '../index/index',
            })
        })
      }
    }else{
      wx.showToast({
        title: '请输入正确的手机号码',
        icon:'none'
      })
    }
    
    // wx.switchTab({
    //   url: '../index/index',
    // })
  },
  //点击注册
  reg:function(e){
    wx.reLaunch({
      url: e.currentTarget.dataset.page,
    })
  }
})