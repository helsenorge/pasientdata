import React, { Component } from "react";
import CardComponent from "../../../Components/Card/cardComponent";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import "./insightCards.css";
import { Link } from "react-router-dom";

class GoalCard extends Component {
  makeContent = () => {
    return (
      <div>
        <div style={{ color: "black" }}>
          Har du behov for å justere dine målsetninger?
        </div>
        <br />
        <div className="goal-card">
          <Link to={"/mygoals"} className="link-without-border-bottom">
            <DisplayButton secondary>
              <div className={"button-sizing"}>Mine mål </div>
            </DisplayButton>
          </Link>
        </div>
      </div>
    );
  };

  render() {
    return (
      <CardComponent title="Sette nye mål?" content={this.makeContent()} />
    );
  }
}

export default GoalCard;
