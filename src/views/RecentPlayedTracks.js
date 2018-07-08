'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import {fetchRecentlyPlayedTracks , changeStatus} from '../actions/userActions'
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

const WrapperContainer = styled.div`
margin-top:100px;
margin-bottom: 24px;
`

const TrackName = ({trackName}) => {
  if (trackName) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            TrackName
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            {trackName}
          </div>
        </div>
      </div>
    )
  }
  return null
}

const ArtistName = ({artistName}) => {
  if (artistName) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            ArtistName
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            {artistName}
          </div>
        </div>
      </div>
    )
  }
  return null
}

const UrlName = ({urlName}) => {
  if (urlName) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            UrlName
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            <a href={urlName} target='_blank '> {urlName}</a>
          </div>
        </div>
      </div>
    )
  }
  return null
}

class RecentPlayedTracks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lovedTracks: [
        {
          sNo: 1,
          movieName: 'DDLJ',
          songName: 'Tujhe Dekha To'
        },
        {
          sNo: 2,
          movieName: 'RAM',
          songName: 'Tujhe Dekha To'
        },
        {
          sNo: 3,
          movieName: 'RAM',
          songName: 'Tujhe Dekha To'
        }
      ]
    }
  }

  componentDidMount () {
    const {fetchRecentlyPlayedTracks} = this.props
    const userName = localStorage['userName']
    fetchRecentlyPlayedTracks(userName)
    // console.log('userName=====================>',userName);
  }

  changeLikedStatus = (trackName , userName) => {
    const { changeStatus } = this.props;
    changeStatus(trackName,userName);
    console.log('=================================================>',trackName);
  }

  render () {
    const {recentTracks} = this.props
    const username = localStorage['userName']

    return (
      <WrapperContainer>
        {(() => {
          if (recentTracks && recentTracks.length !== 0) {
            return recentTracks.map(track => (
              <div
                class='card cardWidth'
                style={{marginTop: '16', marginBottom: '16px'}}
              >
                <header class='card-header'>
                  <p class='card-header-title textStyle'>
                    Recent Tracks
                    <div onClick={() => {
                      this.changeLikedStatus(track.trackName,username);
                    }}>

                    {track.liked ?  <span
                        class='icon has-text-danger'
                        style={{marginLeft: '60%', marginTop: '20%'}}
                      >
                        <i class='fas fa-heart' /> </span> : 
                        
                        <span
                        class='icon has-text-grey'
                        style={{marginLeft: '60%', marginTop: '20%'}}
                      >
                        <i class='fas fa-heart' />  </span> }
                    
                    </div>
                  </p>
                  <a
                    href='#'
                    class='card-header-icon'
                    aria-label='more options'
                  />

                </header>
                <div class='card-content'>
                  <div class='content'>
                    <div>
                      <table>
                        <tr>
                          <td style={{width: 300}}>
                            <TrackName trackName={track.trackName} />
                          </td>
                          <td style={{width: 300}}>
                            <ArtistName artistName={track.artistName} />
                          </td>
                          <td style={{width: 300}}>
                            <UrlName urlName={track.urlName} />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

         else if (recentTracks && recentTracks.length === 0) {
            return (
              <div class='card-content'>
                <div class='media'>
                  <div class='media-left' />
                </div>
                <div class='content' style={{color: 'red'}}>
                  Currently No Any Data Available In Recent Tracks
                  <br />
                  <time
                  >{`${new Date().getDate()} - ${new Date().getMonth() + 1} - ${new Date().getFullYear()}`}</time>
                </div>
              </div>
            )
          }
          else{
            return ( <div />);
          }
        })()}

      </WrapperContainer>
    )
  }
}

const mapStateToProps = state => state.players

const mapDispatchToProps = dispatch => ({
  fetchRecentlyPlayedTracks: userName => {
    dispatch(fetchRecentlyPlayedTracks(userName))
  },
  changeStatus: (trackName,userName) => {
    dispatch(changeStatus(trackName,userName));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentPlayedTracks)
