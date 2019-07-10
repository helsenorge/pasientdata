import React, { Component } from "react";
//"@helsenorge/toolkit/components/molecules/tabs/tab"
import ActionButton from "@helsenorge/toolkit/components/atoms/buttons/action-button";

class Steps extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>Dette skal bli en actionbutton</div>
        <div>
          <ActionButton
            onClick={() => {
              /* tom */
            }}
          >
            {"Actionbutton"}
          </ActionButton>
          <br />
          <ActionButton
            onClick={() => {
              /* tom */
            }}
            sub
          >
            {"Actionbutton sub"}
          </ActionButton>
        </div>
      </div>
    );
  }
}

export default Steps;
