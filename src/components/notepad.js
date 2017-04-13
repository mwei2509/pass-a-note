import React, { Component } from 'react';
import Pin from './pin'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import {connect} from 'react-redux'

class Notepad extends Component{
  constructor(){
    super()
    this.state={
      counter: 0
    }
  }

  clickPaper(e){
    e.preventDefault()
    let x = e.clientX;
    let y = e.clientY;
    let rand = Math.floor(Math.random() * (80-10+1)) + 10

    const fonts=["Montserrat", "Crimson Text","Open Sans","Nunito","Libre Baserville","Bitter"]
    let fontrand=Math.floor(Math.random() * (fonts.length))
    console.log(fonts[fontrand])
    this.props.store.dispatch({
      type: "ADD_PIN",
      pin: {
        x: x,
        y: y,
        fontSize: rand,
        fontFamily: fonts[fontrand]
      }
    })
  }

  render(){
    const style={
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      zIndex: -1,
      userSelect:"none"
    }

    let pins=this.props.pins.map((pin, index)=>{
      return (<Pin
                key={index}
                x={pin.x}
                y={pin.y}
                id={pin.id}
                fontSize={pin.fontSize}
                fontFamily={pin.fontFamily}
                store={this.props.store}
                 />)
    })
    return(

      <div
        className="paper"
        style={style}
        onDoubleClick={(e)=>this.clickPaper(e)}>
        {pins}
      </div>
    )
  }
}

function mapStateToProps(state) {
   return { pins: state.pins };
}

export default connect(mapStateToProps)(Notepad);
