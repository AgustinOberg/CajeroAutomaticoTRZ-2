import React from 'react';

import Navbar from './components/Navbar';
import Homebank from './components/Homebank'
import Inicio from './components/Inicio'
import Contacto from './components/Contacto'
import Sesion from './components/Sesion'
import { auth } from './firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {





  const [firebaseUser, setFirebaseUser] = React.useState(false)   //Saber si el usuario esta logeado
  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    }
    fetchUser()
  }, [])


  const HomeProtegido = ({ component, path, ...res }) => {
    const miUsuario = JSON.parse(localStorage.getItem("usuario"))

    if (miUsuario) {
      if (miUsuario.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...res} />
      } else {
        return <Redirect to="/sesion"  {...res} />
      }
    } else {
      return <Redirect to="/sesion" {...res} />
    }
  }




  return firebaseUser !== false ? (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route component={Inicio} path="/" exact />
          <Route component={Sesion} path="/sesion" />
          <HomeProtegido component={Homebank} path="/mi-homebank" exact />
          <Route component={Contacto} path="/contacto" />
        </Switch>
      </div>
    </Router>
  ) : (

      <div className="vh100 d-flex align-items-center justify-content-center">
        <div className="spinner-border" role="status">

        </div>
      </div>
    );
}

export default App;
