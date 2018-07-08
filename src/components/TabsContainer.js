'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import PersonalDetailsView from '../views/PersonalDetailsView';
import RecentPlayedTracks from '../views/RecentPlayedTracks';
import LoveTracks  from '../views/LoveTracks';
import TopTracks from '../views/TopTracks';
import TopArtists from '../views/TopArtists';
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

// const callRecentlyPlayedTracks = () => {}

// const calltopAlbums = () => {}

// const calltopArtist = () => {}

// const calltopTracks = () => {}

class TabsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tabsName: [
        {name: 'Personal Details'},
        {name: 'Recently Played'},
        {name: 'Top Artists'},
        {name: 'Top Tracks'},
        {name: 'Love Tracks'}
      ],
      personalDetailsCall: false,
      recentlyPlayedTracks:false,
      loveTracks:false,
      topTracks:false,
      topArtists:false
    }
  }

  callPersonalDetails = () => {
    const { personalDetailsCall } = this.state;
    this.setState({
      personalDetailsCall: !personalDetailsCall,
      recentlyPlayedTracks:false,
      loveTracks:false,
      topTracks:false,
      topArtists:false      
    })
  }

  callRecentlyPlayedTracks = () => {
    const { recentlyPlayedTracks } = this.state;
    this.setState({
      recentlyPlayedTracks:!recentlyPlayedTracks,
      personalDetailsCall:false,
      loveTracks:false,
      topTracks:false,
      topArtists:false     
    })
  }

  callLoveTracks = () => {
    const { loveTracks } = this.state;
    this.setState({
      loveTracks:!loveTracks,
      recentlyPlayedTracks:false,
      personalDetailsCall:false,
      topTracks:false,
      topArtists:false
    })
  }

  callTopTracks = () => {
    const { topTracks } = this.state;
    this.setState({
      topTracks: !topTracks,
      loveTracks:false,
      recentlyPlayedTracks:false,
      personalDetailsCall:false,
      topArtists:false
    })
  }

  calltopArtists = () => {
    const { topArtists } = this.state;
    this.setState({
      topArtists: !topArtists,
      topTracks: false,
      loveTracks:false,
      recentlyPlayedTracks:false,
      personalDetailsCall:false
    })
  }

  render () {
    const {tabsName, personalDetailsCall , recentlyPlayedTracks , loveTracks , topTracks , topArtists  } = this.state;
    const { update , login ,username,history , userInfo }= this.props;
    
    return (
      <div style={{backgroundColor: "transparent"  }}>
        <div class='tabs is-right is-boxed is-medium tabs-toggle-link-border-width' style={{backgroundColor: 'black', color: 'white'}}>
          <ul>
            {personalDetailsCall ? 
                <li
                 class="is-active"
              onClick={() => {
                this.callPersonalDetails()
              }}
            >
              <a>
                <span>Personal Details</span>
              </a>
            </li> : 
            <li
              onClick={() => {
                this.callPersonalDetails()
              }}
            >
              <a>
                <span>Personal Details</span>
              </a>
            </li> }

            {recentlyPlayedTracks ?   <li
             class="is-active"
              onClick={() => {
                this.callRecentlyPlayedTracks()
              }}
            >
              <a>
                <span>Recently Played</span>
              </a>
            </li> :  <li
              onClick={() => {
                this.callRecentlyPlayedTracks()
              }}
            >
              <a>
                <span>Recently Played</span>
              </a>
            </li>  }
          
            {topArtists ? 
              <li
              class="is-active"
              onClick={() => {
                this.calltopArtists()
              }}
            >
              <a>
                <span>Top Artists</span>
              </a>
            </li>: 
            <li
              onClick={() => {
                this.calltopArtists()
              }}
            >
              <a>
                <span>Top Artists</span>
              </a>
            </li>

           }

            {topTracks ?  <li
               class="is-active"
              onClick={() => {
               this.callTopTracks()
              }}
            >
              <a>
                <span>Top Tracks</span>
              </a>
            </li> :  <li
              onClick={() => {
               this.callTopTracks()
              }}
            >
              <a>
                <span>Top Tracks</span>
              </a>
            </li> }
           

            {loveTracks ?   <li
                class="is-active"
              onClick={() => {
                this.callLoveTracks()
              }}
            >
              <a>
                <span>Love Tracks</span>
              </a>
            </li> :   <li
              onClick={() => {
                this.callLoveTracks()
              }}
            >
              <a>
                <span>Love Tracks</span>
              </a>
            </li> }

          </ul>
        </div>
        {personalDetailsCall ? <PersonalDetailsView /> : <div />}
        {recentlyPlayedTracks ? <RecentPlayedTracks /> : <div />}
        {loveTracks ? <LoveTracks />: <div />}
        {topTracks ? <TopTracks /> : <div />}
        {topArtists? <TopArtists /> : <div />}
      </div>
    )
  }
}

const mapStateToProps = state => state.players;

const mapDispatchToProps = dispatch => ({
  // fetchBasicInfo:() => {
  //     dispatch(fetchBasicInfo())
  // }
});

export default connect(mapStateToProps,mapDispatchToProps)(TabsContainer);


// export default connect(null, null)(TabsContainer)
