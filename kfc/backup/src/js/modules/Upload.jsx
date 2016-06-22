import React, { Component, PropTypes } from 'react'

const Upload = React.createClass({
  render () {
    return (
      <div className="m-upload">
        <div className="inner">
          <button className="upload" onClick={this.props.tap}>参与上传</button>
        </div>
      </div>
    )
  }
});

export default Upload