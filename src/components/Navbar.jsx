import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cerrarSesion } from '../redux/usuarioDuck'

const Navbar = () => {

    const activo = useSelector(store => store.usuarios.activo)
    const dispatch = useDispatch()


    return (
        < div className="navbar bg-dark navbar-dark" >
            <Link className="navbar-brand" to="/">Banco TRZ</Link>
            <div className="d-flex flex-wrap">
                <NavLink className="navbar-item btn btn-dark ml-2" to="/" exact>Inicio</NavLink>
                {activo ?
                    (
                        <>

                            <NavLink className="navbar-item btn btn-dark ml-2" to="/mi-homebank">Home Banking</NavLink>
                            <NavLink to="/operaciones" className="navbar-item btn btn-dark ml-2">Operaciones</NavLink>
                            <NavLink className="navbar-item btn btn-dark ml-2" to="/contacto">Contacto</NavLink>
                            <NavLink to="/" className="navbar-item btn btn-danger ml-2" onClick={() => dispatch(cerrarSesion())}>Cerrar Sesion</NavLink>
                        </>
                    ) :
                    (
                        <>
                            <NavLink className="navbar-item btn btn-dark ml-2" to="/sesion">Iniciar Sesión</NavLink>
                            <NavLink className="navbar-item btn btn-dark ml-2" to="/contacto">Contacto</NavLink>
                        </>
                    )
                }

            </div>

        </div >
    )
}

export default Navbar
