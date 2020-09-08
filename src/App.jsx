import React from 'react';

import Contenedor from './components/Navbar/Contenedor'
import Homebank from './components/Homebank/Homebank'
import Inicio from './components/Inicio'
import Contacto from './components/Contacto'
import Operaciones from './components/Operaciones';
import Detalle from './components/Homebank/Detalle';
import { auth } from './firebase'
import {
  makeStyles
} from '@material-ui/core'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
const estilos = makeStyles(theme => ({

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      margin: '0',
    },
    marginLeft: "240px",
    marginTop: "10px"
  }
}))


function App() {

  const classes = estilos()



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


  const RutaProtegida = ({ component, path, ...res }) => {
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

      {console.log("Todos los derechos reservados - Aguilera Agustín 2020")}
      <Contenedor />

      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        <Switch>
          <Route component={Inicio} path="/" exact />
          <RutaProtegida component={Operaciones} path="/operaciones" />
          <RutaProtegida component={Detalle} path="/mi-homebank/detalle" exact />
          <RutaProtegida component={Homebank} path="/mi-homebank" exact />
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
