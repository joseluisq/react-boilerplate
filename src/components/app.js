import React, { Component } from 'react'
import Home from './home'
import style from '../styles/app.sass'

export default class App extends Component {
  render () {
    return (
      <div className={style.wrapper}>
        <div className={style.inner}>
          <Home />
        </div>
      </div>
    )
  }
}
