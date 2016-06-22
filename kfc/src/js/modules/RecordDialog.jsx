import React, { Component, PropTypes } from 'react'

const Logo = React.createClass({
  render () {
    return (
      <div className={'m-record_dialog' + (this.props.status ? ' z-active' : '')} onClick={this.props.hide}>
        <div className="box">
          <div className="dialog" onClick={this.stop}>
            <div className="bd">
              <img src={require('../../img/record_icon.png')} className="icon"/>
            </div>
            <div className="ft">
              <button className="btn sure" onClick={this.props.record}>去录音</button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  stop (e) {
    e.stopPropagation()
  }
});

export default Logo