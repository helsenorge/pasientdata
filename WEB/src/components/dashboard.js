import React, { Component } from "react";
import NavigationBar from "./navigationBar.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationBar>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">HELLOO</div>
          </div>
        </div>
      </NavigationBar>
    );
  }
}

export default Dashboard;
