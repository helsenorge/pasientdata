import React, { Component } from 'react';
import HomePage from './homePage';

class Login extends Component {


  render() {
    const pic = require('../images/ehelse.svg');

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 index-Image-head">
            <img src={pic} alt={"logo"} className="index-Image" />
          </div>
          <div className="col-sm-12 text-generic" >
            <p>Logg inn for å registrere din data</p>
          </div>
          {this.props.isWaiting ? <div className="loader"></div> : null
          }
          <div className="col-sm-12 login-buttons">
            <HomePage />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;