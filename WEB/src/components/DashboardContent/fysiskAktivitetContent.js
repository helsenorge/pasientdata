import React from "react";
import InnsiktButton from "../InnsiktButton/innsiktButton";

const fysiskAktivitetContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>
        Her skal det stå noe om fysisk aktivitet
      </div>
      <InnsiktButton linkTo={"/fysiskAktivitet"} />
    </div>
  );
};

export default fysiskAktivitetContent;
