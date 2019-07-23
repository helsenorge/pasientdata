import React, { Component } from "react";
import { InlineButton } from "@helsenorge/toolkit/components/atoms/buttons/inline-button";

class AddDataContent extends Component {
  state = {};
  render() {
    return (
      <div className="visnings-div">
        <InlineButton type={"add"}> Legg til ny datakilde</InlineButton>
      </div>
    );
  }
}

export default AddDataContent;
