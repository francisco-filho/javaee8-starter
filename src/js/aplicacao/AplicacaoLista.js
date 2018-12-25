import React, { Component } from "react";
import { get } from "../util/http";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { navigate } from "@reach/router";
import { Button } from "primereact/button";
import AreaTitulo from "../componentes/AreaTitulo";
import { contexto } from "../App";

export default class AplicacaoLista extends Component {
  state = {
    apps: []
  };

  componentDidMount() {
    get(contexto("/api/acesso/app")).then(apps => {
      this.setState({ apps });
    });
  }

  render() {
    const { apps } = this.state;
    return (
      <div>
        <AreaTitulo titulo="Aplicações">
          <Button
            label="Nova aplicação"
            onClick={e => navigate(contexto("/acesso/app/novo"))}
          />
        </AreaTitulo>
        <div className="content">
          <DataTable
            value={apps}
            selectionMode="single"
            onSelectionChange={e => {
              navigate(contexto(`/acesso/app/${e.value.id}`));
            }}
            rows={15}
            rowsPerPageOptions={[5, 10, 15]}
            paginator={true}
          >
            <Column
              field="id"
              header="Id"
              style={{ width: "60px" }}
              filter={true}
              sortable={true}
            />
            <Column
              field="nome"
              header="Nome"
              style={{ width: "200px" }}
              filter={true}
              sortable={true}
            />
            <Column field="descricao" header="Descrição" filter={true} />
          </DataTable>
        </div>
      </div>
    );
  }
}
