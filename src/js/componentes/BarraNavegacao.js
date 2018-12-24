import React from "react";
import DivisorVertical from "./DivisorVertical";
import PerfilNavegacao from "./PerfilNavegacao";
import { contexto } from "../App";

export default class BarraNavegacao extends React.Component {
  render() {
    const { sistema } = this.props;
    return (
      <nav id="main-nav">
        <div className="logo">
          <img src={contexto("/images/img.jpg")} />
          <h1>Contadoria</h1>
        </div>
        <DivisorVertical />
        <div className="titulo-app" style={{ flex: 1 }}>
          {sistema}
        </div>
        <DivisorVertical />
        <PerfilNavegacao
          chave="foto-nova.jpg"
          nome="Francisco Filho"
          cargo="Ass. Empresarial"
        />
      </nav>
    );
  }
}
