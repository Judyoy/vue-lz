import React, { Component, PropTypes } from 'react'

const Logo = React.createClass({
  render () {
    var data = this.props.info

    return (
      <div className={'m-item_card' + (this.props.voting ? ' z-voting' : '')}>
        <div className="bd">
          <div className="avat_wrap">
            <div className="inner">
              <img src={data.cover} className="avat"/>
            </div>
          </div>
          <div className="info">
            <div className="name">
              <span className="ancho">{data.podName ? data.podName.substr(0, 8) : ''}</span>
              &nbsp;
              <span className="audio_name">{data.audioName ? data.audioName.substr(0, 8) : ''}</span>
            </div>
            <div className="voice" onClick={this.playVoice}>
              <i className={'status' + (this.props.playStatus ? ' z-playing' : '')}></i>
              <span className="seconds">{(data.duration ? data.duration : 0) + '\''}</span>
            </div>
            <div className="add_wrap">
              <span className="add animated fadeInDown">+1</span>
            </div>
            <div className="data">
              目前得票数：<span className="num">{data.ticket}</span>票
              &nbsp; &nbsp;
              排名：第<b className="num">{data.pos}</b>名
            </div>
          </div>
        </div>
        <div className="ft">
          <button className="btn vote" onClick={this.props.vote}>为我投票</button>
          <button className="btn convince" onClick={this.props.convince}>为我拉票</button>
        </div>
      </div>
    )
  },
  playVoice () {
    this.props.play(this.props.info.mediaUrl)
  }
});

export default Logo