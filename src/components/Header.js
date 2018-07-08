'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
// import './../app.css';

const Wrapper = styled.div`
&::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: grey;
  z-index: -1;
}
`

const HeaderConatiner = {
  color: {
    backgroundColor: 'grey'
  }
}

class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='card top' style={{backgroundColor: 'white'}}>
        <img
          src='https://classplusapp.com/images/HEADER LOGO SIZE 1X.png'
          alt='Classplus'
          style={{height: '40px'}}
        />
      </div>
    )
  }
}

export default connect(null, null)(Header)
