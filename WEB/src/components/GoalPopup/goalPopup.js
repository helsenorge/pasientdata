import * as React from "react";
import { LightBox } from "@helsenorge/toolkit/components/molecules/lightbox";

export default class LightboxExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      open: false
    };
  }

  handleClick(event) {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
    if (event) {
      event.preventDefault();
    }
  }

  render() {
    const button = (
      <button className="actionbutton" onClick={this.handleClick} ref="button">
        {"Open lightbox"}
      </button>
    );
    let lightbox = (
      <LightBox
        isVisible={this.state.open}
        onClose={this.handleClick}
        noAbort={false}
        noCloseButton={true}
        noPadding={false}
        small={false}
        medium={false}
        large={false}
      >
        <h3>{"Lightbox example"}</h3>
        <p>{"Dette er en demo av lightbox"}</p>
        <ul>
          <li>{"Her er litt"}</li>
          <li>{"data i form"}</li>
          <li>{"av en liste"}</li>
        </ul>
      </LightBox>
    );

    return (
      <div>
        {button}
        {lightbox}
      </div>
    );
  }
}
