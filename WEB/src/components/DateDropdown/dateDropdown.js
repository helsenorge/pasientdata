import React, { Component } from "react";
//import { Dropdown } from "@helsenorge/toolkit/components/atoms/dropdown";
import { FormSelect } from "shards-react";

import "./dateDropdown.css";

class DateDropdown extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { open: false };
  }

  toggle() {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  }

  getState = () => {
    console.log(this.state.open);
  };

  render() {
    return (
      <FormSelect className="custom-form-select">
        <option className="custom-control" value="1">
          Dag
        </option>
        <option className="custom-control" value="2">
          Uke
        </option>
        <option className="custom-control" value="3">
          To uker
        </option>
        <option className="custom-control" value="4">
          Måned
        </option>
        <option className="custom-control" value="5">
          Tre måneder
        </option>
        <option className="custom-control" value="6">
          År
        </option>
        <option className="custom-control" value="7">
          Tilpass dato...
        </option>
      </FormSelect>
    );
  }
}

export default DateDropdown;
