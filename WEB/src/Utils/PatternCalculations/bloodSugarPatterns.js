export function bloodSugarFluctuations(view, data, goals) {
  return "Du har ingen målinger i den valgte perioden.";
}

export function bloodSugarGreatestChange(view, data, goals) {
  let valueObj = { y: 0, x: "28.06" };
  return ["work in progress, fix in aggregateData gives errors here", valueObj];
}
