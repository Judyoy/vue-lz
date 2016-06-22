import React, { Component, PropTypes } from 'react'

const Overlay = React.createClass({
  render () {
    return (
      <div className={'m-mark' + (this.props.status ? '' : ' z-active')}>
        <div className="box">
          <div className="dialog">
            <img src={require('../../img/qcode.png')} className="qcode"/>
            <img src={require('../../img/qcode_txt.png')} className="qcode_txt"/>
          </div>
        </div>
      </div>
    );
  }
});

export default Overlay