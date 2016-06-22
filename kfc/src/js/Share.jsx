import React, { Component, PropTypes } from 'react'

import Logo from './modules/Logo'
import Item from './modules/Item'
import ItemCard from './modules/ItemCard'
import ItemDialog from './modules/ItemDialog'
import Upload from './modules/Upload'
import DownloadDialog from './modules/DownloadDialog'
import ShareOverlay from './modules/ShareOverlay'
import RecordDialog from './modules/RecordDialog'

require('../sass/share')
const _ = require('lodash')
const reqwest = require('reqwest')

const Share = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState () {
    return {
      isApp: window.isLizhiFM(),
      isWeibo: window.isWeibo(),
      isTarget: window.isLizhiFM() || window.isWeibo() || window.isWeiXin(),
      hotList: [],
      hotListPage: 1,
      loadStatus: true,
      showItemDialog: false,
      itemDialogInfo: {},
      showDownloadDialog: false,
      showShare: false,
      itemInfo: {},
      player: window.commonPlayer,
      playStatus: false,
      audioId: 0,
      showRecordDialog : false,
      voting: false,
      itemIndex: 0
    }
  },
  componentDidMount () {
    // let router = this.context.router
    // router.push({
    //   pathname: '/'
    // })
    var _t = this

    reqwest({ // get ticket
      url: window.baseUrl + '/v/ticket?actId=20160415',
      type: 'json',
      crossOrigin: true
    })

    if (this.isMounted()) {
      _t.getItemInfo()
      _t.getHotList()
      window.shareData['url'] = window.shareData['link'] = window.baseUrl + '/v/share#/share/' + _t.props.params.itemId
      setInterval(() => {
        _t.setState({
          itemIndex: (_t.state.itemIndex + 1) % _t.state.hotList.length
        })
      }, 5000)
      _t.state.player.pause()
    }

    var player = this.state.player
    player.addEventListener('ended', function () {
      _t.setState({
        playStatus: false
      })
    }, false)
  },
  render () {
    var _t = this,
    tab = '',
    list = _t.state.hotList

    return (
      <div className="g-share">
        <Logo />
        <ItemCard voting={this.state.voting} info={this.state.itemInfo} playStatus={_t.state.playStatus} play={_t.playVoive} vote={_t.myVote} convince={_t.myConvince} />
        <div className="m-list_box">
          <div className="hd">
            <img src={require('../img/list_hd_ttl.png')} className="ttl"/>
          </div>
          <div className="cnts">
            <div className="cnt z-crt">
              {
                _.map(list, (item, index) => {
                  return (
                    <div key={index} className={'item_wrap animated fadeIn' + (_t.state.itemIndex == index ? ' z-crt' : '')}>
                      <Item index={index} info={item} vote={_t.vote} convince={_t.convince} tap={_t.showItemDialog} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <ItemDialog status={this.state.showItemDialog} hide={this.hideItemDialog} info={this.state.itemDialogInfo} />
        <DownloadDialog status={this.state.showDownloadDialog} hide={this.hideDownloadDialog} download={this.downloadApp} />
        <RecordDialog status={this.state.showRecordDialog} hide={this.hideRecordDialog} record={this.record} />
        <ShareOverlay status={this.state.showShare} hide={this.hideShareOverlay} />
      </div>
    )
  },
  getHotList () {
    var _t = this
    var p = _t.state.hotListPage
    reqwest({
      url: window.baseUrl + '/v/rankList?actId=20160415',
      data: {
        type: 0,
        page: p
      },
      type: 'json',
      crossOrigin: true
    })
    .then(function (res) {
      if (res.status == 0) {
        var list = res.data
        _t.setState({
          hotList: _t.state.hotList.concat(list),
          hotListPage: p + 1
        })
      }
    })
  },
  getItemInfo () {
    var _t = this
    reqwest({
      url: window.baseUrl + '/v/item?actId=20160415',
      data: {
        itemId: _t.props.params.itemId
      },
      type: 'json',
      crossOrigin: true
    })
    .then(function (res) {
      if (res.status == 0) {
        var data = res.data
        _t.setState({
          itemInfo: data,
          audioId: data.audioId
        })
      }
    })
  },
  hideItemDialog () {
    this.setState({
      showItemDialog: false
    })
  },
  upload () {
    if (!this.state.isApp) {
      this.setState({
        showDownloadDialog: true
      })
    } else {
      this.setState({
        showRecordDialog: true
      })
    }
  },
  hideDownloadDialog () {
    this.setState({
      showDownloadDialog: false
    })
  },
  downloadApp () {
    reqwest({
      url: window.baseUrl + '/h5BannerCountV2?actId=20160415'
    })
    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yibasan.lizhifm&g_f=991784#opened'
  },
  showItemDialog (item) {
    this.setState({
      showItemDialog: true,
      itemDialogInfo: item
    })
    this.setState({
      playStatus: false
    })
    this.state.player.pause()
  },
  vote (id, tab, index, succ) {
    var _t = this
    var listName = 'hotList'
    var list  = this.state[listName]
    var obj = {}

    reqwest({
      url: window.baseUrl + '/v/vote?actId=20160415',
      data: {
        ancId: id
      },
      crossOrigin: true
    })
    .then(function (res) {
      if (res.msgType == 'success') {
        list[index]['ticket'] = res.ancTicket
        obj[listName] = list
        _t.setState(obj)
        _t.setState({
          ticket: res.ticket
        })
        succ()
      } else {
        window.alert(res.msg)
      }
    })
  },
  convince (id) {
    // console.log(id)
    window.shareData['url'] = window.shareData['link'] = window.baseUrl + '/v/share#/share/' + id
    // if (this.state.isApp) {
    //   window.LizhiJSBridge.call('shareUrl', window.shareData, function (ret) {})
    // } else if (this.state.isWeibo) {
    //   // WB2.anyWhere(function(W){
    //   //   W.widget.publish({
    //   //     'default_text' : window.shareData.title + '-' + window.shareData.desc + '：' + window.shareData.link,
    //   //     'default_image' : window.shareData['image-url'],
    //   //     'type': 'mobile'
    //   //   })
    //   // })

    //   reqwest({
    //     url: 'https://api.weibo.com/2/statuses/update.json',
    //     method: 'post',
    //     data: {
    //       access_token: window.getCookie('lz_h5_20160415_wb_token'),
    //       status: window.shareData.title
    //     },
    //     type: 'json',
    //     crossOrigin: true
    //   })
    //   .then(function (res) {
    //     alert('拉票成功！')
    //   }, function (res) {
    //     alert('拉票成功！')
    //   })
    // } else {
    //   this.showShareOverlay()
    // }

    if (this.state.isApp) {
      window.LizhiJSBridge.call('shareUrl', window.shareData, function (ret) {})
    }  else {
      this.showShareOverlay()
    }

    reqwest({
      url: window.baseUrl + '/h5ShareCountV2?actId=20160415'
    })
  },
  myVote () {
    var _t = this
    var info = _t.state.itemInfo
    var id = info.audioId
    
    reqwest({
      url: window.baseUrl + '/v/vote?actId=20160415',
      data: {
        ancId: id
      },
      crossOrigin: true
    })
    .then(function (res) {
      if (res.msgType == 'success') {
        info.ticket = res.ancTicket
        _t.setState({
          itemInfo: info,
          voting: true
        })

        setTimeout(() => {
          _t.setState({
            voting: false
          })
        }, 1200)
      } else {
        window.alert(res.msg)
      }
    })
  },
  myConvince () {
    window.shareData['url'] = window.shareData['link'] = window.baseUrl + '/v/share#/share/' + this.props.params.itemId
    // if (this.state.isApp) {
    //   window.LizhiJSBridge.call('shareUrl', window.shareData, function (ret) {})
    // } else if (this.state.isWeibo) {
    //   // WB2.anyWhere(function(W){
    //   //   W.widget.publish({
    //   //     'default_text' : window.shareData.title + '-' + window.shareData.desc + '：' + window.shareData.link,
    //   //     'default_image' : window.shareData['image-url'],
    //   //     'type': 'mobile'
    //   //   })
    //   // })
    //   // WB2.anyWhere(function(W){
    //   //   W.widget.publish({
    //   //     'default_text' : 'hahahahaha'
    //   //   })
    //   // })

    //   reqwest({
    //     url: 'https://api.weibo.com/2/statuses/update.json',
    //     method: 'post',
    //     data: {
    //       access_token: window.getCookie('lz_h5_20160415_wb_token'),
    //       status: window.shareData.title
    //     },
    //     type: 'json',
    //     crossOrigin: true
    //   })
    //   .then(function (res) {
    //     alert('拉票成功！')
    //   }, function (res) {
    //     alert('拉票成功！')
    //   })
    // } else {
    //   this.showShareOverlay()
    // }

    if (this.state.isApp) {
      window.LizhiJSBridge.call('shareUrl', window.shareData, function (ret) {})
    } else {
      this.showShareOverlay()
    }

    reqwest({
      url: window.baseUrl + '/h5ShareCountV2?actId=20160415'
    })
  },
  showShareOverlay () {
    this.setState({
      showShare: true
    })
  },
  hideShareOverlay () {
    this.setState({
      showShare: false
    })
  },
  playVoive (url) {
    var player = this.state.player
    var mediaUrl = url
    if (player.src != mediaUrl) {
      player.src = mediaUrl
    }
    if (!this.state.playStatus) {
      player.play()
      this.setState({
        playStatus: true
      })
    } else {
      player.pause()
      this.setState({
        playStatus: false
      })
    }
  },
  hideRecordDialog () {
    this.setState({
      showRecordDialog: false
    })
  },
  record () {
    this.hideRecordDialog()
    window.location.href = 'lizhifm://www.lizhi.fm?clientparams=11'
  }
})

export default Share
