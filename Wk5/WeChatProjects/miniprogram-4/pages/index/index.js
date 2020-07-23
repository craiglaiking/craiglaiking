//index.js
//获取应用实例
const app = getApp()

Page({
  //Always set a data block --> NB for data binding
  data: {
    // Stories will be an array of values. Thus, use []
    stories: []
  },
  //...
  // binded to clicking on a story
  showStory(event) {
    let data = event.currentTarget.dataset;
    let id = data.id;

    wx.navigateTo({
      url: `/pages/story/story?id=${id}`
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  // This is the function I want the MP to perform after reading the data from the API.  This same function will be used when reading from a database.
    // getRequestData: function (res) { 
    //   console.log(res);
    //   this.setData({ 
    //     stories: res.data.objects
    //   });
    // },

  onLoad: function () {
    // This was code to pull from an API
      // let page = this;
      // const request = {
      //   header: {'Authorization':'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'},
      //   url: `https://cloud.minapp.com/oserve/v1/table/84988/record/`, 
      //   method: 'GET',
      //   success: page.getRequestData
      // }
      // wx.request(request);

    // This is code to pull from a database
    let tableName = 'Index'
    
    // Declare a variable which will be used to find the data. The vribale can be named anything
    let story = new wx.BaaS.TableObject(tableName)
    
    // "then" is a promise. This means that the code will retrieve inforamtion from a database. After retrieving the data, we need to do somthing with it. ie. call a function
    story.find().then((res) => {
      console.log(res);
        this.setData({ 
          //Stories is the data which I set in the first line sof my data under data: { stories: []
          stories: res.data.objects
        })
      })
     

      }
    
  })
