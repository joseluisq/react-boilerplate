import React, { Component } from 'react'
import Home from './home'
import sass from '../styles/app.sass'

export default class App extends Component {
  render () {
    return (
      <div className={sass.wrapper}>
        <div className={sass.inner}>
          <Home />
        </div>
      </div>
    )
  }
}
