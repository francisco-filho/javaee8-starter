import React from "react";
import "./PerfilNavegacao.scss";
import { contexto } from "../App";

const PerfilNavegacao = ({ chave, nome, cargo }) => (
  <div className="perfil">
    <div className="dados">
      <img src={contexto(`/images/${chave}`)} />
      <i className="pi pi-chevron-down" />
      <div>
        <div className="nome">{nome}</div>
        <div className="cargo">{cargo}</div>
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
);

export default PerfilNavegacao;
