import axios from "axios";

export function getData(city) {
  return axios
    .get(`https://en.wikipedia.org/w/api.php?exintro&explaintext&redirects`, {
      params: {
        titles: city,
        action: "query",
        prop: "extracts",
        origin: "*",
        format: "json",
        category: "city"
      }
    })
    .then(res => {
      let value =
        res.data.query.pages[Object.keys(res.data.query.pages)].extract;
      if (value === undefined) {
        value = "Data not found";
      }
      return value;
    })
    .catch(error => console.log(error));
}
