import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/homePage.js";
import fhirlaunch from "./components/fhirlaunch.js";
import dashboard from "./components/dashboard";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={dashboard} />
      <Route path="/login" component={HomePage} />
      <Route path="/home" component={fhirlaunch} />
      <Route path="/dashboard" component={dashboard} />
    </Switch>
  </main>
);

export default Main;
