import { connect } from "react-redux";
import { setPatient, selectDataset } from "../reducers/patientReducer";
import GoogleFitComponent from "./GoogleFitComponent";

const mapDispatchToProps = dispatch => {
  return {
    addPatient: (googleId, firstname, lastname, email, image, datasets) => {
      dispatch(
        setPatient(googleId, firstname, lastname, email, image, datasets)
      );
    }
  };
};

const mapStateToProps = state => {
  return {
    datasets: selectDataset(state)
  };
};

const GoogleFitContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleFitComponent);

export default GoogleFitContainer;
