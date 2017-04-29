import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import {fonts} from '../resources/constants'

export class Operations extends Component{
  constructor(props){
    super(props)
    this.state={
      operation: false,
      font: `${this.props.pin.fontFamily}, ${this.props.pin.fontWeight}`,
      fontSize: this.props.pin.fontSize
    }
  }

  toggleOperations(field){
    this.setState({
      operation: field
    })
  }

  changeFont(event){
    let fontFamily = event.target.value.split(", ")[0]
    let fontWeight = event.target.value.split(", ")[1]
    this.setState({
      font: event.target.value,
      operation: false
    })
    this.props.store.dispatch({
      type: "UPDATE_PIN",
      pin: {
        id: this.props.pin.id,
        fontFamily: fontFamily,
        fontWeight: fontWeight
      }
    })
  }

  fontSizeSlider(event){
    this.setState({
      fontSize: event.target.value
    })
  }

  changeSize(){
    this.props.store.dispatch({
      type: "UPDATE_PIN",
      pin: {
        id: this.props.pin.id,
        fontSize: this.state.fontSize
      }
    })
  }

  fontify(){
    const fontSizeSelect =
      <input
        type="range"
        value={this.state.fontSize}
        onMouseUp={this.changeSize.bind(this)}
        onChange={this.fontSizeSlider.bind(this)} min="10" max="80" step="1"/>

    const fontSelect =
      <select value={this.state.font} onChange={this.changeFont.bind(this)} style={{position: "absolute", top: 10, left: 0}}>
        {fonts.map((font, index)=>{
          return(<option key={index} value={`${font.fontFamily}, ${font.fontWeight}`}>
            {font.fontFamily}, {font.fontWeight}</option>)
        })}
      </select>

    switch(this.state.operation){
      case "fontsFam":
        return fontSelect
      case "fontsSize":
        return fontSizeSelect
      default:
        return null
    }
  }

  render(){

    let buttonStyle={
      background: "none",
      border: "none",
      outline: "none",
      color: "rgba(0,0,0,0.5)",
      margin: "5px 5px 5px 5px",
      padding: 0
    }

    let operations={
      position: "relative",
      width: "100%",
      textAlign: "left",
      background: "rgba(255,255,255,0.3)",
      borderTop: "1px solid rgba(0,0,0,0.3)"
    }

    return (
      <div>
        <div style={operations} className="handle">
          <button style={buttonStyle} onClick={this.props.deletePin}>
            <FontAwesome name='window-close'/>
          </button>
          <button style={buttonStyle} onClick={this.toggleOperations.bind(this, "fontsFam")}>
            <FontAwesome name='font' />
          </button>
          <button style={buttonStyle} onClick={this.toggleOperations.bind(this, "fontsSize")}>
            <FontAwesome name='text-width' />
          </button>
          <button style={{...buttonStyle,float: "right"}}>
            <FontAwesome  name='arrows' />
          </button>
        </div>
        <div style={{height: "25px", width: "100%", position: "relative"}} className={this.state.operation ? null : "hide"}>
          {this.fontify()}
        </div>
      </div>
    )
  }
}
