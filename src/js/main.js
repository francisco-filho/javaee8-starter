import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./App";
import "./style.scss";
import 'whatwg-fetch'

export const AuthContext = React.createContext('auth');

const render = (Component, usuario) => {
  ReactDOM.render(
    <AppContainer>
        <AuthContext.Provider value='hello context'>
          <Component usuario={usuario}/>
        </AuthContext.Provider>
    </AppContainer>,
    document.getElementById("main")
  );
};


fetch("/javaee8/api/auth", { method: "GET" })
    .then(resp => resp.json())
    .then(usuario => {
        window.usuario = usuario;
        render(App, usuario);

        if (module.hot) {
            module.hot.accept("./App", () => {
                render(App, usuario);
            });
        }
    });
