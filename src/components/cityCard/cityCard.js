import React from "react";
import "./cityCard.css";
const cityCard = props => (
  <div className="cityCard">
    <h2 className="cityCard_heading">{props.city}</h2>
    <h4 className="cityCard_subheading">{props.location}</h4>
    <p className="cityCard_content">{`${props.value} | ${props.unit}`}</p>
  </div>
);

export default cityCard;
