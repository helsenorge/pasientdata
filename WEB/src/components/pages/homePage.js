import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import moment from "moment";
import { onLoggedIn, onSetIsWaiting, onCreateConnection } from '../../redux/actions';
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

const API = "https://www.googleapis.com/fitness/v1/users/me/dataSources/derived:com.google.step_count.delta:com.google.android.gms:estimated_steps/datasets/";
const DEFAULT_QUERY = "631148400000000000-1735686000000000000";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.state = {
      measurements: [],
      redirectProfile: false,
      waiting: false,
    };
  }

  setWaiting() {
    this.props.onSetIsWaiting(true);
  }

  responseGoogle(response) {
    this.props.onCreateConnection(response.profileObj.googleId);

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
        this.props.onLoggedIn(response.profileObj.googleId, response.name, response.profileObj.image, response.profileObj.email, measurements);
        this.setState({ redirectProfile: true });
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
    if (this.state.redirectProfile === true) {
      return <Redirect from='/login' to='/launch'/>
    } else if (!this.props.isWaiting) {
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
    } else {
      return <div></div>
    }
    
  }
}

const mapDispatchToProps = { onLoggedIn, onSetIsWaiting, onCreateConnection }

function mapStateToProps(state) {
  return {
    isWaiting: state.baseInfo.isWaiting,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
