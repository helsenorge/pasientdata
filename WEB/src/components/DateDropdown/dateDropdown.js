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
      <FormSelect
        onChange={e => console.log(e.target.value)} // Change to a set state or smth when u want to actually use
        className="custom-form-select"
      >
        <option className="custom-control" value="day">
          Dag
        </option>
        <option className="custom-control" value="week">
          Uke
        </option>
        <option className="custom-control" value="2weeks">
          To uker
        </option>
        <option className="custom-control" value="month">
          Måned
        </option>
        <option className="custom-control" value="3months">
          Tre måneder
        </option>
        <option className="custom-control" value="year">
          År
        </option>
        <option className="custom-control" value="custom">
          Tilpass dato...
        </option>
      </FormSelect>
    );
  }
}

export default DateDropdown;
