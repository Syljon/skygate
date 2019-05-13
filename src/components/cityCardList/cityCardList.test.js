import React from "react";
import { shallow } from "enzyme";
import CityCardList from "./cityCardList";

it("renders without crashing", () => {
  shallow(<CityCardList list={["Otwock", "Warszawa"]} />);
});
