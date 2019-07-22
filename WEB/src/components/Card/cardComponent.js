import React, { Component } from "react";
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

import "./cardComponent.css";

class CardComponent extends Component {
  render() {
    return (
      <Card className="flex-card">
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
          {this.props.content}
        </CardBody>
      </Card>
    );
  }
}

export default CardComponent;
