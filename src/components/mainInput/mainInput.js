import React from "react";
import "./mainInput.css";

const mainInput = props => {
  return (
    <form className="Form" autoComplete="off" onSubmit={props.submit}>
      <div className="InputContainer">
        <input
          type="text"
          className="Input-text"
          placeholder="Enter Country ..."
          onChange={props.inputH}
          value={props.value}
        />
        <div className="Autocomplete-items">
          {props.filtred.map(ctr => (
            <button
              className="Autocomplete-item"
              key={ctr}
              onClick={props.inputH}
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
