// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:'',
    latitude:'',
    markers:[],
    markStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.login({
      success:function(res){
        wx.setStorageSync('code', res.code)
        app.wxItools.wxItools.request(app.__config.InterfaceUrl.login, 'POST', {
          loginName: wx.getStorageSync('loginInfo').phone,
          password: wx.getStorageSync('loginInfo').password,
          code: res.code
          // token: wx.getStorageSync('userMsg').token
        }, (ret) => {
          console.log(ret)
          if (ret.code == 200) {
            wx.setStorage({
              key: 'token',
              data: ret.data.token,
            })
          }
        })
      }
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    });
    this.map();
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
  //获取地图地标
  map: function () {
    let that = this;
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.map, 'GET', {
     token:wx.getStorageSync('token')
    }, (ret) => {
      console.log(ret);
      ret.data.forEach(function (item, index) {
        let str = {
          iconPath: "../../images/mark.png",
          id: index,
          markId: item.id,
          // latitude: parseFloat(item.latitude),
          latitude:'37.7998829469',
          longitude:'112.5890922546',
          // longitude: parseFloat(item.longitude),
          width: 30,
          height: 30,
          store: item.linkName,
          selectIconPath: '../../images/mark_selected.png',
          waitPerson: item.serviceCount,
          address: item.address,
          status: false
        }
        that.data.markers.push(str);
        that.setData({
          // index: that.data.index + 1,
          markers: that.data.markers,
        })
        console.log(that.data.markers)
      })
    })
  },
  //点击地图上的标记
  markertap(e) {
    let str = "markers[" + e.markerId + "].status";
    let icon = "markers[" + e.markerId + "].iconPath"
    let that = this;
    this.data.markers.forEach(function (item, index) {
      if (index != e.markerId) {
        let status = "markers[" + index + "].status";
        let iconpath = "markers[" + index + "].iconPath";
        that.setData({
          [status]: false,
          [iconpath]: '../../images/mark.png'
        })
      }
    });
    this.setData({
      markStatus: !this.data.markers[e.markerId].status,
      [str]: !this.data.markers[e.markerId].status,
      markIndex: e.markerId,
      [icon]: this.data.markers[e.markerId].status ? '../../images/mark.png' : this.data.markers[e.markerId].selectIconPath
    });
    // this.data.list[e.markerId]
  },
  //调起扫一扫
  ss:function(){
    wx.scanCode({
      success:function(){
        console.log(111)
      }
    })
  }
})