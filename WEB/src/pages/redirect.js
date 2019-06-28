import * as React from 'react';
import * as FHIR from 'fhirclient';

export default class Redirect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      observations: []
    };
  }

  componentDidMount() {
    FHIR.oauth2.ready()
      .then(client => {
        const q1 = new URLSearchParams();
        //q1.set("code", "http://loinc.org|664-3");
        q1.set("subject", 'example');
        client.request(`Observation?${q1}`, {
          pageLimit: 0,
          flat: true
        })
        .then(observations => {
          console.log(observations);
          this.setState({ observations })
        })
      })
      .catch(() => console.error('FHIR error after launch'))
  }

  render() {
    return (
      <div>
        <div>Testdiv</div>
        { this.state.observations.length > 0 &&
          <div>
            <div>Observations loaded!</div>
            <div>{JSON.stringify(this.state.observations)}</div>
          </div>
        }
      </div>
    );
  }
}