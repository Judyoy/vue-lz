import React, { Component, PropTypes } from 'react'

import Logo from './modules/Logo'
import DetailBtn from './modules/DetailBtn'
import DetailDialog from './modules/DetailDialog'
import Tab from './modules/Tab'
import Announcement from './modules/Announcement'
import Item from './modules/Item'
import ItemDialog from './modules/ItemDialog'
import Upload from './modules/Upload'
import DownloadDialog from './modules/DownloadDialog'
import RecordDialog from './modules/RecordDialog'
import ShareOverlay from './modules/ShareOverlay'

require('../sass/index')
const _ = require('lodash')
const reqwest = require('reqwest')
// const IScroll = require('./iscroll-lite.js')

const Index = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState () {
    return {
      uid: this.props.params.uid,
      showDialog: false,
      tabs: ['热门鼓励', '最新鼓励', '我的鼓励'],
      announcements: [],
      announcementIndex: 0,
      ticket: 0,
      rule: '',
      cnts: [],
      cntArr: ['hotList', 'newList', 'myList'],
      hotList: [],
      newList: [],
      myList: [],
      hotListPage: 1,
      newListPage: 1,
      myListPage: 1,
      loadStatus: true,
      showItemDialog: false,
      itemDialogInfo: {},
      isReachedTop: true,
      isReachedBottom: false,
      reachedBottomTime: new Date,
      isApp: window.isLizhiFM(),
      isWeibo: window.isWeibo(),
      isTarget: window.isLizhiFM() || window.isWeibo() || window.isWeiXin(),
      showDownloadDialog: false,
      showShare: false,
      showRecordDialog : false
    }
  },
  componentDidMount () {
    // var uid = this.props.params.uid
    // console.log(uid)
    // console.log(this.props.location.query)
    // let router = this.context.router
    // router.push({
    //   pathname: '/',
    //   query: {
    //     tab: 2
    //   }
    // })
    var _t = this

    var hotList, newList, myList
    hotList = [
      {
        pos: 1,
        audioId: 1,
        podName: 'bo ke',
        fm: '123456',
        cover: require('../img/cover.png'),
        audioName: 'hot title',
        ticket: 200,
        audioUrl: 'http://cdn5.lizhi.fm/audio/2016/01/22/2513086350729791494_hd.mp3'
      }
    ]

    newList = [
      {
        pos: 1,
        audioId: 4,
        podName: 'bo ke',
        fm: '123456',
        cover: require('../img/cover.png'),
        audioName: 'new title',
        ticket: 200,
        audioUrl: 'http://cdn5.lizhi.fm/audio/2016/01/22/2513086350729791494_hd.mp3'
      }
    ]

    myList = [
      {
        pos: 1,
        audioId: 7,
        podName: 'bo ke',
        fm: '123456',
        cover: require('../img/cover.png'),
        audioName: 'my title',
        ticket: 200,
        audioUrl: 'http://cdn5.lizhi.fm/audio/2016/01/22/2513086350729791494_hd.mp3'
      }
    ]

    if (this.isMounted()) {
      // _t.setState({
      //   tabs: ['热门鼓励', '最新鼓励', '我的鼓励'],
      //   cnts: [hotList, newList, myList],
      //   announcements: ['announcement1', 'announcement2', 'announcement3'],
      // })
      window.commonPlayer.pause()

      reqwest({ // get act info
        url: window.baseUrl + '/v/act?actId=20160415',
        type: 'json',
        crossOrigin: true
      })
      .then(function (res) {
        if (res.status == 0) {
          var data = res.data
          _t.setState({
            announcements: data.noticeList,
            rule: data.rule
          })
        }
      })

      reqwest({ // get ticket
        url: window.baseUrl + '/v/ticket?actId=20160415',
        type: 'json',
        crossOrigin: true
      })
      .then(function (res) {
        if (res.msgType == 'success') {
          _t.setState({
            ticket: res.ticket
          })
        }
      })

      _t.getHotList()
      _t.getNewList()
      _t.getMyList()

      window.setInterval(() => { // announce timer
        var index = _t.state.announcementIndex
        var total = _t.state.announcements.length
        _t.setState({
          announcementIndex: (index + 1) % total
        })
      }, 4000)
    }

    // document.onTouchend = function () {
    //   var docT = document.body.scrollTop
    //   var winH = window.innerHeight
    //   var docH = document.body.scrollHeight

    //   if (docT > _t.listTop) {
    //     _t.setState({
    //       isReachedTop: true
    //     })
    //   } else {
    //     _t.setState({
    //       isReachedTop: false
    //     })
    //   }

    //   if (docT + winH >= docH - 10) {
    //     _t.reachedBottom()
    //   } else {
    //     _t.setState({
    //       isReachedBottom: false
    //     })
    //   }
    // }

    var listCnt = _t.refs['list_cnt']
    var listCntH = window.innerHeight - window.baseFontSize * 22.5 + 80
    if (listCntH < 0) {
      listCntH = 0
    }
    listCnt.style.height = listCntH + 'px'
    listCnt.onscroll = function () {
      var top = listCnt.scrollTop
      var tab = _t.props.location.query.tab ? _t.props.location.query.tab : 0
      var h = _t.refs['cnt_' + tab].offsetHeight
      if (top + listCntH - h >= -5) {
        if (tab == 0) {
          _t.getHotList()
        } else if (tab == 1) {
          _t.getNewList()
        } else if (tab == 2) {
          _t.getMyList()
        }
      }
      // alert(top + listCntH - h)
      // console.log(top + listCntH, h)
    }
  },
  render () {
    var _t = this
    var tabs = this.state.tabs
    var cnts = this.state.cnts
    var announcements = this.state.announcements
    var tab = this.props.location.query.tab
    var announcementIndex = this.state.announcementIndex

    if (!tab || tab > this.state.tabs) {
      tab = 0
    }

    return (
      <div className="g-index">
        <div className="g-above">
          <Logo />
          <DetailBtn handler={this.showDetailDialog} />
        </div>
        <div className="g-below">
          <div className="m-list_box">
            <div className="tabs">
              {
                _.map(tabs, (item, index) => {
                  return <Tab key={index} cnt={item} match={tab == index} index={index} tap={_t.toggleTab} />
                })
              }
            </div>
            <div className="announcements" style={{display: 'none'}}>
              <img src={require('../img/announcement_icon.png')} className="icon" />
              <ul className="list">
                {
                  _.map(announcements, (item, index) => {
                    return <Announcement key={index} cnt={item} match={announcementIndex == index} tap={_t.showAnnouncementDialog} />
                  })
                }
              </ul>
              <div className="ticket">可用票数：{this.state.ticket}</div>
            </div>
            <div className="cnts" ref="list_cnt">
              {
                _.map(tabs, (item, index) => {
                  return (
                    <div key={index} className={'cnt' + (tab == index ? ' z-crt' : '')} ref={'cnt_' + index}>
                      {
                        _.map(_t.state[_t.state.cntArr[index]], (item, index) => {
                          return <Item key={index} index={index} info={item} vote={_t.vote} tab={tab} convince={_t.convince} tap={_t.jump} />
                        })
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <Upload tap={this.upload} />
        <DetailDialog status={this.state.showDialog} hide={this.hideDetailDialog} cnt={this.state.rule} />
        <ItemDialog status={this.state.showItemDialog} hide={this.hideItemDialog} info={this.state.itemDialogInfo} />
        <DownloadDialog status={this.state.showDownloadDialog} hide={this.hideDownloadDialog} download={this.downloadApp} />
        <RecordDialog status={this.state.showRecordDialog} hide={this.hideRecordDialog} record={this.record} />
        <ShareOverlay status={this.state.showShare} hide={this.hideShareOverlay} />
      </div>
    )
  },
  showDetailDialog () {
    this.setState({
      showDialog: true
    })
  },
  hideDetailDialog () {
    this.setState({
      showDialog: false
    })
  },
  toggleTab (n) {
    this.refs['list_cnt'].scrollTop = 0
    var router = this.context.router
    var uid = this.props.params.uid
    router.replace({
      pathname: '/index/' + uid,
      query: {
        tab: n
      }
    })
  },
  showAnnouncementDialog (cnt) {
    // console.log(cnt)
  },
  vote (id, tab, index, succ) {
    var _t = this
    var listName = _t.state.cntArr[tab]
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
    //   WB2.anyWhere(function(W){
    //     W.widget.publish({
    //       'default_text' : window.shareData.title + '-' + window.shareData.desc + '：' + window.shareData.link,
    //       'default_image' : window.shareData['image-url'],
    //       'type': 'mobile'
    //     })
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
  showItemDialog (item) {
    this.setState({
      showItemDialog: true,
      itemDialogInfo: item
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
    window._mz_evt('1001232', '100031558')
  },
  reachedBottom () {
    var _t = this
    var status = _t.state.loadStatus
    if (status) {
      _t.setState({
        loadStatus: false
      })
      _t.getNewList()
    }
  },
  getHotList () {
    var _t = this
    var p = _t.state.hotListPage
    if (!_t.state.loadStatus) {
      return
    }

    _t.setState({
      loadStatus: false
    })

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
      if (res.status == 0 && res.data.length > 0) {
        var list = res.data
        _t.setState({
          hotList: _t.state.hotList.concat(list),
          hotListPage: p + 1
        })

        setTimeout(() => {
          _t.setState({
            loadStatus: true
          })
        }, 1000)
      }
    })
  },
  getNewList () {
    var _t = this
    var p = _t.state.newListPage
    if (!_t.state.loadStatus) {
      return
    }

    _t.setState({
      loadStatus: false
    })

    reqwest({
      url: window.baseUrl + '/v/rankList?actId=20160415',
      data: {
        type: 1,
        page: p
      },
      type: 'json',
      crossOrigin: true
    })
    .then(function (res) {
      if (res.status == 0 && res.data.length > 0) {
        var list = res.data
        _t.setState({
          newList: _t.state.newList.concat(list),
          newListPage: p + 1
        })

        setTimeout(() => {
          _t.setState({
            loadStatus: true
          })
        }, 1000)
      }
    })
  },
  getMyList () {
    var _t = this
    var p = _t.state.myListPage
    if (!_t.state.loadStatus) {
      return
    }

    _t.setState({
      loadStatus: false
    })

    reqwest({
      url: window.baseUrl + '/v/pList?actId=20160415',
      data: {
        uid: _t.state.uid,
        page: p
      },
      type: 'json',
      crossOrigin: true
    })
    .then(function (res) {
      if (res.status == 0 && res.data.length > 0) {
        var list = res.data
        _t.setState({
          myList: _t.state.myList.concat(list),
          myListPage: p + 1
        })

        setTimeout(() => {
          _t.setState({
            loadStatus: true
          })
        }, 1000)
      }
    })
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
  hideRecordDialog () {
    this.setState({
      showRecordDialog: false
    })
  },
  record () {
    this.hideRecordDialog()
    window.location.href = 'lizhifm://www.lizhi.fm?clientparams=11'
  },
  jump (item) {
    var router = this.context.router
    var id = item.id
    router.push({
      pathname: '/share/' + id
    })
  }
})

export default Index
