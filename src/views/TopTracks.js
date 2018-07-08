'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import {fetchTopTracks} from '../actions/userActions';
import CircularProgress from 'material-ui/CircularProgress'

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

const TopTrackName = ({trackName}) => {
  if (trackName) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Track Name
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

const Playcount = ({playCount}) => {
  if (playCount) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            PlayCount
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            {playCount}
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

class TopTracks extends React.Component {
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
        }
      ]
    }
  }

  componentDidMount () {
    const {fetchTopTracks , isTopTracksLoading } = this.props
    const userName = localStorage['userName']
    fetchTopTracks(userName)
  }

  render () {
    const {topTracks,isTopTracksLoading} = this.props
    return (
      <WrapperContainer>
        {(() => {

          if (isTopTracksLoading === undefined || isTopTracksLoading === false) {
            return (
              <CircularProgress
                size={60}
                thickness={5}
                color='#323765'
                style={{paddingLeft: '45%', paddingTop: '3%'}}
              />
            )
          }

          if (topTracks && topTracks.length !== 0) {
            return topTracks.map(track => (
              <div
                class='card cardWidth'
                style={{marginTop: '16', marginBottom: '16px'}}
              >
                <header class='card-header'>
                  <p class='card-header-title textStyle'>
                    Top Tracks
                    <span class='icon is-small' style={{marginLeft: '2%'}}>
                      <i class='fas fa-music' aria-hidden='true' />
                    </span>
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
                            <TopTrackName trackName={track.name} />
                          </td>
                          <td style={{width: 300}}>
                            <ArtistName artistName={track.artist.name} />
                          </td>
                          <td style={{width: 300}}>
                            <Playcount playCount={track.playcount} />
                          </td>
                          <td style={{width: 300}}>
                            <UrlName urlName={track.url} />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

          else if (topTracks && topTracks.length === 0) {
            return (
              <div class='card-content'>
                <div class='media'>
                  <div class='media-left' />
                </div>
                <div class='content' style={{color: 'red'}}>
                  Currently No Any Data Available In Top Tracks
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
  fetchTopTracks: userName => {
    dispatch(fetchTopTracks(userName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopTracks)
