import React, { Component } from 'react';
import Pin from './pin'
import {connect} from 'react-redux'
import {Sidebar} from './sidebar.js'
import {fonts} from '../resources/constants'

class Notepad extends Component{
  constructor(){
    super()
    this.state = {
      background: "linear-gradient(130deg, #F8E8E4, #FBFBEC)",
      bgdeg: 130,
      bg1: "#F8E8E4",
      bg2: "#FBFBEC"
    }
  }

  changeBackground(select, color){
    if (select==0){
      this.setState({
        bg1: color.hex,
        bg2: color.hex
      })
    }else{
      this.setState({
        [`bg${select}`]: color.hex
      })
    }
  }

  changeDegrees(deg){
    this.setState({
      bgdeg: deg
    })
  }

  clickPaper(e){
    e.preventDefault()
    let x = e.clientX;
    let y = e.clientY;
    let rand = Math.floor(Math.random() * (80-10+1)) + 10

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
      userSelect:"none"
    }

    let pins=this.props.pins.map((pin, index)=>{
      return (<Pin
                key={index}
                pin={pin}
                store={this.props.store}
                 />)
    })
    return(
      <div style={style}>
        <Sidebar
          store={this.props.store}
          ogBackground="#F8E8E4"
          changeBackground={this.changeBackground.bind(this)}
          changeDegrees={this.changeDegrees.bind(this)}
          />
        <div
          className="paper"
          style={{...style,background: `linear-gradient(${this.state.bgdeg}deg, ${this.state.bg1}, ${this.state.bg2})`}}
          onDoubleClick={(e)=>this.clickPaper(e)}>
          {(pins.length >= 1) ? null : this.intro()}
          {pins}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
   return { pins: state.pins };
}

export default connect(mapStateToProps)(Notepad);
