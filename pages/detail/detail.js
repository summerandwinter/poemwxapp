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
  initData2: function (id) {
    var that = this;
    var content = "八月一日，过烽火矶。南朝自武昌至京口，列置烽燧，此山当是其一也。自舟中望山，突兀而已。及抛江过其下，嵌岩窦穴，怪奇万状，色泽莹润，亦与它石迥异。又有一石，不附山，杰然特起，高百余尺，丹藤翠蔓，罗络其上，如宝装屏风。是日风静，舟行颇迟，又秋深潦（lǎo）缩，故得尽见。杜老所谓“幸有舟楫迟，得尽所历妙”也。\n  过澎浪矶、小孤山，二山东西相望。 小孤属舒州宿松县，有戍兵。凡江中独山，如金山、焦山、落星之类，皆名天下，然峭拔秀丽皆不可与小孤比。自数十里外望之，碧峰巉（chán）然孤起，上干云霄，已非它山可拟，愈近愈秀，冬夏晴雨，姿态万变，信造化之尤物也。但祠宇极于荒残，若稍饰以楼观亭榭，与江山相发挥，自当高出金山之上矣。庙在山之西麓，额曰“惠济”，神曰“安济夫人”。绍兴初，张魏公自湖湘还，尝加营葺，有碑载其事。又有别祠在澎浪矶，属江州彭泽县，三面临江，倒影水中，亦占一山之胜。舟过矶，虽无风，亦浪涌，盖以此得名也。昔人诗有“舟中估客莫漫狂，小姑前年嫁彭郎”之句，传者因谓小孤庙有彭郎像，澎浪庙有小姑像，实不然也。晚泊沙夹，距小孤一里。微雨，复以小艇游庙中，南望彭泽、都昌诸山，烟雨空濛，鸥鹭灭没，极登临之胜，徙倚久之而归。方立庙门，有俊鹘抟水禽，掠江东南去，甚可壮也。庙祝云，山有栖鹘甚多。\n  二日早，行未二十里，忽风云腾涌，急系缆。俄复开霁，遂行。泛彭蠡口，四望无际，乃知太白“开帆入天镜”之句为妙。始见庐山及大孤。大孤状类西梁，虽不可拟小姑之秀丽，然小孤之旁，颇有沙洲葭苇，大孤则四际渺弥皆大江，望之如浮水面，亦一奇也。江自湖口分一支为南江，盖江西路也。江水浑浊，每汲用，皆以杏仁澄之，过夕乃可饮。南江则极清澈，合处如引绳，不相乱。晚抵江州。州治德化县，即唐之浔阳县，柴桑、栗里，皆其地也；南唐为奉化军节度，今为定江军。岸土赤而壁立，东坡先生所谓“舟人指点岸如赪（chēng）”者也。泊湓浦，水亦甚清，不与江水乱。自七月二十六日至是，首尾才六日，其间一日阻风不行，实以四日半溯流行七百里云。";
    var title = "过小孤山大孤山";
    var author = "陆游";
    var poem = {title:title,author:author,content:content}
    that.setData({ 'like.class': 'icon-liked' });
    that.setData({
      poem,
      'like.number': poem.likes,
      'loading.hidden': true,
      'content.hidden': false
    })
    

  },
  initData: function (id) {
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
      wx.setNavigationBarTitle({
        title: poem.title
      });
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
