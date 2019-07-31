export default function getStringsFromLOINC(LOINC) {
  let strings = {};
  switch (LOINC) {
    case "55423-8": // steps
      strings = {
        unitDisplayString: "Number of steps in unspecified time Pedometer",
        observationDisplayName: "Step count",
        unit: "steps/day",
        UCUMCode: "/d"
      };
      break;
    case "8867-4": // heart rate
      strings = {
        unitDisplayString: "Heart rate",
        observationDisplayName: "Heart rate",
        unit: "beats/minute",
        UCUMCode: "/min"
      };
      break;
    case "2339-0": // blood glucose
      strings = {
        unitDisplayString: "Glucose Bld-mCnc",
        observationDisplayName: "Glucose Bld-mCnc",
        unit: "mg/dL",
        UCUMCode: "mg/dL"
      };
      break;
    case "85354-9": // blood pressure
      strings = {
        unitDisplayString: "Blood pressure panel with all children optional",
        observationDisplayName: "Blood pressure systolic & diastolic",
        unit: "mmHg",
        UCUMCode: "mm[Hg]"
      };
      break;
    case "8302-2": // height
      strings = {
        unitDisplayString: "Body height",
        observationDisplayName: "Body height",
        unit: "m",
        UCUMCode: "m"
      };
      break;
    case "29463-7": // weight
      strings = {
        unitDisplayString: "Body weight",
        observationDisplayName: "Body weight",
        unit: "kg",
        UCUMCode: "kg"
      };
      break;
    case "77595-7": // Activity
      strings = {
        unitDisplayString: "Activity",
        observationDisplayName: "Activity",
        unit: "unitless",
        UCUMCode: "unitless"
      };
      break;
    default:
      strings = {
        unitDisplayString: "Activity",
        observationDisplayName: "Activity",
        unit: "",
        UCUMCode: ""
      };
  }
  return strings;
}
