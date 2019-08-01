import * as React from "react";
import * as FHIR from "fhirclient";
import moment from "moment";
import HomePage from "./Pages/LoginPage/loginPage";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setGoals } from "./Redux/actions";
import getStringsFromLOINC from "./Utils/getStringsFromLOINC";
import fhirUrl from "./fhirUrl";

/*
 * File for handling initial communication with the fhir server.
 * Uses the server url set in fhirUrl.
 */

class FHIRCommunication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: FHIR.client({
        serverUrl: fhirUrl()
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
            reference: fhirUrl() + "/Patient/" + this.props.patient.googleId
          },
          type: "seealso"
        }
      ]
    };
    let optionsPatient = {
      method: "PUT",
      url: fhirUrl() + "/Patient/" + this.props.patient.googleId,
      headers: {
        Connection: "keep-alive",
        "accept-encoding": "gzip, deflate",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patientJSON)
    };

    console.log("Adding patient to FHIR database");
    this.state.client
      .request(optionsPatient, (error, response, body) => {})
      .then(patient => {
        // console.log("Newly added patient: ", patient);
      });
  };

  addObservations = () => {
    for (let i = 0; i < this.props.patient.datasets.length; i++) {
      if (
        this.props.patient.datasets[i].measurements.length > 1 ||
        this.props.patient.datasets[i].measurements.value !== undefined
      ) {
        // console.log(this.props.patient.datasets[i].name);
        this.addObservation(i);
      }
    }
  };

  addObservation = datasetIndex => {
    const lenghtOfOneFhirDataset = 1000;
    let nSets =
      this.props.patient.datasets[datasetIndex].measurements.length /
      lenghtOfOneFhirDataset;

    for (let j = 0; j < nSets; j++) {
      let data = this.props.patient.datasets[datasetIndex].measurements.slice(
        Math.max(0, (j - 1) * lenghtOfOneFhirDataset),
        Math.min(
          j * lenghtOfOneFhirDataset,
          this.props.patient.datasets[datasetIndex].measurements.length
        )
      );
      let observationId;
      if (j === 0) {
        observationId = this.props.patient.datasets[datasetIndex].name;
      } else {
        observationId =
          this.props.patient.datasets[datasetIndex].name + "-" + j;
      }
      // Note on the above: this could also be set from uuid(),
      // but this makes it harder to overwrite all existing datasets
      let {
        unitDisplayString,
        observationDisplayName,
        unit,
        UCUMCode
      } = getStringsFromLOINC(this.props.patient.datasets[datasetIndex].name);
      let components = [];
      for (let i = 0; i < data.length; i++) {
        components.push({
          valueQuantity: {
            value: data[i].value,
            unit: unit,
            system: "http://unitsofmeasure.org",
            code: UCUMCode
          },
          code: { coding: { code: "value" } }
        });
        components.push({
          valuePeriod: {
            start: data[i].start,
            end: data[i].end
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
          reference: fhirUrl() + "/Patient/" + this.props.patient.googleId
        },
        component: components
      };

      let optionsObservation = {
        method: "PUT",
        url: fhirUrl() + "/Observation/" + observationId,
        headers: {
          Connection: "keep-alive",
          "accept-encoding": "gzip, deflate",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(observationJSON)
      };

      console.log("Adding observation to FHIR database");
      this.state.client
        .request(optionsObservation, (error, response, body) => {})
        .then(observation => {
          // console.log(observation);
          // this.setState({ observation });
        });
    }
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
        // console.log(patient);
      })
      .catch(() => {
        console.log("Patient didn't already exist in FHIR database");
        this.addPatient();
      });
  };

  readAllGoals = () => {
    console.log("Reading all goals the patient has in the FHIR database");
    const q1 = new URLSearchParams();
    q1.set("subject", this.props.patient.googleId);
    let client = FHIR.client({
      serverUrl: fhirUrl()
    });
    client
      .request(`Goal?${q1}`, {
        pageLimit: 0,
        flat: true
      })
      .then(goalsMsg => {
        let stateGoals = this.props.patient.goals;
        goalsMsg.forEach(item => {
          if (item.note) {
            if (item.note[0].text === "range") {
              stateGoals[item.id] = {
                type: item.note[0].text,
                lower: item.target[0].detailRange.low.value,
                upper: item.target[0].detailRange.high.value,
                unit: item.target[0].detailRange.low.unit
              };
            } else {
              stateGoals[item.id] = {
                type: item.note[0].text,
                value: item.target[0].detailQuantity.value,
                unit: item.target[0].detailQuantity.unit
              };
            }
          }
        });
        console.log("Goals from fhir", goalsMsg);
        this.props.setGoals(stateGoals);
      });
  };

  render() {
    if (this.props.baseInfo.isLoggedin) {
      return (
        <div>
          {/* moved them here, seems to have solved some issues, gets called after login has saved info to redux */}
          {this.addPatientIfNeeded()}
          {this.addObservations()}
          {/* {this.readAllObservations()} */}
          {this.readAllGoals()}
          <Redirect to="/dashboard" />
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

const mapDispatchToProps = { setGoals };

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FHIRCommunication);
