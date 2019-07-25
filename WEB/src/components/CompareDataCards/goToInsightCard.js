import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import { Link } from "react-router-dom";
import "./compareDataCards.css";

class GoToInsightCard extends Component {
  makeContent = () => {
    return (
      <div>
        <div>
          Få mer dyptgående innsikt ved å se på hver og en av datapunktene for
          seg selv.
        </div>
        <br />
        <div className="go-to-insight-card">
          <Link to={"/bloodsugar"} style={{ "border-bottom": "none" }}>
            <DisplayButton secondary>
              <div className={"button-sizing-go-to-insight-card"}>Innsikt</div>
            </DisplayButton>
          </Link>
        </div>
      </div>
    );
  };
  render() {
    return (
      <CardComponent
        title="Få innsikt om ulike datapunkter"
        content={this.makeContent()}
      />
    );
  }
}

export default GoToInsightCard;
