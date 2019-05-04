import React from "react";
import CityCard from "../cityCard/cityCard";
import "./cityCardList.css";
const cityCardList = props => {
  return (
    <ul className="cityCardList">
      {props.list.map(el => (
        <li key={el.city} className="cityCardList_item">
          <CityCard
            city={el.city}
            location={el.location}
            value={el.value}
            unit={el.unit}
          />
        </li>
      ))}
    </ul>
  );
};

export default cityCardList;
