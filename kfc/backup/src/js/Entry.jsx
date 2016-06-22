import React, { Component, PropTypes } from 'react'

const Entry = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      isApp: window.isLizhiFM(),
      doNotSupportGoToLoginTimer: null
    }
  },
  componentWillMount () {
    //
  },
  componentDidMount () {
    // console.log(this.props.params)
    var _t = this

    if (_t.state.isApp) {
      if (!window.LizhiJSBridge) {
        document.addEventListener('LizhiJSBridgeReady', function () {
          _t.getUidInAPP()
        }, false)
      } else {
        _t.getUidInAPP()
      }
    } else {
      var uid = window.getCookie('lz_h5_20160415_uid')
      if (!uid) { uid = 0 }
      _t.redirect(uid)
    }
  },
  render () {
    return null
  },
  getUidInAPP () {
    var _t = this
    window.LizhiJSBridge.call('getSessionUser', {}, function (ret) {
      if (ret.id) {
        // window.alert(ret.id)
        window.setCookie('lz_h5_20160415_uid', ret.id, 7)
        _t.redirect(ret.id)
      } else {
        window.setCookie('lz_h5_20160415_uid', 0, 7)
        _t.goToLogin()
      }
    })

    window.LizhiJSBridge.call('showOrHideBottomPlayer', {
      'isShow': false
    }, function(ret) {});

  },
  goToLogin () {
    let _t = this
    _t.state.doNotSupportGoToLoginTimer = setTimeout(function () {
      window.alert('你的app版本太久啦~赶紧升级一下吧！')
    }, 1000)
    window.LizhiJSBridge.call('gotoLogin', {}, function (ret) {
      window.clearTimeout(_t.state.doNotSupportGoToLoginTimer)
      if (ret.status === 'success') {
        // alert('未登录')
        var timer = null
        timer = setInterval(function () {
          _t.getUInfoInApp(function (res) {
            if (res.id) {
              // window.alert(ret.id)
              window.clearInterval(timer)
              _t.redirect(res.id)
            }
          })
        }, 500)
      } else {
        // window.alert('已登录')
      }
    })
  },
  getUInfoInApp (callback) {
    window.LizhiJSBridge.call('getSessionUser', {}, function (ret) {
      if (ret.id) {
        window.setCookie('lz_h5_20160415_uid', ret.id, 7)
      } else {
        window.setCookie('lz_h5_20160415_uid', 0, 7)
      }
      callback(ret)
    })
  },
  redirect (uid) {
    var router = this.context.router
    router.replace({
      pathname: '/index/' + uid
    })
  }
})

export default Entry
