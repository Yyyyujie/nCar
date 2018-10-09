// pages/ewm/addOrder/addOrder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["山西省", '太原市', '小店区'],
    customItem: '全部',
    address:'',
    name:'',
    phone:'',
    emmailCode:''
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //获取信息
  mesage:function(e){
    let str = e.currentTarget.dataset.type;
    this.setData({
      [str]:e.detail.value
    })
  },
  //确认订单
  add:function(){
    let that = this;
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.addOrder, 'POST', {
      userName:that.data.name,
      postalCode:that.data.emmailCode,
      provinceName:that.data.region[0],
      cityName: that.data.region[1],
      countyName: that.data.region[2],
      detailInfo:that.data.address,
      nationalCode:'',
      telNumber:that.data.phone
    }, (ret) => {
        console.log(ret)
    })
  }
})