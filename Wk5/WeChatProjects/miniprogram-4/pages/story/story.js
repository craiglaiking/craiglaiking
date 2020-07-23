//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //Story will be an object. Thus, use {}
    story: {},
    comments: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // This is the code for pulling data from the API
    // getRequestData: function (res) { 
    //   console.log(res);
    //   this.setData({ 
    //     // must set the same data block
    //     story: res.data,
    //   });
    // },
    // getCommentsData: function (res) { 
    //   console.log(res);
    //   this.setData({ 
    //     // must set the same data block
    //     comments: res.data.objects,
    //   });
    // }, 

    // onLoad: function (options) {
    //   let id  = options.id;
    //   let page = this;
    //   const request = {
    //     header: {'Authorization':'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'},
    //     url: `https://cloud.minapp.com/oserve/v1/table/84988/record/${id}`, 
    //     method: 'GET',
    //     // callback function added
    //     success: page.getRequestData
    //   }
    //   wx.request(request);

    //   let commentsRequest = {
    //     url: 'https://cloud.minapp.com/oserve/v1/table/85188/record/',
    //     method: 'GET',
    //     header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
    //     success: page.getCommentsData,

    //     data: {
    //       where: { // filtering comments for a specific story
    //         "story_id": { "$eq": id } // story id
    //       }
    //     }
    //   }
    //   wx.request(commentsRequest);
    // },

  // This is the code to pull one specific story
  onLoad: function (options) {
    // This is code to pull from a database
    let tableName = 'Index'

    let story = new wx.BaaS.TableObject(tableName)

    let recordID = options.id

    // "then" is a promise. This means that the code will retrieve inforamtion from a database. After retrieving the data, we need to do somthing with it. ie. call a function
    story.get(recordID).then((res) => {
      console.log(res);
        this.setData({ 
          // NB. Story must relate to what was defined under data:{ }
          // res.data must be sued if I'm calling ony one value
          story: res.data
        })
        })
      
    //Using querying to pull all comments for this one story
    let tableComments = 'Comments'
    let comment = new wx.BaaS.TableObject(tableComments)

    let query = new wx.BaaS.Query()
    // NB. The Index_id must match EXACTLY the naming in database
    query.compare('Index_id', '=', recordID)

    comment.setQuery(query).find().then((res) => {
      console.log(res);
        this.setData({ 
          // NB. Comments must relate to what was defined under data:[ ]
          // res.data."objects" must be used if I am calling an array
          comments: res.data.objects
        })
        })
      
  },

  // binded to delete button
  deleteComment(event) {
    let data = event.currentTarget.dataset;

    // make a DELETE request
    wx.request({
      url: `https://cloud.minapp.com/oserve/v1/table/85188/record/${data.id}`,
      method: 'DELETE',
      header: {'Authorization':'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'}, // API key from Above

      success() {
        // no need for response data
        // redirect to index page when done
        wx.redirectTo({
          url: '/pages/index/index'
        });
      }
    });
  },
  // binded to vote button
  voteComment(event) {
    let page = this

    let data = event.currentTarget.dataset;
    let votes = data.votes;
    let new_votes = { votes: votes + 1 }

    // make a PUT request
    wx.request({
      url: `https://cloud.minapp.com/oserve/v1/table/85188/record/${data.id}`,
      method: 'PUT',
      header: {'Authorization':'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'}, // API key from Above
      data: new_votes,

      success(res) {
        // set comment data
        console.log(res)
        
        // new comment from response
        let new_comment = res.data

        // all the page comments
        let comments = page.data.comments

        // find the comment from page comments to update based on unique id
        let comment = comments.find(comment => comment._id == new_comment.id)

        // update comment
        comment.votes = new_comment.votes

        // update the page comments
        page.setData({comments: comments})


      }
    });
  },
})
