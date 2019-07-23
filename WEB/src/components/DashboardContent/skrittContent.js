import React from "react";
import InnsiktButton from "../InnsiktButton/innsiktButton";

const skrittContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>
        Her skal det stå noe om antall skritt
      </div>
      <InnsiktButton linkTo={"/skritt"} />
    </div>
  );
};

export default skrittContent;
