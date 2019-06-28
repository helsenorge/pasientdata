import * as React from "react";
import * as FHIR from "fhirclient";

export default class Redirect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      observations: []
    };
  }

  componentDidMount() {
    const subjectName = "r1";
    FHIR.oauth2
      .ready()
      .then(client => {
        //q1.set("code", "http://loinc.org|664-3");
        client
          .request(`Observation/` + subjectName + `?`, {
            pageLimit: 0,
            flat: true,
            subject: "pat2"
          })
          .then(observations => {
            console.log(observations.valueQuantity.value);
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
