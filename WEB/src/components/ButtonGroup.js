import React, { Component } from "react";
import { Button, ButtonGroup } from "shards-react";
import Steps from "./steps";

class ButtonToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <button
            onClick={() =>
              this.props.onClicked(this.props.buttonClicked, "day")
            }
          >
            Dag
          </button>
          <button
            onClick={() =>
              this.props.onClicked(this.props.buttonClicked, "week")
            }
          >
            Uke
          </button>
          <button
            onClick={() =>
              this.props.onClicked(this.props.buttonClicked, "month")
            }
          >
            Måned
          </button>
        </div>
      </div>
    );
  }
}

export default ButtonToolBar;
