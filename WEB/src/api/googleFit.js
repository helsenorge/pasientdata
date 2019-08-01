import axios from "axios";
import moment from "moment";

/*
 * Handles all communication with googleFit, once the user has logged in.
 */

var urlBase =
  "https://www.googleapis.com/fitness/v1/users/me/dataSources/derived:com.google.";

//1533122511000000000-1564658652000000000 - 01.01.18-01.01.19

var startEndDate = (moment().subtract(1, "year").format("X") + "000000000") + "-" + (moment().format("X") + "000000000");

export function getUserSteps(response) {
  return axios.get(
    urlBase +
      "step_count.delta:com.google.android.gms:estimated_steps/datasets/" +
      startEndDate,
    { headers: { Authorization: "Bearer " + response.accessToken } }
  );
}

export function getUserWeight(response) {
  return axios.get(
    urlBase +
      "weight:com.google.android.gms:merge_weight/datasets/" +
      startEndDate,
    { headers: { Authorization: "Bearer " + response.accessToken } }
  );
}

// export function getUserHeight(response) {
//   return axios.get(
//     urlBase +
//       "height:com.google.android.gms:merge_height/datasets/" + startEndDate,
//     { headers: { Authorization: "Bearer " + response.accessToken } }
//   );
// }

// export function getUserHeartBeat(response) {
//   return axios.get(
//     urlBase +
//       "heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm/datasets/" + startEndDate,
//     { headers: { Authorization: "Bearer " + response.accessToken } }
//   );
// }

// export function getUserBloodPressure(response) {
//   return axios.get(
//     urlBase +
//       "blood_pressure:com.google.android.gms:merged/datasets/" + startEndDate,
//     { headers: { Authorization: "Bearer " + response.accessToken } }
//   );
// }

// export function getUserBloodGlucose(response) {
//   return axios.get(
//     urlBase +
//       "blood_glucose:com.google.android.gms:merged/datasets/" + startEndDate,
//     { headers: { Authorization: "Bearer " + response.accessToken } }
//   );
// }

export function getUserActivities(response) {
  return axios.get(
    urlBase +
      "activity.segment:com.google.android.gms:merge_activity_segments/datasets/" +
      startEndDate,
    { headers: { Authorization: "Bearer " + response.accessToken } }
  );
}

// export function getUserBatchedActivity(response) {
//   return axios.get(
//     urlBase +
//       "activity.segment:com.google.android.gms:session_activity_segment/datasets/" + startEndDate,
//     { headers: { Authorization: "Bearer " + response.accessToken } }
//   );
// }

export function formatNanosec(ns) {
  let momentObject = moment(Math.floor(ns / 1000000));
  return momentObject.format("YYYY-MM-DDTHH:mm:ss"); // Conforms to FHIR standard
}

export function structureDatasets(dataType) {
  let measurements = [];
  let currentValue;
  let startTime;
  let endTime;
  let intervalSeconds;
  let secondValue;
  let currentNano;
  let currentIntervalLength;
  let intervalValueSum;
  let startNanos;
  let endNanos;

  const nanoSecFactor = 1000000000;
  dataType.data.point.forEach((item, index) => {
    if (item.value[0].intVal) {
      currentValue = item.value[0].intVal;
    } else if (item.value[0].fpVal) {
      currentValue = item.value[0].fpVal;
    } else {
      return;
    }
    startNanos = parseInt(item.startTimeNanos, 10);
    endNanos = parseInt(item.endTimeNanos, 10);
    intervalSeconds = (endNanos - startNanos) / nanoSecFactor;
    if (intervalSeconds <= 60) {
      startTime = formatNanosec(startNanos);
      endTime = formatNanosec(endNanos);
      measurements.push({
        start: startTime,
        end: endTime,
        value: currentValue
      });
    } else {
      secondValue = currentValue / intervalSeconds;
      currentNano = startNanos;
      intervalValueSum = 0;
      while (intervalSeconds > 0) {
        currentIntervalLength = Math.min(60, intervalSeconds);
        if (currentIntervalLength === 60) {
          intervalValueSum += Math.floor(secondValue * currentIntervalLength);
          measurements.push({
            start: formatNanosec(currentNano),
            end: formatNanosec(
              currentNano + currentIntervalLength * nanoSecFactor
            ),
            value: Math.floor(secondValue * currentIntervalLength)
          });
        } else {
          measurements.push({
            start: formatNanosec(currentNano),
            end: formatNanosec(
              currentNano + currentIntervalLength * nanoSecFactor
            ),
            value: currentValue - intervalValueSum
          });
        }
        intervalSeconds -= currentIntervalLength;
        currentNano += currentIntervalLength * nanoSecFactor;
      }
    }
  });
  return measurements;
}

export function responseGoogle(response) {
  console.log("Saving google client to localStorage");
  sessionStorage.setItem("googleResponse", JSON.stringify(response));

  axios
    .all([
      getUserSteps(response),
      getUserWeight(response),
      getUserActivities(response)
      // getUserHeight(response),
      // getUserHeartBeat(response),
      // getUserBloodPressure(response),
      // getUserBloodGlucose(response),
      // getUserBatchedActivity(response)
    ])
    .then(
      axios.spread((
        steps,
        weight,
        activities
        // height,
        // heartBeat,
        // bloodPressure,
        // bloodGlucose,
        // batchedActivities
      ) => {
        let datasets = [];

        let stepMeasurement = structureDatasets(steps);
        let weightMeasurement = structureDatasets(weight);
        let activitiesMeasurement = structureDatasets(activities);
        // let heightMeasurement = structureDatasets(height);
        // let heartBeatMeasurement = structureDatasets(heartBeat);
        // let bloodPressureMeasurement = structureDatasets(bloodPressure);
        // let bloodGlucoseMeasurement = structureDatasets(bloodGlucose);
        // let batchedActivitiesMeasurement = structureDatasets(batchedActivities);

        datasets.push(
          { name: "55423-8", measurements: stepMeasurement },
          { name: "29463-7", measurements: weightMeasurement },
          { name: "77595-7", measurements: activitiesMeasurement }
          // { name: "8302-2", measurements: heightMeasurement },
          // { name: "8867-4", measurements: heartBeatMeasurement },
          // { name: "85354-9", measurements: bloodPressureMeasurement },
          // { name: "2339-0", measurements: bloodGlucoseMeasurement },
          // { name: "batchedActivities", measurements: batchedActivitiesMeasurement }
        );

        this.props.addInfo(
          response.profileObj.googleId,
          response.profileObj.givenName,
          response.profileObj.familyName,
          response.profileObj.email,
          datasets
        );

        this.props.onLoggedIn(true);
      })
    )
    .catch(error => {
      console.log(error);
    });
}
