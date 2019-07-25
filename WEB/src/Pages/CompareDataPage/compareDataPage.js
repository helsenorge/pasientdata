import React, { Component } from "react";
import ViewCard from "../../components/InsightCards/viewCard";
import MultipleGraphCard from "../../components/CompareDataCards/multipleGraphCard";
import DataTypeCard from "../../components/CompareDataCards/dataTypeCard";
import GoToInsightCard from "../../components/CompareDataCards/goToInsightCard";

class CompareData extends Component {
  render() {
    return (
      <div>
        <h3>Sammenlign data</h3>
        <ViewCard />
        <MultipleGraphCard />
        <DataTypeCard />
        <GoToInsightCard />
      </div>
    );
  }
}

export default CompareData;
