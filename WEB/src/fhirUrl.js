export default function fhirUrl() {
  let useLocalServer = false;
  if (useLocalServer) {
    return "https://localhost:5001/fhir";
  } else {
    return "https://pasientdata-fhir-api.azurewebsites.net/fhir";
  }
}
