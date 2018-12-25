import React from "react";
import "./AreaTitulo.scss";

const AreaTitulo = ({ titulo, children, fluida }) => (
  <div className="titulo-area">
    <div style={{ width: fluida ? "100%" : "1000px" }}>
      <h1>{titulo}</h1>
      <div>{children}</div>
    </div>
  </div>
);
export default AreaTitulo;
