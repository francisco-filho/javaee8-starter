import React, { Component } from "react";
import { get, post, put } from "../util/http";
import { Button } from "primereact/button";
import AreaTitulo from "../componentes/AreaTitulo";
import { contexto } from "../App";
import { Growl } from "primereact/growl";
import { Link, navigate } from "@reach/router";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

export default class PapelForm extends Component {
  state = {
    app: {},
    loading: true,
    papeis: [],
    papelAtivo: { nome: "", descricao: "" },
    visible: false,
    appId: 0
  };
  handlePapelClick = (cdPapel, e) => {
    this.setState({ papelAtivo: cdPapel });
  };

  handleNameChange = e => {
    let papelAtivo = this.state.papelAtivo;
    this.setState({ papelAtivo: { ...papelAtivo, nome: e.target.value } });
  };

  handleDescriptionChange = e => {
    let papelAtivo = this.state.papelAtivo;
    this.setState({ papelAtivo: { ...papelAtivo, descricao: e.target.value } });
  };

  editPapel = () => {
    this.setState({ visible: true });
  };

  save = () => {
    const { papelAtivo, appId } = this.state;
    if (papelAtivo.cdPapel) {
      put(contexto(`/api/acesso/app/${appId}/papel`), {
        body: { ...papelAtivo, cdApp: appId }
      }).then(resp => {
        this.growl.show({
          severity: "success",
          detail: "Papel alterado"
        });
        this.setState({ visible: false });
      });
    } else {
      post(contexto(`/api/acesso/app/${appId}/papel`), {
        body: { ...papelAtivo, cdApp: appId }
      })
        .then(resp => {
          console.log("resp", resp);
          this.growl.show({
            severity: "success",
            detail: "Papel salvo"
          });
          this.setState({ visible: false });
        })
        .catch(e => {
          this.setState({ visible: false });
          this.growl.show({
            severity: "error",
            detail: "erro ao salvar papel"
          });
        });
    }
  };

  cancelPapel = () => {
    this.setState({ visible: false, papelAtivo: this.state.papeis[0] });
  };

  componentDidMount() {
    const appId = this.props.id;
    this.setState({ loading: false, appId });

    get(contexto(`/api/acesso/app/${appId}`)).then(app =>
      this.setState({ app })
    );

    get(contexto(`/api/acesso/app/${appId}/papel`))
      .then(papeis => {
        this.setState({
          papeis,
          papelAtivo: papeis[0],
          loading: false
        });
      })
      .catch(error => console.error("HTTP ERROR: ", error));
  }

  render() {
    const { papeis, papelAtivo, loading, app } = this.state;
    const footer = (
      <div>
        <Button label="Sim" icon="pi pi-check" onClick={this.save} />
        <Button
          label="Não"
          icon="pi pi-times"
          onClick={this.cancelPapel}
          className="p-button-secondary"
        />
      </div>
    );

    return (
      !loading && (
        <div>
          <Dialog
            header="Edição de Papel"
            visible={this.state.visible}
            style={{ width: "50vw" }}
            modal={true}
            footer={footer}
            onShow={e => {
              let i = document.querySelector(".p-dialog input");
              console.log("input", i);
              i.focus();
            }}
            onHide={e => this.setState({ visible: false })}
          >
            <form>
              <div className="form-field">
                <label>Nome do Papel</label>
                <InputText
                  autoFocus
                  disabled
                  type="text"
                  onChange={this.handleNameChange}
                  value={papelAtivo.nome}
                />
              </div>
              <div className="form-field">
                <label>Descrição do Papel</label>
                <InputTextarea
                  type="text"
                  onChange={this.handleDescriptionChange}
                  value={papelAtivo.descricao}
                />
              </div>
            </form>
          </Dialog>
          <Growl ref={el => (this.growl = el)} />
          <AreaTitulo
            titulo={`Papeis e Permissões - ${app.nome}`}
            fluida={true}
          >
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
                  tooltip="Adicionar novo papel"
                  icon="pi pi-plus"
                  className="p-button-primary p-button-raised"
                  onClick={e =>
                    this.setState({
                      visible: true,
                      papelAtivo: { nome: "", descricao: "" }
                    })
                  }
                />
              </div>
              <div className="lista-papeis">
                {papeis.map(p => (
                  <div
                    key={p.cdPapel}
                    className={`papel ${
                      p.cdPapel == papelAtivo.cdPapel ? "ativo" : ""
                    }`}
                    onClick={e => this.handlePapelClick(p, e)}
                  >
                    <div>
                      <div className="nome">
                        <a onClick={this.editPapel}>
                          <i className="pi pi-pencil" />
                        </a>
                        <span style={{ flex: 1 }}>{p.nome}</span>
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
                <div className="permissao-titulo">
                  <span>
                    <i className="pi pi-key" /> Permissões para{" "}
                    {papelAtivo.nome}
                  </span>
                  <Button
                    tooltip="Adicionar permissão"
                    icon="pi pi-plus"
                    className="p-button-primary p-button-raised p-button-rounded"
                    onClick={e =>
                      this.setState({
                        visible: true,
                        papelAtivo: { nome: "", descricao: "" }
                      })
                    }
                  />
                </div>
                <header>
                  <div className="label">Usuário</div>
                  <div className="label">Nível organizacional</div>
                  <div className="label">Uor</div>
                  <div className="label">Uor posição</div>
                </header>
                {papeis
                  .filter(p => p.cdPapel === papelAtivo.cdPapel)
                  .map(p =>
                    p.permissoes.map(perm => (
                      <Permissao
                        key={perm.cdPermissao}
                        permissao={perm.cdPermissao}
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
        <div>
          {/*<div className="label">Usuário</div>*/}
          <div>{usuario}</div>
        </div>
        <div>
          {/*<div className="label">Nivel Organizacional</div>*/}
          <div>{nivel}</div>
        </div>
        <div>
          {/*<div className="label">UOR</div>*/}
          <div>{uor}</div>
        </div>
        <div>
          {/*<div className="label">UOR Posição</div>*/}
          <div>{uorPosicao}</div>
        </div>
      </div>
    );
  }
}
