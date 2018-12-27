import React from "react";
import "./Componentes.scss";
import { Button } from "primereact/button";
import AreaTitulo from "./componentes/AreaTitulo";

export default class Componentes extends React.Component {
  state = {
    items: [
      {
        texto: "hello world",
        descricao: "loren passd dflkasjflksd fjsalkdjfsçaldk"
      },
      { texto: "helloj", descricao: "loren passd dflkasjflkssalkdjfsçaldk" },
      {
        texto: "he world",
        descricao: "loren passd dflkasjflksd fjsalkdjfsçaldk"
      },
      {
        texto: "hello world my world",
        descricao: "loren passjflksd fjsalkdjfsçaldk"
      }
    ]
  };

  componentDidMount() {
    this.setState({
      items: [
        {
          texto: "hello world",
          descricao: "loren passd dflkasjflksd fjsalkdjfsçaldk",
          dependenciaPrefixo: 3046,
          dependenciaNome: "CAPIM GROSSO"
        },
        {
          texto: "helloj",
          descricao: "loren passd dflkasjflkssalkdjfsçaldk",
          dependenciaPrefixo: 9568,
          dependenciaNome: "CONTADORIA"
        },
        {
          texto: "he world",
          descricao: "loren passd dflkasjflksd fjsalkdjfsçaldk",
          dependenciaPrefixo: 8592,
          dependenciaNome: "DIVAR"
        },
        {
          texto: "hello world my world",
          descricao: "loren passjflksd fjsalkdjfsçaldk",
          dependenciaPrefixo: 3046,
          dependenciaNome: "CAPIM GROSSO"
        },
        {
          texto: "hello world",
          descricao: "loren passd dflkasjflksd fjsalkdjfsçaldk",
          dependenciaPrefixo: 3046,
          dependenciaNome: "CAPIM GROSSO"
        },
        {
          texto: "helloj",
          descricao: "loren passd dflkasjflkssalkdjfsçaldk",
          dependenciaPrefixo: 9568,
          dependenciaNome: "CONTADORIA"
        },
        {
          texto: "he world",
          descricao: "loren passd dflkasjflksd fjsalkdjfsçaldk",
          dependenciaPrefixo: 8592,
          dependenciaNome: "DIVAR"
        },
        {
          texto: "hello world my world",
          descricao: "loren passjflksd fjsalkdjfsçaldk",
          dependenciaPrefixo: 3046,
          dependenciaNome: "CAPIM GROSSO"
        }
      ]
    });
  }
  render() {
    if (!this.state.items) return;
    return (
      <div>
        <AreaTitulo fluida={false} titulo="Documentos para Validação" />
        <div style={{ width: "980px", margin: "8px auto" }}>
          {this.state.items.map(item => (
            <ItemRow
              texto={item.texto}
              descricao={item.descricao}
              dependenciaNome={item.dependenciaNome}
              dependenciaPrefixo={item.dependenciaPrefixo}
              detalhe="29 julho de 2018"
            >
              <Button
                tooltip="Download"
                tooltipOptions={{ position: "bottom" }}
                icon="pi pi-download"
                className="p-button-rounded p-button-secondary"
              />
              <Button
                tooltip="Versões anteriores"
                tooltipOptions={{ position: "bottom" }}
                icon="pi pi-clock"
                className="p-button-rounded p-button-secondary"
              />
              <Button
                icon="pi pi-cog"
                tooltipOptions={{ position: "bottom" }}
                tooltip="Validar"
                className="p-button-rounded p-button-secondary"
              />
            </ItemRow>
          ))}
        </div>
      </div>
    );
  }
}

const ItemRow = ({
  icone,
  texto,
  descricao,
  dependenciaPrefixo,
  dependenciaNome,
  detalhe,
  children
}) => {
  return (
    <div className="item-row">
      {icone && <div className="item-icon" />}
      <div className="item-content">
        <div className="item-texto">{texto}</div>
        {descricao && <div className="item-descricao">{descricao}</div>}
      </div>
      <div className="item-dep">
        <div>
          {dependenciaPrefixo} - {dependenciaNome}
        </div>
      </div>
      {detalhe && <div className="item-detalhe">{detalhe}</div>}
      <div className="item-children">{children}</div>
    </div>
  );
};
