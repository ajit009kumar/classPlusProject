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
import { updateField , loginUser } from '../actions/userActions';
import Auth from '../modules/Auth';


// import './../app.css';

const HeaderConatiner = {
  color: {
    backgroundColor: 'grey'
  }
}

class Login extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillReceiveProps(previousprops) {
    const { userInfo } = previousprops;
    const {history , toggleAuthenticateStatus } = this.props;
    if( userInfo && userInfo.token){
      Auth.authenticateUser(userInfo.token);
      Auth.addUserName(userInfo.user.name);
      if(Auth.isUserAuthenticated()){
        history.push('/profile');
      }
      else{
        history.push('/');
      }
    }
    
  }


  render () {
    const { update , login ,username,history , userInfo }= this.props;
    return (
      <div>
        <div className='top-bar'>
          <div className='top-bar-left'>
            <Link to='/'>Classplus</Link>
          </div>
          <Card className='container' style = {{marginTop:'5%'}} >
            <form 
                onSubmit={(event) => {
                    event.preventDefault();
                    login(username);
                  }}
               >
              <h2 className='card-heading'>Login With Fm Account</h2>
{/* 
              {successMessage &&
                <p className='success-message'>{successMessage}</p>}
              {errors.summary &&
                <p className='error-message'>{errors.summary}</p>} */}

              <div className='field-line'>
                <TextField
                  floatingLabelText='UserName'
                  name='username'
                  errorText={ userInfo ? userInfo.message : null}
                  // onChange={onChange}
                  // value={user.email}
                  onChange={(_, value) => {
                        update('username', value);
                   }}
                />
              </div>

              {/* <div className='field-line'>
                <TextField
                  floatingLabelText='Password'
                  type='password'
                  name='password'
                  onChange={(_, value) => {
                      update('password', value);
                   }}
                  // onChange={onChange}
                  // errorText={errors.password}
                  // value={user.password}
                />
              </div> */}

              <div className='button-line'>
                <RaisedButton type='submit' label='Log in' backgroundColor = "#323765"
                 labelStyle ={{color:grey100}}/>
              </div>

              <CardText>
                Don't have an account? <Link to={'/'} onClick = {() => {
                  window.open("https://www.last.fm/join?next=/","_blank");
                }}>Create one</Link>.
              </CardText>
            </form>
          </Card>

        </div>
      </div>
    )
  }
}


const mapStateToProps = state => state.players;

const mapDispatchToProps = dispatch => ({
  update: (field, value) => {
    dispatch(updateField(field, value));
  },
  login: (username) => {
    dispatch(loginUser(username));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
