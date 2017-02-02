import React, { Component } from 'react'
import './style.css'
import './style.scss'
import logo from './logo.svg'

class App extends Component {

  render () {
    return (
      <div className='wrapper'>
        <div className='inner'>
          <a href='https://webpack.js.org/' target='_blank'>
            <img src={logo} />
          </a>
          <p className='desc'>
            This is a <strong>&lt;App /&gt;</strong> component.
          </p>
        </div>
      </div>
    )
  }

}

export default App
