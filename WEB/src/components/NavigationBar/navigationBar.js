import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "./navigationBar.css"

class NavigationBar extends Component {

  render() {
    return (
      <div>
        <div className="menu-button-row row navbar d-block max-width-wrapper">
          <ul className="tab_list">
            <li className="tab li-wrapper">
              <NavLink to="/dashboard" className="tab-anchor" activeClassName="tab_selected"> Home </NavLink>
            </li>
            <li className="tab li-wrapper">
              <NavLink to="/steps" className="tab-anchor" activeClassName="tab_selected"> Steps </NavLink>
            </li>
          </ul>
        </div>
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
