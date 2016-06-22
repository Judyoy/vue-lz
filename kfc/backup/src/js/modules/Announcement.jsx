import React, { Component, PropTypes } from 'react'

const Announcement = React.createClass({
  render () {
    return (
      <div onClick={this.props.tap} className={'announcement animated fadeInDown' + (this.props.match ? ' z-crt' : '')}>{this.props.cnt}</div>
    );
  }
});

export default Announcement