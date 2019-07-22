import React, { Component } from "react";
import InnsiktButton from "../InnsiktButton/innsiktButton";

const skrittContent = () => {
  return (
    <div>
      <div>Her skal det stå noe om antall skritt</div>
      <InnsiktButton linkTo={"/skritt"} />
    </div>
  );
};

export default skrittContent;
