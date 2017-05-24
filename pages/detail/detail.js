//detail.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Poem = require('../../model/poem');
var app = getApp()
Page({
  data: {
    id: null,
    slogan: app.globalData.slogan,
    loading: {
      hidden: false
    },
    preview: null,
    userInfo: {},
    content: {
      hidden: true
    },
    like: { class: 'icon-like', number: 0 },
    isLoading: false
  },
  tap: function (e) {
    var that = this;
    wx.previewImage({
      urls: [that.data.preview]
    })
  },
  like: function (e) {
    var that = this;
    var likes = that.data.like.number;
    var paramsJson = {
      cid: that.data.poem.id,
      uid: app.globalData.user.objectId
    };
    console.log(paramsJson);
    if (that.data.like.class == 'icon-like') {
      AV.Cloud.run('like', paramsJson).then(function (data) {
        if (data == 'ok') {
          that.setData({ 'like.class': 'icon-liked', 'like.number': likes + 1 });
        }
      }, function (err) {
        console.log(err)
      });

    } else {
      AV.Cloud.run('cancel', paramsJson).then(function (data) {
        console.log(data)
        if (data == 'ok') {
          that.setData({ 'like.class': 'icon-like', 'like.number': likes - 1 });
        }
      }, function (err) {
        console.log(err)
      });

    }

  },
  options: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['保存图片', '复制文字'],
      success: function (res) {
        if (res.tapIndex == 0) {
          //保存图片
          wx.showModal({
            title: '如何保存卡片',
            content: '点击卡片，长按弹出的图片，选择保存图片。',
            confirmText: '我知道了',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })

        } else if (res.tapIndex == 1) {
          //复制文字
          wx.setClipboardData({
            data: that.data.poem.content,
            success: function (res) {
              wx.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 2000
              })
            }
          })

        }
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  initData: function (id) {
    var that = this;
    var content = "苦斋者，章溢先生隐居之室也。\n室十有（yòu）二楹（yíng），覆之以茆（máo），在匡山之巅。匡山在处（chù）之龙泉县西南二百里，剑溪之水出焉。山四面峭壁拔起，岩崿（è）皆苍石，岸外而臼（jiù）中。其下惟白云，其上多北风。风从北来者，大率（shuài）不能甘而善苦，故植物中（zhòng）之，其味皆苦，而物性之苦者亦乐生焉。 ";
    var title = "苦斋记";
    var author = "刘基";
    var poem = {title:title,author:author,content:content}
    that.setData({ 'like.class': 'icon-liked' });
    that.setData({
      poem,
      'like.number': poem.likes,
      'loading.hidden': true,
      'content.hidden': false
    })
    

  },
  initData2: function (id) {
    var that = this;
    that.setData({ 'like.class': 'icon-liked' });
    var query = new AV.Query('Poem');
    //query.include('photo');
    query.get(id).then(function (poem) {
      console.log(poem)
      // 成功获得实例
      that.setData({
        poem,
        'like.number': poem.likes,
        'loading.hidden': true,
        'content.hidden': false
      })
      console.log(that.data);

    }, function (error) {
      // 异常处理
    });


  },
  onLoad: function (option) {
    console.log('生命周期:detail-load')
    var that = this;
    if (option.id) {
      that.setData({ id: option.id })
      //数据加载
      this.initData(option.id);
    }

  },
  onReady: function () {
    console.log('生命周期:detail-ready');
  },
  onShow: function () {

    console.log('生命周期:detail-show');
  },
  onHide: function () {
    console.log('生命周期:detail-hide');
  },
  onUnload: function () {
    console.log('生命周期:detail-unload');
  }
})
