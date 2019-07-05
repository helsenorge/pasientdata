import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import moment from "moment";
//import { Redirect } from "react-router";

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
      redirectProfile: false,

      urlBase:
        "https://www.googleapis.com/fitness/v1/users/me/dataSources/derived:com.google."
    };
  }

  getUserSteps(response) {
    return axios.get(
      this.state.urlBase +
        "step_count.delta:com.google.android.gms:estimated_steps/datasets/631148400000000000-1735686000000000000",
      { headers: { Authorization: "Bearer " + response.accessToken } }
    );
  }

  getUserWeight(response) {
    return axios.get(
      this.state.urlBase +
        "weight:com.google.android.gms:merge_weight/datasets/631148400000000000-1735686000000000000",
      { headers: { Authorization: "Bearer " + response.accessToken } }
    );
  }

  getUserHeight(response) {
    return axios.get(
      this.state.urlBase +
        "height:com.google.android.gms:merge_height/datasets/631148400000000000-1735686000000000000",
      { headers: { Authorization: "Bearer " + response.accessToken } }
    );
  }

  getUserHeartBeat(response) {
    return axios.get(
      this.state.urlBase +
        "heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm/datasets/631148400000000000-1735686000000000000",
      { headers: { Authorization: "Bearer " + response.accessToken } }
    );
  }

  getUserBloodPressure(response) {
    return axios.get(
      this.state.urlBase +
        "blood_pressure:com.google.android.gms:merged/datasets/631148400000000000-1735686000000000000",
      { headers: { Authorization: "Bearer " + response.accessToken } }
    );
  }

  getUserBloodGlucose(response) {
    return axios.get(
      this.state.urlBase +
        "blood_glucose:com.google.android.gms:merged/datasets/631148400000000000-1735686000000000000",
      { headers: { Authorization: "Bearer " + response.accessToken } }
    );
  }

  structureDatasets(dataType) {
    let measurements = [];

    dataType.data.point.forEach((item, index) => {
      measurements.push({
        start: this.formatNanosec(item.startTimeNanos),
        end: this.formatNanosec(item.endTimeNanos),
        value: item.value[0].intVal
      });
    });

    return measurements;
  }

  responseGoogle(response) {
    if (!localStorage.getItem("googleResponse")) {
      console.log("Saving google client to localStorage");
      localStorage.setItem("googleResponse", JSON.stringify(response));
    }
    axios
      .all([
        this.getUserSteps(response),
        this.getUserWeight(response),
        this.getUserHeight(response),
        this.getUserHeartBeat(response),
        this.getUserBloodPressure(response),
        this.getUserBloodGlucose(response)
      ])
      .then(
        axios.spread(
          (steps, weight, height, heartBeat, bloodPressure, bloodGlucose) => {
            let datasets = [...this.state.datasets];
            const pic = response.profileObj.imageUrl + "?sz=200";

            let stepMeasurement = this.structureDatasets(steps);
            let weightMeasurement = this.structureDatasets(weight);
            let heightMeasurement = this.structureDatasets(height);
            let heartBeatMeasurement = this.structureDatasets(heartBeat);
            let bloodPressureMeasurement = this.structureDatasets(
              bloodPressure
            );
            let bloodGlucoseMeasurement = this.structureDatasets(bloodGlucose);

            datasets.push(
              { name: "55423-8", measurements: stepMeasurement },
              { name: "29463-7", measurements: weightMeasurement },
              { name: "8302-2", measurements: heightMeasurement },
              { name: "8867-4", measurements: heartBeatMeasurement },
              { name: "85354-9", measurements: bloodPressureMeasurement },
              { name: "2339-0", measurements: bloodGlucoseMeasurement }
            );

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
          }
        )
      )
      .catch(error => {
        console.log(error);
      });
  }

  formatNanosec(ns) {
    let momentObject = moment(ns / 1000000);
    return momentObject.format("YYYY-MM-DDTHH:mm:ss"); // Conforms to FHIR standard
  }

  render() {
    const pic = require("../images/ehelse.svg");
    if (this.state.redirectProfile === true) {
      return <div />;
    } else if (localStorage.getItem("googleResponse")) {
      console.log("Reading google client to localStorage");
      this.responseGoogle(JSON.parse(localStorage.getItem("googleResponse")));
      return <div />;
    } else {
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
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
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
}

export default HomePage;
