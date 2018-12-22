import React, {Component} from 'react'
import {get} from '../util/http'
import {Link} from "@reach/router";

export default class AplicacaoLista extends Component {
    state = {
        apps: []
    }

    componentDidMount(){
        get('/javaee8/api/acesso/app').then(apps=> {
            this.setState({apps})
        })
    }

    render(){
        const {apps} = this.state
        return <div>
            <h1>Aplicações</h1>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nome</th>
                        <th>descricao</th>
                    </tr>
                </thead>
                <tbody>
                {
                   apps.map( app => {
                       return <tr key={app.id}>
                           <td>{app.id}</td>
                           <td><Link to={`acesso/app/${app.id}`}>{app.nome}</Link></td>
                           <td>{app.descricao}</td>
                       </tr>
                   })
                }
                </tbody>
            </table>
        </div>
    }
}