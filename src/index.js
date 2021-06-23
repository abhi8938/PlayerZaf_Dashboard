import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route,  HashRouter as Router } from 'react-router-dom';
import home from './pages/home';
import result from './pages/result';
import reset from './pages/reset';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './index.css';
import App from './App';

const routing = (
    <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/home" component={home} />
      <Route path="/result" component={result} />
      <Route path='/reset' component={reset}/>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
