import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import {SketchPicker} from 'react-color'

export class Sidebar extends Component{
  constructor(){
    super()
    this.state={
      colorOn: false
    }
  }

  toggleColor(e){
    this.setState({
      colorOn: !this.state.colorOn
    })
  }

  pickColor(color){
    this.props.changeBackground(color)
  }

  render(){
    const style={
      position: "fixed",
      top: 0,
      bottom: 0,
      height: "100vh",
      zIndex: 20
    }

    const icons={
      display: "block",
      margin: 10,
      color: "rgba(0,0,0,0.5)"
    }

    return(
      <div style={style}>
        <FontAwesome
            name='floppy-o'
            style={icons}
          />
        <FontAwesome
            name='telegram'
            style={icons}
          />
          <FontAwesome
              name='download'
              style={icons}
            />
          <FontAwesome
              name='paint-brush'
              onClick={this.toggleColor.bind(this)}
              style={icons}
            />
          <div style={{position: "absolute", top: 50, left: 50}} className={this.state.colorOn ? null : "hide"}>
            Background Color: <span onClick={this.toggleColor.bind(this)}>X</span>
            <SketchPicker
              color={this.props.currentBackground}
              disableAlpha={true}
              onChangeComplete={ this.pickColor.bind(this) }
               />
            </div>
            <FontAwesome
                name='text-width'
                style={icons}
              />
      </div>
    )
  }
}
