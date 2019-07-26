import {
  IS_LOGGED_IN,
  SET_VIEW,
  SET_NR_OF_INTERVALS_BACK,
  SET_BLOOD_SUGAR_CHECKED,
  SET_INSULIN_CHECKED,
  SET_STEPS_CHECKED,
  SET_WEIGHT_CHECKED,
  SET_PHYSICAL_ACTIVITY_CHECKED,
  SET_CARBOHYDRATES_CHECKED,
  SET_NUMBER_CHECKED,
  SET_START_END
} from "./actionType";

const initialState = {
  isLoggedin: false,
  view: "2weeks",
  nrOfIntervalsBack: "0",
  bloodSugarChecked: false,
  insulinChecked: false,
  stepsChecked: false,
  weightChecked: false,
  physicalActivityChecked: false,
  carbohydratesChecked: false,
  numberChecked: 0,
  start: "",
  end: ""
};

export default function baseInfoReducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedin: action.isLoggedin
      };
    }

    case SET_VIEW: {
      return {
        ...state,
        view: action.view,
        nrOfIntervalsBack: "0"
      };
    }

    case SET_NR_OF_INTERVALS_BACK: {
      return {
        ...state,
        nrOfIntervalsBack: action.nrOfIntervalsBack
      };
    }

    case SET_BLOOD_SUGAR_CHECKED: {
      return { ...state, bloodSugarChecked: action.bloodSugarChecked };
    }

    case SET_INSULIN_CHECKED: {
      return { ...state, insulinChecked: action.insulinChecked };
    }

    case SET_STEPS_CHECKED: {
      return { ...state, stepsChecked: action.stepsChecked };
    }

    case SET_WEIGHT_CHECKED: {
      return { ...state, weightChecked: action.weightChecked };
    }

    case SET_PHYSICAL_ACTIVITY_CHECKED: {
      return {
        ...state,
        physicalActivityChecked: action.physicalActivityChecked
      };
    }

    case SET_CARBOHYDRATES_CHECKED: {
      return { ...state, carbohydratesChecked: action.carbohydratesChecked };
    }

    case SET_NUMBER_CHECKED: {
      return { ...state, numberChecked: action.numberChecked };
    }
    case SET_START_END: {
      return {
        ...state,
        start: action.start,
        end: action.end
      };
    }

    default:
      return state;
  }
}
