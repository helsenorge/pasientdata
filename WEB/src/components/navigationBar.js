import React, { Component } from "react";
//import { GoogleLogout } from 'react-google-login';
import Tabs from "@helsenorge/toolkit/components/molecules/tabs/index";
import Tab from "@helsenorge/toolkit/components/molecules/tabs/tab";
import Burgers from "./burgers";
import ButtonToolBar from "./ButtonGroup";
import { connect } from "react-redux";
import BarPlotter from "./barPlotter";
import { Link, NavLink } from "react-router-dom";
import classnames from "classnames";
import Steps from "./steps";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewButtonClicked: "week",
      intervalButtonClicked: "day",
      activeTab: "4"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  clicked = (buttonType, buttonClicked) => {
    if (buttonType === "view") {
      this.setState({ outline: false, viewButtonClicked: buttonClicked });
    } else {
      this.setState({ outline: false, intervalButtonClicked: buttonClicked });
    }
  };

  loggedOut() {
    localStorage.removeItem("accessToken");
  }

  render() {

    //const { onDay, onWeek, onMonth } = this.props;
    console.log(
      "view: " +
        this.state.viewButtonClicked +
        " interval: " +
        this.state.intervalButtonClicked
    );
    return (
      <div>
        <div className="menu-button-row row navbar d-block max-width-wrapper">
          <NavLink to="/" > Home </NavLink>
          <NavLink to="/burgers" > Burgers </NavLink>
          <NavLink to="/steps"> Steps </NavLink>
        </div>
        {/* <Tabs>
          <Tab title="Ian Daly" className="hei">
            Daly started his career with local club Broadford Rovers and spent
            two seasons at Home Farm FC, before joining Manchester City in July
            2006. He was part of the Manchester City youth team that won the
            2008 FA Youth Cup.[3] In July 2009, Daly joined Greek Super League
            team Aris Thessaloniki on a two-year contract. During his time at
            Aris, Daly worked with coach Hector Cuper[4][5] who showed his trust
            in Daly by giving him the opportunity to play against teams such as
            Olympiakos and AEK Athens.[6] He played in a trial match for Bristol
            Rovers on 24 August 2010 at Cheltenham Town and scored a goal in a
            1–0 win. In August 2010, Cadiz CF of the Spanish Segunda División B
            announced the signing of Daly on transfer deadline day.[7] Daly made
            his competitive debut on 14 November 2010 in 2–1 defeat to Lorca
            Atlético,[8] but left the club by mutual consent on 28 January
            2011.[7] St Patrick's Athletic Daly signed for St Patrick's Athletic
            on a one-year deal on Monday 28 February 2011, given the number 24
            shirt.[9] He made his Pats debut in the away trip to Galway United
            when he came off the bench late on. Daly scored his first goal for
            Pats in a 2–0 win over Bray Wanderers in the Leinster Senior Cup at
            the Carlisle Grounds on 14 March 2011.[10] Daly scored his first
            league goal away to Dundalk in the 69th minute to level the scores
            at 1–1 after coming on from the bench after 63 minutes.[11] The
            Saints once again faced County Louth opposition the following
            Friday, in the form of Drogheda United. Daly played the full game
            and scored the fourth goal in a 4–1 win at Hunky Dorys Park.[12]
            Daly played a big part in Pats' 2011–12 UEFA Europa League campaign,
            setting up Dave McMillan's equalized away to FC Shakhter Karagandy
            in Kazakhstan, playing in all six games and scoring against ÍBV from
            Iceland in the first round.[13] Daly signed a one-year extension to
            his contract to keep him at the club for the 2012 season. Daly's
            first goal of the 2012 season came in a 4–0 win over Phoenix in the
            Leinster Senior Cup at Richmond Park.[14] He scored his second goal
            of the season in a 2–1 win over U.C.D in the 2012 League of Ireland
            Cup.[15] Daly missed a penalty in the defeat against rivals Shamrock
            Rovers in the EA Sports Cup quarter final[16] and this turned out to
            be his final appearance for Pats as he requested that his contract
            was terminated by mutual consent in search of first team
            football.[17]
          </Tab>
          <Tab title="Ting å tenke på">
            <Burgers />
          </Tab>
          <Tab title="Steps">
            <div>View: </div>
            <ButtonToolBar onClicked={this.clicked} buttonClicked={"view"} />
            <div>Interval: </div>
            <ButtonToolBar
              onClicked={this.clicked}
              buttonClicked={"interval"}
            />
            <BarPlotter
              datasets={this.props.patient.datasets}
              aggregateLength={this.state.intervalButtonClicked}
              timeScope={this.state.viewButtonClicked}
              datasetLOINC="55423-8"
            />
          </Tab>
        </Tabs> */}
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
