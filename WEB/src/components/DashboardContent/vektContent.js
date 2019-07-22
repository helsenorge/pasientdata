import React, { Component } from "react";
import InnsiktButton from "../InnsiktButton/innsiktButton";

const vektContent = () => {
  return (
    <div>
      <div>Her skal det stå noe om vekt</div>
      <InnsiktButton linkTo={"/vekt"} />
    </div>
  );
};

export default vektContent;
