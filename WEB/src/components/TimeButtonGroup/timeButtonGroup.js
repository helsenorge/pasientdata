import React, { Component } from "react";
import { Button } from "shards-react";
//import Steps from "./steps";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";

class TimeButtonGroup extends Component {
  constructor(props) {
    super(props);
  }

  renderMinute = render => {
    if (render) {
      return (
        <DisplayButton
          //outline={this.props.outline.minute}
          onClick={() => {
            this.props.onClicked(this.props.buttonClicked, "minute");
          }}
          secondary={"secondary"}
        >
          {"Minute"}
        </DisplayButton>
      );
    }
  };

  renderHour = render => {
    if (render) {
      return (
        <Button
          outline={this.props.outline.hour}
          onClick={() => {
            this.props.onClicked(this.props.buttonClicked, "hour");
          }}
        >
          Hour
        </Button>
      );
    }
  };

  renderDay = renderDay => {
    if (renderDay) {
      return (
        <Button
          outline={this.props.outline.day}
          onClick={() => {
            this.props.onClicked(this.props.buttonClicked, "day");
          }}
        >
          Day
        </Button>
      );
    }
  };

  renderWeek = render => {
    if (render) {
      return (
        <Button
          outline={this.props.outline.week}
          onClick={() => {
            this.props.onClicked(this.props.buttonClicked, "week");
          }}
        >
          Week
        </Button>
      );
    }
  };

  renderMonth = render => {
    if (render) {
      return (
        <Button
          outline={this.props.outline.month}
          onClick={() => {
            this.props.onClicked(this.props.buttonClicked, "month");
          }}
        >
          Month
        </Button>
      );
    }
  };

  renderYear = render => {
    if (render) {
      return (
        <Button
          outline={this.props.outline.year}
          onClick={() => {
            this.props.onClicked(this.props.buttonClicked, "year");
          }}
        >
          Year
        </Button>
      );
    }
  };

  render() {
    return (
      <div>
        <div>
          {this.renderMinute(this.props.views.minute)}
          {this.renderHour(this.props.views.hour)}
          {this.renderDay(this.props.views.day)}
          {this.renderWeek(this.props.views.week)}
          {this.renderMonth(this.props.views.month)}
          {this.renderYear(this.props.views.year)}
        </div>
      </div>
    );
  }
}

export default TimeButtonGroup;
