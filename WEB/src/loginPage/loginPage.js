import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import moment from "moment";
import { responseGoogle } from "../api/googleFit";
import { addInfo, onLoggedIn } from "../redux/actions";
import { connect } from "react-redux";
import "./styles.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectProfile: false
    };
  }

  render() {
    const pic = require("../images/ehelse.svg");
    if (this.state.redirectProfile === true) {
      return <div />;
    }
    if (sessionStorage.getItem("googleResponse")) {
      console.log("Reading google client from localStorage");
      let response = JSON.parse(sessionStorage.getItem("googleResponse"));
      if (moment().diff(moment.unix(response.Zi.expires_at / 1000), "m") < 0) {
        responseGoogle.bind(this)(response);
        return <div />;
      } // Else move on to login screen because need new login data.
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 index-Image-head">
            <img src={pic} alt={"logo"} className="index-Image" />
          </div>
          <div className="col-sm-12 text-generic">
            <p>Logg inn for å registrere din data</p>
          </div>
          <div className="col-sm-12 login-button">
            {
              <GoogleLogin
                autoLoad={false}
                clientId="942269849137-5a1bgivhq71c5ni083igrbss4tbpr6sm.apps.googleusercontent.com"
                scope={
                  "https://www.googleapis.com/auth/fitness.activity.read " +
                  "https://www.googleapis.com/auth/fitness.blood_glucose.read " +
                  "https://www.googleapis.com/auth/fitness.blood_pressure.read " +
                  "https://www.googleapis.com/auth/fitness.body.read"
                }
                approvalPrompt="force"
                onSuccess={responseGoogle.bind(this)}
                onFailure={responseGoogle.bind(this)}
                responseType="id_token"
                className="google-login-button"
                buttonText="Sign in with you google account"
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { addInfo, onLoggedIn };

function mapStateToProps(state) {
  return {
    patient: state.patient
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
