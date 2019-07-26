import React, { Component } from "react";
import { connect } from "react-redux";

class CarbohydratesGraph extends Component {
  render() {
    return <div>Her skal karbohydratgrafen</div>;
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(CarbohydratesGraph);
