import React, { Component } from "react";
import { get, post, put } from "../util/http";
import { Button } from "primereact/button";
import AreaTitulo from "../componentes/AreaTitulo";
import { contexto } from "../App";
import { Growl } from "primereact/growl";
import { Link } from "@reach/router";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import Permissao from "../componentes/Permissao";
import "./PapelForm.scss";

const success = (grow, msg) => grow.show({ severity: "success", detail: msg });
const error = (grow, msg) => grow.show({ severity: "error", detail: msg });

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

  addPermissao = () => {
    this.setState({
      visible: true
    });
  };

  addPapel = () => {
    this.setState({
      visible: true,
      papelAtivo: { nome: "", descricao: "" }
    });
  };

  save = () => {
    const { papelAtivo, appId } = this.state;
    if (papelAtivo.cdPapel) {
      put(contexto(`/api/acesso/app/${appId}/papel`), {
        body: { ...papelAtivo, cdApp: appId }
      }).then(resp => {
        success(this.growl, "Papel salvo");
        this.setState({ visible: false });
        this.carregarPapeis(appId);
      });
    } else {
      post(contexto(`/api/acesso/app/${appId}/papel`), {
        body: { ...papelAtivo, cdApp: appId }
      })
        .then(resp => {
          success(this.growl, "Papel salvo");
          this.setState({ visible: false });
          this.carregarPapeis(appId);
        })
        .catch(e => {
          this.setState({ visible: false });
          error(this.growl, "Erro ao salvar Papel");
        });
    }
  };

  cancelPapel = () => {
    this.setState({ visible: false, papelAtivo: this.state.papeis[0] });
  };

  carregarPapeis = appId => {
    get(contexto(`/api/acesso/app/${appId}/papel`))
      .then(papeis => {
        this.setState({
          papeis,
          papelAtivo:
            papeis.length > 0 ? papeis[0] : { nome: "", descricao: "" },
          loading: false
        });
      })
      .catch(error => console.error("HTTP ERROR: ", error));
  };

  componentDidMount() {
    const appId = this.props.id;
    this.setState({ appId });

    get(contexto(`/api/acesso/app/${appId}`)).then(app =>
      this.setState({ app })
    );
    this.carregarPapeis(appId);
  }

  footer = (
    <div>
      <Button label="Salvar" icon="pi pi-check" onClick={this.save} />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={this.cancelPapel}
        className="p-button-secondary"
      />
    </div>
  );

  render() {
    const { papeis, papelAtivo, loading, app } = this.state;

    return (
      !loading && (
        <div>
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
                  onClick={this.addPapel}
                />
              </div>
              <div className="lista-papeis">
                {papeis.map(p => (
                  <ItemComponente
                    item={p}
                    isActive={p.cdPapel === papelAtivo.cdPapel}
                    onSelect={this.handlePapelClick}
                    onEdit={this.editPapel}
                  />
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
                    onClick={this.addPermissao}
                  />
                </div>
                <PermissaoHeader />
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
          {papelAtivo && (
            <Dialog
              header="Edição de Papel"
              visible={this.state.visible}
              style={{ width: "50vw" }}
              modal={true}
              footer={this.footer}
              onHide={e => this.setState({ visible: false })}
            >
              <form>
                <div className="form-field">
                  <label>Nome do Papel</label>
                  <InputText
                    disabled={papelAtivo && papelAtivo.cdPapel}
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
          )}
        </div>
      )
    );
  }
}

const PermissaoHeader = () => (
  <header>
    <div className="label">Usuário</div>
    <div className="label">Nível organizacional</div>
    <div className="label">Uor</div>
    <div className="label">Uor posição</div>
  </header>
);

const ItemComponente = ({ item, onSelect, onEdit, isActive }) => (
  <div
    className={`item-componente ${isActive ? "ativo" : ""}`}
    onClick={e => onSelect(item, e)}
  >
    <div>
      <div className="nome">
        <a onClick={onEdit}>
          <i className="pi pi-pencil" />
        </a>
        <span style={{ flex: 1 }}>{item.nome}</span>
      </div>
      <div className="descricao">
        <span>{item.descricao}</span>
      </div>
    </div>
    <i className="pi pi-chevron-right" />
  </div>
);
