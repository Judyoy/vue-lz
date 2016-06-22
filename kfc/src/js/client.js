;(function (doc, win) {
  win.browser = {
    versions: function (){
      var u = navigator.userAgent, app = navigator.appVersion;
      return {//移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }

  win.isWeibo = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/Weibo/i) != null) {
      console.debug("Weibo browser");
      return true;
    } else {
      return false;
    }
  };

  win.isWeiXin = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) != null) {
      console.debug("Wechat browser");
      return true;
    } else {
      return false;
    }
  };

  win.isLizhiFM = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/LizhiFM/i) != null) {
      console.debug("LizhiFM browser");
      return true;
    } else {
      if (typeof win["LizhiJSBridge"] !== "undefined") {
        console.debug("LizhiFM JSBridge browser");
        return true;
      } else {
        return false;
      }
    }
  };

  win.isUCBrowser = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/UCBrowser/i) != null) {
      console.debug("UCBrowser");
      return true;
    } else {
      return false;
    }
  };

  win.isQQBrowser = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/QQBrowser/i) != null) {
      console.debug("QQBrowser");
      return true;
    } else {
      return false;
    }
  };

  win.isSafari = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/Safari/i) != null) {
      console.debug("Safari");
      return true;
    } else {
      return false;
    }
  };

  // 设置cookie
  win.setCookie = function (c_name, value, expiredays) {
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
  }

  // 获取cookie
  win.getCookie = function (c_name) {
    if (document.cookie.length>0) {
      var c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1) {
        c_start=c_start + c_name.length+1;
        var c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
      }
    }
    return null
  }

  var docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (browser.versions.mobile) {
      window.baseFontSize = 20 * (clientWidth / 320);
      docEl.style.fontSize = window.baseFontSize + 'px';
    }else {
      window.baseFontSize = 20 * (640 / 320);
      docEl.style.fontSize = window.baseFontSize + 'px';

      var cnn = doc.getElementById('root');
      if (!/(g-mobile)/.test(cnn.className)) {
        cnn.className = cnn.className+' g-mobile';
      }
    }
  };

  recalc()

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
