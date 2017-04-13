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
      focus: true
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

  render(){
    const style={
      position: 'absolute',
      top: this.props.y,
      left: this.props.x,
    }
    let operations={
      position: "absolute",
      top: 0,
      left: -15,
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
      textShadow: "1px 1px 1px rgba(0,0,0,0.2)"
    }

    let buttonStyle={
      background: "none",
      border: "none",
      outline: "none"
    }

    return(
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        zIndex={100}
        position={null}
        grid={[1, 1]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
      <div style={style}>
          <div style={operations}><button
            className={this.state.focus ? null : "hide"}
            style={buttonStyle}
            onClick={()=>this.deletePin()}>x</button>
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
          cols={this.props.max ? this.props.max+3:1}
          />
      </div>
    </Draggable>
    )


  }
}
