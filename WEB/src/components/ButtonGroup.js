import React, { Component } from "react";
import { Button, ButtonGroup } from "shards-react";
//import Steps from "./steps";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

class ButtonToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = { outlineDay: true, outlineWeek: true, outlineMonth: true };
  }

  render() {
    return (
      <div>
        <div>
          <Button
            outline={this.state.outlineDay}
            onClick={() => {
              this.setState({
                outlineDay: false,
                outlineWeek: true,
                outlineMonth: true
              });
              this.props.onClicked(this.props.buttonClicked, "day");
              console.log("outlineState month: " + this.state.outlineDay);
            }}
          >
            Dag
          </Button>
          <Button
            outline={this.state.outlineWeek}
            onClick={() => {
              this.setState({
                outlineDay: true,
                outlineWeek: false,
                outlineMonth: true
              });
              this.props.onClicked(this.props.buttonClicked, "week");
              console.log("outlineState week: " + this.state.outlineWeek);
            }}
          >
            Uke
          </Button>
          <Button
            onClick={() => {
              this.setState({
                outlineDay: true,
                outlineWeek: true,
                outlineMonth: false
              });
              this.props.onClicked(this.props.buttonClicked, "month");
              console.log("outlineState month: " + this.state.outlineMonth);
            }}
            outline={this.state.outlineMonth}
          >
            Måned
          </Button>
        </div>
      </div>
    );
  }
}

export default ButtonToolBar;
