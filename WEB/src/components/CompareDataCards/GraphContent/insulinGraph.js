import React, { Component } from "react";
import { connect } from "react-redux";

class InsulinGraph extends Component {
  render() {
    return <div>Her skal insulingrafen</div>;
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(InsulinGraph);
