// pages/detail/detail.js
Page({

  /**
   * Page initial data
   */
  data: {
    reviews: [],
    restaurant: {},
    currentUser: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

      this.setData({
        currentUser: getApp().globalData.userInfo,
      })
    // This is code to pull from a database
    let tableName = "restaurants"

    let restaurant = new wx.BaaS.TableObject(tableName)

    let recordID = options.id

    // "then" is a promise. This means that the code will retrieve inforamtion from a database. After retrieving the data, we need to do somthing with it. ie. call a function
    restaurant.get(recordID).then((res) => {
      console.log("Located single restaurant",res);
        this.setData({ 
          restaurant: res.data
        })
        })
      
    //Using querying to pull all comments for this one story
    let tableReviews = 'reviews'
    let review = new wx.BaaS.TableObject(tableReviews)

    let query = new wx.BaaS.Query()
    // NB. The Index_id must match EXACTLY the naming in database
    query.compare('restaurant_id', '=', recordID)

    review.setQuery(query).find().then((res) => {
      console.log("Found all reviews for one restaurant",res);
        this.setData({ 
          // NB. Comments must relate to what was defined under data:[ ]
          // res.data."objects" must be used if I am calling an array
          reviews: res.data.objects
        })
        })

  },

  userInfoHandler(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      console.log("user", user);
      getApp().globalData.userInfo = user;
      this.setData({
        currentUser: user,
      })

    }, err => {
      
    })
  },

  createReview: function (e) {
    let content = e.detail.value.content
    console.log(e)
    let Reviews = new wx.BaaS.TableObject('reviews')
    let newReview = Reviews.create();
    const data = {
      rating: 5,
      content: content,
      user_id: this.data.currentUser.id,
      restaurant_id: this.data.restaurant.id,
    };
    newReview.set(data);

    newReview.save().then((res) => {
      //define the table data
      let newReviews = this.data.reviews
      newReviews.push(res.data)
      this.setData({
        reviews: newReviews
      })
    })

  }

})