import React from 'react';

import Navbar from './components/Navbar';
import Homebank from './components/Homebank'
import Inicio from './components/Inicio'
import Contacto from './components/Contacto'
import Sesion from './components/Sesion'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";






function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route component={Inicio} path="/" exact />
          <Route component={Sesion} path="/sesion" />
          <Route component={Homebank} path="/mi-homebank" />
          <Route component={Contacto} path="/contacto" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
