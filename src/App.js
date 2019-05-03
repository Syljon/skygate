import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import MainInput from "./components/mainInput/mainInput";
import Spinner from "./components/Spinner/spinner";
class App extends Component {
  state = {
    countries: ["poland", "germany", "spain", "france"],
    country: { poland: "PL", germany: "GR", grance: "FR", spain: "ES" },
    mostPollutedCities: [],
    autoCompleteCountries: [],
    inputValue: "",
    loading: true
  };

  onChangeHandler = e => {
    this.setState({ inputValue: e.target.value });
    this.autoComplete(e.target.value);
  };

  onClickedHandler = e => {
    console.log(e.target);
    this.setState({ inputValue: e.target.value });
    this.autoComplete(e.target.value);
  };

  autoComplete = value => {
    let filtred;
    if (value !== "") {
      filtred = this.state.countries.filter(
        country => country.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    } else {
      filtred = [];
    }
    if (this.state.countries.includes(value.toLowerCase())) {
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

  componentDidMount() {
    axios
      .get("https://api.openaq.org/v1/latest", {
        params: {
          country: "DE",
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
  }
  render() {
    return (
      <div className="App">
        <header className="Header">
          <h1 className="Logo">skygate</h1>
          <MainInput
            changed={this.onChangeHandler}
            filtred={this.state.autoCompleteCountries}
            value={this.state.inputValue}
            clicked={this.onClickedHandler}
          />
        </header>
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default App;
