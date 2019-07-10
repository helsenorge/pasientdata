import React, { Component } from "react";
import { slide as BurgerMenu } from "react-burger-menu";
import Menu from "@helsenorge/toolkit/components/icons/Menu";
import ButtonToolBar from "./ButtonGroup";

class SideBar extends Component {
  constructor(props) {
    super(props);
  }
  //state = {  }
  render() {
    return (
      <div>
        {/* <div>hello from sidebar</div> */}
        {/* <div>
          <Menu />
          <Menu color="blue" />
          <Menu color="rgba(255, 0, 0, 0.4)" />
          <Menu size="large" />
          <Menu fontSize={48} />
          <Menu fontSize="48px" />
          <Menu variant="warning" />
        </div> */}
        <BurgerMenu {...this.props}>
          <a className="menu-item" href="/dashboard">
            Home
          </a>

          <a className="menu-item" href="/burgers">
            Burgers
          </a>

          <a className="menu-item" href="/steps">
            Steps
          </a>

          <a className="menu-item" href="/desserts">
            Desserts
          </a>
        </BurgerMenu>
      </div>
    );
  }
}

export default SideBar;
