import React, { Component } from "react";
//import { Dropdown } from "@helsenorge/toolkit/components/atoms/dropdown";
import { FormSelect } from "shards-react";
import { connect } from "react-redux";
import { setView } from "../../Redux/actions";

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
        onChange={e => this.props.setView(e.target.value)} // Change to a set state or smth when u want to actually use
        className="custom-form-select"
        defaultValue={this.props.baseInfo.view}
      >
        <option className="custom-control" value="day">
          Dag
        </option>
        <option className="custom-control" value="week">
          7 dager
        </option>
        <option className="custom-control" value="2weeks">
          14 dager
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

const mapDispatchToProps = { setView };

function mapStateToProps(state) {
  return {
    baseInfo: state.baseInfo
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateDropdown);
