import React, { Component } from "react";
import axios from "axios";
import Button from "../Button/button";
import "./cityCard.css";
class CityCard extends Component {
  state = {
    show: false,
    description: ""
  };

  getDescription = () => {
    this.setState({ show: !this.state.show });
    if (this.state.description === "") {
      console.log("Send request");
      axios
        .get(
          `https://en.wikipedia.org/w/api.php?exintro&explaintext&redirects&titles=${
            this.props.city
          }`,
          {
            params: {
              action: "query",
              prop: "extracts",
              origin: "*",
              format: "json",
              category: "city"
            }
          }
        )
        .then(res => {
          let value =
            res.data.query.pages[Object.keys(res.data.query.pages)].extract;
          console.log(value);
          if (value === undefined) {
            value = "Data not found";
          }
          this.setState({ description: value });
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="cityCard">
          <h2 className="cityCard_heading">{this.props.city}</h2>
          <h4 className="cityCard_subheading">{this.props.location}</h4>
          <p className="cityCard_value">{`${this.props.value} ${
            this.props.unit
          }`}</p>
          <Button
            btnType="button"
            btnClasses={["btn-Info", "btn-round"]}
            clicked={this.getDescription}
          >
            {this.state.show ? "Close" : "More"}
          </Button>
        </div>
        <div>
          {this.state.show ? (
            <p className="cityCard_description">{this.state.description}</p>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default CityCard;
