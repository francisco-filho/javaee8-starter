import React from "react";

export default class BarraNavegacao extends React.Component {
  render() {
    return (
      <nav id="main-nav">
        <div className="logo">
          <img src="/javaee8/images/img.jpg" />
          <h1>Contadoria</h1>
        </div>
        <div className="divisor-vertical">&nbsp;</div>
        <div className="titulo-app" style={{ flex: 1 }}>
          Sistema de Controle de Acessos
        </div>
        <div className="divisor-vertical">&nbsp;</div>
        <div className="perfil">
          <div className="dados">
            <img src="/javaee8/images/foto-nova.jpg" />
            <i className="pi pi-chevron-down" />
            <div>
              <div className="nome">Francisco Filho</div>
              <div className="cargo">Ass Empresarial</div>
            </div>
          </div>
          <ul>
            <li>
              <a>
                <i className="pi pi-pencil" />
                Editar
              </a>
            </li>
            <li>
              <a>
                <i className="pi pi-sign-out" /> Sair
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
