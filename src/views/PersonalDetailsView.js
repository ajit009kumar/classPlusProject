'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import {fetchBasicInfo} from '../actions/userActions'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
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

const CardTextStyle = {
  paddingTop: 0
}

const NameField = ({name}) => {
  if (name) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Name
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            {name}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Name
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            Data Not Available
          </div>
        </div>
      </div>
    )
  }
}

const RealNameField = ({realname}) => {
  if (realname) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            RealName
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            {realname}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <header class='card-header '>
          <p class='card-header-title textStyle'>
            RealName
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            Data Not Available
          </div>
        </div>
      </div>
    )
  }
  // return null;
}

const CountryField = ({country}) => {
  if (country) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Country
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            {country}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Country
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            Data Not Available
          </div>
        </div>
      </div>
    )
  }
}

const AgeField = ({age}) => {
  if (age) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Age
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            {age}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Age
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            Data Not Available
          </div>
        </div>
      </div>
    )
  }
}

const PlayCountField = ({playcount}) => {
  if (playcount) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Playcount
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            {playcount}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Playcount
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            Data Not Available
          </div>
        </div>
      </div>
    )
  }
}

const SubscriberField = ({subscriber}) => {
  if (subscriber) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Subscriber
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            {subscriber}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Subscriber
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            Data Not Available
          </div>
        </div>
      </div>
    )
  }
}

const PlayListField = ({playlists}) => {
  if (playlists) {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Playlists
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            {playlists}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <header class='card-header'>
          <p class='card-header-title textStyle'>
            Playlists
          </p>
        </header>
        <div class='card-content'>
          <div class='content'>
            Data Not Available
          </div>
        </div>
      </div>
    )
  }
}

class PersonalDetailsView extends React.Component {
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
    const {fetchBasicInfo} = this.props
    const userName = localStorage['userName']
    fetchBasicInfo(userName)
  }

  render () {
    const {lovedTracks} = this.state
    const {
      age,
      country,
      name,
      playcount,
      realname,
      playlists,
      subscriber,
      isPersonalDetailsLoading
    } = this.props
  
    return (
      <WrapperContainer>

        {(() => {
            if(isPersonalDetailsLoading === undefined || isPersonalDetailsLoading === false ) {
              return (
              <CircularProgress
                size={60}
                thickness={5}
                color='#323765'
                style={{paddingLeft: '45%', paddingTop: '3%'}}
              />
            )
            }
            else{
                return(
                  <div class='card cardWidth'>
          <header class='card-header'>
            <p class='card-header-title textStyle'>
              Personal Details
            </p>
            <a href='#' class='card-header-icon' aria-label='more options'>
              <span class='icon'>
                <i class='fas fa-angle-down' aria-hidden='true' />
              </span>
            </a>
          </header>
          <div class='card-content'>
            <div class='content'>
              <div>
                <table>
                  <tr>
                    <td style={{width: 300}}>
                      <NameField name={name} />
                    </td>
                    <td style={{width: 300}}>
                      <RealNameField realname={realname} />
                    </td>
                  </tr>

                  <tr>
                    <td style={{width: 300}}>
                      <AgeField age={age} />
                    </td>
                    <td style={{width: 300}}>
                      <CountryField country={country} />
                    </td>
                  </tr>

                  <tr>
                    <td style={{width: 300}}>
                      <PlayCountField playcount={playcount} />
                    </td>
                    <td style={{width: 300}}>
                      <PlayListField realname={realname} />
                    </td>
                  </tr>

                  <tr>
                    <td style={{width: 300}}>
                      <SubscriberField subscriber={subscriber} />
                    </td>
                  </tr>
                </table>
              </div>

            </div>
          </div>
        </div>

                )
            }
        })()}
      
      </WrapperContainer>
    )
  }
}

const mapStateToProps = state => state.players

const mapDispatchToProps = dispatch => ({
  fetchBasicInfo: userName => {
    dispatch(fetchBasicInfo(userName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetailsView)
