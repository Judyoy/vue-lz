import React, { Component, PropTypes } from 'react'

const Tab = React.createClass({
  render () {
    return (
      <div onClick={this.toggleTab} className={'tab' + (this.props.match ? ' z-crt' : '')}>{this.props.cnt}</div>
    );
  },
  toggleTab () {
    var tabIndex = this.props.index
    this.props.tap(tabIndex)
  }
});

export default Tab