'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Card, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { grey100 } from 'material-ui/styles/colors';

// import './../app.css';

const HeaderConatiner = {
  color: {
    backgroundColor: 'grey'
  }
}

class Home extends React.Component {
  constructor (props) {
    super(props)
  }

  onSubmit = () => {
    console.log('------------------------------------>')
  }

  render () {
    console.log('______________________________________________________________');
    return (
      <div>
        <div className='top-bar'>
          <div className='top-bar-left'>
            <Link to='/'>Classplus</Link>
          </div>
          <Card className='container' style = {{marginTop:'5%'}} >
            <form action='/' onSubmit={this.onSubmit}>
              <h2 className='card-heading'>Sign Up</h2>
              <div className='field-line'>
                <TextField
                  floatingLabelText='User-Name'
                  name='name'
                  //   errorText={errors.name}
                  //   onChange={onChange}
                  //   value={user.name}
                />
              </div>

              <div className='field-line'>
                <TextField
                  floatingLabelText='Email'
                  name='email'
                  //   errorText={errors.email}
                  //   onChange={onChange}
                  //   value={user.email}
                />
              </div>

              <div className='field-line'>
                <TextField
                  floatingLabelText='Password'
                  type='password'
                  name='password'
                  //   onChange={onChange}
                  //   errorText={errors.password}
                  //   value={user.password}
                />
              </div>

              <div className='button-line'>
              <RaisedButton type='submit'  label='Create New Account' backgroundColor = "#323765"
                 labelStyle ={{color:grey100}}/>
            
              </div>

              <CardText>
                Already have an account? <Link to={'/login'}>Log in</Link>
              </CardText>
            </form>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(Home)
