import React, { Component, useState, Fragment } from "react";
import "./menuBar.css";
import Menu from "@helsenorge/toolkit/components/icons/Menu";
import Tiles from "@helsenorge/toolkit/components/icons/Tiles";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { onLoggedIn } from "../../Redux/actions";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };
    this.toggle = this.toggle.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  loggedOut() {
    sessionStorage.removeItem("googleResponse");
    this.props.onLoggedIn(false);
  }

  render() {
    const pic = require("../../Images/ehelse_hvit.svg");
    const mobilePic = require("../../Images/ehelse_logo_hvit.svg");
    let menu;
    let menuBar;

    if (this.state.isToggleOn) {
      menu = (
        <div className="menuBar menuBar-open pageLink">
          <ul className="ulBar">
            <li className="liBar">
              <div>
                <Tiles color="black" /> Min helse
              </div>
            </li>
            <li className="liBar">
              <NavLink to="/dashboard" className="menu-link" onClick={this.toggle}>
                Innsikt
              </NavLink>
              {}
            </li>
            <li className="liBar">
              <NavLink to="/steps" className="menu-link" onClick={this.toggle}>
                Sammenlign data
              </NavLink>
              {}
            </li>
            <li className="liBar">
              <button className="logoutButton" onClick={() => this.loggedOut()}>
                Logg ut
              </button>
            </li>
          </ul>
        </div>
      );
    } else {
      menu = <div className="menuBar"> </div>;
    }

    if (window.innerWidth >= 650) {
      menuBar = (
        <div className="bar row navbar">
          <div className="menuPos">
            <a href="https://ehelse.no/" className="aStyle">
              <img src={pic} className="menuLogo" />
            </a>
          </div>
          <div className="menuPos">
            <button className="button" onClick={this.toggle}>
              <Menu /> Meny
            </button>
          </div>
        </div>
      );
    } else {
      menuBar = (
        <div className="bar row navbar">
          <div className="menuPos">
            <a href="https://ehelse.no/" className="aStyle">
              <img src={pic} className="menuLogo" />
            </a>
          </div>
          <div className="menuPos">
            <button className="button" onClick={this.toggle}>
              <Menu /> Meny
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        {menuBar}
        <div>{menu}</div>
      </div>
    );
  }
}

const mapDispatchToProps = { onLoggedIn };

function mapStateToProps(state) {
  return {
    patient: state.patient
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
