import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navigationBar.css";

class NavigationBar extends Component {

  scrollRight() {
    var x = document.getElementById("tab_list");
    x.scrollBy({ top: 0, left: 100, behavior: 'smooth' });
  }

  scrollLeft() {
    var x = document.getElementById("tab_list");
    x.scrollBy({ top: 0, left: -100, behavior: 'smooth' });
  }

  render() {
    return (
      <div className="menu-button-row row navbar d-block max-width-wrapper">
        <ul className="tab_list" id="tab_list">
          <li className="li-wrapper">
            <NavLink
              to="/blodsukker"
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
              to="/skritt"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Skritt
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/vekt"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Vekt
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/blodtrykk"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Blodtrykk
            </NavLink>
          </li>
          <li className="li-wrapper">
            <NavLink
              to="/karbohydrater"
              className="tab-anchor"
              activeClassName="tab_selected"
            >
              Karbohydrater
            </NavLink>
          </li>
        </ul>
        <a class="prev" onClick={() => this.scrollLeft()}>
          &#10094;
        </a>
        <a class="next" onClick={() => this.scrollRight()}>
          &#10095;
        </a>
      </div>
    );
  }
}

export default NavigationBar;
