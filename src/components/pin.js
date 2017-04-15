import React, { Component } from 'react'
import Draggable from 'react-draggable'
import Textarea from 'react-textarea-autosize';
import {Operations} from './operations'


export default class Pin extends Component{
  constructor(){
    super()
    this.state={
      text: '',
      max: 0,
      focus: false,
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
      pin: {id: this.props.pin.id, text: this.state.text, max: this.state.max}
    })
  })
  }

  getCoords(e){
    let id = this.props.pin.id
    let div = this.refs[id]
    this.props.store.dispatch({
      type: "MOVE_PIN",
      pin: {id: this.props.pin.id, x: div.getBoundingClientRect().left, y: div.getBoundingClientRect().top}
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
      id: this.props.pin.id
    })
  }

  // hidePin(){
  //   this.setState({
  //     hide: true
  //   })
  // }

  render(){

    const inputStyle={
      outline: "none",
      background: "none",
      border: "none",
      color: "#1D0F29",
      paddingLeft: 10,
      fontFamily: this.props.pin.fontFamily,
      fontWeight: this.props.pin.fontWeight,
      lineHeight: .95,
      fontSize: this.props.pin.fontSize + "px",
      resize: "none",
      opacity: (this.props.pin.opacity+.2),
      textShadow: "1px 1px 1px rgba(0,0,0,0.2)"
    }

    return(
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        zIndex={10}
        position={{x: this.props.pin.x, y: this.props.pin.y}}
        grid={[1, 1]}
        onStart={this.handleStart}
        onDrag={(e)=>this.onFocus(e)}
        onStop={this.getCoords.bind(this)}
          >
      <div className={this.state.hide ? "hide" : null} style={{position: "absolute", top: 0, left: 0}} ref={this.props.pin.id}>
        <Textarea autoFocus
          type="text"
          style={inputStyle}
          value={this.props.pin.text}
          onBlur={(e)=>this.onBlur(e)}
          onChange={(e)=>this.onChange(e)}
          onFocus={(e)=>this.onFocus(e)}
          cols={this.props.pin.max ? this.props.pin.max +2:1 }
          />
        <Operations
          focus={this.state.focus}
          deletePin={this.deletePin.bind(this)}
          />
      </div>

    </Draggable>
    )


  }
}
