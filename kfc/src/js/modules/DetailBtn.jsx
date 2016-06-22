import React, { Component, PropTypes } from 'react'

const DetailBtn = React.createClass({
  render () {
    return (
      <a onClick={this.props.handler} className="m-detail_btn">活动详情</a>
    );
  }
});

export default DetailBtn