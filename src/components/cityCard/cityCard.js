import React, { Component } from "react";
import { getData } from "../../API/Wikipedia/Wikipedia";
import Button from "../Button/button";
import "./cityCard.css";
class CityCard extends Component {
  state = {
    show: false,
    description: ""
  };

  getDescription = () => {
    this.setState({ show: !this.state.show });
    if (!this.state.description) {
      getData(this.props.city).then(res => {
        console.log(res);
        this.setState({ description: res });
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="cityCard">
          <h2 className="cityCard_heading">{this.props.city}</h2>
          <Button
            btnType="button"
            btnClasses={["btn-Info", "btn-round"]}
            clicked={this.getDescription}
          >
            {this.state.show ? "Close" : "More"}
          </Button>
        </div>
        {this.state.show ? (
          <p className="cityCard_description">{this.state.description}</p>
        ) : null}
      </React.Fragment>
    );
  }
}

export default CityCard;
