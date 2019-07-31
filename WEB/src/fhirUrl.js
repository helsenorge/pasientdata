/*
 * Function used to get the url of the fhir server. Set useLocalServer = false to use the external fhir server.
 */

export default function fhirUrl() {
  let useLocalServer = false;
  if (useLocalServer) {
    return "https://localhost:5001/fhir";
  } else {
    return "https://pasientdata-fhir-api.azurewebsites.net/fhir";
  }
}
