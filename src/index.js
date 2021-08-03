import React from "react";
import ReactDOM from "react-dom";
import GlobalStyles from "./Styles/GlobalStyles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { Theme } from "./Styles/Theme";
import Mixin from "./Styles/Mixin";
import Routes from "./Routes";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider theme={{ ...Theme, ...Mixin }}>
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
