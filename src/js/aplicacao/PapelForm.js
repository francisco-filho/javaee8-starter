import React, { Component } from "react";
import { get, post, put } from "../util/http";
import { Button } from "primereact/button";
import AreaTitulo from "../componentes/AreaTitulo";
import { contexto } from "../App";
import { Growl } from "primereact/growl";
import { Link, navigate } from "@reach/router";
import { Dialog } from "primereact/dialog";

export default class PapelForm extends Component {
  state = {
    loading: true,
    papeis: [],
    papelAtivo: 0,
    visible: false
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
          <Dialog
            header="Godfather I"
            visible={this.state.visible}
            style={{ width: "50vw" }}
            modal={true}
            onHide={e => this.setState({ visible: false })}
          >
            The story begins as Don Vito Corleone, the head of a New York Mafia
            family, oversees his daughter's wedding. His beloved son Michael has
            just come home from the war, but does not intend to become part of
            his father's business. Through Michael's life the nature of the
            family business becomes clear. The business of the family is just
            like the head of the family, kind and benevolent to those who give
            respect, but given to ruthless violence whenever anything stands
            against the good of the family.
          </Dialog>
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
                <span>
                  <i className="pi pi-cog" /> Papeis
                </span>
                <Button
                  icon="pi pi-plus"
                  className="p-button-primary p-button-raised"
                  onClick={e => this.setState({ visible: true })}
                />
              </div>
              <div className="lista-papeis">
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
                        <i className="pi pi-key" />
                        <span>{p.nome}</span>
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
