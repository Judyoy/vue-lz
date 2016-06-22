import React, { Component, PropTypes } from 'react'

const Logo = React.createClass({
  render () {
    return (
      <div className={"m-detail_dialog" + (this.props.status ? ' z-active' : '')} onClick={this.stop}>
        <div className="box" onClick={this.props.hide}>
          <div className="dialog" onClick={this.stop}>
            <div className="hd">
              <img src={require('../../img/detail_dialog_hd.png')} className="ttl"/>
            </div>
            <div className="bd" dangerouslySetInnerHTML={{__html: this.props.cnt}}></div>
            <div className="ft">
              <button className="close_btn" onClick={this.props.hide}>关闭弹窗</button>
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