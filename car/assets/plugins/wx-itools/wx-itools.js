import domain from '../../../etc/config.js'
/**
 * 封装 小程序api
 */
let wxItools = {
  /**
   * @param {Object}  默认配置
   * @baseUrl {String} 接口地址
   * */
  request(baseUrl, methods, data, callback) {
    if (!baseUrl || baseUrl == undefined) {
      console.log('路径不能为空!')
      return;
    }
    wx.request({
      url: domain.basePath + baseUrl,
      data: data,
      method: methods,
      header: {
        'content-type': methods == 'GET || get' ? 'application/json' : 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          let datas = res.data;
          if (datas.code == 201) {
            wx.login({
              success: function (res) {
                wx.setStorageSync('userMsg', {
                  code: res.code
                });
                let code=res.code;
                wx.request({
                  url: domain.basePath + domain.InterfaceUrl.login,
                  data:{
                    code: code,
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (ret) {
                    wx.setStorageSync('userMsg', {
                      code: code,
                      token: ret.data.data.token,
                      userInfo: ret.data.data.userInfo
                    });
                    data.token=ret.data.data.token;
                    if (ret.data.code == 200) {
                      wx.request({
                        url: domain.basePath + baseUrl,
                        data: data,
                        method: methods,
                        header: {
                          'content-type': methods == 'GET || get' ? 'application/json' : 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                         
                          if(res.data.code==200){
                            callback(res.data);
                          } else if (datas.code == 202 || datas.code == 203 || datas.code == 204) {
                            wx.showToast({
                              title: res.data.msg,
                              icon: 'none'
                            })
                          }
                        }
                      })

                    }
                  }
                  
                  })
              }
            })
          }
          // else if (datas.code == 205){
          //   wx.showToast({
          //     title: datas.msg,
          //     icon:'none'
          //   })
          //   setTimeout(function(){
          //     wx.navigateTo({
          //       url: '../war/war',
          //     })
          //   },1000)
            
          // }
          else if (datas.code == 202 || datas.code == 203 || datas.code == 204) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          } else {
            callback(datas);
          }
        } else {
          wx.showToast({
            title: res.errMsg,
            icon: 'none'
          })
        }
      },
      fail: function (err) {
        wx.showToast({
          title: '请求失败，请重试',
          icon: 'none'
        })
      }
    })
  },
  //上传
  uploadFile(baseUrl, file, name, data, callback) {
    if (!baseUrl || baseUrl == undefined) {
      console.log('路径不能为空!')
      return;
    }
    if (!file || file == undefined) {
      console.log('文件路径不能为空!')
      return;
    }
    wx.uploadFile({
      url: baseUrl,
      filePath: file,
      name: name ? name : getUuid(),
      formData: data,
      header: {
        "content-type": "multipart/form-data"
      },
      success: function (res) {
        if (res.statusCode==200){
          callback(JSON.parse(res.data));
        }else{
          wx.showToast({
            title: '',
          })
        }
        
      },
      fail: function (err) {
        callback(err)
      }
    })
  },
  //下载
  downloadFile(baseUrl, file, callback) {
    if (!baseUrl || baseUrl == undefined) {
      console.log('路径不能为空!')
      return;
    }
    if (!file || file == undefined) {
      console.log('文件路径不能为空!')
      return;
    }
    w.uploadFile({
      url: baseUrl,
      success: function (res) {
        callback(res);
      },
      fail: function (err) {
        callback(err)
      }
    })
  },
  //设置缓存
  setStorage(key, value) {
    wx.setStorage({
      key: "key",
      data: "value",
      success: function (res) {
        console.log('设置缓存成功')
      }
    })
  },
  //获取缓存
  getStorage(key, callback) {
    wx.getStorage({
      key: key,
      success: function (res) {
        callback(res)
      }
    })
  },
  //移除缓存
  removeStorage(key) {
    wx.getStorage({
      key: key,
      success: function (res) {
        console.log('key为:' + key + '移除成功')
      }
    })
  },
  //清除缓存
  clearStorage(key) {
    wx.clearStorage();
  },
  /*
  * 获取位置
  * isSeen {booeam} 是否打开地图查看位置
  * */
  getLocation(isSeen, callback) {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        if (isSeen) {
          wx.openLocation({
            latitude: res.latitude,
            longitude: res.longitude,
            scale: 18
          })
        } else {
          callback(res);
        }
      }
    })
  },
  //打开地图查看
  chooseLocation(callback) {
    wx.chooseLocation({
      success: function (res) {
        callback(res);
      }
    })
  },
  //拨打电话
  call(numBer) {
    wx.makePhoneCall({
      phoneNumber: numBer
    })
  },
  /*
  * 扫描二维码
  * isPic   是否从相册
  * isCode  一维码还是二维码
  * */
  scanCode(isPic, isCode, callback) {
    wx.scanCode({
      onlyFromCamera: isPic,
      scanType: isCode == 1 ? 'barCode' : 'qrCode',
      success: function (res) {
        callback(res);
      }
    })
  },
  /*
  * 消息提示框
  *
  * */
  showToast(title, index, image, mask) {
    switch (index) {
      case 0:
        icon = 'success';
        break;
      case 1:
        icon = 'loading';
        break;
      case 2:
        icon = 'none';
        break;
    }
    wx.showToast({
      title: title,
      icon: icon,
      image: image ? image : '',
      mask: mask ? mask : false,
      duration: 2000
    })
  },
  //隐藏消息框
  hideToast() {
    wx.hideToast()
  },
  //打开加载
  showLoading(title, mask) {
    wx.showToast({
      title: title,
      mask: mask ? mask : false
    })
  },
  //关闭加载
  hideLoading() {
    wx.hideLoading()
  },
  //打开对话框
  showModal(title, content, isQuit, quitCon, quitColor, tureText, tureColor, callback) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: isQuit ? isQuit : false,
      cancelText: quitCon ? quitCon : '取消',
      quitColor: quitColor ? quitColor : "#000000",
      confirmText: tureText ? tureText : '确定',
      confirmColor: tureColor ? tureColor : '#000000',
      success: function (res) {
        if (res.confirm) {
          callback({
            title: '确定',
            index: 1
          })
        } else {
          callback({
            title: '取消',
            index: 0
          })
        }
      }
    })
  },
  //打开底部菜单
  showActionSheet(arr, color, callback) {
    wx.showActionSheet({
      itemList: arr,
      itemColor: color ? color : '#000',
      success: function (res) {
        callback(res)
      },
      fail: function (res) {
        callback(res)
      }
    })
  },
  //保留当前页面，跳转到应用内的某个页面
  navigateTo(baseUrl, param) {
    if (param) {
      wx.navigateTo({
        url: baseUrl + '?' + this.setUrlPrmt(param)
      })
    } else {
      wx.navigateTo({
        url: baseUrl
      })
    }
  },
  //关闭当前页面，跳转到应用内的某个页面。
  redirectTo(baseUrl, param) {
    if (param) {
      wx.redirectTo({
        url: baseUrl + '?' + this.setUrlPrmt(param)
      })
    } else {
      wx.redirectTo({
        url: baseUrl
      })
    }

  },
  //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  switchTab(baseUrl) {
    wx.switchTab({
      url: baseUrl
    })
  },
  //关闭当前页面，返回上一页面或多级页面   num代表几级
  navigateBack(num) {
    wx.navigateBack({
      delta: num ? num : 1
    })
  },
  //关闭所有页面，打开到应用内的某个页面。
  reLaunch(baseUrl, param) {
    if (param) {
      wx.reLaunch({
        url: baseUrl + '?' + this.setUrlPrmt(param)
      })
    } else {
      wx.reLaunch({
        url: baseUrl
      })
    }
  },
  //当前页面下拉刷新
  startPullDownRefresh(callback) {
    wx.startPullDownRefresh({
      success: function () {
        callback()
      }
    })
  },
  //停止当前页面下拉刷新
  stopPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  //微信登录
  login(callback) {
    wx.login({
      success: function (res) {
        callback(res)
      }
    })
  },
  //校验session
  checkSession(callback) {
    wx.checkSession({
      success: function () {
        callback();
      },
      fail: function () {
        callback();
      }
    })
  },
  /*
  * 获取用户信息
  * withCredentials {Boolean} 是否带上登录态信息
  * */
  getUserInfo(withCredentials, callback) {
    wx.getUserInfo({
      withCredentials: withCredentials ? withCredentials : false,
      success: function (res) {
        callback(res)
      },
      fail: function (res) {
        callback(res)
      }
    })
  },
  //发起微信支付
  requestPayment(callback) {
    wx.requestPayment({
      'timeStamp': Date.parse(new Date()),
      'nonceStr': getUuid(),
      'package': MD5(getUuid()),
      'signType': 'MD5',
      'paySign': MD5(getUuid()),
      'success': function (res) {
        callback(res)
      },
      'fail': function (res) {
        callback(res)
      }
    })
  },
  setUrlPrmt(obj) {
    var _rs = [];
    for (var p in obj) {
      if (obj[p] != null && obj[p] != '') {
        _rs.push(p + '=' + obj[p])
      }
    }
    return _rs.join('&');
  },
  //处理图片路径
  headerUrl: function (url) {
    return domain.basePath + url

  },
  //随机32位数
  getUuid() {
    var len = 32;
    //32长度
    var radix = 16;
    //16进制
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  },
  //去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
  //trim('  1235asd',1)
  //result：1235asd
  trim(str, type) {
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  },
  //检测字符串
  //checkType('165226226326','phone')
  //result：false
  //大家可以根据需要扩展
  checkType(str, type) {
    switch (type) {
      case 'email':
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case 'phone':
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
      case 'tel':
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case 'number':
        return /^[0-9]$/.test(str);
      case 'english':
        return /^[a-zA-Z]+$/.test(str);
      case 'text':
        return /^\w+$/.test(str);
      case 'chinese':
        return /^[\u4E00-\u9FA5]+$/.test(str);
      case 'lower':
        return /^[a-z]+$/.test(str);
      case 'upper':
        return /^[A-Z]+$/.test(str);
      default:
        return true;
    }
  },
  //到某一个时间的倒计时
  //getEndTime('2017/7/22 16:0:0')
  //result："剩余时间6天 2小时 28 分钟20 秒"
  getEndTime(endTime) {
    let startDate = new Date(); //开始时间，当前时间
    let endDate = new Date(endTime); //结束时间，需传入时间参数
    let t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
    let d = 0,
      h = 0,
      m = 0,
      s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor(t / 1000 / 60 / 60 % 24);
      m = Math.floor(t / 1000 / 60 % 60);
      s = Math.floor(t / 1000 % 60);
    }
    return { d, h, m, s };
  },
  //清除对象中值为空的属性
  //filterParams({a:"",b:null,c:"010",d:123})
  //Object {c: "010", d: 123}
  filterParams(obj) {
    let _newPar = {};
    for (let key in obj) {
      if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
        _newPar[key] = obj[key];
      }
    }
    return _newPar;
  }
};
export default {
  wxItools
}