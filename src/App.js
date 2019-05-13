import React, { Component } from "react";
import MainInput from "./components/mainInput/mainInput";
import CityCardList from "./components/cityCardList/cityCardList";
import Spinner from "./components/Spinner/spinner";
import { getData } from "./API/OpenAQ/OpenAQ";

import "./App.css";
class App extends Component {
  state = {
    countries: ["poland", "germany", "spain", "france"],
    countryMark: { poland: "PL", germany: "DE", france: "FR", spain: "ES" },
    mostPollutedCities: [],
    autoCompleteCountries: [],
    inputValue: "",
    loading: false,
    error: false
  };

  componentDidMount() {
    this.setState({
      inputValue: localStorage.getItem("inputValue")
    });
  }

  inputHandler = e => {
    localStorage.setItem("inputValue", e.target.value);
    this.setState({ inputValue: e.target.value });
    this.autoComplete(e.target.value);
  };
  fetchCitiesList = country => {
    getData(country).then(res => {
      this.setState({ mostPollutedCities: res });
      console.log(res);
    });
  };
  onSubmitHandler = e => {
    this.setState({ loading: true, error: false });
    e.preventDefault();
    this.state.countries.includes(this.state.inputValue)
      ? this.fetchCitiesList(
          this.state.countryMark[this.state.inputValue.toLowerCase()]
        )
      : this.setState({ error: true });
    this.setState({ loading: false });
  };

  autoComplete = value => {
    let filtred = value
      ? this.state.countries.filter(
          country =>
            country
              .toLowerCase()
              .slice(0, value.length)
              .indexOf(value.toLowerCase()) !== -1
        )
      : [];
    this.setState({ autoCompleteCountries: filtred });
  };

  clearAutoCompleteCountries = () => {
    this.setState({ autoCompleteCountries: [] });
  };

  render() {
    return (
      <div className="App" onClick={this.clearAutoCompleteCountries}>
        <header className="Header">
          <h1 className="Logo">skygate</h1>
          <MainInput
            inputH={this.inputHandler}
            filtred={this.state.autoCompleteCountries}
            value={this.state.inputValue}
            submit={this.onSubmitHandler}
          />
        </header>
        {this.state.loading ? (
          <Spinner />
        ) : this.state.error ? (
          <div>
            <h2>Error City not found</h2>
          </div>
        ) : (
          <CityCardList list={this.state.mostPollutedCities} />
        )}
      </div>
    );
  }
}

export default App;
