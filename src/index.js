import React from "react";
import ReactDOM from "react-dom";
import GlobalStyles from "./Styles/GlobalStyles";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { Theme } from "./Styles/Theme";
import Mixin from "./Styles/Mixin";
import App from "App";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider theme={{ ...Theme, ...Mixin }}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
