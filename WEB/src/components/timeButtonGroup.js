import React, { Component } from "react";
import { Button } from "shards-react";
//import Steps from "./steps";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
//import TimeButton from "./timeButton";

class TimeButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outlineHour: true,
      outlineDay: true,
      outlineWeek: true,
      outlineMonth: true,
      outlineYear: true
    };
  }

  renderHour = renderHour => {
    if (renderHour) {
      return (
        <Button
          outline={this.state.outlineHour}
          onClick={() => {
            this.setState({
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
              outlineHour: false,
              outlineDay: true,
              outlineWeek: true,
              outlineMonth: true,
              outlineYear: true
            });
            this.props.onClicked(this.props.buttonClicked, "day");
          }}
        >
          Dag
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
          {this.renderDay(this.props.views.day)}
          <Button
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
          </Button>
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
