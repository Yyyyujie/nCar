// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      mask:false
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
  // 点击进入二级页面
  opennewPage:function(e){
      wx.navigateTo({
        url: e.currentTarget.dataset.page
      })
  },
  //点击说明书
  intrduce:function(e){
    this.setData({
      mask: e.currentTarget.dataset.mask ? e.currentTarget.dataset.mask:false
    })
  },
  //修改头像
  chengeHead:function(){
    wx.chooseImage({
      success: function(res) {
        console.log(res)
      }
    })
  }
})