import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import moment from "moment";
//import { Redirect } from "react-router";

const API =
  "https://www.googleapis.com/fitness/v1/users/me/dataSources/derived:com.google.step_count.delta:com.google.android.gms:estimated_steps/datasets/";
const DEFAULT_QUERY = "631148400000000000-1735686000000000000";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
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

  responseGoogle(response) {
    axios
      .get(API + DEFAULT_QUERY, {
        headers: { Authorization: "Bearer " + response.accessToken }
      })
      .then(res => {
        let datasets = [...this.state.datasets];
        const pic = response.profileObj.imageUrl + "?sz=200";
        let measurements = [];
        res.data.point.forEach((item, index) => {
          measurements.push({
            start: this.formatNanosec(item.startTimeNanos),
            end: this.formatNanosec(item.endTimeNanos),
            value: item.value[0].intVal
          });
        });
        datasets.push({ name: "step_count", measurements });
        this.setState({
          googleId: response.profileObj.googleId,
          firstname: response.profileObj.givenName,
          lastname: response.profileObj.familyName,
          email: response.profileObj.email,
          image: pic,
          datasets: datasets,
          redirectProfile: true
        });
        this.props.onLogin(
          {
            googleId: response.profileObj.googleId,
            firstName: response.profileObj.givenName,
            family: response.profileObj.familyName,
            email: response.profileObj.email,
            image: pic
          },
          datasets
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  formatNanosec(ns) {
    let momentObject = moment(ns / 1000000);
    return momentObject.format("YYYY-MM-DDTHH:mm:ss"); // Conforms to FHIR standard
  }

  // formatMeasurements() {
  //   return this.state.datasets.measurements.map((item, index) => (
  //     <li key={index}>
  //       {" "}
  //       "Start: " {item.start} ", End: " {item.end} ", Steps: " {item.value}
  //     </li>
  //   ));
  // }

  render() {
    if (this.state.redirectProfile === true) {
      //return (
      //  <Redirect
      //    from="/login"
      //    to={{
      //      pathname: "/redirect",
      //      state: this.state
      //    }}
      //  />
      //);
      return <div />;
    } else {
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
        </div>
      );
    }
  }
}

export default HomePage;
