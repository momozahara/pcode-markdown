import React from "react";
import ReactDOM from "react-dom/client";
import "styles/global.css";
import App from "./pages/App";

import ThemeProvider from "@mui/system/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "themes";
import "@fontsource/roboto/400.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
