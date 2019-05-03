import React from "react";
import CityCard from "../cityCard/cityCard";
import "./cityCardList.css";
const cityCardList = props => {
  return (
    <ul className="cityCardList">
      {props.list.map(el => (
        <li className="cityCardList_item">
          <CityCard
            key={el.city}
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
