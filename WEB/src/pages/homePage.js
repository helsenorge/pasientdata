import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import moment from "moment";

const API =
  "https://www.googleapis.com/fitness/v1/users/me/dataSources/derived:com.google.step_count.delta:com.google.android.gms:estimated_steps/datasets/";
const DEFAULT_QUERY = "631148400000000000-1735686000000000000";

class homePage extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.state = {
      name: "",
      email: "",
      pic: "",
      dataSet: [],
      measurements: []
    };
  }

  responseGoogle(response) {
    axios
      .get(API + DEFAULT_QUERY, {
        headers: { Authorization: "Bearer " + response.accessToken }
      })
      .then(res => {
        let measurements = [...this.state.measurements];
        res.data.point.forEach((item, index) =>
          measurements.push({
            start: this.formatNanosec(item.startTimeNanos),
            end: this.formatNanosec(item.endTimeNanos),
            value: item.value[0].intVal
          })
        );
        this.setState({
          name: response.profileObj.name,
          email: response.profileObj.email,
          pic: response.profileObj.imageUrl + "?sz=200",
          measurements: measurements
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  formatNanosec(ns) {
    let momentObject = moment(ns / 1000000);
    return momentObject.format("DD/MM-YY | HH:mm:ss");
  }

  formatMeasurements() {
    return this.state.measurements.map((item, index) => (
      <li key={index}>
        {" "}
        "Start: " {item.start} ", End: " {item.end} ", Steps: " {item.value}
      </li>
    ));
  }

  render() {
    return (
      <div>
        {
          <GoogleLogin
            autoLoad={false}
            clientId="942269849137-5a1bgivhq71c5ni083igrbss4tbpr6sm.apps.googleusercontent.com"
            scope="https://www.googleapis.com/auth/fitness.activity.read"
            approvalPrompt="force"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            responseType="id_token"
            className="google-login-button"
            buttonText="Sign in with you google account"
          />
        }
        <div>
          {this.formatMeasurements()}
          {console.log(this.state.measurements)}
        </div>
      </div>
    );
  }
}

export default homePage;
