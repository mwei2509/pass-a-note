import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import Textarea from 'react-textarea-autosize';
import FontAwesome from 'react-fontawesome'


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
    this.onBlur()

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
      position: 'absolute',
      top: 0,
      left: 0
    }

    let operations={
      position: "relative",
      width: "100%",
      textAlign: "left",
      background: "rgba(255,255,255,0.3)",
      // padding: "0 0 3px 5px",
      borderTop: this.state.focus ? "1px solid rgba(0,0,0,0.3)" : "none"
    }

    const inputStyle={
      outline: "none",
      background: "none",
      border: "none",
      color: "#1D0F29",
      paddingLeft: 10,
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
      outline: "none",
      color: "rgba(0,0,0,0.5)",
      margin: "5px 5px 5px 5px",
      padding: 0
    }

    return(
      // <div ref={this.props.id} id="main" style={style}>
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        zIndex={10}
        position={{x: this.props.x, y: this.props.y}}
        grid={[1, 1]}
        onStart={this.handleStart}
        onDrag={this.handleDrag, (e)=>this.onFocus(e)}
        onStop={this.handleStop, this.getCoords.bind(this)}
          >
      <div className={this.state.hide ? "hide" : null} style={{position: "absolute", top: 0, left: 0}} ref={this.props.id}>
        <Textarea autoFocus
          type="text"
          style={inputStyle}
          value={this.props.text}
          onBlur={(e)=>this.onBlur(e)}
          onChange={(e)=>this.onChange(e)}
          onFocus={(e)=>this.onFocus(e)}
          cols={this.props.max ? this.props.max +2:1 }
          />
        <div style={operations} className="handle"><button
            className={this.state.focus ? null : "hide"}
            style={buttonStyle}
            onClick={this.deletePin.bind(this)}>
            <FontAwesome
                name='window-close'
                size='1x'
              /></button>
          <button
            className={this.state.focus ? "handle": "handle hide"}
            style={{...buttonStyle,float: "right"}}>
            <FontAwesome
                name='arrows'
                size='1x'
              />
            </button></div>
      </div>

    </Draggable>
    )


  }
}
