import React, { Component } from "react";
import { get, post, put, del } from "../util/http";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import AreaTitulo from "../componentes/AreaTitulo";
import { contexto } from "../App";
import { Growl } from "primereact/growl";
import { Link, navigate } from "@reach/router";

export default class AplicacaoForm extends Component {
  state = {
    loading: true,
    app: {
      nome: "",
      descricao: ""
    }
  };

  onHandleNameChange = e => {
    const app = this.state.app;
    this.setState({ app: { ...app, nome: e.target.value } });
  };

  onHandleDescriptionChange = e => {
    const app = this.state.app;
    this.setState({ app: { ...app, descricao: e.target.value } });
  };

  onHandleFileChange = e => {
    const app = this.state.app;
    this.setState({ app: { ...app, foto: e.target.files[0] } });
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

  saveWithBlob = () => {
    const { app } = this.state;
    const body = new FormData();
    body.append("id", app.id);
    body.append("nome", app.nome);
    body.append("descricao", app.descricao);
    body.append("foto", app.foto);
    post("/javaee8/api/acesso/upload", { body, blob: true }).then(resp => {
      console.log("resp", resp);
    });
  };

  componentDidMount() {
    if (!this.props.id) {
      this.setState({ loading: false });
      return;
    }
    get("/javaee8/api/acesso/app/" + this.props.id)
      .then(app => {
        this.setState({ app, loading: false });
      })
      .catch(error => console.error("HTTP ERROR: ", error));
  }

  render() {
    const { app, loading } = this.state;
    return (
      !loading && (
        <div>
          <Growl ref={el => (this.growl = el)} />
          <AreaTitulo titulo="Editar aplicação">
            <Link to={contexto("/acesso")}>
              <Button
                label="Cancelar"
                className="p-button-secondary p-button-raised"
              />
            </Link>
            <Button onClick={this.save} label="Salvar" icon="pi pi-check" />
          </AreaTitulo>
          <div className="content">
            <form>
              <div className="form-field">
                <label>Nome da aplicação</label>
                <InputText
                  type="text"
                  onChange={this.onHandleNameChange}
                  value={app.nome}
                />
              </div>
              <div className="form-field">
                <label>Descrição</label>
                <InputTextarea
                  type="text"
                  onChange={this.onHandleDescriptionChange}
                  value={app.descricao}
                />
              </div>
              <div className="form-field">
                <label>Arquivo</label>
                <input
                  type="file"
                  onChange={this.onHandleFileChange}
                  value={app.file}
                />
              </div>
              <div className="form-field">
                <Button
                  onClick={this.save}
                  label="Permissões"
                  className="p-button-success"
                  icon="pi pi-key"
                />
              </div>
            </form>
          </div>
        </div>
      )
    );
  }
}
