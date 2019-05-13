import axios from "axios";

export function getData(inputVal) {
  return axios
    .get("https://api.openaq.org/v1/latest", {
      params: {
        country: inputVal,
        order_by: "measurements[0].value",
        sort: "desc",
        parameter: "pm25"
      }
    })
    .then(response => {
      console.log("Log", response.data.results);
      return [...new Set(response.data.results.map(item => item.city))].slice(
        0,
        10
      );
    })
    .catch(function(error) {
      console.log(error);
    });
}
