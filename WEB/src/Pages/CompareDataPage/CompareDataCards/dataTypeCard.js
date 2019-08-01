import React, { Component } from "react";
import CardComponent from "../../../components/Card/cardComponent";
import CheckBoxGroup from "@helsenorge/toolkit/components/atoms/checkbox-group";
import "./compareDataCards.css";
import { connect } from "react-redux";
import {
  setBloodSugarChecked,
  setInsulinChecked,
  setStepsChecked,
  setWeightChecked,
  setPhysicalActivityChecked,
  setCarbohydratesChecked,
  setNumberChecked
} from "../../../Redux/actions";

class DataTypeCard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checkboxes: [
        {
          id: "bloodSugar",
          label: "",
          checked: this.props.baseInfo.bloodSugarChecked
        },
        {
          id: "insulin",
          label: "",
          checked: this.props.baseInfo.insulinChecked
        },
        { id: "steps", label: "", checked: this.props.baseInfo.stepsChecked },
        {
          id: "weight",
          label: "",
          checked: this.props.baseInfo.weightChecked
        },
        {
          id: "physicalActivity",
          label: "",
          checked: this.props.baseInfo.physicalActivityChecked
        },
        {
          id: "carbohydrates",
          label: "",
          checked: this.props.baseInfo.carbohydratesChecked
        }
      ],
      numberChecked: this.props.baseInfo.numberChecked,
      errorMessage: false
    };
  }

  handleChange = id => {
    let counter = this.state.numberChecked;
    let checkboxArray = this.state.checkboxes;

    checkboxArray.forEach(e => {
      if (e.id === id) {
        if (this.state.numberChecked < 6 || e.checked === true) {
          if (e.checked === true) {
            counter = counter - 1;
          } else {
            counter += 1;
          }
          e.checked = !e.checked;
          this.setState({ errorMessage: false });
        } else {
          this.setState({ errorMessage: true });
        }
        this.setState({ numberChecked: counter });
        this.props.setNumberChecked(counter);
        switch (e.id) {
          case "bloodSugar":
            this.props.setBloodSugarChecked(this.state.checkboxes[0].checked);
            break;
          case "insulin":
            this.props.setInsulinChecked(this.state.checkboxes[1].checked);
            break;
          case "steps":
            this.props.setStepsChecked(this.state.checkboxes[2].checked);
            break;
          case "weight":
            this.props.setWeightChecked(this.state.checkboxes[3].checked);
            break;
          case "physicalActivity":
            this.props.setPhysicalActivityChecked(
              this.state.checkboxes[4].checked
            );
            break;
          case "carbohydrates":
            this.props.setCarbohydratesChecked(
              this.state.checkboxes[5].checked
            );
            break;
          default:
            break;
        }
      }
      return e;
    });
  };

  makeCheckBox = () => {
    return (
      <React.Fragment>
        <CheckBoxGroup
          className="datatype-checkbox atom_fieldset mol_validation"
          id="1"
          handleChange={this.handleChange}
          max={3}
          checkboxes={this.state.checkboxes}
        />
      </React.Fragment>
    );
  };

  makeErrorMessage = () => {
    if (this.state.errorMessage) {
      return (
        <div className="datatypes-error-message">
          Du kan kun velge tre datakilder av gangen
        </div>
      );
    } else {
      return <div />;
    }
  };

  makeColorCategories = () => {
    return (
      <div className="flex-children-color-category">
        <span className="color-category-parent">
          <span
            className="circle color-category-child-dot"
            style={{ background: "#E71D37" }}
          />
          <span className="color-category-child-category">Blodsukker</span>
        </span>
        <span className="color-category-parent">
          <span
            className="circle color-category-child-dot"
            style={{ background: "#85C99E" }}
          />
          <span className="color-category-child-category">Insulin</span>
        </span>
        <span className="color-category-parent">
          <span
            className="circle color-category-child-dot"
            style={{ background: "#59C3FF" }}
          />
          <span className="color-category-child-category">Skritt</span>
        </span>
        <span className="color-category-parent">
          <span
            className="circle color-category-child-dot"
            style={{ background: "#E38B21" }}
          />
          <span className="color-category-child-category">Vekt</span>
        </span>
        <span className="color-category-parent">
          <span
            className="circle color-category-child-dot"
            style={{ background: "#EF87CE" }}
          />
          <span className="color-category-child-category">
            Fysisk aktivitet
          </span>
        </span>
        <span className="color-category-parent">
          <span
            className="circle color-category-child-dot"
            style={{ background: "#EEE05D" }}
          />
          <span className="color-category-child-category">Karbohydrater</span>
        </span>
      </div>
    );
  };

  makeContent = () => {
    return (
      <div>
        <div className="flex-container-datatypes">
          {this.makeColorCategories()}
          <div className="flex-children-datatypes-checkboxes">
            {this.makeCheckBox()}
          </div>
        </div>

        <div className="flex-container-datatypes-error-message">
          {this.makeErrorMessage()}
        </div>
      </div>
    );
  };

  render() {
    return <CardComponent title={""} content={this.makeContent()} />;
  }
}

const mapDispatchToProps = {
  setBloodSugarChecked,
  setInsulinChecked,
  setStepsChecked,
  setWeightChecked,
  setPhysicalActivityChecked,
  setCarbohydratesChecked,
  setNumberChecked
};

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTypeCard);
