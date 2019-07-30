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
    const cardClassName = this.props.className ? ("flex-card " + this.props.className) : "flex-card";
    return (
      <Card className={cardClassName}>
        <CardBody>
          {this.props.title && <CardTitle>{this.props.title}</CardTitle>}
          {this.props.content}
        </CardBody>
      </Card>
    );
  }
}

export default CardComponent;
