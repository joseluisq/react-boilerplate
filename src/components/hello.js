import React, { Component } from 'react'
import './hello.css'
import './hello.scss'
import logo from './logo.svg'

class Hello extends Component {

  render () {
    return (
      <div className='wrapper'>
        <div className='inner'>
          <a href='https://webpack.js.org/' target='_blank'>
            <img src={logo} />
          </a>
          <p className='desc'>
            This is a <strong>&lt;Hello /&gt;</strong> component.
          </p>
        </div>
      </div>
    )
  }

}

export default Hello
