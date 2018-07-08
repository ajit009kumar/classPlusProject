import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import reducers from './reducers/index';
import Auth from './modules/Auth';






// import routes from './routes.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import Profile from './components/Profile';
import Home from './components/Home';
import Login from './components/Login';

const middleware = applyMiddleware(thunk)
const store = createStore(reducers, middleware)


injectTapEventPlugin();


const styles = {
  title: {
    cursor: 'pointer',
  },
};


const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/profile',
        state: { from: props.location }
      }}/>
    ):
    (
      <Component {...props} {...rest} />
    ) 
  )}/>
)


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

// const PropsRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     <Component {...props} {...rest} />
//   )}/>
// )



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  }

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus();
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })

  }


    render() {
      const { authenticated } = this.state;
      return (
        <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Router history={history}>
          <div>
            <PrivateRoute exact path="/profile" component={Profile} />
            <PropsRoute exact path="/" component={Login}   /> 
          </div>
          </Router>
        </MuiThemeProvider>
        </Provider>
      );
    }
}

export default App;