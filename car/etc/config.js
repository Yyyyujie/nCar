export default {
	//接口IP
    basePath: 'https://vjianfa.cn',
    // basePath: 'http://192.168.0.31:9003',
    // basePath: 'http://192.168.0.64:8080',
    //basePath: 'http://qiyuan.frpgz1.idcfengye.com',
	//接口地址
	InterfaceUrl:{
    //上传图片
    upload: '/api/uploadImg',
    //获取附近的店铺
    nearbyStore:'/api/shop/nearby',
    //获取地图标记
    mapShops: '/api/shop/mapShops',
    //店铺信息
    shopInfo:'/api/shop/info',
    //店铺全部信息
    shopDetail:'/api/shop/detail',
    //查看店铺评论
    shopEva:'/api/shop/comment/list', 
    //服务标准
    service:'/api/shop/standardService',
    //微信登录
    login:'/api/login',
    //order预约
    order:'/api/user/appointment',
    //发送验证码
    sendCode:'/api/user/sendValiCode',
    //绑定手机号
    bindPhone:'/api/user/bindPhone',
    //订单列表
    orderList:'/api/order/orderList',
    //取消排号
    cancelOrder:'/api/order/cancelOrder',
    //更改年龄
    updateAge:'/api/user/updateAge',
    //更改手机号码
    updateMoile:'/api/user/updateMobile',
    //更改性别
    updateSex:'/api/user/updateSex',
    //更改职业
    updateProfession:'/api/user/updateProfession',
    //个人中心 提交昵称头像
    uploadWxInfo:'/api/user/updateWxInfo',
    //评价列表
    commentList:'/api/user/comment/list',
    //去评价
    commentAdd: '/api/user/comment/add',
    //个人信息
    userInfo:'/api/user/info',
    //剪发师信息
    barberInfo:'/api/barber/info',
    //获取剪发师的评价
    barberCommon:'/api/barber/comment/list',
    //店铺的优惠券
    shopCoupon:'/api/coupon/shop/list',
    //用户结账的时候自己的优惠券
    userCoupon:'/api/coupon/member/list',
    //用户领取优惠券
    receiveCoupon:'/api/coupon/member/receiveCoupon',
    //优惠券页面推荐领取    
    shareCoupon:'/api/coupon/member/recommend',
    //获取店铺的服务项
    serviceItem:'/api/user/serviceItem',
    //优惠券适用店铺
    shopList:'/api/shop/list/recommendCouponId',
    //优惠券邀请信息
    invitation:'/api/coupon/recommend',
    //招商加盟
    join:'/api/shop/joinUs',
    //历史发型
    history:'/api/user/hairstyle/list',
    //支付
    pay:'/api/pay',
    //参考发型上传图片
    uploadHair:'/api/user/hairstyle/add',
    //用户评价领取优惠券
    getCou:'/api/coupon/evaluate',
    //查询订单的评论状态
    orderSelect:'/api/order/orderInfo',
    //判断用户是否绑定手机号码
    isBindPhone:'/api/user/isBindPhone',
    //获取店铺用户可领取的优惠券
    availableList:'/api/coupon/shop/availableList',
    //可以领取的cop
    allCoup:'/api/coupon/shop/inCommonUseCoupon',
    //兑换优惠券
    duihuan:'/api/coupon/member/exchangeCoupon'
	},
  //订单状态
  OrderStatus:{
    DONESTATUS: '0010',//已完成
    UNDOSTATUS: '0000',//待消费
    DOINGSTATUS: '0001',//服务中
    CANCELSTATUS: '1111',//已取消
  }
}