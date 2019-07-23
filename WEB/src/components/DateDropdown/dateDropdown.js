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
      <FormSelect>
        <option value="1">Dag</option>
        <option value="2">Uke</option>
        <option value="3">To uker</option>
        <option value="4">Måned</option>
        <option value="5">Tre måneder</option>
        <option value="6">År</option>
        <option value="7">Tilpass dato...</option>
      </FormSelect>
    );
  }
}

export default DateDropdown;
