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
      opacity: .7,
      textAlign: "Center",
      margin:"auto",
      textShadow: "-1px -1px 1px rgba(255,255,255,0.5), 1px 1px 1px rgba(0,0,0,0.5)",
    	color: "#ECDED9"
    }

    const crim={
      fontFamily: "Crimson Text",
      lineHeight: .9,
      fontSize: 80,
    }

    const mont={
      fontFamily: "Montserrat",
      fontWeight: 200,
      fontSize: 60
    }
    return(
      <div style={style}>
        <span style={crim}>pass a note by double clicking <br />anywhere on the page</span>
      </div>
    )
  }
  render(){
    const style={
      height: "100vh",
      width: "100vw",
      position: "absolute",
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
                text={pin.text}
                max={pin.max}
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
