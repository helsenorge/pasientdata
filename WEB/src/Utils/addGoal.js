import * as FHIR from "fhirclient";
import moment from "moment";

export default function addGoal(
  goalId,
  goal,
  descriptionText,
  unit,
  UCUMCode,
  googleId
) {
  let target;
  let mainURL = "https://pasientdata-fhir-api.azurewebsites.net/fhir"; // "https://localhost:5001/fhir"; //
  if (goal.type === "range") {
    target = {
      detailRange: {
        low: { value: goal.lower, unit: unit },
        high: { value: goal.upper, unit: unit }
      }
    };
  } else {
    target = {
      detailQuantity: {
        value: goal.value,
        unit: unit,
        system: "http://unitsofmeasure.org",
        code: UCUMCode
      }
    };
  }

  let goalJSON = {
    resourceType: "Goal",
    id: goalId,
    meta: {
      versionId: "1",
      lastUpdated: moment().format("YYYY-MM-DDThh:mm:ss")
    },
    subject: {
      reference: mainURL + "/Patient/" + googleId
    },
    target: target,
    note: { text: goal.type },
    description: { text: descriptionText },
    lifecycleStatus: "active"
  };

  let goalOptions = {
    method: "PUT",
    url: mainURL + "/Goal/" + goalId,
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
    serverUrl: mainURL
  });

  console.log("Adding goal to FHIR database");
  client
    .request(goalOptions, (error, response, body) => {})
    .then(goal => {
      console.log("Goal: ", goal);
      // this.setState({ observation });
    });
}
