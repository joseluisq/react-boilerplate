import React, { Component } from 'react'
import style from './style.sass'
import logo from '../../assets/images/logo.svg'

export default class Home extends Component {
  render () {
    return (
      <div>
        <a href='https://webpack.js.org/' target='_blank'>
          <img src={logo} className={style.block} />
        </a>
        <p className={style.text}>
          This is an <strong>&lt;App /&gt;</strong> component!
        </p>
      </div>
    )
  }
}
