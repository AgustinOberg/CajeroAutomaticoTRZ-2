import React from 'react'

const Inicio = () => {

    const usuarioLocal = JSON.parse(localStorage.getItem("usuario"))

    console.log(usuarioLocal)
    return (

        <div className="jumbotron mt-4">
            <h1 className="display-4">{usuarioLocal ? "Bienvenido " + usuarioLocal.nombre : "Bienvenido"}</h1>
            <p className="lead">Cajero Automático TRZ 2 : Versión alpha 0.01</p>
            <hr className="my-4" />
            <p>Muchas gracias por visitar este proyecto</p>

        </div>
    )
}

export default Inicio
