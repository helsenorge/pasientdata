import * as React from "react";
import * as FHIR from "fhirclient";
import moment from "moment";
import HomePage from "../loginPage/homePage";
import PlotScatter from "../components/plottScatter";

class Redirect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "sanne",
      family: "",
      firstName: "",
      isLoggedIn: false,
      email: "",
      image: "",
      googleId: "",
      observations: [],
      client: "",
      datasets: [
        {
          name: "85354-9",
          measurements: [
            {
              value: 9,
              start: "2001-01-20T13:50:17",
              end: "2001-01-20T13:51:17"
            },
            {
              value: 6,
              start: "2001-02-20T13:51:17",
              end: "2001-02-20T13:52:17"
            },
            {
              value: 7,
              start: "2001-03-20T13:52:17",
              end: "2001-03-20T13:53:17"
            },
            {
              value: 8,
              start: "2001-04-20T13:53:17",
              end: "2001-04-20T13:54:17"
            }
          ]
        },
        {
          name: "8867-4",
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
    this.saveClient();
  }

  saveClient = () => {
    FHIR.oauth2
      .ready()
      .then(client => {
        console.log("Saving FHIR client");
        this.setState({ client });
      })
      .catch(e => console.error("Error when saving FHIR client", e));
  };

  readAllObservations = () => {
    console.log(
      "Reading all observations the patient has in the FHIR database"
    );
    const q1 = new URLSearchParams();
    q1.set("subject", this.state.userId);
    this.state.client
      .request(`Observation?${q1}`, {
        pageLimit: 0,
        flat: true
      })
      .then(observations => {
        console.log(observations);
      });
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

    console.log("Adding patient to FHIR database");
    this.state.client
      .request(optionsPatient, (error, response, body) => {})
      .then(patient => {
        console.log(patient);
      });
  };

  addObservations = () => {
    for (let i = 0; i < this.state.datasets.length; i++) {
      if (
        this.state.datasets[i].measurements.length > 1 ||
        this.state.datasets[i].measurements.value !== undefined
      ) {
        this.addObservation(i);
      }
    }
  };

  getStringsFromLOINC = LOINC => {
    let strings = {};
    switch (LOINC) {
      case "55423-8": // steps
        strings = {
          unitDisplayString: "Number of steps in unspecified time Pedometer",
          observationDisplayName: "Step count",
          unit: "steps/day",
          UCUMCode: "/d"
        };
        break;
      case "8867-4": // heart rate
        strings = {
          unitDisplayString: "Heart rate",
          observationDisplayName: "Heart rate",
          unit: "beats/minute",
          UCUMCode: "/min"
        };
        break;
      case "2339-0": // blood glucose
        strings = {
          unitDisplayString: "Glucose Bld-mCnc",
          observationDisplayName: "Glucose Bld-mCnc",
          unit: "mg/dL",
          UCUMCode: "mg/dL"
        };
        break;
      case "85354-9": // blood pressure
        strings = {
          unitDisplayString: "Blood pressure panel with all children optional",
          observationDisplayName: "Blood pressure systolic & diastolic",
          unit: "mmHg",
          UCUMCode: "mm[Hg]"
        };
        break;
      case "8302-2": // height
        strings = {
          unitDisplayString: "Body height",
          observationDisplayName: "Body height",
          unit: "m",
          UCUMCode: "m"
        };
        break;
      case "29463-7": // weight
        strings = {
          unitDisplayString: "Body weight",
          observationDisplayName: "Body weight",
          unit: "kg",
          UCUMCode: "kg"
        };
        break;

      default:
        console.error("Non-valid LOINC-code");
        return null;
    }
    return strings;
  };

  addObservation = datasetIndex => {
    let observationId = this.state.datasets[datasetIndex].name;
    // Note on the above: this can also be set from uuid(), but since we want only one
    //                    of each dataset type connected to each patient this is better.
    let {
      unitDisplayString,
      observationDisplayName,
      unit,
      UCUMCode
    } = this.getStringsFromLOINC(this.state.datasets[datasetIndex].name);

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
          code: UCUMCode
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
            system: "http://loinc.org",
            code: this.state.datasets[datasetIndex].name,
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

    console.log("Adding observation to FHIR database");
    //console.log(JSON.stringify(observationJSON));
    this.state.client
      .request(optionsObservation, (error, response, body) => {})
      .then(observation => {
        console.log(observation);
        this.setState({ observation });
      });
  };

  handleLogin = (googleData, datasets) => {
    this.setState({
      isLoggedIn: true,
      firstName: googleData.firstName,
      family: googleData.family,
      email: googleData.email,
      image: googleData.image,
      googleId: googleData.googleId,
      userId: googleData.googleId,
      datasets
    });
    this.addPatientIfNeeded();
    this.addObservations();
    this.readAllObservations();
  };

  addPatientIfNeeded = () => {
    console.log("Reading patient from FHIR database");
    const q1 = new URLSearchParams();
    q1.set("id", this.state.userId);
    this.state.client
      .request(`Patient/${this.state.userId}`, {
        pageLimit: 0,
        flat: true
      })
      .then(patient => {
        console.log(patient);
      })
      .catch(() => {
        console.log("Patient didn't already exist in FHIR database");
        this.addPatient();
      });
  };

  render() {
    //return (
    //  <div>
    //    <Chart datasets={this.state.datasets} />
    //  </div>
    //);
    if (this.state.isLoggedIn) {
      return (
        <div>
          {this.state.datasets.length > 0 && (
            <div>
              <div>Datasets loaded!</div>
              {/* <div>{JSON.stringify(this.state.datasets)}</div> */}
            </div>
          )}
          <PlotScatter datasets={this.state.datasets} />
        </div>
      );
    } else {
      return (
        <div>
          <HomePage onLogin={this.handleLogin.bind(this)} />
        </div>
      );
    }
  }
}

export default Redirect;
