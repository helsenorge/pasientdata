import * as React from "react";
import * as FHIR from "fhirclient";
import uuid from "uuid";
import moment from "moment";
import Login from "./login";

class Redirect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "sanne",
      family: "Helvig",
      firstName: "Sanne",
      isLoggedIn: false,
      googleData: {
        googleId: "",
        firstname: "",
        lastname: "",
        email: "",
        image: "",
        datasets: [],
        redirectProfile: false
      },

      datasets: [
        {
          name: "steps",
          measurements: [
            {
              value: 5,
              start: "2001-01-20T13:50:17",
              end: "2001-01-20T13:51:17"
            },
            {
              value: 6,
              start: "2001-01-20T13:51:17",
              end: "2001-01-20T13:52:17"
            },
            {
              value: 7,
              start: "2001-01-20T13:52:17",
              end: "2001-01-20T13:53:17"
            },
            {
              value: 8,
              start: "2001-01-20T13:53:17",
              end: "2001-01-20T13:54:17"
            }
          ]
        },
        {
          name: "heart-rate",
          measurements: [
            {
              value: 60,
              start: "2001-01-20T13:50:17",
              end: "2001-01-20T13:51:17"
            },
            {
              value: 61,
              start: "2001-01-20T13:51:17",
              end: "2001-01-20T13:52:17"
            },
            {
              value: 63,
              start: "2001-01-20T13:52:17",
              end: "2001-01-20T13:53:17"
            },
            {
              value: 59,
              start: "2001-01-20T13:53:17",
              end: "2001-01-20T13:54:17"
            }
          ]
        }
      ]
    };
  }

  componentDidMount() {
    let writePatient = 0;
    let writeObservation = 0;
    let readData = 0;
    let writeObservations = 0;

    if (writePatient) {
      this.addPatient();
    }
    if (writeObservation) {
      this.addObservation(0);
    }
    if (readData) {
      this.readObservation();
    }
    if (writeObservations) {
      this.addObservations();
    }
  }

  readObservation = () => {
    FHIR.oauth2
      .ready()
      .then(client => {
        const q1 = new URLSearchParams();
        //q1.set("code", "http://loinc.org|664-3");
        //q1.set("code", "stepsv2");
        q1.set("subject", this.state.userId);
        client
          .request(`Observation?${q1}`, {
            pageLimit: 0,
            flat: true
          })
          .then(observations => {
            console.log(observations);
            this.setState({ observations });
          });
      })
      .catch(() => console.error("FHIR error after launch"));
  };

  addPatient = () => {
    let patientJSON = {
      resourceType: "Patient",
      id: this.state.userId,
      meta: {
        versionId: "1",
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
          family: this.state.family,
          given: [this.state.firstName, this.state.family]
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
            reference:
              "https://localhost:5001/fhir/Patient/" + this.state.userId
          },
          type: "seealso"
        }
      ]
    };
    let optionsPatient = {
      method: "PUT",
      url: "http://localhost:5000/fhir/Patient/" + this.state.userId,
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
          });
      })
      .catch(() => console.error("FHIR error after launch"));
  };

  addObservations = () => {
    for (let i = 0; i < this.state.datasets.length; i++) {
      this.addObservation(i);
    }
  };

  displayStringFromLOINC = LOINC => {
    switch (LOINC) {
      case "steps":
        return "Number of steps in time period";
      case "heart-rate":
        return "Number of heart beats per minute";
    }
  };

  observationDisplayNameFromLOINC = LOINC => {
    switch (LOINC) {
      case "steps":
        return "Steps / period";
      case "heart-rate":
        return "Heart beats / min";
    }
  };

  unitFromLOINC = LOINC => {
    switch (LOINC) {
      case "steps":
        return "/min";
      case "heart-rate":
        return "/min";
    }
  };

  addObservation = datasetIndex => {
    let observationId = uuid();
    let unitDisplayString = this.displayStringFromLOINC(
      this.state.datasets[datasetIndex].name
    );
    let observationDisplayName = this.observationDisplayNameFromLOINC(
      this.state.datasets[datasetIndex].name
    );
    let unit = this.unitFromLOINC(this.state.datasets[datasetIndex].name);
    let measurementCode = this.state.datasets[datasetIndex].name;

    let components = [];
    for (
      let i = 0;
      i < this.state.datasets[datasetIndex].measurements.length;
      i++
    ) {
      components.push({
        valueQuantity: {
          value: this.state.datasets[datasetIndex].measurements[i].value,
          unit: unit,
          system: "http://unitsofmeasure.org",
          code: "/min"
        },
        code: { coding: { code: "value" } }
      });
      components.push({
        valuePeriod: {
          start: this.state.datasets[datasetIndex].measurements[i].start,
          end: this.state.datasets[datasetIndex].measurements[i].end
        },
        code: { coding: { code: "time" } }
      });
    }

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
            code: measurementCode,
            display: unitDisplayString
          }
        ],
        text: observationDisplayName
      },
      subject: {
        reference: "https://localhost:5001/fhir/Patient/" + this.state.userId
      },
      component: components
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
  };

  handleLogin = googleData => {
    this.setState({ isLoggedIn: true, googleData });
  };

  render() {
    if (this.state.isLoggedIn) {
      console.log(this.state.googleData);
      return (
        <div>
          <div>Testdiv</div>
          {this.state.datasets.length > 0 && (
            <div>
              <div>Datasets loaded!</div>
              <div>{JSON.stringify(this.state.datasets)}</div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <Login onLogin={this.handleLogin.bind(this)} />
        </div>
      );
    }
  }
}

export default Redirect;
