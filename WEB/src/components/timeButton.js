import React from "react";
import { Button } from "shards-react";

class TimeButton extends Component {
  state = {};
  render() {
    return (
      <div>
        <Button
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
        </Button>
      </div>
    );
  }
}

export default TimeButton;
