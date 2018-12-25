import React, { Component } from "react";
import { get, post, put } from "../util/http";
import { Button } from "primereact/button";
import AreaTitulo from "../componentes/AreaTitulo";
import { contexto } from "../App";
import { Growl } from "primereact/growl";
import { Link, navigate } from "@reach/router";

export default class PapelForm extends Component {
  state = {
    loading: true,
    papeis: [],
    papelAtivo: 0
  };
  handlePapelClick = (cdPapel, e) => {
    this.setState({ papelAtivo: cdPapel });
  };

  onHandleNameChange = e => {
    const app = this.state.app;
    this.setState({ app: { ...app, nome: e.target.value } });
  };

  save = () => {
    if (this.props.id) {
      put(contexto(`/api/acesso/app/${this.props.id}`), {
        body: this.state.app
      }).then(resp => {
        this.growl.show({
          severity: "success",
          detail: "Aplicação alterada"
        });
      });
    } else {
      post(contexto("/api/acesso/app"), { body: this.state.app }).then(resp => {
        this.growl.show({
          severity: "success",
          detail: "Aplicação salva"
        });
        navigate(contexto(`/acesso/app/${resp.id}`));
      });
    }
  };

  componentDidMount() {
    if (!this.props.id) {
      this.setState({ loading: false });
      return;
    }
    get(contexto(`/api/acesso/app/${this.props.id}/papel`))
      .then(papeis => {
        this.setState({
          papeis,
          papelAtivo: papeis[0].cdPapel,
          loading: false
        });
      })
      .catch(error => console.error("HTTP ERROR: ", error));
  }

  render() {
    const { papeis, papelAtivo, loading } = this.state;
    return (
      !loading && (
        <div>
          <Growl ref={el => (this.growl = el)} />
          <AreaTitulo titulo="Papeis e Permissões" fluida={true}>
            <Link to={contexto("/acesso")}>
              <Button
                label="Voltar"
                className="p-button-secondary p-button-raised"
              />
            </Link>
          </AreaTitulo>
          <div className="sidebar-content">
            <div className="papeis">
              <div className="papel-titulo">
                <i className="pi pi-cog" /> Papeis
              </div>
              <div>
                {papeis.map(p => (
                  <div
                    key={p.cdPapel}
                    className={`papel ${
                      p.cdPapel == papelAtivo ? "ativo" : ""
                    }`}
                    onClick={e => this.handlePapelClick(p.cdPapel, e)}
                  >
                    <div>
                      <div className="nome">
                        <span>
                          <i className="pi pi-key" />
                          {p.nome}
                        </span>
                      </div>
                      <div className="descricao">
                        <span>{p.descricao}</span>
                      </div>
                    </div>
                    <i className="pi pi-chevron-right" />
                  </div>
                ))}
              </div>
            </div>
            <div className="fluid-content">
              <div className="permissoes">
                <div>Permissões</div>
                {papeis
                  .filter(p => p.cdPapel === papelAtivo)
                  .map(p =>
                    p.permissoes.map(perm => (
                      <Permissao
                        key={perm.cdPerm}
                        permissao={perm.cdPerm}
                        usuario={perm.chave}
                        uor={perm.uor}
                        uorPosicao={perm.uorPsc}
                        nivel={perm.nivelOrganizacional}
                      />
                    ))
                  )}
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

class Permissao extends React.Component {
  render() {
    const { permissao, usuario, uor, uorPosicao, nivel } = this.props;
    return (
      <div className="permissao">
        <div>{permissao}</div>
        <div>{usuario}</div>
        <div>{nivel}</div>
        <div>{uor}</div>
        <div>{uorPosicao}</div>
      </div>
    );
  }
}
