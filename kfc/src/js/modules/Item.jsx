import React, { Component, PropTypes } from 'react'

const Item = React.createClass({
  getInitialState() {
    return {
      voting: false  
    }
  },
  render () {
    var data = this.props.info

    return (
      <div className={'item' + (this.state.voting ? ' z-voting' : '')} onClick={this.showDialog}>
        <div className="pos_wrap">{this.props.index < 9 ? '0' + (this.props.index + 1) : (this.props.index + 1)}</div>
        <div className="cover_wrap">
          <img src={data.cover} className="cover"/>
        </div>
        <div className="info_wrap">
          <div className="title">{data.audioName.substr(0, 8)}</div>
          <div className="ticket">{data.ticket}票</div>
          <div className="add animated fadeInDown">+1</div>
        </div>
        <div className="vote_wrap">
          <button className="vote" onClick={this.vote}>投票</button>
        </div>
        <div className="convince_wrap">
          <button className="convince" onClick={this.convince}>拉票</button>
        </div>
      </div>
    );
  },
  vote (e) {
    e.stopPropagation()
    var _t = this
    var id = this.props.info.audioId
    var tab = this.props.tab
    var index = this.props.index
    this.props.vote(id, tab, index, function () {
      _t.setState({
        voting: true
      })

      setTimeout(() => {
        _t.setState({
          voting: false
        })
      }, 1200)
    })
  },
  convince (e) {
    e.stopPropagation()
    var id = this.props.info.id
    this.props.convince(id)
  },
  showDialog () {
    var data = this.props.info
    this.props.tap(data)
  }
});

export default Item