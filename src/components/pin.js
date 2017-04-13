import React, { Component } from 'react';

export default class Pin extends Component{
  render(){
    const style={
      position: 'absolute',
      top: this.props.y,
      left: this.props.x,
      background: "#ff0000"
    }
    return(
      <div style={style}>
        hello
      </div>
    )


  }
}
