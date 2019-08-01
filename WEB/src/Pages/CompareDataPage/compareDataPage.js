import React, { Component } from "react";
import ViewCard from "../Insight/InsightCards/viewCard";
import MultipleGraphCard from "./CompareDataCards/multipleGraphCard";
import DataTypeCard from "./CompareDataCards/dataTypeCard";
import GoToInsightCard from "./CompareDataCards/goToInsightCard";
import DateSelectorCard from "../../Components/DateSelectorCard/dateSelectorCard";
import FHIRConnection from "../../FHIRCommunication";
import { connect } from "react-redux";

/*
 * Page that gives the user the possibility of selecting data sources, that are then
 * rendered above each other. Also contains the view card that lets the user select
 * time period to be shown either by dropdown or by selecting to and from dates.
 */

class CompareData extends Component {
  render() {
    if (this.props.baseInfo.isLoggedin) {
      return (
        <div style={{ margin: "0 0 8px" }}>
          <h1 style={{ marginLeft: "8px" }}>Sammenlign data</h1>
          <ViewCard />
          <DateSelectorCard />
          <MultipleGraphCard />
          <DataTypeCard />
          <GoToInsightCard />
        </div>
      );
    } else {
      return (
        <div>
          <FHIRConnection />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(CompareData);
