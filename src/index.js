import ReactDOM from "react-dom";
import React, { Component } from "react";

import "./styles.css";
import PokemonSearch from "./component/PokemonSearch";

function App() {
  return (
    <div className="App">
      <PokemonSearch />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);