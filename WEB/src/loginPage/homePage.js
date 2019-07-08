import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import moment from "moment";
import { responseGoogle } from "../api/googleFit";
//import { Redirect } from "react-router";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleId: "",
      firstname: "",
      lastname: "",
      email: "",
      image: "",
      datasets: [],
      redirectProfile: false
    };
  }

  structureDatasets(dataType) {
    let measurements = [];

      dataType.data.point.forEach((item, index) => {
        if(item.value[0].intVal){
          measurements.push({
            start: this.formatNanosec(item.startTimeNanos),
            end: this.formatNanosec(item.endTimeNanos),
            value: item.value[0].intVal
          });
        }
        else if(item.value[0].fpVal){
        measurements.push({
          start: this.formatNanosec(item.startTimeNanos),
          end: this.formatNanosec(item.endTimeNanos),
          value: item.value[0].fpVal
        });
        }else {
          return;
        }
      });
    return measurements;
  }

  formatNanosec(ns) {
    let momentObject = moment(ns / 1000000);
    return momentObject.format("YYYY-MM-DDTHH:mm:ss"); // Conforms to FHIR standard
  }

  render() {
    const pic = require("../images/ehelse.svg");
    if (this.state.redirectProfile === true) {
      return <div />;
    }
    if (localStorage.getItem("googleResponse")) {
      console.log("Reading google client from localStorage");
      let response = JSON.parse(localStorage.getItem("googleResponse"));
      if (moment().diff(moment.unix(response.Zi.expires_at), "m") < 0) {
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
                onLogin={this.props.onLogin}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
