import React, { Component } from 'react';
import HomePage from './homePage';
import { connect } from 'react-redux';
import { onHideMenuBar, onSetActiveLink, onSetIsWaiting } from '../redux/actions';

class Login extends Component {

  componentDidMount() {
    //this.props.onHideMenuBar(true, true);
    this.props.onSetActiveLink('');
  }

  componentWillUnmount() {
    this.props.onSetIsWaiting(false);
  }

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

function mapStateToProps(state) {
  return {
    isWaiting: state.baseInfo.isWaiting
  };
}

const mapDispatchToProps = { onHideMenuBar, onSetActiveLink, onSetIsWaiting }

export default connect(mapStateToProps, mapDispatchToProps)(Login);