import React from "react";
export default class Permissao extends React.Component {
  render() {
    const { permissao, usuario, uor, uorPosicao, nivel } = this.props;
    return (
      <div className="permissao">
        <div>
          <div>{usuario}</div>
        </div>
        <div>
          <div>{nivel}</div>
        </div>
        <div>
          <div>{uor}</div>
        </div>
        <div>
          <div>{uorPosicao}</div>
        </div>
      </div>
    );
  }
}
