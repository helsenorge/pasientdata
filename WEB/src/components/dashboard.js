import React, { Component, Fragment } from "react";
import NavigationBar from "./navigationBar.js";
//import SideBar from "./sidebar";
import "./sidebar.css";

class Dashboard extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <Fragment>
          <NavigationBar />
          {/* <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} /> */}
        </Fragment>
        {/* <NavigationBar>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">HELLOO</div>
            </div>
          </div>
        </NavigationBar> */}
      </div>
    );
  }
}

export default Dashboard;
