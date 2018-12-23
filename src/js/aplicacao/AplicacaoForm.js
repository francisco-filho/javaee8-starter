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

    onHandleFileChange = (e) => {
        const app = this.state.app
        this.setState({app: {...app, foto: e.target.files[0]}})
    }

    save = () => {
        const {app} = this.state
        // get(`/javaee8/acesso/app/${this.props.id}`, { }).then( app=> {
        //     this.setState({app})
        // })
        const body = new FormData()
        body.append('id', app.id)
        body.append('nome', app.nome)
        body.append('descricao', app.descricao)
        body.append('foto', app.foto)
        console.log(body)
        post('/javaee8/api/acesso/upload', { body, blob: true}).then( resp => {
           console.log('resp', resp)
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
                <div className="form-field">
                    <label>Arquivo</label>
                    <input type="file" onChange={this.onHandleFileChange} value={app.file}/>
                </div>
            </form>
            <p>
                <a href="/javaee8/api/acesso/download/1">Download</a>
            </p>
            <button onClick={this.save}>Salvar</button>
        </div>
    }
}


