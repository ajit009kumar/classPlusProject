'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components';
import { white } from 'material-ui/styles/colors';
import TabsContainer from './TabsContainer';
import Auth from '../modules/Auth';
import { resetFieldValue } from '../actions/userActions';
import { App } from '../App';


// import './../app.css';


const Wrapper = styled.div`
background-image: url('https://image.shutterstock.com/image-photo/glitter-vintage-lights-background-gold-260nw-226746934.jpg');
background-size: cover;
`;


class InfoContainer extends React.Component {
    constructor (props) {
        super(props)
    }

    userLogout = () => {
      const { resetFieldValue } = this.props;
      Auth.deauthenticateUser();
      Auth.removeUSerName();
      resetFieldValue();
      this.props.history.push('/');  
    }

    render () {
      const userName = localStorage['userName'];
        const { history } = this.props;
    return( 
    <div>
      <div class="card">
      <Wrapper>
  <div class="card-content" style={{height: '170px'}}>
    <div class="media">
      <div class="media-left imageContainer">
        <figure class="image is-256x256">
          <img src="https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?cs=srgb&dl=landscape-nature-sky-236047.jpg&fm=jpg" alt="Placeholder image" style ={{borderRadius:'50%',height:'180px',width:'180px'}}/>
        </figure>
      </div>
      <div class="media-content" style={{marginTop: 70}}>
        <p class="title is-4" style={{color: white}}>{userName}</p>
      </div>
      <div style ={{marginTop:'50px'}} >
      <button type="button" onClick = {() => {
        this.userLogout()
      }} >Logout</button>
      </div>
    </div>
    <div class="content">
    </div>
  </div>  </Wrapper>
  <TabsContainer />
</div>
</div>
     );
    }

  }


  const mapDispatchToProps = dispatch => ({
    resetFieldValue: () => {
      dispatch(resetFieldValue());
    },
  });

export default connect(null, mapDispatchToProps)(InfoContainer);
