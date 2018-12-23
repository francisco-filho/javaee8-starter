import React, { Component } from "react";
import { get } from "../util/http";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { navigate } from "@reach/router";

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
        <h1>Aplicações</h1>
        <DataTable
          value={apps}
          selectionMode="single"
          onSelectionChange={e => {
            navigate(`/javaee8/acesso/app/${e.value.id}`);
            console.log(e);
          }}
        >
          <Column
            field="id"
            header="Id"
            style={{ width: "60px" }}
            sortable={true}
          />
          <Column field="nome" header="Nome" style={{ width: "200px" }} />
          <Column field="descricao" header="Descrição" />
        </DataTable>
      </div>
    );
  }
}
