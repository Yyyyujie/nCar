// pages/eva/eva.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabList:[
        {
          name:'发出留言',
          index:0
        },{
          name:'收到留言',
          index:1
        }
      ],
      tabSelect:0,
      list:[
        {
          to:'张三',
          time:'2018-09-10 00:00',
          content:'快点把车挪走，我要出去'
        }
      ]
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
  //点击tab切换
  tabToggle:function(e){
    this.setData({
      tabSelect:e.currentTarget.dataset.index
    })
  }
})