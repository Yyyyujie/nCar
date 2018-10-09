// pages/reg/reg.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      phone:'',
      code:1234,
      password:'',
      againPass:'',
      send: '获取验证码',
      btnStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //手机号码
  phone:function(e){
    
    let str = e.currentTarget.dataset.type
    this.setData({
      [str]: e.detail.value
    })
  },
  //点击注册
  reg: function (e) {
      
    wx.reLaunch({
      url: e.currentTarget.dataset.page
    })
  },
  login:function(){
    let that=this;
    console.log(this.data.phone, this.data.code, this.data.password);
    let mobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (mobile.test(this.data.phone)){
    }else{
      wx.showToast({
        title: '请输入正确的手机号码',
        icon:'none'
      })
    }
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.reg, 'POST', {
      loginName:that.data.phone,
      password:that.data.password,
      againPwd:that.data.againPass,
      code:that.data.code
      // token: wx.getStorageSync('userMsg').token
    }, (ret) => {
        if(ret.code==200){
          wx.navigateTo({
            url: '../index/index',
          })
        }
    })
  },
  //点击获取验证码
  sendCode: function () {
    // wx.showLoading({
    //   title: '发送中...',
    //   mask: true
    // })
    let mobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (mobile.test(this.data.phone)) {
      let sendCon = this.data.send;
      let that = this;
      that.secondTime();
      if (sendCon == "获取验证码") {
        // app.wxItools.wxItools.request(app.__config.InterfaceUrl.code, 'GET', {
        //   loginName: that.data.phone,
        // }, (ret) => {
        //   console.log(ret)
        //   wx.hideLoading();
        //   if (ret.code == 200) {
        //     wx.showToast({
        //       title: '验证码已发送到' + that.data.phone + '请注意查收',
        //       icon: 'none'
        //     })
        //     that.secondTime();
        //   }
        // })
      }
    } else {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
    }

  },
  //发送验证码的倒计时
  secondTime: function () {
    let that = this;
    let second = 60;
    that.setData({
      send: second + "S后重发"
    })
    let inter = setInterval(function () {
      second--;
      that.setData({
        send: second + "S后重发"
      })
      if (second == 0) {
        clearInterval(inter);
        that.setData({
          send: "获取验证码",
          btnStatus: false
        })
      }
    }, 1000);
    that.setData({
      btnStatus: true
    })
  },
})