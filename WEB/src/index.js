import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App';
import FhirRedirect from './components/redirect';
import FhirLaunch from './components/fhirlaunch';
import thunk from 'redux-thunk';
import reducers from './redux/reducer_root';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(...middlewares)
));


ReactDOM.render((
  <Provider store={store}>
  <BrowserRouter>
    <Route exact path="/" component={App} />
    <Route path="/redirect" component={FhirRedirect} />
    <Route path="/launch" component={FhirLaunch} />
  </BrowserRouter>
  </Provider>
  ),
  document.getElementById('root')
);