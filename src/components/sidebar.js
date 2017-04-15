import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
// import MyColorPicker from './colorpicker.js'
import {ChromePicker} from 'react-color'

export class Sidebar extends Component{
  constructor(props){
    super(props)
    this.state={
      colorOn: false,
      gradient: 1,
      bgselect: 0,
      currentbg: this.props.ogBackground
    }
  }

  degreeSlider(e){
    this.props.changeDegrees(e.target.value)
  }

  bgSelect(e){
    this.setState({
      bgselect: e.target.value
    },()=>{console.log(this.state.bgselect)})
  }

  toggleColor(e){
    this.setState({
      colorOn: !this.state.colorOn
    })
  }

  pickColor(color){
    this.setState({
      currentbg: color.hex
    })
    this.props.changeBackground(this.state.bgselect, color)
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

    const bgSelect={
      position: "absolute",
      background: "#fff",
      top: 50,
      left: 50,
      fontSize: "10px",
      padding: 5
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
          <div style={bgSelect} className={this.state.colorOn ? null : "hide"}>
            <span style={{float: "right", padding: 5}} onClick={this.toggleColor.bind(this)}>
              <FontAwesome name='window-close' />
            </span>
            Background Color:
            <input type="range" onChange={this.degreeSlider.bind(this)} min="-180" max="180" step="5"/><br />
            <input type="radio" name="bg1" value={0} checked={this.state.bgselect==0} onChange={this.bgSelect.bind(this)}/>flat
            <input type="radio" name="bg1" value={1} checked={this.state.bgselect==1} onChange={this.bgSelect.bind(this)}/>bg1
            <input type="radio" name="bg1" value={2} checked={this.state.bgselect==2} onChange={this.bgSelect.bind(this)}/>bg2<br />

            <ChromePicker
              color={this.state.currentbg}
              disableAlpha={true}
              onChange={ this.pickColor.bind(this) }
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
