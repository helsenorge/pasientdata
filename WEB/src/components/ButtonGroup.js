import React, { Component } from "react";
import { Button, ButtonGroup } from "shards-react";
//import Steps from "./steps";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

class ButtonToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <Button
            outline
            onClick={() =>
              this.props.onClicked(this.props.buttonClicked, "day")
            }
          >
            Dag
          </Button>
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
