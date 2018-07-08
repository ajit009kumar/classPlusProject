'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components';
import Header from './Header';
import InfoContainer from './InfoContainer';


const Wrapper = styled.div`
&::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: -1;
}
`;


class Profile extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        const {history} = this.props;
    return( 

        <Wrapper>
            <Header />
            <InfoContainer history = {history} />
        </Wrapper>
        	
        // <div class="card">
        //  <div class="card-image">
        //  <figure class="image is-4by3">
        //  <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
        //  </figure> 
        //  </div>
        // </div>

     );
    }

}

export default connect(null, null)(Profile);
