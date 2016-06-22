import React, { Component, PropTypes } from 'react'

const _ = require('lodash')

const Overlay = React.createClass({
  getInitialState () {
    return {
      total: 100,
      dIndex: 0
    }
  },
  componentDidMount () {
    var _t = this
    if (this.isMounted()) {
      setInterval(() => {
        _t.setState({
          dIndex: (_t.state.dIndex + 1) % 3
        })
      }, 500)
    }
  },
  render () {
    var total = this.state.total
    var step = this.props.process

    return (
      <div className={'m-loading' + (this.props.status ? ' z-active' : '')}>
        <div className="box">
          <div className="dialog">
            <img src={require('../../img/mic.png')} className="mic"/>
            <div className="process">
              <div className="line">
                {
                  this.getStep(step)
                }
              </div>
            </div>
            <div className="txt">鼓 励 加 载 中 {'. . .'}</div>
          </div>
        </div>
      </div>
    )
  },
  getStep (step) {
    var len = 20, unit = this.state.total / len, arr = []
    for (var i = 0; i < len; i++) {
      arr[i] = <img src={require(i <= step / unit - 1 ? '../../img/loading_step_active.png' : '../../img/loading_step.png')} className="step" key={i} />
    }
    return arr
  }
});

export default Overlay