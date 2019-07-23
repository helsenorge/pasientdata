import React, { Component } from "react";
import "./menuBar.css";
import Menu from "@helsenorge/toolkit/components/icons/Menu";
import ChevronDownRounded from "@helsenorge/toolkit/components/icons/ChevronDownRounded";
import Tiles from "@helsenorge/toolkit/components/icons/Tiles";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { onLoggedIn } from "../../Redux/actions";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false, isToggleOn2: false };
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  toggle2() {
    this.setState(prevState => ({
      isToggleOn2: !prevState.isToggleOn2
    }));
  }

  loggedOut() {
    sessionStorage.removeItem("googleResponse");
    this.props.onLoggedIn(false);
  }

  render() {
    let menu;
    // let menu2;

    // Tried to make a inner dropdown, does not work with fliped horizontal view, 
    // and does not close outer dropdown when clicked on inner buttons
    
    // if (this.state.isToggleOn2) {
    //   menu2 = (
    //     <div className="menuBar2 menuBar-open2 pageLink">
    //       <ul className="ulBar">
    //         <li className="liBar">
    //           <NavLink
    //             to="/blodsukker"
    //             className="menu-link click-menuBar-open"
    //             onClick={this.toggle2}
    //           >
    //             Blodsukker
    //           </NavLink>
    //         </li>
    //         <li className="liBar">
    //           <NavLink
    //             to="/insulin"
    //             className="menu-link click-menuBar-open"
    //             onClick={this.toggle2}
    //           >
    //             Insulin
    //           </NavLink>
    //         </li>
    //         <li className="liBar">
    //           <NavLink
    //             to="/skritt"
    //             className="menu-link click-menuBar-open"
    //             onClick={this.toggle2}
    //           >
    //             Skritt
    //           </NavLink>
    //         </li>
    //         <li className="liBar">
    //           <NavLink
    //             to="/vekt"
    //             className="menu-link click-menuBar-open"
    //             onClick={this.toggle2}
    //           >
    //             Vekt
    //           </NavLink>
    //         </li>
    //         <li className="liBar">
    //           <NavLink
    //             to="/blodtrykk"
    //             className="menu-link click-menuBar-open"
    //             onClick={this.toggle2}
    //           >
    //             Blodtrykk
    //           </NavLink>
    //         </li>
    //         <li className="liBar">
    //           <NavLink
    //             to="/karbohydrater"
    //             className="menu-link click-menuBar-open"
    //             onClick={this.toggle2}
    //           >
    //             Karbohydrater
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </div>
    //   );
    // } else {
    //   menu2 = <div className=""> </div>;
    // }

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
              <NavLink
                to="/dashboard"
                className="menu-link click-menuBar-open"
                onClick={this.toggle}
              >
                Innsikt
              </NavLink>
              {/* <button className="button2" onClick={this.toggle2}>
                <Menu className="menuButton2" />
              </button>
              <div>{menu2}</div> */}
            </li>
            <li className="liBar">
              <NavLink
                to="/comparedata"
                className="menu-link click-menuBar-open"
                onClick={this.toggle}
              >
                Sammenlign data
              </NavLink>
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

    return (
      <div>
        <div className="bar row navbar">
          <div className="menuPos textStyle">
            <a className="aStyle" href="/dashboard">
              Helseinnsikt
            </a>
          </div>
          <div className="menuPos">
            <button className="button" onClick={this.toggle}>
              <Menu /> Meny
            </button>
          </div>
        </div>
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
