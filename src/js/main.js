import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./App";
import "./style.scss";
import "whatwg-fetch";
import { get } from "./util/http";

export const AuthContext = React.createContext("auth");

const render = (Component, usuario) => {
  ReactDOM.render(
    <AppContainer>
      <AuthContext.Provider value="hello context">
        <Component usuario={usuario} />
      </AuthContext.Provider>
    </AppContainer>,
    document.getElementById("main")
  );
};

get("/javaee8/api/auth").then(usuario => {
  window.usuario = usuario;
  render(App, usuario);

  if (module.hot) {
    module.hot.accept("./App", () => {
      render(App, usuario);
    });
  }
});
