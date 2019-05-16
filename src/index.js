import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import PromiseComponent from "./PromiseComponent";

const fun = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("CIAOOO");
    }, 3000);
  });

function App() {
  return (
    <div className="App">
      <PromiseComponent promiseFunction={fun}>
        {data => <div>{data}</div>}
      </PromiseComponent>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
