export default function sortActivity(inData) {
  let sleepArray = [];
  let activityArray = [];
  let notActiveArray = [];
  let walkingArray = [];
  let notClassifiedArray = [];

  for (let i = 0; i < inData.length; i++) {
    let googleType = inData[i].value;
    if (
      googleType === 0 || // In vehicle
      googleType === 3 || // Still (not moving)
      googleType === 4 || // Unknown (unable to detect activity)
      googleType === 5 // Tilting (sudden device gravity change)
    ) {
      notActiveArray.push(inData[i]);
    } else if (
      googleType === 72 || // Sleeping
      googleType === 109 || // Light sleep
      googleType === 110 || // Deep sleep
      googleType === 111 || // REM sleep
      googleType === 112 // Awake (during sleep cycle)
    ) {
      sleepArray.push(inData[i]);
    } else if (
      googleType === 2 || // On foot
      googleType === 7 // Walking
    ) {
      walkingArray.push(inData[i]);
    } else if (
      googleType === 1 || // Biking
      googleType === 8 || // Running
      googleType === 16 || // Road biking
      googleType === 17 || // Spinning
      googleType === 18 || // Stationary biking
      googleType === 19 || // Utility biking
      googleType === 39 || // Jumping rope
      googleType === 54 || // Rowing machine
      googleType === 56 || // Jogging
      googleType === 57 || // Running on sand
      googleType === 58 || // Running (treadmill)
      googleType === 77 || // Stair climbing
      googleType === 78 || // Stair-climbing machine
      googleType === 80 || // Strength training
      googleType === 88 || // Treadmill (walking or running)
      googleType === 93 || // Walking (fitness)
      googleType === 94 || // Nording walking
      googleType === 95 || // Walking (treadmill)
      googleType === 97 || // Weightlifting
      googleType === 98 || // Wheelchair
      googleType === 100 || // Yoga
      googleType === 114 || // HIIT
      googleType === 115 || // Interval Training
      googleType === 116 // Walking (stroller)
    ) {
      activityArray.push(inData[i]);
    } else {
      notClassifiedArray.push(inData[i]);
    }
  }

  return activityArray;
}
