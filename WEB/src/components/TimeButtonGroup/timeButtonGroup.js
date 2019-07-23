import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";

class TimeButtonGroup extends Component {

  renderMinute = render => {
    if (render) {
      if (this.props.outline.minute) {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "minute");
            }}
            primary
          >
            Minute
          </DisplayButton>
        );
      } else {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "minute");
            }}
            secondary
          >
            Minute
          </DisplayButton>
        );
      }
    }
  };

  renderHour = render => {
    if (render) {
      if (this.props.outline.hour) {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "hour");
            }}
            primary
          >
            Hour
          </DisplayButton>
        );
      } else {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "hour");
            }}
            secondary
          >
            Hour
          </DisplayButton>
        );
      }
    }
  };

  renderDay = renderDay => {
    if (renderDay) {
      if (this.props.outline.day) {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "day");
            }}
            primary
          >
            Day
          </DisplayButton>
        );
      } else {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "day");
            }}
            secondary
          >
            Day
          </DisplayButton>
        );
      }
    }
  };

  renderWeek = render => {
    if (render) {
      if (this.props.outline.week) {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "week");
            }}
            primary
          >
            Week
          </DisplayButton>
        );
      } else {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "week");
            }}
            secondary
          >
            Week
          </DisplayButton>
        );
      }
    }
  };

  renderMonth = render => {
    if (render) {
      if (this.props.outline.month) {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "month");
            }}
            primary
          >
            Month
          </DisplayButton>
        );
      } else {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "month");
            }}
            secondary
          >
            Month
          </DisplayButton>
        );
      }
    }
  };

  renderYear = render => {
    if (render) {
      if (this.props.outline.year) {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "year");
            }}
            primary
          >
            Year
          </DisplayButton>
        );
      } else {
        return (
          <DisplayButton
            onClick={() => {
              this.props.onClicked(this.props.buttonClicked, "year");
            }}
            secondary
          >
            Year
          </DisplayButton>
        );
      }
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
