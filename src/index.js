import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { initialState, reducer } from "./components/State/Reducer/Reducer";
import { StateProvider } from "./components/State/StateProvider/StateProvider";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
