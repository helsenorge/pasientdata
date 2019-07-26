import React, { Component } from "react";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import EditOutlined from "@helsenorge/toolkit/components/icons/EditOutlined";
import { LightBox } from "@helsenorge/toolkit/components/molecules/lightbox";

class ChangeGoalButton extends Component {
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
      <DisplayButton onClick={this.handleClick} secondary>
        <div className="flex-container-button">
          <EditOutlined className="flex-children-button-icon editOutlinedStyle" />
          <div className="flex-children-button editText">Rediger</div>
        </div>
      </DisplayButton>
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

export default ChangeGoalButton;
