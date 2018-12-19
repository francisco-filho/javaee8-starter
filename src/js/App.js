import React from "react";
import "whatwg-fetch";
import { Router, Link} from '@reach/router'

export default class App extends React.Component {
  render() {
    return (
      <div>
          <nav>
              <Link to="/">Index</Link>
              <Link to="/detalhes/93829">Detalhes</Link>
          </nav>
          <hr/>
          <div className="content">
             <Router>
                 <MyIndex path="/"/>
                 <Detalhe path="/detalhes/:itemId/*"/>
             </Router>
          </div>
      </div>
    );
  }
}

class MyIndex extends React.Component {
    state = {
        id: null
    };

    mostrarAlerta() {
        fetch("/javaee8/api/938", { method: "GET" })
            .then(resp => resp.json())
            .then(value => this.setState({ id: value.id }));
    }

    render(){
       return (
           <div>
               <h1>Index</h1>
               <ul>
                   <li>
                       <button onClick={e => this.mostrarAlerta()}>Mostrar alerta com ID</button>
                   </li>
               </ul>
               <p>o id é {this.state.id}</p>
           </div>
       )
    }
}

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
                <Detalhe1 path="detalhe1"/>
                <Detalhe2 path="detalhe2"/>
            </Router>
            {props.children}
        </div>
    </div>
)

const Detalhe1 = () => <h1>Detalhe 1</h1>
const Detalhe2 = () => <h1>Detalhe 2</h1>
