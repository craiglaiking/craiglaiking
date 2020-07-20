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
  getRequestData: function (res) { 
    console.log(res);
    this.setData({ 
      // must set the same data block
      story: res.data,
    });
  },
  getCommentsData: function (res) { 
    console.log(res);
    this.setData({ 
      // must set the same data block
      comments: res.data.objects,
    });
  }, 

  onLoad: function (options) {
    let id  = options.id;
    let page = this;
    const request = {
      header: {'Authorization':'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'},
      url: `https://cloud.minapp.com/oserve/v1/table/84988/record/${id}`, 
      method: 'GET',
      // callback function added
      success: page.getRequestData
    }
    wx.request(request);

    let commentsRequest = {
      url: 'https://cloud.minapp.com/oserve/v1/table/85188/record/',
      method: 'GET',
      header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
      success: page.getCommentsData,

      data: {
        where: { // filtering comments for a specific story
          "story_id": { "$eq": id } // story id
        }
      }
    }
    wx.request(commentsRequest);
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
