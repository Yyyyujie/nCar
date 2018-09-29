import WxValidate from './assets/plugins/wx-validate/WxValidate'
import WxService from './assets/plugins/wx-service/WxService'
import HttpResource from './helpers/HttpResource'
import HttpService from './helpers/HttpService'
import __config from './etc/config'
import wxItools from './assets/plugins/wx-itools/wx-itools.js'
//app.js
App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null
  },
  renderImage(path) {
    // if (!path) return ''
    if (path.indexOf('http') !== -1) return path
    return `${this.__config.basePath}${path}`
  },
  renderMel(m){
    if (!m) {
      return '0m'
    } else if (m.length < 4){
      return m + 'm'
    }else{
      return (m / 1000).toString().substring(0, (m / 1000).toString().indexOf(".")+2)+'km'
    }
    
  },
  WxValidate: (rules, messages) => new WxValidate(rules, messages),
  HttpResource: (url, paramDefaults, actions, options) => new HttpResource(url, paramDefaults, actions, options).init(),
  HttpService: new HttpService({
    baseURL: __config.basePath,
  }),
  WxService: new WxService,
  __config,
  wxItools,
})