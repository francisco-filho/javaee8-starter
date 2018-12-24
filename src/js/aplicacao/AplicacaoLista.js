import React, { Component } from "react";
import { get } from "../util/http";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { navigate } from "@reach/router";
import { Button } from "primereact/button";

export default class AplicacaoLista extends Component {
  state = {
    apps: []
  };

  componentDidMount() {
    get("/javaee8/api/acesso/app").then(apps => {
      this.setState({ apps });
    });
  }

  render() {
    const { apps } = this.state;
    return (
      <div>
        <div className="titulo-area">
          <h1>Aplicações</h1>
        </div>
        <div className="content">
          <DataTable
            value={apps}
            selectionMode="single"
            onSelectionChange={e => {
              navigate(`/javaee8/acesso/app/${e.value.id}`);
            }}
            rows={5}
            rowsPerPageOptions={[5, 10, 15]}
            paginator={true}
          >
            <Column
              field="id"
              header="Id"
              style={{ width: "60px" }}
              sortable={true}
            />
            <Column
              field="nome"
              header="Nome"
              style={{ width: "200px" }}
              sortable={true}
            />
            <Column field="descricao" header="Descrição" />
          </DataTable>
        </div>
      </div>
    );
  }
}

let paginatorLeft = <Button icon="pi pi-refresh" />;
let paginatorRight = <Button icon="pi pi-cloud-upload" />;
