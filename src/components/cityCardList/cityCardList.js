import React from "react";
import CityCard from "../cityCard/cityCard";
import "./cityCardList.css";
const cityCardList = props => {
  return (
    <ul className="cityCardList">
      {props.list.map(el => (
        <li key={el} className="cityCardList_item">
          <CityCard city={el} />
        </li>
      ))}
    </ul>
  );
};

export default cityCardList;
