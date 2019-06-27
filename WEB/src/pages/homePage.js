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
      dataSet: []
    };
  }

  responseGoogle(response) {
    axios
      .get(API + DEFAULT_QUERY, {
        headers: { Authorization: "Bearer " + response.accessToken }
      })
      .then(res => {
        this.setState({
          dataSet: res.data.point,
          name: response.profileObj.name,
          email: response.profileObj.email,
          pic: response.profileObj.imageUrl + "?sz=200"
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

  createDataList() {
    return this.state.dataSet.map((item, index) => (
      <li key={index}>
        {" "}
        "Start: " {this.formatNanosec(item.startTimeNanos)} ", End: "{" "}
        {this.formatNanosec(item.endTimeNanos)} ", Steps: "{" "}
        {item.value[0].intVal}
      </li>
    ));
  }

  render() {
    const list = this.createDataList();
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
          {console.log(this.state.dataSet)}
          {list}
        </div>
      </div>
    );
  }
}

export default homePage;
