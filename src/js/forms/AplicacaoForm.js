import React, {Component} from 'react'
import {get, post} from '../util/http'

export default class AplicacaoForm extends Component {
    state = {
        app: {}
    }

    onHandleNameChange = (e) => {
        const app = this.state.app
        this.setState({app: {...app, nome: e.target.value }})
    }

    onHandleDescriptionChange = (e) => {
        const app = this.state.app
        this.setState({app: {...app, description: e.target.value }})
    }

    save = () => {
       console.log(this.state.app)
    }

    componentDidMount() {
        get('/javaee8/api/not-found').then( resp => {
            console.log(resp)
        })
        .catch((error) => console.error('HTTP ERROR: ', error))
    }

    render(){
        return <div>
            <h1>Aplicação</h1>
            <div className="form-field">
                <label>Nome</label>
                <input onChange={this.onHandleNameChange}/>
            </div>
            <div className="form-field">
                <label>Descrição</label>
                <input onChange={this.onHandleDescriptionChange}/>
            </div>
            <button onClick={this.save}>Salvar</button>
        </div>
    }
}

