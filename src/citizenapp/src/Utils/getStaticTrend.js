import React from "react";
import {
  PHYSICAL_ACTIVITY,
  CARBOHYDRATES,
  INSULIN,
  STEPS,
  WEIGHT
} from "../dataTypes";
import "../Pages/Dashboard/dashboard.css";

export default function getStaticTrend(dataType) {
  let text;
  let pic;
  switch (dataType) {
    case INSULIN:
      pic = require("../Images/dashBlueUpArrow.svg");
      text = " +6 U";
      break;
    case STEPS:
      pic = require("../Images/dashOrangeDownArrow.svg");
      text = " -540 skritt";
      break;
    case WEIGHT:
      pic = require("../Images/dashGreenDownArrow.svg");
      text = " -4 kg";
      break;
    case CARBOHYDRATES:
      pic = require("../Images/dashGreenDownArrow.svg");
      text = " -7 g";
      break;
    case PHYSICAL_ACTIVITY:
      pic = require("../Images/dashGreenUpArrow.svg");
      text = " +6 min";
      break;
    default:
      return "";
  }

  return (
    <span>
      <img src={pic} alt={"logo"} className="dash-trend-image" />
      <span className="dash-trend-text">{text}</span>
    </span>
  );
}
