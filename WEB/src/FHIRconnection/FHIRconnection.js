import * as React from "react";
import * as FHIR from "fhirclient";
import moment from "moment";
import BarPlotter from "../components/barPlotter";
import HomePage from "../loginPage/loginPage";
//import { GoogleLogout } from 'react-google-login';
//import { addPatient, addObservation } from "../api/FHIRstructure"
import { connect } from "react-redux";

class FHIRconnection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: FHIR.client({
        serverUrl: "http://localhost:5000/fhir"
      }),
      userLoggedOut: false
    };
  }

  readAllObservations = () => {
    console.log(
      "Reading all observations the patient has in the FHIR database"
    );
    const q1 = new URLSearchParams();
    q1.set("subject", this.props.patient.googleId);
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
      id: this.props.patient.googleId,
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
          family: this.props.patient.lastname,
          given: [this.props.patient.firstname, this.props.patient.lastname]
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
              "https://localhost:5001/fhir/Patient/" + this.props.patient.googleId
          },
          type: "seealso"
        }
      ]
    };
    let optionsPatient = {
      method: "PUT",
      url: "http://localhost:5000/fhir/Patient/" + this.props.patient.googleId,
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
    for (let i = 0; i < this.props.patient.datasets.length; i++) {
      if (
        this.props.patient.datasets[i].measurements.length > 1 ||
        this.props.patient.datasets[i].measurements.value !== undefined
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
    let observationId = this.props.patient.datasets[datasetIndex].name;
    // Note on the above: this can also be set from uuid(), but since we want only one
    //                    of each dataset type connected to each patient this is better.
    let {
      unitDisplayString,
      observationDisplayName,
      unit,
      UCUMCode
    } = this.getStringsFromLOINC(
      this.props.patient.datasets[datasetIndex].name
    );

    let components = [];
    for (
      let i = 0;
      i < this.props.patient.datasets[datasetIndex].measurements.length;
      i++
    ) {
      components.push({
        valueQuantity: {
          value: this.props.patient.datasets[datasetIndex].measurements[i]
            .value,
          unit: unit,
          system: "http://unitsofmeasure.org",
          code: UCUMCode
        },
        code: { coding: { code: "value" } }
      });
      components.push({
        valuePeriod: {
          start: this.props.patient.datasets[datasetIndex].measurements[i]
            .start,
          end: this.props.patient.datasets[datasetIndex].measurements[i].end
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
            code: this.props.patient.datasets[datasetIndex].name,
            display: unitDisplayString
          }
        ],
        text: observationDisplayName
      },
      subject: {
        reference:
          "https://localhost:5001/fhir/Patient/" + this.props.patient.googleId
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
    this.state.client
      .request(optionsObservation, (error, response, body) => {})
      .then(observation => {
        console.log(observation);
        this.setState({ observation });
      });
  };

  addPatientIfNeeded = () => {
    console.log("Reading patient from FHIR database");
    const q1 = new URLSearchParams();
    q1.set("id", this.props.patient.googleId);
    this.state.client
      .request(`Patient/${this.props.patient.googleId}`, {
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
    if (this.props.baseInfo.isLoggedin) {
      return (
        <div>
          {/* moved them here, seems to have solved some issues, gets called after login has saved info to redux */}
          {this.addPatientIfNeeded()} 
          {this.addObservations()}
          {this.readAllObservations()}
          {this.props.patient.datasets.length > 0 && (
            <div>
              <div>Datasets loaded!</div>
            </div>
          )}
          <BarPlotter
            datasets={this.props.patient.datasets}
            aggregateLength="day"
            timeScope="week"
            datasetLOINC="55423-8"
          />
          <button
            onClick={() => {
              localStorage.removeItem("googleResponse");
              this.setState({ userLoggedOut: true });
            }}
            variant="danger"
          >
            Logg ut
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <HomePage />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(FHIRconnection);
