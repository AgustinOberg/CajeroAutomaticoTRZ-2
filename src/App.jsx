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
  Route
} from "react-router-dom";









function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)
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
  return firebaseUser !== false ? (
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
  ) : (

      <div className="vh100 d-flex align-items-center justify-content-center">
        <div className="spinner-border" role="status">

        </div>
      </div>
    );
}

export default App;
