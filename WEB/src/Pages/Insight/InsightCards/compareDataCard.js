import React, { Component } from "react";
import CardComponent from "../../../components/Card/cardComponent";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import "./insightCards.css";
import { Link } from "react-router-dom";

class CompareDataCard extends Component {
  makeContent = () => {
    return (
      <div>
        <div>Forstå dine resultater bedre ved å sammenligne data.</div>
        <br />
        <div className="compare-data-card">
          <Link to={"/comparedata"} className="link-without-border-bottom">
            <DisplayButton secondary>
              <div className={"button-sizing"}>Sammenlign data </div>
            </DisplayButton>
          </Link>
        </div>
      </div>
    );
  };

  render() {
    return (
      <CardComponent title="Forstå din data" content={this.makeContent()} />
    );
  }
}

export default CompareDataCard;
