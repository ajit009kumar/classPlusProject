import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { indexRouter } from 'react-router';
import history from './history';
import { Route, browserHistory, Redirect} from 'react-router'
import App from './App';
 
const Routes = () => (
   <Router history = {history}>
   <Route path = "/" component={App} >
   </Route>
   </Router>
);

export default Routes;