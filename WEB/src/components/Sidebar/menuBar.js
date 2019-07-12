import React, { Component, useState } from "react";
import "./menuBar.css";
import Menu from "@helsenorge/toolkit/components/icons/Menu";

// const ToggleContent = ({ toggle, content }) => {
//   const [isShown, setIsShown] = useState(false);
//   const hide = () => setIsShown(false);
//   const show = () => setIsShown(true);

//   return (
//     <>
//       {toggle(show)}
//       {isShown && content(hide)}
//     </>
//   );
// };

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    const pic = require("../../Images/ehelse_hvit.svg");
    let menu;
    if (this.state.isToggleOn) {
      menu = <div className="menuBar menuBar-open"> HElloooo</div>;
    } else {
      menu = <div className="menuBar2"> HElloooo</div>;
    }
    return (
      <div className="header">
        <div className="bar row navbar">
          <div className="menuPos">
            <img src={pic} className="menuLogo"/>
          </div>
          <div className="menuPos">
            <button className="button" onClick={this.toggle}>
              <Menu /> Menu
            </button>
          </div>
        </div>
        <div>{menu}</div>

        {/* <div>
          <ToggleContent
            toggle={show => <button className="button" onClick={show} >Open</button>}
            content={hide => (
              <p>
                There is no spoon...
                <button onClick={hide}>Close</button>
              </p>
            )}
          />
        </div> */}
      </div>
    );
  }
}

export default MenuBar;
