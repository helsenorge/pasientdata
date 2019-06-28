import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App';
import FhirRedirect from './pages/redirect';
import FhirLaunch from './pages/fhirlaunch';

ReactDOM.render((
  <BrowserRouter>
    <Route exact path="/" component={App} />
    <Route path="/redirect" component={FhirRedirect} />
    <Route path="/launch" component={FhirLaunch} />
  </BrowserRouter>
  ),
  document.getElementById('root')
);