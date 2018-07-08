import {applyMiddleware, createStore, compose} from 'redux'
// import rootReducer from './reducers'
import thunk from 'redux-thunk';
import logger from 'redux-logger';


const middleWares = [
    thunk,
    logger
]

export default createStore(
//   rootReducer,
  undefined,
  compose(
      applyMiddleware(...middleWares), 
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)
