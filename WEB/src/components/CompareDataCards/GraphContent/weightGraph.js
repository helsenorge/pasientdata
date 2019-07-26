import React, { Component } from "react";
import { connect } from "react-redux";

class WeightGraph extends Component {
  render() {
    return <div>Her skal vektgrafen</div>;
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(WeightGraph);
