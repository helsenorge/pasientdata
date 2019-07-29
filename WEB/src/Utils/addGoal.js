import * as FHIR from "fhirclient";
import moment from "moment";
import getStringsFromLOINC from "./getStringsFromLOINC";

export default function addGoal(
  goalId,
  goal,
  descriptionText,
  unit,
  UCUMCode,
  googleId
) {
  let target;
  //   console.log("goal(addGoal): ", goal);

  if (goal.type == "range") {
    target = {
      detailRange: {
        low: { value: goal.lower, unit: unit },
        high: { value: goal.upper, unit: unit }
      }
    };
  } else {
    // console.log("value: ", goal.value);
    target = {
      detailQuantity: {
        value: goal.value,
        unit: unit,
        system: "http://unitsofmeasure.org",
        code: UCUMCode
      }
    };
    // console.log("target: ", target);
  }

  let goalJSON = {
    resourceType: "Goal",
    id: goalId,
    meta: {
      versionId: "1",
      lastUpdated: moment().format("YYYY-MM-DDThh:mm:ss")
    },
    subject: {
      reference: "https://localhost:5001/fhir/Patient/" + googleId
    },
    target: target,
    note: { text: goal.type },
    description: { text: descriptionText },
    lifecycleStatus: "active"
  };

  let goalOptions = {
    method: "PUT",
    url: "http://localhost:5000/fhir/Goal/" + goalId,
    headers: {
      "cache-control": "no-cache",
      Connection: "keep-alive",
      "accept-encoding": "gzip, deflate",
      Host: "localhost:5000",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.15.0"
    },
    body: JSON.stringify(goalJSON)
  };

  const client = FHIR.client({
    serverUrl: "http://localhost:5000/fhir"
  });

  console.log("Adding goal to FHIR database");
  client
    .request(goalOptions, (error, response, body) => {})
    .then(goal => {
      // console.log("Goal: ", goal);
      // this.setState({ observation });
    });
}
