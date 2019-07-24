import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navigationBar.css";

class NavigationBar extends Component {
  scrollRight() {
    var x = document.getElementById("tab_list");
    x.scrollBy({ top: 0, left: 100, behavior: "smooth" });
  }

  scrollLeft() {
    var x = document.getElementById("tab_list");
    x.scrollBy({ top: 0, left: -100, behavior: "smooth" });
  }

  render() {
    return (
      <div className="menu-button-row row navbar d-block max-width-wrapper">
        <ul className="tab_list" id="tab_list">
          <li className="li-wrapper">
            <NavLink
              to="/bloodsugar"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Blodsukker
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/insulin"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Insulin
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/steps"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Skritt
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/weight"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Vekt
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/bloodpressure"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Blodtrykk
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/carbohydrates"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Karbohydrater
            </NavLink>
          </li>
        </ul>
        <a className="prev" onClick={() => this.scrollLeft()}>
          &#10094;
        </a>
        <a className="next" onClick={() => this.scrollRight()}>
          &#10095;
        </a>
      </div>
    );
  }
}

export default NavigationBar;
