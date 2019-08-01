import React, { Component } from "react";
import CardComponent from "../../../Components/Card/cardComponent";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import { Link } from "react-router-dom";
import "./compareDataCards.css";

class GoToInsightCard extends Component {
  makeContent = () => {
    return (
      <div>
        <div style={{ color: "black" }}>
          Få mer dyptgående innsikt ved å se på hver og en av datatypene for seg
          selv.
        </div>
        <br />
        <div className="go-to-insight-card">
          <Link to={"/dashboard"} style={{ borderBottom: "none" }}>
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
