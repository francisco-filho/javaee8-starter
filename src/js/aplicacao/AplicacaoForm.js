import React, {Component} from 'react'
import {get, post, put, del} from '../util/http'

export default class AplicacaoForm extends Component {
    state = {
        loading: true,
        app: {
            nome: '',
            descricao: ''
        }
    }

    onHandleNameChange = (e) => {
        const app = this.state.app
        this.setState({app: {...app, nome: e.target.value }})
    }

    onHandleDescriptionChange = (e) => {
        const app = this.state.app
        this.setState({app: {...app, descricao: e.target.value }})
    }

    save = () => {
        get(`/javaee8/acesso/app/${this.props.id}`, { }).then( app=> {
            this.setState({app})
        })
    }

    componentDidMount() {
        console.log('AplicacaoForm:componentDidMount', this.props)
        get('/javaee8/api/acesso/app/' + this.props.id).then( app=> {
            this.setState({app, loading: false})
        })
        .catch((error) => console.error('HTTP ERROR: ', error))
    }

    render(){
        console.log('AplicacaoForm::render')
        const { app, loading } = this.state
        return  !loading && <div>
            <h1>Aplicação</h1>
            <form>
                <div className="form-field">
                    <label>Nome</label>
                    <input type="text" placeholder="nome da aplicação" onChange={this.onHandleNameChange} value={app.nome}/>
                </div>
                <div className="form-field">
                    <label>Descrição</label>
                    <input type="text" onChange={this.onHandleDescriptionChange} value={app.descricao}/>
                </div>
            </form>
            <button onClick={this.save}>Salvar</button>
        </div>
    }
}


