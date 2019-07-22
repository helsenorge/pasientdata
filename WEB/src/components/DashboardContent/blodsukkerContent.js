import React, { Component } from "react";
import ChevronRightRounded from "@helsenorge/toolkit/components/icons/ChevronRightRounded";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import "./blodsukkerContent.css";

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
      <div>
        <div className="button-style">
          <DisplayButton
            style="flex: 1"
            onClick={() => {
              /* tom */
            }}
            secondary
          >
            <div className="flex-container-button">
              <div className="flex-children-button">Utforsk</div>
              <ChevronRightRounded className="flex-children-button-icon" />
            </div>
          </DisplayButton>
        </div>
      </div>
    </div>
  );
};

export default blodsukkerContent;
