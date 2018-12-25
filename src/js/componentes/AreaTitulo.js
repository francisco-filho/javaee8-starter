import React from "react";
import "./AreaTitulo.scss";

const AreaTitulo = ({ titulo, children }) => (
  <div className="titulo-area">
    <div>
      <h1>{titulo}</h1>
      <div>{children}</div>
    </div>
  </div>
);
export default AreaTitulo;
