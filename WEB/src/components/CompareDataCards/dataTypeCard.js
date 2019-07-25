import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
// import { FormCheckbox } from "shards-react";
import CheckBoxGroup, {
  Option
} from "@helsenorge/toolkit/components/atoms/checkbox-group";
import "./compareDataCards.css";

class DataTypeCard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checkboxes: [
        { id: "1", label: " ", checked: false },
        { id: "2", label: " ", checked: false },
        { id: "3", label: " ", checked: false },
        { id: "4", label: " ", checked: false },
        { id: "5", label: " ", checked: false },
        { id: "6", label: " ", checked: false }
      ]
    };
  }

  handleChange = id => {
    let changed;
    let newCheckboxes = this.state.checkboxes.map(e => {
      if (e.id === id) {
        e.checked = !e.checked;
        changed = e;
      }
      return e;
    });

    this.setState({ checkboxes: newCheckboxes });
  };

  makeCheckBox = () => {
    return (
      <React.Fragment>
        <CheckBoxGroup
          className="datatype-checkbox atom_fieldset mol_validation"
          id="1"
          handleChange={this.handleChange}
          errorMessage="Du kan bare velge tre datakilder av gangen"
          max={3}
          checkboxes={this.state.checkboxes}
        />
      </React.Fragment>
    );
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
      <div className="flex-container-datatypes">
        {this.makeColorCategories()}
        <div className="flex-children-datatypes-checkboxes">
          {this.makeCheckBox()}
        </div>
      </div>
    );
  };

  render() {
    return <CardComponent title={""} content={this.makeContent()} />;
  }
}

export default DataTypeCard;
