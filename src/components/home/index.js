import React, { Component } from 'react'
import css from './style.css'
import sass from './style.sass'
import logo from './logo.svg'

export default class Home extends Component {
  render () {
    return (
      <div>
        <a href='https://webpack.js.org/' target='_blank'>
          <img src={logo} className={css.block} />
        </a>
        <p className={sass.text}>
          This is an <strong>&lt;App /&gt;</strong> component!
        </p>
      </div>
    )
  }
}
