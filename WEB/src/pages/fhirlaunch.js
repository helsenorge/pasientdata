import * as React from "react";
import * as FHIR from "fhirclient";

export default class FhirLaunch extends React.Component {
  componentDidMount() {
    FHIR.oauth2
      .authorize({
        clientId: "pasientdata_test_app",
        redirectUri: "./redirect",
        iss: "http://localhost:5000/fhir",
        launch: "123"
      })
      .catch(() => {
        console.error("Could not launch FHIR");
      });
  }

  render() {
    return <div>Launching FHIR...</div>;
  }
}
