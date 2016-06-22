import React, { Component, PropTypes } from 'react'

const Logo = React.createClass({
  getDefaultProps() {
    return {
      player: new Audio  
    }
  },
  getInitialState() {
    return {
      playStatus: false
    }
  },
  componentDidMount() {
    var _t = this
    var player = this.props.player
    player.addEventListener('ended', function () {
      _t.setState({
        playStatus: false
      })
    }, false)
  },
  render () {
    var info = this.props.info

    return (
      <div className={"m-item_dialog" + (this.props.status ? ' z-active' : '')} onClick={this.stop}>
        <div className="box" onClick={this.close}>
          <div className="dialog" onClick={this.stop}>
            <div className="hd">
              <img src={require('../../img/close_icon.png')} className="close_icon" onClick={this.close} />
            </div>
            <div className="bd">
              <div className="avat_wrap">
                <div className="inner" onClick={this.playVoice}>
                  <img src={require('../../img/cover.png')} className="avat"/>
                  <div className="mark"></div>
                  <img src={require('../../img/play_icon.png')} className={'play' + (this.state.playStatus ? '' : ' z-active')} />
                  <img src={require('../../img/pause_icon.png')} className={'pause' + (this.state.playStatus ? ' z-active' : '')} />
                </div>
              </div>
              <div className="info">
                <div className="audio">{info.audioName}</div>
                <div className="pod">
                  FM{info.fm} {info.podName}
                </div>
                <div className="ticket">{info.ticket}票</div>
                <div className="pos">当前排名：{info.pos}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  stop (e) {
    e.stopPropagation()
  },
  close () {
    this.props.hide()
    this.setState({
      playStatus: false
    })
    var player = this.props.player
    player.pause()
    this.setState({
      playStatus: false
    })
  },
  playVoice () {
    var player = this.props.player
    var mediaUrl = this.props.info.mediaUrl
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
  }
});

export default Logo