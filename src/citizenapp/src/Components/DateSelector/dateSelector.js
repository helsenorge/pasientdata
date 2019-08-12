import React from "react";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

import { DateRangePicker } from "react-dates";

import "react-dates/lib/css/_datepicker.css";
import "./dateSelector.css";
import { connect } from "react-redux";
import { setStartEnd } from "../../Redux/actions";

/*
 * Simple to and from date selector.
 * Sets the start and end variables in the redux store when both have been selected.
 */

class DateSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null
    };
  }

  startChanged = newStart => {
    if (this.state.end !== null) {
      this.setState({ start: newStart });
      this.props.setStartEnd(newStart, this.state.end);
    } else {
      this.setState({ start: newStart });
    }
  };

  endChanged = newEnd => {
    if (this.state.start !== null) {
      this.setState({ end: newEnd });
      this.props.setStartEnd(this.state.start, newEnd);
    } else {
      this.setState({ end: newEnd });
    }
  };

  render() {
    return (
      <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => {
          this.setState({ startDate, endDate });
          if (startDate !== null) {
            this.startChanged(startDate);
          }
          if (endDate !== null) {
            this.endChanged(endDate);
          }
        }} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        numberOfMonths={1}
        isOutsideRange={day => false}
        firstDayOfWeek={1}
      />
    );
  }
}
const mapDispatchToProps = { setStartEnd };

function mapStateToProps(state) {
  return {
    baseInfo: state.baseInfo
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateSelector);