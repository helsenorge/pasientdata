import React, { Component } from "react";
import { Button } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./timeButtonGroup.css";

class TimeButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outlineMinute: true,
      outlineHour: true,
      outlineDay: true,
      outlineWeek: true,
      outlineMonth: true,
      outlineYear: true
    };
  }

  renderMinute = render => {
    if (render) {
      return (
        <Button
          outline={this.state.outlineMinute}
          onClick={() => {
            this.setState({
              outlineMinute: false,
              outlineHour: true,
              outlineDay: true,
              outlineWeek: true,
              outlineMonth: true,
              outlineYear: true
            });
            this.props.onClicked(this.props.buttonClicked, "minute");
          }}
        >
          Minute 
        </Button>
      );
    }
  };

  renderHour = render => {
    if (render) {
      return (
        <Button
          outline={this.state.outlineHour}
          onClick={() => {
            this.setState({
              outlineMinute: true,
              outlineHour: false,
              outlineDay: true,
              outlineWeek: true,
              outlineMonth: true,
              outlineYear: true
            });
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
          outline={this.state.outlineDay}
          onClick={() => {
            this.setState({
              outlineMinute: true,
              outlineHour: true,
              outlineDay: false,
              outlineWeek: true,
              outlineMonth: true,
              outlineYear: true
            });
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
          outline={this.state.outlineWeek}
          onClick={() => {
            this.setState({
              outlineMinute: true,
              outlineHour: true,
              outlineDay: true,
              outlineWeek: false,
              outlineMonth: true,
              outlineYear: true
            });
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
          outline={this.state.outlineMonth}
          onClick={() => {
            this.setState({
              outlineMinute: true,
              outlineHour: true,
              outlineDay: true,
              outlineWeek: true,
              outlineMonth: false,
              outlineYear: true
            });
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
          outline={this.state.outlineYear}
          onClick={() => {
            this.setState({
              outlineMinute: true,
              outlineHour: true,
              outlineDay: true,
              outlineWeek: true,
              outlineMonth: true,
              outlineYear: false
            });
            this.props.onClicked(this.props.buttonClicked, "year");
          }}
        >
          Year
        </Button>
      );
    }
  };

  render() {
    //let { hour, day, week, month, year } = this.props;
    //console.log(this.props);
    return (
      <div>
        <div>
          {/* <TimeButton /> */}
          {/* <Button
            outline={this.state.outlineDay}
            onClick={() => {
              this.setState({
                outlineHour: true,
                outlineDay: false,
                outlineWeek: true,
                outlineMonth: true,
                outlineYear: true
              });
              this.props.onClicked(this.props.buttonClicked, "day");
            }}
          >
            Dag
          </Button> */}
          {this.renderMinute(this.props.views.minute)}
          {this.renderDay(this.props.views.day)}
          {this.renderHour(this.props.views.hour)}
          {this.renderWeek(this.props.views.week)}
          {this.renderMonth(this.props.views.month)}
          {this.renderYear(this.props.views.year)}
          {/* <Button
            outline={this.state.outlineWeek}
            onClick={() => {
              this.setState({
                outlineHour: true,
                outlineDay: true,
                outlineWeek: false,
                outlineMonth: true,
                outlineYear: true
              });
              this.props.onClicked(this.props.buttonClicked, "week");
            }}
          >
            Uke
          </Button>
          <Button
            onClick={() => {
              this.setState({
                outlineHour: true,
                outlineDay: true,
                outlineWeek: true,
                outlineMonth: false,
                outlineYear: true
              });
              this.props.onClicked(this.props.buttonClicked, "month");
            }}
            outline={this.state.outlineMonth}
          >
            Måned
          </Button> */}
        </div>
      </div>
    );
  }
}

export default TimeButtonGroup;

// renderElement(){
//   if(this.state.value == 'news')
//      return <Text>data</Text>;
//   return null;
// }

// render() {
//    return (
//        <View style={styles.container}>
//            { this.renderElement() }
//        </View>
//    )
// }
