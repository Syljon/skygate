import React, { Component } from "react";
import "./App.css";

import MainInput from "./components/mainInput/mainInput";

class App extends Component {
  state = {
    countries: ["Poland", "Germany", "Spain", "France"],
    autoCompleteCountries: [],
    inputValue: ""
  };

  onChangeHandler = e => {
    this.setState({ inputValue: e.target.value });
    this.autoComplete(e.target.value);
  };

  onClickedHandler = e => {
    this.setState({ inputValue: e.target.value });
    this.autoComplete(e.target.value);
  };

  autoComplete = value => {
    let filtred;
    if (value !== "") {
      filtred = this.state.countries.filter(
        country => country.indexOf(value) !== -1
      );
    } else {
      filtred = [];
    }
    if (this.state.countries.includes(value)) {
      filtred = [];
    }
    this.setState({ autoCompleteCountries: filtred });
  };

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
      </div>
    );
  }
}

export default App;
