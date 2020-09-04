import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const Navbar = () => {
    return (
        <div className="navbar bg-dark navbar-dark">
            <Link className="navbar-brand" to="/">Cajero Automatico TRZ</Link>
            <div className="d-flex">
                <NavLink className="navbar-item btn btn-dark ml-2" to="/" exact>Inicio</NavLink>
                <NavLink className="navbar-item btn btn-dark ml-2" to="/mi-homebank">Home Banking</NavLink>
                <NavLink className="navbar-item btn btn-dark ml-2" to="/sesion">Iniciar Sesión</NavLink>
                <NavLink className="navbar-item btn btn-dark ml-2" to="/contacto">Contacto</NavLink>
            </div>

        </div>
    )
}

export default Navbar
