import React, { Component } from "react";
import ActionButton from "@helsenorge/toolkit/components/atoms/buttons/action-button";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";

const blodsukkerContent = () => {
  return (
    <div>
      <div className="flex-container">
        <div className="flex-children">
          <div className="third-title">Tid innom gränsvärden:</div>
          <div>
            <h1>85%</h1>
            <br />{" "}
          </div>
          <div>
            <h3>(78%)</h3>
          </div>
        </div>
        <div className="divider" />
        <div className="flex-children">
          <div>Gj.snittligt värde:</div>
          <div>
            <div>
              <h1>7.7</h1>
            </div>
            <div>mmol/l</div>
          </div>
          <div>
            <h3>(8.5)</h3>
          </div>
        </div>
        <div className="divider" />
        <div className="flex-children">
          <div>Hba1c:</div>
          <div>
            <div>
              <h1>58</h1>
            </div>
            <div>mmol/mol</div>
          </div>
          <div>
            <h3>48</h3>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <DisplayButton secondary>Utforsk</DisplayButton>
      </div>
    </div>
  );
};

export default blodsukkerContent;
