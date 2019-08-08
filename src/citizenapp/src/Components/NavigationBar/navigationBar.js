import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navigationBar.css";

/*
 * Navigation bar used for navigating between the different insight pages.
 * Can be scrolled through with arrow buttons or with drag and drop.
 * Known bugs: does not remember position when an element is pressed.
 */

class NavigationBar extends Component {
  scrollRight() {
    var x = document.getElementById("tab_list");
    x.scrollBy({ top: 0, left: 100, behavior: "smooth" });
  }

  scrollLeft() {
    var x = document.getElementById("tab_list");
    x.scrollBy({ top: 0, left: -100, behavior: "smooth" });
  }

  componentDidMount() {
    const currentPage = window.location.pathname.split('/')[1];
    var x = document.getElementById("tab_list");
    x.scrollBy({ top: 0, left: scrollPositions[currentPage]});
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
              BLODSUKKER
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/insulin"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              INSULIN
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/steps"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              SKRITT
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/weight"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              VEKT
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/physicalactivity"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              FYSISK AKTIVITET
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/carbohydrates"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              KARBOHYDRATER
            </NavLink>
          </li>
        </ul>
        <span className="prev" onClick={() => this.scrollLeft()}>
          &#10094;
        </span>
        <span className="next" onClick={() => this.scrollRight()}>
          &#10095;
        </span>
      </div>
    );
  }
}

export default NavigationBar;

const scrollPositions = {
  "bloodsugar": 0,
  "insulin": 0,
  "steps": 100,
  "weight": 200,
  "physicalactivity": 300,
  "carbohydrates": 400
}
