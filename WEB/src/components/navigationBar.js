import React, { Component, Fragment } from "react";
//import { GoogleLogout } from 'react-google-login';
import Tabs from "@helsenorge/toolkit/components/molecules/tabs/index";
import Tab from "@helsenorge/toolkit/components/molecules/tabs/tab";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  loggedOut() {
    localStorage.removeItem("accessToken");
  }

  render() {
    return (
      <div>
        HEI
        {/* <Fragment>
          <Tabs
            ref={(bookingTabs: Tabs) => (this.ctrls.bookingTabs = bookingTabs)}
          >
            <Tab title="Gamle sykdommer" className="hei">
              Tab1 innhold
              <p>
                Bytt til{" "}
                <a
                  onClick={() => {
                    if (this.ctrls.bookingTabs) {
                      this.ctrls.bookingTabs.setSelectedIndex(1);
                    }
                  }}
                >
                  nye sykdommer
                </a>{" "}
                tab
              </p>
            </Tab>
            <Tab title="Nye sykdommer">Tab2 innhold</Tab>
            <Tab title="Alternative behandlere">Tab3 innhold</Tab>
          </Tabs>
        </Fragment> */}
      </div>
    );
  }
}

export default NavigationBar;
