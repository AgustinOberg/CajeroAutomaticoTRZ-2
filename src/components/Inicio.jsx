import React from 'react'
import { useSelector } from 'react-redux'

const Inicio = () => {

    const usuarioSesion = useSelector(store => store.usuarios.usuarioLogeado)

    return (

        <div className="jumbotron mt-5">
            <h1 className="display-4">{usuarioSesion ? "Bienvenido/a " + usuarioSesion.nombre : "Bienvenido a Banco TRZ"}</h1>
            <p className="lead">Banco TRZ 2 : Versión alpha 0.5</p>
            <hr className="my-4" />
            <p>Muchas gracias por visitar este proyecto</p>
            <p>Cosas que faltan: Descripción de errores y success, protección de homebank/detalles, contacto, responsive</p>
            <p>Posible mejora: perfil de usuario</p>
            <p>Cupon para depositar: "agustin.depositando900pe". Es universal. Este sistema va a mejorar</p>

        </div>
    )
}

export default Inicio
