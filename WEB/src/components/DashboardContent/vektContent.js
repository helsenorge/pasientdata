import React from "react";
import InnsiktButton from "../InnsiktButton/innsiktButton";

const vektContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>Her skal det stå noe om vekt</div>
      <InnsiktButton linkTo={"/vekt"} />
    </div>
  );
};

export default vektContent;
