import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import MainInput from "./components/mainInput/mainInput";
import CityCardList from "./components/cityCardList/cityCardList";
import Spinner from "./components/Spinner/spinner";
class App extends Component {
  state = {
    countries: ["Poland", "Germany", "Spain", "France"],
    countryMark: { poland: "PL", germany: "DE", france: "FR", spain: "ES" },
    mostPollutedCities: [],
    autoCompleteCountries: [],
    inputValue: "",
    loading: false
  };
  componentDidMount() {
    this.setState({ inputValue: localStorage.getItem("inputValue") });
  }
  getCitiesList = () => {
    axios
      .get("https://api.openaq.org/v1/latest", {
        params: {
          country: this.state.countryMark[this.state.inputValue.toLowerCase()],
          parameter: "pm25"
        }
      })
      .then(response => {
        console.log(response.data.results);
        let T = [];
        for (let key in response.data.results) {
          T.push({
            city: response.data.results[key].city,
            value: response.data.results[key].measurements[0].value,
            unit: response.data.results[key].measurements[0].unit,
            location: response.data.results[key].location
          });
        }
        T.sort((a, b) => {
          return -(a.value - b.value);
        });
        const unique = this.getUnique(T, "city");
        console.log("unique", unique);
        this.setState({ loading: false, mostPollutedCities: unique });
      })
      .catch(function(error) {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  onChangeHandler = e => {
    localStorage.setItem("inputValue", e.target.value);
    this.setState({ inputValue: e.target.value });
    this.autoComplete(e.target.value);
  };

  onClickedHandler = e => {
    localStorage.setItem("inputValue", e.target.value);
    this.setState({ inputValue: e.target.value });
    this.autoComplete(e.target.value);
  };

  onSubmitHandler = e => {
    this.setState({ loading: true });
    e.preventDefault();
    const value =
      this.state.inputValue.slice(0, 1).toUpperCase() +
      this.state.inputValue.slice(1);
    if (this.state.countries.includes(value)) {
      this.getCitiesList();
    } else if (this.state.inputValue.toLowerCase() === "") {
      this.setState({ loading: false, mostPollutedCities: [] });
    } else {
      alert("Country not supported. Try: Poland, Germany,Spain, France");
      this.setState({ loading: false });
    }
    console.log(this.state.inputValue);
  };

  autoComplete = value => {
    let filtred;
    if (value !== "") {
      filtred = this.state.countries.filter(
        country =>
          country
            .toLowerCase()
            .slice(0, value.length)
            .indexOf(value.toLowerCase()) !== -1
      );
    } else {
      filtred = [];
    }
    if (
      this.state.countries.includes(
        value.slice(0, 1).toUpperCase() + value.slice(1)
      )
    ) {
      filtred = [];
    }
    this.setState({ autoCompleteCountries: filtred });
  };

  getUnique = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e])
      .map(e => arr[e]);
    return unique.slice(0, 10);
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
            changed={this.onChangeHandler}
            filtred={this.state.autoCompleteCountries}
            value={this.state.inputValue}
            clicked={this.onClickedHandler}
            submit={this.onSubmitHandler}
          />
        </header>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <CityCardList list={this.state.mostPollutedCities} />
        )}
      </div>
    );
  }
}

export default App;
