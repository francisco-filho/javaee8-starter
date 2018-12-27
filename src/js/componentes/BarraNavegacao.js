import React from "react";
import DivisorVertical from "./DivisorVertical";
import PerfilNavegacao from "./PerfilNavegacao";
import { contexto } from "../App";
import "./BarraNavegacao.scss";
import { navigate } from "@reach/router";

export default class BarraNavegacao extends React.Component {
  irParaPaginaInicial = () => navigate(contexto("/acesso"));

  render() {
    const { sistema } = this.props;
    return (
      <nav id="main-nav">
        <div className="nav-content">
          <div className="logo" onClick={this.irParaPaginaInicial}>
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
            nome="FRANCISCO FILHO"
            cargo="Ass. Empresarial"
          />
        </div>
      </nav>
    );
  }
}
