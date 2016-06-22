import React, { Component, PropTypes } from 'react'

const Logo = React.createClass({
  render () {
    return (
      <div className={'m-share_overlay' + (this.props.status ? ' z-active' : '')} onClick={this.props.hide}>
        <img src={require('../../img/to_share_cover.png')} className="pic"/>
      </div>
    );
  }
});

export default Logo