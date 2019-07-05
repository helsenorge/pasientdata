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
