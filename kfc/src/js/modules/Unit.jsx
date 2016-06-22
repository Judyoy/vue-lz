import React, { Component, PropTypes } from 'react'

export default class Unit extends Component {
  constructor () {
    super()
    this.state = {
      num: 1
    }
  }

  componentDidMount () {
    console.log('mount')
  }

  componentWillUnmount () {
    console.log('unmount')
  }

  render () {
    return (
      <div onClick={this.add.bind(this)}>
        <span onClick={this.props.changeName}>name: {this.props.name}</span>
        {this.state.num}
      </div>
    )
  }

  add () {
    let _t = this
    _t.setState({
      num: _t.state.num + 1
    })
  }
}
