export const BLOODSUGAR = "bloodsugar";
export const INSULIN = "insulin";
export const STEPS = "steps";
export const WEIGHT = "weight";
export const PHYSICAL_ACTIVITY = "physical_activity";
export const CARBOHYDRATES = "carbohydrates";

export const chartDataByDataType = {
  [BLOODSUGAR]: {
    chartType: "line",
    unit: "mmol/l",
    color: "#E71D37"
  },
  [INSULIN]: {
    chartType: "bar",
    unit: "U",
    color: "#85C99E"
  },
  [STEPS]: {
    chartType: "bar",
    unit: "skritt",
    color: "#59C3FF"
  },
  [WEIGHT]: {
    chartType: "line",
    unit: "kg",
    color: "#E38B21"
  },
  [PHYSICAL_ACTIVITY]: {
    chartType: "bar",
    unit: "min",
    color: "#EF87CE"
  },
  [CARBOHYDRATES]: {
    chartType: "bar",
    unit: "g",
    color: "#EEE05D"
  }
};

export const getDomain = (dataType, aggregatedData) => {
  if (dataType === WEIGHT) {
    const minWeight = aggregatedData
      .map(data => data.y)
      .reduce((a, b) => Math.min(a, b));
    const maxWeight = aggregatedData
      .map(data => data.y)
      .reduce((a, b) => Math.max(a, b));
    return [Math.floor(minWeight) - 5, Math.ceil(maxWeight) + 3];
  }
  if (dataType === CARBOHYDRATES) {
    return [0, 320];
  }
  if (dataType === INSULIN) {
    return [0, 40];
  }
  if (dataType === PHYSICAL_ACTIVITY) {
    return [0, 120];
  }
  if (dataType === STEPS) {
    return [0, 14000];
  }
  if (dataType === BLOODSUGAR) {
    return [5, 10];
  }
};

export const getGoal = (patient, dataType) => {
  if (dataType === WEIGHT) {
    return { value: patient.goals.WeightGoal.value, unit: "kg" };
  }
  if (dataType === CARBOHYDRATES) {
    return { value: patient.goals.CarbsGoal.value, unit: "g" };
  }
  if (dataType === INSULIN) {
    return { value: 35, unit: "U" };
  }
  if (dataType === PHYSICAL_ACTIVITY) {
    return {
      value: patient.goals.PhysicalActivityGoal.value / 7,
      unit: "min"
    };
  }
  if (dataType === STEPS) {
    return { value: patient.goals.StepsGoal.value };
  }
  if (dataType === BLOODSUGAR) {
    return { value: patient.goals.MeanGlucoseGoal.value, unit: "" };
  }
};
