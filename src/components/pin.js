import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import Textarea from 'react-textarea-autosize';


export default class Pin extends Component{
  constructor(){
    super()
    this.state={
      text: '',
      max: 0,
      focus: true,
      hide: false
    }
  }

  onChange(e){
    let lines = e.target.value.split("\n").map((line)=>line.length)
    let max = Math.max(...lines)
    this.setState({
      text:e.target.value,
      max: max,
      focus: true
    },()=>{this.props.store.dispatch({
      type: "UPDATE_TEXT",
      pin: {id: this.props.id, text: this.state.text, max: this.state.max}
    })
  })
  }

  getCoords(e){
    let id = this.props.id
    let div = this.refs[id]
    this.props.store.dispatch({
      type: "MOVE_PIN",
      pin: {id: this.props.id, x: div.getBoundingClientRect().left, y: div.getBoundingClientRect().top}
    })

  }

  onFocus(e){
    this.setState({
      focus: true
    })
  }

  onBlur(e){
    setTimeout(()=>this.setState({
      focus: false
    }),200)
  }

  deletePin(){
    this.props.store.dispatch({
      type: "DELETE_PIN",
      id: this.props.id
    })
  }

  hidePin(){
    this.setState({
      hide: true
    })
  }

  render(){
    if(this.props.id==1){
      console.log(`props- x: ${this.props.x}, y: ${this.props.y}`)
      let div = this.refs[1]
      if(div){
        console.log(`currently- x: ${div.getBoundingClientRect().left}, y: ${div.getBoundingClientRect().top}`)
      }
    }
    const style={
      position: 'fixed',
      top: this.props.y,
      left: this.props.x
    }

    let operations={
      position: "absolute",
      bottom: -10,
      left: 0,
      width: 15
    }

    const inputStyle={
      outline: "none",
      background: "none",
      border: "none",
      color: "#1D0F29",
      fontFamily: this.props.fontFamily,
      fontWeight: this.props.fontWeight,
      lineHeight: .95,
      fontSize: this.props.fontSize + "px",
      resize: "none",
      opacity: (this.props.opacity+.2),
      textShadow: "1px 1px 1px rgba(0,0,0,0.2)",
      borderBottom: this.state.focus ? "1px solid rgba(0,0,0,0.3)" : "none"
    }

    let buttonStyle={
      background: "none",
      border: "none",
      outline: "none",
      margin: 0,
      padding: 0,
      opacity: 0.3
    }

    return(
      // <div ref={this.props.id} id="main" style={style}>
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        zIndex={100}
        position={null}
        grid={[1, 1]}
        onStart={this.handleStart}
        onDrag={this.handleDrag, (e)=>this.onFocus(e)}
        onStop={this.handleStop, (e)=>this.onBlur(e)}>
      <div className={this.state.hide ? "hide" : null} ref={this.props.id} id="main" style={style}>
          <div style={operations}><button
            className={this.state.focus ? null : "hide"}
            style={buttonStyle}
            onClick={this.hidePin.bind(this)}>x</button>
          <button
            className={this.state.focus ? "handle": "handle hide"}
            style={buttonStyle}>o</button></div>
        <Textarea autoFocus
          type="text"
          style={inputStyle}
          value={this.props.text}
          onBlur={(e)=>this.onBlur(e)}
          onChange={(e)=>this.onChange(e)}
          onFocus={(e)=>this.onFocus(e)}
          cols={this.props.max ? this.props.max * 1.1:1 }
          />
      </div>
    </Draggable>
    )


  }
}
