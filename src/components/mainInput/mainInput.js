import React from "react";

const mainInput = props => {
  return (
    <div autoComplete="off" action="">
      <div className="autocomplete">
        <input
          type="text"
          name="myCountry"
          placeholder="Country"
          onChange={props.changed}
          value={props.value}
        />
        <div className="autocomplete-items">
          {props.filtred.map(ctr => (
            <button key={ctr} onClick={props.clicked} value={ctr}>
              {ctr}
            </button>
          ))}
        </div>
      </div>
      <button className="btn btn-Info" type="submit">
        Submit
      </button>
    </div>
  );
};

export default mainInput;
