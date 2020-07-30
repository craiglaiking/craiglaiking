// pages/index/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    restaurants: []
  },

// binded to clicking on a story
  showRestaurant(event) {
    let data = event.currentTarget.dataset;
    let id = data.id;

    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    let tableName = "restaurants"
    let restaurant = new wx.BaaS.TableObject(tableName)
    restaurant.find().then((res) => {
      console.log("Found all restaurants", res)
      this.setData({
        restaurants: res.data.objects
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})