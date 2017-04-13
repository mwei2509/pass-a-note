import React, { Component } from 'react';
import Pin from './pin'

export default class Notepad extends Component{
  constructor(){
    super()
    this.state={
      counter: 0
    }
  }

  clickPaper(e){
    let x = e.clientX;
    let y = e.clientY;
    this.props.store.dispatch({
      type: "ADD_PIN",
      coord: {
        x: x,
        y: y
      }
    })
    this.setState({
      counter: this.state.counter + 1
    })
  }

  render(){
    const style={
      height: "100vh",
      width: "100vw",
      background: "#eee"
    }

    let pins=this.props.store.getState().coords.map((pin, index)=>{
      return (<Pin
                key={index}
                x={pin.x}
                y={pin.y}
                 />)
    })
    return(
      <div className="paper" style={style} onClick={(e)=>this.clickPaper(e)}>
        {pins}
      </div>
    )
  }
}
