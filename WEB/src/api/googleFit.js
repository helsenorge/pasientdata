import axios from "axios";

var urlBase =
  "https://www.googleapis.com/fitness/v1/users/me/dataSources/derived:com.google.";

export function getUserSteps(response) {
  return axios.get(
    urlBase +
      "step_count.delta:com.google.android.gms:estimated_steps/datasets/631148400000000000-1735686000000000000",
    { headers: { Authorization: "Bearer " + response.accessToken } }
  );
}

export function getUserWeight(response) {
  return axios.get(
    urlBase +
      "weight:com.google.android.gms:merge_weight/datasets/631148400000000000-1735686000000000000",
    { headers: { Authorization: "Bearer " + response.accessToken } }
  );
}

export function getUserHeight(response) {
  return axios.get(
    urlBase +
      "height:com.google.android.gms:merge_height/datasets/631148400000000000-1735686000000000000",
    { headers: { Authorization: "Bearer " + response.accessToken } }
  );
}

export function getUserHeartBeat(response) {
  return axios.get(
    urlBase +
      "heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm/datasets/631148400000000000-1735686000000000000",
    { headers: { Authorization: "Bearer " + response.accessToken } }
  );
}

export function getUserBloodPressure(response) {
  return axios.get(
    urlBase +
      "blood_pressure:com.google.android.gms:merged/datasets/631148400000000000-1735686000000000000",
    { headers: { Authorization: "Bearer " + response.accessToken } }
  );
}

export function getUserBloodGlucose(response) {
  return axios.get(
    urlBase +
      "blood_glucose:com.google.android.gms:merged/datasets/631148400000000000-1735686000000000000",
    { headers: { Authorization: "Bearer " + response.accessToken } }
  );
}

export function responseGoogle(response) {
  console.log("Saving google client to localStorage");
  localStorage.setItem("googleResponse", JSON.stringify(response));

  axios
    .all([
      getUserSteps(response),
      getUserWeight(response),
      getUserHeight(response),
      getUserHeartBeat(response),
      getUserBloodPressure(response),
      getUserBloodGlucose(response)
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
          let bloodPressureMeasurement = this.structureDatasets(bloodPressure);
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
