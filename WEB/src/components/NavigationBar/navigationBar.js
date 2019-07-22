import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "./navigationBar.css";

class NavigationBar extends Component {
  render() {
    return (
      <div className="menu-button-row row navbar d-block max-width-wrapper">
        <ul className="tab_list">
          <li className="tab li-wrapper">
            <NavLink
              to="/dashboard"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Home
            </NavLink>
          </li>
          <li className="tab li-wrapper">
            <NavLink
              to="/blodsukker"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Blodsukker
            </NavLink>
          </li>
          <li className="tab li-wrapper">
            <NavLink
              to="/insulin"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Insulin
            </NavLink>
          </li>
          <li className="tab li-wrapper">
            <NavLink
              to="/skritt"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Skritt
            </NavLink>
          </li>
          <li className="tab li-wrapper">
            <NavLink
              to="/vekt"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Vekt
            </NavLink>
          </li>
          <li className="tab li-wrapper">
            <NavLink
              to="/blodtrykk"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Blodtrykk
            </NavLink>
          </li>
          <li className="tab li-wrapper">
            <NavLink
              to="/karbohydrater"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Karbohydrater
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient
  };
}

export default connect(mapStateToProps)(NavigationBar);
