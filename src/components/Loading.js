import React, { Component } from 'react'
import load from './load.gif'
export default class Loading extends Component {
  render() {
    return (
        <div className="spinner text-center">
        <img src={load} alt="Loding" style={{width: "50px"}}/>
        </div>
    )
  }
}
