import React, { Component } from "react";
import { connect } from "react-redux";

class PhysicalActivityGraph extends Component {
  render() {
    return <div>Her skal fysisk aktivitet-grafen</div>;
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(PhysicalActivityGraph);
