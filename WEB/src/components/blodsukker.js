import React, { Component } from "react";
// import Tab from "@helsenorge/toolkit/components/molecules/tabs/tab";
//import Progressbar from "@helsenorge/toolkit/components/atoms/progressbar/index";
//import { ResponsiveContainer } from "recharts";
import {
  Card,
  //CardHeader,
  CardTitle,
  //CardImg,
  CardBody
  //CardFooter,
  //Button
} from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import ActionButton from "@helsenorge/toolkit/components/atoms/buttons/action-button";
import "./blodsukker.css";

class BlodsukkerKort extends Component {
  state = {};
  render() {
    return (
      <div>
        {/* <Tabs>
          <Tab title="Første tab">Hei</Tab>
          <Tab title="Andre tab">Hallo</Tab>
          <Tab title="Tredje tab">God dag</Tab>
          <Tab title="Fjerde tab">Aften</Tab>
        </Tabs> */}
        {/* <ResponsiveContainer width="90%" height={300}>
          <Progressbar min={0} max={100} value={20} />
        </ResponsiveContainer> */}
        <Card style={{ maxWidth: "600px", maxHeight: "1000px" }}>
          <CardBody>
            <CardTitle>Blodsukker</CardTitle>
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
              <ActionButton sub>Rediger</ActionButton>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default BlodsukkerKort;
