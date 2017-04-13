import React, { Component } from 'react';
import Pin from './pin'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import {connect} from 'react-redux'

class Notepad extends Component{
  constructor(){
    super()
  }

  clickPaper(e){
    e.preventDefault()
    let x = e.clientX;
    let y = e.clientY;
    let rand = Math.floor(Math.random() * (80-10+1)) + 10

    const fonts=[
    {
      fontFamily: "Montserrat",
      fontWeight: 200
    },{
      fontFamily: "Montserrat",
      fontWeight: 200
    },{
      fontFamily: "Montserrat",
      fontWeight: 400
    },{
      fontFamily: "Montserrat",
      fontWeight: 400
    },{
      fontFamily: "Montserrat",
      fontWeight: 800
    },{
      fontFamily: "Crimson Text",
      fontWeight: 400
    },{
      fontFamily: "Open Sans",
      fontWeight: 400
    },{
      fontFamily: "Nunito",
      fontWeight: 200
    },{
      fontFamily: "Nunito",
      fontWeight: 400
    },{
      fontFamily: "Libre Baskerville",
      fontWeight: 400
    },{
      fontFamily: "Libre Baskerville",
      fontWeight: 700
    },{
      fontFamily: "Bitter",
      fontWeight: 400
    },{
      fontFamily: "Bitter",
      fontWeight: 700
    },{
      fontFamily: "Lobster",
      fontWeight: 400
    },{
      fontFamily: "Arimo",
      fontWeight: 400
    },{
      fontFamily: "Pacifico",
      fontWeight: 400
    }]

    let fontrand=Math.floor(Math.random() * (fonts.length))
    let fontchoice=fonts[fontrand]

    this.props.store.dispatch({
      type: "ADD_PIN",
      pin: {
        x: x,
        y: y,
        fontSize: rand,
        fontWeight: fontchoice.fontWeight,
        opacity: Math.random(),
        fontFamily: fontchoice.fontFamily
      }
    })
  }

  intro(){
    const style={
      paddingTop: 50,
      opacity: .2,
      textAlign: "Center",
      fontFamily: "Libre Baskerville",
      fontSize: 70,
      margin:"auto"
    }
    return(
      <div style={style}>
        Double click to type <br />anywhere on the page.
      </div>
    )
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
                opacity={pin.opacity}
                fontWeight={pin.fontWeight}
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
        {(pins.length >= 1) ? null : this.intro()}
        {pins}
      </div>
    )
  }
}

function mapStateToProps(state) {
   return { pins: state.pins };
}

export default connect(mapStateToProps)(Notepad);
