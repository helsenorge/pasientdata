import * as React from "react";
import * as FHIR from "fhirclient";
import uuid from "uuid";
import moment from "moment";

export default class Redirect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      observations: []
    };
  }

  componentDidMount() {
    var userId = "adriabsv8";

    let resourceType = "Patient";
    let writeData = true;

    if (writeData) {
      switch (resourceType) {
        case "Patient":
          this.addPatient(userId);
          break;
        case "Observation":
          this.addObservation(userId);
      }
    } else {
      this.readObservation(userId);
    }
  }

  readObservation = userId => {
    let desiredObservation = "steps";
    var optionsRead = {
      method: "GET",
      url: "http://localhost:5000/fhir/Observation/" + desiredObservation,
      qs: { _format: "json", "": "" },
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "accept-encoding": "gzip, deflate",
        Host: "localhost:5000",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        "User-Agent": "PostmanRuntime/7.15.0",
        subject: userId
      }
    };
    FHIR.oauth2
      .ready()
      .then(client => {
        client
          .request(optionsRead, (error, response, body) => {})
          .then(observations => {
            console.log(observations);
            this.setState({ observations });
          });
      })
      .catch(() => console.error("FHIR error after launch"));
  };

  addPatient = userId => {
    let patientJSON = {
      resourceType: "Patient",
      id: userId,
      meta: {
        versionId: "3",
        lastUpdated: moment().format("YYYY-MM-DDThh:mm:ss"),
        security: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActReason",
            code: "HTEST",
            display: "test health data"
          }
        ]
      },
      identifier: [
        {
          use: "usual",
          type: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                code: "MR"
              }
            ]
          },
          system: "urn:oid:0.1.2.3.4.5.6.7",
          value: "0"
        }
      ],
      active: true,
      name: [
        {
          use: "official",
          family: "Skibelid",
          given: ["Adrian Bogen", "Skibelid"]
        }
      ],
      gender: "other",
      _gender: {
        extension: [
          {
            url: "http://example.org/Profile/administrative-status",
            valueCodeableConcept: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0001",
                  code: "A",
                  display: "Ambiguous"
                }
              ]
            }
          }
        ]
      },
      link: [
        {
          other: {
            reference: "https://localhost:5001/fhir/Patient/" + userId
          },
          type: "seealso"
        }
      ]
    };
    let optionsPatient = {
      method: "PUT",
      url: "http://localhost:5000/fhir/Patient/" + userId,
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "accept-encoding": "gzip, deflate",
        Host: "localhost:5000",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.15.0",
        pageLimit: 0,
        flat: true
      },
      body: JSON.stringify(patientJSON)
    };

    FHIR.oauth2
      .ready()
      .then(client => {
        client
          .request(optionsPatient, (error, response, body) => {})
          .then(observations => {
            console.log(observations);
            this.setState({ observations });
          });
      })
      .catch(() => console.error("FHIR error after launch"));
  };

  addObservation(userId) {
    let observationName = "steps";
    let observationId = uuid();
    let unitDisplayString = "Number of steps in time period";
    let observationDisplayName = "Steps";
    let value = 89;
    let unit = "Steps";
    let unitCode = "/min";
    let observationJSON = {
      resourceType: "Observation",
      id: observationId,
      meta: {
        versionId: "1",
        lastUpdated: moment().format("YYYY-MM-DDThh:mm:ss")
      },
      status: "final",
      code: {
        coding: [
          {
            system: "http://todoInsertsystemURL.org",
            code: "/min",
            display: unitDisplayString
          }
        ],
        text: observationDisplayName
      },
      subject: {
        reference: "https://localhost:5001/fhir/Patient/" + userId
      },
      valueQuantity: {
        value: value,
        unit: unit,
        system: "http://unitsofmeasure.org",
        code: unitCode
      },
      effectivePeriod: {
        start: "2001-01-20T13:40:17",
        end: "2001-01-20T13:41:17"
      },
      code: { coding: { code: observationName } }
    };

    let optionsObservation = {
      method: "PUT",
      url: "http://localhost:5000/fhir/Observation/" + observationId,
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
      body: JSON.stringify(observationJSON)
    };

    FHIR.oauth2
      .ready()
      .then(client => {
        client
          .request(optionsObservation, (error, response, body) => {})
          .then(observations => {
            console.log(observations);
            this.setState({ observations });
          });
      })
      .catch(() => console.error("FHIR error after launch"));
  }

  render() {
    return (
      <div>
        <div>Testdiv</div>
        {this.state.observations.length > 0 && (
          <div>
            <div>Observations loaded!</div>
            <div>{JSON.stringify(this.state.observations)}</div>
          </div>
        )}
      </div>
    );
  }
}
