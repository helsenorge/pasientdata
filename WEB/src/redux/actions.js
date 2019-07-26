import {
  SET_PATIENT,
  IS_LOGGED_IN,
  SET_GOALS,
  SET_VIEW,
  SET_NR_OF_INTERVALS_BACK,
  SET_BLOOD_SUGAR_CHECKED,
  SET_INSULIN_CHECKED,
  SET_STEPS_CHECKED,
  SET_WEIGHT_CHECKED,
  SET_PHYSICAL_ACTIVITY_CHECKED,
  SET_CARBOHYDRATES_CHECKED,
  SET_NUMBER_CHECKED,
  SET_START_END,
  CHANGE_GOAL
} from "./actionType";

export const addInfo = (
  googleId,
  firstname,
  lastname,
  email,
  image,
  datasets
) => {
  return dispatch =>
    dispatch({
      type: SET_PATIENT,
      googleId,
      firstname,
      lastname,
      email,
      image,
      datasets
    });
};
export const onLoggedIn = isLoggedin => {
  return dispatch => dispatch({ type: IS_LOGGED_IN, isLoggedin });
};
export const setGoals = goals => {
  return dispatch => dispatch({ type: SET_GOALS, goals });
};
export const setView = view => {
  return dispatch => dispatch({ type: SET_VIEW, view });
};
export const setStartEnd = (start, end) => {
  return dispatch => dispatch({ type: SET_START_END, start, end });
};

export const setNrOfIntervalsBack = nrOfIntervalsBack => {
  return dispatch =>
    dispatch({ type: SET_NR_OF_INTERVALS_BACK, nrOfIntervalsBack });
};

export const setBloodSugarChecked = bloodSugarChecked => {
  return dispatch =>
    dispatch({ type: SET_BLOOD_SUGAR_CHECKED, bloodSugarChecked });
};

export const setInsulinChecked = insulinChecked => {
  return dispatch => dispatch({ type: SET_INSULIN_CHECKED, insulinChecked });
};

export const setStepsChecked = stepsChecked => {
  return dispatch => dispatch({ type: SET_STEPS_CHECKED, stepsChecked });
};

export const setWeightChecked = weightChecked => {
  return dispatch => dispatch({ type: SET_WEIGHT_CHECKED, weightChecked });
};

export const setPhysicalActivityChecked = physicalActivityChecked => {
  return dispatch =>
    dispatch({ type: SET_PHYSICAL_ACTIVITY_CHECKED, physicalActivityChecked });
};

export const setCarbohydratesChecked = carbohydratesChecked => {
  return dispatch =>
    dispatch({ type: SET_CARBOHYDRATES_CHECKED, carbohydratesChecked });
};

export const setNumberChecked = numberChecked => {
  return dispatch => dispatch({ type: SET_NUMBER_CHECKED, numberChecked });
};

export const changeGoal = (goalName, goal) => {
  console.log("gn: ", goalName);
  console.log("g: ", goal);
  return dispatch => dispatch({ type: CHANGE_GOAL, goalName, goal });
};
