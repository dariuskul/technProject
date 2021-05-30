import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import { SnackbarProvider } from "notistack";
ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
