require('../sass/common/common')

import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'
import { Router, IndexRoute, useRouterHistory, hashHistory } from 'react-router'
import { createHashHistory } from 'history'

import Index from './Index'
import Share from './Share'
import Entry from './Entry'
import Overlay from './modules/Overlay'
import Loading from './modules/Loading'

const reqwest = require('reqwest')

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

window.commonPlayer = new Audio;

window.baseUrl = 'http://kylecean.wicp.net'

if (/(lizhi)/.test(window.location.href)) {
  window.baseUrl = 'http://h5.lizhi.fm'
}

window.shareData = {
  'url': window.location.href,
  'link': window.location.href,
  'title': '燃哭丨那些年击中过我的鼓励歌词',
  'desc': '快来荔枝上传语音，用击中过你的鼓励歌词传达一早的鼓励正能量！',
  'image-url': require('../img/share_cover.jpg'),
  'imgUrl': require('../img/share_cover.jpg'),
  'success': function () {
    reqwest({
      url: window.baseUrl + '/h5ShareCountV2?actId=20160415'
    })
  }
}

reqwest({
  url: window.baseUrl + '/getJSConfig',
  data: {url: window.baseUrl + window.location.pathname + window.location.search},
  type: 'json'
})
.then(function (res) {
  // console.log(res);
  var data = res
  window.wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名，见附录1
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
  window.wx.ready(function () {
    window.wx.onMenuShareAppMessage(window.shareData)
    window.wx.onMenuShareTimeline(window.shareData)
  })
})

reqwest({
  url: window.baseUrl + '/statUp?actId=20160415'
})

window._mz_evt('1001232', '100031557')

var App = React.createClass({
  getInitialState () {
    return {
      isApp: window.isLizhiFM(),
      isTarget: window.isLizhiFM() || window.isWeibo() || window.isWeiXin(),
      loadingProcess: 0,
      showLoading: true
    }
  },
  componentDidMount () {
    var _t = this
    if (this.isMounted()) {
      _t.loading()

      window.onload = function () {
        _t.setState({
          showLoading: false
        })
      }

      setTimeout(() => {
        _t.setState({
          showLoading: false
        })
      }, 6000)
    }
  },
  render () {
    return (
      <div>
        <Overlay status={this.state.isTarget} />
        <Loading status={this.state.showLoading} process={this.state.loadingProcess} />
      </div>
    )
  },
  loading () {
    var _t = this
    var delay = (Math.random() + 1) * 200
    setTimeout(() => {
      var process = (_t.state.loadingProcess + 5) % 100
      if (process > 85) {
        return
      } else {
        _t.setState({
          loadingProcess: process
        })
        _t.loading()
      }
    }, delay)
  }
})

ReactDom.render(
  <div>
    <Router history={appHistory}>
      <Router path="/">
        <IndexRoute component={Entry} />
        <Router path="index/:uid" component={Index} />
        <Router path="share/:itemId" component={Share} />
      </Router>
    </Router>
    <App />
  </div>,
  document.getElementById('root')
)

// ReactDom.render(
//   <App />,
//   document.getElementById('root')
// )