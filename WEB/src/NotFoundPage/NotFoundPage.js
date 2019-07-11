import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../images/medError.jpg";
import "./styles.css";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="text">
        <h2>404 - Siden finnes ikke </h2>
        <div className="head-error-image">
          <img src={PageNotFound} className="error-image"/>
        </div>
        <p >
          Oi! Siden du ser etter finnes ikke. <br />
          <Link to="/"> Gå til startsiden </Link>
        </p>
      </div>
    );
  }
}
export default NotFoundPage;
