import React from "react";
import "whatwg-fetch";

export default class App extends React.Component {
  state = {
    id: null
  };

  mostrarAlerta() {
    fetch("/javaee8/api/938", { method: "GET" })
      .then(resp => resp.json())
      .then(value => this.setState({ id: value.id }));
  }

  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <ul>
          <li>
            <a onClick={e => this.mostrarAlerta()}>Mostrar alerta com ID</a>
          </li>
        </ul>
        <p>o id é {this.state.id}</p>
      </div>
    );
  }
}
