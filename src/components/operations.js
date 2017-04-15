import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

export class Operations extends Component{
  constructor(){
    super()
    this.state={
      fontsOn: false
    }
  }
  fontSelect(){
    this.setState({
      fontsOn: !this.state.fontsOn
    })
    this.props.onClick()
  }
  render(){
    let operations={
      position: "relative",
      width: "100%",
      textAlign: "left",
      background: "rgba(255,255,255,0.3)",
      borderTop: this.props.focus ? "1px solid rgba(0,0,0,0.3)" : "none"
    }

    let buttonStyle={
      background: "none",
      border: "none",
      outline: "none",
      color: "rgba(0,0,0,0.5)",
      margin: "5px 5px 5px 5px",
      padding: 0
    }

    return (
      <div style={operations} className={this.props.focus ? "handle" : "hide"}>

        <button
          style={buttonStyle}
          onClick={this.props.deletePin}>
          <FontAwesome
              name='window-close'
            /></button>

            <button
              style={buttonStyle}
              onClick={this.fontSelect.bind(this)}>
              <FontAwesome
                  name='font'
                /></button>
              <select className={this.state.fontsOn ? null : "hide"}>
                  <option value="value">value</option>
                </select>

        <button
          style={{...buttonStyle,float: "right"}}>
          <FontAwesome
              name='arrows'
            />
        </button>
      </div>
    )
  }
}
