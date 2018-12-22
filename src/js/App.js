import React from "react";
import "whatwg-fetch";
import {Link, Location, Router} from '@reach/router'
import {AuthContext} from "./main";
import AplicacaoLista from "./aplicacao/AplicacaoLista";
import AplicacaoForm from "./aplicacao/AplicacaoForm";
import {get} from './util/http'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './style.scss'

export default class App extends React.Component {
    state = {
        auth: false
    }

    componentDidMount() {
        get("/javaee8/api/auth")
            .then(usuario => {
                setTimeout(() => this.setState({auth: true}), 100)
                window.usuario = usuario
            })
    }

  render() {
        console.log('app props', this.props)
      const comp = this.state.auth ? <div>
          <nav>
              <Link to="/javaee8/">Index</Link>
              <Link to="/javaee8/acesso/app/1">app 1</Link>
              <Link to="/javaee8/detalhes/93829">Detalhes</Link>
          </nav>
          <hr/>
          <div className="content">
             <Router basepath="/javaee8">
                 <AplicacaoLista path="/"></AplicacaoLista>
                 <AplicacaoForm path="/acesso/app/:id"/>
                 <MyIndex path="/myindex" usuario={this.props.usuario}/>
                 <Detalhe path="/detalhes/:itemId/*" usuario={this.props.usuario}/>
             </Router>
          </div>
      </div> : <span>Waitng</span>
    return comp;
  }
}


class MyIndex extends React.Component {
  static contextType = AuthContext;
    state = {
        id: null
    };

    mostrarAlerta() {
        fetch("/javaee8/api/redirect", { method: "GET" })
            .then(resp => {
                if (resp.redirected){
                    window.location = resp.url
                    return
                }
                return resp.json()
            })
            .then(value => this.setState({ id: value.id }));
    }

    uploadFile(){
        let data = new FormData();
        let file = this.file.files[0];
        data.append('descricao', this.desc.value)
        data.append('myfile', file)
        console.info('file', file);

        fetch("/javaee8/api/upload", {
            method: 'POST',
            body: data
        })
        .then(resp => resp.json())
        .then(value => this.setState({ id: value }));
    }

    render(){
        console.log('context', this.context)
        console.log('my props', this.props)
       return (
           <div>
               <h1>Index</h1>
               <ul>
                   <li>
                       <button onClick={e => this.mostrarAlerta()}>Mostrar alerta com ID</button>
                   </li>
               </ul>
               <p>{this.props.usuario.chave} o id é {this.state.id}</p>
               <form>
                   <input type="text" name="descricao" id="descricaoId" ref={ desc => this.desc = desc}/>
                   <input type="file" name="myfile" id="myFileId" ref={ file => this.file = file}/>
                   <a onClick={e => this.uploadFile() }>upload</a>
               </form>
           </div>
       )
    }
}

MyIndex.contextType = AuthContext;

const Detalhe = (props) => (
    <div>
        <h1>Detalhamento</h1>
        <hr/>
        <p>{props.itemId}</p>
        <nav>
            <Link to="detalhe1">Detalhe 1</Link>
            <Link to="detalhe2">Detalhe 2</Link>
        </nav>
        <div>
            <Router>
                <Detalhe1 path="detalhe1" usuario={props.usuario}/>
                <Detalhe2 path="detalhe2"/>
            </Router>
        </div>
    </div>
)

const Detalhe1 = ({usuario}) => <h1>Detalhe 1 {usuario.chave}</h1>
const Detalhe2 = () => <h1>Detalhe 2</h1>

const FadeTransitionRouter = props => (
    <Location>
        {({ location }) => (
            <TransitionGroup className="transition-group">
                <CSSTransition key={location.key} classNames="fade" timeout={500}>
                    <Router location={location} className="router">
                        {props.children}
                    </Router>
                </CSSTransition>
            </TransitionGroup>
        )}
    </Location>
);
