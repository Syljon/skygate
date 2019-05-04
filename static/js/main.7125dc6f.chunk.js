(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(t,e,a){t.exports=a(49)},23:function(t,e,a){},43:function(t,e,a){},44:function(t,e,a){},45:function(t,e,a){},46:function(t,e,a){},47:function(t,e,a){},48:function(t,e,a){},49:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),o=a(15),r=a.n(o),s=(a(23),a(2)),c=a(3),u=a(6),l=a(4),p=a(7),m=a(5),d=a.n(m),f=(a(43),a(44),function(t){return i.a.createElement("form",{className:"Form",autoComplete:"off",onSubmit:t.submit},i.a.createElement("div",{className:"InputContainer"},i.a.createElement("input",{type:"text",className:"Input-text",placeholder:"Enter Country ...",onChange:t.inputH,value:t.value}),i.a.createElement("div",{className:"Autocomplete-items"},t.filtred.map(function(e){return i.a.createElement("button",{className:"Autocomplete-item",key:e,onClick:t.inputH,value:e},e)}))),i.a.createElement("button",{className:"btn btn-Submit",type:"submit"},"Submit"))}),h=a(16),y=(a(45),function(t){return i.a.createElement("button",{type:t.btnType,className:["btn"].concat(Object(h.a)(t.btnClasses)).join(" "),onClick:t.clicked},t.children)}),C=(a(46),function(t){function e(){var t,a;Object(s.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(i)))).state={show:!1,description:""},a.getDescription=function(){a.setState({show:!a.state.show}),""===a.state.description&&d.a.get("https://en.wikipedia.org/w/api.php?exintro&explaintext&redirects",{params:{titles:a.props.city,action:"query",prop:"extracts",origin:"*",format:"json",category:"city"}}).then(function(t){var e=t.data.query.pages[Object.keys(t.data.query.pages)].extract;void 0===e&&(e="Data not found"),a.setState({description:e})}).catch(function(t){return console.log(t)})},a}return Object(p.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"cityCard"},i.a.createElement("h2",{className:"cityCard_heading"},this.props.city),i.a.createElement("h3",{className:"cityCard_subheading"},this.props.location),i.a.createElement("p",{className:"cityCard_value"},"".concat(this.props.value," ").concat(this.props.unit)),i.a.createElement(y,{btnType:"button",btnClasses:["btn-Info","btn-round"],clicked:this.getDescription},this.state.show?"Close":"More")),this.state.show?i.a.createElement("p",{className:"cityCard_description"},this.state.description):null)}}]),e}(n.Component)),g=(a(47),function(t){return i.a.createElement("ul",{className:"cityCardList"},t.list.map(function(t){return i.a.createElement("li",{key:t.city,className:"cityCardList_item"},i.a.createElement(C,{city:t.city,location:t.location,value:t.value,unit:t.unit}))}))}),v=(a(48),function(){return i.a.createElement("div",{className:"loader"},"Loading...")}),b=function(t){function e(){var t,a;Object(s.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(i)))).state={countries:["Poland","Germany","Spain","France"],countryMark:{poland:"PL",germany:"DE",france:"FR",spain:"ES"},mostPollutedCities:[],autoCompleteCountries:[],inputValue:"",loading:!1},a.getCitiesList=function(){d.a.get("https://api.openaq.org/v1/latest",{params:{country:a.state.countryMark[a.state.inputValue.toLowerCase()],parameter:"pm25"}}).then(function(t){var e=[];for(var n in t.data.results)e.push({city:t.data.results[n].city,value:t.data.results[n].measurements[0].value,unit:t.data.results[n].measurements[0].unit,location:t.data.results[n].location});e.sort(function(t,e){return-(t.value-e.value)});var i=a.getUnique(e,"city");a.setState({loading:!1,mostPollutedCities:i})}).catch(function(t){console.log(t),this.setState({loading:!1})})},a.inputHandler=function(t){localStorage.setItem("inputValue",t.target.value),a.setState({inputValue:t.target.value}),a.autoComplete(t.target.value)},a.onSubmitHandler=function(t){a.setState({loading:!0}),t.preventDefault();var e=a.state.inputValue.slice(0,1).toUpperCase()+a.state.inputValue.slice(1);a.state.countries.includes(e)?a.getCitiesList():""===a.state.inputValue.toLowerCase()?a.setState({loading:!1,mostPollutedCities:[]}):(alert("Country not supported. Try: Poland, Germany,Spain, France"),a.setState({loading:!1}))},a.autoComplete=function(t){var e;e=""!==t?a.state.countries.filter(function(e){return-1!==e.toLowerCase().slice(0,t.length).indexOf(t.toLowerCase())}):[],a.state.countries.includes(t.slice(0,1).toUpperCase()+t.slice(1))&&(e=[]),a.setState({autoCompleteCountries:e})},a.getUnique=function(t,e){return t.map(function(t){return t[e]}).map(function(t,e,a){return a.indexOf(t)===e&&e}).filter(function(e){return t[e]}).map(function(e){return t[e]}).slice(0,10)},a.clearAutoCompleteCountries=function(){a.setState({autoCompleteCountries:[]})},a}return Object(p.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){this.setState({inputValue:localStorage.getItem("inputValue")})}},{key:"render",value:function(){return i.a.createElement("div",{className:"App",onClick:this.clearAutoCompleteCountries},i.a.createElement("header",{className:"Header"},i.a.createElement("h1",{className:"Logo"},"skygate"),i.a.createElement(f,{inputH:this.inputHandler,filtred:this.state.autoCompleteCountries,value:this.state.inputValue,submit:this.onSubmitHandler})),this.state.loading?i.a.createElement(v,null):i.a.createElement(g,{list:this.state.mostPollutedCities}))}}]),e}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.7125dc6f.chunk.js.map