import React, { Component, PropTypes } from 'react'

const Logo = React.createClass({
  render () {
    return (
      <img src={require('../../img/logos.png')} className="m-logo"/>
    );
  }
});

export default Logo