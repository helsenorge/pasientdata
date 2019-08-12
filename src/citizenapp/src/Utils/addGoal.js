import * as FHIR from "fhirclient";
import moment from "moment";
import fhirUrl from "../fhirUrl";

export default function addGoal(
  goalId,
  goal,
  descriptionText,
  unit,
  UCUMCode,
  googleId
) {
  let target;
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
      reference: fhirUrl() + "/Patient/" + googleId
    },
    target: target,
    note: { text: goal.type },
    description: { text: descriptionText },
    lifecycleStatus: "active"
  };

  let goalOptions = {
    method: "PUT",
    url: fhirUrl() + "/Goal/" + goalId,
    headers: {
      "cache-control": "no-cache",
      Connection: "keep-alive",
      "accept-encoding": "gzip, deflate",
      Accept: "*/*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(goalJSON)
  };

  const client = FHIR.client({
    serverUrl: fhirUrl()
  });

  console.log("Adding goal to FHIR database");
  client
    .request(goalOptions, (error, response, body) => {})
    .then(goal => {
      console.log("Goal: ", goal);
      // this.setState({ observation });
    });
}
