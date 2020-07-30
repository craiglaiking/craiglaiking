//app.js
App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    // enables login, payment, and other features
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)

    const clientID = 'a0cae729d2cc3f2f52e1' // The ClientID received by the backend
    wx.BaaS.init(clientID)

    wx.BaaS.auth.loginWithWechat().then(user => {
      //save user data to globalData
      this.globalData.userInfo = user;
      // save user data to phone storage
      // two parameters: (key, data)
      wx.setStorageSync("userInfo",user);
      console.log("logged in from app.js", user);
  }, err => {
    console.log("fail login");
  })
},

  globalData: {
    // retrieve userInfo storage, one paramter: key
    userInfo: wx.getStorageSync("userInfo") || null,
  }
  
})
