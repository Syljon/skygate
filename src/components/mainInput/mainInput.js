import React from "react";
import "./mainInput.css";

const mainInput = props => {
  return (
    <form className="Form" autoComplete="off" action="">
      <div className="InputContainer">
        <input
          type="text"
          className="Input-text"
          placeholder="Country"
          onChange={props.changed}
          value={props.value}
        />
        <div className="Autocomplete-items">
          {props.filtred.map(ctr => (
            <button
              className="Autocomplete-item"
              key={ctr}
              onClick={props.clicked}
              value={ctr}
            >
              {ctr}
            </button>
          ))}
        </div>
      </div>
      <button className="btn btn-Submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default mainInput;
