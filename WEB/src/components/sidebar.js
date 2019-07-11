import React, { Component } from "react";
import { slide as BurgerMenu } from "react-burger-menu";
import { Link } from "react-router-dom";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
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
        <BurgerMenu
          {...this.props}
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
        >
          <Link onClick={() => this.closeMenu()} className="menu-item" to="/">
            Home
          </Link>

          <Link
            onClick={() => this.closeMenu()}
            className="menu-item"
            to="/Dashboard"
          >
            Dashboard
          </Link>

          <Link
            onClick={() => this.closeMenu()}
            className="menu-item"
            to="/steps"
          >
            Steps
          </Link>

          <Link
            onClick={() => this.closeMenu()}
            className="menu-item"
            to="/desserts"
          >
            Desserts
          </Link>
        </BurgerMenu>
      </div>
    );
  }
}

export default SideBar;
